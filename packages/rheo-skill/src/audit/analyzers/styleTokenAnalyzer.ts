import type { AuditFile, AuditFinding } from '../auditTypes.js';
import type { AuditConfidence } from '../auditTypes.js';

const TOKEN_FILE_RE = /(theme|token|color|typography|tailwind|nativewind|style|button|text|font)/i;
const ONBOARDING_RE = /onboarding|BackgroundGradient|tailwind\.config/i;
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
const RADIUS_RE = /\b(borderRadius|radius|rounded(?:-[a-z0-9]+)?)\b[^,\n}]*/gi;
const FONT_RE = /\b(fontSize|fontWeight|fontFamily|Font\.)\b[^,\n}]*/gi;
const SPACING_RE = /\b(spacing|gap|padding|margin)\b[^,\n}]*/gi;
const TAILWIND_COLOR_RE = /\b(?:bg|text|border)-(?:primary|secondary|gray|red|teal|white|black)[a-z0-9-]*/gi;
const STYLE_SHEET_RE = /StyleSheet\.create\s*\(\s*\{[\s\S]{0,400}?\}\s*\)/g;

const pushMatches = (
  findings: AuditFinding[],
  file: AuditFile,
  matches: Iterable<string>,
  recommendation: string,
  confidence: AuditConfidence,
): void => {
  [...matches].slice(0, 8).forEach((match) => {
    findings.push({
      kind: 'style',
      confidence,
      file: file.path,
      evidence: match.trim(),
      recommendation,
    });
  });
};

export const analyzeStyleTokens = (files: AuditFile[]): AuditFinding[] => {
  const findings: AuditFinding[] = [];
  const seenHex = new Set<string>();

  files.forEach((file) => {
    if (!file.content) return;
    const tokenFile = TOKEN_FILE_RE.test(file.path);
    const onboardingFile = ONBOARDING_RE.test(file.path);
    const priority = tokenFile || onboardingFile;

    const hexes = [...new Set(file.content.match(HEX_RE) ?? [])].filter((hex) => {
      if (seenHex.has(hex)) return false;
      seenHex.add(hex);
      return true;
    });

    if (hexes.length > 0 && (priority || hexes.length <= 12)) {
      pushMatches(
        findings,
        file,
        hexes,
        'Map colors into `manifest.theme` and layer `style.color` / `style.background`. Do not leave text layers without `style.color` on colored screens.',
        tokenFile ? 'high' : 'medium',
      );
    }

    if (priority) {
      pushMatches(
        findings,
        file,
        file.content.match(RADIUS_RE) ?? [],
        'Map radius tokens to `manifest.theme.borderRadius`, stack `style.radius`, and choice-card chrome.',
        'medium',
      );
      pushMatches(
        findings,
        file,
        file.content.match(FONT_RE) ?? [],
        'Map typography to text layer `fontSize`, `fontWeight`, and optional `fontFamily`.',
        'medium',
      );
      pushMatches(
        findings,
        file,
        file.content.match(SPACING_RE) ?? [],
        'Use spacing tokens for stack `gap` and region/layer padding.',
        'low',
      );
      pushMatches(
        findings,
        file,
        file.content.match(TAILWIND_COLOR_RE) ?? [],
        'Resolve Tailwind/NativeWind classes to hex values in `manifest.theme` and layer styles.',
        'medium',
      );
      pushMatches(
        findings,
        file,
        file.content.match(STYLE_SHEET_RE) ?? [],
        'Extract `StyleSheet.create` colors, borders, and shadows into manifest layer/stack styles.',
        'high',
      );
    }
  });

  if (findings.length === 0) {
    findings.push({
      kind: 'question',
      confidence: 'medium',
      file: '(style audit)',
      evidence: 'No obvious style token files or color constants were found.',
      recommendation:
        'Ask the user where brand/theme tokens live before falling back to black and white.',
    });
  }

  return findings;
};
