import { randomUUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { isAbsolute, resolve } from 'node:path';
import { MANIFEST_SCHEMA_VERSION } from '@getrheo/contracts';
import { validateManifest, type ManifestValidationIssue } from '@getrheo/flow-runtime';
import { parseFlowSpec, type FlowSpecIssue } from './flowSpecSchema.js';
import type {
  ButtonActionSpec,
  ButtonIntent,
  BackButtonIntent,
  CarouselIntent,
  EmailPasswordAuthIntent,
  FlowSpec,
  HyperlinkIntent,
  LayerIntent,
  LocalizedOrString,
  MultipleChoiceIntent,
  OAuthLoginIntent,
  ScreenSpec,
  SingleChoiceIntent,
  StackIntent,
  ExternalSurfaceSpec,
  StyleRecord,
} from './scaffoldTypes.js';

type Json = Record<string, unknown>;

/** Maps source/framework button variants to the Rheo enum; passes valid values through. */
const VARIANT_MAP: Record<string, 'primary' | 'secondary' | 'ghost' | 'destructive'> = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'ghost',
  destructive: 'destructive',
  outline: 'secondary',
  bordered: 'secondary',
  tertiary: 'ghost',
  text: 'ghost',
  link: 'ghost',
  plain: 'ghost',
  default: 'primary',
  filled: 'primary',
  solid: 'primary',
  danger: 'destructive',
  error: 'destructive',
};

const mapVariant = (
  src: string | undefined,
  fallback: 'primary' | 'secondary' | 'ghost' | 'destructive',
): 'primary' | 'secondary' | 'ghost' | 'destructive' =>
  src ? VARIANT_MAP[src.trim().toLowerCase()] ?? fallback : fallback;

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 32) || 'x';

const toLocalized = (value: LocalizedOrString): Json =>
  typeof value === 'string' ? { default: value } : { ...value };

const normalizeAction = (action: ButtonActionSpec | undefined): Json => {
  if (action == null) return { kind: 'continue' };
  if (typeof action === 'string') return { kind: action };
  return { ...action };
};

/** Deterministic, collision-free `lyr_*` id allocation across a manifest. */
class IdFactory {
  private readonly used = new Set<string>();

  ensure(candidate: string): string {
    const base = candidate.slice(0, 60);
    if (!this.used.has(base)) {
      this.used.add(base);
      return base;
    }
    for (let n = 2; ; n += 1) {
      const next = `${base}_${n}`.slice(0, 64);
      if (!this.used.has(next)) {
        this.used.add(next);
        return next;
      }
    }
  }

  layer(explicit: string | undefined, fallbackBase: string): string {
    if (explicit && /^lyr_[a-z0-9_]+$/i.test(explicit)) {
      return this.ensure(explicit);
    }
    return this.ensure(`lyr_${fallbackBase}`);
  }
}

type BuildCtx = {
  ids: IdFactory;
  screenSlug: string;
};

const withStyle = (target: Json, style?: StyleRecord, breakpoints?: StyleRecord): Json => {
  if (style && Object.keys(style).length > 0) target.style = style;
  if (breakpoints && Object.keys(breakpoints).length > 0) target.styleBreakpoints = breakpoints;
  return target;
};

