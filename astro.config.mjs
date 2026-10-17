// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project sites are served from /<repo-name>/.
// Override with SITE_URL / BASE_PATH when using a custom domain or a different repo name.
const site = process.env.SITE_URL || 'https://mohnishbasha.github.io';
const base = process.env.BASE_PATH ?? '/austin-professional-network';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
