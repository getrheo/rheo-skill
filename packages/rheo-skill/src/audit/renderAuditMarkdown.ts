import type { AuditFinding, AuditReport } from './auditTypes.js';
import { MANDATORY_INTAKE_QUESTIONS } from './intakeQuestionnaire.js';

const titleForKind = (kind: AuditFinding['kind']): string => {
  switch (kind) {
    case 'stack':
      return 'Stack Detection';
    case 'region':
      return 'Region Evidence';
    case 'style':
      return 'Style Token Evidence';
    case 'background':
      return 'Screen Background Evidence';
    case 'carousel':
      return 'Carousel And Pager Evidence';
    case 'layout':
      return 'Layout, Alignment, Border, And Shadow Evidence';
    case 'font':
      return 'Custom Font Evidence';
    case 'choice':
      return 'Choice Option Default And Selected State Evidence';
    case 'animation':
      return 'Animation And Motion Evidence';
    case 'i18n':
      return 'Localization And I18n Evidence';
    case 'asset':
    case 'lottie':
      return 'Asset And Lottie Evidence';
    case 'question':
      return 'Mandatory Intake And Follow-Up Questions';
  }
};

const renderFinding = (finding: AuditFinding): string =>
  [
    `- **${finding.confidence}** — \`${finding.file}\``,
    `  - Evidence: ${finding.evidence}`,
    `  - Recommendation: ${finding.recommendation}`,
  ].join('\n');

export const renderAuditMarkdown = (report: AuditReport): string => {
  const groups = new Map<string, AuditFinding[]>();
  report.findings.forEach((finding) => {
    const title = titleForKind(finding.kind);
    groups.set(title, [...(groups.get(title) ?? []), finding]);
  });

  const sections = [...groups.entries()].map(([title, findings]) =>
    [`## ${title}`, '', ...findings.map(renderFinding)].join('\n'),
  );

  const hasCarousel = report.findings.some((f) => f.kind === 'carousel');
  const hasFonts = report.findings.some((f) => f.kind === 'font');
  const hasChoiceStates = report.findings.some((f) => f.kind === 'choice');
  const hasStyle = report.findings.some((f) => f.kind === 'style' && f.file !== '(style audit)');
  const hasGradient = report.findings.some(
    (f) => f.kind === 'background' && f.evidence.includes('LinearGradient'),
  );
  const hasAnimation = report.findings.some(
    (f) => f.kind === 'animation' && f.file !== '(animation audit)',
  );
  const hasI18n = report.findings.some((f) => f.kind === 'i18n');
  const blockingIntake = !report.entry;

  return [
    '# Rheo Import Audit',
    '',
    '## Import Intake Summary',
    '',
    `- Root: \`${report.root}\``,
    `- Entries: ${report.entries?.length ? report.entries.map((e) => `\`${e}\``).join(', ') : report.entry ? `\`${report.entry}\`` : '**not provided (BLOCKING)**'}`,
    `- Scope: ${report.scopeMode ?? (report.entry ? 'import-graph' : 'unknown')}`,
    `- Screenshots/recordings: ${report.screenshots ? `\`${report.screenshots}\`` : 'not provided'}`,
    `- Scanned files: ${report.scannedFiles}${report.scopeMode === 'full-root' && report.inventoryFiles ? ` (full repo inventory)` : ' (import graph + locale/config supplements only)'}`,
    '',
    '## Mandatory Intake Questionnaire (required before manifest generation)',
    '',
    'The agent must ask every question below and record answers in chat. Do not generate a manifest until complete.',
    '',
    ...MANDATORY_INTAKE_QUESTIONS.map((q, i) => `${i + 1}. ${q}`),
    '',
    blockingIntake
      ? '> **BLOCKING:** Re-run audit with `--entry <path>` after the user provides the entry point.'
      : '> Entry provided. Still complete the questionnaire before generating the manifest.',
    '',
    ...sections,
    '',
    '## Required Manifest Implications',
    '',
    '- Complete the mandatory intake questionnaire before writing `rheo-import.manifest.json`.',
    '- Use high-confidence region findings when choosing `regions.header`, `regions.body`, and `regions.footer`.',
    hasStyle
      ? '- Populate `manifest.theme` and per-layer `style` from style-token evidence. Set `style.color` on text for colored screens.'
      : '- No style-token evidence found — ask the user for theme sources before using black-and-white defaults.',
    hasGradient
      ? '- Apply gradient evidence to `screen.containerStyle.backgroundFill.color` using `linear-gradient(...)` CSS strings.'
      : '- Map screen-level background findings before adding generic body layers.',
    hasCarousel
      ? '- **Carousel required:** emit `kind: "carousel"` with one slide stack per pager page. Swipe-only — no in-pager buttons. Bundle every slide asset.'
      : '- No carousel markers detected — still verify multi-slide routes manually.',
    hasFonts
      ? '- **Fonts required:** copy `.ttf`/`.otf`/`.woff`/`.woff2` under `assets/fonts/`, add `rheo-import.fonts.json`, set `manifest.theme.fontFamily`. **Never** put font files in `rheo-import.assets.json` (see `references/font-import.md`).'
      : '- If custom fonts appear later in review, bundle them in `rheo-import.fonts.json` only — never in `rheo-import.assets.json`.',
    hasChoiceStates
      ? '- **Choice selected state:** each option stack needs `style` (default) and `selectedStyle` (selected), including border/background/text colors.'
      : '- Verify single_choice / multiple_choice option stacks for `selectedStyle` when source uses selected ternaries.',
    hasAnimation
      ? '- **Motion (intake Q6=yes + Grow+ plan):** apply `screen.animations`, `screen.stagger`, and conservative `restingMotion` from animation audit findings. Use `--suggest-animations` JSON for clip shapes. Omit unmapped springs/gestures.'
      : '- **Motion:** if intake Q6=yes, re-scan entry scope; if Q6=no or plan lacks animations, omit all `animations`, `stagger`, and `restingMotion` fields.',
    hasI18n
      ? '- **Localization:** resolve all copy from the app default locale into `text.default`; set `manifest.defaultLocale` to match. Never import `t("key")` strings as defaults (see `references/localization-import.md`).'
      : '- If screens use `t()` / `formatMessage` / locale JSON, resolve default-locale strings before writing the manifest.',
    '- Center hero images: vertical body stacks need `align: "center"`; text layers use `style.align: "center"`.',
    '- Preserve card chrome: map borders and shadows to wrapping stacks, not flat sibling layers.',
    '- Bundle every high-confidence image, Lottie, and video finding or report it as missing.',
    '- Ask the user about BLOCKING question findings before proceeding.',
    '',
  ].join('\n');
};
