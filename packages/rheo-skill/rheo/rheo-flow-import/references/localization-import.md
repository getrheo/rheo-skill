# Localization / i18n import

When the host app uses i18n (i18next, react-intl, Lingui, i18n-js, expo-localization + JSON, etc.), Rheo import must still ship **human-readable copy**, not translation keys.

## Hard rule

1. Detect the app's **default / fallback locale** (e.g. `en` from `fallbackLng`, `defaultLocale`, or `locales/en.json`).
2. Set `manifest.defaultLocale` to that locale (and include it in `manifest.locales`).
3. For every text layer, button label, placeholder, and choice option: set `text.default` to the **resolved string in that locale**.
4. **Never** put raw keys in `text.default` (`onboarding.welcome.title`, `COMMON_CONTINUE`, `common:button.next`).

Optional: after defaults are correct, add `text.translations` for other locales from the same source JSON files.

## Wrong vs right

| Source (i18next) | Wrong manifest | Right manifest |
|------------------|----------------|----------------|
| `t('onboarding.welcome.title')` | `{ "default": "onboarding.welcome.title" }` | `{ "default": "Welcome to Rheo" }` |
| `formatMessage({ id: 'cta.continue' })` | `{ "default": "cta.continue" }` | `{ "default": "Continue" }` |

## How to resolve copy

1. Run `audit-import` — check **Localization / i18n Evidence** for detected library, default locale, and sample `t("key") -> "value"` rows.
2. Open the default locale file (`locales/en.json`, `translations/en.json`, etc.).
3. For each key used on traced screens, walk nested JSON (`onboarding.welcome.title` → `en.onboarding.welcome.title`).
4. If the key uses a namespace (`common:save`), load from that namespace object in the locale file.
5. Use screenshots as a sanity check when JSON is incomplete.

## TypeScript locale modules (`export const en`)

Many Expo/React Native apps keep copy in `.ts` files, not JSON:

```ts
// i18n/locales/en.ts
export const en = {
  onboarding: { stepWelcome: { title: 'Track Your Drinks' } },
};
```

When generating a manifest with a Node script (`tsx`, `ts-node`, etc.):

1. **Use the app's i18n library** — e.g. `i18n-js` with the same `defaultLocale`, `enableFallback`, and locale objects as `LocaleContext` / `i18n/index`. Do not hand-roll a dot-path walker unless you have verified it matches nested keys and interpolation.
2. **Resolve every `t('key')` before writing the manifest** — map each traced key through that library (or an equivalent) and put the return value in `text.default`.
3. **Optional `text.translations`** — load `de`, `fr`, etc. from sibling locale modules and call `t` per locale for the same keys.

## Script import pitfall (`tsx` + `scripts/`)

If the generator lives under `scripts/` and imports locales with a **relative path** (`../i18n/locales/en.ts`), `tsx` may not expose named exports (`en`, `de`, …). You often get only:

```ts
{ default: { en: { /* locale tree */ } } }
```

Symptoms:

- `import { en } from '../i18n/locales/en.ts'` → `does not provide an export named 'en'`
- `import * as locales from '../i18n/locales/en.ts'` → `locales.en` is `undefined`; only `locales.default` exists
- A custom `t()` then returns the **key unchanged** → manifest full of `onboarding.stepWelcome.title` strings

**Fix (pick one):**

```ts
// A) Default import + unwrap (works from scripts/)
import enModule from '../i18n/locales/en.ts';

const localeFromModule = (mod: unknown, code: string) => {
  const root = (mod as { default?: Record<string, unknown> }).default ?? mod;
  const nested = (root as Record<string, unknown>)[code];
  return (nested ?? root) as Record<string, unknown>;
};

const en = localeFromModule(enModule, 'en');
```

```ts
// B) Import from repo root in a one-liner smoke test (named exports often work here)
import { en } from './i18n/locales/en.ts';
```

```ts
// C) Absolute file URL from repo root (stable for async generators)
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

const mod = await import(pathToFileURL(join(ROOT, 'i18n/locales/en.ts')).href);
const en = mod.en ?? mod.default?.en ?? mod.default;
```

**Smoke test before zipping** — must pass with zero matches:

```bash
grep -E '"default": "(onboarding|common|auth)\.' rheo-import.manifest.json
# or search the manifest inside the zip the same way
```

Also log one known key after loading locales, e.g. `onboarding.stepWelcome.trackDrinks.title` → `Track Your Drinks`. If the log prints the key, abort generation and fix imports — do not ship the bundle.

## Manifest shape

```json
{
  "defaultLocale": "en",
  "locales": ["en"],
  "screens": [
    {
      "regions": {
        "body": {
          "kind": "text",
          "text": {
            "default": "Welcome",
            "translations": { "fr": "Bienvenue" }
          }
        }
      }
    }
  ]
}
```

`default` is required and must be the default-locale string. `translations` is optional.

## Intake

When audit reports localization, confirm with the user which locale is the app fallback if ambiguous. Still **always** resolve strings from that locale — do not import keys because other locales exist.

## Validation

`validate-manifest.mjs` warns when `text.default` values look like i18n keys. Fix before zipping for dashboard import.
