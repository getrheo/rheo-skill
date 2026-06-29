import type { AuditFile, AuditFinding } from '../auditTypes.js';

const hasAny = (content: string, patterns: RegExp[]): string | null => {
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match?.[0]) return match[0];
  }
  return null;
};

export const analyzeRegions = (files: AuditFile[]): AuditFinding[] => {
  const findings: AuditFinding[] = [];
  const headerPatterns = [
    /\b(OnboardingHeader|NavigationHeader|Header|Toolbar|TopBar)\b/,
    /\b(BackButton|CloseButton|ChevronLeft|ArrowLeft|router\.back|navigation\.goBack)\b/,
    /\b(ProgressBar|StepProgress|progress)\b/i,
    /edges=\{?\[?['"]top['"]\]?/,
  ];
  const footerPatterns = [
    /\b(Footer|BottomBar|StickyFooter|CTAContainer|BottomActions|BottomSheetFooter)\b/,
    /edges=\{?\[?['"]bottom['"]\]?/,
    /(position\s*:\s*['"]absolute['"][\s\S]{0,120}bottom\s*:)|(bottom\s*:\s*0[\s\S]{0,120}position\s*:\s*['"]absolute['"])/,
  ];
  const bodyPatterns = [/\b(ScrollView|FlatList|SectionList|KeyboardAwareScrollView)\b/];

  files.forEach((file) => {
    if (!file.content) return;
    const header = hasAny(file.content, headerPatterns);
    if (header) {
      findings.push({
        kind: 'region',
        confidence: 'high',
        file: file.path,
        evidence: `Header/top chrome marker: ${header}`,
        recommendation: 'Use regions.header for back/close controls, progress, and top onboarding chrome.',
      });
    }
    const footer = hasAny(file.content, footerPatterns);
    const carouselPager = /\b(infoSteps|currentInfoStep)\b/.test(file.content);
    if (footer) {
      findings.push({
        kind: 'region',
        confidence: 'high',
        file: file.path,
        evidence: `Footer/sticky CTA marker: ${footer}`,
        recommendation: carouselPager
          ? 'If this footer only advances in-screen pager pages (infoSteps/currentInfoStep), do not map it to regions.footer — use a swipe-only carousel layer. Use regions.footer only for CTAs that advance the next screen in the flow.'
          : 'Use regions.footer for sticky bottom CTAs instead of placing them at the end of body.',
      });
    }
    const body = hasAny(file.content, bodyPatterns);
    if (body) {
      findings.push({
        kind: 'region',
        confidence: 'medium',
        file: file.path,
        evidence: `Scrollable/main content marker: ${body}`,
        recommendation: 'Use regions.body for the main scrollable content stack.',
      });
    }
  });

  return findings;
};
