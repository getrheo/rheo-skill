# Rheo Capability Surface

> Generated from `@getrheo/contracts`. Do not hand-edit — run `pnpm --filter @getrheo/rheo-skill gen:capabilities`.

Manifest schema version: 7

Only the kinds, actions, permissions, and variants listed here are valid. Never invent a layer kind, action,
permission key, or variant — the dashboard import runs full Zod validation and rejects anything not below.

## Layer kinds

Every layer `kind` accepted by the manifest:

- `stack`
- `text`
- `image`
- `lottie`
- `video`
- `icon`
- `button`
- `back_button`
- `progress`
- `loader`
- `counter`
- `single_choice`
- `multiple_choice`
- `text_input`
- `scale_input`
- `wheel_picker`
- `date_time_input`
- `number_stepper`
- `number_stepper_button`
- `number_stepper_value`
- `phone_input`
- `address_input`
- `oauth_provider`
- `oauth_login`
- `email_password_auth`
- `email_password_field`
- `email_password_submit`
- `carousel`
- `hyperlink`
- `checkbox`
- `conditional`

Container layers that **must** include a `children` array (or `slides` for carousel): `stack`, `carousel`,
`button`, `back_button`, `hyperlink`, `single_choice`, `multiple_choice`, `oauth_login`,
`oauth_provider` (custom variant), `email_password_auth`, `email_password_field`, `email_password_submit`,
`conditional`.

`conditional` picks which of its child stacks renders: ordered `cases[]` (each with a `DecisionExpr`
and a `rootLayerId`) plus a required `elseRootLayerId`. Every bound id must be a distinct direct child
`stack`. Cases may only read fields answered above the conditional, every case needs at least one rule
before publish, and the one-input limit applies per active path so sibling branches may each own an input.

## Button / back_button variants

Allowed `variant` values (required on `button` and `back_button`): `primary`, `secondary`, `ghost`, `destructive`.

Map source/framework variants: `outline`/`bordered`/`tertiary` -> `secondary` or `ghost`; `text`/`link`/`plain`
-> `ghost`; `default`/`filled`/`solid` -> `primary`; `danger`/`error` -> `destructive`.

## Button actions

Valid `action.kind` values on `button` layers:

- `none`
- `continue`
- `skip`
- `end_flow`
- `go_back_one_screen`
- `go_to_step`
- `request_os_permission`
- `play_media`
- `request_app_review`
- `advance_carousel`

- `FlowGraphNodeJumpTarget` (`scr_*` | `dec_*` | `surf_*`): `go_to_step.screenId`, choice `branching.conditions[].goTo`, loader/lottie/video `onComplete` when mode is `screen`, and `request_os_permission` outcomes (except `continue`/`end`).
- `go_back_one_screen` and `back_button` accept optional `fallbackScreenId` (`scr_*` only).
- `request_os_permission` requires `permissionKey` and `outcomes` (`granted`/`denied`/`blocked`).
- `play_media` requires `targetLayerIds` (≥1) pointing at Lottie/video layers on the same screen.
- `advance_carousel` requires `targetLayerId` (exactly one `carousel` layer on the same screen) and takes optional `onLast` (`noop` default, or `complete` to finish the carousel when already on the last slide).
- `back_button` takes **no** `action` (back navigation is built in).

## OS permission keys

Valid `permissionKey` values for `request_os_permission`:

- `notifications`
- `camera`
- `microphone`
- `photo_library`
- `contacts`
- `calendar`
- `reminders`
- `location_when_in_use`
- `location_always`
- `motion`
- `bluetooth`
- `app_tracking_transparency`
- `speech_recognition`
- `face_id`
- `health_kit`
- `media_library`
- `local_network`
- `nearby_interactions`
- `nfc`
- `full_screen_intent_android`
- `sms_android`
- `phone_android`

## Inputs and auth

- `text_input` types: `plain`, `email`, `phone`, `url`, `number`, `multiline`.
- `text_input` classification: `safe`, `sensitive`.
- `oauth_login` preset providers: `github`, `google`, `apple`.
- `email_password_auth` modes: `sign_in`, `sign_up` (sign_up requires email + password + confirm fields).
- `icon` families: `ionicons`.

## External surface outcomes

Builder add-menu kinds share `externalSurfaceNodes`: **Integration Node** (partner providers such as RevenueCat / Superwall) and **External Surface Node** (`provider: "headless"`). Every node needs a `fallback` jump target.

**Integration Node / RevenueCat** (`provider: "revenuecat"`): `purchase_completed`, `purchase_cancelled`, `dismissed`, `failed`, `restore_completed`.

**Integration Node / Superwall** (`provider: "superwall"`): `purchase_completed`, `purchase_cancelled`, `dismissed`, `failed`, `restore_completed`.

**External Surface Node / Headless** (`provider: "headless"`): `completed`, `back`, `dismissed`, `failed`. Host apps register UI via `externalSurfaces[hostKey]` (`config.hostKey` or node id) with `onComplete` / `onBack` / `onDismiss`.
