# React Native (bare)

## Detect

`package.json` with `react-native` but no `expo` dependency; `android/` and `ios/` native projects.

## Install

```bash
pnpm add @getrheo/react-native-bare \
  react react-native \
  react-native-permissions react-native-gesture-handler react-native-reanimated \
  react-native-linear-gradient react-native-svg lottie-react-native \
  react-native-vector-icons @react-native-async-storage/async-storage \
  react-native-safe-area-context react-native-in-app-review react-native-video
```

**Integrations (host only):** `react-native-appsflyer`, `react-native-purchases`, `react-native-purchases-ui` when needed.

## Minimal Runtime

```tsx
import { Flow, RheoProvider } from '@getrheo/react-native-bare';

export const OnboardingHost = () => (
  <RheoProvider config={{ publishableKey: '…', userId: '…' }}>
    <Flow channelId="ch_…" onFlowCompleted={() => {}} />
  </RheoProvider>
);
```

## Notes

- Do **not** install `@getrheo/react-native-expo` in the same app.
- **Production:** default API is `https://api.getrheo.io`; omit `apiBaseUrl` unless self-hosting.
- Link native modules (permissions, video, reanimated babel plugin) per upstream docs.
