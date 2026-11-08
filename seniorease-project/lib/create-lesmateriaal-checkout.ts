/**
 * Client helper: start Checkout Session (sessions-modus).
 */

import { DIGITAL_CONSENT_VERSION } from '@/lib/digital-delivery-consent-text';

export type CreateCheckoutResult =
  | { ok: true; url: string; sessionId: string; consentId: string }
  | { ok: false; error: string };

export async function createLesmateriaalCheckoutSession(params: {
  email: string;
  referenceId: string;
  consented: boolean;
}): Promise<CreateCheckoutResult> {
  try {
    const response = await fetch('/api/lesmateriaal/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: params.email,
        referenceId: params.referenceId,
        consented: params.consented,
        consentVersion: DIGITAL_CONSENT_VERSION,
      }),
    });
    const data = (await response.json()) as {
      ok?: boolean;
      url?: string;
      sessionId?: string;
      consentId?: string;
      error?: string;
    };
    if (!response.ok || !data.ok || !data.url || !data.sessionId || !data.consentId) {
      return {
        ok: false,
        error: data.error || 'Checkout kon niet worden gestart. Probeer het opnieuw.',
      };
    }
    return {
      ok: true,
      url: data.url,
      sessionId: data.sessionId,
      consentId: data.consentId,
    };
  } catch {
    return {
      ok: false,
      error: 'Geen verbinding met de betaalomgeving. Probeer het opnieuw.',
    };
  }
}
