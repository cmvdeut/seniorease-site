/**
 * Toegestane Stripe Checkout Sessions betaalmethoden (lesmateriaal).
 *
 * - Expliciete allowlist i.p.v. Dashboard-dynamic methods, zodat Klarna/P24/e.d. niet verschijnen.
 * - Link is géén gewone payment_method_type in de kaartflow: weglaten uit `payment_method_types`
 *   volstaat niet. Zet `wallet_options.link.display = 'never'` (zie helper hieronder).
 * - Apple Pay / Google Pay verschijnen automatisch via `card` waar beschikbaar (wallets).
 * - Wero = iDEAL-opvolger (public preview). Blijft in de allowlist; als Live het nog niet
 *   heeft geactiveerd, maakt createLesmateriaalCheckoutSession één fallback zonder wero
 *   (ideal blijft). Zodra Wero in het Dashboard aan staat, gaat het automatisch mee.
 */

import type Stripe from 'stripe';

/** Gewenste Checkout Sessions betaalmethoden voor SeniorEase lesmateriaal. */
export const LESMATERIAAL_CHECKOUT_PAYMENT_METHOD_TYPES = [
  'card',
  'ideal',
  'wero',
  'bancontact',
  'paypal',
] as const satisfies ReadonlyArray<Stripe.Checkout.SessionCreateParams.PaymentMethodType>;

export type LesmateriaalCheckoutPaymentMethodType =
  (typeof LESMATERIAAL_CHECKOUT_PAYMENT_METHOD_TYPES)[number];

/** Methoden die we bewust niet willen tonen (documentatie / tests). */
export const LESMATERIAAL_CHECKOUT_BLOCKED_PAYMENT_METHODS = [
  'klarna',
  'link',
  'p24',
  'amazon_pay',
  'eps',
] as const;

export function getLesmateriaalCheckoutPaymentMethodTypes(): Array<
  Stripe.Checkout.SessionCreateParams.PaymentMethodType
> {
  return [...LESMATERIAAL_CHECKOUT_PAYMENT_METHOD_TYPES];
}

export function paymentMethodTypesWithoutWero(
  types: ReadonlyArray<Stripe.Checkout.SessionCreateParams.PaymentMethodType> = getLesmateriaalCheckoutPaymentMethodTypes(),
): Array<Stripe.Checkout.SessionCreateParams.PaymentMethodType> {
  return types.filter((t) => t !== 'wero');
}

/** Stripe weigert `wero` zolang de methode op het account niet is geactiveerd. */
export function isWeroNotActivatedStripeError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const e = err as {
    message?: string;
    param?: string;
    raw?: { message?: string; param?: string };
  };
  const msg = String(e.message || e.raw?.message || '');
  const param = e.param || e.raw?.param || '';
  if (!/wero/i.test(msg)) return false;
  if (param === 'payment_method_types') return true;
  return /invalid/i.test(msg) && /activat|dashboard|preview/i.test(msg);
}

/** Link-wallet (autosave / “betaal met Link”) uit Checkout Sessions. */
export function getLesmateriaalCheckoutWalletOptions(): Stripe.Checkout.SessionCreateParams.WalletOptions {
  return {
    link: { display: 'never' },
  };
}

/**
 * Maakt een Checkout Session met de lesmateriaal-allowlist.
 * Als Wero op het Stripe-account nog niet actief is: één retry zonder wero (ideal blijft).
 */
export async function createLesmateriaalCheckoutSession(
  stripe: Stripe,
  params: Stripe.Checkout.SessionCreateParams,
): Promise<Stripe.Checkout.Session> {
  const preferred =
    params.payment_method_types && params.payment_method_types.length > 0
      ? [...params.payment_method_types]
      : getLesmateriaalCheckoutPaymentMethodTypes();
  const wallet_options = params.wallet_options ?? getLesmateriaalCheckoutWalletOptions();

  try {
    return await stripe.checkout.sessions.create({
      ...params,
      payment_method_types: preferred,
      wallet_options,
    });
  } catch (err) {
    if (!isWeroNotActivatedStripeError(err) || !preferred.includes('wero')) {
      throw err;
    }
    console.warn(
      'Stripe Wero not activated; Checkout Session without wero (ideal remains). Enable Wero in Live Dashboard payment methods to include it.',
    );
    return await stripe.checkout.sessions.create({
      ...params,
      payment_method_types: paymentMethodTypesWithoutWero(preferred),
      wallet_options,
    });
  }
}
