# Warrior Revival Website Functional Requirements Document

## 1 Overview

**Purpose.** This document captures the functional requirements for a redesigned website for **Warrior Revival**, a nonprofit that supports service members, veterans and their families.  It synthesizes feedback from the current site, new requirements from stakeholders (Carl and Katie), and inspiration from similar organizations.  The FRD will guide the technical and design teams in building a prototype and ultimately a production-ready site.

**Scope.**  The scope includes the public‑facing website, membership/volunteer sign‑up flows, event submission and approval workflow, content management, integration with existing services (Bloomerang for donations and forms, possible headless CMS), and administrative tools.  E‑commerce features (the “warrior store”) are currently lightly used and are out of scope for phase 1.

**Stakeholders.**  Primary stakeholders include Warrior Revival’s leadership (Katie, Carl), veterans and their families, volunteers, sponsors, and donors.  Secondary stakeholders include administrators/content editors and event organizers who will submit and approve events.

## 2 Background and Inspiration

### 2.1 Current Site and Issues

The existing WordPress site highlights the mission of supporting and empowering service members, veterans and their families through outdoor adventures, mentorship and community【834921992518445†L55-L60】.  It includes calls to action for events, donations, memberships and a store, and features sections such as a leadership team, volunteer profiles, sponsors, a “Get Involved” page, highlights video and a contact page.  However, stakeholders noted several issues:

- **Performance.** Pages can load slowly, making the site feel heavy.
- **Navigation.** Visitors find it hard to locate upcoming events; the header feels crowded and the hierarchy of “events, membership, donate, warrior store” links is unclear.
- **Out‑dated content.** Leadership and volunteer bios need updating; some volunteers no longer assist and new volunteers are missing.  The “Meet and Greet” page features individuals who no longer perform calls, and the “Impact on Veterans” section could be reworked as an evidence‑based summary of the organization’s impact.
- **Maintenance overhead.** Events are manually posted with images and forms, which is time‑consuming.  Staff would like an automated workflow where organizers can submit events, admins can approve them, and the events appear on the calendar.
- **Ambiguous membership flow.** Current membership sign‑up uses Zeffy because Bloomerang asks for payment information up front.  The organization would prefer to consolidate on Bloomerang but avoid requiring payment for membership.
- **Shop usage.** The existing store sees little traffic and may not be a priority.
- **Presentation.** The current design is dark and heavy.  Katie prefers fresher, brighter colour palettes like those used by the National Ability Center (NAC) and Best Defense Foundation sites.  She also noted that the location in the footer should say “Utah” instead of “Sandy.”

### 2.2 Comparable Sites

The team reviewed other veteran‑focused nonprofits for inspiration:

- **Wounded Warrior Project (WWP)** – WWP’s site uses clear navigation with major categories (“Who We Are,” “How We Help,” “Get Involved,” “Ways to Give”)【306372560616345†L96-L115】.  The home page emphasizes empowerment and impact, stating that WWP is “dedicated to the total well‑being of post‑9/11 wounded, ill, or injured veterans and their families” across mental and physical wellness, VA benefits assistance and peer support【306372560616345†L205-L210】.  It prominently invites visitors to donate, fundraise, or share stories【306372560616345†L232-L241】.
- **National Ability Center (NAC)** – NAC offers a lighter colour palette and an inviting tone.  Their mission is to “empower individuals with disabilities through the transformative power of adaptive recreation and adventure”【80156506065710†L71-L86】.  Navigation includes programmes, volunteering, support and events.  The home page quickly summarizes the organization’s purpose and invites participation and volunteering【80156506065710†L71-L86】.
- **Best Defense Foundation (BDF)** – BDF focuses on honouring veterans by providing once‑in‑a‑lifetime experiences.  Their mission states they “provide a once in a lifetime experience for our Veterans, at no cost to them”【666361999036639†L92-L95】 and emphasises connecting generations so sacrifices are never forgotten【666361999036639†L149-L156】.  The site features clear programme categories and highlights upcoming battlefield return trips and transition programmes【666361999036639†L117-L143】.

