# AGENT.md: Roles, ownership, and orchestration

The Lead Architect (the orchestrating Claude session) owns integration. Specialist roles come from `PROMPT.md` §10. Roles are only used when they produce a real deliverable or an independent review.

## How the initial build was run
Claude Code subagents (the `Agent` tool) were available. Build work was done **sequentially by the lead**, because the pages share one design system and one data contract, and splitting them would have meant several agents editing the same files. **Independent reviews** (Security & Privacy, Final Integration) ran as parallel read-only subagents after integration. Their findings were triaged and fixed by the lead, then tests were re-run.

## Roles and file ownership

| # | Role | Owns / reviews | Deliverable |
|---|---|---|---|
| 1 | Product Architect | `PROMPT.md`, `CLAUDE.md`, `AGENT.md`, site structure, `src/data/*.json` schema | Scope, content contracts, guard against directory drift |
| 2 | Community Content Strategist | Copy in `src/pages/about.astro`, `austin-bhet.astro`, `get-involved.astro`; `docs/COMMUNITY_GUIDELINES.md` | Welcoming copy with no unsupported claims |
| 3 | Events Specialist | `src/data/events.json`, `src/lib/events.mjs`, `src/components/EventCard.astro`, `src/pages/events.astro`, `docs/CONTENT_MAINTENANCE.md` | Correct past/upcoming handling and empty state |
| 4 | UX/UI Engineer | `src/styles/global.css`, `Header`, `Footer`, `HeroArt`, `Icon`, `Logo` | Visual system, responsive layout, accessibility |
| 5 | Web Engineer | `astro.config.mjs`, `src/layouts/`, `src/lib/url.mjs`, `src/pages/index.astro` | Routing, base path, build |
| 6 | QA & DevOps | `tests/`, `scripts/`, `.github/`, `docs/DEPLOYMENT.md` | `npm run check`, CI/CD, verified results |
| 7 | Security & Privacy Reviewer | Read-only over the whole repo and `dist/`; owns `docs/PRIVACY_AND_PUBLICATION.md` | Findings on PII, secrets, scraping, auth, links |
| 8 | Final Integration Reviewer | Read-only over everything | Requirements traceability against `PROMPT.md` §15 |

## Coordination rules
1. Define contracts first: the `events.json` schema, `site.json`, and the `url()` helper.
2. One owner per file at a time. Reviewers are read-only and report findings back to the lead.
3. Every agent reports its assumptions, blockers, and unfinished work.
4. The lead integrates, runs `npm run check`, and records results in `PROJECT_STATUS.md`.
5. Model routing: use the smallest model that can do the job (mechanical → Haiku, scoped review → Sonnet, architecture → Opus). A subagent that needs more capability returns to the lead rather than escalating itself.

## Review checklist (roles 7 & 8)
- [ ] All three historical events are past, with exact dates and URLs, in chronological order
- [ ] No fabricated upcoming event, venue, speaker, sponsor, price, or attendance figure
- [ ] No phone numbers, emails, attendee names, or other private planning content in the repo or `dist/`
- [ ] No forms, login, scraping, trackers, or third-party scripts
- [ ] LinkedIn CTA is prominent and points to the supplied URL
- [ ] Headings, focus, contrast, keyboard navigation, and mobile layout
- [ ] Deployment workflow builds and tests before publishing
