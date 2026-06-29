# SwiftUI Install Snippet

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
