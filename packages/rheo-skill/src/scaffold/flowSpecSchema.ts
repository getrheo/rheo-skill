import { z } from 'zod';
import { DecisionNodeSchema, OsPermissionKeySchema, ThemeSchema } from '@getrheo/contracts';
import type { FlowSpec, LayerIntent } from './scaffoldTypes.js';

const StyleRecordSchema = z.record(z.string(), z.unknown());

const LocalizedOrStringSchema = z.union([
  z.string().min(1),
  z.object({
    default: z.string().min(1),
    translations: z.record(z.string(), z.string()).optional(),
  }),
]);

const ActionObjectSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('none') }),
  z.object({ kind: z.literal('continue') }),
  z.object({ kind: z.literal('skip') }),
  z.object({ kind: z.literal('end_flow') }),
  z.object({ kind: z.literal('request_app_review') }),
  z.object({ kind: z.literal('go_back_one_screen'), fallbackScreenId: z.string().min(1).optional() }),
  z.object({ kind: z.literal('go_to_step'), screenId: z.string().min(1) }),
  z.object({
    kind: z.literal('request_os_permission'),
    permissionKey: OsPermissionKeySchema,
    outcomes: z.object({
      granted: z.string().min(1),
      denied: z.string().min(1),
      blocked: z.string().min(1),
    }),
  }),
  z.object({ kind: z.literal('play_media'), targetLayerIds: z.array(z.string().min(1)).min(1) }),
]);

const ButtonActionSpecSchema = z.union([
  z.enum(['none', 'continue', 'skip', 'end_flow', 'go_back_one_screen', 'request_app_review']),
  ActionObjectSchema,
]);

const BranchingSpecSchema = z.object({
  enabled: z.boolean(),
  conditions: z.array(z.object({ choiceId: z.string().min(1), goTo: z.string().min(1) })),
});

const commonIntentShape = {
  id: z.string().min(1).max(64).optional(),
  name: z.string().max(80).optional(),
  style: StyleRecordSchema.optional(),
  styleBreakpoints: StyleRecordSchema.optional(),
};

const ChoiceOptionSchema = z.object({
  optionId: z.string().min(1).max(64).optional(),
  label: LocalizedOrStringSchema,
  icon: z.string().min(1).optional(),
  style: StyleRecordSchema.optional(),
  selectedStyle: StyleRecordSchema.optional(),
  labelStyle: StyleRecordSchema.optional(),
});

const OAuthProviderSpecSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('preset'),
    provider: z.enum(['google', 'github', 'apple']),
    label: LocalizedOrStringSchema.optional(),
  }),
  z.object({
    type: z.literal('custom'),
    rowId: z.string().uuid().optional(),
    label: LocalizedOrStringSchema,
    iconName: z.string().min(1),
    family: z.literal('ionicons').optional(),
    buttonVariant: z.string().optional(),
  }),
]);

