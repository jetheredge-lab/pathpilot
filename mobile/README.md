# RoundsAhead — Mobile (Expo)

React Native app (iOS + Android) for RoundsAhead, built with Expo Router,
NativeWind, and React Query. It authenticates against the live backend at
`https://roundsahead.com/api` using **Bearer tokens** (Phase 8.0) and shares
domain types, logic, and data with the web app via the `../shared` package
(Phase 8.1).

## First run

This project is committed as source; dependencies are not. From this folder:

```bash
npm install
npx expo install --fix   # aligns native package versions to the Expo SDK
npx expo start           # press i (iOS sim), a (Android), or scan in Expo Go
```

> `expo start` builds the JS bundle on demand. The email/password flow and the
> Pathways tab work in **Expo Go**. The **Sign in with Apple** button needs a
> development build (`npx expo run:ios` or an EAS build) because it uses a native
> module — it is a no-op stub in Expo Go.

## What works today (8.2 skeleton)

- **Email / password auth** against the live API — token stored in
  `expo-secure-store`, session restored on cold start, protected-route redirect.
- **Home tab** — shows the signed-in user and entitlement (Pro/free) read from
  the server, so a web purchaser is Pro on mobile automatically.
- **Pathways tab** — renders all career pathways from `@shared` (title, BLS pay,
  job growth, years, source count + verified date).

## Not yet wired (next steps)

- **Native Apple / Google sign-in** → needs a backend token-exchange endpoint
  (`POST /api/auth/{apple,google}/native` that accepts the identity token and
  returns our session token). The buttons are in place; the exchange is the
  follow-up.
- **Student data / planner / colleges screens** → ports of the web views.
- **Payments** (IAP vs. external) → deferred pending the product decision.

## Layout

```
app/
  _layout.tsx        Providers (React Query, Auth) + protected-route redirect
  index.tsx          Splash while the navigator decides auth vs. app
  (auth)/sign-in.tsx Email/password + Apple/Google buttons
  (tabs)/            Home + Pathways
src/
  api.ts             Bearer fetch client → roundsahead.com/api
  auth.tsx           SecureStore token context (signIn/signUp/signOut)
  config.ts          API base URL (override with EXPO_PUBLIC_API_BASE_URL)
  query.ts           React Query client
```

`@shared` (see `../shared`) is resolved by `babel.config.js` (module-resolver),
`tsconfig.json` (paths), and `metro.config.js` (watchFolders) so the bundler can
reach it outside this folder.