These examples illustrate effective navigation, clear mission statements and bright, engaging designs.  The Warrior Revival redesign should adopt similar clarity and warmth.

## 3 High‑Level Requirements

1. **Modern, responsive web application.**  The site will be built with **Next.js** (React) for server‑side rendering/static generation, **Tailwind CSS** for utility‑first styling and responsive design, and **TanStack Query** for data fetching.
2. **Headless CMS integration.**  Content (pages, events, bios, sponsors, gallery items) should be managed via a headless CMS (e.g., Strapi).  Editors must be able to update content without developer involvement.  The CMS will expose an API that the Next.js frontend consumes via TanStack Query.
3. **CRM and donation integration.**  Bloomerang remains the system of record for donations and possibly volunteer sign‑ups.  The site will embed Bloomerang’s hosted donation forms and integrate membership/volunteer submission flows via Bloomerang or a custom form backed by the CMS.  Zeffy will be phased out once Bloomerang forms can be used without requiring payment.
4. **Events and activities workflow.**  A submission form allows event organizers or community members to propose activities.  Submitted events enter an approval queue for admins.  After approval, events appear automatically on the events calendar.  This workflow reduces manual posting and ensures quality control.
5. **Improved navigation and information architecture.**  Simplify the header and reorganize pages into intuitive categories: About, Programs/Activities, Events, Get Involved (with subpages for participants and sponsors), Partners, Gallery, Donate, and Contact.  Remove cluttered icons and ensure important content is reachable in one or two clicks.  Update the footer to list the correct location (“Utah”) and contact information.
6. **Fresh, inviting design.**  Use a lighter colour palette inspired by the National Ability Center and other modern nonprofits.  Large imagery and accessible typography should convey optimism and inclusivity.  Maintain strong brand recognition with a coherent colour scheme and logo usage.  The site must meet WCAG 2.1 AA accessibility guidelines.
7. **Mobile‑first and performant.**  The site should load quickly on mobile devices.  Lazy‑load images, prefetch routes and optimize bundle size.  Pages must render in less than 2 seconds on a 3G connection.
8. **Analytics and SEO.**  Integrate analytics (e.g., Google Analytics or Plausible) to track page visits, conversions and form submissions.  Use structured data (Open Graph, Schema.org) for SEO and social sharing.
9. **Security and privacy.**  Protect form submissions with reCAPTCHA, validate inputs and sanitize user content.  Enforce HTTPS.  Comply with applicable privacy laws and ensure donors’ and members’ personal data is secure.

## 4 User Roles and Use Cases

### 4.1 User Roles

| Role | Description |
| --- | --- |
| **Visitor** | Anyone visiting the site.  Can browse pages, view events, donate via Bloomerang, and subscribe to the newsletter. |
| **Member (Veteran/Participant)** | A visitor who submits a membership form.  They may receive targeted communications based on activity preferences.  They do not need a website login. |
| **Volunteer Applicant** | A visitor who submits a volunteer form via Bloomerang.  They may indicate how they wish to help. |
| **Event Organizer / Activity Submitter** | A community member or staff member who submits a proposed event/activity via the submission form.  They do not manage the event after submission. |
| **Sponsor** | A partner organization or business.  Their logo and information may appear on the Partners page. |
| **Admin** | Authorized staff with access to the CMS dashboard.  They can create and edit pages, approve or reject event submissions, manage categories, update bios, manage sponsors and upload gallery images. |
| **Editor** | A non‑technical user with limited permissions in the CMS (e.g., update text and images but cannot publish without admin approval). |

### 4.2 Use Cases

