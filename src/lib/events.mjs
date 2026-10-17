// Pure event helpers, shared by pages, the data validator, and tests.

export const TIME_ZONE = 'America/Chicago';
export const EXPLICIT_STATUSES = ['cancelled', 'postponed'];

/** Today's date as YYYY-MM-DD in Austin's time zone. */
export function todayInAustin(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now);
}

/**
 * Resolve an event's status. An explicit 'cancelled' or 'postponed' wins;
 * otherwise the date decides. An event dated today still counts as upcoming.
 */
export function resolveStatus(event, today = todayInAustin()) {
  if (EXPLICIT_STATUSES.includes(event.status)) return event.status;
  return event.date < today ? 'past' : 'upcoming';
}

export function partitionEvents(events, today = todayInAustin()) {
  const withStatus = events.map((e) => ({ ...e, resolvedStatus: resolveStatus(e, today) }));
  const byDate = (a, b) => a.date.localeCompare(b.date);
  return {
    upcoming: withStatus.filter((e) => e.resolvedStatus === 'upcoming').sort(byDate),
    past: withStatus.filter((e) => e.resolvedStatus === 'past').sort(byDate),
    other: withStatus.filter((e) => EXPLICIT_STATUSES.includes(e.resolvedStatus)).sort(byDate),
  };
}

/** "Thursday, December 5, 2024" — formatted without time-zone drift. */
export function formatEventDate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const REQUIRED = ['id', 'title', 'date', 'source', 'lastUpdated'];

/** Returns a list of human-readable problems; empty means valid. */
export function validateEvents(events) {
  const problems = [];
  const ids = new Set();
  events.forEach((e, i) => {
    const where = `events[${i}] (${e.id || 'no id'})`;
    for (const key of REQUIRED) if (!e[key]) problems.push(`${where}: missing "${key}"`);
    if (e.date && !DATE_RE.test(e.date)) problems.push(`${where}: date must be YYYY-MM-DD`);
    if (e.date && DATE_RE.test(e.date) && Number.isNaN(Date.parse(e.date))) problems.push(`${where}: invalid date`);
    if (e.status && !EXPLICIT_STATUSES.includes(e.status)) {
      problems.push(`${where}: status must be empty, "cancelled", or "postponed" (past/upcoming is computed)`);
    }
    for (const key of ['registrationUrl', 'recapUrl', 'image']) {
      if (e[key] && !/^(https:\/\/|\/)/.test(e[key])) problems.push(`${where}: ${key} must be https:// or a site path`);
    }
    for (const key of ['agenda', 'speakers', 'sponsors']) {
      if (e[key] !== undefined && !Array.isArray(e[key])) problems.push(`${where}: ${key} must be an array`);
    }
    if (ids.has(e.id)) problems.push(`${where}: duplicate id`);
    ids.add(e.id);
  });
  return problems;
}
