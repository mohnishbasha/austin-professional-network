# Content Maintenance

How to update the site without touching components. After any change, run `npm run check` and open a pull request.

## Golden rule
**Only publish confirmed information.** If a detail isn't confirmed (date, venue, speaker, sponsor, price, or link), leave the field empty. The site is built to render well with empty fields.

## Events: `src/data/events.json`

### Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | ✓ | Unique slug, e.g. `austin-bhet-2026-03` |
| `title` | string | ✓ | e.g. `Austin Bhet — March 2026` |
| `date` | `YYYY-MM-DD` | ✓ | Event date in Austin local time |
| `status` | `""` \| `"cancelled"` \| `"postponed"` | | Leave empty. **Past vs upcoming is computed from the date.** |
| `description` | string | | Confirmed summary only |
| `registrationUrl` | https URL | | Luma or other registration page |
| `location` | string | | Only once the venue is confirmed **and** may be shared publicly |
| `agenda` | string[] | | Confirmed program items |
| `speakers` | string[] | | Names **with each person's consent** |
| `sponsors` | string[] | | Names **with the sponsor's permission** |
| `recapUrl` | https URL | | Public recap, if any |
| `image` | URL or `/path` | | Supplied or licensed image only. Put files in `public/`, and don't use stock photos as "attendees" |
| `source` | string | ✓ | Where the information came from |
| `lastUpdated` | `YYYY-MM-DD` | ✓ | When this record was last edited |

`npm run validate:data` checks the format: required fields, date format, allowed statuses, https URLs, and unique ids.

### Add a confirmed upcoming event
1. Confirm the date, registration link, and anything else you plan to publish with the organizers.
2. Append a record, for example:
   ```json
   {
     "id": "austin-bhet-2026-03",
     "title": "Austin Bhet — March 2026",
     "date": "2026-03-12",
     "status": "",
     "description": "",
     "registrationUrl": "https://lu.ma/your-event",
     "location": "", "agenda": [], "speakers": [], "sponsors": [],
     "recapUrl": "", "image": "",
     "source": "Confirmed by organizers on 2026-02-01",
     "lastUpdated": "2026-02-01"
   }
   ```
3. Add the new registration domain or URL to `ALLOWED_EXTERNAL` in `tests/site.test.mjs`. The test deliberately fails on unknown external links.
4. Update the `HISTORICAL` list and the event-count assertion in the tests if you are adding a new past event.
5. Run `npm run check`, then commit.

The event appears under **Upcoming** on the Events and Home pages, and the empty state disappears.

### After an event happens
Nothing is required. The weekly scheduled rebuild moves it to **Past** automatically. To update it right away, re-run the workflow (Actions → *Build, check, and deploy* → *Run workflow*). You may add an approved `description` or `recapUrl`.

### Cancel or postpone
Set `"status": "cancelled"` or `"postponed"`. The event moves to its own section with a clear badge. Don't delete it unless organizers want it gone.

### Historical events
The three original events are fixed references. **Never change their dates or Luma URLs**:

| Date | URL |
|---|---|
| 2024-12-05 | https://lu.ma/mbnkg3oy |
| 2025-03-06 | https://lu.ma/hnxoim47 |
| 2025-08-08 | https://lu.ma/bk3pmhy5 |

Their descriptions summarize topics from the organizers' recap. Speaker names, attendance figures, and venues were left out on purpose. Add them only with approval and consent (see `docs/PRIVACY_AND_PUBLICATION.md`).

### Search and agent files update themselves
`sitemap.xml`, `llms.txt`, and the Events JSON-LD are generated from `events.json` and `site.json` on every build, so there is nothing to edit by hand. If you add a page, add it to `PAGES` in `src/lib/seo.mjs`. If the branding changes, regenerate `public/og-image.png` at 1200×630.

## Site settings: `src/data/site.json`
- `linkedInGroup.url`: the primary CTA destination, used on every page.
- `tagline`, `description`: used in the hero, footer, and meta tags.
- `contact.email`: **leave empty** until organizers provide an official, verified address. While it is empty, the footer points people to the LinkedIn group. Once set, it's displayed, and the test suite allows that one address.
- `contact.interestFormUrl`: leave empty unless a real, tested form service is configured (see the privacy doc). Once set, a "Share your interest" button appears on Get Involved.

## Page copy
Copy lives in `src/pages/*.astro`. Lists such as audiences, activities, FAQs, and topics are arrays at the top of each file, so you can edit them without touching markup. Keep claims modest: no membership counts, achievements, or guarantees of outcomes.

## External links
- External links must use `https://` and include `rel="noopener"`.
- The test suite allows only the LinkedIn group and the Luma event pages. Add new destinations to `ALLOWED_EXTERNAL` deliberately.
- Every so often, check that the links still resolve (`curl -I <url>`). Old Luma pages may stop accepting registrations. That's expected, and the cards say so.
