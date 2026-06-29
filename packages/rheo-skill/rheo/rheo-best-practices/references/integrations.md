# Integrations

## RevenueCat

Detect source calls such as `Purchases.configure`, `react-native-purchases`, `react-native-purchases-ui`, or existing paywall presentation code.

Manifest mapping:

- Create an external surface with `config.provider: "revenuecat"`.
- Preserve offering or placement identifiers when visible in source.
- Wire known outcomes:
  - `purchase_completed`
  - `restore_completed`
  - `dismissed`
  - `failed`
- Always wire `fallback`.

The host remains responsible for configuring RevenueCat. Rheo does not own purchase SDK secrets or receipt validation.

## AppsFlyer

Detect `react-native-appsflyer` or Swift attribution setup. Do not include AppsFlyer secrets in manifests.

**React Native:** built-in provider when `react-native-appsflyer` is installed (host still initializes the SDK).

**SwiftUI:** `import RheoSwiftUIAppsFlyer` and `FlowView(..., appsFlyerAttribution: .automatic)` when `AppsFlyerLib` is linked; manual `AppsFlyerAttributionProvider { observe in … }` for advanced hosts.

When source branches on acquisition/deep-link data, represent stable attributes through decision nodes and add the relevant keys to `sdkAttributeKeys`.

## Auth

OAuth and email/password UI can be represented in Rheo manifests, but the host owns authentication logic. When implementing, wire `onOAuthLogin` and `onEmailPasswordAuth` callbacks.

## Permissions

Native permission prompts can map to `request_os_permission` button actions. Verify the host app has native permission declarations before relying on those steps.

## In-app review

- Manifest: `action.kind: "request_app_review"` on a button (no extra fields).
- Requires **`screen.next.default`** on that screen.
- Submits inputs like **Continue**; advances only via default next (no branching).
- **React Native (Expo):** required peer `expo-store-review`.
- **React Native (bare):** required peer `react-native-in-app-review`.
- **SwiftUI:** built-in StoreKit; ~1.5s delay when a prompt may have shown (no dismiss callback on iOS).
- Analytics: `app_review_prompt_shown`, `app_review_prompt_dismissed`; capture key `app_review:{layerId}`.
- Do **not** add review buttons unless the user explicitly asks—Apple discourages spamming prompts from raw button taps. Prefer post-milestone screens.

## Links

Use `hyperlink` layers for static external links. Preserve obvious URL destinations; do not add tracking parameters.
