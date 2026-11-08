/**
 * Inhoud voor “Wat zit erin?” op de bedankpagina.
 * Fail-safe: bij ontbrekende orderstatus géén pakket-default.
 */

export type BedanktContentsKind =
  | 'chatgpt'
  | 'compleet'
  | 'los'
  | 'pakket'
  | 'unknown';

export type BedanktContentsInput = {
  orderKind?: string | null;
  orderStatus?: string | null;
  localProductType?: string | null;
  hasChatgptLocalSession?: boolean;
};

const KNOWN_KINDS = new Set<BedanktContentsKind>([
  'chatgpt',
  'compleet',
  'los',
  'pakket',
]);

export function resolveBedanktContentsKind(
  input: BedanktContentsInput,
): BedanktContentsKind {
  const orderKind = input.orderKind?.trim();
  if (orderKind && KNOWN_KINDS.has(orderKind as BedanktContentsKind)) {
    return orderKind as BedanktContentsKind;
  }

  const local = input.localProductType?.trim();
  if (local === 'los' || local === 'compleet' || local === 'pakket') {
    return local;
  }

  if (input.hasChatgptLocalSession) {
    return 'chatgpt';
  }

  // Geen order.kind en geen betrouwbare lokale sessie → nooit pakket aannemen.
  return 'unknown';
}

export function bedanktContentsBullets(
  kind: BedanktContentsKind,
  options?: { lessonLabel?: string | null },
): string[] {
  switch (kind) {
    case 'chatgpt':
      return [
        'Een ZIP-bestand met het gekozen ChatGPT-lesmateriaal',
        'Draaiboek, beamer en deelnemersmateriaal waar van toepassing',
        'START_HIER-instructies en gebruikslicentie',
      ];
    case 'compleet':
      return [
        'Alle themapakketten A–H (draaiboeken + oefentaken)',
        'Begeleidersgids en printrechten voor uw organisatie',
        'Beamer-PDF waar beschikbaar',
      ];
    case 'los': {
      const label = options?.lessonLabel?.trim();
      return [
        label
          ? `Materiaal voor ${label}`
          : 'Materiaal voor de bestelde losse les',
        'Draaiboek voor één lesmiddag',
        'Deelnemerskaart en oefentaken voor die les',
        'Zaalchecklist en nazorgkaart',
      ];
    }
    case 'pakket':
      return [
        'Draaiboek voor de begeleider',
        'Deelnemerskaart en oefentaken (4 lessen)',
        'Zaalchecklist en nazorgkaart',
        'Beamer-PDF waar beschikbaar',
      ];
    case 'unknown':
    default:
      return [
        'Het bestelde lesmateriaal volgt per e-mail of via de downloadknoppen hierboven',
        'Controleer ook uw map ongewenste e-mail',
        'Vragen? Mail support@seniorease.nl',
      ];
  }
}