1. **View upcoming events.**  A visitor navigates to the events page, browses upcoming events by date, category or location and clicks an event to see details.  The events list shows the next several events on the home page for quick access.
2. **Submit an event/activity.**  An event organizer fills out the submission form with title, description, categories (e.g., hiking, scuba, skydiving), date/time, location, registration link, contact info and images.  After submission, they receive confirmation.  Administrators review pending submissions and approve or reject them.  Approved events automatically appear on the site.
3. **Register for an event.**  On an event detail page, the visitor clicks the “Register” button.  If registration is handled via Bloomerang, the button opens the appropriate form.  For events requiring forms (e.g., waivers), additional links are provided.
4. **Donate to Warrior Revival.**  A visitor clicks “Donate,” is taken to a dedicated page with messaging about the impact of donations, and uses an embedded Bloomerang donation form to make a one‑time or recurring gift.  The site may feature donation tiers and sponsor matching if supported by Bloomerang.
5. **Sign up as a member/volunteer.**  A visitor fills out a membership or volunteer form specifying contact information, service information (optional), and interests (e.g., side‑by‑side rides, hiking, scuba).  The form submits data to Bloomerang or the CMS.  An admin can export or sync the data to Bloomerang for targeted communications.
6. **Browse about information.**  Visitors view updated biographies of the leadership team and volunteers, read the mission and history and learn about programs.  The page emphasises the organization’s impact rather than generic “impact on veterans” statements.
7. **Browse partners/sponsors.**  Visitors explore a partners page listing sponsors, sorted by tier (e.g., gold, silver) with logos and short descriptions.  Sponsors interested in partnering can fill out a form or contact the organization.
8. **View gallery and highlights.**  Visitors browse a gallery of photos and videos from past events.  They can filter by activity or year.  A highlights section contains annual recap videos (e.g., “2024 Highlights”).
9. **Admin approves event submissions.**  In the CMS, an admin sees a list of pending events.  For each submission, they can review the details, make edits, upload or crop images, and approve or reject.  Approval triggers the event to appear on the site.  Rejected events can receive feedback.
10. **Admin updates content.**  An admin or editor uses the CMS to update page text, reorder sections, add sponsors or volunteers, or upload images.  Changes are reflected on the site without a code deployment.

## 5 Information Architecture and Pages

### 5.1 Header and Navigation

- **Logo & Tagline.**  Include the Warrior Revival logo.  A succinct tagline about empowering veterans through outdoor activities (e.g., “Empowering veterans to thrive through adventure and community” – inspired by WWP’s focus on empowerment【306372560616345†L205-L210】).
- **Navigation Menu.**  Use a minimal set of top‑level links:
  - **Home** – landing page with hero image, mission blurb and quick CTAs (Donate, Join, Upcoming Events).  Show a few upcoming events in a card format.  Include testimonials or quotes.
  - **About** – subpages: *Who We Are* (mission, history, leadership team bios【641133411509168†L59-L64】), *Volunteers* (profiles, sign‑up link), *Facts & Impact* (metrics and testimonials replacing the current “Impact on Veterans”).
  - **Programs/Activities** – describe the range of activities (side‑by‑side rides, hiking, skydiving, scuba, mentorship).  For each activity: description of why it’s beneficial, photos, eligibility requirements and links to upcoming events.  Inspired by NAC’s listing of over 20 programs【80156506065710†L92-L98】.
  - **Events** – calendar/list view with filters for date range, location and category.  Include a button “Submit an Event.”  Each event card links to a detail page with description and registration links.
  - **Get Involved** – split into *For Veterans* (membership sign‑up, ways to participate), *For Volunteers* (volunteer sign‑up and roles), and *For Sponsors* (sponsorship opportunities and benefits).  This division addresses Katie’s suggestion to separate veterans and sponsors.
  - **Partners** – highlight sponsors/partners with tiers similar to the current sponsors page【88111362770371†L317-L333】.
  - **Gallery** – images and videos of past events; optional categories and search.
  - **Donate** – donation page with Bloomerang embed and messaging; highlight recurring giving and donor matching.
  - **Contact** – contact form and organization contact info.  Remove the outdated “Sandy” location and use “Utah.”

