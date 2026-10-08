# Product model

Rheo is one SDK and one Customer. Analytics, Convert, and Engage are products on that SDK. Install once. Wire only the products the user asked for.

| Product | Host implements | Dashboard owns |
| --- | --- | --- |
| **Analytics** | `RheoProvider` (sessions, page or screen views, `logEvent`), web consent, `setUserId`, `setBillingIdentity` | Visitors, retention, revenue reports |
| **Convert** | `Flow` / `FlowView` on a **channel** public id, terminal callbacks, Integration Nodes and External Surface Nodes | Canvas, experiments, channels, publish |
| **Engage** | `identify` for email and marketing consent. `track` for automation triggers on web and React Native | Email provider, broadcasts, automations, preference center |
| **Customers** | A stable `userId`, plus `identify` when email or consent exists | Profiles, segments, consent |

Customers are the shared record. The same id filters Analytics and targets Engage. Segments are dashboard (or CLI) objects. Do not invent a second user id per product.

## One provider

Mount `RheoProvider` once, high enough that the screens you care about sit under it. Product analytics starts when the provider mounts, including when no flow is on screen. A Convert-only request still gets Analytics unless the user opts out with `analytics={{ enabled: false }}` (web and React Native) or `analyticsEnabled: false` (SwiftUI `RheoConfig`).

Do not add a second product-analytics SDK, a second onboarding SDK, or a Rheo-owned email sender.

## Three event pipes

These are different APIs. Sending a product event does not start an automation.

| Call | Where it goes | Starts Engage automations |
| --- | --- | --- |
| Flow funnel events (`flow_started`, `step_viewed`, …) | `POST /v1/sdk/events` | No |
| `logEvent`, `screen`, automatic `session_start` / `page_view` / `first_visit` / `first_open` | `POST /v1/sdk/analytics/events` | No |
| `track` (web and React Native) | `POST /v1/sdk/track` | Yes |

Use `logEvent` when the event should show up in Analytics. Use `track` only when that event should enroll an Engage automation or match a segment rule. Call both only when the user asked for a report and a journey from the same action.

`unknown` marketing consent does not send. Granted consent is required for live email and webhook delivery; email also needs an address. See [engage.md](engage.md).

## Identity

| Input | Sets | Does not set |
| --- | --- | --- |
| `userId` on provider config | `appUserId` for analytics, experiment bucketing, and identify | Email or consent |
| `setUserId` / `customUserId` | CRM id on later product events | `appUserId` |
| `identify` | Email, marketing consent, optional topic consents on the Customer | A product-analytics event |
| `setBillingIdentity('revenuecat' \| 'superwall', id)` | Billing id used to attach webhook revenue to this person | A purchase by itself |

Email typed into a flow, or stuffed into event properties, is not marketing consent. Call `identify` after the person actually opts in or opts out.

When email is sent, `marketingConsent` is required (`granted`, `denied`, or `unknown`). `granted` requires an email.

Web and React Native `identify` also accept `attributes` (shallow-merged onto the Customer) and an IANA `timezone` for Engage quiet hours. SwiftUI `RheoRuntime.identify` takes email, consent, topic consents, and `customUserId` only.

## Revenue

Dollars come from the provider webhook, not from the device. After the host calls RevenueCat `logIn` / `Purchases.configure` or Superwall `identify`, call `setBillingIdentity` with that same id. Stripe on the web SDK records the charge from `checkout.session.completed` on the app webhook. There is no `setBillingIdentity('stripe', …)`.

One revenue source per store. App Store and Play are RevenueCat or Superwall. Web can be Stripe.

## Platforms this skill installs

| Stack | Package | Analytics | Convert | `identify` | Engage `track` |
| --- | --- | --- | --- | --- | --- |
| React Native + Expo | `@getrheo/react-native-expo` | Yes | Yes | Yes | Yes |
| React Native bare | `@getrheo/react-native-bare` | Yes | Yes | Yes | Yes |
| React web | `@getrheo/react` | Yes, consent required | Yes | Yes | Yes |
| SwiftUI | `RheoSwiftUI` | Yes | Yes | Yes | No |

Install one React Native flavor, never both. The web package is separate and can sit beside a native app. It is not a second flavor of the same binary.

Flutter exposes product analytics and `identify` in `rheo_flutter`. This skill has no Flutter install guide. Engage push and outbound webhooks are not SDK surfaces yet. Engage email sends through the app's own SES, Resend, Postmark, or SendGrid account, configured in the dashboard.
