import type { AuditFinding } from './auditTypes.js';

export const MANDATORY_INTAKE_QUESTIONS = [
  'Which file, route, or coordinator starts the existing flow? (Required before audit.)',
  'What is the business purpose of this flow in one sentence? (e.g. onboarding, paywall, post-purchase setup.)',
  'Should the import optimize for visual fidelity or editable structure in the Rheo builder?',
  'Is source code or supplied screenshots/recordings more current when they disagree?',
  'Are there steps that must stay native/host-owned (signature pad, camera, custom WebView, paywall SDK) vs approximated in Rheo?',
  'Match motion from the codebase (may differ slightly from Rheo presets)?',
  'Does the app use i18n/localization? If yes, which locale is the default/fallback (e.g. en)? All Rheo `text.default` values must be resolved strings from that locale — never raw translation keys.',
] as const;

export const buildMandatoryIntakeFindings = (opts: {
  entry?: string;
  screenshots?: string;
}): AuditFinding[] => {
  const findings: AuditFinding[] = [];

  if (!opts.entry) {
    findings.push({
      kind: 'question',
      confidence: 'high',
      file: '(intake gate)',
      evidence: 'Entry point was not provided to `audit-import`.',
      recommendation:
        'BLOCKING: Ask the user for the flow entry file/route before generating a manifest. Re-run `node scripts/audit-import.mjs --entry <path>`.',
    });
  }

  MANDATORY_INTAKE_QUESTIONS.forEach((question, index) => {
    findings.push({
      kind: 'question',
      confidence: 'high',
      file: '(mandatory intake)',
      evidence: `Q${index + 1}: ${question}`,
      recommendation:
        'BLOCKING: Record the user answer in chat before manifest generation. Do not skip the intake questionnaire.',
    });
  });

  if (!opts.screenshots) {
    findings.push({
      kind: 'question',
      confidence: 'medium',
      file: '(intake gate)',
      evidence: 'No screenshots or recordings path was provided.',
      recommendation:
        'Ask whether the user can share screenshots or a screen recording for carousel slides, gradients, and card chrome.',
    });
  }

  return findings;
};