- **Call‑to‑Action Buttons.**  Important actions (Donate, Join, Submit Event) should be styled as buttons in the navigation on mobile.
- **Responsive Menu.**  Use a hamburger menu on small screens.  Ensure focus states and ARIA attributes for accessibility.

### 5.2 Home Page

- **Hero Section.**  Large background image or video representing the mission (veterans in outdoor activities).  Overlay with a concise mission statement and primary CTA buttons (Donate, Join, View Events).
- **Upcoming Events.**  A carousel or grid showing the next 3–5 events with date, title, brief description and registration link.  The events list must load from the CMS and show real-time data.
- **Mission and Programs Overview.**  A section summarizing Warrior Revival’s mission (e.g., “support and empower service members, veterans and their families through outdoor adventures, mentorship, and community”【834921992518445†L55-L60】), with links to the Programs page.  Use icons or illustrations to represent categories (hiking, scuba, etc.).
- **Testimonials/Impact Quotes.**  Slider or cards featuring quotes from veterans describing how the organization helped them reintegrate【834921992518445†L219-L249】.  This increases trust and engagement.
- **Newsletter Sign‑Up.**  Provide an email sign‑up form for the newsletter (already on the current site).  Integrate with the CMS or Bloomerang.
- **Partners/Supporters.**  Show a row of sponsor logos with a link to the partners page.

### 5.3 Events Section

- **Event List.**  Display upcoming events in a list or card layout with date, title, short description, categories and tags (e.g., side‑by‑side, hiking).  Provide filters (category, date range, location) and search.
- **Event Detail Page.**  For each event: full description, schedule, location map or description, required forms (e.g., liability waivers via Bloomerang), contact person, registration link, related photos.  Include a “Share” button to post on social media.
- **Event Submission Form.**  A dedicated page for submitting new events.  Fields include: event name, date/time, location (address and county), categories (multi‑select), description, featured image and optional gallery images, registration form URL, required forms/waivers (yes/no), contact info.  Use React Hook Form for client‑side validation.  On submit, the data goes to the CMS as a draft with status “Pending Approval.”
- **Admin Event Workflow.**  In the CMS dashboard, authorized users can view submissions, edit details, upload/crop images, and approve/reject events.  On approval, Strapi sets the event’s status to “Published,” and the Next.js site automatically fetches it via TanStack Query.  Consider sending a notification to the submitter upon approval or rejection.
- **Calendar Integration.**  Optionally display a calendar view (monthly/week) showing events.  Provide iCal/Google Calendar subscription links so visitors can add events to their calendars.

### 5.4 Programs/Activities

Outline each activity category (e.g., side‑by‑side rides, hiking, skydiving, scuba, mentorship).  For each activity: description of why it’s beneficial, photos, eligibility requirements and links to upcoming events.

Provide a “Join an Activity” CTA linking to the membership sign‑up form or the events page filtered by that activity.

### 5.5 Get Involved

- **For Veterans/Participants.**  Explain how to become a member (membership is free).  Provide a sign‑up form collecting name, contact details, service information (optional), and interests/activities they care about (multi‑select).  Clarify that they will receive targeted emails about activities they select.
- **For Volunteers.**  Describe volunteer roles (event support, planning, mentorship, outreach).  Provide a Bloomerang or internal form to sign up as a volunteer.  The form should collect availability, skills, preferences and contact information.
- **For Sponsors.**  Outline sponsorship levels and benefits (e.g., recognition on the partners page, logo on marketing material).  Provide a contact form or sponsorship interest form.  Show a list of current sponsors with logos and tier labels【88111362770371†L317-L333】.

### 5.6 About