const buildLayer = (intent: LayerIntent, ctx: BuildCtx): Json => {
  switch (intent.kind) {
    case 'text': {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_text`);
      return withStyle({ id, kind: 'text', text: toLocalized(intent.text) }, intent.style, intent.styleBreakpoints);
    }
    case 'image': {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_img`);
      const out: Json = { id, kind: 'image' };
      if (intent.mediaAssetId) out.media = { mediaAssetId: intent.mediaAssetId };
      if (intent.alt) out.alt = intent.alt;
      return withStyle(out, intent.style, intent.styleBreakpoints);
    }
    case 'lottie': {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_lottie`);
      const out: Json = { id, kind: 'lottie' };
      if (intent.mediaAssetId) out.media = { mediaAssetId: intent.mediaAssetId };
      if (intent.loop !== undefined) out.loop = intent.loop;
      if (intent.autoPlay !== undefined) out.autoPlay = intent.autoPlay;
      return withStyle(out, intent.style, intent.styleBreakpoints);
    }
    case 'video': {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_video`);
      const out: Json = { id, kind: 'video' };
      if (intent.mediaAssetId) out.media = { mediaAssetId: intent.mediaAssetId };
      if (intent.loop !== undefined) out.loop = intent.loop;
      if (intent.autoPlay !== undefined) out.autoPlay = intent.autoPlay;
      if (intent.audioEnabled !== undefined) out.audioEnabled = intent.audioEnabled;
      return withStyle(out, intent.style, intent.styleBreakpoints);
    }
    case 'icon': {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_icon`);
      return withStyle(
        { id, kind: 'icon', family: intent.family ?? 'ionicons', iconName: intent.iconName },
        intent.style,
        intent.styleBreakpoints,
      );
    }
    case 'button':
      return buildButton(intent, ctx);
    case 'back_button':
      return buildBackButton(intent, ctx);
    case 'hyperlink':
      return buildHyperlink(intent, ctx);
    case 'stack':
      return buildStack(intent, ctx);
    case 'single_choice':
    case 'multiple_choice':
      return buildChoice(intent, ctx);
    case 'text_input': {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_${slugify(intent.fieldKey)}`);
      const out: Json = {
        id,
        kind: 'text_input',
        fieldKey: intent.fieldKey,
        classification: intent.classification ?? 'safe',
      };
      if (intent.placeholder !== undefined) out.placeholder = toLocalized(intent.placeholder);
      if (intent.inputType) out.inputType = intent.inputType;
      if (intent.required !== undefined) out.required = intent.required;
      if (intent.minLength !== undefined) out.minLength = intent.minLength;
      if (intent.maxLength !== undefined) out.maxLength = intent.maxLength;
      return withStyle(out, intent.style);
    }
    case 'scale_input': {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_${slugify(intent.fieldKey)}`);
      const out: Json = {
        id,
        kind: 'scale_input',
        fieldKey: intent.fieldKey,
        min: intent.min,
        max: intent.max,
      };
      if (intent.step !== undefined) out.step = intent.step;
      if (intent.defaultValue !== undefined) out.defaultValue = intent.defaultValue;
      if (intent.minLabel !== undefined) out.minLabel = toLocalized(intent.minLabel);
      if (intent.maxLabel !== undefined) out.maxLabel = toLocalized(intent.maxLabel);
      return withStyle(out, intent.style);
    }
    case 'checkbox': {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_${slugify(intent.fieldKey)}`);
      const out: Json = { id, kind: 'checkbox', fieldKey: intent.fieldKey };
      if (intent.blocking !== undefined) out.blocking = intent.blocking;
      return withStyle(out, intent.style, intent.styleBreakpoints);
    }
    case 'counter': {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_counter`);
      const out: Json = {
        id,
        kind: 'counter',
        startValue: intent.startValue,
        endValue: intent.endValue,
      };
      if (intent.durationMs !== undefined) out.durationMs = intent.durationMs;
      if (intent.delayMs !== undefined) out.delayMs = intent.delayMs;
      if (intent.decimalPlaces !== undefined) out.decimalPlaces = intent.decimalPlaces;
      if (intent.displayKind) out.displayKind = intent.displayKind;
      if (intent.timeFormat) out.timeFormat = intent.timeFormat;
      return withStyle(out, intent.style, intent.styleBreakpoints);
    }
    case 'progress': {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_progress`);
      const out: Json = { id, kind: 'progress' };
      if (intent.trackColor) out.trackColor = intent.trackColor;
      if (intent.fillColor) out.fillColor = intent.fillColor;
      return withStyle(out, intent.style);
    }
    case 'loader': {
      const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_loader`);
      const out: Json = { id, kind: 'loader' };
      if (intent.variant) out.variant = intent.variant;
      if (intent.targetPercent !== undefined) out.targetPercent = intent.targetPercent;
      if (intent.fillDelayMs !== undefined) out.fillDelayMs = intent.fillDelayMs;
      if (intent.durationMs !== undefined) out.durationMs = intent.durationMs;
      if (intent.onComplete) out.onComplete = { ...intent.onComplete };
      if (intent.trackColor) out.trackColor = intent.trackColor;
      if (intent.fillColor) out.fillColor = intent.fillColor;
      if (intent.align) out.align = intent.align;
      return withStyle(out, intent.style);
    }
    case 'carousel':
      return buildCarousel(intent, ctx);
    case 'oauth_login':
      return buildOAuthLogin(intent, ctx);
    case 'email_password_auth':
      return buildEmailPasswordAuth(intent, ctx);
  }
};

const buildButton = (intent: ButtonIntent, ctx: BuildCtx): Json => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_btn`);
  const children = buildLabelChildren(intent, ctx, id);
  return withStyle(
    {
      id,
      kind: 'button',
      variant: mapVariant(intent.variant, 'primary'),
      action: normalizeAction(intent.action),
      direction: 'horizontal',
      align: 'center',
      distribution: 'center',
      children,
    },
    intent.style,
    intent.styleBreakpoints,
  );
};

