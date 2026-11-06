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
import { registerDigitalConsent } from '@/lib/register-digital-consent';
import { createLesmateriaalCheckoutSession } from '@/lib/create-lesmateriaal-checkout';
import type { LesmateriaalCheckoutMode } from '@/lib/lesmateriaal-checkout-mode';
import {
  formatPrijs,
  lessonDisplayCode,
  LOSSE_LES_PRIJS,
  type LesmateriaalLes,
} from '@/app/lesmateriaal/lesmateriaal-data';

type Props = {
  slug: string;
  pakketCode: string;
  pakketTitle: string;
  price: number;
  lessons: LesmateriaalLes[];
  pakketCheckoutEnabled: boolean;
  losCheckoutEnabled: boolean;
  pakketPaymentLinkBase: string | null;
  losPaymentLinkBase: string | null;
  checkoutMode?: LesmateriaalCheckoutMode;
};

export default function LesmateriaalPakketBestelPanel({
  slug,
  pakketCode,
  pakketTitle,
  price,
  lessons,
  pakketCheckoutEnabled,
  losCheckoutEnabled,
  pakketPaymentLinkBase,
  losPaymentLinkBase,
  checkoutMode = 'links',
}: Props) {
  const [email, setEmail] = useState('');
  const [lessonCode, setLessonCode] = useState(lessons[0]?.code ?? '');
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const sessions = checkoutMode === 'sessions';

  const anyCheckoutEnabled = pakketCheckoutEnabled || losCheckoutEnabled;

  function validateEmail(): string | null {
    setError('');
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setError('Vul een geldig e-mailadres in — daar sturen we de download naartoe.');
      return null;
    }
    if (!consent) {
      setError('Bevestig de toestemming voor directe digitale levering om verder te gaan.');
      return null;
    }
    return trimmed;
  }

  async function handlePakketBestellen() {
    const trimmed = validateEmail();
    if (!trimmed) return;

    const label = `Pakket ${pakketCode}: ${pakketTitle}`;
    const referenceId = `pakket_${slug}`;
    setBusy(true);

    if (sessions) {
      const created = await createLesmateriaalCheckoutSession({
        email: trimmed,
        referenceId,
        consented: true,
      });
      if (!created.ok) {
        setBusy(false);
        setError(created.error);
        return;
      }
      saveLesmateriaalCheckoutSession({
        email: trimmed,
        productType: 'pakket',
        slug,
        label,
        price,
      });
      window.location.href = created.url;
      return;
    }

    const url = buildLesmateriaalCheckoutUrl({
      productType: 'pakket',
      slug,
      email: trimmed,
      paymentLinkBase: pakketPaymentLinkBase,
    });
    if (!url) {
      setBusy(false);
      setError('Online betalen is tijdelijk niet beschikbaar. Neem contact op.');
      return;
    }

    const registered = await registerDigitalConsent({
      email: trimmed,
      referenceId,
      productLabel: label,
      buyerType: 'consumer',
    });
    if (!registered.ok) {
      setBusy(false);
      setError(registered.error);
      return;
    }

    saveLesmateriaalCheckoutSession({
      email: trimmed,
      productType: 'pakket',
      slug,
      label,
      price,
    });
    window.location.href = url;
  }

  async function handleLosBestellen() {
    const trimmed = validateEmail();
    if (!trimmed) return;

    if (!lessonCode) {
      setError('Kies welke les u wilt bestellen.');
      return;
    }

    const les = lessons.find((l) => l.code === lessonCode);
    const label = les
      ? `Losse les ${lessonDisplayCode(les)}: ${les.title}`
      : `Losse les ${lessonCode}`;
    const referenceId = `los_${lessonCode.toLowerCase()}`;
    setBusy(true);

    if (sessions) {
      const created = await createLesmateriaalCheckoutSession({
        email: trimmed,
        referenceId,
        consented: true,
      });
      if (!created.ok) {
        setBusy(false);
        setError(created.error);
        return;
      }
      saveLesmateriaalCheckoutSession({
        email: trimmed,
        productType: 'los',
        lessonCode,
        label,
        price: LOSSE_LES_PRIJS,
      });
      window.location.href = created.url;
      return;
    }

    const url = buildLesmateriaalCheckoutUrl({
      productType: 'los',
      lessonCode,
      email: trimmed,
      paymentLinkBase: losPaymentLinkBase,
    });
    if (!url) {
      setBusy(false);
      setError('Online betalen is tijdelijk niet beschikbaar. Neem contact op.');
      return;
    }

    const registered = await registerDigitalConsent({
      email: trimmed,
      referenceId,
      productLabel: label,
      buyerType: 'consumer',
    });
    if (!registered.ok) {
      setBusy(false);
      setError(registered.error);
      return;
    }

    saveLesmateriaalCheckoutSession({
      email: trimmed,
      productType: 'los',
      lessonCode,
      label,
      price: LOSSE_LES_PRIJS,
    });
    window.location.href = url;
  }

  return (
    <div className="space-y-8">
      {anyCheckoutEnabled ? (
        <>
          <div>
            <label
              htmlFor="lesmateriaal-email"
              className="block font-semibold text-navy text-senior-sm mb-2"
            >
              Uw e-mailadres
            </label>
            <input
              id="lesmateriaal-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="uw@email.nl"
              className="w-full min-h-touch rounded-senior border-2 border-navy/15 bg-white px-4 py-3 text-senior-base text-navy focus:border-gold focus:outline-none"
            />
            <p className="text-navy/55 text-senior-xs mt-2">
              Na betaling ontvangt u de PDF-downloadlink op dit adres (meestal binnen enkele
              minuten).
            </p>
          </div>

          <DigitalDeliveryConsent
            checked={consent}
            onChange={setConsent}
            id="pakket-digital-consent"
          />

          {error && (
            <p className="text-red-800 bg-red-50 border border-red-200 rounded-senior px-4 py-3 text-senior-sm">
              {error}
            </p>
          )}

          {pakketCheckoutEnabled && (
            <div className="rounded-senior border border-navy/10 bg-white p-5 space-y-4">
              <div>
                <h3 className="font-serif text-navy font-semibold text-senior-base mb-1">
                  Heel pakket {pakketCode}
                </h3>
                <p className="text-navy/65 text-senior-sm">
                  Alle 4 lessen + beamer-PDF (waar beschikbaar).
                </p>
              </div>
              <button
                type="button"
                onClick={() => void handlePakketBestellen()}
                disabled={busy}
                className="w-full inline-flex items-center justify-center gap-2 min-h-touch px-8 py-3.5 font-semibold text-white text-senior-sm bg-gold hover:bg-gold-light rounded-full border-2 border-navy/25 shadow-[0_3px_0_0_rgba(46,36,28,0.22)] transition-colors touch-manipulation disabled:opacity-60"
              >
                <CreditCard size={20} aria-hidden />
                {busy ? 'Even geduld…' : `Bestellen — ${formatPrijs(price)}`}
              </button>
            </div>
          )}

          {losCheckoutEnabled && (
            <div className="rounded-senior border border-navy/10 bg-white p-5 space-y-4">
              <div>
                <h3 className="font-serif text-navy font-semibold text-senior-base mb-1">
                  Eén losse les
                </h3>
                <p className="text-navy/65 text-senior-sm mb-3">
                  Compleet lesmateriaal voor één lesmiddag.
                </p>
                <label htmlFor="lesmateriaal-les" className="sr-only">
                  Kies les
                </label>
                <select
                  id="lesmateriaal-les"
                  value={lessonCode}
                  onChange={(e) => setLessonCode(e.target.value)}
                  className="w-full min-h-touch rounded-senior border-2 border-navy/15 bg-white px-4 py-3 text-senior-base text-navy focus:border-gold focus:outline-none"
                >
                  {lessons.map((les) => (
                    <option key={les.code} value={les.code}>
                      {lessonDisplayCode(les)} — {les.title}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => void handleLosBestellen()}
                disabled={busy}
                className="w-full inline-flex items-center justify-center gap-2 min-h-touch px-8 py-3.5 font-semibold text-navy text-senior-sm bg-paper hover:bg-slate rounded-full border-2 border-navy/20 transition-colors touch-manipulation disabled:opacity-60"
              >
                <CreditCard size={20} aria-hidden />
                {busy ? 'Even geduld…' : `Losse les — ${formatPrijs(LOSSE_LES_PRIJS)}`}
              </button>
            </div>
          )}

          <p className="text-navy/50 text-senior-xs text-center leading-relaxed">
            Veilig betalen via Stripe · iDEAL, creditcard en meer ·{' '}
            <Link href="/voorwaarden" className="text-gold underline hover:text-gold-light">
              voorwaarden
            </Link>
          </p>
        </>
      ) : (
        <div className="rounded-senior bg-amber-50 border border-amber-200 px-5 py-4 text-senior-sm text-navy/80 leading-relaxed">
          Online bestellen wordt binnenkort geactiveerd. Tot die tijd: neem contact op — we sturen
          u het pakket per e-mail.
        </div>
      )}

      <div className="pt-2 border-t border-navy/10">
        <p className="text-navy/60 text-senior-sm mb-3">
          Alle thema&apos;s voor uw organisatie? Bekijk het compleet pakket op de{' '}
          <Link href="/lesmateriaal" className="text-gold underline hover:text-gold-light">
            lesmateriaal-pagina
          </Link>
          .
        </p>
        <SeniorButton href="/contact" icon={Mail} variant="secondary">
          Contact
        </SeniorButton>
      </div>
    </div>
  );
}