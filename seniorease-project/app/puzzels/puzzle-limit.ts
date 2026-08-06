/** Maximaal 2 voltooide puzzels per uur — daarna iets sociaals doen. */

const STORAGE_KEY = 'seniorease-puzzle-completions';
export const MAX_PUZZLES_PER_HOUR = 2;
const HOUR_MS = 60 * 60 * 1000;

export const SOCIAL_TIPS = [
  'Bel of app eens iemand die u graag spreekt.',
  'Drink een kop thee of koffie — graag samen met iemand.',
  'Ga een stukje wandelen, eventueel met een buur of vriend(in).',
  'Stuur een berichtje of kaartje naar familie.',
  'Zet de radio of een podcast aan, of bel iemand om samen te luisteren.',
  'Doe iets kleins in huis — en vraag gerust of iemand meehelpt.',
  'Speel een spelletje met iemand in huis of via de telefoon.',
];

function readTimestamps(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((t) => typeof t === 'number');
  } catch {
    return [];
  }
}

function writeTimestamps(times: number[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(times));
}

export function getCompletionsLastHour(): number[] {
  const cutoff = Date.now() - HOUR_MS;
  return readTimestamps().filter((t) => t >= cutoff);
}

export function completionsLeftThisHour(): number {
  return Math.max(0, MAX_PUZZLES_PER_HOUR - getCompletionsLastHour().length);
}

export function canStartAnotherPuzzle(): boolean {
  return completionsLeftThisHour() > 0;
}

/** Registreer een voltooide puzzel. Retourneert of deze nog “meetelde”. */
export function recordPuzzleCompletion(): { counted: boolean; left: number } {
  const recent = getCompletionsLastHour();
  if (recent.length >= MAX_PUZZLES_PER_HOUR) {
    return { counted: false, left: 0 };
  }
  const next = [...recent, Date.now()];
  writeTimestamps(next);
  return { counted: true, left: Math.max(0, MAX_PUZZLES_PER_HOUR - next.length) };
}

export function minutesUntilNextPuzzleSlot(): number {
  const recent = getCompletionsLastHour();
  if (recent.length < MAX_PUZZLES_PER_HOUR) return 0;
  const oldest = Math.min(...recent);
  const waitMs = oldest + HOUR_MS - Date.now();
  return Math.max(1, Math.ceil(waitMs / 60000));
}

export function pickSocialTip(seed?: number): string {
  const i =
    typeof seed === 'number'
      ? Math.abs(seed) % SOCIAL_TIPS.length
      : Math.floor(Date.now() / 86400000) % SOCIAL_TIPS.length;
  return SOCIAL_TIPS[i];
}
