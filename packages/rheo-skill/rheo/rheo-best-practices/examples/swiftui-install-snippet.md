# SwiftUI Install Snippet (coming soon — do not use for customer installs)

Public SwiftUI SDK install is **paused**. Do not add these products to a customer app until Developer Guide / marketing flip from “coming soon”. Prefer Expo, bare React Native, or React web install paths. For migrating an existing SwiftUI flow into Convert, use **rheo-flow-import** instead.

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
      FlowView(channelId: "ch_test_xxx")
    }
  }
}
```
