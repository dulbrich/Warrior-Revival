# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Next.js dev server (default `http://localhost:3000`).
- `npm run build` — Production build.
- `npm run start` — Run the production build.
- `npm run lint` — `next lint` (ESLint via `eslint-config-next`).

No test runner is configured in this project.

## Stack

Next.js 14 (App Router) + React 18 + TypeScript (strict) + Tailwind CSS. Path alias `@/*` resolves to `./src/*`. Data fetching is set up around `@tanstack/react-query` (dependency present) and forms around `react-hook-form` + `zod`, though most current pages render static content.

## Architecture

### Routing and the `page.tsx` / `*PageClient.tsx` split
Routes live under `src/app/<route>/`. For routes that need client-side state, the pattern is:
- `page.tsx` — thin server component (often just re-exports metadata and renders the client component).
- `<RouteName>PageClient.tsx` — `"use client"` component containing the actual UI, hooks, and effects.

Always layer pages as: `SiteHeader` → page sections → `SubscribeSection` (newsletter) → `SiteFooter`. The header, footer, and subscribe components are in `src/components/`.

### Navigation is centralized
The top nav is driven by a single array in `src/components/siteNavigation.ts`. Adding or renaming a route requires editing that file — do not hardcode links in `SiteHeader`/`SiteFooter`.

### Data layer: Supabase for events, static TS for everything else
Events are the canonical Supabase-backed resource. The legacy `src/data/events.ts` was migrated to a Supabase `events` table (see `supabase/migrations/0001_events.sql`) and is now used only by the one-off `npm run seed:events` script — runtime code does not import it.

- Server-side queries live in `src/lib/events/queries.ts` (`fetchApprovedEvents`, `fetchUpcomingEvents`).
- The render-shape (`EventForDisplay`) and row-to-display mapper (`eventRowToDisplay`) are in `src/lib/events/types.ts`.
- Date/time labels are computed via `src/lib/events/format.ts` from the structured DB columns (`event_date` / `start_time` / `end_time` / `timezone`) — labels are not stored.
- Event images are a controlled vocabulary (`image_key` column) mapped to `/public/events/*` assets via `src/lib/events/imageKeys.ts`. Add a new event type by dropping the asset + extending `IMAGE_KEYS`.
- Deep-links from the homepage strip use the row's UUID (`?event=<uuid>`), not the legacy `name+date` slug.

Other page content (about bios, etc.) is still exported as TypeScript constants from `src/data/*.ts`. Only events have moved.

### Auth + admin UI
Admin UI lives under `/admin`, gated by Supabase Auth (magic-link, no passwords). The middleware (`src/middleware.ts` → `src/lib/supabase/middleware.ts`) refreshes the session on every request and bounces unauthenticated visitors from `/admin` to `/admin/login`. The `ADMIN_EMAILS` env var is the email allowlist — magic-link auth itself will succeed for any email, but only allowlisted ones can reach `/admin`.

- `src/lib/supabase/{server,client}.ts` — typed clients for Server Components / Route Handlers vs. Client Components. Both wire cookies via `@supabase/ssr`.
- `src/app/admin/login/` — magic-link form (client) wrapped in Suspense (server entry).
- `src/app/admin/auth/callback/route.ts` — exchanges the OTP code for a session.
- `src/app/admin/logout/route.ts` — POST endpoint that signs out + redirects.
- `src/app/admin/(dashboard)/` — route group containing all authed pages. Its `layout.tsx` enforces auth one more time as defense in depth.

RLS in Supabase: anon role sees only `status = 'approved'` events; authenticated role sees everything and can mutate. The service-role key is only used by `scripts/seed-events.ts` to bypass RLS during the one-off seed.

### Design system (Tailwind theme is the contract)
Custom semantic colors and font families are defined in `tailwind.config.ts` and loaded as CSS variables in `src/app/layout.tsx`. **Use the semantic token names, not raw hex or Tailwind defaults:**

- Colors: `primary` (navy), `secondary` (alpine blue), `accent` (warm ember / CTAs), `light` (page bg), `surface` (cards), `border`, `textPrimary`, `textSecondary`, `success`, `warning`.
- Fonts: `font-heading` (Poppins), `font-sans` (Source Sans 3, body default), `font-accent` (Bebas Neue, eyebrow/uppercase labels), `font-blackOps` (Black Ops One, hero H1 only).
- Shadows: `shadow-card`, `shadow-soft`.

CTA hierarchy is fixed by `Style Guide Request.md`: accent = primary CTA (Donate), primary = secondary CTA, outlined-primary = tertiary. Buttons are `uppercase tracking-wide` with `focus-visible:ring-2 focus-visible:ring-accent`.

### Animations
Hand-written CSS animations (hero crossfade, marquee, typewriter quote, testimonial carousel) live in `src/app/globals.css` — not in Tailwind config. The testimonial section uses different keyframes for mobile (`testimonial-mobile-*`) vs. `lg:` (`testimonial-lg-*`), which has been a source of bugs (see recent commits on the `build` branch). Respect `prefers-reduced-motion`.

## Source of truth for product intent

- `warror-revival-frd.md` — Functional Requirements Document. The canonical description of pages, user roles, IA, and integrations (Bloomerang for donations, planned Strapi CMS, planned event-submission/approval workflow). Read this before adding or restructuring pages.
- `Style Guide Request.md` — FRD-aligned visual style guide. Read this before adding new UI components or changing visual treatments.
