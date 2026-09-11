/**
 * Lesmateriaal fulfillment: client_reference_id → downloadbare bestanden + signed tokens.
 *
 * Bestanden liggen in private/lesmateriaal-downloads/ (niet publiek).
 * Sync vanuit bron-PDF’s: npm run sync:lesmateriaal-downloads
 */

import { createHmac, timingSafeEqual } from 'crypto';
import { existsSync } from 'fs';
import path from 'path';
import {
  getPakketBySlug,
  LESMATERIAAL_PAKKETTEN,
  LOSSE_LES_PRIJS,
  ORG_COMPLEET_PRIJS,
  PAKKET_PRIJS,
  type LesmateriaalPakket,
} from '@/app/lesmateriaal/lesmateriaal-data';

export const DOWNLOAD_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 dagen

export type FulfillmentKind = 'pakket' | 'los' | 'compleet';

/** Interne product-entitlements (ATOMIC A). Alleen MOBILE_G / AI_H zijn dual-mapped. */
export type LesmateriaalEntitlement = 'MOBILE_G' | 'AI_H';

/**
 * Canonical package slug → bestaande storage/PACKAGE_SOURCE slug.
 * Fysieke private paden blijven onder de storage-slug (geen copy/move).
 * HARD: pakket-g blijft AI (storage = zichzelf), nooit MOBILE_G.
 */
const PACKAGE_STORAGE_ALIASES: Record<string, string> = {
  'pakket-g-telefoon': 'pakket-f-telefoon',
  'pakket-h-ai': 'pakket-g',
};

const ENTITLEMENT_BY_STORAGE_SLUG: Record<string, LesmateriaalEntitlement> = {
  'pakket-f-telefoon': 'MOBILE_G',
  'pakket-g': 'AI_H',
};

/** Resolves canonical of legacy package slug naar de authoritative PACKAGE_SOURCE-sleutel. */
export function resolveStoragePackageSlug(slug: string): string {
  return PACKAGE_STORAGE_ALIASES[slug] ?? slug;
}

export function entitlementForPackageSlug(slug: string): LesmateriaalEntitlement | null {
  return ENTITLEMENT_BY_STORAGE_SLUG[resolveStoragePackageSlug(slug)] ?? null;
}

export type ParsedReference = {
  kind: FulfillmentKind;
  email: string;
  slug?: string;
  lessonCode?: string;
};

export type DownloadAsset = {
  /** Stabiele id in tokens, bijv. a1-print */
  fileId: string;
  /** Relatief pad onder private/lesmateriaal-downloads/ */
  relativePath: string;
  label: string;
};

export type FulfillmentOrder = {
  kind: FulfillmentKind;
  email: string;
  label: string;
  price: number;
  assets: DownloadAsset[];
  slug?: string;
  lessonCode?: string;
};

/**
 * Bronpaden t.o.v. lesmateriaal/ — gebruikt door sync-script.
 * Catalogus = altijd *-v2.pdf. Sync valt tijdelijk terug op *-v1.pdf als v2 nog ontbreekt.
 */
export type SourceFileSpec = {
  fileId: string;
  sourceRel: string;
  destRel: string;
  label: string;
};

const PACKAGE_SOURCE: Record<
  string,
  { folder: string; lessons: { code: string; dir: string; printName: string; beamerName: string }[] }
