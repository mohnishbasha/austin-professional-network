# Contributing

Thanks for helping the Austin Professional Network Community. Volunteers, organizers, and developers are all welcome.

## Ways to contribute without code
- **Organize, present, mentor, or sponsor:** join the [Amhi Austinkar LinkedIn Group](https://www.linkedin.com/groups/14014249) and message a group admin.
- **Suggest a topic or improvement:** open a GitHub issue, or raise it in the LinkedIn group.
- **Plan an event:** start with [docs/AUSTIN_BHET_EVENT_PLAYBOOK.md](docs/AUSTIN_BHET_EVENT_PLAYBOOK.md).

## Developer workflow
1. Use Node ≥ 22.22, then run `npm install`.
2. Create a branch: `git checkout -b your-change`.
3. Make your change. Content usually lives in `src/data/` (see [docs/CONTENT_MAINTENANCE.md](docs/CONTENT_MAINTENANCE.md)).
4. Run `npm run check`. It must pass.
5. Open a pull request that explains what changed and, for content, **where the information came from**.

## Ground rules for content
- **Only publish confirmed information.** If you aren't sure about a date, venue, speaker, or sponsor, leave it out.
- **Get consent before naming people**, whether speakers, volunteers, or sponsors. Never add phone numbers, personal emails, attendee lists, or photos of identifiable people without permission.
- **No fabricated social proof:** no invented testimonials, logos, or attendance numbers.
- **Stay in scope.** This is a networking community, not a business directory. PRs that add directories, scraping, member databases, or login will not be accepted.
- Never commit secrets, `.env` files, or exports of private planning docs and spreadsheets.

## Code conventions
- Build internal links with `url()` from `src/lib/url.mjs` so the GitHub Pages base path keeps working.
- Use color tokens from `src/styles/global.css`, and add any new text/background pair to the contrast test.
- Keep one `h1` per page and sequential headings. Give links descriptive labels.
- Keep dependencies minimal and justify any new one in the PR.

## Reviews
Every PR runs the same `npm run check` in GitHub Actions. Content PRs need review from an organizer, and changes to privacy or publication rules need review from a maintainer.
