# Fix Google sign-in (SSO)

## What's wrong

The auth logs show sign-in attempts failing with `missing OAuth secret` (HTTP 400 on `/authorize`). Two causes:

1. The Google provider is not activated with managed credentials on the backend, so the provider rejects every request.
2. The app calls the raw Supabase OAuth method instead of the Lovable managed auth helper, which is what handles the popup/redirect flow correctly (including inside the editor preview).

## Changes

- Activate Google as a managed sign-in provider on the backend (keep email/password enabled).
- Rewrite `signInWithGoogle` in `src/hooks/use-auth.tsx` to use `lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin })`, handling the `redirected` and `error` results and letting the auth listener hydrate the session.
- Add the same "Continue with Google" button to the signup page so both flows work (login already has one).
- Verify in the preview that clicking the button reaches Google instead of returning a 400.

## Technical notes

- Uses the existing auto-generated `src/integrations/lovable/index.ts` wrapper; that file is not modified.
- `redirect_uri` stays `window.location.origin` (a public route), never a protected dashboard route.
- Existing provider-avatar sync in `use-auth.tsx` continues to work unchanged.