const buildBackButton = (intent: BackButtonIntent, ctx: BuildCtx): Json => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_back`);
  let children: Json[];
  if (intent.children) {
    children = intent.children.map((child) => buildLayer(child, ctx));
  } else {
    children = [];
    children.push({
      id: ctx.ids.ensure(`${id}_icon`),
      kind: 'icon',
      family: 'ionicons',
      iconName: intent.icon ?? 'chevron-back-outline',
    });
    if (intent.label !== undefined) {
      children.push(buildLabel(`${id}_label`, intent.label, ctx, intent.labelStyle));
    }
  }
  const out: Json = {
    id,
    kind: 'back_button',
    variant: mapVariant(intent.variant, 'ghost'),
    children,
  };
  if (intent.fallbackScreenId) out.fallbackScreenId = intent.fallbackScreenId;
  return withStyle(out, intent.style, intent.styleBreakpoints);
};

const buildHyperlink = (intent: HyperlinkIntent, ctx: BuildCtx): Json => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_link`);
  const children = intent.children
    ? intent.children.map((child) => buildLayer(child, ctx))
    : [buildLabel(`${id}_lnktxt`, intent.label ?? 'Link', ctx, intent.labelStyle)];
  return withStyle({ id, kind: 'hyperlink', href: intent.href, children }, intent.style, intent.styleBreakpoints);
};

const buildLabelChildren = (
  intent: ButtonIntent,
  ctx: BuildCtx,
  parentId: string,
): Json[] => {
  if (intent.children) {
    return intent.children.map((child) => buildLayer(child, ctx));
  }
  const children: Json[] = [];
  if (intent.icon) {
    children.push({
      id: ctx.ids.ensure(`${parentId}_icon`),
      kind: 'icon',
      family: 'ionicons',
      iconName: intent.icon,
    });
  }
  if (intent.label !== undefined) {
    children.push(buildLabel(`${parentId}_label`, intent.label, ctx, intent.labelStyle));
  }
  return children;
};

const buildLabel = (
  baseId: string,
  label: LocalizedOrString,
  ctx: BuildCtx,
  style?: StyleRecord,
): Json =>
  withStyle({ id: ctx.ids.ensure(baseId), kind: 'text', text: toLocalized(label) }, style);

