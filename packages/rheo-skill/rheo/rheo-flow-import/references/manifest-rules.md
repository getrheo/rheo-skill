# Manifest Rules

Use the fetched Manifest Agent Profile as the current source of truth. These are stable baseline rules.

## Top Level

Required fields: `flowId`, `schemaVersion`, `version`, `defaultLocale`, `locales`, `entryScreenId`, `theme`, `screens`, `decisionNodes`, `externalSurfaceNodes`, `sdkAttributeKeys`.

Use a placeholder UUID only when generating outside the dashboard. The dashboard import replaces `flowId` with the created flow id.

## IDs

- Screens: `scr_*`
- Layers: `lyr_*`
- Decisions: `dec_*`
- External surfaces: `surf_*`

Use readable ids, for example `scr_welcome`, `lyr_welcome_title`, `surf_paywall`.

**UUID placeholders** (`00000000-0000-0000-0000-000000000101`) are **only** for `media.mediaAssetId` in the manifest and font entries in `rheo-import.fonts.json`. Never use UUIDs as layer ids or as `optionBindings[].rootLayerId`.

See [layer-schema-pitfalls.md](layer-schema-pitfalls.md) for common id mistakes that cause `invalid_union` validation failures.

## Layer Kinds

Allowed kinds: `stack`, `text`, `image`, `lottie`, `video`, `icon`, `button`, `back_button`, `progress`, `loader`, `counter`, `single_choice`, `multiple_choice`, `text_input`, `scale_input`, `oauth_provider`, `oauth_login`, `email_password_auth`, `email_password_field`, `email_password_submit`, `carousel`, `hyperlink`, `checkbox`.

## Regions

Screens support `regions.header`, required `regions.body`, and optional `regions.footer`.

- Use `header` for top chrome: back buttons, close buttons, title chrome, step indicators, and progress bars.
- Use `body` for main content and scrollable content.
- Use `footer` for sticky bottom CTAs and legal/checklist rows that sit below content.
- Use `back_button` and `progress` layers instead of rebuilding obvious navigation chrome as generic text/buttons.

## Style Tokens

Before generating a plain black-and-white manifest, inspect the repo for tokens:

- Tailwind/NativeWind config and global CSS.
- theme files and design-token JSON/TS files.
- shared `Button`, `Text`, `Typography`, `Screen`, `Header`, and `Footer` primitives.
- React Native `StyleSheet.create` constants.
- SwiftUI `Color`, `Font`, and modifier extensions.

Map clear brand values into `manifest.theme` and layer styles. Set `style.color` on text for dark/saturated screen backgrounds.

## Screen Backgrounds And Gradients

- Use `screen.containerStyle.backgroundFill` for per-screen fills.
- Gradients: `{ "kind": "color", "color": "linear-gradient(180deg, #hex1 0%, #hex2 100%)" }`.
- Shared shell gradients apply to all default screens unless a screen overrides with a solid color.

## Carousels

- In-screen pagers (`infoSteps`, horizontal pager, dot indicators) → `kind: "carousel"` with one slide stack per page.
- Do not collapse multi-slide routes to one static screen.
- `pageControl` is optional dot chrome only. Carousels are swipe-only (no pager buttons).
- Do not duplicate paging with `regions.footer` Continue when the source footer only increments pager index. See [carousel-import.md](carousel-import.md).

## Layout

- Center images: parent stack `align: "center"`.
- Card chrome: wrapping stacks with `border`, `shadow`, `background`, `radius`, `padding`.

## Explicit Sizing

Set `style.width` and `style.height` on every layer — do not omit them. `width` accepts `"full"`, `"auto"`, a fraction (`"1/2"`, `"1/3"`, `"2/3"`, `"1/4"`, `"3/4"`), or a pixel number; `height` accepts `"fill"`, `"auto"`, or a pixel number. Use these per-kind defaults unless the design requires otherwise:

| Layer kinds | `width` | `height` |
|-------------|---------|----------|
| `stack`, `text_input`, `scale_input`, `oauth_login`, `email_password_auth`, `email_password_field`, `progress`, `loader` | `"full"` | `"fill"` |
| `button`, `back_button`, `oauth_provider`, `email_password_submit`, `checkbox`, `single_choice`, `multiple_choice` | `"full"` | `"auto"` |
| `text`, `counter`, `icon`, `hyperlink` | `"auto"` | `"auto"` |
| `image`, `lottie`, `video` | `"full"` | number (e.g. `160`) |
| `carousel` | — (no outer `style` sizing) | — |

Dashboard import backfills these defaults automatically, but emitting them explicitly produces higher-fidelity first drafts.

## Container Layers (Required `children`)

Container layers **must always include a `children` array** (use `[]` only when the schema allows an empty container — never omit the key). Omitting `children` produces JSON that may parse but **crashes dashboard import** when motion is stripped (Indie plan) and fails schema validation.

| Layer kind | Required child field | Label / content rule |
|------------|---------------------|----------------------|
| `stack` | `children: []` minimum | Nested layers |
| `button` | `children` | **Required** nested `text` for the label (optional leading `icon`) |
| `back_button` | `children` | **Required** nested `text` and/or `icon` — never emit header back chrome without `children` |
| `hyperlink` | `children` | **Required** nested `text` for link copy |
| `carousel` | `slides` | One stack per slide |
| `single_choice` / `multiple_choice` | `children` | One option `stack` per choice |
| `oauth_login` | `children` | Provider rows / chrome |
| `email_password_auth` / `email_password_submit` | `children` | Field rows and submit label |
| `oauth_provider` (`variant: "custom"`) | `children` | Custom provider row content |

