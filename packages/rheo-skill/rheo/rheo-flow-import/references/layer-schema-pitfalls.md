# Layer Schema Pitfalls

Read this before writing `rheo-import.manifest.json`. Dashboard import runs full Zod validation; layers that look "close enough" often fail with `invalid_union` at paths like `regions.header.children[0]` or `regions.body.children[1]`.

Run **`node scripts/validate-manifest.mjs ./rheo-import.manifest.json`** before zipping. Exit code must be **0**.

## Layer IDs vs media placeholder UUIDs

Two different id systems — do not mix them up.

| Use case | Format | Example |
|----------|--------|---------|
| Screen / layer / decision ids | `scr_*`, `lyr_*`, `dec_*`, `surf_*` | `lyr_scr_gender_back` |
| `media.mediaAssetId` in manifest | UUID placeholder | `00000000-0000-0000-0000-000000000101` |
| `optionBindings[].rootLayerId` | **`lyr_*` layer id** (not UUID) | `lyr_scr_gender_opt_m` |

**Invalid:** `"id": "00000000-0000-0000-0000-000000000101"` on a layer, `"id": "back_btn"`, `"id": "headerBack"`, random strings with punctuation.

Every layer and nested child needs its own unique `lyr_*` id.

## Button and back_button variants

Rheo accepts **only** these `variant` values on `button` and `back_button`:

`primary` | `secondary` | `ghost` | `destructive`

**Invalid variants** (common from Tailwind / shadcn / Material — map them, do not copy literally):

| Source / habit | Map to |
|----------------|--------|
| `outline`, `bordered`, `tertiary` | `secondary` or `ghost` |
| `text`, `link`, `plain` | `ghost` |
| `default`, `filled` | `primary` |
| `danger`, `error` | `destructive` |

`variant` is **required** on every `button` and `back_button`.

## back_button (header chrome)

Use in `regions.header` for back/close controls above content.

**Do:**

- `kind: "back_button"` (not `"button"` with a custom back action)
- `variant` from the allowed enum above
- `children` array with nested `icon` and/or `text`
- Unique `lyr_*` ids on the back button and every child

**Do not:**

- Omit `children`
- Add `action` (back navigation is built-in)
- Use invalid `variant` values
- Use non-`lyr_*` layer ids

Chevron-only header control:

```json
{
  "id": "lyr_scr_approach_back",
  "kind": "back_button",
  "variant": "ghost",
  "children": [
    {
      "id": "lyr_scr_approach_back_icon",
      "kind": "icon",
      "family": "ionicons",
      "iconName": "chevron-back-outline",
      "style": { "width": 20, "height": 20, "color": "#0A0A0A" }
    }
  ]
}
```

Icons: **`family` must be `"ionicons"`** with a valid `iconName` (e.g. `chevron-back-outline`, `close-outline`). No SF Symbols, no custom icon font names on `icon` layers.

## single_choice / multiple_choice

Choice inputs are **not** generic option lists. Never emit `"options": [...]`, `"choices": [...]`, `"kind": "choice"`, or `"kind": "radio"`.

**Required on every choice layer:**

| Field | Rule |
|-------|------|
| `fieldKey` | snake_case, starts with lowercase letter (`gender`, `language`, `age_range`) |
| `children` | Array of **≥2** option `stack` layers, each with its own `lyr_*` id |
| `optionBindings` | One entry per option: `{ "optionId": "<stable id>", "rootLayerId": "<child stack lyr_* id>" }` |
| `branching` | Always present: `{ "enabled": false, "conditions": [] }` unless source has real branch rules |

`optionBindings.length` must equal `children.length`. Every `rootLayerId` must match a direct child stack's `id`.

Full minimal example:

```json
{
  "id": "lyr_scr_gender_choice",
  "kind": "single_choice",
  "fieldKey": "gender",
  "children": [
    {
      "id": "lyr_scr_gender_opt_m",
      "kind": "stack",
      "direction": "horizontal",
      "align": "center",
      "gap": 8,
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
          "id": "lyr_scr_gender_opt_m_text",
          "kind": "text",
          "text": { "default": "Male" },
          "style": { "color": "#0A0A0A" }
        }
      ]
    },
    {
      "id": "lyr_scr_gender_opt_f",
      "kind": "stack",
      "direction": "horizontal",
      "align": "center",
      "gap": 8,
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
          "id": "lyr_scr_gender_opt_f_text",
          "kind": "text",
          "text": { "default": "Female" },
          "style": { "color": "#0A0A0A" }
        }
      ]
    }
  ],
  "optionBindings": [
    { "optionId": "male", "rootLayerId": "lyr_scr_gender_opt_m" },
    { "optionId": "female", "rootLayerId": "lyr_scr_gender_opt_f" }
  ],
  "branching": {
    "enabled": false,
    "conditions": []
  }
}
```

## Diagnosing `invalid_union` in API logs

When dashboard import returns `invalid seeded flow manifest` with `code: "invalid_union"`:

| Path pattern | Inspect |
|--------------|---------|
| `regions.header.children[0]` | First header layer — usually `back_button`: check `variant`, `children`, `lyr_*` ids, nested `icon.family` |
| `regions.body.children[1]` | Often `single_choice` on question screens: check `fieldKey`, `optionBindings`, `branching`, option stack ids |
| Any `children[N]` | Open that layer object; compare to templates in this doc |

Extract and validate locally:

```bash
unzip -p rheo-import.zip rheo-import.manifest.json > /tmp/rheo-import.manifest.json
node scripts/validate-manifest.mjs /tmp/rheo-import.manifest.json
```

Fix every reported path, re-run until exit 0, then rebuild the ZIP.
