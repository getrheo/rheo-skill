---
name: rheo
description: Work with Rheo, the headless onboarding/paywall flow engine for mobile apps. Use when a user wants to install or wire the Rheo SDK (React Native, Expo, or SwiftUI), follow Rheo SDK best practices, configure integrations (RevenueCat, AppsFlyer), wire auth/permissions/terminal callbacks, OR import/migrate an existing mobile flow into a compliant Rheo FlowManifest and validate it. Routes to the `rheo-best-practices` and `rheo-flow-import` sub-skills.
compatibility: Requires Node.js 20+. rheo-flow-import scripts are fully self-contained (no install step). Internet access fetches the latest Manifest Agent Profile; a bundled fallback works offline.
metadata:
  rheo-version: "2.0.0"
  manifest-schema-version: "7"
---

# Rheo

Rheo is a headless flow engine: a hosted dashboard authors onboarding, paywall, post-purchase, and setup flows as a `FlowManifest`, and the Rheo SDK renders them natively inside a host app. This skill helps an agent do two distinct jobs. Pick the sub-skill that matches the request and read its `SKILL.md` before doing anything else.

## Routing

| The user wants to… | Use sub-skill | Read |
|--------------------|---------------|------|
| Install the Rheo SDK, wire `Flow`/`FlowView`, follow SDK best practices, configure RevenueCat / AppsFlyer / auth / permissions / terminal callbacks, or implement Rheo in an existing app | **rheo-best-practices** | [rheo-best-practices/SKILL.md](rheo-best-practices/SKILL.md) |
| Analyze an existing mobile onboarding/paywall/setup flow and export it as a compliant Rheo `FlowManifest` (or validate/repair a manifest) | **rheo-flow-import** | [rheo-flow-import/SKILL.md](rheo-flow-import/SKILL.md) |

If a request spans both (e.g. "import my onboarding **and** wire the SDK"), run **rheo-flow-import** to produce the manifest first, then **rheo-best-practices** to implement the SDK — they are independent and can be done in sequence.

## What each sub-skill is

- **rheo-best-practices** — pure guidance. How to detect the host stack, install the right flavor package (`@getrheo/react-native-expo`, `@getrheo/react-native-bare`, or `RheoSwiftUI`), wire the provider + runtime component, preserve a rollback path, and connect optional integrations and auth. No code is run.
- **rheo-flow-import** — guidance **plus** self-contained tooling. References for the manifest contract, source-reading patterns for React Native and SwiftUI, worked examples, and `node` scripts (`audit`, `scaffold`, `validate`, `audit-publish`, `normalize`, `summary`, `profile`) that run with no install step — the validation/scaffold engine and the Rheo contracts are bundled into the skill.

## Shared rules

- Never put secrets, API keys, tokens, or private backend URLs in a manifest or a committed snippet.
- The Rheo manifest contract is the source of truth. rheo-flow-import ships a generated capability cheat-sheet ([rheo-flow-import/references/capabilities.md](rheo-flow-import/references/capabilities.md)) and a Manifest Agent Profile fetch; trust those over memory.
- Only install packages or edit a host app's code when the user explicitly asks for implementation. Analysis and manifest generation never modify the host app.
