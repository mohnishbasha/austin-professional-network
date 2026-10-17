# Privacy and Publication

What may be published on the public site, what must stay private, and how to get consent.

## Principles
1. **The site collects nothing.** It has no forms, login, cookies, analytics, trackers, or third-party scripts or fonts. Visitors make no requests to any third party until they click an external link.
2. **Public by default means public forever.** GitHub Pages output is public even for private repos, and it may be cached or archived.
3. **Confirmed, approved, consented.** Information is published only if it is confirmed, organizers approve publishing it, and any named individual has consented.

## Information classes

| Class | Examples | Allowed on site / in repo? |
|---|---|---|
| Public community info | Community purpose, LinkedIn group URL, event dates, Luma URLs | ✅ Yes |
| Aggregate or topic-level event summaries | "Talks covered AI, cybersecurity, networking" | ✅ Yes, once confirmed by organizers |
| Named speakers, volunteers, sponsors | Names, employers, logos | ⚠️ Only with each person's or organization's permission |
| Attendance figures, venue addresses, photos | "~N attendees", street addresses, event photos | ⚠️ Only with organizer approval (and photo-subject consent) |
| Personal contact info | Phone numbers, personal emails | ❌ Never |
| Attendee lists and registration data | Names, RSVPs, job-search status, phone numbers | ❌ Never |
| Feedback responses | Survey answers, ratings, attendee emails | ❌ Never verbatim or attributed. Anonymized lessons only |
| Finances | Who paid what, reimbursements | ❌ Never |
| Private planning docs and sheets | Google Docs, Sheets, WhatsApp exports | ❌ Never copy into the repo |

## How the reference documents were handled (initial build)
- The **planning Google Doc** was readable through its public text export. It contains personal phone numbers, emails, attendee and speaker lists with job-search status, feedback responses with emails, and expense details. **None of this was copied into the repository or the site.** The only things used were:
  - topic-level descriptions for the December 2024 and March 2025 events;
  - general concepts (format ideas, the event policies on photos, consent, and respect, and anonymized lessons learned) for the docs.
- Speaker names, approximate attendance, venue addresses, and the restaurant and volunteers thanked in the recaps were **withheld** pending organizer approval and consent.
- The **Google Sheet** (task list) returned *401 Unauthorized* and was not accessed.
- **Luma pages** were only checked to confirm the links resolve (HTTP 200). No content was extracted from them.
- The **LinkedIn group** is only linked. It was not scraped, and no members were listed or collected.

## Consent checklist before naming someone
- [ ] The person agreed, in writing (a message is fine), to be named on the public site.
- [ ] They approved the exact wording, including their title or employer.
- [ ] For photos, everyone identifiable agreed.
- [ ] Record the consent source in the event's `source` field (e.g. "Speaker names approved by organizers on 2026-02-01").

## Interest forms (not enabled)
The site has no form, by design. If organizers want one later:
- Use a service with a clear privacy policy (e.g. Google Forms, Tally, or Formspree). This may add cost or a third-party dependency.
- Collect the minimum: name, preferred contact, and how they'd like to help.
- State on the form who sees the data, what it's used for, and when it's deleted.
- Test a real submission end to end **before** linking it. Then set `contact.interestFormUrl` in `src/data/site.json`, and add the form's domain to `ALLOWED_EXTERNAL` in the tests.
- Never build a form that only looks like it submits.

## Takedown requests
If someone asks to be removed, remove the content promptly, redeploy, and confirm with them.
