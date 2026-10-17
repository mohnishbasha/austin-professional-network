// Validates the built site in dist/. Run `npm run build` first (npm run check does both).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { partitionEvents, resolveStatus, formatEventDate, validateEvents } from '../src/lib/events.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const BASE = (process.env.BASE_PATH ?? '/austin-professional-network').replace(/\/$/, '');
const LINKEDIN = 'https://www.linkedin.com/groups/14014249';
const HISTORICAL = [
  { date: '2024-12-05', title: 'Austin Bhet — December 2024', url: 'https://lu.ma/mbnkg3oy', label: 'December 5, 2024' },
  { date: '2025-03-06', title: 'Austin Bhet — March 2025', url: 'https://lu.ma/hnxoim47', label: 'March 6, 2025' },
  { date: '2025-08-08', title: 'Austin Bhet — August 2025', url: 'https://lu.ma/bk3pmhy5', label: 'August 8, 2025' },
];
const PAGES = ['index.html', 'about/index.html', 'austin-bhet/index.html', 'events/index.html', 'get-involved/index.html', '404.html'];
const ALLOWED_EXTERNAL = [LINKEDIN, ...HISTORICAL.map((e) => e.url)];

const read = (p) => readFile(path.join(dist, p), 'utf8');
const eventsData = JSON.parse(await readFile(path.join(root, 'src/data/events.json'), 'utf8'));
const site = JSON.parse(await readFile(path.join(root, 'src/data/site.json'), 'utf8'));
const hrefs = (html) => [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const section = (html, name) => {
  const start = html.indexOf(`data-section="${name}"`);
  if (start === -1) return '';
  const next = html.indexOf('data-section="', start + 20);
  return html.slice(start, next === -1 ? undefined : next);
};

test('dist exists (run npm run build first)', () => {
  assert.ok(existsSync(dist), 'dist/ missing');
});

// ---------- Build & routing ----------
test('every page is built', async () => {
  for (const p of PAGES) assert.ok((await stat(path.join(dist, p))).size > 0, p);
  assert.ok(existsSync(path.join(dist, '.nojekyll')), '.nojekyll missing');
});

test('internal links and assets resolve under the base path', async () => {
  for (const p of PAGES) {
    const html = await read(p);
    for (const ref of hrefs(html)) {
      if (/^(https?:|mailto:|#)/.test(ref)) continue;
      assert.ok(ref.startsWith(`${BASE}/`), `${p}: "${ref}" is not under base ${BASE}/`);
      const rel = ref.slice(BASE.length).split('#')[0].replace(/^\//, '');
      const target = path.join(dist, rel);
      const ok = existsSync(target) && ((await stat(target)).isFile() || existsSync(path.join(target, 'index.html')));
      assert.ok(ok, `${p}: broken internal link ${ref}`);
    }
  }
});

test('external links only point to supplied destinations', async () => {
  for (const p of PAGES) {
    for (const ref of hrefs(await read(p))) {
      if (!/^https?:/.test(ref)) continue;
      if (ref.startsWith('https://mohnishbasha.github.io') || (process.env.SITE_URL && ref.startsWith(process.env.SITE_URL))) continue; // canonical
      assert.ok(ALLOWED_EXTERNAL.includes(ref), `${p}: unexpected external link ${ref}`);
    }
  }
});

// ---------- Navigation ----------
test('every page has the main nav, a skip link, and the LinkedIn CTA', async () => {
  for (const p of PAGES) {
    const html = await read(p);
    assert.match(html, /<nav[^>]*aria-label="Main"/, `${p}: nav`);
    assert.match(html, /class="skip-link" href="#main"/, `${p}: skip link`);
    assert.ok(html.includes(`href="${LINKEDIN}"`), `${p}: LinkedIn link`);
    for (const r of ['about/', 'austin-bhet/', 'events/', 'get-involved/']) assert.ok(html.includes(`href="${BASE}/${r}"`), `${p}: nav to ${r}`);
  }
});

test('the current page is marked in the nav', async () => {
  const map = { 'about/index.html': 'About', 'events/index.html': 'Events', 'austin-bhet/index.html': 'Austin Bhet', 'get-involved/index.html': 'Get Involved', 'index.html': 'Home' };
  for (const [p, label] of Object.entries(map)) assert.match(await read(p), new RegExp(`aria-current="page"[^>]*>${label}<`), p);
});

test('homepage has the required hero and calls to action', async () => {
  const t = text(await read('index.html'));
  assert.ok(t.includes('Build Your Professional Network in Austin'));
  assert.ok(t.includes('Join Our LinkedIn Community'));
  assert.ok(t.includes('Explore Community Events'));
  assert.ok(t.includes('Join the Amhi Austinkar LinkedIn Group to connect with the community, participate in discussions, and stay informed about networking activities.'));
});

// ---------- Events ----------
test('events.json is valid and holds the three historical events exactly', () => {
  assert.deepEqual(validateEvents(eventsData.events), []);
  for (const h of HISTORICAL) {
    const e = eventsData.events.find((x) => x.date === h.date);
    assert.ok(e, `missing ${h.date}`);
    assert.equal(e.title, h.title);
    assert.equal(e.registrationUrl, h.url);
  }
});

test('events page lists all historical events as past, in chronological order', async () => {
  const html = await read('events/index.html');
  const past = section(html, 'past');
  let last = -1;
  for (const h of HISTORICAL) {
    const i = past.indexOf(h.url);
    assert.ok(i > -1, `${h.url} not in past section`);
    assert.ok(i > last, `${h.title} out of order`);
    last = i;
    assert.ok(past.includes(`datetime="${h.date}"`), `${h.date} missing`);
    assert.ok(text(past).includes(h.label), `${h.label} not displayed`);
    assert.ok(past.includes(h.title.replace('—', '—')), `${h.title} missing`);
  }
});

test('no historical event appears as upcoming and no event is fabricated', async () => {
  const html = await read('events/index.html');
  const upcoming = section(html, 'upcoming');
  for (const h of HISTORICAL) assert.ok(!upcoming.includes(h.url), `${h.url} in upcoming`);
  const { upcoming: up } = partitionEvents(eventsData.events);
  if (up.length === 0) {
    assert.match(upcoming, /data-empty="true"/);
    assert.ok(text(upcoming).includes('Our next Austin Bhet is being planned. Join the LinkedIn community to stay connected and express your interest in future meetups.'));
    assert.ok(!/data-status="upcoming"/.test(html), 'an upcoming card was rendered');
  }
  assert.equal(eventsData.events.length, HISTORICAL.length + up.length);
});

test('status logic: date decides, explicit cancel/postpone wins, today is upcoming', () => {
  assert.equal(resolveStatus({ date: '2024-12-05' }, '2026-01-01'), 'past');
  assert.equal(resolveStatus({ date: '2026-01-01' }, '2026-01-01'), 'upcoming');
  assert.equal(resolveStatus({ date: '2027-01-01', status: 'postponed' }, '2026-01-01'), 'postponed');
  const { past, upcoming } = partitionEvents([{ date: '2025-08-08' }, { date: '2024-12-05' }, { date: '2030-01-01' }], '2026-01-01');
  assert.deepEqual(past.map((e) => e.date), ['2024-12-05', '2025-08-08']);
  assert.equal(upcoming.length, 1);
  assert.equal(formatEventDate('2024-12-05'), 'Thursday, December 5, 2024');
});

test('validator rejects bad records', () => {
  const bad = validateEvents([{ id: 'a', title: 'x', date: '12/05/2024', source: 's', lastUpdated: 'd', status: 'past', registrationUrl: 'http://x' }, { id: 'a' }]);
  assert.ok(bad.some((p) => p.includes('YYYY-MM-DD')));
  assert.ok(bad.some((p) => p.includes('status')));
  assert.ok(bad.some((p) => p.includes('registrationUrl')));
  assert.ok(bad.some((p) => p.includes('duplicate')));
});

test('events with empty optional fields render a graceful fallback', async () => {
  const html = await read('events/index.html');
  const empty = eventsData.events.filter((e) => !e.description);
  for (const e of empty) {
    const card = html.slice(html.indexOf(`data-event-id="${e.id}"`));
    assert.ok(text(card.slice(0, 1500)).includes("haven't been added yet"), e.id);
  }
  assert.ok(!/undefined|null|NaN/.test(text(html)), 'stray undefined/null/NaN in output');
});

// ---------- Content integrity & privacy ----------
const allText = async () => (await Promise.all(PAGES.map(read))).join('\n');

test('no phone numbers or unapproved email addresses are published', async () => {
  const t = text(await allText());
  assert.ok(!/\(?\b\d{3}\)?[\s.\-]\d{3}[\s.\-]\d{4}\b/.test(t), 'phone-like number found');
  assert.ok(!/\b1?\d{10}\b/.test(t), '10/11-digit number found');
  const emails = t.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? [];
  for (const e of emails) assert.equal(e, site.contact.email, `unexpected email ${e}`);
});

test('no testimonials, attendance counts, sponsor logos, or directory features', async () => {
  const html = await allText();
  const t = text(html).toLowerCase();
  for (const phrase of ['testimonial', 'attendees joined', 'members strong', 'business directory', 'asian-owned', 'search businesses']) {
    assert.ok(!t.includes(phrase), `found "${phrase}"`);
  }
  assert.ok(!/\b\d{2,}\+?\s+(people|attendees|members|professionals)\b/.test(t), 'count claim found');
  assert.ok(!/<form\b|<input\b|type="password"/i.test(html), 'form/login markup found');
});

test('source has no scraping, network collection, or auth code', async () => {
  const walk = async (dir) => (await Promise.all((await readdir(dir, { withFileTypes: true })).map((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  }))).flat();
  const files = (await walk(path.join(root, 'src'))).filter((f) => /\.(astro|mjs|js|ts|json)$/.test(f));
  for (const f of files) {
    const src = await readFile(f, 'utf8');
    assert.ok(!/\bfetch\(|XMLHttpRequest|axios|puppeteer|cheerio|playwright|localStorage|document\.cookie/.test(src), `${path.relative(root, f)} has network/scraping/storage code`);
  }
  assert.ok(!existsSync(path.join(dist, 'docs')), 'docs/ must not be published');
});

// ---------- Accessibility ----------
test('semantic structure: lang, one h1, no skipped heading levels, alt text, labelled links', async () => {
  for (const p of PAGES) {
    const html = await read(p);
    assert.match(html, /<html lang="en"/, `${p}: lang`);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${p}: exactly one h1`);
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
    levels.forEach((l, i) => { if (i) assert.ok(l <= levels[i - 1] + 1, `${p}: heading jumps h${levels[i - 1]}→h${l}`); });
    for (const img of html.match(/<img\b[^>]*>/g) ?? []) assert.match(img, /\balt="/, `${p}: img without alt`);
    for (const a of html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)) assert.ok(text(a[1]).trim().length > 0, `${p}: empty link`);
    assert.ok(!/>\s*(click here|read more|here)\s*</i.test(html), `${p}: vague link label`);
  }
});

test('CSS defines a visible focus indicator and honors reduced motion', async () => {
  const css = await readFile(path.join(root, 'src/styles/global.css'), 'utf8');
  assert.match(css, /:focus-visible\s*{[^}]*outline:\s*3px/);
  assert.match(css, /prefers-reduced-motion/);
});

test('color tokens meet WCAG AA (4.5:1) in light and dark themes', async () => {
  const css = await readFile(path.join(root, 'src/styles/global.css'), 'utf8');
  const block = (re) => Object.fromEntries([...css.match(re)[1].matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
  const light = block(/:root\s*{([\s\S]*?)\n}/);
  const dark = { ...light, ...block(/prefers-color-scheme: dark\)\s*{\s*:root\s*{([\s\S]*?)\n\s*}/) };
  const lum = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const pairs = [['ink', 'bg'], ['ink', 'surface'], ['ink', 'surface-alt'], ['ink', 'accent-soft'], ['muted', 'bg'], ['muted', 'surface'], ['muted', 'surface-alt'],
    ['brand', 'bg'], ['brand', 'surface'], ['brand', 'surface-alt'], ['on-brand', 'brand'], ['on-brand', 'brand-strong'], ['brand-strong', 'on-brand'],
    ['accent', 'bg'], ['accent', 'surface'], ['accent', 'surface-alt'], ['accent', 'accent-soft']];
  for (const [name, theme] of [['light', light], ['dark', dark]]) {
    for (const [fg, bg] of pairs) {
      const r = ratio(theme[fg], theme[bg]);
      assert.ok(r >= 4.5, `${name}: --${fg} on --${bg} is ${r.toFixed(2)}:1`);
    }
  }
});

// ---------- Search & agent readiness ----------
const SITE = process.env.SITE_URL || 'https://mohnishbasha.github.io';
const abs = (p = '') => new URL(`${BASE}/${p}`, SITE).href;
const jsonLdOf = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));

test('sitemap.xml lists every public page with absolute URLs and excludes 404', async () => {
  const xml = await read('sitemap.xml');
  assert.match(xml, /^<\?xml/);
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual(locs.sort(), ['', 'about/', 'austin-bhet/', 'events/', 'get-involved/'].map(abs).sort());
  assert.ok(!xml.includes('404'));
});

test('robots.txt allows crawling and points at the sitemap', async () => {
  const txt = await read('robots.txt');
  assert.match(txt, /User-agent: \*\nAllow: \//);
  assert.ok(txt.includes(`Sitemap: ${abs('sitemap.xml')}`));
});

test('llms.txt summarizes pages and events from the data file', async () => {
  const txt = await read('llms.txt');
  assert.ok(txt.startsWith(`# ${site.name}`));
  assert.ok(txt.includes(LINKEDIN));
  for (const p of ['about/', 'austin-bhet/', 'events/', 'get-involved/']) assert.ok(txt.includes(abs(p)), p);
  const pastBlock = txt.slice(txt.indexOf('## Past events'));
  let last = -1;
  for (const h of HISTORICAL) {
    const i = pastBlock.indexOf(`${h.label}): ${h.url}`);
    assert.ok(i > last, `${h.title} missing or out of order in llms.txt`);
    last = i;
  }
  if (partitionEvents(eventsData.events).upcoming.length === 0) assert.match(txt, /## Upcoming events\n\n- None confirmed/);
  assert.ok(!/\(?\b\d{3}\)?[\s.\-]\d{3}[\s.\-]\d{4}\b|[\w.+-]+@[\w-]+\.\w+/.test(txt), 'contact details in llms.txt');
});

test('every page has valid JSON-LD with the organization and social preview tags', async () => {
  assert.ok(existsSync(path.join(dist, 'og-image.png')));
  for (const p of PAGES) {
    const html = await read(p);
    const blocks = jsonLdOf(html);
    assert.equal(blocks.length, 1, `${p}: JSON-LD block`);
    const org = blocks[0]['@graph'].find((n) => n['@type'] === 'Organization');
    assert.equal(org.name, site.name);
    assert.deepEqual(org.sameAs, [LINKEDIN]);
    assert.ok(html.includes(`<meta property="og:image" content="${abs('og-image.png')}"`), `${p}: og:image`);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
  }
});

test('events JSON-LD matches confirmed data and invents nothing', async () => {
  const graph = jsonLdOf(await read('events/index.html'))[0]['@graph'];
  const evs = graph.filter((n) => n['@type'] === 'Event');
  assert.equal(evs.length, eventsData.events.length);
  for (const h of HISTORICAL) {
    const e = evs.find((x) => x.startDate === h.date);
    assert.ok(e, h.date);
    assert.equal(e.name, h.title);
    assert.equal(e.url, h.url);
    assert.equal(e.location.name, 'Austin, Texas');
  }
  for (const e of evs) for (const k of ['performer', 'offers', 'endDate', 'sponsor', 'attendee']) assert.ok(!(k in e), `${e.name}: unexpected ${k}`);
});