/** Recursive layer-intent union. Members reference {@link LayerIntentSchema} via `z.lazy` for nested children. */
export const LayerIntentSchema: z.ZodType<LayerIntent> = z.lazy(() =>
  z.discriminatedUnion('kind', [
    z.object({ ...commonIntentShape, kind: z.literal('text'), text: LocalizedOrStringSchema }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('image'),
      mediaAssetId: z.string().uuid().optional(),
      alt: z.string().max(280).optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('lottie'),
      mediaAssetId: z.string().uuid().optional(),
      loop: z.boolean().optional(),
      autoPlay: z.boolean().optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('video'),
      mediaAssetId: z.string().uuid().optional(),
      loop: z.boolean().optional(),
      autoPlay: z.boolean().optional(),
      audioEnabled: z.boolean().optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('icon'),
      iconName: z.string().min(1).max(128),
      family: z.literal('ionicons').optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('button'),
      label: LocalizedOrStringSchema.optional(),
      action: ButtonActionSpecSchema.optional(),
      variant: z.string().optional(),
      icon: z.string().min(1).optional(),
      labelStyle: StyleRecordSchema.optional(),
      children: z.lazy(() => z.array(LayerIntentSchema)).optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('back_button'),
      label: LocalizedOrStringSchema.optional(),
      icon: z.string().min(1).optional(),
      variant: z.string().optional(),
      fallbackScreenId: z.string().min(1).optional(),
      labelStyle: StyleRecordSchema.optional(),
      children: z.lazy(() => z.array(LayerIntentSchema)).optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('hyperlink'),
      href: z.string().min(1).max(2048),
      label: LocalizedOrStringSchema.optional(),
      labelStyle: StyleRecordSchema.optional(),
      children: z.lazy(() => z.array(LayerIntentSchema)).optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('stack'),
      direction: z.enum(['vertical', 'horizontal']).optional(),
      gap: z.number().int().min(0).optional(),
      align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
      justify: z.enum(['start', 'center', 'end']).optional(),
      distribution: z.enum(['start', 'center', 'end', 'between', 'around']).optional(),
      wrap: z.boolean().optional(),
      selectedStyle: StyleRecordSchema.optional(),
      children: z.lazy(() => z.array(LayerIntentSchema)),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('single_choice'),
      fieldKey: z.string().min(1),
      options: z.array(ChoiceOptionSchema).min(2),
      direction: z.enum(['vertical', 'horizontal', 'grid']).optional(),
      gap: z.number().int().min(0).optional(),
      columns: z.number().int().min(1).max(12).optional(),
      branching: BranchingSpecSchema.optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('multiple_choice'),
      fieldKey: z.string().min(1),
      options: z.array(ChoiceOptionSchema).min(2),
      direction: z.enum(['vertical', 'horizontal', 'grid']).optional(),
      gap: z.number().int().min(0).optional(),
      columns: z.number().int().min(1).max(12).optional(),
      minSelections: z.number().int().nonnegative().optional(),
      maxSelections: z.number().int().positive().optional(),
      branching: BranchingSpecSchema.optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('text_input'),
      fieldKey: z.string().min(1),
      placeholder: LocalizedOrStringSchema.optional(),
      inputType: z.enum(['plain', 'email', 'phone', 'url', 'multiline']).optional(),
      required: z.boolean().optional(),
      minLength: z.number().int().min(0).max(2000).optional(),
      maxLength: z.number().int().positive().max(2000).optional(),
      classification: z.enum(['safe', 'sensitive']).optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('scale_input'),
      fieldKey: z.string().min(1),
      min: z.number(),
      max: z.number(),
      step: z.number().positive().optional(),
      defaultValue: z.number().optional(),
      minLabel: LocalizedOrStringSchema.optional(),
      maxLabel: LocalizedOrStringSchema.optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('checkbox'),
      fieldKey: z.string().min(1),
      blocking: z.boolean().optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('counter'),
      startValue: z.number().finite(),
      endValue: z.number().finite(),
      durationMs: z.number().int().min(0).max(3_600_000).optional(),
      delayMs: z.number().int().min(0).max(3_600_000).optional(),
      decimalPlaces: z.number().int().min(0).max(10).optional(),
      displayKind: z.enum(['number', 'time']).optional(),
      timeFormat: z.enum(['mm_ss', 'hh_mm_ss', 'dd_hh_mm_ss']).optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('progress'),
      trackColor: z.string().optional(),
      fillColor: z.string().optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('loader'),
      variant: z.enum(['linear', 'circular']).optional(),
      targetPercent: z.number().int().min(0).max(100).optional(),
      fillDelayMs: z.number().int().min(0).max(10_000).optional(),
      durationMs: z.number().int().min(0).max(3_600_000).optional(),
      onComplete: z
        .discriminatedUnion('mode', [
          z.object({ mode: z.literal('none') }),
          z.object({ mode: z.literal('next') }),
          z.object({ mode: z.literal('screen'), screenId: z.string().min(1) }),
        ])
        .optional(),
      trackColor: z.string().optional(),
      fillColor: z.string().optional(),
      align: z.enum(['start', 'center', 'end']).optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('carousel'),
      slides: z
        .array(
          z.object({
            id: z.string().min(1).max(64).optional(),
            direction: z.enum(['vertical', 'horizontal']).optional(),
            gap: z.number().int().min(0).optional(),
            align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
            justify: z.enum(['start', 'center', 'end']).optional(),
            style: StyleRecordSchema.optional(),
            children: z.lazy(() => z.array(LayerIntentSchema)),
          }),
        )
        .min(1),
      pageControl: z
        .object({ position: z.enum(['top', 'bottom']) })
        .catchall(z.unknown())
        .optional(),
      loop: z.boolean().optional(),
      autoAdvance: z.boolean().optional(),
      autoAdvanceMs: z.number().int().min(500).max(60000).optional(),
      openOn: z.number().int().min(0).optional(),
      pageAlignment: z.enum(['top', 'center', 'bottom']).optional(),
      pageSpacing: z.number().int().min(0).optional(),
      pagePeek: z.number().int().min(0).max(400).optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('oauth_login'),
      providers: z.array(OAuthProviderSpecSchema).min(1),
      gap: z.number().int().min(0).optional(),
      align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
    }),
    z.object({
      ...commonIntentShape,
      kind: z.literal('email_password_auth'),
      fieldKey: z.string().min(1),
      mode: z.enum(['sign_in', 'sign_up']),
      emailPlaceholder: LocalizedOrStringSchema.optional(),
      passwordPlaceholder: LocalizedOrStringSchema.optional(),
      confirmPlaceholder: LocalizedOrStringSchema.optional(),
      submitLabel: LocalizedOrStringSchema.optional(),
      minPasswordLength: z.number().int().min(4).max(128).optional(),
      gap: z.number().int().min(0).optional(),
      align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
    }),
  ]),
) as z.ZodType<LayerIntent>;

