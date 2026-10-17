import { absUrl } from '../lib/seo.mjs';

// Crawlers only read robots.txt at a domain root. On a GitHub Pages project site
// (owner.github.io/repo/) this file is not consulted; it takes effect with a custom domain.
export function GET({ site }) {
  const base = import.meta.env.BASE_URL;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absUrl(site, base, 'sitemap.xml')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
