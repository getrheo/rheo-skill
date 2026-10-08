---
name: rheo-best-practices
description: Install and wire the Rheo SDK for Analytics, Convert, and Engage on Expo, bare React Native, or React web. Use when a user asks to install Rheo, add @getrheo/react-native-expo or @getrheo/react-native-bare or @getrheo/react, mount RheoProvider, record product analytics (logEvent, screen, web consent), render Flow, wire terminal callbacks, configure RevenueCat, Superwall, Stripe, or AppsFlyer, call identify for marketing consent, or call track for Engage automations on web or React Native. Do not install RheoSwiftUI or Flutter — those SDK installs are coming soon. Part of the `rheo` skill.
---

# Rheo — Best Practices (SDK implementation)

Use this sub-skill when the user wants Rheo **running in their app**. Read [references/product-model.md](references/product-model.md) first. Rheo is one SDK and one Customer across Analytics, Convert, and Engage. Wire the products they asked for. Leave the others unwired.

The goal is a minimal, reversible integration: one provider, stable identity, and the calls that product actually uses. Do not hard-code secrets. Do not delete the existing onboarding on the first Convert pass.

## When to act

Only install packages or edit host code when the user explicitly asks for implementation. If they only ask how Rheo would fit, explain using these references and stop.

## Workflow

1. **Read the product model** in [references/product-model.md](references/product-model.md). Confirm which products this request includes. Analytics starts when `RheoProvider` mounts. Convert needs a channel and `Flow` / `FlowView`. Engage needs `identify`, and `track` on web or React Native.
2. **Detect the host stack** and read the matching reference:
   - React Native + Expo → [references/react-native-expo.md](references/react-native-expo.md)
   - React Native bare (no `expo` dependency) → [references/react-native-bare.md](references/react-native-bare.md)
   - React web → [references/react-web.md](references/react-web.md)
   - SwiftUI or Flutter → **stop**. SDK install is coming soon ([references/swiftui.md](references/swiftui.md)). Offer Expo / bare / web, or route SwiftUI **source → manifest** work to rheo-flow-import.
3. Read [references/implement-workflow.md](references/implement-workflow.md) for the shared steps (identity, dashboard values, provider, verification).
4. **Analytics** → [references/analytics.md](references/analytics.md). On web, leave consent `pending` until the site grants it.
5. **Convert** → mount `Flow` / `FlowView` with a channel public id, preserve a rollback path, and when the flow uses paywalls, attribution, auth, permissions, links, or in-app review, read [references/integrations.md](references/integrations.md) before wiring anything.
6. **Engage** → [references/engage.md](references/engage.md). Call `identify` only for a real email and consent choice. Call `track` only for an automation or segment trigger (web or React Native).
7. Use the install snippets in [examples/](examples) as a starting point, adapted to the project's package manager and conventions.
8. If something behaves unexpectedly, consult [references/troubleshooting.md](references/troubleshooting.md).

## Hard rules

- **One flavor per native app.** Install **either** `@getrheo/react-native-expo` **or** `@getrheo/react-native-bare`, never both. Web uses `@getrheo/react`. Do **not** install `RheoSwiftUI` or Flutter packages until GA (coming soon).
- **One provider.** Mount `RheoProvider` once. Product analytics starts there, even when no flow is showing.
- **Three event pipes.** `logEvent` is Analytics. Flow events are automatic. `track` is Engage (web and React Native). Do not use one to fake another.
- **Consent is `identify`.** Email on a flow answer or an event property does not grant marketing consent. `unknown` does not send.
- **No secrets in code.** `publishableKey` and `channelId` come from env/config or placeholders the user fills in. Never commit real keys. Email-provider credentials stay in the dashboard.
- **Production API:** SDK defaults use **`https://api.getrheo.io`**. Omit `apiBaseUrl` / `apiBaseURL` in production unless self-hosting. Never pair **`ob_pk_live_*`** keys with localhost.
- **Pass the channel public id**, not a flow id, to `Flow` / `FlowView`. Analytics and Engage do not need a channel.
- **Preserve the existing onboarding** as a fallback/rollback path (feature flag or route swap) unless the user explicitly asks to remove it.
- **Read local conventions first** (package manager, navigation, env handling) and keep edits localized to the integration entry point and app config.
- **RevenueCat, Superwall, AppsFlyer, and Stripe are host integrations**, not SDK peers. Wire `fallback` for every Integration / External Surface Node. After RevenueCat or Superwall identify, call `setBillingIdentity` with that same id. Stripe dollars come from the webhook.
- **External Surface Nodes** need a host `externalSurfaces` registry keyed by Host key (`config.hostKey` or `surf_*` id; callbacks `onComplete` / `onBack` / `onDismiss`). No App settings toggle. They fail closed on web.
- **Do not add `request_app_review`** prompts unless the user explicitly asks. Apple discourages prompting from raw button taps.
- **Do not scaffold Engage push or outbound webhooks.**
- Run the **narrowest useful verification** (typecheck or a build of the touched module), not a full app build, unless asked.

## Final response

When you implement, report:

- Products wired (Analytics, Convert, Engage) and products left unwired.
- Files changed.
- SDK surface (`RheoProvider`, and `Flow` / `FlowView` only if Convert was requested).
- Dashboard values still needing real values (`publishableKey`, `channelId` if Convert, web origin if web).
- Analytics calls added (`logEvent`, `screen`, web consent) or "provider only".
- Engage calls added (`identify`, `track`) or none.
- Integrations and auth callbacks wired, including `setBillingIdentity` when a billing SDK is present.
- Whether the legacy onboarding was preserved as a fallback.
- Verification run, or why it was skipped.
