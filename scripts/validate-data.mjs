import { readFile } from 'node:fs/promises';
import { validateEvents } from '../src/lib/events.mjs';

const data = JSON.parse(await readFile(new URL('../src/data/events.json', import.meta.url), 'utf8'));
const problems = validateEvents(data.events ?? []);
if (problems.length) {
  console.error('events.json has problems:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log(`events.json OK (${data.events.length} events)`);
