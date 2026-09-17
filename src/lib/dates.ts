const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

/** "2026-01" → "janv. 2026" ; null → "aujourd'hui" */
export function fmt(ym: string | null): string {
  if (!ym) return "aujourd'hui";
  const [y, m] = ym.split('-').map(Number);
  return m ? `${MONTHS[m - 1]} ${y}` : String(y);
}

export function year(ym: string | null): number {
  return ym ? Number(ym.slice(0, 4)) : new Date().getFullYear();
}

/** Durée lisible entre deux mois ("3 ans 5 mois", "2 mois"). */
export function duration(start: string, end: string | null): string {
  const [sy, sm] = start.split('-').map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
  let months = (ey - sy) * 12 + ((em ?? 1) - (sm ?? 1)) + 1;
  if (months < 1) months = 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y) parts.push(`${y} an${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mois`);
  return parts.join(' ');
}

export function range(start: string, end: string | null): string {
  const a = fmt(start);
  const b = fmt(end);
  return a === b ? a : `${a} → ${b}`;
}

export function yearsSince(y: number): number {
  return new Date().getFullYear() - y;
}
