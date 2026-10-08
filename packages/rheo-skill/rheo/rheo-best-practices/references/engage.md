# Engage

Engage is lifecycle email for people who already use the product. Rheo writes the message and the audience. The app's own Amazon SES, Resend, Postmark, or SendGrid account sends it. Rheo does not send Engage messages from Rheo-owned infrastructure.

Push notifications and outbound webhooks are not SDK surfaces yet. Do not scaffold them.

Dashboard setup (provider credentials, physical mailing address, webhook URL, topics, frequency cap) stays in **App settings → Engage settings** or `rheo engage` in the CLI. Do not put provider secrets in the app or in a manifest.

## When a person can be emailed

All of these must be true:

1. The Customer has an email address.
2. Global marketing consent is `granted`. `unknown` does not send.
3. If marketing topics mode is on, the message topic is granted too.
4. The address is not suppressed (hard bounce, complaint, or unsubscribe).

Topics mode is off by default.

## `identify`

Call `identify` when the app collects an email and a real consent choice. Flow answer fields and event properties do not grant consent.

If you send `email`, you must send `marketingConsent` (`granted`, `denied`, or `unknown`). `granted` requires an email. Published SDK clients may still send deprecated `emailMarketingConsent`. The API accepts that alias and rejects the request when both fields are set and differ.

### React Native

`identify` and the provider `config` (`publishableKey`, `userId`, optional `apiBaseUrl`) are the two arguments. Expo and bare export it from the flavor package.

```tsx
import { identify } from '@getrheo/react-native-expo';

await identify(
  {
    email: 'user@example.com',
    marketingConsent: 'granted',
    topicConsents: { product_updates: 'granted' },
    attributes: { plan: 'pro' },
    timezone: 'America/Los_Angeles',
  },
  config,
);
```

`attributes` shallow-merge onto the Customer. `timezone` is an IANA zone used for Engage quiet hours. `appUserId` defaults from `config.userId`.

### SwiftUI

```swift
try await runtime.identify(
  email: "user@example.com",
  marketingConsent: .granted,
  topicConsents: ["product_updates": .granted]
)
```

`RheoRuntime.identify` does not take attributes or timezone. Pass `customUserId` when it differs from `appUserId`.

### Web

Same `identify` shape as React Native, exported from `@getrheo/react`. An email collected in a web flow answer is still not Engage consent. Call `identify` after an explicit opt-in (or send `denied` / `unknown` to match the UI).

```tsx
import { identify } from '@getrheo/react';

await identify(
  {
    email: 'user@example.com',
    marketingConsent: 'granted',
    topicConsents: { product_updates: 'granted' },
  },
  config,
);
```

## `track` (web and React Native)

`track` posts to `POST /v1/sdk/track`. It can enroll automations and match segment rules. It does not write product-analytics events and it does not require a flow or a channel.

```tsx
import { track } from '@getrheo/react';
// same export from @getrheo/react-native-expo and @getrheo/react-native-bare

await track({ name: 'trial_started', properties: { plan: 'pro' } }, config);
```

SwiftUI and Flutter do not export this Engage `track`. On those stacks, do not repurpose flow `track` helpers or `logEvent`. Tell the user the automation trigger has to be emitted from web or React Native, or authored in the dashboard from an event the app already sends.

Use `logEvent` when the same action should appear in Analytics and the user did not ask for a journey. Call both only when they asked for both. See [analytics.md](analytics.md).

## What you should not do

- Do not install an email SDK to "add Engage".
- Do not set consent to `granted` because an email field exists. Wait for an explicit opt-in, or send `denied` / `unknown` to match what the UI collected.
- Do not put provider API keys, webhook tokens, or SES secrets in client code.
