import type { AuditFile, AuditFinding } from '../auditTypes.js';

const FONT_LOAD_RE =
  /Font\.loadAsync\s*\(\s*\{([^}]+)\}/g;
const FONT_REQUIRE_RE =
  /['"]([^'"]+\.(?:ttf|otf|woff2?))['"]\s*:\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
const USE_FONTS_RE = /useFonts\s*\(\s*\{([^}]+)\}/g;
const TAILWIND_FONT_FAMILY_RE = /fontFamily\s*:\s*\{([^}]+)\}/g;
const FONT_CLASS_RE = /\bfont-([a-z0-9_-]+)\b/g;
const THEME_FONT_RE = /fontFamily\s*:\s*['"]([^'"]+)['"]/g;

const extractPairs = (block: string): Array<{ name: string; path: string }> => {
  const pairs: Array<{ name: string; path: string }> = [];
  let match = FONT_REQUIRE_RE.exec(block);
  FONT_REQUIRE_RE.lastIndex = 0;
  while (match) {
    const name = match[1];
    const path = match[2];
    if (name && path) pairs.push({ name, path });
    match = FONT_REQUIRE_RE.exec(block);
  }
  return pairs;
};

export const analyzeFonts = (files: AuditFile[]): AuditFinding[] => {
  const findings: AuditFinding[] = [];
  const seen = new Set<string>();

  files.forEach((file) => {
    if (!file.content) return;

    for (const match of file.content.matchAll(FONT_LOAD_RE)) {
      const block = match[1] ?? '';
      extractPairs(block).forEach(({ name, path }) => {
        const key = `${name}:${path}`;
        if (seen.has(key)) return;
        seen.add(key);
        findings.push({
          kind: 'font',
          confidence: 'high',
          file: file.path,
          evidence: `Font.loadAsync: ${name} <- ${path}`,
          recommendation: `BLOCKING: Bundle ${path} under assets/fonts/ only in rheo-import.fonts.json (family "${name}", weight/italic, stable style id). Set manifest.theme.fontFamily to "${name}". Do not list this file in rheo-import.assets.json or use image/* MIME types.`,
        });
      });
    }

    for (const match of file.content.matchAll(USE_FONTS_RE)) {
      const block = match[1] ?? '';
      extractPairs(block).forEach(({ name, path }) => {
        const key = `${name}:${path}`;
        if (seen.has(key)) return;
        seen.add(key);
        findings.push({
          kind: 'font',
          confidence: 'high',
          file: file.path,
          evidence: `useFonts: ${name} <- ${path}`,
          recommendation: `BLOCKING: Add ${path} to rheo-import.fonts.json for family "${name}" (not rheo-import.assets.json). Set manifest.theme.fontFamily.`,
        });
      });
    }

    if (TAILWIND_FONT_FAMILY_RE.test(file.content)) {
      const block = file.content.match(TAILWIND_FONT_FAMILY_RE)?.[1] ?? file.content;
      const familyEntries = [...block.matchAll(/['"]?([a-zA-Z0-9_-]+)['"]?\s*:\s*\[([^\]]+)\]/g)];
      familyEntries.forEach((entry) => {
        const familyKey = entry[1];
        const stack = entry[2] ?? '';
        const primary = stack.match(/['"]([A-Za-z0-9 _-]+)['"]/)?.[1];
        if (!familyKey || !primary) return;
        const key = `tailwind:${familyKey}:${primary}`;
        if (seen.has(key)) return;
        seen.add(key);
        findings.push({
          kind: 'font',
          confidence: 'medium',
          file: file.path,
          evidence: `tailwind fontFamily.${familyKey}: ${primary}`,
          recommendation: `Set manifest.theme.fontFamily to "${primary}" and bundle every font file used for class font-${familyKey} (search Font.loadAsync / require for "${primary}").`,
        });
      });
    }

    const classes = [...new Set(file.content.match(FONT_CLASS_RE) ?? [])].slice(0, 6);
    classes.forEach((cls) => {
      const familyKey = cls.replace(/^font-/, '');
      if (familyKey === 'bold' || familyKey === 'semibold' || familyKey === 'medium') return;
      const key = `class:${familyKey}`;
      if (seen.has(key)) return;
      seen.add(key);
      findings.push({
        kind: 'font',
        confidence: 'low',
        file: file.path,
        evidence: `Tailwind/NativeWind class ${cls}`,
        recommendation: `Resolve ${cls} to a font family in rheo-import.fonts.json and manifest.theme.fontFamily.`,
      });
    });

    const themeFonts = [...file.content.matchAll(THEME_FONT_RE)];
    themeFonts.forEach((match) => {
      const name = match[1];
      if (!name) return;
      const key = `theme:${name}`;
      if (seen.has(key)) return;
      seen.add(key);
      findings.push({
        kind: 'font',
        confidence: 'medium',
        file: file.path,
        evidence: `theme fontFamily: ${name}`,
        recommendation: `Set manifest.theme.fontFamily to "${name}" and bundle all font files for this family.`,
      });
    });
  });

  return findings;
};