const buildStack = (intent: StackIntent, ctx: BuildCtx): Json => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_stack`);
  const out: Json = {
    id,
    kind: 'stack',
    direction: intent.direction ?? 'vertical',
    children: intent.children.map((child) => buildLayer(child, ctx)),
  };
  if (intent.gap !== undefined) out.gap = intent.gap;
  if (intent.align) out.align = intent.align;
  if (intent.justify) out.justify = intent.justify;
  if (intent.distribution) out.distribution = intent.distribution;
  if (intent.wrap !== undefined) out.wrap = intent.wrap;
  if (intent.selectedStyle && Object.keys(intent.selectedStyle).length > 0) {
    out.selectedStyle = intent.selectedStyle;
  }
  return withStyle(out, intent.style, intent.styleBreakpoints);
};

const buildChoice = (
  intent: SingleChoiceIntent | MultipleChoiceIntent,
  ctx: BuildCtx,
): Json => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_${slugify(intent.fieldKey)}`);
  const seenOptionIds = new Set<string>();
  const optionBindings: Json[] = [];
  const children: Json[] = intent.options.map((opt, index) => {
    const labelText = typeof opt.label === 'string' ? opt.label : opt.label.default;
    let optionId = opt.optionId ?? slugify(labelText) ?? `opt_${index}`;
    while (seenOptionIds.has(optionId)) optionId = `${optionId}_${index}`;
    seenOptionIds.add(optionId);
    const stackId = ctx.ids.ensure(`lyr_${ctx.screenSlug}_${slugify(intent.fieldKey)}_${optionId}`);
    optionBindings.push({ optionId, rootLayerId: stackId });
    const optChildren: Json[] = [];
    if (opt.icon) {
      optChildren.push({
        id: ctx.ids.ensure(`${stackId}_icon`),
        kind: 'icon',
        family: 'ionicons',
        iconName: opt.icon,
      });
    }
    optChildren.push(buildLabel(`${stackId}_text`, opt.label, ctx, opt.labelStyle));
    const optStack: Json = {
      id: stackId,
      kind: 'stack',
      direction: 'horizontal',
      align: 'center',
      gap: 8,
      children: optChildren,
    };
    if (opt.style && Object.keys(opt.style).length > 0) optStack.style = opt.style;
    if (opt.selectedStyle && Object.keys(opt.selectedStyle).length > 0) {
      optStack.selectedStyle = opt.selectedStyle;
    }
    return optStack;
  });

  const out: Json = {
    id,
    kind: intent.kind,
    fieldKey: intent.fieldKey,
    children,
    optionBindings,
    branching: intent.branching ?? { enabled: false, conditions: [] },
  };
  if (intent.direction) out.direction = intent.direction;
  if (intent.gap !== undefined) out.gap = intent.gap;
  if (intent.columns !== undefined) out.columns = intent.columns;
  if (intent.kind === 'multiple_choice') {
    if (intent.minSelections !== undefined) out.minSelections = intent.minSelections;
    if (intent.maxSelections !== undefined) out.maxSelections = intent.maxSelections;
  }
  return withStyle(out, intent.style, intent.styleBreakpoints);
};

const buildCarousel = (intent: CarouselIntent, ctx: BuildCtx): Json => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_carousel`);
  const slides: Json[] = intent.slides.map((slide, index) => {
    const slideId = ctx.ids.layer(slide.id, `${ctx.screenSlug}_slide_${index}`);
    const out: Json = {
      id: slideId,
      kind: 'stack',
      direction: slide.direction ?? 'vertical',
      children: slide.children.map((child) => buildLayer(child, ctx)),
    };
    if (slide.gap !== undefined) out.gap = slide.gap;
    if (slide.align) out.align = slide.align;
    if (slide.justify) out.justify = slide.justify;
    return withStyle(out, slide.style);
  });
  const out: Json = { id, kind: 'carousel', slides };
  if (intent.pageControl) out.pageControl = { ...intent.pageControl };
  if (intent.loop !== undefined) out.loop = intent.loop;
  if (intent.autoAdvance !== undefined) out.autoAdvance = intent.autoAdvance;
  if (intent.autoAdvanceMs !== undefined) out.autoAdvanceMs = intent.autoAdvanceMs;
  if (intent.openOn !== undefined) out.openOn = intent.openOn;
  if (intent.pageAlignment) out.pageAlignment = intent.pageAlignment;
  if (intent.pageSpacing !== undefined) out.pageSpacing = intent.pageSpacing;
  if (intent.pagePeek !== undefined) out.pagePeek = intent.pagePeek;
  return withStyle(out, intent.style, intent.styleBreakpoints);
};

const buildOAuthLogin = (intent: OAuthLoginIntent, ctx: BuildCtx): Json => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_oauth`);
  const children: Json[] = intent.providers.map((provider, index) => {
    const rowBase = `lyr_${ctx.screenSlug}_opr_${index}`;
    if (provider.type === 'preset') {
      const row: Json = {
        id: ctx.ids.ensure(rowBase),
        kind: 'oauth_provider',
        variant: 'preset',
        provider: provider.provider,
      };
      if (provider.label !== undefined) row.label = toLocalized(provider.label);
      return row;
    }
    const rowId = ctx.ids.ensure(rowBase);
    return {
      id: rowId,
      kind: 'oauth_provider',
      variant: 'custom',
      rowId: provider.rowId ?? randomUUID(),
      buttonVariant: mapVariant(provider.buttonVariant, 'secondary'),
      direction: 'horizontal',
      align: 'center',
      distribution: 'center',
      gap: 8,
      children: [
        {
          id: ctx.ids.ensure(`${rowId}_icon`),
          kind: 'icon',
          family: provider.family ?? 'ionicons',
          iconName: provider.iconName,
        },
        buildLabel(`${rowId}_text`, provider.label, ctx),
      ],
    };
  });
  const out: Json = { id, kind: 'oauth_login', children };
  if (intent.gap !== undefined) out.gap = intent.gap;
  if (intent.align) out.align = intent.align;
  return withStyle(out, intent.style, intent.styleBreakpoints);
};

