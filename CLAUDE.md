# RoundsAhead

Pre-health pathway planning for high school students.
Buyer is the parent; counselors are the distribution channel.

## Repo location
Local working copy: `~/dev/roundsahead` (moved off `~/Desktop/College Prep` —
React Native's iOS build scripts break on paths containing spaces). The mobile
app requires Node 20 LTS; see the `roundsahead-mobile-dev` memory for the full
local-build setup.

## Planning docs — read before major work
- docs/roundsahead-launch-plan.md — phased build plan
- docs/roundsahead-marketing-plan.md — positioning, messaging, distribution

## Current phase
Phase 8 — mobile port (Expo). Auth (Phase 2), storage (Phase 3), and the
web features through Phase 6 are done. Mobile app builds and runs on iOS with
sign-in, Profile, Colleges (net price), and Awards; native OAuth token-exchange
is in place. Work-in-progress lives on branch `feat/phase8-mobile-port` (PR #1).

## Non-negotiables
- Every pathway fact needs sourceUrl + lastVerified
- No SAI estimator, no aid recommendations, no essay generation
- Address the parent on buying surfaces, the student in-app.
