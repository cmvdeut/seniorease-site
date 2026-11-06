/**
 * Server-side allowlist: client_reference_id → product/prijs/licentie/Stripe price env.
 * Vertrouw NOOIT productLabel of buyerType uit de browser.
 */

import { CHATGPT_LESSONS } from '@/app/lesmateriaal/chatgpt/chatgpt-data';
import {
  lessonDisplayCode,
  listRoutablePakketten,
} from '@/app/lesmateriaal/lesmateriaal-data';

export type CatalogBuyerType = 'consumer' | 'organization';

export type CheckoutCatalogEntry = {
  referenceId: string;
  productLabel: string;
  buyerType: CatalogBuyerType;
  /** Euro bedrag (documentatie/validatie); Stripe gebruikt price ID */
  amountEur: number;
  priceEnvKey: string;
  kind: 'ah_pakket' | 'ah_los' | 'ah_compleet' | 'chatgpt_een' | 'chatgpt_compleet' | 'chatgpt_org';
};

/** Shop + legacy-compat slugs (zelfde bestelpanel op /lesmateriaal/[slug]). */
const ALL_PAKKETTEN = listRoutablePakketten();

const AH_SLUGS = new Set(ALL_PAKKETTEN.map((p) => p.slug));

/** Bekende losse-les codes uit catalogus (lowercase). */
const AH_LESSON_CODES = new Set(
  ALL_PAKKETTEN.flatMap((p) => p.lessons.map((l) => l.code.toLowerCase())),
);

function pakketLabel(slug: string): string {
  const p = ALL_PAKKETTEN.find((x) => x.slug === slug);
  return p ? `Pakket ${p.code}: ${p.title}` : `Pakket ${slug}`;
}

function losLabel(code: string): string {
  for (const p of ALL_PAKKETTEN) {
    const les = p.lessons.find((l) => l.code.toLowerCase() === code);
    if (les) return `Losse les ${lessonDisplayCode(les)}: ${les.title}`;
  }
  return `Losse les ${code}`;
}

/**
 * Resolve allowlisted reference. Onbekend → null (fail-closed).
 */
export function resolveCheckoutCatalogEntry(
  referenceId: string,
): CheckoutCatalogEntry | null {
  const ref = referenceId.trim();
  if (!ref) return null;

  if (ref === 'compleet_org') {
    return {
      referenceId: ref,
      productLabel: 'Compleet organisatiepakket (A–H)',
      buyerType: 'organization',
      amountEur: 149,
      priceEnvKey: 'STRIPE_PRICE_LESMATERIAAL_COMPLEET',
      kind: 'ah_compleet',
    };
  }

  if (ref.startsWith('pakket_')) {
    const slug = ref.slice('pakket_'.length);
    if (!AH_SLUGS.has(slug)) return null;
    return {
      referenceId: ref,
      productLabel: pakketLabel(slug),
      buyerType: 'consumer',
      amountEur: 19.95,
      priceEnvKey: 'STRIPE_PRICE_LESMATERIAAL_PAKKET',
      kind: 'ah_pakket',
    };
  }

  if (ref.startsWith('los_')) {
    const code = ref.slice('los_'.length).toLowerCase();
    if (!AH_LESSON_CODES.has(code)) return null;
    return {
      referenceId: ref,
      productLabel: losLabel(code),
      buyerType: 'consumer',
      amountEur: 6.95,
      priceEnvKey: 'STRIPE_PRICE_LESMATERIAAL_LOS',
      kind: 'ah_los',
    };
  }

  if (/^chatgpt_a[1-8]$/.test(ref)) {
    const lesson = CHATGPT_LESSONS.find((l) => l.referenceId === ref);
    return {
      referenceId: ref,
      productLabel: lesson
        ? `ChatGPT — Onderwerp ${lesson.number}: ${lesson.title}`
        : `ChatGPT — ${ref}`,
      buyerType: 'consumer',
      amountEur: 9.95,
      priceEnvKey: 'STRIPE_PRICE_CHATGPT_EEN',
      kind: 'chatgpt_een',
    };
  }

  if (ref === 'chatgpt_b_compleet') {
    return {
      referenceId: ref,
      productLabel: 'ChatGPT — Compleet uitlegpakket',
      buyerType: 'consumer',
      amountEur: 49.95,
      priceEnvKey: 'STRIPE_PRICE_CHATGPT_COMPLEET',
      kind: 'chatgpt_compleet',
    };
  }

  if (ref === 'chatgpt_c_organisatie') {
    return {
      referenceId: ref,
      productLabel: 'ChatGPT — Organisatiepakket · één locatie',
      buyerType: 'organization',
      amountEur: 149,
      priceEnvKey: 'STRIPE_PRICE_CHATGPT_ORG',
      kind: 'chatgpt_org',
    };
  }

  return null;
}

export function getStripePriceIdForEntry(entry: CheckoutCatalogEntry): string | null {
  const raw = process.env[entry.priceEnvKey]?.trim();
  if (!raw || !raw.startsWith('price_')) return null;
  return raw;
}

/** Server-side: is de Stripe Price-env gezet voor dit product? */
export function isStripePriceConfigured(priceEnvKey: string): boolean {
  const raw = process.env[priceEnvKey]?.trim();
  return Boolean(raw && raw.startsWith('price_'));
}

/**
 * Sessions-modus: knoppen aan als Neon + secret + price IDs klaar zijn.
 * Payment Links blijven optioneel tot cutover.
 */
export function isSessionsCheckoutReady(): boolean {
  const neon = Boolean(
    process.env.DATABASE_URL?.trim() || process.env.NEON_DATABASE_URL?.trim(),
  );
  const secret = Boolean(process.env.STRIPE_SECRET_KEY?.trim());
  return neon && secret;
}
