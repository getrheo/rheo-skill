import type { AuditFile, AuditFinding } from '../auditTypes.js';

const GRADIENT_COLORS_RE =
  /colors\s*=\s*\{\s*\[([^\]]+)\]\s*\}|colors\s*=\s*\[\s*([^\]]+)\s*\]/g;
const HEX_IN_GRADIENT_RE = /#[0-9a-fA-F]{3,8}\b|['"][#][0-9a-fA-F]{3,8}['"]/g;

const extractGradientStops = (content: string): string[] => {
  const stops: string[] = [];
  let match = GRADIENT_COLORS_RE.exec(content);
  while (match) {
    const raw = match[1] ?? match[2] ?? '';
    const hexes = raw.match(HEX_IN_GRADIENT_RE) ?? [];
    hexes.forEach((hex) => {
      const cleaned = hex.replace(/['"]/g, '');
      if (cleaned.startsWith('#')) stops.push(cleaned);
    });
    match = GRADIENT_COLORS_RE.exec(content);
  }
  GRADIENT_COLORS_RE.lastIndex = 0;
  return [...new Set(stops)];
};

export const analyzeBackgrounds = (files: AuditFile[]): AuditFinding[] => {
  const findings: AuditFinding[] = [];

  files.forEach((file) => {
    if (!file.content) return;

    const gradientStops = extractGradientStops(file.content);
    if (gradientStops.length >= 2) {
      const css = `linear-gradient(180deg, ${gradientStops[0]} 0%, ${gradientStops[gradientStops.length - 1]} 100%)`;
      findings.push({
        kind: 'background',
        confidence: 'high',
        file: file.path,
        evidence: `LinearGradient stops: ${gradientStops.join(' → ')}`,
        recommendation: `Set screen.containerStyle.backgroundFill to { "kind": "color", "color": "${css}" }. If the gradient wraps the whole shell (e.g. BackgroundGradient), apply to every default onboarding screen unless a screen overrides with a solid brand color.`,
      });
    }

    const checks: Array<[RegExp, string, string]> = [
      [
        /\b(LinearGradient|CAGradientLayer|expo-linear-gradient|SwiftUI\.LinearGradient)\b/,
        'Gradient background marker',
        'Do not drop gradients. Use `backgroundFill.kind: "color"` with a `linear-gradient(...)` CSS string, or approximate with the dominant stop hex when only one color is clear.',
      ],
      [
        /\bBackgroundGradient\b/,
        'Shared gradient shell component',
        'Apply the same screen-level gradient to all screens that mount this shell. Inspect default start/end colors in the component definition.',
      ],
      [
        /\b(ImageBackground|backgroundImage|backgroundAsset|heroBackground)\b/,
        'Image background marker',
        'Use screen.containerStyle.backgroundFill with an image media asset when this is screen-level chrome.',
      ],
      [
        /\b(VideoBackground|backgroundVideo|videoBackground)\b/,
        'Video background marker',
        'Use screen.containerStyle.backgroundFill with a video media asset when this is screen-level chrome.',
      ],
      [
        /\b(backgroundColor|background|bg-(?:red|primary|teal|white|gray)[a-z0-9-]*)\b/i,
        'Container background marker',
        'Map screen-level colors into screen.containerStyle.backgroundFill. Pair with light text (`#FFFFFF`) when the fill is dark or saturated.',
      ],
    ];

    checks.forEach(([pattern, label, recommendation]) => {
      const match = file.content?.match(pattern)?.[0];
      if (!match) return;
      findings.push({
        kind: 'background',
        confidence: label.includes('Gradient') || label.includes('Image') ? 'high' : 'medium',
        file: file.path,
        evidence: `${label}: ${match}`,
        recommendation,
      });
    });
  });

  return findings;
};
