import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Camera, ImageIcon, ShieldCheck } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo';
import { KIJK_EN_HELP_APP_URL } from '@/lib/kijk-en-help';

export const metadata: Metadata = buildPageMetadata({
  path: '/kijk-en-help',
  title: 'Kijk & Help – foto van uw scherm, uitleg in gewone taal',
  description:
    'Begrijpt u een melding, knop of scherm niet? Maak een foto of kies een screenshot. SeniorEase Kijk & Help legt rustig uit wat u ziet en wat u kunt doen.',
  keywords: [
    'screenshot uitleg',
    'scherm niet begrijpen',
    'melding uitleggen',
    'digitale hulp senioren',
    'kijk en help',
  ],
});

export default function KijkEnHelpPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          href="/"
          className="text-primary hover:underline font-medium mb-8 inline-block"
          style={{ minHeight: 'auto', fontSize: '1.1rem' }}
        >
          ← Terug naar home
        </Link>

        <p className="font-semibold text-primary mb-2" style={{ fontSize: '1.05rem' }}>
          SeniorEase
        </p>
        <h1 className="mb-5 leading-tight" style={{ fontSize: '2.5rem' }}>
          Kijk &amp; Help
        </h1>
        <p
          className="text-gray-800 font-semibold mb-4"
          style={{ fontSize: '1.45rem', lineHeight: 1.4 }}
        >
          Maak een foto van wat u niet begrijpt.
        </p>
        <p className="text-gray-700 mb-8" style={{ fontSize: '1.2rem', lineHeight: 1.65 }}>
          Ziet u een vreemde melding, betaallink, knop of instelling? Kies een screenshot of
          maak een foto. U krijgt daarna een rustige uitleg en een veilige volgende stap.
        </p>

        <div className="bg-white rounded-2xl border border-neutral-stone/50 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <a
              href={KIJK_EN_HELP_APP_URL}
              className="inline-flex items-center justify-center gap-2.5 font-bold text-white rounded-xl px-6 py-4 bg-primary hover:bg-primary-dark transition-colors shadow-sm flex-1"
              style={{ fontSize: '1.25rem', minHeight: '56px' }}
            >
              <ImageIcon size={24} strokeWidth={2} aria-hidden />
              Foto kiezen
            </a>
            <a
              href={KIJK_EN_HELP_APP_URL}
              className="inline-flex items-center justify-center gap-2.5 font-bold text-primary rounded-xl px-6 py-4 bg-white border-2 border-primary hover:bg-primary-soft transition-colors flex-1"
              style={{ fontSize: '1.25rem', minHeight: '56px' }}
            >
              <Camera size={24} strokeWidth={2} aria-hidden />
              Foto maken
            </a>
          </div>
          <p className="text-gray-500 text-center" style={{ fontSize: '1.05rem' }}>
            Gratis uitproberen · Uw afbeelding wordt niet door SeniorEase bewaard
          </p>
        </div>

        <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '1.4rem' }}>
          Voorbeelden van vragen
        </h2>
        <ul className="space-y-3 mb-10">
          {[
            'Wat betekent deze melding?',
            'Waar moet ik op tikken?',
            'Is dit veilig?',
          ].map((vraag) => (
            <li
              key={vraag}
              className="bg-white rounded-xl border border-neutral-stone/40 px-5 py-4 text-gray-800 font-medium"
              style={{ fontSize: '1.15rem' }}
            >
              “{vraag}”
            </li>
          ))}
        </ul>

        <div className="rounded-xl p-6 border border-primary/20 mb-8" style={{ background: '#FFFBF0' }}>
          <div className="flex gap-3 items-start">
            <ShieldCheck size={28} className="text-primary flex-shrink-0 mt-0.5" aria-hidden />
            <div>
              <p className="font-bold text-gray-900 mb-1" style={{ fontSize: '1.2rem' }}>
                Rustig en veilig
              </p>
              <p className="text-gray-700" style={{ fontSize: '1.1rem', lineHeight: 1.55 }}>
                De uitleg is een hulpmiddel, geen absolute veiligheidsgarantie. Twijfelt u?
                Vraag dan iemand die u vertrouwt om mee te kijken.
              </p>
            </div>
          </div>
        </div>

        <a
          href={KIJK_EN_HELP_APP_URL}
          className="inline-flex items-center gap-2.5 font-bold text-white rounded-xl px-8 py-4 bg-primary hover:bg-primary-dark transition-colors shadow-md"
          style={{ fontSize: '1.25rem', minHeight: '56px' }}
        >
          Open Kijk &amp; Help
          <ArrowRight size={22} strokeWidth={2} aria-hidden />
        </a>
      </div>
    </main>
  );
}
