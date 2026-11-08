/**
 * Feature flag: 'links' = bestaande Payment Links (default tot cutover).
 * 'sessions' = Stripe Checkout Sessions + Neon consent.
 */
export type LesmateriaalCheckoutMode = 'links' | 'sessions';

export type CheckoutChannelAvailability = {
  /** true → UI/API moet Checkout Sessions gebruiken (geen Payment Link). */
  usesSessions: boolean;
  /** true → bestelknop aan. */
  checkoutEnabled: boolean;
};

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

/**
 * Eén modebeleid voor alle productcategorieën:
 * - sessions → alleen Checkout Sessions; geen stille Payment Link-fallback
 * - links → alleen Payment Links (ongewijzigd)
 */
export function resolveCheckoutChannelAvailability(params: {
  mode: LesmateriaalCheckoutMode;
  sessionsInfrastructureReady: boolean;
  priceConfigured: boolean;
  paymentLinkBase: string | null;
}): CheckoutChannelAvailability {
  const usesSessions =
    params.mode === 'sessions' &&
    params.sessionsInfrastructureReady &&
    params.priceConfigured;

  if (params.mode === 'sessions') {
    return { usesSessions, checkoutEnabled: usesSessions };
  }

  return {
    usesSessions: false,
    checkoutEnabled: params.paymentLinkBase !== null,
  };
}
