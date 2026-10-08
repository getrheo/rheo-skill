# React web

## Detect

A browser app: `react` and `react-dom`, often Vite, Next.js, or Remix. No `react-native` dependency.

## Install

```bash
pnpm add @getrheo/react
```

Peers: `react` and `react-dom` ≥ 18.

## Minimal runtime

Analytics-only (no flow). Consent stays pending until the site grants it. See [analytics.md](analytics.md).

```tsx
import { RheoProvider } from '@getrheo/react';

export const App = () => (
  <RheoProvider
    config={{
      publishableKey: import.meta.env.VITE_RHEO_PUBLISHABLE_KEY,
      analytics: { consent: 'pending' },
    }}
  >
    {children}
  </RheoProvider>
);
```

Convert: same provider, plus `Flow` and a channel public id. Add the site origin (scheme, host, and port) under **App settings → SDK**. A browser request from an origin the app did not list is rejected.

```tsx
import { Flow, RheoProvider } from '@getrheo/react';

export const App = () => (
  <RheoProvider
    config={{
      publishableKey: import.meta.env.VITE_RHEO_PUBLISHABLE_KEY,
      analytics: { consent: 'pending' },
    }}
  >
    <Flow channelId="ch_…" />
  </RheoProvider>
);
```

**Production:** omit `apiBaseUrl` unless self-hosting. Default API is `https://api.getrheo.io`. Never pair `ob_pk_live_*` with localhost.

The snippet uses Vite's `import.meta.env`. Next.js should read `NEXT_PUBLIC_…` (or the project's existing public env) instead.

## Payments

Stripe is the web paywall. Turn **Stripe** on under **App settings → Integrations**, add a Stripe Integration Node whose Payment Link is on `buy.stripe.com` or another `https://*.stripe.com` host, and paste Rheo's webhook URL and signing secret into Stripe. No Stripe adapter on `RheoProvider`. The return restores the session. The webhook writes the charge. The browser does not send a price.

## Engage

`identify` and `track` export from `@getrheo/react`. Call `identify` after a real marketing opt-in. Use `track` for automation or segment triggers. An email typed into a flow answer is not consent. See [engage.md](engage.md).

`registerPush()` registers Web Push after you save a VAPID key under **App settings → Engage settings**.

## Prefetch

Pass `prefetch="all"` or `prefetch={['ch_…']}` on `RheoProvider`, or call `prefetch` / `prefetchAll` / `useRheoPrefetch` to warm the resolve cache (`localStorage` + `If-None-Match`).

## What the web SDK does not do

| Feature | Web behavior |
| --- | --- |
| RevenueCat / Superwall / headless external surfaces | Surface fails and follows **Fallback** |
| `request_os_permission` other than notifications | Treated as denied |
| `request_app_review` | No-op (`not_shown`) |
| AppsFlyer | Not supported. First-party UTMs are on by default (`attribution.enabled` not `false`) |

First-touch UTMs stay in memory while consent is pending or denied. `setAnalyticsConsent('granted')` writes them.
