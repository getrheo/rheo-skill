import { Branding } from '@getrheo/contracts/branding';

import { collectCanvasGateViolations, parseCanvasEditorGates, type ResolvedAppIntegrations, type ResolvedCanvasEditorGates } from '@getrheo/contracts';
import type { FlowManifest } from '@getrheo/contracts/manifest';
import {
  collectBrandGradientManifestIssues,
  collectDecisionWarnings,
  collectFlowBuilderIssues,
  collectInterpolationWarnings,
  validateManifest,
  validatePublishable,
  type ManifestValidationIssue,
} from '@getrheo/flow-runtime';

export type PublishGateSeverity = 'blocking' | 'warning';

export type PublishGateIssue = {
  severity: PublishGateSeverity;
  code: string;
  message: string;
  /** Agent-facing fix instruction aligned with dashboard publish validation. */
  fix: string;
  stepId?: string | null;
  path?: (string | number)[];
};

export type CollectPublishGateIssuesResult =
  | { ok: false; kind: 'invalid_schema'; issues: PublishGateIssue[] }
  | {
      ok: boolean;
      kind: 'validated';
      manifest: FlowManifest;
      blocking: PublishGateIssue[];
      warnings: PublishGateIssue[];
    };

/** Import audit assumes RevenueCat may be used; dashboard publish still checks real app settings. */
export const IMPORT_PUBLISH_INTEGRATIONS: ResolvedAppIntegrations = {
  revenuecat: {
    enabled: true,
    defaultOfferingId: 'default',
    defaultPlacementId: '',
  },
  appsflyer: { enabled: false },
};

export type CollectPublishGateOptions = {
  /** Default: all canvas capabilities enabled (import-friendly). */
  canvasGates?: ResolvedCanvasEditorGates;
  /** Default: {@link IMPORT_PUBLISH_INTEGRATIONS} so RevenueCat example manifests pass import audit. */
  integrations?: ResolvedAppIntegrations;
  /** Default: empty branding (skips unknown `$brandGradient:` id checks). */
  branding?: Branding;
};

const toBlocking = (
  issues: ManifestValidationIssue[],
  fixForCode: (code: string, message: string) => string,
): PublishGateIssue[] =>
  issues.map((issue) => ({
    severity: 'blocking' as const,
    code: issue.code,
    message: issue.message,
    fix: fixForCode(issue.code, issue.message),
    stepId: issue.stepId,
    path: issue.path,
  }));

const toWarning = (
  issues: ManifestValidationIssue[],
  fixForCode: (code: string, message: string) => string,
): PublishGateIssue[] =>
  issues.map((issue) => ({
    severity: 'warning' as const,
    code: issue.code,
    message: issue.message,
    fix: fixForCode(issue.code, issue.message),
    stepId: issue.stepId,
    path: issue.path,
  }));

const fixForSchemaOrPublishCode = (code: string, message: string): string => {
  switch (code) {
    case 'flow.no_screens':
      return 'Add at least one screen with regions.body before publishing.';
    case 'flow.no_entry':
      return 'Set entryScreenId to the first screen (or decision / external surface) id in the graph.';
    case 'flow.no_completion_path':
      return 'Connect screens so a path from entry reaches end_flow, a terminal screen next, or an external surface fallback/outcome that ends the flow.';
    case 'decision.incomplete_branches':
      return 'Every decision case and the "everyone else" branch must have next targets before publish.';
    case 'canvas_editor_gate':
      return 'Remove disabled layer types from the manifest, or enable the capability in App settings → Canvas controls before import.';
    case 'brand_gradient.disallowed_field':
      return 'Use `$brandGradient:` tokens only on background fills (screen containerStyle or stack backgrounds), not on text color or borders.';
    case 'brand_gradient.unknown_preset':
      return 'Replace unknown `$brandGradient:` ids with explicit linear-gradient CSS or hex colors from the source audit.';
    case 'screen.unreachable':
    case 'decision.unreachable':
    case 'external_surface.unreachable':
      return 'Connect orphan nodes from entry, or remove unused screens/decisions/surfaces.';
    default:
      return fixForBuilderMessage(message);
  }
};