> = {
  'pakket-a': {
    folder: 'A-telefoon-tablet',
    lessons: [
      {
        code: 'A1',
        dir: 'A1-toestel-leren-kennen',
        printName: 'SeniorEase-A1-Toestel-v2.pdf',
        beamerName: 'SeniorEase-A1-Beamer-v2.pdf',
      },
      {
        code: 'A2',
        dir: 'A2-apps',
        printName: 'SeniorEase-A2-Apps-v2.pdf',
        beamerName: 'SeniorEase-A2-Beamer-v2.pdf',
      },
      {
        code: 'A3',
        dir: 'A3-wifi',
        printName: 'SeniorEase-A3-Wifi-v2.pdf',
        beamerName: 'SeniorEase-A3-Beamer-v2.pdf',
      },
      {
        code: 'A4',
        dir: 'A4-fotos',
        printName: 'SeniorEase-A4-Fotos-v2.pdf',
        beamerName: 'SeniorEase-A4-Beamer-v2.pdf',
      },
    ],
  },
  'pakket-b': {
    folder: 'B-computer',
    lessons: [
      {
        code: 'B1',
        dir: 'B1-muis-toetsenbord',
        printName: 'SeniorEase-B1-Computer-bedienen-v2.pdf',
        beamerName: 'SeniorEase-B1-Beamer-v2.pdf',
      },
      {
        code: 'B2',
        dir: 'B2-vensters',
        printName: 'SeniorEase-B2-Werken-met-vensters-tabbladen-v2.pdf',
        beamerName: 'SeniorEase-B2-Beamer-v2.pdf',
      },
      {
        code: 'B3',
        dir: 'B3-bestanden-mappen',
        printName: 'SeniorEase-B3-Bestanden-opslaan-terugvinden-v2.pdf',
        beamerName: 'SeniorEase-B3-Beamer-v2.pdf',
      },
      {
        code: 'B4',
        dir: 'B4-downloaden-printen',
        printName: 'SeniorEase-B4-Downloaden-openen-printen-v2.pdf',
        beamerName: 'SeniorEase-B4-Beamer-v2.pdf',
      },
    ],
  },
  'pakket-c': {
    folder: 'C-whatsapp',
    lessons: [
      {
        code: 'C1',
        dir: 'C1-berichten',
        printName: 'SeniorEase-C1-Berichten-v2.pdf',
        beamerName: 'SeniorEase-C1-Beamer-v2.pdf',
      },
      {
        code: 'C2',
        dir: 'C2-fotos-documenten',
        printName: 'SeniorEase-C2-Fotos-Documenten-v2.pdf',
        beamerName: 'SeniorEase-C2-Beamer-v2.pdf',
      },
      {
        code: 'C3',
        dir: 'C3-bellen-groepen',
        printName: 'SeniorEase-C3-Bellen-Videobellen-v2.pdf',
        beamerName: 'SeniorEase-C3-Beamer-v2.pdf',
      },
      {
        code: 'C4',
        dir: 'C4-privacy-fraude',
        printName: 'SeniorEase-C4-Veilig-Prive-v2.pdf',
        beamerName: 'SeniorEase-C4-Beamer-v2.pdf',
      },
    ],
  },
  'pakket-d': {
    folder: 'D-veilig-online',
    lessons: [
      {
        code: 'D1',
        dir: 'D1-nepberichten',
        printName: 'SeniorEase-D1-Verdacht-Bericht-v2.pdf',
        beamerName: 'SeniorEase-D1-Beamer-v2.pdf',
      },
      {
        code: 'D2',
        dir: 'D2-phishing-links-qr',
        printName: 'SeniorEase-D2-Links-QR-v2.pdf',
        beamerName: 'SeniorEase-D2-Beamer-v2.pdf',
      },
      {
        code: 'D3',
        dir: 'D3-whatsapp-sms-fraude',
        printName: 'SeniorEase-D3-Telefoon-Helpdesk-v2.pdf',
        beamerName: 'SeniorEase-D3-Beamer-v2.pdf',
      },
      {
        code: 'D4',
        dir: 'D4-veilig-betalen',
        printName: 'SeniorEase-D4-Veilig-Betalen-v2.pdf',
        beamerName: 'SeniorEase-D4-Beamer-v2.pdf',
      },
    ],
  },
  'pakket-e': {
    folder: 'E-digid',
    lessons: [
      {
        code: 'E1',
        dir: 'E1-digid',
        printName: 'SeniorEase-E1-DigiD-v2.pdf',
        beamerName: 'SeniorEase-E1-Beamer-v2.pdf',
      },
      {
        code: 'E2',
        dir: 'E2-mijnoverheid',
        printName: 'SeniorEase-E2-MijnOverheid-v2.pdf',
        beamerName: 'SeniorEase-E2-Beamer-v2.pdf',
      },
      {
        code: 'E3',
        dir: 'E3-gemeente-belastingdienst',
        printName: 'SeniorEase-E3-Gemeente-Belastingdienst-v2.pdf',
        beamerName: 'SeniorEase-E3-Beamer-v2.pdf',
      },
      {
        code: 'E4',
        dir: 'E4-veilig-digid-berichten',
        printName: 'SeniorEase-E4-Berichtenbox-Overheid-v2.pdf',
        beamerName: 'SeniorEase-E4-Beamer-v2.pdf',
      },
    ],
  },
  'pakket-f-telefoon': {
    folder: 'F-internet-telefoon',
    lessons: [
      {
        code: 'Ft1',
        dir: 'Ft1-zoeken',
        printName: 'SeniorEase-G1-Zoeken-internet-v2.pdf',
        beamerName: 'SeniorEase-G1-Beamer-v2.pdf',
      },
      {
        code: 'Ft2',
        dir: 'Ft2-browser',
        printName: 'SeniorEase-G2-Websites-tabbladen-v2.pdf',
        beamerName: 'SeniorEase-G2-Beamer-v2.pdf',
      },
      {
        code: 'Ft3',
        dir: 'Ft3-qr-codes',
        printName: 'SeniorEase-G3-QR-website-v2.pdf',
        beamerName: 'SeniorEase-G3-Beamer-v2.pdf',
      },
      {
        code: 'Ft4',
        dir: 'Ft4-formulieren-downloads',
        printName: 'SeniorEase-G4-Online-formulieren-v2.pdf',
        beamerName: 'SeniorEase-G4-Beamer-v2.pdf',
      },
    ],
  },
  'pakket-f-computer': {
    folder: 'F-internet-computer',
    lessons: [
      {
        code: 'Fc1',
        dir: 'Fc1-zoeken-google',
        printName: 'SeniorEase-F1-Zoeken-internet-v2.pdf',
        beamerName: 'SeniorEase-F1-Beamer-v2.pdf',
      },
      {
        code: 'Fc2',
        dir: 'Fc2-websites-tabbladen',
        printName: 'SeniorEase-F2-Websites-tabbladen-v2.pdf',
        beamerName: 'SeniorEase-F2-Beamer-v2.pdf',
      },
      {
        code: 'Fc3',
        dir: 'Fc3-downloaden',
        printName: 'SeniorEase-F3-Downloaden-internet-v2.pdf',
        beamerName: 'SeniorEase-F3-Beamer-v2.pdf',
      },
      {
        code: 'Fc4',
        dir: 'Fc4-formulieren',
        printName: 'SeniorEase-F4-Online-formulieren-v2.pdf',
        beamerName: 'SeniorEase-F4-Beamer-v2.pdf',
      },
    ],
  },
  'pakket-g': {
    folder: 'G-ai',
    lessons: [
      {
        code: 'G1',
        dir: 'G1-wat-is-ai',
        printName: 'SeniorEase-G1-Wat-Is-AI-v2.pdf',
        beamerName: 'SeniorEase-G1-Beamer-v2.pdf',
      },
      {
        code: 'G2',
        dir: 'G2-ai-gebruiken',
        printName: 'SeniorEase-G2-AI-Gebruiken-v2.pdf',
        beamerName: 'SeniorEase-G2-Beamer-v2.pdf',
      },
      {
        code: 'G3',
        dir: 'G3-goede-vragen',
        printName: 'SeniorEase-G3-Goede-Vragen-v2.pdf',
        beamerName: 'SeniorEase-G3-Beamer-v2.pdf',
      },
      {
        code: 'G4',
        dir: 'G4-ai-veilig',
        printName: 'SeniorEase-G4-AI-Veilig-v2.pdf',
        beamerName: 'SeniorEase-G4-Beamer-v2.pdf',
      },
    ],
  },
};

