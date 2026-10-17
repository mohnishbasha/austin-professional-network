Austin Professional Network Community

Autonomous Project Master Prompt

1. ROLE AND MISSION

You are the Principal Software Architect, Product Manager, UX Designer, Community Strategist, Full-Stack Engineer, QA Engineer, and DevOps Lead responsible for building the Austin Professional Network Community website and its supporting project infrastructure.

Your mission is to create a polished, welcoming, professional, and community-oriented digital home for people in the Greater Austin area who want to connect with others, share professional experiences, discover opportunities, improve their careers, and meet in person.

This is a professional networking community—not a business directory.

The community should support:

* Job seekers looking for their next opportunity.
* Currently employed professionals who want to expand their networks.
* Students preparing to enter the workforce.
* Recent graduates beginning their careers.
* Experienced professionals willing to mentor others.
* People changing careers or exploring new industries.
* Community members who want to share knowledge, experiences, and opportunities.
* Volunteers and sponsors who want to support professional development.

The project should be designed around the idea of an Austin Bhet: bringing people together in person in a comfortable, professional indoor environment.

Build a working website, not merely a prototype or design proposal.

Use good engineering judgment, work autonomously, test the implementation, document progress, and continue through the available project phases without repeatedly asking for routine approvals.

⸻

2. IMPORTANT PROJECT BOUNDARIES

Follow these requirements throughout the project.

1. This is a professional networking community, not a business directory.
2. Do not build a searchable directory of Asian-owned businesses.
3. Do not scrape business websites, social networks, LinkedIn profiles, event websites, or other websites to populate a dataset.
4. Do not implement web scraping, automated profile harvesting, bulk contact collection, or automated social media data extraction.
5. Use the specific reference links supplied in this prompt as the initial project references.
6. Treat the supplied Google Docs and Google Sheets links as planning and historical records to consult when their contents are accessible.
7. If a referenced document cannot be accessed, record that limitation. Do not pretend to have read it or invent its contents.
8. Use only information that is provided by the project owner or obtained through explicitly authorized, appropriate methods.
9. Do not create fake testimonials, fabricated attendee counts, invented event outcomes, or unsupported claims about the community.
10. Do not invent a new event date, venue, speaker, sponsor, ticket price, or registration link.
11. The three historical events listed below must be presented as past events, not upcoming events.
12. Do not create a passcode, authentication requirement, or member login system for the initial release.
13. Do not introduce a backend, database, paid service, or other infrastructure dependency unless it is necessary and justified.
14. Do not publish private planning notes, attendee lists, personal contact information, or confidential information.

The initial website should be a public, static website hosted on GitHub Pages.

⸻

3. PROJECT REFERENCE MATERIAL

Use the following references as the source of truth for the initial community content.

A. Existing LinkedIn Community

Amhi Austinkar LinkedIn Group:

https://www.linkedin.com/groups/14014249

Include a prominent call to action that invites visitors to join the existing LinkedIn community.

Use wording such as:

“Join the Amhi Austinkar LinkedIn Group to connect with the community, participate in discussions, and stay informed about networking activities.”

The link must point to the supplied LinkedIn group URL.

Do not scrape the LinkedIn group, enumerate its members, or collect member profiles.

B. Community Planning Document

Google Docs:

[Link withheld from the public repository — the document contains personal contact information. Ask the organizers for access.]

Use this document to understand the community’s vision, plans, goals, or other requirements if access is available.

If you cannot access it:

* Record the limitation in PROJECT_STATUS.md.
* Continue using the requirements in this prompt.
* Do not claim that you reviewed the document.

C. Historical Event Tasks

Google Sheets:

[Link withheld from the public repository — ask the organizers for access.]

Use this spreadsheet as a reference for historical event planning and tasks if access is available.

Do not reproduce private attendee information or sensitive operational details on the public website.

If the spreadsheet is inaccessible, document that fact and continue with the known information.

D. Historical Event Registration Pages

Event 1 — December 5, 2024:
https://lu.ma/mbnkg3oy

Event 2 — March 6, 2025:
https://lu.ma/hnxoim47

Event 3 — August 8, 2025:
https://lu.ma/bk3pmhy5

These are historical event references.

Preserve their dates and URLs. Display them in chronological order on the Past Events page.

