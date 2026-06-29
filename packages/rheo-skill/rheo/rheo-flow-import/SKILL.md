---
name: rheo-flow-import
description: Analyze an existing mobile app flow (onboarding, paywall, post-purchase, setup) in a React Native, Expo, or SwiftUI codebase and export it as a compliant Rheo FlowManifest, then validate it against the dashboard publish gates. Use when a user asks to import, migrate, or convert an existing flow into Rheo, generate or scaffold a Rheo manifest, or validate/repair a Rheo manifest. Part of the `rheo` skill. Ships self-contained node scripts — no install step.
compatibility: Requires Node.js 20+. All scripts are self-contained (zod, @getrheo/contracts, and @getrheo/flow-runtime are bundled into scripts/lib/rheo-cli.mjs). Internet access fetches the latest Manifest Agent Profile; a bundled fallback works offline.
---

# Rheo — Flow Import

Convert an existing app flow into a Rheo `FlowManifest` that imports and publishes in the dashboard with zero blockers. Prefer **source code as truth**; use screenshots/recordings only as supporting evidence unless the user says they are newer.

The recommended authoring path is **spec → scaffold → enrich → validate**: describe the flow as a compact [flow spec](references/flow-spec.md), run `scaffold-manifest.mjs` to get a schema-valid skeleton with correct ids/structure, then enrich styling and validate. Hand-authoring full manifest JSON is allowed but error-prone — the scaffold removes the mechanical mistakes (ids, `children` arrays, choice bindings, branching).

## Self-contained tooling

The scripts under [scripts/](scripts) run with **plain `node`** — no `pnpm install`, no workspace. The validation/scaffold engine and the Rheo contracts are bundled into `scripts/lib/rheo-cli.mjs`.

> **Run them from the target app's root, not from the skill folder.** The scripts are self-contained, so reference them by path. Pointing the audit at the skill folder only scans the skill's own examples and produces noise.
>
> ```bash
> RHEO=/abs/path/to/rheo/rheo-flow-import          # this skill's rheo-flow-import directory
> cd <target-app>                              # the app you are importing
> node "$RHEO/scripts/audit-import.mjs" --entry app/onboarding.tsx --out rheo-import.audit.md
> ```
>
> The audit anchors to the **project root inferred from `--entry`** (the nearest enclosing `package.json` / `app.json` / `Package.swift`), or to `--root <appRoot>` when you pass it. `--entry` may be a **file** (traces its import graph) or a **directory** (scans that subtree only). Repeat `--entry` for multiple entry files. It hard-errors if any entry does not exist or if the root resolves inside the skill — and prints `audit_root` / `audit_entries` / `audit_scope` / `audit_scanned_files` so you can confirm it anchored to the real app. Outputs (`--out`, `--suggest-animations`) are written relative to the current directory.

| Script | Purpose |
|--------|---------|
| `node "$RHEO/scripts/audit-import.mjs" --entry <file\|dir> [--entry <file\|dir> ...] --out rheo-import.audit.md` | Crawl imports from entry file(s) or source subtree(s); write an evidence report. Add `--suggest-animations <path>.json` for motion. |
| `node "$RHEO/scripts/scaffold-manifest.mjs" <flow-spec.json> [--out <path>]` | Expand a flow spec ([references/flow-spec.md](references/flow-spec.md)) into a **schema-valid** manifest skeleton (correct ids, `children`, choice bindings, branching). |
| `node "$RHEO/scripts/validate-manifest.mjs" <manifest.json>` | Validate schema **and** dashboard publish gates. Must exit `0` before delivering. |
| `node "$RHEO/scripts/audit-publish-manifest.mjs" <manifest.json> [--out <path>]` | Write `rheo-import.publish-gates.md` (blocking issues + fixes). |
| `node "$RHEO/scripts/normalize-manifest.mjs" <manifest.json> [--out <path>] [--write]` | Safe legacy repairs only (legacy `button`/`hyperlink` labels) — **not** missing `back_button.children`. |
| `node "$RHEO/scripts/print-manifest-summary.mjs" <manifest.json>` | Print non-sensitive manifest metadata. |
| `node "$RHEO/scripts/fetch-profile.mjs" [--offline-profile]` | Report the Manifest Agent Profile source + version. |

All `<manifest.json>` / `<flow-spec.json>` paths and outputs resolve from the **current directory** (your app root), so the artifacts land in the app, not the skill.

## Workflow