- **Mission and Vision.**  Clearly state the mission and vision.  Use accessible fonts and colours to make text stand out.
- **Leadership Team.**  Show updated bios and photos of the board and key staff【641133411509168†L59-L64】.  Remove individuals no longer serving.  Each biography should include the person’s background and their involvement in the organization.
- **Volunteers.**  List current volunteers with photos and short descriptions.  Provide the option to contact or join volunteer groups.  Keep this list up to date; remove volunteers who are no longer active.
- **History & Story.**  Include a narrative of how Warrior Revival started, similar to the existing “How we got started” section【179846651023719†L82-L97】.  Add supporting photos and timeline events.
- **Facts & Impact.**  Replace the generic “Impact on Veterans” section with an evidence‑based summary of program outcomes (e.g., number of veterans served, volunteer hours, number of activities hosted).  Use infographics and short quotes.

### 5.7 Partners

- **Sponsor Listing.**  Display sponsors by tier (Gold, Silver, Bronze) with logos and descriptions, similar to current sponsor cards【88111362770371†L317-L333】.  Provide links to sponsors’ websites.
- **Partner Outreach.**  Describe partnership opportunities and benefits.  Include a form for prospective partners to contact Warrior Revival or download a sponsorship packet.

### 5.8 Gallery and Highlights

- **Photo/Video Gallery.**  A gallery page with filters by event or year.  Use a grid layout with lightbox for viewing.  Support embedding videos (e.g., highlight reels).
- **Annual Highlights.**  Provide highlight videos (e.g., “2024 Highlights”) and stories summarizing the year’s activities.  Remove the year from the page title to avoid date‑specific names, as Katie suggested.

### 5.9 Donate

- **Donation Page.**  Explain how donations make an impact (e.g., “Your donation funds adaptive adventures for veterans”).  Embed Bloomerang’s secure donation form.  Provide options for one‑time or recurring gifts, memorial/honor gifts and employer matching.  Include a call‑out for monthly giving, inspired by WWP’s emphasis on monthly donors【306372560616345†L150-L161】.
- **Tax Documents.**  Clarify that donors will receive tax documentation from Bloomerang.

### 5.10 Contact

- **Contact Information.**  Provide email, phone and mailing address.  Correct the location to “Utah” rather than “Sandy.”
- **Contact Form.**  A simple contact form for general inquiries with spam protection.

### 5.11 Footer

- Consolidate navigation links (About, Programs, Events, Get Involved, Partners, Gallery, Donate, Contact).
- Display the nonprofit’s EIN and statement of tax‑exempt status.
- Include social media icons with links to Facebook, Instagram, YouTube and LinkedIn.
- Provide a brief mission blurb and newsletter sign‑up.

## 6 System Architecture

1. **Frontend:** Next.js with TypeScript.  Use **App Router** for modern Next.js features and React Server Components where appropriate.  Tailwind CSS will provide design consistency and rapid prototyping.  TanStack Query will manage data fetching, caching and synchronization with the backend API.  Use React Hook Form and Zod for form validation.

2. **Backend/CMS:** Strapi (Node.js) hosted on a platform like Render or DigitalOcean.  Strapi models will include `Event`, `ActivityCategory`, `TeamMember`, `Volunteer`, `Sponsor`, `GalleryItem`, `Page`, `Submission` and others.  Strapi will handle authentication, roles and permissions for admins and editors.  The CMS will integrate with an object storage service (AWS S3 or equivalent) for media.

3. **Database:** PostgreSQL managed by the hosting provider (Render, DO or Supabase).  Strapi will store structured data.  Optionally, if the organization prefers Supabase’s free tier, Strapi could connect to a Supabase‑hosted Postgres instance.