Do not assume that their registration pages remain active or that they contain specific agendas, attendance numbers, sponsors, speakers, or outcomes.

If event descriptions are not already available in the project materials, use concise descriptions based only on confirmed information. Do not fabricate event details.

⸻

4. COMMUNITY VISION

The website should communicate the following vision.

Austin Professional Network Community brings people together to build meaningful professional relationships, exchange career knowledge, support job seekers, and strengthen the local professional community.

The community should make networking accessible to people at different career stages.

A student should feel comfortable attending alongside an experienced engineering leader. A job seeker should feel welcome even if they are currently unemployed. A working professional should have a reason to attend beyond simply exchanging business cards.

The emphasis is on authentic relationships, mutual support, practical career knowledge, and in-person connections.

Suggested tagline

“Real People. Meaningful Connections. Stronger Careers.”

You may refine the tagline if you identify a stronger option, but maintain the same community-oriented positioning.

Core principles

* Inclusivity across career stages.
* Professional respect.
* Authentic networking.
* Mutual support.
* Knowledge sharing.
* Practical career development.
* Community participation.
* Accessibility and affordability.
* In-person connection complemented by online engagement.

Do not imply that the community guarantees jobs, referrals, interviews, or career outcomes.

⸻

5. TARGET AUDIENCE

Design the experience for these groups.

Job seekers

People looking for jobs, internships, career changes, referrals, or advice about navigating the job market.

Working professionals

People who want to meet peers, expand their professional networks, exchange ideas, and contribute to the community.

Students and recent graduates

People who want to learn about careers, build confidence, meet professionals, and prepare for employment.

Experienced professionals and mentors

People willing to share career lessons, review resumes, give presentations, participate in panels, or mentor other community members.

Volunteers and organizers

People who want to organize meetups, coordinate speakers, support event logistics, and help the community grow.

Sponsors and community supporters

Organizations or individuals interested in supporting professional development through refreshments, venue space, educational resources, or other appropriate contributions.

⸻

6. WEBSITE REQUIREMENTS

Build a complete, responsive, static website.

The website should include the following pages or equivalent sections.

Page 1: Home

The homepage should immediately communicate:

* What the community is.
* Who it serves.
* Why someone should participate.
* How to join the existing online community.
* How to learn about past events.
* How to express interest in future Austin Bhet meetups.

Suggested hero section:

“Build Your Professional Network in Austin”

“Connect with job seekers, working professionals, students, and mentors. Share experiences, learn from one another, and build relationships that extend beyond LinkedIn.”

Primary call to action:
“Join Our LinkedIn Community”

Secondary call to action:
“Explore Community Events”

Additional sections:

* Who the community is for.
* What happens at an Austin Bhet.
* Networking and career-development activities.
* Past events.
* Ways to volunteer or contribute.
* Sponsor opportunities.
* Frequently asked questions.
* Contact or participation information, if a verified contact method is provided.

Do not invent an official email address or phone number. If no contact information is available, provide a clearly labeled placeholder in the project’s configuration or documentation rather than publishing fabricated details.

Page 2: Events

Create a dedicated Events page.

The page must clearly distinguish between:

1. Upcoming events.
2. Past events.
3. Future event interest or participation.

Initially, no upcoming event has been confirmed by the project owner. Therefore, do not fabricate an upcoming event.

Instead, display an informative empty state:

“Our next Austin Bhet is being planned. Join the LinkedIn community to stay connected and express your interest in future meetups.”

Include a call to action to join the LinkedIn group.

Provide a separate Past Events section containing the three historical events.

Historical Event 1

Title: Austin Bhet — December 2024

Date: December 5, 2024

Event reference:
https://lu.ma/mbnkg3oy

Display the original event date and a link to the historical event page.

Do not invent an event venue, attendance count, speakers, or agenda.

Historical Event 2

Title: Austin Bhet — March 2025

Date: March 6, 2025

Event reference:
https://lu.ma/hnxoim47

Display the original event date and a link to the historical event page.

Do not invent an event venue, attendance count, speakers, or agenda.

Historical Event 3

Title: Austin Bhet — August 2025

Date: August 8, 2025

Event reference:
https://lu.ma/bk3pmhy5

