# Import Workflow

Generate a complete Rheo import from an existing app flow. If the source flow uses media, output a ZIP bundle. Raw JSON is acceptable only after an explicit asset audit finds no local media.

## Mandatory Intake Questionnaire (blocking)

Ask these questions **before** running the audit or generating a manifest. Record every answer in chat. Do not skip when the repo structure looks obvious.

1. Which file, route, or coordinator starts the existing flow?
2. What is the business purpose of this flow in one sentence?
3. Should the import optimize for **visual fidelity** or **editable structure** in Rheo?
4. If source code and screenshots disagree, which is more current?
5. Which steps must stay native/host-owned (signature pad, camera, custom WebView, paywall SDK) vs approximated in Rheo?
6. Match motion from the codebase (may differ slightly from Rheo presets)? (yes/no)
7. Does the app use i18n/localization? If yes, which locale is the default/fallback? All `text.default` values must be resolved strings from that locale — never raw keys.

If the user has not named an entry point, stop after question 1 and wait for an answer.

## Steps

1. Fetch the latest Rheo Manifest Agent Profile:
   - Preferred raw docs URL: `/docs/md/developer-guide/agent-manifest-profile`.
   - If fetching fails, read [manifest-agent-profile-fallback.md](manifest-agent-profile-fallback.md).
   - Record the profile version used.
2. Complete the mandatory intake questionnaire above. Do not proceed without answers.
3. Run the bundled audit before generating — **from the target app root, not the skill folder**:
   - `RHEO=/abs/path/to/rheo/rheo-flow-import` then `cd <target-app>`.
   - `node "$RHEO/scripts/audit-import.mjs" --entry <flow-entry> --out rheo-import.audit.md`
   - `--entry` is the flow's entry **file** (import graph is traced) or a **directory** (source subtree only). Repeat `--entry` for multiple roots, or comma-separate: `--entry a.tsx,b.tsx`. The audit does **not** scan the whole repo.
   - Read the printed `audit_root` / `audit_entries` / `audit_scope` / `audit_scanned_files`. If `audit_root` is not the host app (e.g. it points inside the skill), fix `--entry`/`--root` and re-run — do not trust an audit rooted in the skill.
   - When intake Q6 is **yes**, add `--suggest-animations rheo-import.animations.json`.
   - Use the audit report as the evidence source for regions, styles, backgrounds, assets, and motion.
   - If the audit cannot run, explain why and manually produce the same report sections.
4. Identify the host stack: React Native / Expo, SwiftUI, or best-effort other mobile stack.
5. Find the flow entry point:
   - Ask for the file/route/coordinator if the user did not provide it.
   - React Native examples: Expo Router path, React Navigation screen, `OnboardingScreen`.
   - SwiftUI examples: `NavigationStack` root, onboarding view, coordinator push.
6. Trace reachable steps:
   - Follow imports and navigation calls.
   - Extract UI strings, button labels, input field keys, paywall calls, auth calls, permission prompts, links, and terminal navigation.
   - When the audit reports localization ([localization-import.md](localization-import.md)): resolve `t('key')` / `formatMessage` ids from the **default locale** JSON (e.g. `locales/en.json`), not the key itself. Set `manifest.defaultLocale` to that locale.
   - Detect branches from conditionals, feature flags, platform checks, or stored user state.
7. Infer screen regions from audit findings:
   - Look for top bars, safe-area header containers, `Header`, `Toolbar`, back icons, close buttons, and progress indicators.
   - Put back/close controls and flow progress into `regions.header` when they appear above main content.
   - Look for sticky CTA containers, `Footer`, bottom safe-area wrappers, and buttons outside scroll/content containers.
   - Put persistent bottom CTAs into `regions.footer`, not at the bottom of `regions.body`.
   - Use `regions.body` for scrollable or main content.
