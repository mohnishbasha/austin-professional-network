import { buildLlmsTxt } from '../lib/seo.mjs';
import siteData from '../data/site.json';
import data from '../data/events.json';

export function GET({ site }) {
  const body = buildLlmsTxt({ siteData, events: data.events, site, base: import.meta.env.BASE_URL });
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
