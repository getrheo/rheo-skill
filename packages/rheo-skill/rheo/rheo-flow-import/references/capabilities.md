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
- `oauth_provider`
- `oauth_login`
- `email_password_auth`
- `email_password_field`
- `email_password_submit`
- `carousel`
- `hyperlink`
- `checkbox`

Container layers that **must** include a `children` array (or `slides` for carousel): `stack`, `carousel`,
`button`, `back_button`, `hyperlink`, `single_choice`, `multiple_choice`, `oauth_login`,
`oauth_provider` (custom variant), `email_password_auth`, `email_password_field`, `email_password_submit`.

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

- `go_to_step` requires `screenId`.
- `go_back_one_screen` accepts optional `fallbackScreenId`.
- `request_os_permission` requires `permissionKey` and `outcomes` (`granted`/`denied`/`blocked`).
- `play_media` requires `targetLayerIds` (≥1) pointing at Lottie/video layers on the same screen.
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

- `text_input` types: `plain`, `email`, `phone`, `url`, `multiline`.
- `text_input` classification: `safe`, `sensitive`.
- `oauth_login` preset providers: `github`, `google`, `apple`.
- `email_password_auth` modes: `sign_in`, `sign_up` (sign_up requires email + password + confirm fields).
- `icon` families: `ionicons`.

## External surface outcomes (RevenueCat)

Normalized outcome keys for `externalSurfaceNodes[].outcomes`: `purchase_completed`, `purchase_cancelled`, `dismissed`, `failed`, `restore_completed`.
Every external surface also needs a `fallback` jump target.
