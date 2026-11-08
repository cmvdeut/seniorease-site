/**
 * Toegestane Stripe Checkout Sessions betaalmethoden (lesmateriaal).
 *
 * - Expliciete allowlist i.p.v. Dashboard-dynamic methods, zodat Klarna/P24/e.d. niet verschijnen.
 * - Link is géén gewone payment_method_type in de kaartflow: weglaten uit `payment_method_types`
 *   volstaat niet. Zet `wallet_options.link.display = 'never'` (zie helper hieronder).
 * - Apple Pay / Google Pay verschijnen automatisch via `card` waar beschikbaar (wallets).
 * - Wero = iDEAL-opvolger (public preview). Blijft in de allowlist.
 * - Als Live een methode uit de allowlist nog niet heeft geactiveerd, strip createLesmateriaalCheckoutSession
 *   die methode en probeert opnieuw (ideal/card blijven zo lang mogelijk).
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

/** Minimale set die op de meeste NL LIVE-accounts werkt. */
export const LESMATERIAAL_CHECKOUT_PAYMENT_METHOD_TYPES_MINIMAL = [
  'card',
  'ideal',
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

const INVALID_PAYMENT_METHOD_TYPE_RE =
  /payment method type provided:\s*([a-z0-9_]+)\s+is invalid/i;

function stripeErrorMessage(err: unknown): string {
  if (!err || typeof err !== 'object') return '';
  const e = err as { message?: string; raw?: { message?: string } };
  return String(e.message || e.raw?.message || '');
}

function stripeErrorParam(err: unknown): string {
  if (!err || typeof err !== 'object') return '';
  const e = err as { param?: string; raw?: { param?: string } };
  return String(e.param || e.raw?.param || '');
}

/** Welke payment_method_type Stripe in de fout noemt (bijv. wero, paypal). */
export function extractInvalidPaymentMethodType(err: unknown): string | null {
  const msg = stripeErrorMessage(err);
  const m = INVALID_PAYMENT_METHOD_TYPE_RE.exec(msg);
  return m?.[1]?.toLowerCase() || null;
}

export function isPaymentMethodTypesStripeError(err: unknown): boolean {
  if (stripeErrorParam(err) === 'payment_method_types') return true;
  const msg = stripeErrorMessage(err);
  return /payment method type provided:/i.test(msg);
}

/** @deprecated gebruik extractInvalidPaymentMethodType / isPaymentMethodTypesStripeError */
export function isWeroNotActivatedStripeError(err: unknown): boolean {
  return extractInvalidPaymentMethodType(err) === 'wero';
}

/** Link-wallet (autosave / “betaal met Link”) uit Checkout Sessions. */
export function getLesmateriaalCheckoutWalletOptions(): Stripe.Checkout.SessionCreateParams.WalletOptions {
  return {
    link: { display: 'never' },
  };
}

/**
 * Maakt een Checkout Session met de lesmateriaal-allowlist.
 * Niet-geactiveerde methoden (wero/paypal/…) worden één voor één weggelaten en opnieuw geprobeerd.
 * Laatste redmiddel: card + ideal.
 */
export async function createLesmateriaalCheckoutSession(
  stripe: Stripe,
  params: Stripe.Checkout.SessionCreateParams,
): Promise<Stripe.Checkout.Session> {
  let types: Array<Stripe.Checkout.SessionCreateParams.PaymentMethodType> =
    params.payment_method_types && params.payment_method_types.length > 0
      ? [...params.payment_method_types]
      : getLesmateriaalCheckoutPaymentMethodTypes();
  const wallet_options = params.wallet_options ?? getLesmateriaalCheckoutWalletOptions();

  let lastErr: unknown;
  let usedMinimalFallback = false;

  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      return await stripe.checkout.sessions.create({
        ...params,
        payment_method_types: types,
        wallet_options,
      });
    } catch (err) {
      lastErr = err;
      if (!isPaymentMethodTypesStripeError(err)) {
        throw err;
      }

      const invalid = extractInvalidPaymentMethodType(err);
      if (invalid && types.includes(invalid as Stripe.Checkout.SessionCreateParams.PaymentMethodType)) {
        console.warn(
          `Stripe payment method "${invalid}" not activated; retrying Checkout Session without it.`,
        );
        types = types.filter((t) => t !== invalid);
        if (types.length === 0) break;
        continue;
      }

      if (!usedMinimalFallback) {
        const minimal = [...LESMATERIAAL_CHECKOUT_PAYMENT_METHOD_TYPES_MINIMAL];
        const changed =
          types.length !== minimal.length || types.some((t, i) => t !== minimal[i]);
        if (changed) {
          usedMinimalFallback = true;
          console.warn(
            'Stripe payment_method_types rejected; retrying Checkout Session with card+ideal only.',
          );
          types = minimal;
          continue;
        }
      }

      throw err;
    }
  }

  throw lastErr instanceof Error
    ? lastErr
    : new Error('Stripe Checkout Session kon niet worden aangemaakt');
}
