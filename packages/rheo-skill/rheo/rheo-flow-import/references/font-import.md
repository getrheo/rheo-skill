# Custom font import (rheo-import.fonts.json)

Fonts are **not** media assets. Never list `.ttf`, `.otf`, `.woff`, or `.woff2` files in `rheo-import.assets.json`.

## Two files, two jobs

| File | Purpose |
|------|---------|
| `rheo-import.assets.json` | Images, Lottie JSON, videos only (`media.mediaAssetId` placeholders) |
| `rheo-import.fonts.json` | Custom font files for app branding + `manifest.theme.fontFamily` |

Dashboard import **rejects** a font path in `rheo-import.assets.json` when `type` is `image` (or any type that does not match the extension).

## Copy paths

- Put font binaries under `assets/fonts/` in the ZIP (not mixed into image folders).
- Use a single `assets/` prefix in paths, e.g. `assets/fonts/CalSans-Regular.ttf` — avoid `assets/assets/fonts/...`.

## rheo-import.fonts.json shape

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

- `name` — family string referenced by `manifest.theme.fontFamily` (e.g. `"CalSans"`).
- `styles[].path` — ZIP path to the font file (extension must match the binary).
- `styles[].id` — stable placeholder UUID per style (weight + italic), not used in manifest layers.

Font rows do **not** use `type` or `contentType`. Upload MIME is inferred from the file extension on import.

## Supported font MIME types (upload)

| Extension | MIME used on sign-upload |
|-----------|--------------------------|
| `.ttf` | `font/ttf` |
| `.otf` | `font/otf` |
| `.woff` | `font/woff` |
| `.woff2` | `font/woff2` |

## Common agent mistakes (BLOCKING)

1. **Font in `rheo-import.assets.json`** with `"type": "image"` and `image/png` — wrong file and wrong MIME.
2. **Font in `rheo-import.assets.json`** with `"type": "font"` — still wrong file; use `rheo-import.fonts.json` only.
3. **Only `manifest.theme.fontFamily`** without bundling font files — family name alone does not load the font.
4. **Duplicate path prefix** — `assets/assets/fonts/...` from joining paths incorrectly.

## Checklist before zipping

- [ ] Every `.ttf`/`.otf`/`.woff`/`.woff2` appears only in `rheo-import.fonts.json`, not in `rheo-import.assets.json`
- [ ] `manifest.theme.fontFamily` matches a `fontFamilies[].name`
- [ ] Each style `path` exists in the ZIP under `assets/fonts/`
- [ ] No font file uses `media.mediaAssetId` in the manifest
