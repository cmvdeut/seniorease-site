/**
 * Stripe Payment Links voor lesmateriaal (3 producten).
 *
 * .env.local:
 *   NEXT_PUBLIC_STRIPE_LESMATERIAAL_PAKKET=https://buy.stripe.com/...   (€19,95)
 *   NEXT_PUBLIC_STRIPE_LESMATERIAAL_LOS=https://buy.stripe.com/...       (€6,95)
 *   NEXT_PUBLIC_STRIPE_LESMATERIAAL_COMPLEET=https://buy.stripe.com/...  (€149)
 *
 * Legacy fallback pakket:
 *   NEXT_PUBLIC_STRIPE_LESMATERIAAL_DEFAULT=...
 *
 * Success URL in Stripe: https://seniorease.nl/lesmateriaal/bedankt
 * client_reference_id: pakket|pakket-g|email · los|g1|email · compleet|org|email
 */

export type LesmateriaalProductType = 'pakket' | 'los' | 'compleet';

const ENV_BY_TYPE: Record<LesmateriaalProductType, string[]> = {
  pakket: ['NEXT_PUBLIC_STRIPE_LESMATERIAAL_PAKKET', 'NEXT_PUBLIC_STRIPE_LESMATERIAAL_DEFAULT'],
  los: ['NEXT_PUBLIC_STRIPE_LESMATERIAAL_LOS'],
  compleet: ['NEXT_PUBLIC_STRIPE_LESMATERIAAL_COMPLEET'],
};

function slugToEnvKey(slug: string): string {
  return `NEXT_PUBLIC_STRIPE_LESMATERIAAL_${slug.toUpperCase().replace(/-/g, '_')}`;
}

function resolvePaymentLinkBase(type: LesmateriaalProductType, slug?: string): string | null {
  if (type === 'pakket' && slug) {
    const specific = process.env[slugToEnvKey(slug)];
    if (specific?.startsWith('https://buy.stripe.com/')) return specific;
  }

  for (const key of ENV_BY_TYPE[type]) {
    const base = process.env[key];
    if (base?.startsWith('https://buy.stripe.com/')) return base;
  }

  return null;
}

export function getLesmateriaalPaymentLinkBase(
  type: LesmateriaalProductType = 'pakket',
  slug?: string,
): string | null {
  return resolvePaymentLinkBase(type, slug);
}

export function isLesmateriaalCheckoutEnabled(
  type: LesmateriaalProductType = 'pakket',
  slug?: string,
): boolean {
  return getLesmateriaalPaymentLinkBase(type, slug) !== null;
}

export function buildLesmateriaalCheckoutUrl(params: {
  productType: LesmateriaalProductType;
  email: string;
  slug?: string;
  lessonCode?: string;
  /** Doorgeven vanaf server — client heeft env vars niet altijd beschikbaar */
  paymentLinkBase?: string | null;
}): string | null {
  const { productType, email, slug, lessonCode, paymentLinkBase } = params;
  const base =
    paymentLinkBase && paymentLinkBase.startsWith('https://buy.stripe.com/')
      ? paymentLinkBase
      : resolvePaymentLinkBase(productType, slug);
  if (!base) return null;

  const trimmed = email.trim();
  if (!trimmed) return null;

  let referenceId: string;
  switch (productType) {
    case 'pakket':
      if (!slug) return null;
      referenceId = `pakket|${slug}|${trimmed}`;
      break;
    case 'los':
      if (!lessonCode) return null;
      referenceId = `los|${lessonCode.toLowerCase()}|${trimmed}`;
      break;
    case 'compleet':
      referenceId = `compleet|org|${trimmed}`;
      break;
  }

  const url = new URL(base);
  url.searchParams.set('prefilled_email', trimmed);
  url.searchParams.set('client_reference_id', referenceId);
  return url.toString();
}

/** @deprecated Gebruik buildLesmateriaalCheckoutUrl({ productType: 'pakket', ... }) */
export function buildLesmateriaalCheckoutUrlLegacy(slug: string, email: string): string | null {
  return buildLesmateriaalCheckoutUrl({ productType: 'pakket', slug, email });
}

export const LESMATERIAAL_CHECKOUT_SESSION_KEY = 'seniorease-lesmateriaal-checkout';

export type LesmateriaalCheckoutSession = {
  email: string;
  productType: LesmateriaalProductType;
  slug?: string;
  lessonCode?: string;
  label: string;
  price: number;
  at: string;
  /** @deprecated legacy velden */
  pakketTitle?: string;
};

export function saveLesmateriaalCheckoutSession(
  data: Omit<LesmateriaalCheckoutSession, 'at'>,
): void {
  if (typeof window === 'undefined') return;
  const payload: LesmateriaalCheckoutSession = { ...data, at: new Date().toISOString() };
  sessionStorage.setItem(LESMATERIAAL_CHECKOUT_SESSION_KEY, JSON.stringify(payload));
}

export function readLesmateriaalCheckoutSession(): LesmateriaalCheckoutSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(LESMATERIAAL_CHECKOUT_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LesmateriaalCheckoutSession & { slug?: string; pakketTitle?: string };
    if (!parsed.productType && parsed.slug) {
      return {
        ...parsed,
        productType: 'pakket',
        label: parsed.pakketTitle ?? parsed.slug,
        price: 19.95,
      };
    }
    return parsed;
  } catch {
    return null;
  }
}
