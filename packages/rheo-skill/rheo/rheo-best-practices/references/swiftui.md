# SwiftUI

## Status: SDK install coming soon

**Do not install** a SwiftUI SDK package for customers today. Public Swift extract / SwiftPM distribution is paused until the native SDK GA checklist is satisfied. Marketing and the Developer Guide treat SwiftUI as **coming soon**.

If the user asks to install Rheo in a SwiftUI app:

1. Say SwiftUI SDK install is **not customer-available** yet.
2. Offer supported install stacks instead: Expo, bare React Native, or React web (see those references).
3. If they have an existing SwiftUI onboarding/paywall to migrate into Convert, route to **rheo-flow-import** (SwiftUI **source → manifest** import is supported; it does not install the SDK).

## Detect

Look for `Package.swift`, `.xcodeproj`, `.xcworkspace`, SwiftUI `App`, `NavigationStack`, onboarding root views, and coordinators — useful for **flow import**, not for SDK install.

## Historical snippet (not for install)

The file [examples/swiftui-install-snippet.md](../examples/swiftui-install-snippet.md) is retained for internal / future GA reference only. **Do not** add `RheoSwiftUI` SwiftPM products or edit the host app to mount `RheoProvider` / `FlowView` until GA docs flip from coming soon.

## Engage notes (when GA lands)

- SwiftUI will not export Engage `track` (same as web). Automation triggers must come from React Native or from events the app already sends that Engage can enroll on.
- Push registration and billing identity helpers are documented in [engage.md](engage.md) / [integrations.md](integrations.md) for when the package is customer-installable.
