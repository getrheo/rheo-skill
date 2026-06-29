import type { AuditFile, AuditFinding } from '../auditTypes.js';

const CHOICE_COMPONENT_RE =
  /Step[A-Z][A-Za-z0-9]*|single_choice|multiple_choice|SingleChoice|MultipleChoice/i;

const SELECTED_TERNARY_RE =
  /(\w+)\s*===\s*[^?]+\?\s*['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]/g;

const SELECTED_STYLE_OBJECT_RE =
  /selected(?:Style|State)?\s*:\s*\{([^}]+)\}/gi;

const parseTailwindTokens = (value: string): { border?: string; background?: string; colors: string[] } => {
  const colors: string[] = [];
  let border: string | undefined;
  let background: string | undefined;

  value.split(/\s+/).forEach((token) => {
    if (token.startsWith('border-') && !token.startsWith('border-2')) {
      border = token;
    } else if (token.startsWith('bg-')) {
      background = token;
    } else if (token.startsWith('text-')) {
      colors.push(token);
    }
  });

  return { border, background, colors };
};

export const analyzeChoiceStates = (files: AuditFile[]): AuditFinding[] => {
  const findings: AuditFinding[] = [];

  files.forEach((file) => {
    if (!file.content) return;
    const choiceContext = CHOICE_COMPONENT_RE.test(file.path) || CHOICE_COMPONENT_RE.test(file.content);
    if (!choiceContext) return;

    let match = SELECTED_TERNARY_RE.exec(file.content);
    while (match) {
      const variable = match[1];
      const selected = match[2];
      const unselected = match[3];
      if (!variable || !selected || !unselected) {
        match = SELECTED_TERNARY_RE.exec(file.content);
        continue;
      }

      const selectedTokens = parseTailwindTokens(selected);

      findings.push({
        kind: 'choice',
        confidence: 'high',
        file: file.path,
        evidence: `${variable} selected ? "${selected}" : "${unselected}"`,
        recommendation:
          'Map the unselected branch to each option stack `style` and the selected branch to `selectedStyle` on the same stack (border, background, padding, radius). Map text color classes to nested text layer `style.color` for default vs selected if they differ.',
      });

      if (selectedTokens.border || selectedTokens.background) {
        findings.push({
          kind: 'choice',
          confidence: 'high',
          file: file.path,
          evidence: `Selected chrome: ${[selectedTokens.border, selectedTokens.background].filter(Boolean).join(' ')}`,
          recommendation:
            'Translate selected border/background classes into option stack `selectedStyle.border` and `selectedStyle.background` hex values from theme tokens.',
        });
      }

      match = SELECTED_TERNARY_RE.exec(file.content);
    }
    SELECTED_TERNARY_RE.lastIndex = 0;

    for (const styleMatch of file.content.matchAll(SELECTED_STYLE_OBJECT_RE)) {
      const body = styleMatch[1] ?? '';
      findings.push({
        kind: 'choice',
        confidence: 'medium',
        file: file.path,
        evidence: `Selected style object: ${body.trim().slice(0, 120)}`,
        recommendation: 'Mirror this object into Rheo `selectedStyle` on choice option stacks.',
      });
    }

    if (/border-primary|bg-primary|text-primary/i.test(file.content) && /border-gray|bg-gray/i.test(file.content)) {
      findings.push({
        kind: 'choice',
        confidence: 'medium',
        file: file.path,
        evidence: 'Primary vs gray choice card classes in same file',
        recommendation:
          'Each single_choice / multiple_choice option child stack needs both `style` (default) and `selectedStyle` (selected). Do not only style the default state.',
      });
    }
  });

  return findings;
};
