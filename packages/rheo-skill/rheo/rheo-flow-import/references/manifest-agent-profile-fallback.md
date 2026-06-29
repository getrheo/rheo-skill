# Rheo Manifest Agent Profile

Profile version: bundled-0.1.0
Manifest schema version: 7
Audience: AI agents generating Rheo `FlowManifest` JSON.

This bundled profile is fallback guidance. Prefer the latest raw docs profile at `/docs/md/developer-guide/agent-manifest-profile` when available.

## Audit-First Import

Before generating a manifest, run the bundled audit command:

```bash
node scripts/audit-import.mjs --entry app/onboarding.tsx --out rheo-import.audit.md
```

Use the audit report for header/footer, style tokens, screen backgrounds, carousels, layout, custom fonts, choice selected states, assets, Lottie, motion, and follow-up questions. If the audit cannot run, explain why and manually cover the same sections.

**Mandatory intake (blocking):** Ask and record answers before generating:

1. Flow entry file/route/coordinator
2. Business purpose of the flow
3. Visual fidelity vs editable structure
4. Source code vs screenshots when they disagree
5. Native-only steps vs Rheo-approximated steps
6. Match motion from the codebase (may differ slightly from Rheo presets)? (yes/no)

When intake Q6 is yes and the plan supports animations, read [animation-import.md](animation-import.md) and use `--suggest-animations rheo-import.animations.json` on the audit command.

## Output Contract

Generate one raw JSON `FlowManifest`, normally saved as `rheo-import.manifest.json`. When media assets are used, create `rheo-import.zip` with `rheo-import.manifest.json`, `rheo-import.assets.json`, and files under `assets/`. Asset bundling is mandatory for local images, Lottie JSON, and videos; JSON-only output is acceptable only after confirming no local assets were found. Do not include comments, Markdown, secrets, or source code.

## Required Top-Level Fields

`flowId`, `schemaVersion`, `version`, `defaultLocale`, `locales`, `entryScreenId`, `theme`, `screens`, `decisionNodes`, `externalSurfaceNodes`, `sdkAttributeKeys`.

## IDs

Screens use `scr_*`, layers use `lyr_*`, decisions use `dec_*`, and external surfaces use `surf_*`. UUID placeholders are **only** for `media.mediaAssetId` and font sidecars — never as layer ids.

Before zipping, read [layer-schema-pitfalls.md](layer-schema-pitfalls.md) and run validate until exit 0.

## Layer Kinds

Use only: `stack`, `text`, `image`, `lottie`, `video`, `icon`, `button`, `back_button`, `progress`, `loader`, `counter`, `single_choice`, `multiple_choice`, `text_input`, `scale_input`, `oauth_provider`, `oauth_login`, `email_password_auth`, `email_password_field`, `email_password_submit`, `carousel`, `hyperlink`, `checkbox`.

## Rules

- Text copy goes in `text.default`.
- Button labels are nested text layers.
- `button` / `back_button` `variant` must be `primary`, `secondary`, `ghost`, or `destructive` (map source `outline`/`text`/`link` — do not copy). `back_button` has no `action`.
- `single_choice` / `multiple_choice` require `fieldKey`, `children`, `optionBindings`, and `branching` — never `"options"` arrays.
- Use `regions.header` for top chrome such as back buttons and progress, `regions.body` for main content, and `regions.footer` for sticky bottom CTAs.
- Inspect theme/style/token files, StyleSheet, and Tailwind classes before using black-and-white defaults.
- Set `style.color` on text for dark/saturated screen backgrounds.
- Gradients: `screen.containerStyle.backgroundFill.color` as `linear-gradient(...)` CSS when `kind` is `color`.
- In-screen pagers → `kind: "carousel"` with one slide per page; swipe-only; bundle every slide asset. See carousel-import.md in references.
- Center images with parent stack `align: "center"`; map card borders/shadows to wrapping stacks.
- Custom fonts: bundle files in `rheo-import.fonts.json` only (never `rheo-import.assets.json`), `manifest.theme.fontFamily`. See `font-import.md`.
- Choice options: each option stack uses `style` (default) and `selectedStyle` (selected).
- Publish gates: explicit `style.color` on all text (including button labels), Continue on manual-submit screens, valid entry/completion path. Run `scripts/audit-publish-manifest.mjs` before finishing.
- Black-and-white fallback is acceptable only when the audit finds no style/token evidence and the user confirms no theme source.
- Use at most one input layer kind per screen.
- Non-reserved `sdk.*` decision keys must be listed in `sdkAttributeKeys`.
- RevenueCat paywalls are external surface nodes and always need `fallback`.
- Emit complete graph edges for imported flows.
- Use placeholder UUID media ids and `rheo-import.assets.json`; never put file paths directly in `mediaAssetId`.
- Do not silently drop media layers. If a traced asset cannot be copied, report the missing file and do not call the import complete.
- Ask targeted follow-up questions when the audit finds meaningful ambiguity, such as conflicting token files or unclear gradient fidelity.

## Validation

Run `node scripts/validate-manifest.mjs ./rheo-import.manifest.json` before presenting the import as ready.