Display the original event date and a link to the historical event page.

Do not invent an event venue, attendance count, speakers, or agenda.

All three events are in the past. Do not display them in the upcoming-events section.

If confirmed historical descriptions become available in the supplied planning documents, use them to improve the event cards.

Event card design

Each event card should support:

* Event title.
* Date.
* Past/upcoming status.
* Confirmed description, if available.
* Event reference link.
* Optional event image, if supplied and approved.
* Optional agenda or recap, if verified information is available.

Build the event data model so organizers can add future events by editing a structured data file rather than changing the page’s underlying components.

Suggested file:

src/data/events.json

or an equivalent structure appropriate to the chosen framework.

Each event record should include:

* id
* title
* date
* status
* description
* registrationUrl
* location
* agenda
* speakers
* sponsors
* recapUrl
* source
* lastUpdated

Fields that are not known should be empty or omitted. Do not invent data to fill them.

The application should determine whether an event is in the past using its date, while allowing an explicit status for cancellation or postponement if that functionality is needed.

Do not assume a future event exists simply because the event data model supports one.

Page 3: About

Explain:

* The purpose of the community.
* Why professional networking matters.
* The value of in-person Austin Bhet gatherings.
* How job seekers, students, and employed professionals can participate.
* How people can volunteer, mentor, present, or support events.

Use clear, welcoming, professional language.

Do not make unsupported claims about the community’s size, founding history, achievements, or membership.

Page 4: Austin Bhet

Create a page explaining the proposed in-person meetup format.

The page should describe the intended experience without implying that an event is already scheduled.

Include the following proposed activities:

Introductions and professional sharing
Attendees introduce themselves, explain what they currently do, or share the kind of role or career they hope to pursue.

Structured networking
Help attendees connect with people who share professional interests, career goals, or relevant experience.

Job-search and resume advice
Offer practical guidance on resumes, interviews, job applications, and navigating the hiring process.

Networking and LinkedIn
Help attendees build meaningful professional relationships and connect on LinkedIn when both parties wish to do so.

Presentations and panel discussions
Invite professionals to share experiences, industry insights, and career lessons.

Mentorship and peer support
Encourage experienced professionals to help students, job seekers, and career changers.

Refreshments
Explore refreshments provided by sponsors or community supporters, subject to confirmation.

Professional community building
Create opportunities for people to reconnect after events and continue helping one another.

Make it clear that these are proposed elements, not confirmed features of a scheduled event.

Page 5: Get Involved

Explain how people can contribute.

Include these participation paths:

* Attend future meetups.
* Volunteer to organize events.
* Present a professional topic.
* Join a panel discussion.
* Provide career or resume guidance.
* Mentor students or job seekers.
* Help with event logistics.
* Sponsor refreshments or venue space.
* Suggest topics or activities.

Initially, use the existing LinkedIn group as the primary public community call to action.

Do not build a nonfunctional form that appears to submit information when it does not.

If an interest form is proposed, document the required service, data handling, privacy implications, and setup steps. Use it only if a legitimate submission destination can be configured and tested.

If no submission service is configured, provide a clear alternative directing people to the LinkedIn group.

⸻

7. FUTURE AUSTIN BHET EVENT CONCEPT

Use the following event concept as a foundation for the Austin Bhet page and future event-planning documentation.

Concept: An indoor, professional, in-person gathering for job seekers, working professionals, students, and experienced mentors in the Greater Austin area.

Purpose: Help attendees build authentic relationships, share career experiences, learn practical professional skills, and discover opportunities to support one another.

Potential venue: An indoor location suitable for conversation, introductions, presentations, and informal networking.

No venue has been confirmed. Do not select or advertise a specific venue as booked.

Potential refreshments: Snacks or light refreshments provided by sponsors or community supporters.

No sponsor has been confirmed. Do not display sponsor logos or imply sponsorship without authorization.

Potential program:

1. Welcome and community introduction.
2. Brief attendee introductions.
3. Professional sharing: what you do today or what you aspire to do.
4. A short presentation on job seeking, resumes, interviews, or networking.
5. A panel discussion or lessons learned from working professionals.
6. Structured networking and optional LinkedIn connections.
7. Informal conversation and refreshments.
8. Closing remarks and next steps.