const buildEmailPasswordAuth = (intent: EmailPasswordAuthIntent, ctx: BuildCtx): Json => {
  const id = ctx.ids.layer(intent.id, `${ctx.screenSlug}_ep_auth`);
  const field = (slot: 'email' | 'password' | 'confirm', placeholder: LocalizedOrString): Json => ({
    id: ctx.ids.ensure(`${id}_fld_${slot}`),
    kind: 'email_password_field',
    slot,
    placeholder: toLocalized(placeholder),
  });
  const children: Json[] = [
    field('email', intent.emailPlaceholder ?? 'Email'),
    field('password', intent.passwordPlaceholder ?? 'Password'),
  ];
  if (intent.mode === 'sign_up') {
    children.push(field('confirm', intent.confirmPlaceholder ?? 'Confirm password'));
  }
  const submitId = ctx.ids.ensure(`${id}_submit`);
  children.push({
    id: submitId,
    kind: 'email_password_submit',
    buttonVariant: 'primary',
    direction: 'horizontal',
    align: 'center',
    distribution: 'center',
    gap: 8,
    children: [
      buildLabel(
        `${submitId}_txt`,
        intent.submitLabel ?? (intent.mode === 'sign_in' ? 'Sign in' : 'Create account'),
        ctx,
      ),
    ],
  });
  const out: Json = {
    id,
    kind: 'email_password_auth',
    mode: intent.mode,
    fieldKey: intent.fieldKey,
    children,
  };
  if (intent.minPasswordLength !== undefined) out.minPasswordLength = intent.minPasswordLength;
  if (intent.gap !== undefined) out.gap = intent.gap;
  if (intent.align) out.align = intent.align;
  return withStyle(out, intent.style, intent.styleBreakpoints);
};

const buildRegionRoot = (
  intents: LayerIntent[],
  ctx: BuildCtx,
  region: 'header' | 'body' | 'footer',
): Json => {
  if (intents.length === 1 && intents[0]?.kind === 'stack') {
    return buildLayer(intents[0], ctx);
  }
  const root: Json = {
    id: ctx.ids.ensure(`lyr_${ctx.screenSlug}_${region}`),
    kind: 'stack',
    direction: 'vertical',
    gap: region === 'body' ? 16 : 8,
    children: intents.map((intent) => buildLayer(intent, ctx)),
  };
  if (region === 'body') {
    root.style = { padding: { t: 24, r: 20, b: 24, l: 20 } };
  }
  return root;
};

