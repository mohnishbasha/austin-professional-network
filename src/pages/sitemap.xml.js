import { PAGES, absUrl } from '../lib/seo.mjs';
import data from '../data/events.json';

export function GET({ site }) {
  const base = import.meta.env.BASE_URL;
  const lastmod = data.events.map((e) => e.lastUpdated).sort().at(-1);
  const urls = PAGES.map((p) => `  <url><loc>${absUrl(site, base, p.path)}</loc>${p.path === 'events/' && lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