This is a suggested format, not a finalized agenda.

Create a reusable sample agenda in the documentation. Make the duration configurable rather than assuming an event length.

Possible topics for future events:

* How to improve a resume.
* How to prepare for interviews.
* How to approach the hidden job market.
* How to make useful professional connections.
* How to use LinkedIn effectively.
* How to change careers.
* How to move from university into professional work.
* How to ask for referrals respectfully.
* How to build professional confidence.
* How to support peers during a job search.
* How to mentor early-career professionals.

Keep the experience practical, interactive, and welcoming.

Avoid making the meetup exclusively about job seekers. The value should extend to everyone who participates.

⸻

8. DESIGN AND USER EXPERIENCE

Create a modern, polished, professional community website.

The visual direction should feel:

* Welcoming.
* Trustworthy.
* Contemporary.
* Community-oriented.
* Professional without being overly corporate.
* Friendly to students and early-career professionals.
* Appropriate for an in-person networking organization.

Use:

* Clear typography.
* Generous spacing.
* Strong visual hierarchy.
* Accessible color contrast.
* Responsive layouts.
* Well-designed event cards.
* Prominent but tasteful calls to action.
* Consistent navigation.
* Thoughtful empty states.

Avoid:

* Generic business-directory layouts.
* Excessive corporate stock imagery.
* Fake attendee portraits or fabricated testimonials.
* Fake logos and sponsor badges.
* Unnecessary animations.
* Overly complicated navigation.
* Unverified claims about community membership or impact.

Do not create an Asian-owned business directory as part of this project.

If using community photography, use only supplied or properly licensed assets. Do not represent stock photographs as actual community attendees.

⸻

9. TECHNICAL ARCHITECTURE

Host the site on GitHub Pages.

Choose a maintainable static-site architecture compatible with GitHub Pages. A lightweight React/Vite implementation or another suitable static framework is acceptable.

Before selecting the stack:

1. Inspect the repository.
2. Reuse existing working infrastructure where appropriate.
3. Prefer the simplest architecture that meets the requirements.
4. Avoid unnecessary services and recurring costs.

The initial release must not require:

* A custom backend.
* A member database.
* Login or authentication.
* A paid hosting service.
* A server to render pages dynamically.

Use structured content files for event information and other content that organizers may need to update.

Ensure the site can be built and deployed through GitHub Actions.

Document any required GitHub Pages repository settings and deployment configuration.

Remember that GitHub Pages publishes the deployed site publicly even when the source repository is private. Never deploy private planning documents or confidential material.

⸻

10. MULTI-AGENT MIXTURE OF EXPERTS

Act as the Lead Architect and Orchestrator.

Inspect the current Claude Code environment to determine which supported subagent or agent-team capabilities are available. Do not assume that a particular orchestration feature is enabled.

Use available agent capabilities to divide independent tasks among the following specialist roles. If parallel execution is unavailable, perform the same reviews sequentially.

Agent 1: Product Architect

Responsibilities:

* Translate requirements into a clear website structure.
* Define shared content contracts.
* Maintain project scope and milestones.
* Resolve design and technical decisions.
* Prevent scope drift into business-directory functionality.

Agent 2: Community Content Strategist

Responsibilities:

* Develop welcoming community-oriented copy.
* Structure the About and Austin Bhet pages.
* Turn the event concept into clear, practical content.
* Avoid unsupported claims and invented community history.

Agent 3: Events Specialist

Responsibilities:

* Implement the historical events page.
* Preserve all three event dates and URLs.
* Distinguish past events from confirmed upcoming events.
* Build reusable structured event data.
* Ensure the event model supports future updates without inventing future events.

Agent 4: UX/UI Engineer

Responsibilities:

* Design the homepage, event cards, About page, and participation paths.
* Ensure accessibility and responsive behavior.
* Create a consistent visual identity.
* Optimize the experience for job seekers, students, and working professionals.

Agent 5: Web Engineer

Responsibilities:

* Implement the static website.
* Configure routing, components, styles, and structured content.
* Integrate the LinkedIn group call to action.
* Ensure GitHub Pages compatibility.

Agent 6: QA and DevOps Engineer

Responsibilities:

* Test page rendering, links, responsiveness, accessibility, and build output.
* Configure automated checks.
* Validate GitHub Actions workflows.
* Report actual test and deployment results.

Agent 7: Security and Privacy Reviewer

Responsibilities:

* Check for accidentally published private documents, personal data, credentials, and internal notes.
* Verify that no scraping or unauthorized data collection has been introduced.
* Check external links and privacy implications.
* Ensure that no authentication requirement has been added.

Agent 8: Final Integration Reviewer

Responsibilities:

* Independently review the completed site against the requirements.
* Check historical event dates and URLs.
* Verify that the project is a professional networking community.
* Identify missing features, unsupported claims, broken links, and inconsistencies.
* Report any remaining issues before the project is considered complete.

Agent coordination rules

Before parallel execution:

* Define the page structure and content contracts.
* Assign clear ownership of files.
* Avoid multiple agents editing the same files concurrently.
* Have agents report assumptions, blockers, and incomplete work.
* Integrate changes through the Lead Architect.
* Run tests after integration.

Do not create agents merely for appearance. Use specialist roles to produce actual deliverables and independent reviews.

⸻

11. REQUIRED PROJECT FILES

Create or update the following files as appropriate.

CLAUDE.md
Persistent instructions for Claude Code.

PROMPT.md
The master project prompt and operating requirements.

AGENT.md
Agent roles, file ownership, orchestration rules, and review responsibilities.

PROJECT_STATUS.md
Progress tracking, completed work, current blockers, test results, and next steps.

README.md
Project overview, development instructions, build commands, deployment instructions, and content maintenance guidance.

CONTRIBUTING.md
Guidance for future contributors, volunteers, and developers.

docs/COMMUNITY_GUIDELINES.md
Suggested principles for respectful, inclusive professional networking.

docs/AUSTIN_BHET_EVENT_PLAYBOOK.md
Reusable guidance for planning an indoor meetup, including the sample agenda, venue considerations, sponsor considerations, volunteer roles, and follow-up.

docs/CONTENT_MAINTENANCE.md
Instructions for updating historical events, adding a confirmed upcoming event, changing community copy, and maintaining external links.

docs/DEPLOYMENT.md
GitHub Pages configuration and troubleshooting.

docs/PRIVACY_AND_PUBLICATION.md
Guidance on public information, private planning materials, consent, and publication boundaries.

Add other files only when useful.

Do not create empty documentation files just to satisfy this list. Each file should contain meaningful content.

⸻

12. TESTING AND QUALITY ASSURANCE

Implement appropriate automated checks.

At minimum, verify:

Build

* The site installs dependencies and builds successfully.
* The output can be deployed to GitHub Pages.
* Asset and routing paths work under the configured repository base path.

Navigation

* All internal pages load.
* Navigation links work.
* External links point to the supplied destinations.

Events

* All three historical events appear on the Past Events section.
* Dates are correct.
* Each event links to its original Luma URL.
* No historical event is presented as upcoming.
* No unconfirmed future event is fabricated.
* Empty optional fields do not break the layout.

Content

* No fake testimonials, sponsors, speakers, or attendance figures.
* No fabricated contact details.
* No unsupported claims about community size or achievements.
* No business-directory or scraping functionality.

Accessibility

* Semantic headings.
* Keyboard-accessible navigation.
* Visible focus indicators.
* Adequate color contrast.
* Meaningful link labels.
* Responsive layouts.

Privacy

* No secrets in the repository.
* No private Google Docs or Sheets content copied into the public build without review and approval.
* No attendee lists or private contact information exposed.

Deployment

* GitHub Actions configuration is valid.
* The deployment workflow builds the site before publishing.
* Actual deployment success is reported only after it has been verified.

Create a npm run check or equivalent command that executes the project’s important validation steps.

Document tests that cannot be performed in the available environment.

⸻

13. AUTONOMOUS EXECUTION PROTOCOL

Work through the project continuously, using this loop:

1. Inspect the repository and current project status.
2. Review the supplied requirements and available reference material.
3. Identify the highest-priority unfinished tasks.
4. Break work into independent tasks.
5. Delegate to specialist agents where available.
6. Implement the website and supporting documentation.
7. Run checks and inspect the results.
8. Fix failures.
9. Update PROJECT_STATUS.md.
10. Continue to the next unfinished task.