const ScreenSpecSchema = z.object({
  id: z.string().min(1).max(64).optional(),
  name: z.string().min(1).max(80),
  header: z.array(LayerIntentSchema).optional(),
  body: z.array(LayerIntentSchema),
  footer: z.array(LayerIntentSchema).optional(),
  containerStyle: StyleRecordSchema.optional(),
  next: z.string().min(1).nullable().optional(),
});

const ExternalSurfaceSpecSchema = z.object({
  id: z.string().min(1).max(64),
  name: z.string().min(1).max(80).optional(),
  provider: z.enum(['revenuecat', 'unspecified']),
  offeringId: z.string().min(1).max(128).optional(),
  placementId: z.string().min(1).max(128).optional(),
  presentation: z.enum(['paywall', 'paywall_if_needed']).optional(),
  outcomes: z
    .object({
      purchase_completed: z.string().min(1).nullable().optional(),
      purchase_cancelled: z.string().min(1).nullable().optional(),
      dismissed: z.string().min(1).nullable().optional(),
      failed: z.string().min(1).nullable().optional(),
      restore_completed: z.string().min(1).nullable().optional(),
    })
    .optional(),
  fallback: z.string().min(1).nullable(),
});

export const FlowSpecSchema = z.object({
  flowId: z.string().uuid().optional(),
  version: z.number().int().positive().optional(),
  defaultLocale: z.string().optional(),
  locales: z.array(z.string()).optional(),
  entry: z.string().min(1).optional(),
  theme: ThemeSchema.optional(),
  sdkAttributeKeys: z.array(z.string().min(1).max(128)).optional(),
  screens: z.array(ScreenSpecSchema).min(1),
  decisions: z.array(DecisionNodeSchema).optional(),
  externalSurfaces: z.array(ExternalSurfaceSpecSchema).optional(),
}) as z.ZodType<FlowSpec>;

export type FlowSpecIssue = { path: (string | number)[]; message: string };

export type ParseFlowSpecResult =
  | { ok: true; spec: FlowSpec }
  | { ok: false; issues: FlowSpecIssue[] };

/** Parse + validate a raw flow spec, returning path-scoped issues on failure. */
export const parseFlowSpec = (data: unknown): ParseFlowSpecResult => {
  const result = FlowSpecSchema.safeParse(data);
  if (result.success) {
    return { ok: true, spec: result.data };
  }
  return {
    ok: false,
    issues: result.error.issues.map((issue) => ({
      path: issue.path,
      message: issue.message,
    })),
  };
};
