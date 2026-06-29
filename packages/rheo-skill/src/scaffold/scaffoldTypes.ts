import type { OsPermissionKey } from '@getrheo/contracts';
import type { DecisionNode, Theme } from '@getrheo/contracts';

/** Free-form style record passed through verbatim to the manifest (validated + stripped by the layer schemas). */
export type StyleRecord = Record<string, unknown>;

/** Spec copy: a plain string (becomes `{ default }`) or an explicit localized object. */
export type LocalizedOrString =
  | string
  | { default: string; translations?: Record<string, string> };

/** Friendly button/back-button action. String shorthands expand to `{ kind }`. */
export type ButtonActionSpec =
  | 'none'
  | 'continue'
  | 'skip'
  | 'end_flow'
  | 'go_back_one_screen'
  | 'request_app_review'
  | { kind: 'none' | 'continue' | 'skip' | 'end_flow' | 'request_app_review' }
  | { kind: 'go_back_one_screen'; fallbackScreenId?: string }
  | { kind: 'go_to_step'; screenId: string }
  | {
      kind: 'request_os_permission';
      permissionKey: OsPermissionKey;
      outcomes: { granted: string; denied: string; blocked: string };
    }
  | { kind: 'play_media'; targetLayerIds: string[] };

export type BranchingSpec = {
  enabled: boolean;
  conditions: { choiceId: string; goTo: string }[];
};

type CommonIntent = {
  /** Optional explicit `lyr_*` id. When omitted the scaffold generates a unique one. */
  id?: string;
  name?: string;
  style?: StyleRecord;
  styleBreakpoints?: StyleRecord;
};

export type TextIntent = CommonIntent & { kind: 'text'; text: LocalizedOrString };

export type ImageIntent = CommonIntent & {
  kind: 'image';
  mediaAssetId?: string;
  alt?: string;
};

export type LottieIntent = CommonIntent & {
  kind: 'lottie';
  mediaAssetId?: string;
  loop?: boolean;
  autoPlay?: boolean;
};

export type VideoIntent = CommonIntent & {
  kind: 'video';
  mediaAssetId?: string;
  loop?: boolean;
  autoPlay?: boolean;
  audioEnabled?: boolean;
};

export type IconIntent = CommonIntent & {
  kind: 'icon';
  iconName: string;
  family?: 'ionicons';
};

export type ButtonIntent = CommonIntent & {
  kind: 'button';
  label?: LocalizedOrString;
  /** Defaults to `continue`. Source variants (outline/text/link/...) are mapped to the Rheo enum. */
  action?: ButtonActionSpec;
  variant?: string;
  /** Leading ionicons glyph name. */
  icon?: string;
  labelStyle?: StyleRecord;
  /** Explicit children override the label/icon convenience fields. */
  children?: LayerIntent[];
};

export type BackButtonIntent = CommonIntent & {
  kind: 'back_button';
  label?: LocalizedOrString;
  /** Defaults to `chevron-back-outline`. */
  icon?: string;
  variant?: string;
  fallbackScreenId?: string;
  labelStyle?: StyleRecord;
  children?: LayerIntent[];
};

export type HyperlinkIntent = CommonIntent & {
  kind: 'hyperlink';
  href: string;
  label?: LocalizedOrString;
  labelStyle?: StyleRecord;
  children?: LayerIntent[];
};

export type StackIntent = CommonIntent & {
  kind: 'stack';
  direction?: 'vertical' | 'horizontal';
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end';
  distribution?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  selectedStyle?: StyleRecord;
  children: LayerIntent[];
};

export type ChoiceOption = {
  /** Stable optionId used by `optionBindings` and branching (`choiceId`). Defaults to a slug of the label. */
  optionId?: string;
  label: LocalizedOrString;
  icon?: string;
  style?: StyleRecord;
  selectedStyle?: StyleRecord;
  labelStyle?: StyleRecord;
};

type ChoiceCommon = CommonIntent & {
  fieldKey: string;
  options: ChoiceOption[];
  direction?: 'vertical' | 'horizontal' | 'grid';
  gap?: number;
  columns?: number;
  branching?: BranchingSpec;
};

export type SingleChoiceIntent = ChoiceCommon & { kind: 'single_choice' };

export type MultipleChoiceIntent = ChoiceCommon & {
  kind: 'multiple_choice';
  minSelections?: number;
  maxSelections?: number;
};

export type TextInputIntent = CommonIntent & {
  kind: 'text_input';
  fieldKey: string;
  placeholder?: LocalizedOrString;
  inputType?: 'plain' | 'email' | 'phone' | 'url' | 'multiline';
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  classification?: 'safe' | 'sensitive';
};

