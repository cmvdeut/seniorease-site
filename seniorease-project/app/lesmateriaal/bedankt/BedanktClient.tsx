'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SeniorButton from '@/app/components/SeniorButton';
import { readLesmateriaalCheckoutSession } from '@/lib/lesmateriaal-checkout';
import { getPakketBySlug } from '../lesmateriaal-data';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function BedanktClient() {
  const [session, setSession] = useState<ReturnType<typeof readLesmateriaalCheckoutSession>>(null);

  useEffect(() => {
    setSession(readLesmateriaalCheckoutSession());
  }, []);

  const pakket = session?.slug ? getPakketBySlug(session.slug) : undefined;

  function orderDescription(): string {
    if (!session) return '';
    switch (session.productType) {
      case 'compleet':
        return ' voor het compleet organisatiepakket (A–G)';
      case 'los':
        return session.label ? ` voor ${session.label}` : ' voor uw losse les';
      case 'pakket':
      default:
        if (pakket) return ` voor pakket ${pakket.code}: ${pakket.title}`;
        if (session.label) return ` voor ${session.label}`;
        return '';
    }
  }

  return (
    <div className="max-w-xl mx-auto text-center">
      <CheckCircle2 className="text-gold mx-auto mb-6" size={56} strokeWidth={1.75} aria-hidden />

      <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.2rem] font-semibold leading-tight mb-4">
        Bedankt voor uw bestelling
      </h1>

      {session ? (
        <>
          <p className="text-navy/70 text-senior-base leading-relaxed mb-2">
            We hebben uw betaling ontvangen{orderDescription()}.
          </p>
          <p className="text-navy/70 text-senior-base leading-relaxed mb-8">
            De PDF&apos;s sturen we naar{' '}
            <strong className="text-navy">{session.email}</strong> — meestal binnen enkele minuten
            (maximaal 1 werkdag).
          </p>
        </>
      ) : (
        <p className="text-navy/70 text-senior-base leading-relaxed mb-8">
          Als uw betaling is gelukt, ontvangt u de PDF-download per e-mail. Controleer ook uw
          map ongewenste e-mail.
        </p>
      )}

      <div className="bg-paper rounded-senior border border-navy/8 p-6 text-left mb-8">
        <h2 className="font-serif text-navy font-semibold text-senior-base mb-3">Wat zit erin?</h2>
        <ul className="space-y-2 text-navy/80 text-senior-sm list-disc pl-5">
          {session?.productType === 'compleet' ? (
            <>
              <li>Alle themapakketten A–G (draaiboeken + oefentaken)</li>
              <li>Begeleidersgids en printrechten voor uw organisatie</li>
              <li>Beamer-PDF waar beschikbaar</li>
            </>
          ) : session?.productType === 'los' ? (
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

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <SeniorButton href="/lesmateriaal" variant="secondary">
          Meer lesmateriaal
        </SeniorButton>
        <SeniorButton href="/contact" icon={Mail}>
          Vraag stellen
        </SeniorButton>
      </div>
    </div>
  );
}
