# Austin Professional Network Community

**Real People. Meaningful Connections. Stronger Careers.**

The public website for the Austin Professional Network Community and its in-person **Austin Bhet** gatherings: a professional networking community for job seekers, working professionals, students, career changers, and mentors in the Greater Austin area.

It is a static site with no backend, database, login, forms, or tracking, hosted on GitHub Pages. The main community call to action is the [Amhi Austinkar LinkedIn Group](https://www.linkedin.com/groups/14014249).

> This is a professional networking community, **not** a business directory.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home: who it's for, what happens at a Bhet, recent events, involvement, sponsors, FAQ |
| `/about/` | Purpose, why networking matters, value of in-person gatherings, how to participate |
| `/austin-bhet/` | Proposed meetup format, activities, sample program, possible topics |
| `/events/` | Upcoming events (empty state when none is confirmed), past events, interest CTA |
| `/get-involved/` | Ways to contribute and how sponsorship is handled |

## Search and agent readiness
Each item is generated at build time from `src/data/` and `src/lib/seo.mjs`, so it stays in sync with the pages:
- `/sitemap.xml`: every public page; the 404 page is excluded.
- `/robots.txt`: allows all crawlers and points to the sitemap. It only takes effect on a custom domain (see `docs/DEPLOYMENT.md`).
- `/llms.txt`: a plain-text summary of the site and events for AI agents.
- JSON-LD (schema.org): an `Organization` and a `WebSite` node on every page, plus one `Event` per event on `/events/`, using only confirmed fields.
- Open Graph and Twitter card tags, with a 1200×630 `og-image.png` link preview.

## Stack

- [Astro](https://astro.build) 7, static output (`dist/`): real HTML per route, so there's no SPA 404 workaround on GitHub Pages.
- Plain CSS with design tokens (`src/styles/global.css`), light and dark themes, and system fonts. No external requests.
- One small inline script for the mobile menu. Without JavaScript the menu just stays expanded.
- Tests use Node's built-in `node:test` and need no extra dependencies.

## Develop

Requires Node ≥ 22.22 (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321/austin-professional-network/
npm run build      # outputs dist/
npm run preview    # serve the built site
npm run check      # validate events.json → build → run all tests
```

Or use the Makefile: `make help`, `make dev`, `make check`, `make preview`, `make clean`.

## Update content

| What | Where |
|---|---|
| Events (add, update, cancel, postpone) | `src/data/events.json` |
| LinkedIn URL, tagline, contact email, interest form | `src/data/site.json` |
| Page copy | `src/pages/*.astro` |
| Colors, typography | `src/styles/global.css` (tokens at the top) |

Full instructions are in [docs/CONTENT_MAINTENANCE.md](docs/CONTENT_MAINTENANCE.md). **Never guess event details.** Leave unknown fields empty.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which runs `npm run check` and then publishes `dist/` to GitHub Pages. It also rebuilds weekly, so events move from upcoming to past without any manual step. Setup steps are in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Project docs

- [PROJECT_STATUS.md](PROJECT_STATUS.md): progress, test results, blockers
- [CLAUDE.md](CLAUDE.md), [PROMPT.md](PROMPT.md), [AGENT.md](AGENT.md): agent instructions
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [docs/COMMUNITY_GUIDELINES.md](docs/COMMUNITY_GUIDELINES.md)
- [docs/AUSTIN_BHET_EVENT_PLAYBOOK.md](docs/AUSTIN_BHET_EVENT_PLAYBOOK.md)
- [docs/PRIVACY_AND_PUBLICATION.md](docs/PRIVACY_AND_PUBLICATION.md)