1. **Read first:** [references/import-workflow.md](references/import-workflow.md), [references/capabilities.md](references/capabilities.md), [references/layer-schema-pitfalls.md](references/layer-schema-pitfalls.md). For source-reading by stack: [references/react-native-source-patterns.md](references/react-native-source-patterns.md) or [references/swiftui-source-patterns.md](references/swiftui-source-patterns.md).
2. **Set `$RHEO` and `cd` into the target app.** Point `$RHEO` at this skill's `rheo-flow-import` directory and run every script from the app root (see Self-contained tooling above). All scripts work from anywhere via the `$RHEO/scripts/...` path.
3. **Profile:** fetch the latest Manifest Agent Profile (`node "$RHEO/scripts/fetch-profile.mjs"`, or the raw docs URL `/docs/md/developer-guide/agent-manifest-profile`). Record the version. Falls back to [references/manifest-agent-profile-fallback.md](references/manifest-agent-profile-fallback.md) offline.
4. **Mandatory intake (blocking):** ask every question in the Mandatory Intake Questionnaire in [references/import-workflow.md](references/import-workflow.md) and record answers in chat. Do not skip because the repo looks obvious. If the user has not named an entry point, stop after Q1 and wait.
5. **Audit:** run `node "$RHEO/scripts/audit-import.mjs" --entry <flow-entry> [--entry <other-entry> ...] --out rheo-import.audit.md` (add `--suggest-animations` when intake Q6 is yes). **Confirm the printed `audit_root`/`audit_entries`/`audit_scope` point at the real app** before trusting the evidence. If the audit cannot run, explain why and produce the same sections manually.
6. **Author:** write a [flow spec](references/flow-spec.md) and run `scaffold-manifest.mjs`, then enrich theme/styles; or hand-author following [references/manifest-rules.md](references/manifest-rules.md). Apply carousel/font/localization/animation guidance from the dedicated references when the audit flags them.
7. **Validate (blocking):** run `node "$RHEO/scripts/validate-manifest.mjs" ./rheo-import.manifest.json` (exit `0`) **and** `node "$RHEO/scripts/audit-publish-manifest.mjs" ./rheo-import.manifest.json` — fix every blocking issue ([references/publish-gates.md](references/publish-gates.md)).
8. **Bundle:** if any traced screen references local images, Lottie JSON, video, or fonts, output `rheo-import.zip` (manifest + optional `rheo-import.assets.json` (media only) + optional `rheo-import.fonts.json` (fonts only) + files under `assets/`). Raw JSON only after an explicit asset audit finds nothing local.

## Hard rules (blocking)

- **Validate before zipping.** `node scripts/validate-manifest.mjs` must exit `0`. Do not discover schema errors after upload.
- **Don't write an ad-hoc scanner** before trying `scripts/audit-import.mjs`. If it can't run, explain why and audit manually with the same sections.
- **Layer ids:** every screen/layer/decision/surface id uses prefixes `scr_*`, `lyr_*`, `dec_*`, `surf_*`. UUID placeholders are **only** for `media.mediaAssetId` and font sidecars — never as layer ids or `optionBindings.rootLayerId`.
- **Container `children`:** every container layer **must** include a `children` array (or `slides` for `carousel`) — never omit the key. `button`, `back_button`, and `hyperlink` are containers: label copy goes in nested `text` children (optional leading `icon`). See [references/manifest-rules.md](references/manifest-rules.md#container-layers-required-children).
- **`back_button`:** header back chrome is `kind: "back_button"` with a required Rheo `variant` (`primary`|`secondary`|`ghost`|`destructive` — map source `outline`/`text`/`link`). **No `action`**. Nested `icon` uses `family: "ionicons"`.
- **Choice inputs:** `single_choice`/`multiple_choice` require `fieldKey` (snake_case), `children` (≥2 option stacks), `optionBindings` (one per option, `rootLayerId` = child stack `lyr_*` id), and `branching` (`{ "enabled": false, "conditions": [] }` when no branches). Never `"options"`/`"choices"`.
- **Styling:** when the audit reports colors, populate `manifest.theme` and layer `style` (including `style.color` on every text layer and nested button label). No black-and-white defaults when color evidence exists.
- **Gradients:** map `LinearGradient`/gradient stops to `screen.containerStyle.backgroundFill.color` as a `linear-gradient(...)` CSS string.
- **Carousels:** pager/carousel evidence (`infoSteps`, horizontal pager, `pagingEnabled`) → `kind: "carousel"`, one slide per page, swipe-only (no in-pager buttons). See [references/carousel-import.md](references/carousel-import.md).
- **Fonts:** custom fonts go in `rheo-import.fonts.json` under `assets/fonts/` and `manifest.theme.fontFamily`; **never** in `rheo-import.assets.json`. See [references/font-import.md](references/font-import.md).
- **Localization:** resolve **default-locale** strings into every `text.default` — never raw translation keys. Set `manifest.defaultLocale`. See [references/localization-import.md](references/localization-import.md).
- **Animations:** map motion from the audit only when intake Q6 is yes and the plan includes animations ([references/animation-import.md](references/animation-import.md)); otherwise omit all `animations`, `stagger`, `restingMotion`.
- **No secrets** in manifests.

## Final response

Report: manifest or ZIP path; audit report path (or why audit could not run); the recorded intake answers; Manifest Agent Profile version used (or bundled fallback); validation + publish-gate result (PASS or fixes applied); region/style/gradient/carousel/layout/font/localization/choice-state decisions from audit evidence; assets bundled (or `no local assets found`); and any unmappable native behavior the user should review in the Rheo builder. See [references/import-workflow.md](references/import-workflow.md#completion-gate) for the full completion gate.