function lessonAssets(
  slug: string,
  lesson: { code: string; dir: string; printName: string; beamerName: string },
  pkgFolder: string,
): SourceFileSpec[] {
  const idBase = lesson.code.toLowerCase();
  return [
    {
      fileId: `${idBase}-print`,
      sourceRel: path.join(pkgFolder, lesson.dir, 'pdf', lesson.printName),
      destRel: path.join(slug, `${idBase}-print.pdf`),
      label: `${lesson.code} — lesmateriaal (print)`,
    },
    {
      fileId: `${idBase}-beamer`,
      sourceRel: path.join(pkgFolder, lesson.dir, 'beamer', lesson.beamerName),
      destRel: path.join(slug, `${idBase}-beamer.pdf`),
      label: `${lesson.code} — beamer (optioneel)`,
    },
  ];
}

export function listAllSourceSpecs(): SourceFileSpec[] {
  const specs: SourceFileSpec[] = [];
  for (const [slug, cfg] of Object.entries(PACKAGE_SOURCE)) {
    for (const lesson of cfg.lessons) {
      specs.push(...lessonAssets(slug, lesson, cfg.folder));
    }
  }
  return specs;
}

export function assetsForSlug(slug: string): DownloadAsset[] {
  // Canonical aliases (pakket-g-telefoon / pakket-h-ai) delen assets + private paths
  // met de storage-slug (pakket-f-telefoon / pakket-g). Geen dubbele definities.
  const storageSlug = resolveStoragePackageSlug(slug);
  const cfg = PACKAGE_SOURCE[storageSlug];
  if (!cfg) return [];
  return cfg.lessons.flatMap((lesson) =>
    lessonAssets(storageSlug, lesson, cfg.folder).map((s) => ({
      fileId: s.fileId,
      relativePath: s.destRel.replace(/\\/g, '/'),
      label: s.label,
    })),
  );
}