8. Extract style tokens from audit findings:
   - Inspect theme files, design-token files, Tailwind/NativeWind config, CSS variables, `StyleSheet.create`, shared component variants, and button/text primitives.
   - Map primary/background/foreground/accent colors into `manifest.theme` when clearly available.
   - Reuse obvious font sizes, font weights, spacing, border radius, and CTA variants from source components.
   - Set `style.color` on text layers when screens use dark/saturated backgrounds (`bg-red-600`, `text-white`, etc.).
   - Prefer the app’s named tokens over arbitrary black-and-white defaults.
   - Black-and-white fallback is allowed only when the audit finds no color evidence **and** the user confirms there is no theme file.
9. Map screen backgrounds and gradients:
   - For `BackgroundGradient`, `LinearGradient`, or `expo-linear-gradient`, set `screen.containerStyle.backgroundFill` to `{ "kind": "color", "color": "<linear-gradient CSS>" }`.
   - Example: `linear-gradient(180deg, #CCFBF1 0%, #F5F5F4 100%)` for a teal-to-stone shell gradient.
   - When a screen overrides with a solid brand color (e.g. red education pager), use that hex on the screen and white text.
   - Do not put gradients only in `manifest.theme.background` — theme background is a flat default, not a per-screen gradient.
10. Map carousels and in-screen pagers (see [carousel-import.md](carousel-import.md)):
   - When source uses `infoSteps`, `currentInfoStep`, horizontal `translateX` pagers, or `pagingEnabled` lists, emit `kind: "carousel"`.
   - Each slide is a vertical `stack` with image, title, and body text from that slide.
   - Add `pageControl: { "position": "bottom" }` when dot indicators exist (dots only).
   - Carousels are **swipe-only** — no Next/Continue button on the carousel layer. Do not add footer/body buttons for in-pager paging.
   - Use `regions.footer` only when the source CTA advances the **next screen in the flow**, or for single-slide carousels that need an explicit Continue.
   - Bundle every slide image; every asset referenced in the carousel must appear in `rheo-import.assets.json`.
   - Do not collapse multi-slide routes into one static screen with a single image.
11. Map layout, alignment, borders, and shadows:
   - Parent vertical stacks that center content need `align: "center"` (and `justify: "center"` when appropriate).
   - Hero images belong inside centered stacks, not as lone siblings in an unaligned vertical stack.
   - Card rows (rating, testimonials, why-it-works cards) use wrapping stacks with `style.background`, `style.radius`, `style.padding`, `style.border`, and `style.shadow` from source.
12. Map custom fonts from audit findings ([font-import.md](font-import.md)):
   - Detect `Font.loadAsync`, `useFonts`, Tailwind `fontFamily`, and `font-*` classes tied to loaded families.
   - Copy every `.ttf`, `.otf`, `.woff`, and `.woff2` file into `assets/fonts/` in the ZIP (path like `assets/fonts/CalSans-Regular.ttf`).
   - Write `rheo-import.fonts.json` with stable placeholder UUIDs per font style (weight + italic).
   - Set `manifest.theme.fontFamily` to the primary family name used in source (e.g. `CalSans`).
   - **Do not** add font files to `rheo-import.assets.json` — not as `type: "image"`, not as `type: "font"`. Fonts are not `media.mediaAssetId` assets.
   - Dashboard import uploads fonts and merges them into app branding; the manifest only references the family name string.
13. Map choice option default and selected states:
   - For `single_choice` and `multiple_choice`, each selectable option is a child `stack` layer.
   - Map unselected Tailwind/classes to `style` on that stack (border, background, padding, radius).
   - Map selected classes to `selectedStyle` on the same stack — the renderer merges selected over default.
   - When label text color changes on selection, set default `style.color` on the nested text layer and selected color via `selectedStyle` on the stack or nested text as appropriate.
   - Audit flags `selected === … ? … : …` ternaries — do not ship choice screens with only default styling.
14. Extract assets from audit findings:
   - Follow static imports, `require(...)`, image maps, Lottie JSON imports, video imports, and asset constants used by traced screens.
   - Inspect shared components and design primitives too; hero illustrations and logos are often hidden behind `Illustration`, `Logo`, `Avatar`, `Mascot`, or `ImageBackground` components.
   - Inspect platform asset catalogs and config references where relevant, for example Expo `assets/`, React Native image folders, Swift asset catalogs, and bundled Lottie/video directories.
   - Copy referenced local assets into an `assets/` folder in the output bundle.
   - For each asset, generate a stable placeholder UUID and use that UUID as `media.mediaAssetId` in the manifest.
   - Write `rheo-import.assets.json` mapping placeholder UUIDs to bundled file paths.
   - If a referenced asset cannot be copied, stop and report the missing asset instead of silently dropping the media layer.
