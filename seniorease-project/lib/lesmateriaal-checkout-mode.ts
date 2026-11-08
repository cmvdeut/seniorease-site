/**
 * Feature flag: 'links' = bestaande Payment Links (default tot cutover).
 * 'sessions' = Stripe Checkout Sessions + Neon consent.
 */
export type LesmateriaalCheckoutMode = 'links' | 'sessions';

export function getLesmateriaalCheckoutMode(): LesmateriaalCheckoutMode {
  const raw = (
    process.env.LESMATERIAAL_CHECKOUT_MODE ||
    process.env.NEXT_PUBLIC_LESMATERIAAL_CHECKOUT_MODE ||
    'links'
  )
    .trim()
    .toLowerCase();
  return raw === 'sessions' ? 'sessions' : 'links';
}

export function isCheckoutSessionsMode(): boolean {
  return getLesmateriaalCheckoutMode() === 'sessions';
}
