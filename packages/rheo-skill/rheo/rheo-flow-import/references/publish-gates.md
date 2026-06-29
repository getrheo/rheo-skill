# Publish Gates (import completion)

After generating `rheo-import.manifest.json`, run the **publish gate audit** so the manifest matches what the Rheo dashboard **Publish** button enforces. Goal: one-click import and publish with zero blockers.

```bash
node scripts/audit-publish-manifest.mjs ./rheo-import.manifest.json
```

`validate-manifest.mjs` now includes the same blocking rules (not only Zod schema).

## What the audit checks

These mirror `apps/web/src/features/builder/validateFlow.ts` and API `preflightPublishManifest` + integration/canvas/plan gates.

### Schema (Zod)

- Valid `FlowManifest` shape, ids, layer kinds, required fields.

### Builder rules (`collectFlowBuilderIssues`)

| Rule | Typical agent mistake |
|------|------------------------|
| **Layer ids** | UUIDs or non-`lyr_*` strings used as layer ids or `optionBindings.rootLayerId` (UUIDs are for `mediaAssetId` only). |
| **Button `variant`** | Source names copied literally (`outline`, `text`, `link`, `default`) instead of Rheo enum (`primary`/`secondary`/`ghost`/`destructive`). |
| **`back_button` shape** | Missing `variant`, invalid variant, `action` field present, or nested `icon` without `family: "ionicons"`. |
| **Choice input shape** | `single_choice` / `multiple_choice` missing `optionBindings` or `branching`, using `"options"` instead of `children`, or `fieldKey` not snake_case. |
| **Container `children`** | `back_button`, `button`, or `hyperlink` emitted without a `children` array (or with label text on the parent instead of nested `text` children). Crashes import on Indie plans during motion strip; fails Zod validation. |
| **Text/icon `style.color`** | Body text or **button label** (nested text child) left without `style.color` — native does not inherit CSS colors. |
| **Continue button** | `text_input`, `multiple_choice`, or `scale_input` without a `button` with `action.kind: "continue"`. |
| **One input per screen** | Multiple inputs, or OAuth/email-password combined with inputs. |
| **fieldKey** | Missing or non–snake_case on input layers. |
| **Graph targets** | `go_to_step`, choice `goTo`, permission outcomes, fallbacks point at missing ids. |
| **Media triggers** | Lottie/video with `autoPlay: false` needs a `play_media` button targeting that layer. |
| **Screen backgrounds** | Image/video fills need `mediaAssetId`; manual background video needs trigger wiring. |

### Publishable graph (`validatePublishable`)

- At least one screen.
- `entryScreenId` set and valid.
- A **completion path** from entry (`end_flow`, terminal `next`, or external surface end).
- Decision nodes: every case and `elseNext` connected.

### Integrations (default: enabled)

- External surfaces need `config.provider` (not `unspecified`).
- Every external surface needs `fallback`.
- RevenueCat surfaces require RevenueCat integration enabled (import assumes enabled).

### Canvas editor gates (default: all enabled)

Import audit assumes all capabilities are on. If the target app disables Lottie, OAuth, email/password, or OS permission buttons, remove those layers or enable the gate in App settings.

**`request_app_review`** is not canvas-gated. When used, ensure the screen has **`next.default`** wired to a valid target.

### Branding gradients

- `$brandGradient:<uuid>` only on background-like fields.
- Unknown preset ids when branding is known.

## Required styling pattern (buttons)

Primary CTA example — **label text must have explicit color**:

```json
{
  "kind": "button",
  "variant": "primary",
  "action": { "kind": "continue" },
  "children": [
    {
      "kind": "text",
      "text": { "default": "Continue" },
      "style": { "color": "#FFFFFF" }
    }
  ]
}
```

Body copy on light backgrounds: `"style": { "color": "#0A0A0A" }` or map from `manifest.theme.foreground`.

On dark or saturated screen fills, use `#FFFFFF` or `theme.primaryForeground` on text layers.

## Completion gate (blocking)

Before delivering the import:

- [ ] `node scripts/validate-manifest.mjs` exits 0
- [ ] `node scripts/audit-publish-manifest.mjs` exits 0 and `rheo-import.publish-gates.md` shows **PASS**
- [ ] Every blocking issue has been fixed in the manifest (not only explained in chat)

If publish gate audit fails, fix the manifest and re-run until PASS. Do not skip because a weaker model missed button label colors.
