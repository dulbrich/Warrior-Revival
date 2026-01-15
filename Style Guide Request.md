# Style Guide for a NAC‑Inspired Website Using Tailwind CSS

This guide outlines how to build a website that evokes the feel of the National Ability Center’s *Stories* page while using Tailwind CSS for rapid development. It covers color choices, typography, layouts, buttons, spacing, and Tailwind configuration. Citations from the NAC site’s HTML/CSS illustrate important details such as fonts and colours[\[1\]](https://nationalabilitycenter.org/stories/#:~:text=.elementor,column.elementor).

## Color Palette

The *Stories* page uses an inviting palette of blues, grays and a warm accent. Elements like breadcrumbs and icons employ light gray and blue–gray tones[\[2\]](https://nationalabilitycenter.org/stories/#:~:text=.elementor,3081), while backgrounds are very pale gray with a subtle topographic pattern[\[1\]](https://nationalabilitycenter.org/stories/#:~:text=.elementor,column.elementor). The donate and call‑to‑action buttons use a bold, warm hue (observed visually as burnt orange). To ensure good contrast and a modern feel, you can adopt a similar yet distinct palette:

| Role | Sample Color | Hex Code | Notes |
| :---- | :---- | :---- | :---- |
| **Primary** | Navy Blue | \#043A5E | Use for headers, footers and navigation backgrounds. It echoes the site’s dark header while remaining distinct. |
| **Secondary** | Deep Teal | \#0A5678 | A complementary shade for panels and backgrounds. |
| **Accent** | Warm Orange | \#EF7D3F | Inspired by the NAC’s call‑to‑action buttons; apply to buttons, links, badges and hover states. |
| **Light Background** | Light Gray | \#F5F5F5 | Matches the pale background sections that overlay a topographic pattern[\[1\]](https://nationalabilitycenter.org/stories/#:~:text=.elementor,column.elementor). |
| **Surface** | Off‑White | \#FFFFFF | For cards and elevated surfaces; note that the NAC uses white in headings and icons[\[1\]](https://nationalabilitycenter.org/stories/#:~:text=.elementor,column.elementor). |
| **Border** | Soft Gray | \#DADADA | Borrowed directly from the NAC’s CSS for borders[\[1\]](https://nationalabilitycenter.org/stories/#:~:text=.elementor,column.elementor). |
| **Text Primary** | Charcoal | \#333333 | Provides high contrast for body copy. |
| **Text Secondary** | Mid Gray | \#5E5E5E | The NAC’s icon and breadcrumb text uses a similar hue[\[3\]](https://nationalabilitycenter.org/stories/#:~:text=wrap%7Balign,3081). |
| **Muted Blue** | Blue‑Gray | \#99A9B5 | Used for subtle links and breadcrumb separators[\[2\]](https://nationalabilitycenter.org/stories/#:~:text=.elementor,3081). |

### Usage Tips

* **Contrast:** Ensure text meets WCAG AA contrast ratios by pairing darker type (\#333333) with light backgrounds and vice versa.

* **Gradients:** Consider a subtle gradient overlay on hero sections that fades from the primary navy into transparent to enhance legibility of white text.

* **Topographic Texture:** The NAC overlays a pale topographic pattern on light backgrounds[\[1\]](https://nationalabilitycenter.org/stories/#:~:text=.elementor,column.elementor). You can replicate this by adding a low‑opacity PNG/SVG as a background-image on sections.

## Typography

The NAC website employs the **Montserrat** typeface for navigation and labels[\[3\]](https://nationalabilitycenter.org/stories/#:~:text=wrap%7Balign,3081). It uses uppercase lettering for menu items and medium font weight (≈500)[\[3\]](https://nationalabilitycenter.org/stories/#:~:text=wrap%7Balign,3081). Body text appears in a clean sans‑serif (similar to **Open Sans** or **Roboto**). To achieve a similar feel:

* **Heading Font – Montserrat:** Use for all headings (h1–h6), navigation links and button labels. Recommended weights: 600–700 for headings and 500 for navigation.

* **Body Font – Inter / Open Sans:** A legible sans‑serif pairs well with Montserrat. Use normal weight (400) and comfortable line height (1.6).

* **Uppercase Labels:** In navigation and buttons, convert text to uppercase and add letter spacing (tracking-wide) for a polished look. The NAC menu items use uppercase with moderate letter spacing[\[3\]](https://nationalabilitycenter.org/stories/#:~:text=wrap%7Balign,3081).

* **Font Sizes:** Tailwind’s default scale works well; adjust as follows:

* h1: text‑4xl to 5xl on desktop with bold weight.

* h2: text‑3xl.

* h3: text‑2xl.

* Body: text‑base (1 rem) to text‑lg (1.125 rem) on large screens for readability.

### Tailwind Configuration Example

To use custom fonts in Tailwind, extend the fontFamily field in tailwind.config.js. For example:

// tailwind.config.js  
module.exports \= {  
  theme: {  
    extend: {  
      fontFamily: {  
        sans: \['Inter', 'Open Sans', 'sans-serif'\],  
        heading: \['Montserrat', 'sans-serif'\],  
      },  
      colors: {  
        primary: '\#043A5E',  
        secondary: '\#0A5678',  
        accent: '\#EF7D3F',  
        light: '\#F5F5F5',  
        surface: '\#FFFFFF',  
        border: '\#DADADA',  
        textPrimary: '\#333333',  
        textSecondary: '\#5E5E5E',  
        mutedBlue: '\#99A9B5',  
      },  
    },  
  },  
};

## Layout & Structure

The NAC *Stories* page is organised into distinct sections: a **hero banner**, an **adaptive nation** introduction, a **grid of stories**, a **blog list**, and **forms**. Each section is separated by generous white space and subtle dividers.

### Hero Banner

The hero section uses a full‑width background with a semi‑transparent dark overlay. The heading is white and large, with a secondary line of descriptive text and a prominent call‑to‑action button. When recreating this:

1. **Container:** Use mx-auto and max-w-7xl to center content and limit its width.

2. **Background Image:** Apply a relative section with bg-cover bg-center to hold a hero image or gradient. Add an absolute before pseudo‑element or a Tailwind utility like bg-gradient-to-b from-primary/80 to-transparent for the dark overlay.

3. **Typography:** Center align the heading and use white text (text-surface) for contrast. Increase tracking-wide and uppercase for the tagline.

4. **Call‑to‑Action Button:** Use the accent colour; add padding (py-3 px-6), a medium to large text-lg font and rounded corners (rounded-md). On hover, darken or lighten the accent colour for feedback.

Example markup:

\<section class="relative bg-\[url('/images/hero.jpg')\] bg-cover bg-center text-surface"\>  
  \<div class="absolute inset-0 bg-primary/80"\>\</div\>  
  \<div class="relative z-10 max-w-4xl mx-auto py-32 px-4 text-center"\>  
    \<h1 class="font-heading text-5xl md:text-6xl font-bold mb-4"\>Adaptive Nation\</h1\>  
    \<p class="max-w-2xl mx-auto text-lg md:text-xl mb-8"\>Each one of us has a unique story that can inspire others to achieve their goals and overcome any obstacle.\</p\>  
    \<a href="\#stories" class="inline-block bg-accent text-surface font-heading uppercase tracking-wide py-3 px-6 rounded-md shadow hover:bg-opacity-90 transition"\>View Stories\</a\>  
  \</div\>  
\</section\>

### Content Grids

After the hero, the page displays cards for **stories** and **blog posts**. Each card includes an image, title, and sometimes a date or description. The NAC styles these cards with light backgrounds and subtle shadows. To emulate this:

* Use a responsive grid: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8.

* Wrap each card in a bg-surface container with rounded-lg and shadow-md for elevation. Add overflow-hidden so images stay within the card.

* Place the image at the top with object-cover and fixed aspect ratio (aspect-w-16 aspect-h-9 or aspect-square).

* Use p-4 or p-6 for internal padding. Titles should be font-heading and text-xl; descriptions can be text-sm with the secondary text colour.

\<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"\>  
  \<article class="bg-surface rounded-lg shadow-md overflow-hidden"\>  
    \<img src="/images/story1.jpg" alt="Story 1" class="h-48 w-full object-cover"\>  
    \<div class="p-6"\>  
      \<h3 class="font-heading text-xl mb-2"\>Emeline Lakrout\</h3\>  
      \<p class="text-textSecondary text-sm"\>An inspiring story of perseverance.\</p\>  
    \</div\>  
  \</article\>  
  \<\!-- Repeat for other stories \--\>  
\</div\>

### Forms

The submit‑your‑story and newsletter forms on the NAC page are simple and clean, with labels above inputs and a bright submit button. Follow these guidelines:

* **Input Fields:** Use full width (w-full), border border-border, and rounded-md. Add py-2 px-3 for comfortable typing.

* **Focus States:** Highlight the active field border using the accent colour (focus:border-accent focus:ring-accent).

* **Buttons:** Use the accent colour with white text, full width or auto width depending on context. Add font-heading uppercase tracking-wide and shadow for emphasis.

* **Spacing:** Provide ample space between form fields (mb-4), and group related fields in columns on larger screens using md:flex md:space-x-4.

## Buttons & Interactive Elements

Buttons on the NAC site stand out through a vivid background and uppercase labels. For a cohesive Tailwind design:

* **Base Button Class:** Create a reusable component class such as .btn using @apply in a CSS file. For instance:

* .btn {  
    @apply inline-block font-heading uppercase tracking-wide py-2 px-5 rounded-md shadow transition;  
  }  
  .btn-primary {@apply bg-primary text-surface hover:bg-primary/90;}  
  .btn-accent {@apply bg-accent text-surface hover:bg-accent/90;}

* **Hover & Active States:** Slightly darken the background (/90 or /80) and move the button up (transform hover:-translate-y-0.5) to signal interactivity.

* **Icons in Buttons:** Place icons to the left of the text and align them vertically using inline-flex items-center.

## Spacing & Sizing

Consistent spacing is key to the NAC’s clean aesthetic. Use Tailwind’s spacing scale (1 to 96) to define margins and paddings. Suggested patterns:

* **Section Padding:** py-16 on small screens and py-24 on larger screens to give sections breathing room.

* **Grid Gaps:** gap-8 between cards for comfortable separation.

* **Max Widths:** Use max-w-7xl or max-w-screen-xl containers to keep content from stretching too wide.

* **Rounded Corners:** Medium radii (rounded-md or rounded-lg) soften card edges.

## Iconography & Patterns

Icons on the NAC site use a muted gray colour[\[3\]](https://nationalabilitycenter.org/stories/#:~:text=wrap%7Balign,3081) and are simple line icons, contributing to a friendly feel. Maintain this by using outline icons (e.g., from [Heroicons](https://heroicons.com)) tinted with text-textSecondary. For decorative backgrounds, incorporate a **topographic pattern** similar to the NAC’s background texture[\[1\]](https://nationalabilitycenter.org/stories/#:~:text=.elementor,column.elementor). This can be set as a repeating SVG or PNG with low opacity.

## Accessibility Considerations

The mission of the National Ability Center emphasises inclusion; your design should do the same:

1. **Contrast:** Ensure that colour combinations meet WCAG AA (or AAA where possible) contrast ratios. For example, the dark primary color (\#043A5E) on a white button text meets contrast guidelines.

2. **Semantic HTML:** Use appropriate elements (\<nav\>, \<main\>, \<section\>, \<button\>) to assist screen readers.

3. **Keyboard Navigation:** Ensure focus states are visible. Use outline-none focus:outline-none focus:ring-2 focus:ring-accent on interactive elements.

4. **Alt Text:** Provide descriptive alt attributes for all images.

## Final Thoughts

By combining a well‑chosen colour palette, clear typography and generous spacing, you can create a Tailwind‑based website that captures the essence of the National Ability Center’s *Stories* page. Feel free to experiment within this framework—swap accent colours or adjust fonts—to suit your brand while maintaining the inclusive and inspiring feel that defines the NAC.

---

[\[1\]](https://nationalabilitycenter.org/stories/#:~:text=.elementor,column.elementor) [\[2\]](https://nationalabilitycenter.org/stories/#:~:text=.elementor,3081) [\[3\]](https://nationalabilitycenter.org/stories/#:~:text=wrap%7Balign,3081) Stories \- NAC \- Adaptive Recreation and Adventure

[https://nationalabilitycenter.org/stories/](https://nationalabilitycenter.org/stories/)