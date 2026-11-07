/**
 * Toegestane Stripe Checkout Sessions betaalmethoden (lesmateriaal).
 *
 * - Expliciete allowlist i.p.v. Dashboard-dynamic methods, zodat Klarna/Link/P24/e.d. niet verschijnen.
 * - Link hoort NIET in deze lijst: `excluded_payment_method_types` accepteert `link` niet;
 *   alleen weglaten uit `payment_method_types` schakelt Link uit.
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
