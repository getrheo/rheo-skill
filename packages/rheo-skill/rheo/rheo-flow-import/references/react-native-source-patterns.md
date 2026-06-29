# Reading React Native / Expo flows

How to trace an existing onboarding/paywall/setup flow in a React Native or Expo
codebase and map each source construct to a Rheo manifest concept. Run
`node scripts/audit-import.mjs --entry <entry>` first — this guide explains how
to interpret and extend its findings.

## Find the entry point

| Signal | Where |
|--------|-------|
| Expo Router | `app/onboarding.tsx`, `app/(onboarding)/_layout.tsx`, `app/(auth)/...` route groups |
| React Navigation | `createNativeStackNavigator`, `<Stack.Navigator>`, an `OnboardingStack`/`OnboardingNavigator` |
| Manual gate | A root component branching on `hasOnboarded` / `firstLaunch` from storage |
| Names | `Onboarding*`, `Welcome*`, `Paywall*`, `Intro*`, `Setup*`, `Step*` screens/components |

Ask the user to confirm the entry file if it is not obvious; do not guess.

## Map step order and navigation → screens + edges

- Each navigator screen or routed page → one Rheo **screen** (`scr_*`).
- `navigation.navigate('Next')`, `router.push('/next')`, `setStep(step + 1)`,
  index into a `steps[]` array, or a `<Pager>` page change → a `next.default`
  edge to the next screen.
- A "Continue"/"Next" button that advances → a `button` with `action: "continue"`.
- "Skip" → `action: "skip"`; finishing/closing the flow → `action: "end_flow"`.
- Conditional navigation (`if (plan === 'pro') navigate('X')`, A/B flags, platform
  checks, stored answers) → a **decision node**, with the keys added to
  `sdkAttributeKeys` when they are `sdk.*` attributes.

## Map UI primitives → layers

| React Native source | Rheo layer |
|---------------------|------------|
| `<Text>`, `<Heading>`, typography components | `text` (copy in `text.default`, color in `style.color`) |
| `<Image source={require(...)}>`, `<ImageBackground>`, `expo-image` | `image` with `media.mediaAssetId` (bundle the asset) |
| `lottie-react-native` `<LottieView>` | `lottie` |
| `react-native-video` / `expo-video` | `video` |
| `<Pressable>`/`<TouchableOpacity>` acting as CTA | `button` (label = nested `text` child) |
| Header back chevron / close (`<HeaderBackButton>`, a back `Pressable` in a top bar) | `back_button` in `regions.header`, `icon.family: "ionicons"`, no `action` |
| `<View style={{ flexDirection, alignItems, gap }}>` | `stack` (`direction`, `align`, `justify`, `gap`) |
| Vector icons (`react-native-vector-icons`, `@expo/vector-icons` Ionicons) | `icon` (`family: "ionicons"`) |
| External `Linking.openURL(...)` / `<A href>` | `hyperlink` |
| Progress bar / step dots tied to step index | `progress` (header) |

Hero images that render through wrapper components (`<Illustration>`, `<Logo>`,
`<Mascot>`, `<Avatar>`) are easy to miss — follow the component to its `require`.

## Inputs and choices

- Selectable option grids/lists (mapped `options.map(...)` with a `selected`
  state and a `selected ? styleA : styleB` ternary) → `single_choice` /
  `multiple_choice`. Each option becomes an option `stack`; map the unselected
  branch to `style` and the selected branch to `selectedStyle`.
- `<TextInput>` collecting a value → `text_input` with a snake_case `fieldKey`;
  mark password/email/PII as `classification: "sensitive"`.
- Sliders / rating rows → `scale_input`. Consent toggles → `checkbox`.
- Screens with a manual-submit input need a `continue` button.

## Theme, colors, gradients, fonts

- Style tokens live in NativeWind/Tailwind config, `theme.ts`, design-token
  files, `StyleSheet.create`, or shared `Button`/`Text`/`Screen` primitives. Map
  primary/background/foreground/accent into `manifest.theme`.
- `expo-linear-gradient` / `react-native-linear-gradient` →
  `screen.containerStyle.backgroundFill.color` as a `linear-gradient(...)` CSS
  string. NativeWind classes like `bg-red-600 text-white` → solid screen fill +
  `#FFFFFF` text color.
- `expo-font` `useFonts(...)` / `Font.loadAsync(...)` / Tailwind `fontFamily` →
  custom fonts. Copy the `.ttf`/`.otf` files and emit `rheo-import.fonts.json`;
  set `manifest.theme.fontFamily` ([font-import.md](font-import.md)).

## Carousels / pagers

`react-native-pager-view`, a `FlatList horizontal pagingEnabled`, a
`ScrollView horizontal` snap pager, `Animated` `translateX` paging, or an
`infoSteps`/`currentStep` index → `kind: "carousel"` with one slide per page.
Carousels are swipe-only; do not turn the pager's own next button into a footer
button ([carousel-import.md](carousel-import.md)).

## Integrations and native steps

- `react-native-purchases` / `react-native-purchases-ui` / `Purchases.configure`
  / a `<Paywall>` → a RevenueCat **external surface** (`provider: "revenuecat"`,
  required `fallback`). See [integrations](../../rheo-best-practices/references/integrations.md).
- `react-native-appsflyer` → represent stable attribution branches via decision
  nodes; add keys to `sdkAttributeKeys`. Never include AppsFlyer/RevenueCat secrets.
- OAuth / email-password screens → `oauth_login` / `email_password_auth` (host
  owns the actual auth logic).
- `react-native-permissions` prompts → a `request_os_permission` button action.
- Signature pads, camera capture, custom WebViews → confirm with the user whether
  to keep native (host-owned) or approximate; flag unmappable behavior in chat.

## i18n

`i18next`/`react-i18next` (`t('key')`), `react-intl` (`formatMessage`), Lingui, or
locale JSON under `locales/` → resolve each key against the **default-locale**
JSON and put the resolved string in `text.default` (never the raw key). Set
`manifest.defaultLocale` ([localization-import.md](localization-import.md)).
