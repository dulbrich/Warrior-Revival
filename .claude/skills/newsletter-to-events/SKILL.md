---
name: newsletter-to-events
description: Convert Warrior Revival newsletter prose, flyers, or freeform event announcements into a JSON file that the /admin/events/import mass uploader accepts. Use whenever the user pastes newsletter/email/flyer text and wants importable event JSON, or asks to "turn this into events JSON".
---

# Newsletter → Event Import JSON

Turn freeform text (newsletters, flyers, email blasts) into a JSON file the
**`/admin/events/import`** mass uploader will accept. The importer validates
every entry with `eventFormSchema` (`src/lib/events/schema.ts`) and dedupes on
`(name, event_date)`, so the JSON you produce must match that schema exactly.

## Output format

Produce a **JSON array** of event objects (the importer also accepts
`{ "events": [...] }`, but prefer a bare array). Write it to a `.json` file in
the repo root named after the source, e.g. `summer-newsletter-events.json`.

### Fields

| Field | Required | Rules |
|---|---|---|
| `name` | **yes** | Event title. Non-empty. This + `event_date` is the dedupe key. |
| `event_date` | **yes** | `YYYY-MM-DD`. For a multi-day event use the **first** day. |
| `location` | **yes** | City/venue, e.g. `"Jordanelle State Park"` or `"Moab, UT"`. Non-empty. |
| `start_time` | no | `HH:MM` (24h). e.g. `10:00`. |
| `end_time` | no | `HH:MM` (24h). e.g. `14:00`. |
| `timezone` | no | IANA. Defaults to `America/Denver` — omit unless clearly elsewhere. |
| `description` | no | 1–3 sentences. Fold in details with no dedicated field (what to expect, multi-day range, "site SAND1", "bring your own bike", cost notes). |
| `address` | no | Street address if given. |
| `city` / `state` / `zip` | no | Only if explicitly present. Don't invent. |
| `audience` | no | e.g. `"Veteran + Family"`, `"Service members & veterans"`, `"Civilians welcome"`. |
| `image_key` | no | **Must** be one of `hike`, `coffee`, `lunch`, `book` — see mapping below. **Omit entirely** if none fits (do NOT pass an empty string or any other value — it will fail validation). |
| `register_link` | no | A real URL only. If the text says "click here to register" with no URL, **omit it** — never fabricate. |
| `cost` | no | e.g. `"Free"`, `"$25"`. |
| `host_name` | no | Defaults to the org; usually omit unless a distinct host is named. |
| `contact_name` / `contact_phone` | no | Only if given. |
| `status` | no | Defaults to `pending`. Omit unless the user explicitly says to publish (`approved`) — and note that contributors can't publish regardless. |

Unknown keys are ignored by the schema, but don't add them — keep the JSON clean.

## Date resolution

- Resolve every date to an absolute `YYYY-MM-DD`. Use the current date (in the
  session context) to infer the year when the text gives only a month/day.
- Prefer any explicit year in the document (e.g. "October 2nd **2026**") and
  assume the rest of the newsletter shares that season/year.
- A weekday named alongside a date ("Saturday, June 20") is a sanity check, not
  the source of truth — trust the numeric date.
- **Multi-day** ("August 29–30", "June 11-14"): `event_date` = first day; put
  the full range in `description` ("Aug 29–30, 2 days / 1 night").
- **Past dates**: if a resolved date is before today, flag it in your summary and
  **exclude it by default** unless the user wants historical entries.

## image_key mapping

Only four keys exist. Map by the event's nature, else omit:

- `hike` → hikes, walks, outdoor "hiking" programs.
- `coffee` → coffee hours / social coffee meetups.
- `lunch` → meals, BBQs, food-centered socials (use judgment; omit if unsure).
- `book` → book club.
- Everything else (rafting, golf, networking, biking, generic socials) → **omit**.

## What counts as an importable event

Import an item **only if it has a concrete single calendar date AND a location.**

- **Skip recurring/ongoing programs with no specific date** — monthly coffee
  hours, "hiking season", book club, mountain biking season, standing Signal
  chats. List them in your summary as skipped (no date).
- **Skip items missing a required field.** If a dated item has no location
  ("Save the date: Side by Side ride"), do NOT fabricate one — list it as
  "needs location" and leave it out (or ask the user).
- Volunteer-opportunity dates (the org showing up at a city event) are datable
  but are a judgment call — extract them only if the user wants volunteer ops as
  events; otherwise list them separately and ask.

## Dedupe

Within your output, never emit two objects sharing the same `(name, event_date)`
(case-insensitive name). The importer would skip the duplicate anyway, but keep
the file clean. Existing-in-DB dedupe is the importer's job, not yours.

## Process

1. Read the whole text. List every candidate event with its raw date string.
2. Resolve dates to `YYYY-MM-DD`; drop/flag past and undated items.
3. For each kept event, fill required fields + any optional fields the text
   clearly supports. Map `image_key` or omit. Never fabricate URLs/addresses.
4. Validate mentally against the table: required fields present, date format,
   time format `HH:MM`, `image_key` in the allowed set or absent.
5. Write the JSON array to a `.json` file (pretty-printed, 2-space indent).
6. Report a summary: how many events written, and a bulleted list of every item
   you **skipped or excluded** with the reason (no date, no location, past,
   recurring, volunteer-op pending user decision). Tell the user they can paste
   the file into `/admin/events/import` (or upload it there).

## Validation self-check before writing

- [ ] Top level is a JSON array.
- [ ] Every object has non-empty `name`, `location`, and `event_date` matching `^\d{4}-\d{2}-\d{2}$`.
- [ ] Times match `^\d{2}:\d{2}$` or are absent.
- [ ] `image_key` is one of hike/coffee/lunch/book or the key is absent (no `""`).
- [ ] `register_link` is a real URL or absent.
- [ ] No two objects share `(name, event_date)`.

## Example

Input: "Summer Social — Saturday, June 20, 10:00 AM–2:00 PM, Jordanelle State
Park, Site SAND1. Burgers provided. Family-friendly."

Output object:
```json
{
  "name": "Summer Social",
  "event_date": "2026-06-20",
  "start_time": "10:00",
  "end_time": "14:00",
  "location": "Jordanelle State Park",
  "audience": "Veteran + Family",
  "cost": "Free",
  "description": "Family-friendly day by the lake (site SAND1). Burgers and hot dogs provided, lawn games, swimming, and lakeside fun. Bring your own watercraft if you'd like."
}
```
