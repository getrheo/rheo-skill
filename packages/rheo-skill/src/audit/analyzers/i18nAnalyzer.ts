import type { AuditFile, AuditFinding } from '../auditTypes.js';

const I18N_PACKAGE_RE =
  /["'](i18next|react-i18next|react-intl|@formatjs\/intl|i18n-js|@lingui\/core|@lingui\/react|expo-localization|next-intl|typesafe-i18n|tolgee|rosetta|polyglot|react-native-localize)["']/i;

const CODE_SIGNALS: Array<{ re: RegExp; label: string }> = [
  { re: /\buseTranslation\s*\(/, label: 'react-i18next useTranslation' },
  { re: /\bi18n\.t\s*\(/, label: 'i18n.t()' },
  { re: /\bt\s*\(\s*['"`]/, label: 't() translation call' },
  { re: /\bformatMessage\s*\(/, label: 'react-intl formatMessage' },
  { re: /\buseIntl\s*\(/, label: 'react-intl useIntl' },
  { re: /<FormattedMessage\b/, label: 'FormattedMessage' },
  { re: /\bI18n\.t\s*\(/, label: 'i18n-js I18n.t' },
  { re: /@lingui\/macro/, label: 'Lingui macro' },
  { re: /\bTrans\s+id=/, label: 'Trans component' },
];

const FALLBACK_LOCALE_RE =
  /(?:fallbackLng|defaultLocale|defaultLanguage|primaryLocale|sourceLocale|lng)\s*[:=]\s*['"`]([a-z]{2}(?:-[A-Z]{2})?)['"`]/i;

const LOCALE_FILE_RE =
  /(?:^|\/)(?:locales|translations|i18n|lang|l10n)\/([a-z]{2}(?:-[A-Z]{2})?)\.(?:json|ts|js)$/i;

const TRANSLATION_KEY_RE =
  /\b(?:t|i18n\.t|I18n\.t)\s*\(\s*['"`]([^'"`]+)['"`]/g;

const getNestedString = (root: unknown, keyPath: string): string | null => {
  const parts = keyPath.split('.');
  let cur: unknown = root;
  for (const part of parts) {
    if (!cur || typeof cur !== 'object' || !(part in cur)) return null;
    cur = (cur as Record<string, unknown>)[part];
  }
  return typeof cur === 'string' && cur.trim().length > 0 ? cur : null;
};

const parseLocaleJson = (content: string): Record<string, unknown> | null => {
  try {
    const data = JSON.parse(content) as unknown;
    return data && typeof data === 'object' && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
};

export const analyzeI18n = (files: AuditFile[]): AuditFinding[] => {
  const findings: AuditFinding[] = [];
  const signals = new Set<string>();
  let defaultLocale: string | undefined;
  const localeFiles = new Map<string, string>();
  const keysInSource = new Set<string>();

  files.forEach((file) => {
    if (!file.content) return;

    if (file.path === 'package.json' || file.path.endsWith('/package.json')) {
      const match = file.content.match(I18N_PACKAGE_RE);
      if (match?.[1]) signals.add(`npm:${match[1]}`);
    }

    CODE_SIGNALS.forEach(({ re, label }) => {
      if (re.test(file.content!)) signals.add(label);
    });

    if (!defaultLocale) {
      const localeMatch = file.content.match(FALLBACK_LOCALE_RE);
      if (localeMatch?.[1]) defaultLocale = localeMatch[1];
    }

    const localePathMatch = file.path.match(LOCALE_FILE_RE);
    if (localePathMatch?.[1] && file.content) {
      localeFiles.set(localePathMatch[1], file.path);
    }

    for (const match of file.content.matchAll(TRANSLATION_KEY_RE)) {
      const key = match[1]?.trim();
      if (key) keysInSource.add(key);
    }
  });

  if (signals.size === 0 && keysInSource.size === 0 && localeFiles.size === 0) {
    return findings;
  }

  const resolvedDefault =
    defaultLocale ??
    (localeFiles.has('en') ? 'en' : [...localeFiles.keys()].sort()[0]);

  findings.push({
    kind: 'i18n',
    confidence: 'high',
    file: '(i18n audit)',
    evidence: `Localization detected (${[...signals].slice(0, 6).join(', ') || 'locale JSON / t() calls'}).`,
    recommendation: `BLOCKING: Resolve every user-visible string from the app default locale${resolvedDefault ? ` ("${resolvedDefault}")` : ''} into Rheo \`text.default\` (and button/link copy). Never copy raw translation keys (e.g. \`onboarding.welcome.title\`) into the manifest. Set manifest \`defaultLocale\` to the same locale. See localization-import.md.`,
  });

  if (resolvedDefault) {
    findings.push({
      kind: 'i18n',
      confidence: 'high',
      file: '(i18n audit)',
      evidence: `Default/fallback locale: ${resolvedDefault}`,
      recommendation: `Use "${resolvedDefault}" for manifest.defaultLocale and load strings from that locale's translation files when mapping layers.`,
    });
  }

  localeFiles.forEach((path, locale) => {
    findings.push({
      kind: 'i18n',
      confidence: 'medium',
      file: path,
      evidence: `Locale bundle: ${locale}`,
      recommendation:
        locale === resolvedDefault
          ? `Primary source for \`text.default\` strings — read this file and resolve keys to "${locale}" copy.`
          : `Optional: add other locales under \`text.translations\` after default copy is correct.`,
    });
  });

  const defaultBundlePath = resolvedDefault ? localeFiles.get(resolvedDefault) : undefined;
  const defaultBundle = defaultBundlePath
    ? parseLocaleJson(files.find((f) => f.path === defaultBundlePath)?.content ?? '')
    : null;

  [...keysInSource].slice(0, 8).forEach((key) => {
    const resolved = defaultBundle ? getNestedString(defaultBundle, key) : null;
    findings.push({
      kind: 'i18n',
      confidence: resolved ? 'high' : 'medium',
      file: '(i18n audit)',
      evidence: resolved ? `t("${key}") -> "${resolved}"` : `t("${key}")`,
      recommendation: resolved
        ? `Use text.default: "${resolved}" (not "${key}").`
        : `Resolve t("${key}") from the ${resolvedDefault ?? 'default'} locale JSON before writing the manifest.`,
    });
  });

  return findings;
};
