/**
 * Client-aanroep vóór Stripe-redirect: registreert toestemming server-side.
 */

import type { DigitalConsentBuyerType } from '@/lib/digital-delivery-consent';

export type RegisterConsentResult =
  | { ok: true; consentId: string; consentedAt: string }
  | { ok: false; error: string };

export async function registerDigitalConsent(params: {
  email: string;
  referenceId: string;
  productLabel: string;
  buyerType?: DigitalConsentBuyerType;
}): Promise<RegisterConsentResult> {
  try {
    const response = await fetch('/api/lesmateriaal/digital-consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: params.email,
        referenceId: params.referenceId,
        productLabel: params.productLabel,
        buyerType: params.buyerType ?? 'consumer',
        consented: true,
      }),
    });
    const data = (await response.json()) as {
      ok?: boolean;
      consentId?: string;
      consentedAt?: string;
      error?: string;
    };
    if (!response.ok || !data.ok || !data.consentId || !data.consentedAt) {
      return {
        ok: false,
        error: data.error || 'Toestemming kon niet worden vastgelegd. Probeer het opnieuw.',
      };
    }
    return { ok: true, consentId: data.consentId, consentedAt: data.consentedAt };
  } catch {
    return {
      ok: false,
      error: 'Toestemming kon niet worden vastgelegd. Controleer uw verbinding en probeer opnieuw.',
    };
  }
}
