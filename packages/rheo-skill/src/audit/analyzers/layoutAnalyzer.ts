import type { AuditFile, AuditFinding } from '../auditTypes.js';

const SHADOW_RE =
  /\b(shadowColor|shadowOffset|shadowOpacity|shadowRadius|elevation|boxShadow)\b[^,\n}]*/gi;
const BORDER_RE = /\b(borderWidth|borderColor|border-2|border-\[|border:\s*\{)/gi;
const ALIGN_RE =
  /\b(alignItems|justifyContent|alignSelf|textAlign|items-center|justify-center|text-center)\b[^,\n}]*/gi;
const CENTER_CLASS_RE = /\bitems-center\b|\bjustify-center\b|\btext-center\b/g;

export const analyzeLayout = (files: AuditFile[]): AuditFinding[] => {
  const findings: AuditFinding[] = [];

  files.forEach((file) => {
    if (!file.content) return;

    const shadows = [...new Set(file.content.match(SHADOW_RE) ?? [])].slice(0, 4);
    shadows.forEach((match) => {
      findings.push({
        kind: 'layout',
        confidence: 'high',
        file: file.path,
        evidence: match.trim(),
        recommendation:
          'Map to layer or stack `style.shadow` (offset/blur/color/opacity). Card chrome should use a wrapping `stack` with background, radius, padding, border, and shadow — not flat siblings.',
      });
    });

    const borders = [...new Set(file.content.match(BORDER_RE) ?? [])].slice(0, 4);
    borders.forEach((match) => {
      findings.push({
        kind: 'layout',
        confidence: 'medium',
        file: file.path,
        evidence: match.trim(),
        recommendation:
          'Map to `style.border` and `style.background` on the enclosing stack. Preserve selected-state border colors on choice options.',
      });
    });

    const aligns = [...new Set(file.content.match(ALIGN_RE) ?? [])].slice(0, 4);
    if (aligns.length > 0) {
      findings.push({
        kind: 'layout',
        confidence: 'high',
        file: file.path,
        evidence: aligns.join('; '),
        recommendation:
          'Map RN/Tailwind centering to parent `stack.align: "center"` and `stack.justify: "center"`. Center hero images inside vertical body stacks. Use `style.align: "center"` on text layers.',
      });
    }

    if (CENTER_CLASS_RE.test(file.content) && /kind:\s*['"]image['"]|Image\b/.test(file.content)) {
      findings.push({
        kind: 'layout',
        confidence: 'high',
        file: file.path,
        evidence: 'Centered layout classes near image content',
        recommendation:
          'Wrap centered images in a vertical stack with `align: "center"`. Set explicit image `style.width`/`style.height` from source dimensions.',
      });
    }

    if (/\btext-white\b|\bcolor:\s*['"]#fff|#ffffff/i.test(file.content)) {
      findings.push({
        kind: 'layout',
        confidence: 'high',
        file: file.path,
        evidence: 'Light foreground text on colored screen',
        recommendation:
          'When the screen uses a dark or saturated `containerStyle.backgroundFill`, set text `style.color` to `#FFFFFF` or `theme.primaryForeground` — do not rely on default `theme.foreground`.',
      });
    }
  });

  return findings;
};