4. **Bloomerang Integration:** Use Bloomerang’s hosted forms for donations and volunteer/membership sign‑ups.  For membership sign‑ups where payment is not required, use Bloomerang’s free pledge or custom forms.  For volunteers, embed Bloomerang forms or create a custom form in Next.js that posts data via Bloomerang’s API (ensuring that private keys remain on the server).  Do **not** expose Bloomerang’s private API keys in the frontend, as Bloomerang notes that the REST API uses a private key and is not meant for client‑side forms【666361999036639†L149-L156】.

5. **Event Submission Workflow:** The submission form posts data to an endpoint in the Next.js API route, which forwards it to Strapi as a draft.  Admins authenticate into Strapi to review submissions.  A simple review queue shows pending submissions.  On approval, Strapi sets the event’s status to “published,” and the Next.js site displays it via TanStack Query.

6. **Email and Notifications:** Use a transactional email service (SendGrid or AWS SES) to send confirmation emails for event submissions, volunteer sign‑ups and contact form submissions.  Integrate with Bloomerang’s communications features for donor acknowledgments.

7. **Authentication:** The public site does not require user accounts.  Admin and editor authentication occurs via Strapi’s admin UI.  Future enhancements could include a member portal if Bloomerang adds support.

8. **Deployment:** Host the Next.js frontend on Vercel.  Vercel provides automatic builds, previews and edge network performance.  Use environment variables for API endpoints and keys.  The CMS runs on a separate infrastructure (Render/DO) with automatic backups.

## 7 Non‑Functional Requirements

1. **Performance:**  Pages should load within 2 seconds on a 3G network.  Use server‑side rendering and static generation for pages with infrequently changing content (e.g., About).  Use incremental static regeneration for pages like Events.
2. **Accessibility:**  Conform to WCAG 2.1 AA.  Provide alt text for images, keyboard‑navigable menus, sufficient colour contrast and ARIA labels.  Allow font scaling and high‑contrast modes.
3. **Security:**  Use HTTPS across the site.  Sanitize all inputs and output.  Protect forms with CAPTCHA.  Store secrets (API keys) server‑side.
4. **Maintainability:**  Use TypeScript and modular components.  Document CMS models and API endpoints.  Provide developer guidelines for styling and component architecture.
5. **Scalability:**  The architecture should support increased traffic and content without major changes.  Use caching and CDN for static assets.  Ensure the CMS can handle concurrent users.
6. **Analytics:**  Track visits, conversion rates for donations and sign‑ups, event page views and bounce rates.  Respect user privacy and provide a cookie policy in the footer.
7. **Backup and Recovery:**  Schedule automatic backups of the database and media.  Provide a tested recovery process for the site and CMS.

## 8 Future Enhancements

1. **Member Portal.**  If Bloomerang or another service provides a member login solution, allow members to view and manage their profile, preferences and event registrations.
2. **E‑commerce Integration.**  The warrior store could be re‑implemented using Shopify or Snipcart for easier management and better user experience.  Items could include branded apparel or gear.
3. **CRM Sync.**  Automate syncing of membership and volunteer sign‑up data from the CMS to Bloomerang for advanced segmentation and email campaigns.
4. **Multimedia Stories.**  Add a blog or stories section to highlight veteran success stories, similar to NAC’s “Stories” section【80156506065710†L71-L86】 and BDF’s featured highlights【666361999036639†L117-L143】.
5. **Advanced Search.**  Implement site‑wide search for content, events and stories, possibly leveraging Algolia.
6. **Localization.**  Add language support (e.g., Spanish), taking inspiration from WWP’s provision of Spanish content【306372560616345†L6-L8】.

## 9 Conclusion

This functional requirements document lays out a comprehensive plan for rebuilding the Warrior Revival website as a modern, mobile‑friendly and maintainable platform.  By adopting Next.js, Tailwind CSS and a headless CMS, the organization can streamline content management, automate event workflows, integrate donations and volunteer sign‑ups via Bloomerang and present a refreshed, inviting design inspired by leading nonprofit sites.  The resulting site will better support veterans and their families, volunteers and sponsors while reducing operational overhead and increasing engagement.