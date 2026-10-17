# CLAUDE.md: Austin Professional Network Community

Persistent instructions for Claude Code in this repository. The full brief is in `PROMPT.md`, and agent roles are in `AGENT.md`.

## What this is
A static Astro site published to GitHub Pages for a **professional networking community** (Austin Bhet gatherings + the Amhi Austinkar LinkedIn group). It is not a business directory.

## Hard rules
- No business directory, scraping, profile harvesting, or bulk contact collection, ever.
- Do not invent events, dates, venues, speakers, sponsors, prices, registration links, testimonials, attendance counts, or contact details. Unknown fields stay empty.
- The three historical events (2024-12-05 `https://lu.ma/mbnkg3oy`, 2025-03-06 `https://lu.ma/hnxoim47`, 2025-08-08 `https://lu.ma/bk3pmhy5`) are **past** events. Their dates and URLs must not change.
- The primary CTA links to `https://www.linkedin.com/groups/14014249`.
- Initial release: no login, backend, database, paid service, or form that pretends to submit.
- Never publish private planning material. The organizers' planning doc contains personal phone numbers, emails, attendee lists, and feedback. **None of it goes into this repo or the site.** Speaker names, attendance figures, and venue addresses need organizer approval and the individuals' consent first (see `docs/PRIVACY_AND_PUBLICATION.md`).
- Do not claim to have read a document you could not access. Do not claim a deployment succeeded without verifying it.

## Commands
- `npm run dev`: local dev server
- `npm run check`: validates `src/data/events.json`, builds, and runs `tests/site.test.mjs`. **Run before every commit.**
- `BASE_PATH=/x SITE_URL=https://y npm run build`: build for a different base path or domain

## Layout
- `src/data/events.json`, `src/data/site.json`: editable content
- `src/lib/events.mjs`: status logic (date-based; `cancelled`/`postponed` override) and validation
- `src/lib/url.mjs`: `url()` helper. **Always** use it for internal links so the base path works.
- `src/pages/`, `src/components/`, `src/layouts/Base.astro`, `src/styles/global.css`
- `src/lib/seo.mjs` + `src/pages/{sitemap.xml,robots.txt,llms.txt}.js`: crawler and agent files, plus JSON-LD builders. Event JSON-LD must never add performers, offers, or sponsors unless they are confirmed
- `tests/site.test.mjs`: build-output checks (links, events, privacy, accessibility, contrast)

## Conventions
- Color tokens live on `:root` with a dark override. Any new text/background pair must be added to the contrast test.
- Keep headings sequential and use exactly one `h1` per page. The tests enforce both.
- External links need `rel="noopener"`, and any new external domain must be added to `ALLOWED_EXTERNAL` in the tests on purpose.
- Update `PROJECT_STATUS.md` after meaningful work.
