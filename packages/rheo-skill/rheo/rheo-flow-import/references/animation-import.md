# Animation import

Map motion from the customer codebase into Rheo’s **existing** animation IR. Do not invent custom keyframe DSL or cross-screen transitions.

## Gates (required)

1. **Intake Q6** — “Match motion from the codebase (may differ slightly from Rheo presets)?”  
   - **Yes** → apply motion from the audit (steps below).  
   - **No** → omit all `screen.animations`, `screen.stagger`, and layer `restingMotion` / `restingMotions`.

2. **Plan** — Animations require **Grow+** (`entitlements.animations`).  
   - Dashboard bundle import strips motion when the workspace plan lacks animations.  
   - Offline agent imports: confirm plan in chat; strip motion before zip if Indie.

## Rheo surfaces

| Surface | Manifest fields |
|---------|-----------------|
| Screen clips | `screen.animations[]` — `trigger`: `mount` \| `stagger` \| `unmount` |
| Stagger gap | `screen.stagger.stepMs` when any clip uses `trigger: stagger` |
| Resting loops | `layer.restingMotion` — presets: `translate`, `bounce`, `scale`, `pulse`, `rotate` (conservative only) |
| Lottie / video | **Assets only** — never duplicate as timeline clips |

**Out of scope:** `ScreenTransition`, CSS/Framer, gesture-driven pan/pinch, physics-accurate springs.

## Audit workflow

```bash
node scripts/audit-import.mjs --entry <screen.tsx> --root <repo> \
  --out rheo-import.audit.md \
  --suggest-animations rheo-import.animations.json
```

Read **Animation And Motion Evidence** in the audit. Use `rheo-import.animations.json` for preset ids, `targetLayerId` hints, `durationMs`, and `staggerIndex`.

### Preset ids (mount)

| Preset | Source hint |
|--------|-------------|
| `fade-in` | opacity 0→1 |
| `slide-up` | translateY +16→0 |
| `slide-down-in` | translateY -16→0 |
| `slide-in-left` / `slide-in-right` | translateX ±24→0 |
| `scale-in` | scale + opacity |

### Preset ids (unmount)

`fade-out`, `slide-up-out`, `slide-down-out`, `slide-left-out`, `slide-right-out`, `scale-out`

### Stagger

Only when source has **explicit** stagger (`staggerChildren`, delay arrays, Reanimated stagger). One clip per child: `trigger: stagger`, `staggerIndex` 0..n, shared preset.

### Unmappable motion

Springs (`withSpring` custom damping), unknown curves → **omit** from manifest; keep audit note only. Do not pick “nearest” presets.

### Timing

Use source `durationMs` / `delayMs` when 50–800ms; otherwise preset defaults (mount ~320ms, unmount ~280ms).

## Manifest authoring

1. Resolve `layer:<screenSlug>:<role>` hints to real layer ids on each screen.
2. Build clips with full `tracks` (copy from suggest JSON or builder-equivalent shapes).
3. Clip `id`: `clip-<preset>-<layerId-slug>`.
4. Max ~12 clips per screen; prioritize hero + stagger children.
5. Run `node scripts/validate-manifest.mjs ./rheo-import.manifest.json` — fixes `animation_target_layer_missing`, `animation_stagger_index_required`, etc.

## Validation codes (warnings)

| Code | Meaning |
|------|---------|
| `animation_target_layer_missing` | `targetLayerId` not on screen |
| `animation_stagger_index_required` | `trigger: stagger` without `staggerIndex` |
| `animation_unmount_stagger_forbidden` | `unmount` clip has `staggerIndex` |
| `animation_duration_out_of_range` | `durationMs` outside 50–800 |

Publish gates do **not** require animations for publish.
