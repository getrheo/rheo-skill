# React Native / Expo

## Detect

Look for `package.json`, `app.json`, `app.config.*`, `expo-router`, `@react-navigation/*`, and existing onboarding route files.

## Install

```bash
pnpm add @getrheo/react-native-expo \
  react react-native \
  react-native-permissions react-native-gesture-handler react-native-reanimated \
  react-native-linear-gradient react-native-svg lottie-react-native \
  react-native-vector-icons @react-native-async-storage/async-storage \
  react-native-safe-area-context expo-store-review expo-video
```

**Integrations (host only, not SDK peers):** `react-native-appsflyer`, `react-native-purchases`, `react-native-purchases-ui`, `expo-superwall` / `@superwall/react-native-superwall` when the flow uses attribution, RevenueCat, or Superwall Integration Nodes. External Surface Nodes use `Flow` / `useFlow` `externalSurfaces` (no extra native peer).

## Minimal Runtime

```tsx
import { Flow, RheoProvider } from '@getrheo/react-native-expo';

export const OnboardingHost = () => (
  <RheoProvider
    config={{
      publishableKey: process.env.EXPO_PUBLIC_RHEO_PUBLISHABLE_KEY!,
      userId: 'stable-user-id',
      sessionId: `sess_${Date.now()}`,
      appVersion: '1.0.0',
    }}
  >
    <Flow
      channelId={process.env.EXPO_PUBLIC_RHEO_ONBOARDING_CHANNEL_ID!}
      onFlowCompleted={() => {}}
      onFlowAbandoned={() => {}}
    />
  </RheoProvider>
);
```

## Notes

- Do **not** install `@getrheo/react-native-bare` in the same app.
- Pass channel public id, not flow id.
- **Production:** default API is `https://api.getrheo.io`; omit `apiBaseUrl` unless self-hosting. Never use localhost with `ob_pk_live_*` keys.
- Built-in OS permissions need `react-native-permissions` native setup (Expo plugin + Info.plist).
- Expo Go cannot run native RevenueCat or Superwall UI; use a dev client.
