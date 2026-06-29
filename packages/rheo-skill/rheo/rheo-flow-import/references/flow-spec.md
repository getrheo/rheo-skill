# Flow Spec (recommended authoring path)

A **flow spec** is a compact, agent-authored description of a flow. Running
`node scripts/scaffold-manifest.mjs <flow-spec.json>` expands it into a
**schema-valid** Rheo `FlowManifest` skeleton: it generates `scr_*`/`lyr_*` ids,
wraps label copy into `children`, builds `optionBindings` and `branching` for
choices, maps button variants to the Rheo enum, and wires `next` edges. You then
enrich theme/styles and validate.

> The scaffold guarantees **schema validity only**. It does not invent colors,
> fonts, or publish-gate styling — set `theme` and layer `style` from audit
> evidence, then run `validate-manifest.mjs` + `audit-publish-manifest.mjs`.

Why use it: the scaffold removes the mistakes that cause `invalid_union` import
failures (missing `children`, UUID-as-layer-id, missing choice bindings, raw
source `variant` names). Hand-authoring is allowed but you own every mechanical
detail yourself.

## Top-level shape

```jsonc
{
  "flowId": "00000000-0000-0000-0000-000000000001", // optional placeholder; dashboard replaces it
  "version": 1,
  "defaultLocale": "en",
  "locales": ["en"],
  "entry": "scr_welcome",            // optional; defaults to the first screen's id
  "theme": { /* @getrheo/contracts Theme */ },
  "sdkAttributeKeys": ["sdk.plan"],  // non-reserved keys used by decisions
  "screens": [ /* ScreenSpec[] — required */ ],
  "decisions": [ /* @getrheo/contracts DecisionNode[] */ ],
  "externalSurfaces": [ /* ExternalSurfaceSpec[] */ ]
}
```

## Screens

```jsonc
{
  "id": "scr_welcome",     // optional; generated from name when omitted
  "name": "Welcome",
  "containerStyle": { "backgroundFill": { "kind": "color", "color": "#0EA5E9" } },
  "header": [ /* LayerIntent[] — back_button / progress chrome */ ],
  "body":   [ /* LayerIntent[] — required main content */ ],
  "footer": [ /* LayerIntent[] — sticky CTAs */ ],
  "next": "scr_goal"       // jump target (scr_*/dec_*/surf_*) or null to end the flow
}
```

`next` becomes the screen's `next.default`. Use `null` (or omit and rely on an
`end_flow` button) for terminal screens.

## Layer intents

Every entry in `header`/`body`/`footer` is a **layer intent** — a friendly shape
the scaffold expands into a real layer. `id` is always optional. `style` and
`styleBreakpoints` are passed through verbatim (validated by the layer schema).

### Text, image, icon, media

```jsonc
{ "kind": "text", "text": "Welcome to Rheo", "style": { "color": "#FFFFFF" } }
{ "kind": "text", "text": { "default": "Hi", "translations": { "es": "Hola" } } }
{ "kind": "image", "mediaAssetId": "00000000-0000-0000-0000-000000000101", "alt": "Hero" }
{ "kind": "icon", "iconName": "sparkles-outline" }            // family defaults to ionicons
{ "kind": "lottie", "mediaAssetId": "…", "loop": true, "autoPlay": true }
{ "kind": "video", "mediaAssetId": "…", "autoPlay": false }    // needs a play_media button
```

Copy fields accept a plain string (becomes `{ default }`) or an explicit
`{ default, translations }`.

### Buttons, back buttons, links

The convenience fields `label`/`icon`/`labelStyle` are expanded into nested
`text`/`icon` children — you do not write `children` yourself unless you need
custom content. `action` defaults to `continue`. Source `variant` names
(`outline`, `text`, `link`, `default`, `filled`, `danger`) are mapped to the Rheo
enum automatically.

```jsonc
{ "kind": "button", "label": "Continue", "action": "continue", "variant": "primary",
  "labelStyle": { "color": "#FFFFFF" } }
{ "kind": "button", "label": "Maybe later", "action": "skip", "variant": "ghost" }
{ "kind": "button", "label": "Go to plan", "action": { "kind": "go_to_step", "screenId": "scr_plan" } }
{ "kind": "back_button", "icon": "chevron-back-outline", "variant": "ghost" } // header chrome, no action
{ "kind": "hyperlink", "href": "https://rheo.app/terms", "label": "Terms" }
```

Action shorthands: `"none"`, `"continue"`, `"skip"`, `"end_flow"`,
`"go_back_one_screen"`, `"request_app_review"`. Object forms:
`{ "kind": "go_to_step", "screenId": "scr_x" }`,
`{ "kind": "request_os_permission", "permissionKey": "…", "outcomes": { "granted": "scr_a", "denied": "scr_b", "blocked": "scr_c" } }`,
`{ "kind": "play_media", "targetLayerIds": ["lyr_video"] }`.

