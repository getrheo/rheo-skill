---
name: rheo
description: Work with Rheo, a growth platform with one SDK and one Customer across Analytics, Convert, and Engage. Use when a user wants to install or wire the Rheo SDK on Expo, bare React Native, or React web (SwiftUI/Flutter SDK install is coming soon), record product analytics, attribute RevenueCat or Superwall revenue, publish onboarding or paywall flows, wire auth or integrations, identify a customer for lifecycle email, or import an existing mobile flow (React Native or SwiftUI source) into a FlowManifest. Routes to the `rheo-best-practices` and `rheo-flow-import` sub-skills.
compatibility: Requires Node.js 20+. rheo-flow-import scripts are fully self-contained (no install step). Internet access fetches the latest Manifest Agent Profile; a bundled fallback works offline.
metadata:
  rheo-version: "3.0.0"
  manifest-schema-version: "7"
---

# Rheo

Rheo is a growth platform for mobile and web apps. One SDK and one Customer cover three products:

- **Analytics** records sessions, page and screen views, custom events, and revenue from RevenueCat, Superwall, and Stripe.
- **Convert** renders onboarding, paywalls, and experiments from a hosted `FlowManifest`. The host passes a channel id. Rheo decides which flow revision or experiment arm to serve.
- **Engage** sends lifecycle email through the app's own provider. Push and outbound webhooks are not SDK surfaces yet.

The same Customer profile sits behind all three. Start with the product the user asked for. Turning on the next one reuses the provider and the id.

This skill helps an agent do two jobs. Pick the sub-skill that matches the request and read its `SKILL.md` before doing anything else.

## Routing

| The user wants to… | Use sub-skill | Read |
| --- | --- | --- |
| Install the SDK, record product analytics, attribute revenue, render `Flow` / `FlowView`, wire RevenueCat / Superwall / Stripe / AppsFlyer / auth, or call `identify` / `track` for Engage | **rheo-best-practices** | [rheo-best-practices/SKILL.md](rheo-best-practices/SKILL.md) |
| Analyze an existing mobile onboarding, paywall, or setup flow and export it as a compliant Convert `FlowManifest` (or validate/repair a manifest) | **rheo-flow-import** | [rheo-flow-import/SKILL.md](rheo-flow-import/SKILL.md) |

If a request spans both (for example "import my onboarding and wire the SDK"), run **rheo-flow-import** to produce the manifest first, then **rheo-best-practices** to implement the SDK.

## What each sub-skill is

- **rheo-best-practices** is guidance for the host app. It detects the stack, installs one SDK, and wires only the products requested: Analytics on `RheoProvider`, Convert on a channel, Engage via `identify` and `track` (web and React Native). No code is run by the skill itself.
- **rheo-flow-import** is the Convert authoring path: guidance plus self-contained tooling. It reads React Native or SwiftUI source, scaffolds a manifest, and validates publish gates. It does not install the SDK or configure Analytics or Engage.

## Shared rules

- Never put secrets, API keys, tokens, or private backend URLs in a manifest, a snippet, or client code.
- The Rheo manifest contract is the source of truth for Convert. rheo-flow-import ships a generated capability cheat-sheet ([rheo-flow-import/references/capabilities.md](rheo-flow-import/references/capabilities.md)) and a Manifest Agent Profile fetch. Trust those over memory.
- Only install packages or edit a host app's code when the user explicitly asks for implementation. Analysis and manifest generation never modify the host app.
- One React Native flavor per app: `@getrheo/react-native-expo` or `@getrheo/react-native-bare`, never both. Web is `@getrheo/react`. SwiftUI / Flutter **SDK install** is coming soon — do not add those packages for customers yet. SwiftUI **flow import** (source → manifest) remains available via rheo-flow-import.
