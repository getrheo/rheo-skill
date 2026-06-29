# Reading SwiftUI flows

How to trace an existing onboarding/paywall/setup flow in a SwiftUI codebase and
map each source construct to a Rheo manifest concept. Run
`node scripts/audit-import.mjs --entry <entry>` first (point `--entry` at the root
onboarding view or coordinator) — this guide explains how to interpret findings.

## Find the entry point

| Signal | Where |
|--------|-------|
| App root | `@main struct …App: App`, the root `WindowGroup` view that branches on a stored `hasOnboarded` flag (`@AppStorage`, `UserDefaults`) |
| Navigation | `NavigationStack { … }` with a `path` binding, `NavigationLink`, or a coordinator pushing views |
| Step state | A `@State`/`@Published` step index or an `enum OnboardingStep` switched in the body |
| Names | `Onboarding*View`, `Welcome*View`, `Paywall*View`, `Intro*`, `Setup*`, `*Coordinator` |

Ask the user to confirm the entry view/coordinator if it is not obvious.

## Map step order and navigation → screens + edges

- Each pushed view / `enum` case / `TabView` page → one Rheo **screen** (`scr_*`).
- `path.append(...)`, `NavigationLink(value:)`, `step += 1`, `withAnimation { step = .next }`,
  or a `selection` change in a paging `TabView` → a `next.default` edge.
- A primary "Continue"/"Get Started" `Button` that advances → `button` with
  `action: "continue"`; "Skip" → `"skip"`; dismissing/finishing → `"end_flow"`.
- `if`/`switch` on a stored value, entitlement, A/B flag, or `#if os(...)` that
  changes the next view → a **decision node**; add `sdk.*` keys to `sdkAttributeKeys`.

## Map SwiftUI views → layers

| SwiftUI source | Rheo layer |
|----------------|------------|
| `Text(...)`, `Label` text | `text` (copy in `text.default`, color in `style.color`) |
| `Image("asset")`, `AsyncImage`, `Image(uiImage:)` from the asset catalog | `image` with `media.mediaAssetId` (bundle the asset) |
| Lottie via `lottie-ios` (`LottieView`/`AnimationView`) | `lottie` |
| `VideoPlayer` / `AVPlayer` | `video` |
| `Button { … } label: { … }` acting as CTA | `button` (label = nested `text` child) |
| Toolbar back/close (`.toolbar { ToolbarItem(placement: .navigationBarLeading) }`, a chevron `Button`) | `back_button` in `regions.header`, `icon.family: "ionicons"`, no `action` |
| `VStack`/`HStack`/`ZStack` with `spacing`, `alignment` | `stack` (`direction`, `align`, `justify`, `gap`) |
| SF Symbol `Image(systemName:)` | `icon` — **remap to a valid `ionicons` name** (SF Symbols are not allowed on `icon`) |
| `Link(destination:)` / `openURL` | `hyperlink` |
| `ProgressView(value:)` / step dots | `progress` (header) |

Custom view structs (`HeroIllustration`, `LogoView`, `MascotView`) often wrap the
real asset — follow the struct to its `Image("…")` to find the asset name.

## Inputs and choices

- A list/grid of selectable option views with `@State var selected` and a
  `selected == option ? colorA : colorB` modifier → `single_choice` /
  `multiple_choice`. Each option becomes an option `stack`; map the unselected
  modifiers to `style` and the selected modifiers to `selectedStyle`.
- `TextField`/`SecureField` → `text_input` with a snake_case `fieldKey`
  (`SecureField` / email / PII → `classification: "sensitive"`).
- `Slider` / star rating → `scale_input`. `Toggle` consent → `checkbox`.
- Manual-submit input screens need a `continue` button.

## Theme, colors, gradients, fonts

- Style tokens live in `Color` extensions / an asset-catalog color set, `Font`
  extensions, and reusable `ButtonStyle`/`ViewModifier` types. Map primary/
  background/foreground/accent into `manifest.theme`.
- `LinearGradient(gradient:startPoint:endPoint:)` used as a background →
  `screen.containerStyle.backgroundFill.color` as a `linear-gradient(...)` CSS
  string. A solid `.background(Color("Brand"))` → solid screen fill + matching
  text color.
- Custom fonts registered in `Info.plist` (`UIAppFonts`) and used via
  `.font(.custom("Name", size:))` → copy the font files, emit
  `rheo-import.fonts.json`, and set `manifest.theme.fontFamily`
  ([font-import.md](font-import.md)).

## Carousels / pagers

A paging `TabView { … }.tabViewStyle(.page)`, a horizontal `ScrollView` with snap
paging, or an `infoSteps`/`currentStep` index → `kind: "carousel"`, one slide per
page, swipe-only (no in-pager button) ([carousel-import.md](carousel-import.md)).

## Integrations and native steps

- RevenueCat (`Purchases.configure`, `RevenueCatUI` `PaywallView`, `.presentPaywall`)
  → a RevenueCat **external surface** (`provider: "revenuecat"`, required
  `fallback`). See [integrations](../../rheo-best-practices/references/integrations.md).
- AppsFlyer (`AppsFlyerLib`) → represent stable attribution branches via decision
  nodes; add keys to `sdkAttributeKeys`. Never include secrets.
- "Sign in with Apple" (`SignInWithAppleButton`) / OAuth / email-password →
  `oauth_login` / `email_password_auth` (host owns the auth logic).
- Permission prompts (`AVCaptureDevice.requestAccess`, `CLLocationManager`,
  `UNUserNotificationCenter`) → a `request_os_permission` button action; the host
  must declare the matching `Info.plist` usage strings.
- `PencilKit` signature, camera capture, custom `WKWebView` → confirm whether to
  keep native (host-owned) or approximate; flag unmappable behavior in chat.

## Localization

`String(localized:)`, `Text("key")` resolved from `Localizable.strings`/
`.xcstrings`, or `NSLocalizedString` → resolve each key against the
**default-locale** strings file and put the resolved string in `text.default`
(never the raw key). Set `manifest.defaultLocale`
([localization-import.md](localization-import.md)).
