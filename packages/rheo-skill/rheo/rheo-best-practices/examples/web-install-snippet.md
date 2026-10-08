# React web install snippet

```bash
pnpm add @getrheo/react
```

```tsx
import { Flow, RheoProvider, setAnalyticsConsent } from '@getrheo/react';

export const App = () => (
  <RheoProvider
    config={{
      publishableKey: import.meta.env.VITE_RHEO_PUBLISHABLE_KEY,
      // apiBaseUrl defaults to https://api.getrheo.io — omit in production
      analytics: { consent: 'pending' },
    }}
  >
    <Flow channelId={import.meta.env.VITE_RHEO_CHANNEL_ID} />
  </RheoProvider>
);

const onAccept = () => setAnalyticsConsent('granted');
const onReject = () => setAnalyticsConsent('denied');
```

Drop `Flow` when the task is Analytics only. For Engage, call `identify` after marketing opt-in and `track` for automation triggers.