/** Speciale fileId’s voor ZIP-bundels (niet als los PDF in de catalogus). */
export function zipFileIdForOrder(order: Pick<FulfillmentOrder, 'kind' | 'slug'>): string | null {
  if (order.kind === 'compleet') return 'zip-compleet';
  if (order.kind === 'pakket' && order.slug) return `zip-${order.slug}`;
  return null;
}

export function isZipBundleFileId(fileId: string): boolean {
  return fileId === 'zip-compleet' || /^zip-pakket-[a-z0-9-]+$/i.test(fileId);
}

export function assetsForZipBundle(fileId: string): DownloadAsset[] {
  if (fileId === 'zip-compleet') {
    const seenStorage = new Set<string>();
    const assets: DownloadAsset[] = [];
    for (const p of LESMATERIAAL_PAKKETTEN) {
      const storage = resolveStoragePackageSlug(p.slug);
      if (seenStorage.has(storage)) continue;
      seenStorage.add(storage);
      assets.push(...assetsForSlug(p.slug));
    }
    return assets;
  }
  const m = /^zip-(pakket-[a-z0-9-]+)$/i.exec(fileId);
  if (m) return assetsForSlug(m[1].toLowerCase());
  return [];
}

export function zipBundleLabel(fileId: string): string {
  if (fileId === 'zip-compleet') return 'Alles downloaden (ZIP) — compleet A–G';
  const m = /^zip-(pakket-[a-z0-9-]+)$/i.exec(fileId);
  if (m) {
    const storageSlug = resolveStoragePackageSlug(m[1].toLowerCase());
    const pakket = getPakketBySlug(storageSlug);
    if (pakket) return `Alles downloaden (ZIP) — pakket ${pakket.code}`;
  }
  return 'Alles downloaden (ZIP)';
}

export function zipDownloadFilename(fileId: string): string {
  if (fileId === 'zip-compleet') return 'SeniorEase-lesmateriaal-compleet-A-G.zip';
  const m = /^zip-(pakket-[a-z0-9-]+)$/i.exec(fileId);
  if (m) {
    const slug = m[1].toLowerCase();
    const folder = zipFolderNameForSlug(slug).replace(/\s+/g, '-');
    return `SeniorEase-${folder}.zip`;
  }
  return 'SeniorEase-lesmateriaal.zip';
}

export function zipBundleAvailable(fileId: string): boolean {
  const assets = assetsForZipBundle(fileId);
  if (assets.length === 0) return false;
  return assets.some((a) => resolveAssetAbsolutePath(a) !== null);
}