/** Maps dashboard {@link collectFlowBuilderIssues} strings to agent fixes. */
export const fixForBuilderMessage = (message: string): string => {
  if (message.includes('style.color')) {
    return 'Set style.color on every text and icon layer. Button labels are nested text children — primary buttons should use contrasting label colors (e.g. #ffffff on dark fills). Body copy needs explicit foreground hex from manifest.theme or the style audit.';
  }
  if (message.includes('no Button with action "continue"')) {
    return 'Add a button layer with action.kind "continue" on screens that use text_input, multiple_choice, or scale_input.';
  }
  if (message.includes('fieldKey')) {
    return 'Give each input layer a unique snake_case fieldKey (a-z, 0-9, underscore).';
  }
  if (message.includes('only one is allowed')) {
    return 'Use at most one input layer per screen; split OAuth login, email/password auth, and questionnaires onto separate screens.';
  }
  if (message.includes('cannot combine')) {
    return 'Keep OAuth login, email/password auth, and other inputs on separate screens.';
  }
  if (message.includes('trigger button')) {
    return 'When Lottie/video autoPlay is false, add a button with action.kind "play_media" targeting that layer (or screen background video id).';
  }
  if (message.includes('play-media target')) {
    return 'play_media buttons must target a Lottie or video layer on the same screen, or the screen background video playback id.';
  }
  if (message.includes('media asset')) {
    return 'Assign uploaded placeholder mediaAssetIds to image/video/Lottie layers and screen background fills.';
  }
  if (message.includes('missing screen')) {
    return 'Point go_to_step, choice branching, permission outcomes, and fallback screens at existing screen ids.';
  }
  if (message.includes('Flow entry')) {
    return 'Set entryScreenId to an existing screen, decision, or external surface id.';
  }
  if (message.includes('RevenueCat')) {
    return 'Enable RevenueCat in App settings → Integrations, or remove RevenueCat external surfaces from the import manifest.';
  }
  if (message.includes('integration provider')) {
    return 'Set externalSurfaceNodes[].config.provider to a real provider (e.g. revenuecat), not unspecified.';
  }
  if (message.includes('Fallback edge')) {
    return 'Connect every external surface fallback to the next screen/decision/surface when the paywall dismisses or fails.';
  }
  return `Resolve builder publish rule: ${message}`;
};

const collectIntegrationIssues = (
  manifest: FlowManifest,
  integrations: ResolvedAppIntegrations,
): PublishGateIssue[] => {
  const issues: string[] = [];
  for (const node of manifest.externalSurfaceNodes ?? []) {
    if (node.config.provider === 'unspecified') {
      issues.push(
        `External surface "${node.name ?? node.id}" needs an integration provider — choose one in the flow editor.`,
      );
    }
    if (node.fallback == null) {
      issues.push(
        `External surface "${node.name ?? node.id}" needs a connected Fallback edge — every paywall must route somewhere when no specific outcome is mapped.`,
      );
    }
    if (node.config.provider === 'revenuecat' && !integrations.revenuecat.enabled) {
      issues.push(
        `External surface "${node.name ?? node.id}" uses RevenueCat, but the integration is disabled. Enable it in App Settings → Integrations.`,
      );
    }
  }
  return issues.map((message) => ({
    severity: 'blocking' as const,
    code: 'integration.disabled',
    message,
    fix: fixForBuilderMessage(message),
  }));
};

/**
 * Mirrors dashboard {@link validateFlow} + inline validation sync used before Publish.
 * Use after schema validation so imports are one-click publishable in the builder.
 */
export const collectPublishGateIssues = (
  data: unknown,
  opts: CollectPublishGateOptions = {},
): CollectPublishGateIssuesResult => {
  const validated = validateManifest(data);
  if (!validated.ok) {
    return {
      ok: false,
      kind: 'invalid_schema',
      issues: toBlocking(validated.issues, fixForSchemaOrPublishCode),
    };
  }

  const manifest = validated.manifest;
  const canvasGates = opts.canvasGates ?? parseCanvasEditorGates(null);
  const integrations = opts.integrations ?? IMPORT_PUBLISH_INTEGRATIONS;
  const branding = opts.branding;

  const blocking: PublishGateIssue[] = [];

  blocking.push(
    ...collectFlowBuilderIssues(manifest).map((message) => ({
      severity: 'blocking' as const,
      code: 'builder.rule',
      message,
      fix: fixForBuilderMessage(message),
    })),
  );

  blocking.push(...collectIntegrationIssues(manifest, integrations));

  blocking.push(
    ...collectCanvasGateViolations(manifest, canvasGates).map((message) => ({
      severity: 'blocking' as const,
      code: 'canvas_editor_gate',
      message,
      fix: fixForSchemaOrPublishCode('canvas_editor_gate', message),
    })),
  );

  const publishable = validatePublishable(manifest);
  blocking.push(...toBlocking(publishable.issues, fixForSchemaOrPublishCode));

  blocking.push(
    ...collectBrandGradientManifestIssues(manifest, branding).map((issue) => ({
      severity: 'blocking' as const,
      code: issue.code,
      message: issue.message,
      fix: fixForSchemaOrPublishCode(issue.code, issue.message),
      stepId: issue.stepId,
      path: issue.path,
    })),
  );

  const warnings: PublishGateIssue[] = [
    ...toWarning(publishable.warnings, fixForSchemaOrPublishCode),
    ...collectInterpolationWarnings(manifest).map((message) => ({
      severity: 'warning' as const,
      code: 'interpolation.warning',
      message,
      fix: 'Fix template placeholders or add missing sdkAttributeKeys.',
    })),
    ...collectDecisionWarnings(manifest).map((message) => ({
      severity: 'warning' as const,
      code: 'decision.warning',
      message,
      fix: 'Review decision branches and sdkAttributeKeys for consistency with source.',
    })),
  ];

  return {
    ok: blocking.length === 0,
    kind: 'validated',
    manifest,
    blocking,
    warnings,
  };
};
