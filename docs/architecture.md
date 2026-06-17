# Tripundo Architecture Notes

## Data Access Rule

Tripundo UI code must not call Supabase tables directly. Components and client utilities call `/api/tripundo/...`; route handlers perform Supabase reads/writes on the server.

Current API facade:

- `GET /api/tripundo/bootstrap`
- `GET /api/tripundo/communities`
- `GET /api/tripundo/communities/:id`
- `GET /api/tripundo/communities/:id/messages`
- `GET /api/tripundo/reserved-keywords`
- `POST /api/tripundo/communities`
- `POST /api/tripundo/community-members`
- `POST /api/tripundo/community-messages`
- `GET /api/tripundo/trips`
- `GET /api/tripundo/profiles`
- `GET /api/tripundo/story-templates`
- `POST /api/tripundo/trips`
- `POST /api/tripundo/join-requests`
- `POST /api/tripundo/plan-members`
- `POST /api/tripundo/plan-messages`
- `POST /api/tripundo/story-assets`
- `POST /api/tripundo/presence`
- `POST /api/tripundo/reports`
- `PATCH /api/tripundo/trips/:id`
- `PATCH /api/tripundo/join-requests/:id`
- `PATCH /api/tripundo/trip-plans/:id/start`

When Supabase env vars are missing, the API returns demo data from `lib/tripundo-data.js`. This keeps the app usable during local UI work.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/migrations/001_tripundo_v1.sql`.
3. Add the values from `.env.example` to `.env.local`.
4. Configure Google as the account sign-in provider in Supabase Auth. Add local and production callback URLs, for example `http://localhost:3000/auth/callback` and `https://tripundo.in/auth/callback`.
5. Add email, phone OTP, and LinkedIn OIDC later if needed. LinkedIn should be treated as the professional trust-verification layer, not the primary account login.
6. Configure storage policies for the private buckets after auth roles/admin roles are finalized.

## Authentication Flow

- `/auth` starts Supabase Google OAuth.
- `/auth/callback` exchanges the OAuth code for Supabase session cookies.
- Platform routes under `app/(platform)` require a signed-in user when Supabase env vars are configured.
- If Supabase env vars are empty, local demo mode stays open for UI work.
- New Supabase Auth users are bootstrapped into `public.profiles` by the migration trigger on `auth.users`.

## V1 Product Surfaces

- Landing page: cinematic public product story with animation and 3D globe.
- App shell: top-navbar platform layout.
- Discover: `/discover`, where users first see cinematic trending communities.
- Communities: `/communities` and `/communities/[id]`, with official/user-created groups, community chat, photos, and trip-plan sub-groups.
- Trip plan room: `/trip-plans/[id]`, where anyone can join the planning group, chat, confirm travelers, and start the trip.
- Active trip: `/trips/[id]`, with timeline, checklist, travelers, expenses, and share-card CTA.
- Admin: `/admin`.
- Trip Story Studio: `/story-studio`, Instagram-first generated card workflow.