/** Mapnaam in de ZIP: "A - Telefoon en tablet - basis" i.p.v. pakket-a */
export function zipFolderNameForSlug(slug: string): string {
  const pakket = getPakketBySlug(resolveStoragePackageSlug(slug));
  if (!pakket) return slug;
  const title = pakket.title
    .replace(/—/g, '-')
    .replace(/&/g, 'en')
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return `${pakket.code} - ${title}`;
}

/** Pad binnen de ZIP met leesbare map- en bestandsnamen */
export function zipEntryPathForAsset(asset: DownloadAsset): string {
  const slash = asset.relativePath.replace(/\\/g, '/');
  const slug = slash.split('/')[0] || 'overig';
  const folder = zipFolderNameForSlug(slug);
  const base = asset.fileId.replace(/[^a-z0-9-]/gi, '') || 'bestand';
  const kind = base.endsWith('-beamer') ? 'Beamer' : 'Lesmateriaal';
  const code = base.replace(/-beamer$/i, '').replace(/-print$/i, '').toUpperCase();
  return `${folder}/SeniorEase-${code}-${kind}.pdf`;
}

function assetsForLesson(lessonCode: string): DownloadAsset[] {
  const code = lessonCode.toLowerCase();
  for (const [slug, cfg] of Object.entries(PACKAGE_SOURCE)) {
    const lesson = cfg.lessons.find((l) => l.code.toLowerCase() === code);
    if (lesson) {
      return lessonAssets(slug, lesson, cfg.folder).map((s) => ({
        fileId: s.fileId,
        relativePath: s.destRel.replace(/\\/g, '/'),
        label: s.label,
      }));
    }
  }
  return [];
}

export function parseClientReferenceId(raw: string | null | undefined): ParsedReference | null {
  if (!raw?.trim()) return null;
  const value = raw.trim();

  // Payment Links: alleen [A-Za-z0-9_-]. E-mail komt uit de Stripe-sessie.
  const modern = /^(pakket|los|compleet)_([A-Za-z0-9_-]+)$/.exec(value);
  if (modern) {
    const kind = modern[1] as FulfillmentKind;
    const mid = modern[2];
    if (kind === 'pakket' && mid.startsWith('pakket-')) {
      return { kind: 'pakket', slug: mid, email: '' };
    }
    if (kind === 'los' && mid) {
      return { kind: 'los', lessonCode: mid.toLowerCase(), email: '' };
    }
    if (kind === 'compleet' && mid === 'org') {
      return { kind: 'compleet', email: '' };
    }
    return null;
  }

  // Legacy (werkte niet via Payment Links: | en @ worden stil gedropt)
  const parts = value.split('|');
  if (parts.length < 3) return null;
  const [kind, mid, ...emailParts] = parts;
  const email = emailParts.join('|').trim().toLowerCase();
  if (!email.includes('@')) return null;

  if (kind === 'pakket' && mid.startsWith('pakket-')) {
    return { kind: 'pakket', slug: mid, email };
  }
  if (kind === 'los' && mid) {
    return { kind: 'los', lessonCode: mid.toLowerCase(), email };
  }
  if (kind === 'compleet' && mid === 'org') {
    return { kind: 'compleet', email };
  }
  return null;
}

