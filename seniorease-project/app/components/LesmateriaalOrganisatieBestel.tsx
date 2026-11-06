'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, Mail } from 'lucide-react';
import SeniorButton from './SeniorButton';
import DigitalDeliveryConsent from './DigitalDeliveryConsent';
import {
  buildLesmateriaalCheckoutUrl,
  saveLesmateriaalCheckoutSession,
} from '@/lib/lesmateriaal-checkout';
import { createLesmateriaalCheckoutSession } from '@/lib/create-lesmateriaal-checkout';
import { registerDigitalConsent } from '@/lib/register-digital-consent';
import type { LesmateriaalCheckoutMode } from '@/lib/lesmateriaal-checkout-mode';
import { formatPrijs, ORG_COMPLEET_PRIJS } from '@/app/lesmateriaal/lesmateriaal-data';

type Props = {
  checkoutEnabled: boolean;
  paymentLinkBase: string | null;
  checkoutMode?: LesmateriaalCheckoutMode;
};

export default function LesmateriaalOrganisatieBestel({
  checkoutEnabled,
  paymentLinkBase,
  checkoutMode = 'links',
}: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const sessions = checkoutMode === 'sessions';

  async function handleBestellen() {
    setError('');
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setError('Vul een geldig e-mailadres in — daar sturen we de download naartoe.');
      return;
    }
    if (!consent) {
      setError('Bevestig de toestemming voor directe digitale levering om verder te gaan.');
      return;
    }

    setBusy(true);

    if (sessions) {
      const created = await createLesmateriaalCheckoutSession({
        email: trimmed,
        referenceId: 'compleet_org',
        consented: true,
      });
      if (!created.ok) {
        setBusy(false);
        setError(created.error);
        return;
      }
      saveLesmateriaalCheckoutSession({
        email: trimmed,
        productType: 'compleet',
        label: 'Compleet organisatiepakket (A–H)',
        price: ORG_COMPLEET_PRIJS,
      });
      window.location.href = created.url;
      return;
    }

    const url = buildLesmateriaalCheckoutUrl({
      productType: 'compleet',
      email: trimmed,
      paymentLinkBase,
    });
    if (!url) {
      setBusy(false);
      setError('Online betalen is tijdelijk niet beschikbaar. Neem contact op.');
      return;
    }

    const registered = await registerDigitalConsent({
      email: trimmed,
      referenceId: 'compleet_org',
      productLabel: 'Compleet organisatiepakket (A–H)',
      buyerType: 'organization',
    });
    if (!registered.ok) {
      setBusy(false);
      setError(registered.error);
      return;
    }

    saveLesmateriaalCheckoutSession({
      email: trimmed,
      productType: 'compleet',
      label: 'Compleet organisatiepakket (A–H)',
      price: ORG_COMPLEET_PRIJS,
    });
    window.location.href = url;
  }

  return (
    <div className="max-w-xl space-y-6">
      {checkoutEnabled ? (
        <>
          <div>
            <label
              htmlFor="org-email"
              className="block font-semibold text-navy text-senior-sm mb-2"
            >
              E-mailadres organisatie
            </label>
            <input
              id="org-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="bibliotheek@gemeente.nl"
              className="w-full min-h-touch rounded-senior border-2 border-navy/15 bg-white px-4 py-3 text-senior-base text-navy focus:border-gold focus:outline-none"
            />
          </div>

          <DigitalDeliveryConsent
            checked={consent}
            onChange={setConsent}
            id="org-digital-consent"
            showOrganizationNote
          />

          {error && (
            <p className="text-red-800 bg-red-50 border border-red-200 rounded-senior px-4 py-3 text-senior-sm">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={() => void handleBestellen()}
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 min-h-touch px-8 py-3.5 font-semibold text-white text-senior-sm bg-gold hover:bg-gold-light rounded-full border-2 border-navy/25 shadow-[0_3px_0_0_rgba(46,36,28,0.22)] transition-colors touch-manipulation disabled:opacity-60"
          >
            <CreditCard size={20} aria-hidden />
            {busy ? 'Even geduld…' : `Direct bestellen — ${formatPrijs(ORG_COMPLEET_PRIJS)}`}
          </button>

          <p className="text-navy/50 text-senior-xs leading-relaxed">
            Veilig betalen via Stripe · iDEAL, creditcard ·{' '}
            <Link href="/voorwaarden" className="text-gold underline hover:text-gold-light">
              voorwaarden
            </Link>
          </p>
        </>
      ) : (
        <div className="rounded-senior bg-amber-50 border border-amber-200 px-5 py-4 text-senior-sm text-navy/80 leading-relaxed">
          Online bestellen wordt binnenkort geactiveerd. Tot die tijd kunt u het organisatiepakket
          aanvragen via contact.
        </div>
      )}

      <SeniorButton href="/contact" icon={Mail} variant="secondary">
        Liever offerte of factuur?
      </SeniorButton>
    </div>
  );
}
