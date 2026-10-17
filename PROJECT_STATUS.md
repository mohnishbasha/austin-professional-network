# Project Status

_Last updated: 2026-10-17_

## Summary
The initial release is **live at https://mohnishbasha.github.io/austin-professional-network/**. It is deployed from the public repo https://github.com/mohnishbasha/austin-professional-network through GitHub Actions. Deployment was verified on 2026-10-17: all 5 pages and the CSS return 200, unknown paths return 404, and the live Events page shows all three past events plus the empty upcoming state.

## Phase progress

| Phase | Status | Notes |
|---|---|---|
| 1. Repository inspection | ✅ | The directory held only `Prompt.md` (now `PROMPT.md`), with no git repo or existing framework. Initialized git on `main`. |
| 2. Foundation | ✅ | Astro 7 static site; `events.json` and `site.json` content contracts; `url()` base-path helper; docs |
| 3. Home and community content | ✅ | Home, About, and Get Involved pages; LinkedIn CTA on every page |
| 4. Events | ✅ | Upcoming (empty state), Postponed/Cancelled (shown only when present), and Past sections; date-driven status |
| 5. Austin Bhet | ✅ | Proposed-format page with a "not confirmed" notice; sample program; playbook with configurable-duration agenda |
| 6. Design and accessibility | ✅ | Responsive layout with no horizontal scroll at 375px (measured); light and dark themes; AA contrast tested; keyboard-operable menu |
| 7. Automated testing | ✅ | `npm run check`: 19 tests passing |
| 8. GitHub Pages deployment | ✅ | Pages source: GitHub Actions. The `github-pages` environment branch policy was extended to `main` (it defaulted to `master` only). |
| 9. Final review | ✅ | Independent Security & Privacy and Integration reviews run; findings triaged in the Reviews section |

## Reference documents
The Google Doc and Sheet links were removed from the public `PROMPT.md`, because the Doc is readable by anyone with the link and contains personal contact information.


| Reference | Accessed? | How it was used |
|---|---|---|
| PROMPT.md requirements | ✅ | Source of truth |
| Planning Google Doc (`1-ttT6…Hv48`) | ✅ Read through the public text export | Topic-level summaries for the Dec 2024 and Mar 2025 event cards; meaning of "Bhet" and the group's origins; event policies; anonymized lessons in the playbook. **Personal data (phones, emails, attendee lists, feedback, expenses) was deliberately not copied anywhere.** |
| Historical task Google Sheet (`1RSv…8lE`) | ❌ HTTP 401 (requires sign-in) | Not used. No claims are made about its contents |
| Luma pages (3) | Link check only (HTTP 200 on 2026-10-17) | Linked as historical references. Page content was not extracted |
| LinkedIn group 14014249 | Link only (302 redirect to login, as expected) | Primary CTA. Not scraped |

### Community facts sourced from the planning doc
These statements on the site come from the planning doc, not from invention. The doc is the organizers' own record:
- Austin Bhet began so community members who meet socially could learn about each other's professional lives (venue pitch).
- December 2024 was the first such gathering ("meeting for the first time" in the promo).
- The gatherings are "volunteer led and volunteer supported" (March 2025 recap).
- "Contact the admins of this group" is how people reach organizers (Dec 2024 recap).
- Bhet grew out of the Amhi Austinkar community (venue pitch and LinkedIn promo).

The organizers should confirm this public wording, along with the topic-level event descriptions, before launch.

### Information withheld pending organizer approval
The planning doc's event recaps include speaker names, approximate attendance, venue addresses, and the restaurant and volunteers thanked. These are real, but they involve named individuals and private logistics, so they were **left off the public site**. If organizers approve and the people named consent, they can be added via `src/data/events.json` (`speakers`, `location`, `description`). See `docs/PRIVACY_AND_PUBLICATION.md`.

No confirmed description was available for **August 2025**, so its card shows a neutral "details haven't been added yet" note.

