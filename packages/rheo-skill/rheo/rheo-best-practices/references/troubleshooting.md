# Troubleshooting

## Manifest Fails Validation

Run:

```bash
node scripts/validate-manifest.mjs ./rheo-import.manifest.json
```

Fix the exact issue paths. Use normalization only for safe shape repairs.

## Dashboard Import Crashes With `Cannot read properties of undefined (reading 'forEach')`

This usually means a container layer is missing its `children` array — most often `back_button` in `regions.header` emitted as `{ "kind": "back_button" }` without nested label content.

Fix in the manifest:

1. Search for `"kind": "back_button"` (and `"kind": "button"`, `"kind": "hyperlink"`).
2. Ensure each has `"children": [ { "kind": "text", "text": { "default": "..." }, "style": { "color": "..." } } ]` (plus optional `icon` child).
3. Re-run `validate-manifest.mjs`, then rebuild the ZIP.

`normalize-manifest.mjs` does not repair missing `back_button.children`.

## API Returns `invalid seeded flow manifest` With `invalid_union`

Dashboard import passed asset upload but Zod rejected the manifest. Usually **dozens of issues** at repeating paths:

- `regions.header.children[0]` → invalid **`back_button`** (wrong/missing `variant`, bad ids, missing `children`, nested icon not `ionicons`, or spurious `action`)
- `regions.body.children[1]` → invalid **`single_choice`** (missing `optionBindings` / `branching` / `fieldKey`, or `"options"` instead of `children`)

Fix workflow:

1. Extract manifest: `unzip -p rheo-import.zip rheo-import.manifest.json > /tmp/manifest.json`
2. Run `node scripts/validate-manifest.mjs /tmp/manifest.json` and fix **every** path.
3. Compare failing layers to [layer-schema-pitfalls.md](layer-schema-pitfalls.md).
4. Re-run validate until exit 0, rebuild ZIP, re-import.

## Missing Fallback Edge

Every external surface needs `fallback`. RevenueCat outcomes that are not explicitly mapped fall through to this target.

## Integration Disabled

The manifest may validate locally but fail dashboard import if the target app has RevenueCat disabled or the workspace lacks integration entitlements.

## Wrong Environment

Publishable keys and channels are environment-scoped. Do not mix test keys with live channels.

## Custom Native UI

If the source flow uses behavior Rheo cannot render, approximate the screen with editable layers and mention the behavior for manual review. Do not invent unsupported layer kinds.

## Resolve Fallback Confusion

`Flow` fallback / `FlowView` fallback is for network or resolve failure. It is not the main mechanism for representing a production legacy onboarding flow in the builder.
