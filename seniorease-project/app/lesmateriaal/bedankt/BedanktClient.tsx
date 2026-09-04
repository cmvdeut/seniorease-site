'use client';

import { useEffect, useState } from 'react';
import SeniorButton from '@/app/components/SeniorButton';
import { readLesmateriaalCheckoutSession } from '@/lib/lesmateriaal-checkout';
import { getPakketBySlug } from '../lesmateriaal-data';
import { Mail, CheckCircle2, Download, Loader2 } from 'lucide-react';

type OrderStatus = {
  status: string;
  email?: string | null;
  label?: string;
  message?: string;
  kind?: string;
  downloads?: { label: string; url: string; available: boolean; primary?: boolean }[];
};

export default function BedanktClient() {
  const [localSession, setLocalSession] = useState<
    ReturnType<typeof readLesmateriaalCheckoutSession>
  >(null);
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    setLocalSession(readLesmateriaalCheckoutSession());
    const params = new URLSearchParams(window.location.search);
    const sid = params.get('session_id')?.trim() || null;
    setSessionId(sid);

    if (!sid) {
      setLoading(false);
      return;
    }

    fetch(`/api/lesmateriaal/order-status?session_id=${encodeURIComponent(sid)}`)
      .then(async (res) => {
        const data = (await res.json()) as OrderStatus & { error?: string };
        if (!res.ok) {
          setOrder({
            status: 'error',
            message:
              data.error ||
              'We konden de bestelling niet ophalen. Controleer uw e-mail voor de downloadlinks.',
          });
          return;
        }
        setOrder(data);
      })
      .catch(() => {
        setOrder({
          status: 'error',
          message:
            'Tijdelijke storing bij het ophalen van downloads. De e-mail met links zou wel moeten aankomen.',
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const pakket = localSession?.slug ? getPakketBySlug(localSession.slug) : undefined;

  function localOrderDescription(): string {
    if (!localSession) return '';
    switch (localSession.productType) {
      case 'compleet':
        return ' voor het compleet organisatiepakket (A–G)';
      case 'los':
        return localSession.label ? ` voor ${localSession.label}` : ' voor uw losse les';
      case 'pakket':
      default:
        if (pakket) return ` voor pakket ${pakket.code}: ${pakket.title}`;
        if (localSession.label) return ` voor ${localSession.label}`;
        return '';
    }
  }

  const email = order?.email || localSession?.email;
  const label = order?.label;
  const downloads = order?.downloads?.filter((d) => d.available) ?? [];
  const primaryDownloads = downloads.filter((d) => d.primary);
  const otherDownloads = downloads.filter((d) => !d.primary);
  const unavailable = order?.downloads?.filter((d) => !d.available) ?? [];
  const collapseOthers = otherDownloads.length > 6;

  return (
    <div className="max-w-xl mx-auto text-center">
      <CheckCircle2 className="text-gold mx-auto mb-6" size={56} strokeWidth={1.75} aria-hidden />

      <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.2rem] font-semibold leading-tight mb-4">
        Bedankt voor uw bestelling
      </h1>

      {loading ? (
        <p className="text-navy/70 text-senior-base leading-relaxed mb-8 inline-flex items-center gap-2 justify-center">
          <Loader2 className="animate-spin" size={20} aria-hidden />
          Bestelling controleren…
        </p>
      ) : (
        <>
          <p className="text-navy/70 text-senior-base leading-relaxed mb-2">
            {order?.status === 'paid' || order?.status === 'pending'
              ? order.message || 'We hebben uw betaling ontvangen.'
              : sessionId
                ? order?.message || 'We hebben uw bestelling ontvangen.'
                : `We hebben uw betaling ontvangen${localOrderDescription()}.`}
          </p>
          {email ? (
            <p className="text-navy/70 text-senior-base leading-relaxed mb-8">
              Downloadlinks gaan ook naar{' '}
              <strong className="text-navy">{email}</strong>. Controleer eventueel uw map
              ongewenste e-mail. Links zijn ongeveer 7 dagen geldig — sla de PDF’s op.
            </p>
          ) : (
            <p className="text-navy/70 text-senior-base leading-relaxed mb-8">
              Als uw betaling is gelukt, ontvangt u de PDF-download per e-mail. Controleer ook uw
              map ongewenste e-mail.
            </p>
          )}
        </>
      )}

      {label ? (
        <p className="text-navy font-semibold text-senior-sm mb-4">{label}</p>
      ) : null}

      {downloads.length > 0 ? (
        <div className="bg-paper rounded-senior border border-navy/8 p-6 text-left mb-8">
          <h2 className="font-serif text-navy font-semibold text-senior-base mb-3">
            Downloaden
          </h2>
          {primaryDownloads.length > 0 ? (
            <ul className="space-y-3 mb-4">
              {primaryDownloads.map((d) => (
                <li key={d.url}>
                  <a
                    href={d.url}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 font-semibold text-white text-senior-sm bg-gold hover:bg-gold-light rounded-full border-2 border-navy/25 shadow-[0_3px_0_0_rgba(46,36,28,0.22)]"
                  >
                    <Download size={18} aria-hidden />
                    {d.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          {otherDownloads.length > 0 ? (
            collapseOthers ? (
              <details className="group">
                <summary className="cursor-pointer text-navy/70 text-senior-sm font-semibold min-h-[44px] flex items-center list-none">
                  <span className="underline decoration-navy/30 underline-offset-2 group-open:no-underline">
                    Losse PDF’s tonen ({otherDownloads.length})
                  </span>
                </summary>
                <ul className="space-y-3 mt-3">
                  {otherDownloads.map((d) => (
                    <li key={d.url}>
                      <a
                        href={d.url}
                        className="inline-flex items-center gap-2 text-gold font-semibold text-senior-sm hover:text-gold-light min-h-[44px]"
                      >
                        <Download size={18} aria-hidden />
                        {d.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <ul className="space-y-3">
                {otherDownloads.map((d) => (
                  <li key={d.url}>
                    <a
                      href={d.url}
                      className="inline-flex items-center gap-2 text-gold font-semibold text-senior-sm hover:text-gold-light min-h-[44px]"
                    >
                      <Download size={18} aria-hidden />
                      {d.label}
                    </a>
                  </li>
                ))}
              </ul>
            )
          ) : null}
          {unavailable.length > 0 ? (
            <p className="text-navy/60 text-senior-sm mt-4 leading-relaxed">
              Sommige bestanden volgen per e-mail of zijn nog in voorbereiding. Mail ons bij
              vragen: info@seniorease.nl
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="bg-paper rounded-senior border border-navy/8 p-6 text-left mb-8">
        <h2 className="font-serif text-navy font-semibold text-senior-base mb-3">Wat zit erin?</h2>
        <ul className="space-y-2 text-navy/80 text-senior-sm list-disc pl-5">
          {localSession?.productType === 'compleet' || order?.kind === 'compleet' ? (
            <>
              <li>Alle themapakketten A–G (draaiboeken + oefentaken)</li>
              <li>Begeleidersgids en printrechten voor uw organisatie</li>
              <li>Beamer-PDF waar beschikbaar</li>
            </>
          ) : localSession?.productType === 'los' || order?.kind === 'los' ? (
            <>
              <li>Draaiboek voor één lesmiddag</li>
              <li>Deelnemerskaart en oefentaken voor die les</li>
              <li>Zaalchecklist en nazorgkaart</li>
            </>
          ) : (
            <>
              <li>Draaiboek voor de begeleider</li>
              <li>Deelnemerskaart en oefentaken (4 lessen)</li>
              <li>Zaalchecklist en nazorgkaart</li>
              <li>Beamer-PDF waar beschikbaar</li>
            </>
          )}
        </ul>
      </div>

      <p className="text-navy/60 text-senior-sm leading-relaxed mb-8">
        Officiële factuur op naam van uw organisatie? Neem contact op — het Stripe-bewijs is geen
        formele factuur.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <SeniorButton href="/lesmateriaal" variant="secondary">
          Meer lesmateriaal
        </SeniorButton>
        <SeniorButton href="/contact" icon={Mail}>
          Vraag of factuur
        </SeniorButton>
      </div>
    </div>
  );
}
