import type { CollectPublishGateIssuesResult, PublishGateIssue } from './collectPublishGateIssues.js';

const renderIssue = (issue: PublishGateIssue): string =>
  [
    `- **${issue.severity}** \`${issue.code}\`${issue.stepId ? ` (screen \`${issue.stepId}\`)` : ''}`,
    `  - Problem: ${issue.message}`,
    `  - Fix: ${issue.fix}`,
  ].join('\n');

export const renderPublishGateMarkdown = (
  manifestPath: string,
  result: CollectPublishGateIssuesResult,
): string => {
  if (result.ok === false && result.kind === 'invalid_schema') {
    return [
      '# Rheo Publish Gate Audit',
      '',
      `Manifest: \`${manifestPath}\``,
      '',
      '## Result: BLOCKED (schema invalid)',
      '',
      'Fix schema validation before running publish gates. Use `node scripts/validate-manifest.mjs` first.',
      '',
      '## Blocking issues',
      '',
      ...result.issues.map(renderIssue),
      '',
    ].join('\n');
  }

  const blocking = result.blocking;
  const warnings = result.warnings;
  const passed = blocking.length === 0;

  return [
    '# Rheo Publish Gate Audit',
    '',
    `Manifest: \`${manifestPath}\``,
    '',
    passed
      ? '## Result: PASS (ready to import and publish in the dashboard)'
      : '## Result: BLOCKED (fix all blocking issues before calling the import complete)',
    '',
    blocking.length > 0 ? '## Blocking issues' : '## Blocking issues',
    '',
    blocking.length > 0 ? blocking.map(renderIssue).join('\n') : '- None',
    '',
    '## Warnings (non-blocking)',
    '',
    warnings.length > 0 ? warnings.map(renderIssue).join('\n') : '- None',
    '',
    '## Publish gate checklist (dashboard Publish button)',
    '',
    'The audit above mirrors the same rules as the flow editor **Publish** action:',
    '',
    '- Schema: valid FlowManifest (Zod)',
    '- Builder: text/icon `style.color`, Continue on manual-submit inputs, one input per screen, valid graph targets, media triggers',
    '- Publishable: entry connected, completion path, decision branches wired',
    '- Integrations: external surfaces have provider + fallback; RevenueCat enabled when used',
    '- Canvas gates: no disabled layer types (default import assumes all enabled)',
    '- Branding gradients: `$brandGradient:` only on backgrounds; known preset ids when branding is provided',
    '',
    passed
      ? '> Import bundle is publish-ready assuming default app canvas gates and integrations.'
      : '> Do not deliver the import until every blocking issue is fixed and this audit passes.',
    '',
  ].join('\n');
};
