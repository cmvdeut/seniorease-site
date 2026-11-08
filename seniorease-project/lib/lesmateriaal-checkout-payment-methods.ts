/**
 * Toegestane Stripe Checkout Sessions betaalmethoden (lesmateriaal).
 *
 * - Expliciete allowlist i.p.v. Dashboard-dynamic methods, zodat Klarna/P24/e.d. niet verschijnen.
 * - Link is géén gewone payment_method_type in de kaartflow: weglaten uit `payment_method_types`
 *   volstaat niet. Zet `wallet_options.link.display = 'never'` (zie helper hieronder).
 * - Apple Pay / Google Pay verschijnen automatisch via `card` waar beschikbaar (wallets).
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

/** Link-wallet (autosave / “betaal met Link”) uit Checkout Sessions. */
export function getLesmateriaalCheckoutWalletOptions(): Stripe.Checkout.SessionCreateParams.WalletOptions {
  return {
    link: { display: 'never' },
  };
}
