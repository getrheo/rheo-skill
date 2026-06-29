# Implementation Workflow

Use this when the user explicitly asks to install or wire Rheo in a host app.

## Shared Steps

1. Read local conventions, package manager, navigation structure, and current onboarding entry point.
2. Identify stable identity inputs: anonymous user id, backend user id, session id, app version, and locale.
3. Ask for missing Rheo dashboard values or use placeholders:
   - publishable key
   - channel id
   - optional API base URL for non-production/dev
4. Install SDK dependencies using the project package manager.
5. Wrap the flow host in the Rheo provider.
6. Replace or gate the existing onboarding entry with the Rheo runtime component.
7. Preserve old onboarding as a fallback/rollback path unless explicitly told to remove it.
8. Wire terminal callbacks to continue host navigation.
9. Install **`@getrheo/react-native-expo`** or **`@getrheo/react-native-bare`** with all required peers (see platform reference). Wire optional auth, RevenueCat, AppsFlyer (host packages only), and resolve fallback when used.
10. When `request_app_review` is present, tell the user TestFlight/production may not show prompts every tap and builder preview always advances as `not_shown`.
11. Run the narrowest useful verification.

## Safety

- Do not hard-code secrets.
- Do not remove legacy onboarding on the first integration unless requested.
- Keep edits localized to the integration entry point and app config.
- Prefer reversible feature flags or route swaps for production apps.