### Stacks (layout)

```jsonc
{ "kind": "stack", "direction": "vertical", "align": "center", "gap": 12,
  "style": { "padding": { "t": 24, "r": 16, "b": 24, "l": 16 } },
  "children": [ { "kind": "text", "text": "Centered hero copy" } ] }
```

Card chrome (border/shadow/background/radius) goes on a wrapping stack's `style`.

### Choices

You provide `options`; the scaffold builds the option `stack` children,
`optionBindings`, and `branching`. `optionId` defaults to a slug of the label.
Map unselected chrome to `style` and selected chrome to `selectedStyle` per option.

```jsonc
{
  "kind": "single_choice",
  "fieldKey": "gender",
  "direction": "vertical",
  "gap": 12,
  "options": [
    { "optionId": "male",   "label": "Male",
      "style": { "border": { "width": 1, "color": "#E5E7EB" }, "radius": 12, "padding": { "t": 16, "r": 16, "b": 16, "l": 16 } },
      "selectedStyle": { "border": { "width": 1, "color": "#6D5DF6" }, "background": "#6D5DF610" },
      "labelStyle": { "color": "#0A0A0A" } },
    { "optionId": "female", "label": "Female", "labelStyle": { "color": "#0A0A0A" } }
  ]
}
```

`multiple_choice` adds optional `minSelections`/`maxSelections`. To branch per
option, set `branching: { "enabled": true, "conditions": [{ "choiceId": "male", "goTo": "scr_x" }] }`.

### Inputs

```jsonc
{ "kind": "text_input", "fieldKey": "first_name", "placeholder": "Your name",
  "inputType": "plain", "required": true, "classification": "safe" }
{ "kind": "scale_input", "fieldKey": "fitness_level", "min": 1, "max": 5, "step": 1,
  "minLabel": "Beginner", "maxLabel": "Pro" }
{ "kind": "checkbox", "fieldKey": "accept_terms", "blocking": true }
```

Use **at most one** input layer per screen, and add a `continue` button on
screens with `text_input`, `multiple_choice`, or `scale_input`.

### Auth

```jsonc
{ "kind": "oauth_login", "providers": [
  { "type": "preset", "provider": "apple" },
  { "type": "preset", "provider": "google" },
  { "type": "custom", "label": "SSO", "iconName": "key-outline", "buttonVariant": "secondary" }
] }
{ "kind": "email_password_auth", "fieldKey": "auth", "mode": "sign_up",
  "submitLabel": "Create account", "minPasswordLength": 8 }
```

Keep OAuth, email/password, and questionnaire inputs on **separate screens**.

### Carousel (swipe-only onboarding pager)

```jsonc
{
  "kind": "carousel",
  "pageControl": { "position": "bottom" },
  "slides": [
    { "align": "center", "gap": 12, "children": [
      { "kind": "image", "mediaAssetId": "…" },
      { "kind": "text", "text": "Track your streak", "style": { "color": "#0A0A0A" } }
    ] },
    { "align": "center", "gap": 12, "children": [
      { "kind": "image", "mediaAssetId": "…" },
      { "kind": "text", "text": "Stay consistent", "style": { "color": "#0A0A0A" } }
    ] }
  ]
}
```

No buttons inside a carousel — paging is swipe-only ([carousel-import.md](carousel-import.md)).

### Counter / progress / loader

```jsonc
{ "kind": "progress", "fillColor": "#6D5DF6", "trackColor": "#E5E7EB" }
{ "kind": "counter", "startValue": 0, "endValue": 1000, "durationMs": 1200 }
{ "kind": "loader", "variant": "circular", "targetPercent": 100, "onComplete": { "mode": "next" } }
```

## Decisions and external surfaces

`decisions` accepts full `@getrheo/contracts` `DecisionNode` objects (the scaffold
passes them through). RevenueCat paywalls use `externalSurfaces`:

```jsonc
{
  "id": "surf_paywall",
  "provider": "revenuecat",
  "offeringId": "default",
  "presentation": "paywall",
  "outcomes": { "purchase_completed": "scr_done", "restore_completed": "scr_done", "dismissed": "scr_offer2" },
  "fallback": "scr_offer2"   // required
}
```

## Run it

```bash
node scripts/scaffold-manifest.mjs ./rheo-import.flow-spec.json --out ./rheo-import.manifest.json
node scripts/validate-manifest.mjs ./rheo-import.manifest.json
node scripts/audit-publish-manifest.mjs ./rheo-import.manifest.json
```

If scaffold prints `scaffold_status=schema_valid`, the skeleton is structurally
correct. Then enrich `theme`/`style` from audit evidence and fix any
publish-gate blockers ([publish-gates.md](publish-gates.md)). A complete worked
spec lives at [../examples/flow-spec.example.json](../examples/flow-spec.example.json).
