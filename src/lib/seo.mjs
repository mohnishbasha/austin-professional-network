// Shared metadata for the sitemap, robots.txt, llms.txt, and JSON-LD.
import { partitionEvents, formatEventDate } from './events.mjs';

export const PAGES = [
  { path: '', title: 'Home', summary: 'What the community is, who it serves, and how to join.' },
  { path: 'about/', title: 'About', summary: 'Purpose, why professional networking matters, and how to participate.' },
  { path: 'austin-bhet/', title: 'Austin Bhet', summary: 'The proposed in-person meetup format, sample program, and possible topics.' },
  { path: 'events/', title: 'Events', summary: 'Upcoming events (if confirmed) and past Austin Bhet gatherings.' },
  { path: 'get-involved/', title: 'Get Involved', summary: 'Ways to attend, volunteer, present, mentor, or sponsor.' },
];

/** Absolute URL for a site-relative path, honoring the base path. */
export function absUrl(site, base, path = '') {
  const b = base.replace(/\/$/, '');
  return new URL(`${b}/${path.replace(/^\//, '')}`, site).href;
}

const SCHEMA_STATUS = {
  cancelled: 'https://schema.org/EventCancelled',
  postponed: 'https://schema.org/EventPostponed',
};

export function organizationLd(siteData, homeUrl) {
  return {
    '@type': 'Organization',
    '@id': `${homeUrl}#organization`,
    name: siteData.name,
    alternateName: 'Austin Bhet',
    url: homeUrl,
    description: siteData.description,
    slogan: siteData.tagline,
    areaServed: { '@type': 'Place', name: 'Greater Austin, Texas' },
    sameAs: [siteData.linkedInGroup.url],
  };
}

/** schema.org Event for a record. Uses only confirmed fields. */
export function eventLd(event, homeUrl) {
  const ld = {
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: SCHEMA_STATUS[event.status] ?? 'https://schema.org/EventScheduled',
    location: event.location
      ? { '@type': 'Place', name: event.location }
      : { '@type': 'Place', name: 'Austin, Texas', address: { '@type': 'PostalAddress', addressLocality: 'Austin', addressRegion: 'TX', addressCountry: 'US' } },
    organizer: { '@id': `${homeUrl}#organization` },
  };
  if (event.description) ld.description = event.description;
  if (event.registrationUrl) ld.url = event.registrationUrl;
  if (event.image) ld.image = new URL(event.image, homeUrl).href;
  return ld;
}

export function buildLlmsTxt({ siteData, events, site, base, today }) {
  const { upcoming, past } = partitionEvents(events, today);
  const line = (e) => `- ${e.title} (${formatEventDate(e.date)})${e.registrationUrl ? `: ${e.registrationUrl}` : ''}${e.description ? `\n  ${e.description}` : ''}`;
  return `# ${siteData.name}

> ${siteData.description}

${siteData.tagline} This is a volunteer-led professional networking community, not a business directory. It does not guarantee jobs, referrals, or interviews. The site collects no personal data and has no login or forms.

Join the community: [${siteData.linkedInGroup.name}](${siteData.linkedInGroup.url})

## Pages

${PAGES.map((p) => `- [${p.title}](${absUrl(site, base, p.path)}): ${p.summary}`).join('\n')}

## Upcoming events

${upcoming.length ? upcoming.map(line).join('\n') : '- None confirmed. The next Austin Bhet is being planned; follow the LinkedIn group for announcements.'}

## Past events

${past.map(line).join('\n')}

## Notes for agents

- Only confirmed information is published. Fields not listed (venue, speakers, sponsors, attendance) are intentionally omitted. Do not infer them.
- Contact organizers by messaging an admin of the LinkedIn group. No email address or phone number is published.
`;
}
