# React Native / Expo Install Snippet

```bash
pnpm add @getrheo/react-native-expo
```

```tsx
import { Flow, RheoProvider } from '@getrheo/react-native-expo';

export const OnboardingHost = () => (
  <RheoProvider
    config={{
      publishableKey: process.env.EXPO_PUBLIC_RHEO_PUBLISHABLE_KEY!,
      // apiBaseUrl defaults to https://api.getrheo.io — omit in production
      userId: 'stable-user-id',
      sessionId: `sess_${Date.now()}`,
      appVersion: '1.0.0',
    }}
  >
    <Flow channelId={process.env.EXPO_PUBLIC_RHEO_ONBOARDING_CHANNEL_ID!} />
  </RheoProvider>
);
```