### Anti-pattern (invalid — do not emit)

```json
{
  "id": "lyr_header_back",
  "kind": "back_button",
  "variant": "ghost"
}
```

### Valid `back_button` (header chrome)

```json
{
  "id": "lyr_header_back",
  "kind": "back_button",
  "variant": "ghost",
  "children": [
    {
      "id": "lyr_header_back_label",
      "kind": "text",
      "text": { "default": "Back" },
      "style": { "color": "#0A0A0A" }
    }
  ]
}
```

When source uses a chevron-only back control, still nest an `icon` child (and optional empty/minimal `text` if needed for hit area — prefer visible `icon` + `text` when source shows a label).

`scripts/normalize-manifest.mjs` repairs legacy `button.label` and `hyperlink.text` shapes only — it does **not** invent missing `back_button.children`. Fix those in the manifest before validation.

## Text And Buttons

- Text uses `text: { "default": "..." }`.
- Do not use `label` on text layers or top-level `label` on `button` layers (use `children` instead).
- Button labels are nested text children — same for `back_button` and `hyperlink`.
- **`button` and `back_button` `variant`** must be one of: `primary`, `secondary`, `ghost`, `destructive`. Map source design-system names (`outline`, `text`, `link`, `default`) — do not copy them literally.
- **`back_button`** has no `action` field; navigation is built-in. Use in `regions.header` for back/close chrome.
- Prefer `continue`, `skip`, and `end_flow` actions for imported first drafts (on `button` only).
- **`request_app_review`** is allowed for human/explicit requests only (not default imports): empty action object, requires `screen.next.default`, single CTA after a positive moment.

## Custom Fonts

- When source loads custom fonts (`Font.loadAsync`, `useFonts`, bundled `.ttf`/`.otf`), copy files into `assets/fonts/` and add `rheo-import.fonts.json` ([font-import.md](font-import.md)).
- Set `manifest.theme.fontFamily` to the primary family name string used in source.
- Each font style needs a stable placeholder UUID in `rheo-import.fonts.json`; dashboard import uploads files and merges families into app branding.
- **Never** list font files in `rheo-import.assets.json` — fonts are not `media.mediaAssetId` assets and must not use image MIME types.

## Choice Inputs (single_choice / multiple_choice)

Each choice layer is a **structured input**, not a flat options list. Required fields: `fieldKey`, `children`, `optionBindings`, `branching`.

- Each selectable option is a child **`stack`** on the input layer with its own `lyr_*` id.
- **`optionBindings`**: one `{ optionId, rootLayerId }` per option; `rootLayerId` must equal the matching child stack's `id`.
- **`branching`**: always include `{ "enabled": false, "conditions": [] }` unless the source has real per-option navigation.
- **`fieldKey`**: snake_case (`gender`, `language`, `age_range`) — not PascalCase or camelCase.
- Never emit `"options"`, `"choices"`, `"kind": "choice"`, or `"kind": "radio"`.
- Map unselected chrome to `style` and selected chrome to `selectedStyle` on the same stack (border, background, padding, radius).
- Do not import choice screens with only default styling when source uses selected/unselected ternaries.

Full template: [layer-schema-pitfalls.md](layer-schema-pitfalls.md#single_choice--multiple_choice).

## Inputs

- Use at most one input layer kind per screen.
- Use stable snake_case `fieldKey` values.
- Mark text input classification as `safe` or `sensitive`.

## Decisions

- Use decisions for real source-code branches.
- Non-reserved `sdk.*` keys used in decisions must be listed in `sdkAttributeKeys`.
- Prefer source semantics over visual guessing.

## External Surfaces

- RevenueCat paywalls become `externalSurfaceNodes` with provider `revenuecat`.
- Every external surface needs a `fallback`.
- Map known paywall outcomes to `purchase_completed`, `restore_completed`, `dismissed`, and `failed`.

## Assets

For local images, Lottie JSON, or videos, use valid placeholder UUIDs in `media.mediaAssetId`, then include those files in `rheo-import.zip` with `rheo-import.assets.json`. Do not put file paths directly in `mediaAssetId`. Font binaries belong only in `rheo-import.fonts.json`.

## Localization (i18n)

When source screens use i18n ([localization-import.md](localization-import.md)):

- Set `defaultLocale` and `locales` to match the app fallback (usually `en`).
- Every `text.default` must be the **resolved default-locale string**, not a translation key.
- Optional `text.translations` for other locales after defaults are correct.

## Publish Readiness

- `entryScreenId` must point to an existing screen, decision, or external surface.
- The served graph should have a completion path.
- Avoid orphaned screens unless intentionally parked for later editing.
- Run `scripts/audit-publish-manifest.mjs` before finishing — it enforces dashboard **Publish** rules (see [publish-gates.md](publish-gates.md)).
- Every `text` and `icon` layer needs explicit `style.color` (including nested button label text).
- Screens with `text_input`, `multiple_choice`, or `scale_input` need a `continue` button.