const buildScreen = (screen: ScreenSpec, index: number, ids: IdFactory): { id: string; json: Json } => {
  const screenId =
    screen.id && /^scr_[a-z0-9_]+$/i.test(screen.id)
      ? screen.id
      : `scr_${slugify(screen.name)}_${index}`;
  const ctx: BuildCtx = { ids, screenSlug: slugify(screen.name) || `s${index}` };

  const regions: Json = { body: buildRegionRoot(screen.body, ctx, 'body') };
  if (screen.header && screen.header.length > 0) {
    regions.header = buildRegionRoot(screen.header, ctx, 'header');
  }
  if (screen.footer && screen.footer.length > 0) {
    regions.footer = buildRegionRoot(screen.footer, ctx, 'footer');
  }

  const json: Json = {
    id: screenId,
    name: screen.name,
    regions,
    next: { default: screen.next ?? null },
  };
  if (screen.containerStyle && Object.keys(screen.containerStyle).length > 0) {
    json.containerStyle = screen.containerStyle;
  }
  return { id: screenId, json };
};

const buildExternalSurface = (surface: ExternalSurfaceSpec): Json => {
  const config: Json =
    surface.provider === 'revenuecat'
      ? {
          provider: 'revenuecat',
          ...(surface.offeringId ? { offeringId: surface.offeringId } : {}),
          ...(surface.placementId ? { placementId: surface.placementId } : {}),
          ...(surface.presentation ? { presentation: surface.presentation } : {}),
        }
      : { provider: 'unspecified' };
  const outcomes: Json = {};
  for (const [key, value] of Object.entries(surface.outcomes ?? {})) {
    if (value !== undefined) outcomes[key] = value;
  }
  const out: Json = { id: surface.id, config, outcomes, fallback: surface.fallback };
  if (surface.name) out.name = surface.name;
  return out;
};

/** Expand a validated {@link FlowSpec} into a schema-valid FlowManifest object (no publish-gate styling defaults). */
export const scaffoldManifest = (spec: FlowSpec): Json => {
  const ids = new IdFactory();
  const screens = spec.screens.map((screen, index) => buildScreen(screen, index, ids));
  const defaultLocale = spec.defaultLocale ?? 'en';

  const manifest: Json = {
    flowId: spec.flowId ?? randomUUID(),
    schemaVersion: MANIFEST_SCHEMA_VERSION,
    version: spec.version ?? 1,
    defaultLocale,
    locales: spec.locales ?? [defaultLocale],
    entryScreenId: spec.entry ?? screens[0]?.id ?? null,
    screens: screens.map((s) => s.json),
    decisionNodes: spec.decisions ?? [],
    externalSurfaceNodes: (spec.externalSurfaces ?? []).map(buildExternalSurface),
    sdkAttributeKeys: spec.sdkAttributeKeys ?? [],
  };
  if (spec.theme) manifest.theme = spec.theme;
  return manifest;
};

export type ScaffoldFromFileResult =
  | { ok: false; kind: 'invalid_spec'; specIssues: FlowSpecIssue[] }
  | { ok: false; kind: 'invalid_manifest'; manifest: Json; issues: ManifestValidationIssue[]; outPath?: string }
  | { ok: true; manifest: Json; outPath?: string };

const resolveMaybe = (value: string | undefined, root: string): string | undefined =>
  value ? (isAbsolute(value) ? value : resolve(root, value)) : undefined;

/** Read a spec file, expand it, validate the manifest, and optionally write it to disk. */
export const scaffoldManifestFromFile = async (
  specPath: string,
  opts: { out?: string; root?: string } = {},
): Promise<ScaffoldFromFileResult> => {
  const root = opts.root ?? process.cwd();
  const raw = await readFile(specPath, 'utf8');
  const parsed = parseFlowSpec(JSON.parse(raw) as unknown);
  if (!parsed.ok) {
    return { ok: false, kind: 'invalid_spec', specIssues: parsed.issues };
  }

  const manifest = scaffoldManifest(parsed.spec);
  const outPath = resolveMaybe(opts.out, root);
  if (outPath) {
    await writeFile(outPath, `${JSON.stringify(manifest, null, 2)}\n`);
  }

  const validated = validateManifest(manifest);
  if (!validated.ok) {
    return { ok: false, kind: 'invalid_manifest', manifest, issues: validated.issues, outPath };
  }
  return { ok: true, manifest, outPath };
};
