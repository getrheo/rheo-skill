# SwiftUI

## Detect

Look for `Package.swift`, `.xcodeproj`, `.xcworkspace`, SwiftUI `App`, `NavigationStack`, onboarding root views, and coordinators.

## Install

Add the SwiftPM product:

```swift
.product(name: "RheoSwiftUI", package: "RheoSwiftUI")
```

Optional products:

```swift
.product(name: "RheoSwiftUIRevenueCat", package: "RheoSwiftUI")
.product(name: "RheoSwiftUIAppsFlyer", package: "RheoSwiftUI")
```

## Minimal Runtime

```swift
import SwiftUI
import RheoSwiftUI

struct OnboardingHost: View {
  var body: some View {
    RheoProvider(
      config: RheoConfig(
        publishableKey: "ob_pk_test_xxx",
        userId: "user_123",
        sessionId: "sess_123"
      )
    ) {
      FlowView(channelId: "ch_test_xxx") { snapshot in
        // Continue host navigation.
      } onFlowAbandoned: { snapshot in
        // Continue or restore host navigation.
      }
    }
  }
}
```

## Notes

- Use `RheoSwiftUIRevenueCat` for RevenueCat external surface presenter helpers.
- Use `RheoSwiftUIAppsFlyer` for AppsFlyer attribution providers.
- Host apps must include Info.plist usage strings for authored permission prompts.
- Host apps must register branding fonts if relying on downloaded font families.
