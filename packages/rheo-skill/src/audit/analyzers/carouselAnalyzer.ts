import type { AuditFile, AuditFinding } from '../auditTypes.js';

const CAROUSEL_NO_DUPLICATE_FOOTER =
  'Carousels are swipe-only (optional pageControl dots). Do not add regions.footer or body buttons for in-pager paging. Use regions.footer only for CTAs that advance the next screen in the flow, or single-slide carousels.';

const CAROUSEL_PATTERNS: Array<[RegExp, string, string]> = [
  [
    /\binfoSteps\b/,
    'In-screen pager array (`infoSteps`)',
    `Emit a \`carousel\` layer with one vertical \`stack\` slide per entry. Map each slide image/text from the array. Do not collapse to a single static screen. ${CAROUSEL_NO_DUPLICATE_FOOTER}`,
  ],
  [
    /\bcurrentInfoStep\b/,
    'Paged step index (`currentInfoStep`)',
    `The screen is multi-slide. Use \`kind: "carousel"\` (or split into multiple screens only if the user requests structure over fidelity). ${CAROUSEL_NO_DUPLICATE_FOOTER}`,
  ],
  [
    /\btranslateX\b[\s\S]{0,120}\binterpolate\b/,
    'Animated horizontal pager (`translateX` + `interpolate`)',
    'Treat as carousel semantics. Each pager page needs its own slide stack and bundled assets.',
  ],
  [
    /\bpagingEnabled\b|\bhorizontal\b[\s\S]{0,80}\bFlatList\b|\bPagerView\b|\breact-native-pager-view\b/,
    'Horizontal paging list',
    'Use `kind: "carousel"` when pages are distinct onboarding steps inside one route.',
  ],
  [
    /\bTestimonialCarousel\b|\bCarousel\b|\bSwiper\b/,
    'Named carousel component',
    'Inspect children/slides. For onboarding content, prefer `carousel` layers; for host paywalls, use external surfaces when appropriate.',
  ],
  [
    /\bflex-row\b[\s\S]{0,200}\bscreenWidth\b/,
    'Full-width horizontal slide row',
    'Likely in-screen carousel. Emit `carousel` with `pageControl` when dot indicators are present.',
  ],
];

const countArrayEntries = (content: string, name: string): number | null => {
  const re = new RegExp(`\\b${name}\\s*=\\s*\\[`, 'm');
  const start = content.search(re);
  if (start < 0) return null;
  let depth = 0;
  for (let i = start; i < content.length; i += 1) {
    const ch = content[i];
    if (ch === '[') depth += 1;
    if (ch === ']') {
      depth -= 1;
      if (depth === 0) {
        const slice = content.slice(start, i + 1);
        const objects = slice.match(/\{[\s\S]*?\}/g);
        return objects?.length ?? null;
      }
    }
  }
  return null;
};

export const analyzeCarousels = (files: AuditFile[]): AuditFinding[] => {
  const findings: AuditFinding[] = [];

  files.forEach((file) => {
    const content = file.content;
    if (!content) return;
    CAROUSEL_PATTERNS.forEach(([pattern, label, recommendation]) => {
      if (!pattern.test(content)) return;
      const slideCount = countArrayEntries(content, 'infoSteps');
      const evidence =
        slideCount !== null ? `${label} (${slideCount} slides detected)` : label;
      findings.push({
        kind: 'carousel',
        confidence: slideCount !== null && slideCount > 1 ? 'high' : 'medium',
        file: file.path,
        evidence,
        recommendation,
      });
    });
  });

  return findings;
};