15. Ask targeted follow-up questions for audit ambiguity:
   - Ask only when ambiguity changes the manifest materially.
   - Continue with low-confidence review notes when not blocked.
   - Examples: shared header vs per-step header, exact gradient mapping, light/dark asset choice, conflicting button token sources.
16. Use screenshots/recordings if supplied:
   - Use them for visual hierarchy, copy confirmation, colors, media placement, and step order.
   - Do not override clear source behavior unless the user says the visual artifact is newer.
17. Build a private flow model:
   - ordered screens
   - branches
   - inputs
   - external surfaces
   - terminal outcomes
   - unmappable native behavior
18. Generate `rheo-import.manifest.json`:
   - Emit a complete graph with explicit `next.default` edges.
   - Use decision nodes for clear branches.
   - Use RevenueCat external surfaces for detected RevenueCat paywalls.
   - Prefer fidelity when the user chose visual fidelity: carousels, gradients, shadows, and centered stacks.
   - **Layer ids:** `scr_*` / `lyr_*` only on screens and layers; UUID placeholders **only** for `media.mediaAssetId` and font sidecars ([layer-schema-pitfalls.md](layer-schema-pitfalls.md#layer-ids-vs-media-placeholder-uuids)).
   - **Container layers:** every `button`, `back_button`, `hyperlink`, `stack`, choice input, and auth layer must include its `children` (or `slides`) array ([manifest-rules.md](manifest-rules.md#container-layers-required-children)).
   - **Header back buttons:** `kind: "back_button"`, Rheo `variant` enum only (map source `outline`/`text`/`link`), nested `icon`/`text` children, **no `action`**, `icon.family: "ionicons"` ([layer-schema-pitfalls.md](layer-schema-pitfalls.md#back_button-header-chrome)).
   - **Choice screens:** every `single_choice` / `multiple_choice` includes `fieldKey`, `children` (≥2 option stacks), `optionBindings`, and `branching` — never `"options"` arrays ([layer-schema-pitfalls.md](layer-schema-pitfalls.md#single_choice--multiple_choice)).
   - When intake Q6 is **yes** and the workspace plan includes animations, apply motion from [animation-import.md](animation-import.md) (audit presets, stagger, conservative `restingMotion`). Omit motion when Q6 is **no** or plan lacks animations.
19. Validate and publish gate audit:
   - Run `node "$RHEO/scripts/validate-manifest.mjs" ./rheo-import.manifest.json` (schema + dashboard publish rules).
   - Run `node "$RHEO/scripts/audit-publish-manifest.mjs" ./rheo-import.manifest.json` and read `rheo-import.publish-gates.md`.
   - Fix every **blocking** issue (especially missing `style.color` on text and button labels, missing Continue on input screens, entry/completion path).
   - See [publish-gates.md](publish-gates.md) for the full checklist mirrored from the builder **Publish** button.
   - If safe normalization is needed, run `node "$RHEO/scripts/normalize-manifest.mjs" ./rheo-import.manifest.json`, then re-run validate + publish audit.
20. Bundle:
   - If there are no assets or fonts, provide `rheo-import.manifest.json` and explicitly state `no local assets found`.
   - If there are assets or fonts, create `rheo-import.zip` containing `rheo-import.manifest.json`, optional `rheo-import.assets.json`, optional `rheo-import.fonts.json`, and files under `assets/`.
   - Do not finish with JSON-only output when any traced screen references local image, Lottie, video, or font files.

## Output

Primary artifact:

- No assets after explicit audit: `rheo-import.manifest.json`.
- With assets: `rheo-import.zip`.

`rheo-import.assets.json` — **images, Lottie, and video only** (never fonts):

```json
{
  "assets": [
    {
      "id": "00000000-0000-0000-0000-000000000101",
      "path": "assets/hero.png",
      "type": "image",
      "contentType": "image/png",
      "name": "hero.png"
    }
  ]
}
```

**Supported `rheo-import.assets.json` MIME types (dashboard import rejects others):**

| `type` | `contentType` values | Extensions |
|--------|----------------------|------------|
| `image` | `image/png`, `image/jpeg`, `image/webp`, `image/gif`, `image/svg+xml` | `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.svg` |
| `lottie` | `application/json` | `.json` |
| `video` | `video/mp4`, `video/webm`, `video/quicktime` | `.mp4`, `.webm`, `.mov` |

Do **not** put `.ttf`, `.otf`, `.woff`, or `.woff2` in this file — use `rheo-import.fonts.json` ([font-import.md](font-import.md)). Do **not** bundle HEIC or AVIF as images. Match `type` and `contentType` to the file extension (do not label a `.json` Lottie as `type: "image"`).

`rheo-import.fonts.json` — **custom fonts only** (separate from assets.json):

```json
{
  "fontFamilies": [
    {
      "name": "CalSans",
      "styles": [
        {
          "id": "00000000-0000-0000-0000-000000000501",
          "weight": 400,
          "italic": false,
          "path": "assets/fonts/CalSans-Regular.ttf",
          "filename": "CalSans-Regular.ttf"
        }
      ]
    }
  ]
}
```

Choice option stack example (each option child of `single_choice` / `multiple_choice`):

```json
{
  "id": "lyr_goal_a",
  "kind": "stack",
  "style": {
    "border": { "width": 1, "color": "#E5E7EB" },
    "background": "#F9FAFB",
    "radius": 12,
    "padding": 16
  },
  "selectedStyle": {
    "border": { "width": 1, "color": "#6D5DF6" },
    "background": "#6D5DF610"
  },
  "children": [
    {
      "id": "lyr_goal_a_text",
      "kind": "text",
      "text": { "default": "Option A" },
      "style": { "color": "#0A0A0A" }
    }
  ]
}
```

Wrap option stacks in a full choice layer — see [layer-schema-pitfalls.md](layer-schema-pitfalls.md#single_choice--multiple_choice) for the required `fieldKey`, `optionBindings`, and `branching` wrapper.

Mention review notes in chat, not inside the manifest, unless Rheo contracts support the metadata.

## Completion Gate

Before final response, answer these for yourself:

- Did I complete the mandatory intake questionnaire and record answers in chat?
- Did I run audit with `--entry` and use carousel/style/background/layout/font/choice findings?
- Did I bundle custom fonts in `rheo-import.fonts.json` only (no `.ttf`/`.otf`/`.woff` rows in `rheo-import.assets.json`) and set `manifest.theme.fontFamily`?
- If the app uses i18n, did every `text.default` use resolved default-locale copy (not translation keys)?
- Did every choice option stack include both `style` and `selectedStyle` when the audit flagged selected ternaries?
- Did I emit `carousel` layers for every multi-slide route the audit flagged without duplicating pager buttons in `regions.footer`?
- Did I apply gradients to `screen.containerStyle.backgroundFill` and set text colors on colored screens?
- Did I center images and map card borders/shadows to wrapping stacks?
- Did I inspect source asset references from every traced screen and shared visual component?
- Did I either create `rheo-import.zip` or explicitly confirm no local assets were found?
- Does every `media.mediaAssetId` refer to a placeholder UUID listed in `rheo-import.assets.json` when assets exist?
- Does the ZIP include every file listed in `rheo-import.assets.json`?
- Did publish gate audit pass with zero blocking issues?
- Did every `back_button`, `button`, and `hyperlink` layer include a `children` array with nested label content (not omitted)?
- Did every layer use `lyr_*` ids (no asset UUIDs as layer ids)?
- Did every `back_button` use a Rheo `variant` enum value and omit `action`?
- Did every `single_choice` / `multiple_choice` include `fieldKey`, `optionBindings`, and `branching`?
- Did `node "$RHEO/scripts/validate-manifest.mjs"` exit 0 before zipping?

If any answer is no, the import is not complete.

Also verify that high-confidence audit findings were either used in the manifest/ZIP or explicitly explained in review notes.
