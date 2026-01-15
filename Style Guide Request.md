# Warrior Revival Style Guide (FRD-Aligned)

This style guide aligns the UI with the Warrior Revival FRD: a modern, bright, and accessible nonprofit site with clear navigation, strong CTAs, and content that centers veterans, families, volunteers, and sponsors. It is written for Tailwind CSS and Next.js.

## Design Principles

- **Fresh and inviting.** Light backgrounds, ample whitespace, and optimistic imagery.
- **Clarity over clutter.** Simple navigation and obvious primary actions (Donate, Join, View Events).
- **Community-first.** Content and visuals emphasize outdoor adventures, mentorship, and belonging.
- **Accessible by default.** WCAG 2.1 AA contrast, clear focus states, readable type sizes.

## Color Palette

Use a bright, outdoors-inspired palette with strong contrast and a warm CTA color. Keep neutrals clean and light.

| Role | Sample Color | Hex Code | Notes |
| :---- | :---- | :---- | :---- |
| **Primary** | Deep Navy | #0B2E4B | Navigation, footer, headings. |
| **Secondary** | Alpine Blue | #2F6F8F | Section accents, cards, links. |
| **Accent** | Warm Ember | #E86F2A | Primary CTAs, highlights. |
| **Light Background** | Mist | #F4F7F8 | Section backgrounds. |
| **Surface** | White | #FFFFFF | Cards, panels. |
| **Border** | Cool Gray | #D7DEE2 | Dividers, input borders. |
| **Text Primary** | Slate | #1E2A32 | Body text. |
| **Text Secondary** | Steel | #51606B | Helper text, metadata. |
| **Success** | Pine | #2F7D5F | Success states. |
| **Warning** | Ochre | #B9792A | Warnings/alerts. |

### Usage Tips

- Keep background sections light and airy; reserve navy for the header/footer and hero overlays.
- Ensure CTA contrast meets WCAG AA, especially the accent button on light backgrounds.
- Use subtle gradient overlays on hero images for legibility (e.g., from Primary/80 to transparent).

## Typography

Choose a confident, humanist pairing that reads well on mobile and feels modern without being corporate.

- **Heading Font:** `Poppins` or `Montserrat` (600-700 weights). Use for headlines, nav, and CTA labels.
- **Body Font:** `Source Sans 3` or `Open Sans` (400-500 weights). Use for paragraphs and UI text.
- **Case & Spacing:** Title case for headings; uppercase for small UI labels and buttons with `tracking-wide`.

### Type Scale (Tailwind)

- `h1`: `text-4xl md:text-5xl font-semibold`
- `h2`: `text-3xl md:text-4xl font-semibold`
- `h3`: `text-2xl font-semibold`
- `body`: `text-base md:text-lg leading-relaxed`
- `small`: `text-sm text-textSecondary`

## Layout & Structure

The FRD calls for a clean, scannable layout that highlights Events, Programs, and Get Involved.

### Header & Navigation

- Logo on left, primary links in the center/right.
- Top-level links: Home, About, Programs, Events, Get Involved, Partners, Gallery, Donate, Contact.
- Prominent CTA buttons in nav on desktop; on mobile, show Donate and Join within the menu.
- Use a compact sticky header with clear focus states.

### Hero

- Full-width image or video with a dark gradient overlay for legibility.
- Headline, short mission statement, and two primary buttons: Donate and View Events.
- Optional third button: Join (membership/volunteer).

### Section Rhythm

- Alternate light backgrounds and white surfaces.
- Use `py-16 md:py-24` for section spacing.
- Constrain content to `max-w-7xl` with `px-4 md:px-8`.

## Components

### Buttons

Base style:
- `inline-flex items-center justify-center font-heading uppercase tracking-wide rounded-md shadow-sm transition`
- Primary: `bg-accent text-white hover:bg-accent/90`
- Secondary: `bg-primary text-white hover:bg-primary/90`
- Outline: `border border-primary text-primary hover:bg-primary/10`

### Cards

- `bg-surface rounded-lg shadow-md overflow-hidden border border-border`
- Use top-aligned imagery with `object-cover` and a consistent ratio.
- Titles in heading font, metadata in secondary text color.

### Forms

- Labels above inputs.
- `border border-border rounded-md px-3 py-2` with clear focus states.
- Button uses accent color.
- Support multi-column layouts on `md` breakpoint.

### Event List

- Use a card grid or list with date, title, category tags, and a registration link.
- Provide filters for category, date range, and location.

## Imagery & Media

- Use bright, candid photos of veterans and families in outdoor settings.
- Avoid dark, heavy overlays; keep edits warm and natural.
- Use subtle background textures sparingly (light topo or grain at low opacity).

## Accessibility

- Maintain AA contrast for text and interactive elements.
- Provide focus outlines (`focus:ring-2 focus:ring-accent`).
- Use semantic HTML and descriptive alt text.

## Tailwind Configuration (Example)

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: '#0B2E4B',
        secondary: '#2F6F8F',
        accent: '#E86F2A',
        light: '#F4F7F8',
        surface: '#FFFFFF',
        border: '#D7DEE2',
        textPrimary: '#1E2A32',
        textSecondary: '#51606B',
        success: '#2F7D5F',
        warning: '#B9792A',
      },
      fontFamily: {
        heading: ['Poppins', 'Montserrat', 'sans-serif'],
        sans: ['Source Sans 3', 'Open Sans', 'sans-serif'],
      },
    },
  },
};
```

## Content Tone

- Optimistic, grounded, and community-centered.
- Emphasize empowerment, adventure, and impact with concrete outcomes.
- Keep copy concise and action-oriented.

## Page-Specific Notes (FRD)

- **Home:** hero + upcoming events + mission + testimonials + newsletter + partners.
- **Events:** list/grid with filters + submit-event CTA; detail pages with registration links.
- **Programs:** activity categories with benefits, requirements, and upcoming events.
- **Get Involved:** separate pathways for veterans, volunteers, and sponsors.
- **About:** mission, leadership, volunteers, and evidence-based impact.
- **Donate:** Bloomerang embed with recurring giving emphasis.
- **Contact:** simple form + correct location (Utah).
