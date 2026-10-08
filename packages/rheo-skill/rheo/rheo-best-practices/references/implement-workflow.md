# Implementation Workflow

Use this when the user explicitly asks to install or wire Rheo in a host app. Read [product-model.md](product-model.md) first and wire only the products they named.

## Shared steps

1. Read local conventions, package manager, navigation structure, and the current entry point for the product you are adding (onboarding route, app root, or site layout).
2. Identify stable identity inputs: anonymous or auth user id, backend user id, session id, app version, and locale. One `userId` is the Customer. Do not mint a separate id for Analytics, Convert, and Engage.
3. Ask for missing Rheo dashboard values or use placeholders:
   - publishable key
   - channel id, only when Convert is in scope
   - web origin, only when the stack is React web
   - optional API base URL for non-production
4. Install the one SDK package for this stack, with required peers. See the stack reference.
5. Mount `RheoProvider` once around the subtree that should be measured. That starts Analytics.
6. Then branch:
   - **Analytics only:** stop after the provider, consent (web), `screen` / `logEvent`, and `setUserId` if a CRM id exists. See [analytics.md](analytics.md).
   - **Convert:** gate the existing onboarding entry with `Flow` / `FlowView`. Preserve the old onboarding as a fallback unless the user asked to remove it. Wire terminal callbacks to continue host navigation. Pass the channel public id.
   - **Engage:** after a real email and consent choice, call `identify`. On web or React Native, call `track` for automation triggers. See [engage.md](engage.md).
   - **Revenue:** if the host already configures RevenueCat or Superwall, call `setBillingIdentity` with that provider's user id. See [integrations.md](integrations.md).
7. Wire optional auth, permissions, and in-app review only when the manifest or the user asks for them.
8. When `request_app_review` is present, tell the user TestFlight/production may not show prompts every tap and builder preview always advances as `not_shown`.
9. Run the narrowest useful verification.

## Safety

- Do not hard-code secrets.
- Do not remove legacy onboarding on the first Convert integration unless requested.
- Do not mount `Flow` for an Analytics-only or Engage-only request.
- Do not call `logEvent` where `track` belongs, or the reverse.
- Keep edits localized to the integration entry point and app config.
- Prefer reversible feature flags or route swaps for production apps.