export function resolveFulfillmentOrder(ref: ParsedReference): FulfillmentOrder | null {
  if (ref.kind === 'pakket' && ref.slug) {
    // Label bij voorkeur van de gevraagde slug (canonical of legacy);
    // assets via ATOMIC A storage-alias.
    const storageSlug = resolveStoragePackageSlug(ref.slug);
    const pakket = getPakketBySlug(ref.slug) ?? getPakketBySlug(storageSlug);
    if (!pakket) return null;
    const assets = assetsForSlug(ref.slug);
    if (assets.length === 0) return null;
    return {
      kind: 'pakket',
      email: ref.email,
      slug: ref.slug,
      label: `Pakket ${pakket.code}: ${pakket.title}`,
      price: PAKKET_PRIJS,
      assets,
    };
  }

  if (ref.kind === 'los' && ref.lessonCode) {
    const assets = assetsForLesson(ref.lessonCode);
    if (assets.length === 0) return null;
    const code = ref.lessonCode.toUpperCase();
    let title = code;
    for (const p of LESMATERIAAL_PAKKETTEN) {
      const les = p.lessons.find((l) => l.code.toLowerCase() === ref.lessonCode);
      if (les) {
        title = `${les.code}: ${les.title}`;
        break;
      }
    }
    return {
      kind: 'los',
      email: ref.email,
      lessonCode: ref.lessonCode,
      label: `Losse les — ${title}`,
      price: LOSSE_LES_PRIJS,
      assets,
    };
  }

  if (ref.kind === 'compleet') {
    // Dedup op storage-slug: canonical shop-entries mogen nooit dubbele assets geven
    // als ze ooit in LESMATERIAAL_PAKKETTEN zouden belanden.
    const seenStorage = new Set<string>();
    const assets: DownloadAsset[] = [];
    for (const p of LESMATERIAAL_PAKKETTEN) {
      const storage = resolveStoragePackageSlug(p.slug);
      if (seenStorage.has(storage)) continue;
      seenStorage.add(storage);
      assets.push(...assetsForSlug(p.slug));
    }
    return {
      kind: 'compleet',
      email: ref.email,
      label: 'Compleet organisatiepakket (A–G)',
      price: ORG_COMPLEET_PRIJS,
      assets,
    };
  }

  return null;
}

export function getDownloadsRoot(): string {
  return path.join(process.cwd(), 'private', 'lesmateriaal-downloads');
}

export function resolveAssetAbsolutePath(asset: DownloadAsset): string | null {
  const root = getDownloadsRoot();
  const abs = path.resolve(root, asset.relativePath);
  if (!abs.startsWith(path.resolve(root))) return null;
  if (!existsSync(abs)) return null;
  return abs;
}

export function findAssetByFileId(fileId: string): DownloadAsset | null {
  for (const spec of listAllSourceSpecs()) {
    if (spec.fileId === fileId) {
      return {
        fileId: spec.fileId,
        relativePath: spec.destRel.replace(/\\/g, '/'),
        label: spec.label,
      };
    }
  }
  return null;
}

function getDownloadSecret(): string {
  const secret = process.env.LESMATERIAAL_DOWNLOAD_SECRET?.trim();
  if (!secret) {
    throw new Error('LESMATERIAAL_DOWNLOAD_SECRET ontbreekt');
  }
  return secret;
}

/** Token = base64url(payload).base64url(hmac) */
export function createDownloadToken(params: {
  fileId: string;
  orderId: string;
  email: string;
  expiresAt?: number;
}): string {
  const exp = params.expiresAt ?? Math.floor(Date.now() / 1000) + DOWNLOAD_TTL_SECONDS;
  const payload = `${params.fileId}|${params.orderId}|${params.email.toLowerCase()}|${exp}`;
  const sig = createHmac('sha256', getDownloadSecret()).update(payload).digest('base64url');
  const body = Buffer.from(payload, 'utf8').toString('base64url');
  return `${body}.${sig}`;
}

export type VerifiedToken = {
  fileId: string;
  orderId: string;
  email: string;
  exp: number;
};

export function verifyDownloadToken(token: string): VerifiedToken | null {
  try {
    const [body, sig] = token.split('.');
    if (!body || !sig) return null;
    const payload = Buffer.from(body, 'base64url').toString('utf8');
    const expected = createHmac('sha256', getDownloadSecret()).update(payload).digest('base64url');
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const [fileId, orderId, email, expStr] = payload.split('|');
    const exp = Number(expStr);
    if (!fileId || !orderId || !email || !Number.isFinite(exp)) return null;
    if (Math.floor(Date.now() / 1000) > exp) return null;
    return { fileId, orderId, email, exp };
  } catch {
    return null;
  }
}

export function buildDownloadUrl(baseUrl: string, token: string): string {
  const url = new URL('/api/lesmateriaal/download', baseUrl);
  url.searchParams.set('token', token);
  return url.toString();
}

export function getSiteBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    'https://www.seniorease.nl'
  );
}

export function pakketLabel(pakket: LesmateriaalPakket): string {
  return `Pakket ${pakket.code}: ${pakket.title}`;
}
