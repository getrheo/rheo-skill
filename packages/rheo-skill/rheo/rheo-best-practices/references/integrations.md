# Integrations

In the flow builder, partner paywalls and host UI are **two add-menu nodes** that share the `externalSurfaceNodes` schema:

| Builder node | Manifest `config.provider` | App settings toggle |
| --- | --- | --- |
| **Integration Node** | `revenuecat`, `superwall` (and future partners) | Required |
| **External Surface Node** | `headless` | None (host registry) |

## RevenueCat (Integration Node)

Detect source calls such as `Purchases.configure`, `react-native-purchases`, `react-native-purchases-ui`, or existing paywall presentation code.

Manifest mapping:

- Create an **Integration Node** / external surface with `config.provider: "revenuecat"`.
- Preserve offering or placement identifiers when visible in source.
- Wire known outcomes:
  - `purchase_completed`
  - `restore_completed`
  - `dismissed`
  - `failed`
- Always wire `fallback`.

The host remains responsible for configuring RevenueCat. Rheo does not own purchase SDK secrets or receipt validation.

## Superwall (Integration Node)

Detect source calls such as `Superwall.configure`, `SuperwallProvider`, `expo-superwall`, `@superwall/react-native-superwall`, or `register(placement:)` / `registerPlacement`.

Manifest mapping:

- Create an **Integration Node** with `config.provider: "superwall"`.
- Preserve the placement id from the Superwall dashboard / source.
- Wire the same IAP outcomes as RevenueCat (`purchase_completed`, `restore_completed`, `purchase_cancelled`, `dismissed`, `failed`).
- Always wire `fallback`.

The host remains responsible for configuring Superwall. Rheo registers the placement and maps dismiss / skip / error callbacks to normalized outcomes. Skip / holdout / already-entitled paths map to `dismissed`.

## External Surface Node (headless host UI)

Use when a source screen is owned by the host (custom native UI, third-party screen Rheo does not ship) rather than a Rheo layer tree or a partner paywall.

Manifest mapping:

- Create an **External Surface Node** with `config.provider: "headless"`.
- Keep a stable `surf_*` id for graph routing / analytics. Optionally set `config.hostKey` for the host `externalSurfaces` registry (defaults to the node id).
- Wire outcomes:
  - `completed` ← host `onComplete`
  - `back` ← host `onBack`
  - `dismissed` ← host `onDismiss`
  - `failed` ← missing host component (SDK)
- Always wire `fallback`.

Host wiring (required for success):

```ts
// React Native — key matches Host key (hostKey or surf_* id)
<Flow
  channelId="…"
  externalSurfaces={{
    onboardingQuiz: ({ onComplete, onBack, onDismiss }) => /* host UI */,
  }}
/>
```

SwiftUI / Flutter: pass the same map on `FlowView` as `externalSurfaces` (builders receive `onComplete` / `onBack` / `onDismiss`). Docs: product Developer Guide → Headless external surfaces.

Do **not** use an External Surface Node to wrap RevenueCat or Superwall when you need `iap_purchase` commerce events — use an Integration Node with `provider: "revenuecat"` or `provider: "superwall"`.

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