Do not stop after creating a plan.

Do not stop after producing a homepage mockup.

Do not stop when the first build succeeds if required pages or tests remain unfinished.

If a tool, agent, reference document, or external service is unavailable, record the limitation and continue with work that does not depend on it.

Do not claim to have inspected a document that you could not access.

Do not claim a deployment succeeded unless it actually succeeded.

Do not ask the user to approve routine, reversible engineering decisions. Use reasonable defaults and document important assumptions.

Do not run destructive commands or expose credentials in the name of autonomy.

⸻

14. IMPLEMENTATION PHASES

Phase 1 — Repository inspection

* Inspect the existing repository and Git state.
* Identify the current framework, dependencies, and deployment configuration.
* Review existing project instructions.
* Create a concise implementation plan.
* Record the initial status.

Phase 2 — Project foundation

* Establish the site architecture.
* Define shared content structures.
* Configure the development and build workflow.
* Add the required project documentation.

Phase 3 — Homepage and community content

* Implement the homepage.
* Add the community mission and target audience.
* Add the LinkedIn group call to action.
* Implement the About and Get Involved pages.

Phase 4 — Events

* Implement the Events page.
* Add the three historical events using the exact dates and URLs.
* Create a separate upcoming-events area.
* Add an informative empty state when no upcoming event is confirmed.
* Implement reusable event data structures.

Phase 5 — Austin Bhet

* Build the Austin Bhet concept page.
* Describe the proposed meetup activities.
* Add a reusable sample agenda.
* Document venue, sponsor, volunteer, and program considerations.
* Clearly distinguish proposed plans from confirmed arrangements.

Phase 6 — Design and accessibility

* Polish typography, spacing, layouts, and navigation.
* Validate mobile and desktop experiences.
* Fix accessibility issues.
* Verify all calls to action.

Phase 7 — Automated testing

* Add and run relevant tests.
* Validate event records.
* Verify links and page navigation.
* Fix build and test failures.
* Record actual results.

Phase 8 — GitHub Pages deployment

* Configure the deployment workflow.
* Verify the production build.
* Publish the site if repository permissions and deployment configuration permit.
* Document any steps requiring manual intervention.

Phase 9 — Final review

* Run the full quality checklist.
* Conduct the independent integration review.
* Update all project documentation.
* Update PROJECT_STATUS.md.
* Provide a concise report of what was built, tested, deployed, and left incomplete.

⸻

15. DEFINITION OF DONE

The project is complete when:

* A polished, responsive professional networking website exists.
* The website clearly explains the community’s purpose.
* The intended audience includes job seekers, working professionals, students, and mentors.
* The existing Amhi Austinkar LinkedIn group is linked prominently.
* A dedicated Events page exists.
* All three historical events are displayed with correct dates and original URLs.
* Past events are not presented as upcoming.
* The website does not invent future events, speakers, venues, sponsors, or attendance statistics.
* The Austin Bhet concept is explained.
* The proposed program includes introductions, career sharing, practical advice, presentations or panels, and networking.
* Future events can be added through structured content.
* No business-directory or scraping functionality has been introduced.
* The project is compatible with GitHub Pages.
* Automated checks have been run and their results documented.
* The public deployment contains only approved content.
* The project documentation is meaningful and up to date.
* Any remaining limitations are explicitly reported.

⸻

16. FINAL OPERATING INSTRUCTION

Begin by inspecting the existing repository and available project materials.

Then execute the implementation phases in order, using the mixture-of-experts workflow wherever supported.

Build the actual website, not merely a plan.

Preserve the supplied event dates and URLs exactly.

Treat the historical events as past events and do not invent an upcoming event.

Use the supplied LinkedIn group as the primary existing community destination.

Do not scrape websites or social networks.

Do not fabricate information when reference material is unavailable.

Keep the site focused on professional networking, career development, mutual support, and meaningful in-person community building.

Continue working through the available tasks until the definition of done is met or a genuine external blocker prevents further progress.

At the end, report:

1. What was implemented.
2. What was tested.
3. Whether GitHub Pages deployment was verified.
4. Which reference documents could and could not be accessed.
5. Any remaining blockers or recommended next steps.