export type ScaleInputIntent = CommonIntent & {
  kind: 'scale_input';
  fieldKey: string;
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  minLabel?: LocalizedOrString;
  maxLabel?: LocalizedOrString;
};

export type CheckboxIntent = CommonIntent & {
  kind: 'checkbox';
  fieldKey: string;
  blocking?: boolean;
};

export type CounterIntent = CommonIntent & {
  kind: 'counter';
  startValue: number;
  endValue: number;
  durationMs?: number;
  delayMs?: number;
  decimalPlaces?: number;
  displayKind?: 'number' | 'time';
  timeFormat?: 'mm_ss' | 'hh_mm_ss' | 'dd_hh_mm_ss';
};

export type ProgressIntent = CommonIntent & {
  kind: 'progress';
  trackColor?: string;
  fillColor?: string;
};

export type LoaderIntent = CommonIntent & {
  kind: 'loader';
  variant?: 'linear' | 'circular';
  targetPercent?: number;
  fillDelayMs?: number;
  durationMs?: number;
  onComplete?:
    | { mode: 'none' }
    | { mode: 'next' }
    | { mode: 'screen'; screenId: string };
  trackColor?: string;
  fillColor?: string;
  align?: 'start' | 'center' | 'end';
};

export type CarouselSlide = {
  id?: string;
  direction?: 'vertical' | 'horizontal';
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end';
  style?: StyleRecord;
  children: LayerIntent[];
};

export type CarouselIntent = CommonIntent & {
  kind: 'carousel';
  slides: CarouselSlide[];
  pageControl?: { position: 'top' | 'bottom' } & Record<string, unknown>;
  loop?: boolean;
  autoAdvance?: boolean;
  autoAdvanceMs?: number;
  openOn?: number;
  pageAlignment?: 'top' | 'center' | 'bottom';
  pageSpacing?: number;
  pagePeek?: number;
};

export type OAuthProviderSpec =
  | { type: 'preset'; provider: 'google' | 'github' | 'apple'; label?: LocalizedOrString }
  | {
      type: 'custom';
      rowId?: string;
      label: LocalizedOrString;
      iconName: string;
      family?: 'ionicons';
      buttonVariant?: string;
    };

export type OAuthLoginIntent = CommonIntent & {
  kind: 'oauth_login';
  providers: OAuthProviderSpec[];
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
};

export type EmailPasswordAuthIntent = CommonIntent & {
  kind: 'email_password_auth';
  fieldKey: string;
  mode: 'sign_in' | 'sign_up';
  emailPlaceholder?: LocalizedOrString;
  passwordPlaceholder?: LocalizedOrString;
  confirmPlaceholder?: LocalizedOrString;
  submitLabel?: LocalizedOrString;
  minPasswordLength?: number;
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
};

export type LayerIntent =
  | TextIntent
  | ImageIntent
  | LottieIntent
  | VideoIntent
  | IconIntent
  | ButtonIntent
  | BackButtonIntent
  | HyperlinkIntent
  | StackIntent
  | SingleChoiceIntent
  | MultipleChoiceIntent
  | TextInputIntent
  | ScaleInputIntent
  | CheckboxIntent
  | CounterIntent
  | ProgressIntent
  | LoaderIntent
  | CarouselIntent
  | OAuthLoginIntent
  | EmailPasswordAuthIntent;

export type ScreenSpec = {
  id?: string;
  name: string;
  header?: LayerIntent[];
  body: LayerIntent[];
  footer?: LayerIntent[];
  containerStyle?: StyleRecord;
  /** Jump target id (`scr_*`, `dec_*`, `surf_*`) or null to end the flow. Defaults to null. */
  next?: string | null;
};

export type ExternalSurfaceSpec = {
  id: string;
  name?: string;
  provider: 'revenuecat' | 'unspecified';
  offeringId?: string;
  placementId?: string;
  presentation?: 'paywall' | 'paywall_if_needed';
  outcomes?: {
    purchase_completed?: string | null;
    purchase_cancelled?: string | null;
    dismissed?: string | null;
    failed?: string | null;
    restore_completed?: string | null;
  };
  /** Required: where the surface routes for any unmapped outcome. */
  fallback: string | null;
};

export type FlowSpec = {
  flowId?: string;
  version?: number;
  defaultLocale?: string;
  locales?: string[];
  /** Entry node id; defaults to the first screen. */
  entry?: string;
  theme?: Theme;
  sdkAttributeKeys?: string[];
  screens: ScreenSpec[];
  decisions?: DecisionNode[];
  externalSurfaces?: ExternalSurfaceSpec[];
};