## Test results (local, 2026-10-17)
- `npm run validate:data`: events.json OK (3 events)
- `npm run build`: 6 pages built (`/`, `/about/`, `/austin-bhet/`, `/events/`, `/get-involved/`, `/404.html`)
- `npm test`: **24/24 passed** (19 original tests plus 5 for search and agent readiness). Covers build output, internal links under the base path, the external-link allowlist, nav and current page, hero/CTA text, exact historical dates, URLs, and order, no upcoming fabrication, status logic, validator, empty-field fallbacks, no phone numbers or emails, no testimonial or count claims, no forms or login, no scraping or network code in `src/`, docs not published, a single h1, sequential headings, alt text, link labels, focus styles, reduced motion, and WCAG AA contrast for 17 token pairs in both themes.
- Mutation check: changing an event date to the future and lowering text contrast both made the tests fail as expected.
- Builds also pass with `BASE_PATH=""` (custom domain) and `BASE_PATH=/other-repo`.
- Manual: headless Chrome screenshots at 1366px and 375px, in light and dark; `scrollWidth == 375` on all pages; mobile menu opens and closes (Escape closes it too).
- `actionlint`: workflow passes.

### Not tested in this environment
- Screen-reader testing (VoiceOver/NVDA) and a full automated axe audit. The structural checks above are a partial substitute.
- Real-device testing on iOS/Android.

## Search and agent readiness (added 2026-10-17)
- Added a sitemap, robots.txt, llms.txt, JSON-LD (Organization, WebSite, and one Event per event), Open Graph and Twitter tags, and a 1200×630 preview image.
- Tests cover the sitemap contents, the robots.txt sitemap line, llms.txt (events in order, no contact details), and valid JSON-LD on every page.
- They also check that event JSON-LD matches the confirmed data and adds no performers, offers, sponsors, or end dates.
- **Limitation:** `robots.txt` is ignored on a project site because it isn't at the domain root. Crawling is still allowed by default. A custom domain would make it effective.
- **Manual step:** submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools. This needs the owner's account.

## Blockers / manual steps
1. **Dependabot PRs #1–#4** (action version bumps) are open. Review them and merge once their checks pass.
2. **Official contact email:** none was provided, so `site.json` `contact.email` is empty and the site points to the LinkedIn group admins.
3. **Organizer approval** is needed for any speaker names, attendance figures, venues, or photos from past events.
4. **Task sheet access:** share it or export a sanitized copy if historical task details are wanted for the playbook.

## Next steps
- Add the next event to `events.json` once its date and registration link are confirmed.
- Optionally add a custom domain (see `docs/DEPLOYMENT.md`).

## Reviews (2026-10-17)
**Security & Privacy (independent subagent):** found no private data in the repo or `dist/`. It searched about 95 name tokens from the planning doc, plus phone numbers, emails, addresses, dollar amounts, and feedback text. It found no secrets, scraping, forms, analytics, or third-party scripts. External links are limited to the allowlist, all with `rel="noopener"`. Workflow permissions are least-privilege, with no injection paths. Low-severity notes were fixed: a policy example that matched a real attendance figure was neutralized, and deploys on `main` no longer cancel each other mid-run. Actions are pinned by tag rather than SHA, with Dependabot keeping them current; this was accepted.

**Final Integration (independent subagent):** verified all page requirements, the exact CTA and empty-state wording, all three historical events (dates, URLs, order, past status), the data model, accessibility structure, and Pages compatibility. Findings:
- Missing `PROJECT_STATUS.md`: it had not been written when the review ran. Now present.
- "Unsupported" community-history claims: traced to the planning doc (see above) and kept, flagged for organizer confirmation.
- 404 canonical: changed to `noindex`.
- Playbook rounding note: clarified.
- Homepage order: newest-first, documented in code.
- Default Pages owner `mohnishbasha`: this matches the authenticated GitHub account. CI derives the owner automatically either way.
