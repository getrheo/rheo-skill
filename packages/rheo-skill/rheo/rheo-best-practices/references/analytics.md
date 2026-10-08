# Analytics

Product analytics records what people do in the app or site. It starts when `RheoProvider` mounts, including when no Convert flow is showing. Read [product-model.md](product-model.md) before adding calls. Flow funnel events stay on the flow pipe. Engage `track` stays on the Engage pipe.

## Turn it on

Mount the provider with a publishable key and a stable `userId`. That is enough for sessions.

| SDK | Opt out |
| --- | --- |
| Web (`@getrheo/react`) | `analytics={{ enabled: false }}` |
| Expo and bare React Native | `analytics={{ enabled: false }}` |
| SwiftUI | `analyticsEnabled: false` on `RheoConfig` |

Do not opt out unless the user asked to disable Analytics.

## Consent (web)

On `@getrheo/react`, an omitted `analytics.consent` is `pending`. Rheo writes no anonymous id, session, or first-touch attribution, and it sends no product events, until the host grants consent. Rheo does not ship a banner. The site decides.

| `analytics.consent` | Behavior |
| --- | --- |
| omitted or `pending` | Leave storage untouched. Send nothing until grant. |
| `granted` | Collect immediately. Use this when a consent tool already stored a grant before paint, so the first page view is kept. |
| `denied` | Same pause as pending, and delete any analytics id, session, and first-touch values already stored. |

```tsx
import { RheoProvider, setAnalyticsConsent } from '@getrheo/react';

export const App = () => (
  <RheoProvider config={{ publishableKey, analytics: { consent: 'pending' } }}>
    {children}
  </RheoProvider>
);

const onAccept = () => setAnalyticsConsent('granted');
const onReject = () => setAnalyticsConsent('denied');
```

`setAnalyticsConsent('granted')` starts collection. `setAnalyticsConsent('denied')` stops it and clears storage. Events recorded before a grant are dropped. App SDKs do not use this consent gate.

A flow can still resolve while consent is pending. It uses an in-memory id and writes `rheo_app_user_id` only after consent is granted.

## Automatic events

- `session_start` when there is no session, or the last product event was more than 30 minutes ago.
- `first_visit` on web, or `first_open` on app SDKs, once per persisted anonymous `appUserId`.
- `page_view` on web for the first load and later `pushState`, `replaceState`, and `popstate`. The page name is the path.

App navigators differ, so screen views are explicit.

## Calls

`logEvent(name, properties?)` records a custom event. Name at most 120 characters. Properties at most 32KB. `setUserId(id)` sets `customUserId` on later product events. The anonymous `appUserId` stays the device id.

`screen(name)` records `screen_view`. On React Native, `bindNavigationState(state)` reads the focused route from a React Navigation `onStateChange` and calls `screen`.

### Web

```tsx
import { logEvent, setUserId } from '@getrheo/react';

setUserId('user_123');
logEvent('workout_logged', { minutes: 30 });
```

### React Native

```tsx
import { bindNavigationState, logEvent, screen, setUserId } from '@getrheo/react-native-expo';

setUserId('user_123');
logEvent('workout_logged', { minutes: 30 });
screen('Home');
```

Bare React Native exports the same functions from `@getrheo/react-native-bare`.

### SwiftUI

```swift
RheoAnalytics.setUserId("user_123")
RheoAnalytics.logEvent(name: "workout_logged", properties: ["minutes": .number(30)])
RheoAnalytics.screen("Home")
```

## Revenue on the same person

After the host identifies RevenueCat or Superwall, register that id so webhook charges join this Customer:

```tsx
import { setBillingIdentity } from '@getrheo/react-native-expo';

setBillingIdentity('revenuecat', originalAppUserId);
setBillingIdentity('superwall', superwallUserId);
```

SwiftUI: `RheoAnalytics.setBillingIdentity(provider:externalId:)`. Web: `setBillingIdentity` from `@getrheo/react` for RevenueCat and Superwall only. Stripe revenue is the webhook. See [integrations.md](integrations.md).

## What you should not do

- Do not call `logEvent` to start an Engage automation. Use `track` on React Native. See [engage.md](engage.md).
- Do not pass a flow id where a channel id belongs. Analytics does not need a channel.
- Do not hard-code live publishable keys. Placeholders or env only.
