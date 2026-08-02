#!/usr/bin/env tsx
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BUTTON_LAYER_VARIANTS, ButtonActionSchema, EMAIL_PASSWORD_AUTH_MODES, FIELD_CLASSIFICATIONS, ICON_FAMILIES, LAYER_KINDS, MANIFEST_SCHEMA_VERSION, OAUTH_LOGIN_PRESETS, OS_PERMISSION_KEYS, TEXT_INPUT_TYPES } from '@getrheo/contracts';

/** Button/back-button action `kind` literals, read straight from the contract schema. */
export const BUTTON_ACTION_KINDS: string[] = ButtonActionSchema.options.map(
  (option) => option.shape.kind.value as string,
);

const list = (values: readonly string[]): string => values.map((value) => `\`${value}\``).join(', ');

const bullets = (values: readonly string[]): string =>
  values.map((value) => `- \`${value}\``).join('\n');

/**
 * Render the agent-facing capability cheat-sheet from the live `@getrheo/contracts` surface.
 * Regenerate with `pnpm --filter @getrheo/rheo-skill gen:capabilities`; a drift test fails CI if
 * the committed `references/capabilities.md` falls behind the contracts.
 */
export const generateCapabilitiesMarkdown = (): string =>
  [
    '# Rheo Capability Surface',
    '',
    '> Generated from `@getrheo/contracts`. Do not hand-edit — run `pnpm --filter @getrheo/rheo-skill gen:capabilities`.',
    '',
    `Manifest schema version: ${MANIFEST_SCHEMA_VERSION}`,
    '',
    'Only the kinds, actions, permissions, and variants listed here are valid. Never invent a layer kind, action,',
    'permission key, or variant — the dashboard import runs full Zod validation and rejects anything not below.',
    '',
    '## Layer kinds',
    '',
    'Every layer `kind` accepted by the manifest:',
    '',
    bullets(LAYER_KINDS),
    '',
    'Container layers that **must** include a `children` array (or `slides` for carousel): `stack`, `carousel`,',
    '`button`, `back_button`, `hyperlink`, `single_choice`, `multiple_choice`, `oauth_login`,',
    '`oauth_provider` (custom variant), `email_password_auth`, `email_password_field`, `email_password_submit`,',
    '`conditional`.',
    '',
    '`conditional` picks which of its child stacks renders: ordered `cases[]` (each with a `DecisionExpr`',
    'and a `rootLayerId`) plus a required `elseRootLayerId`. Every bound id must be a distinct direct child',
    '`stack`. Cases may only read fields answered above the conditional, every case needs at least one rule',
    'before publish, and the one-input limit applies per active path so sibling branches may each own an input.',
    '',
    '## Button / back_button variants',
    '',
    `Allowed \`variant\` values (required on \`button\` and \`back_button\`): ${list(BUTTON_LAYER_VARIANTS)}.`,
    '',
    'Map source/framework variants: `outline`/`bordered`/`tertiary` -> `secondary` or `ghost`; `text`/`link`/`plain`',
    '-> `ghost`; `default`/`filled`/`solid` -> `primary`; `danger`/`error` -> `destructive`.',
    '',
    '## Button actions',
    '',
    'Valid `action.kind` values on `button` layers:',
    '',
    bullets(BUTTON_ACTION_KINDS),
    '',
    '- `FlowGraphNodeJumpTarget` (`scr_*` | `dec_*` | `surf_*`): `go_to_step.screenId`, choice `branching.conditions[].goTo`, loader/lottie/video `onComplete` when mode is `screen`, and `request_os_permission` outcomes (except `continue`/`end`).',
    '- `go_back_one_screen` and `back_button` accept optional `fallbackScreenId` (`scr_*` only).',
    '- `request_os_permission` requires `permissionKey` and `outcomes` (`granted`/`denied`/`blocked`).',
    '- `play_media` requires `targetLayerIds` (≥1) pointing at Lottie/video layers on the same screen.',
    '- `advance_carousel` requires `targetLayerId` (exactly one `carousel` layer on the same screen) and takes optional `onLast` (`noop` default, or `complete` to finish the carousel when already on the last slide).',
    '- `back_button` takes **no** `action` (back navigation is built in).',
    '',
    '## OS permission keys',
    '',
    'Valid `permissionKey` values for `request_os_permission`:',
    '',
    bullets(OS_PERMISSION_KEYS),
    '',
    '## Inputs and auth',
    '',
    `- \`text_input\` types: ${list(TEXT_INPUT_TYPES)}.`,
    `- \`text_input\` classification: ${list(FIELD_CLASSIFICATIONS)}.`,
    `- \`oauth_login\` preset providers: ${list(OAUTH_LOGIN_PRESETS)}.`,
    `- \`email_password_auth\` modes: ${list(EMAIL_PASSWORD_AUTH_MODES)} (sign_up requires email + password + confirm fields).`,
    `- \`icon\` families: ${list(ICON_FAMILIES)}.`,
    '',
    '## External surface outcomes',
    '',
    'Builder add-menu kinds share `externalSurfaceNodes`: **Integration Node** (partner providers such as RevenueCat) and **External Surface Node** (`provider: "headless"`). Every node needs a `fallback` jump target.',
    '',
    `**Integration Node / RevenueCat** (\`provider: "revenuecat"\`): ${list(['purchase_completed', 'purchase_cancelled', 'dismissed', 'failed', 'restore_completed'])}.`,
    '',
    `**External Surface Node / Headless** (\`provider: "headless"\`): ${list(['completed', 'back', 'dismissed', 'failed'])}. Host apps register UI via \`externalSurfaces[hostKey]\` (\`config.hostKey\` or node id) with \`onComplete\` / \`onBack\` / \`onDismiss\`.`,
    '',
  ].join('\n');

const CAPABILITIES_RELATIVE_PATH = '../../rheo/rheo-flow-import/references/capabilities.md';

export const capabilitiesOutputPath = (): string =>
  resolve(dirname(fileURLToPath(import.meta.url)), CAPABILITIES_RELATIVE_PATH);

export const writeCapabilitiesFile = async (): Promise<string> => {
  const outPath = capabilitiesOutputPath();
  await writeFile(outPath, `${generateCapabilitiesMarkdown().trimEnd()}\n`);
  return outPath;
};

const isMain = (): boolean => {
  const entry = process.argv[1];
  return entry ? fileURLToPath(import.meta.url) === resolve(entry) : false;
};

if (isMain()) {
  writeCapabilitiesFile()
    .then((outPath) => {
      console.log(`capabilities=${outPath}`);
    })
    .catch((err: unknown) => {
      console.error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
    });
}
