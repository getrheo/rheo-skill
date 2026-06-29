---
name: rheo-best-practices
description: Install and wire the Rheo SDK in a host app and follow Rheo implementation best practices. Use when a user asks to install Rheo, add @getrheo/react-native-expo or @getrheo/react-native-bare or RheoSwiftUI, wrap a flow host in RheoProvider, render Flow/FlowView, wire terminal callbacks, configure RevenueCat or AppsFlyer integrations, wire OAuth or email/password auth callbacks, request OS permissions, or add in-app review. Part of the `rheo` skill.
---

# Rheo — Best Practices (SDK implementation)

Use this sub-skill when the user wants Rheo **running in their app**. The goal is a minimal, reversible integration that wraps the flow host, renders the Rheo runtime, and wires the callbacks the host owns — without hard-coding secrets or deleting the existing onboarding on the first pass.

## When to act

Only install packages or edit host code when the user explicitly asks for implementation. If they only ask "how would I add Rheo?", explain using these references and stop.

## Workflow

1. **Detect the host stack** and read the matching reference:
   - React Native + Expo → [references/react-native-expo.md](references/react-native-expo.md)
   - React Native bare (no `expo` dependency) → [references/react-native-bare.md](references/react-native-bare.md)
   - SwiftUI → [references/swiftui.md](references/swiftui.md)
2. Read [references/implement-workflow.md](references/implement-workflow.md) for the shared, stack-agnostic steps (identity inputs, dashboard values, provider wrap, runtime swap, terminal callbacks, verification).
3. When the flow uses paywalls, attribution, auth, permissions, links, or in-app review, read [references/integrations.md](references/integrations.md) before wiring anything.
4. Use the install snippets in [examples/](examples) as a starting point, adapted to the project's package manager and conventions.
5. If something behaves unexpectedly, consult [references/troubleshooting.md](references/troubleshooting.md).

## Hard rules

- **One flavor per app.** Install **either** `@getrheo/react-native-expo` **or** `@getrheo/react-native-bare`, never both. SwiftUI uses the `RheoSwiftUI` SwiftPM products.
- **No secrets in code.** `publishableKey` and `channelId` come from env/config or placeholders the user fills in. Never commit real keys.
- **Production API:** SDK defaults use **`https://api.getrheo.io`** (`RHEO_DEFAULT_SDK_API_BASE_URL`). Omit `apiBaseUrl` / `apiBaseURL` in production unless self-hosting. Never pair **`ob_pk_live_*`** keys with localhost.
- **Pass the channel public id**, not a flow id, to `Flow` / `FlowView`.
- **Preserve the existing onboarding** as a fallback/rollback path (feature flag or route swap) unless the user explicitly asks to remove it.
- **Read local conventions first** (package manager, navigation, env handling) and keep edits localized to the integration entry point and app config.
- **RevenueCat and AppsFlyer are host integrations**, not SDK peers — the host configures and owns those SDKs and their secrets. Wire `fallback` for every external surface.
- **Do not add `request_app_review`** prompts unless the user explicitly asks; Apple discourages prompting from raw button taps.
- Run the **narrowest useful verification** (typecheck or a build of the touched module), not a full app build, unless asked.

## Final response

When you implement, report:

- Files changed.
- SDK surface wired (`RheoProvider` + `Flow`/`useFlow`, or `RheoProvider` + `FlowView`).
- Dashboard values still needing real values (`publishableKey`, `channelId`).
- Integrations/auth callbacks wired (or none).
- Whether the legacy onboarding was preserved as a fallback.
- Verification run, or why it was skipped.
