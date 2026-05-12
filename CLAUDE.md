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

### Static "CMS-like" content lives in `src/data/`
Page content that will eventually come from a headless CMS (events, about bios, etc.) is currently exported as TypeScript constants from `src/data/*.ts` (see `events.ts`, `about.ts`). When changing event data, use the `EventItem` type and the `buildEventId(event)` helper for stable IDs — `src/app/page.tsx` and `src/app/events/` both rely on it to deep-link from the home page to a specific event via `?event=<id>`.

A Strapi instance exists at `https://warrior-revival-strapi-app.onrender.com/` (per `notes.txt`) and is the planned source of truth, but no API integration is wired up yet — treat `src/data/` as authoritative for now.

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
