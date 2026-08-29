import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import LesmateriaalOrganisatieBestel from '@/app/components/LesmateriaalOrganisatieBestel';
import SeniorButton from '@/app/components/SeniorButton';
import { buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';
import { getLesmateriaalPaymentLinkBase } from '@/lib/lesmateriaal-checkout';
import { LesmateriaalPakketten } from './LesmateriaalPakketten';
import { LesmateriaalPricing, LesmateriaalPrijsBadge } from './LesmateriaalPricing';
import { LesmateriaalFaq } from './LesmateriaalFaq';
import { LESMATERIAAL_PAKKETTEN } from './lesmateriaal-data';
import { ClipboardList, Users, Projector, Mail } from 'lucide-react';

/** Stripe-env op runtime (Vercel), niet alleen bij build inbakken */
export const dynamic = 'force-dynamic';

export const metadata = buildPageMetadata({
  path: '/lesmateriaal',
  title: 'Lesmateriaal voor bibliotheken en cursusleiders',
  description:
    'Kant-en-klare les-PDF’s voor senioren: telefoon, WhatsApp, veilig online, DigiD, internet en AI. Draaiboek, oefentaken en beamer-slides. Vanaf €6,95 per les.',
  keywords: [
    'lesmateriaal senioren',
    'digitaal vaardigheden',
    'bibliotheek',
    'buurthuis',
    'cursus',
    'PDF',
    'WhatsApp les',
    'DigiD les',
  ],
});

const hubItems = [
  ...LESMATERIAAL_PAKKETTEN.map((p) => ({
    name: `Pakket ${p.code}: ${p.title}`,
    path: `/lesmateriaal/${p.slug}`,
  })),
  { name: 'Voor begeleiders', path: '/lesmateriaal/begeleiders' },
  { name: 'Woordenlijst', path: '/lesmateriaal/woordenlijst' },
  { name: 'Beamer (optioneel)', path: '/lesmateriaal/beamer' },
];

const collectionSchema = buildCollectionPageSchema(
  'SeniorEase lesmateriaal',
  'Printbare les-PDF’s voor rustige doe-middagen met senioren.',
  '/lesmateriaal',
  hubItems,
);

export default function LesmateriaalPage() {
  const compleetPaymentLinkBase = getLesmateriaalPaymentLinkBase('compleet');
  const compleetCheckoutEnabled = compleetPaymentLinkBase !== null;

  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={collectionSchema} />

      <section className="bg-cream">
        <div className="max-w-senior mx-auto px-5 sm:px-6 pt-14 md:pt-20 pb-10 md:pb-12">
          <Link
            href="/"
            className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
          >
            ← Terug naar home
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <LesmateriaalPrijsBadge />
          </div>

          <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] font-semibold leading-tight mb-5 max-w-3xl">
            Lesmateriaal voor rustige doe-middagen.
          </h1>
          <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-10">
            Kant-en-klaar printpakket: draaiboek voor u, oefentaken voor deelnemers, zaalchecklist
            en nazorgkaart. Elke les 90 minuten — deelnemers oefenen op hun{' '}
            <strong>eigen</strong> telefoon, tablet of computer.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {[
              { Icon: ClipboardList, label: 'Draaiboek + oefentaken' },
              { Icon: Users, label: 'Max. 8–10 deelnemers' },
              { Icon: Projector, label: 'Beamer optioneel' },
              { Icon: Mail, label: 'Gratis gidsen op de site' },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-senior bg-paper border border-navy/8 px-4 py-4"
              >
                <Icon className="text-gold shrink-0" size={22} aria-hidden />
                <span className="text-navy text-senior-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>

          <LesmateriaalPricing />

          <LesmateriaalFaq />

          <LesmateriaalPakketten />
        </div>
      </section>

      <section id="organisatie-bestellen" className="bg-slate scroll-mt-24 py-16 md:py-20">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <h2 className="font-serif text-navy text-[1.5rem] sm:text-[1.75rem] font-semibold mb-3">
            Organisatiepakket bestellen
          </h2>
          <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-8">
            Alle thema&apos;s A–G in één keer — inclusief printrechten en begeleidersgids. Liever
            eerst overleggen? Dat kan ook.
          </p>
          <LesmateriaalOrganisatieBestel
            checkoutEnabled={compleetCheckoutEnabled}
            paymentLinkBase={compleetPaymentLinkBase}
          />
          <div className="flex flex-wrap gap-4 mt-8">
            <SeniorButton href="/lesmateriaal/begeleiders" icon={Users}>
              Voor begeleiders
            </SeniorButton>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <h2 className="font-serif text-navy text-[1.5rem] font-semibold mb-6">Ook handig</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/lesmateriaal/woordenlijst"
              className="rounded-senior bg-paper border border-navy/8 hover:border-gold p-6 transition-colors group"
            >
              <h3 className="font-serif text-navy font-semibold text-senior-base group-hover:text-gold mb-2">
                Woordenlijst
              </h3>
              <p className="text-navy/65 text-senior-sm">
                Downloaden = lokaal opslaan — digitale termen in gewone taal.
              </p>
            </Link>
            <Link
              href="/lesmateriaal/beamer"
              className="rounded-senior bg-paper border border-navy/8 hover:border-gold p-6 transition-colors group"
            >
              <h3 className="font-serif text-navy font-semibold text-senior-base group-hover:text-gold mb-2">
                Beamer (optioneel)
              </h3>
              <p className="text-navy/65 text-senior-sm">
                Oefentaken groot op scherm — print blijft altijd de basis.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
