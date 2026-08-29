'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, Mail } from 'lucide-react';
import SeniorButton from './SeniorButton';
import {
  buildLesmateriaalCheckoutUrl,
  saveLesmateriaalCheckoutSession,
} from '@/lib/lesmateriaal-checkout';
import { formatPrijs, ORG_COMPLEET_PRIJS } from '@/app/lesmateriaal/lesmateriaal-data';

type Props = {
  checkoutEnabled: boolean;
  paymentLinkBase: string | null;
};

export default function LesmateriaalOrganisatieBestel({
  checkoutEnabled,
  paymentLinkBase,
}: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleBestellen() {
    setError('');
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setError('Vul een geldig e-mailadres in — daar sturen we de download naartoe.');
      return;
    }

    const url = buildLesmateriaalCheckoutUrl({
      productType: 'compleet',
      email: trimmed,
      paymentLinkBase,
    });
    if (!url) {
      setError('Online betalen is tijdelijk niet beschikbaar. Neem contact op.');
      return;
    }

    saveLesmateriaalCheckoutSession({
      email: trimmed,
      productType: 'compleet',
      label: 'Compleet organisatiepakket (A–G)',
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

          {error && (
            <p className="text-red-800 bg-red-50 border border-red-200 rounded-senior px-4 py-3 text-senior-sm">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleBestellen}
            className="inline-flex items-center justify-center gap-2 min-h-touch px-8 py-3.5 font-semibold text-white text-senior-sm bg-gold hover:bg-gold-light rounded-full border-2 border-navy/25 shadow-[0_3px_0_0_rgba(46,36,28,0.22)] transition-colors touch-manipulation"
          >
            <CreditCard size={20} aria-hidden />
            Direct bestellen — {formatPrijs(ORG_COMPLEET_PRIJS)}
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
