import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import LesmateriaalOrganisatieBestel from '@/app/components/LesmateriaalOrganisatieBestel';
import SeniorButton from '@/app/components/SeniorButton';
import { buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';
import { getLesmateriaalPaymentLinkBase } from '@/lib/lesmateriaal-checkout';
import {
  isSessionsCheckoutReady,
  isStripePriceConfigured,
} from '@/lib/lesmateriaal-checkout-catalog';
import {
  getLesmateriaalCheckoutMode,
  resolveCheckoutChannelAvailability,
} from '@/lib/lesmateriaal-checkout-mode';
import { LesmateriaalPakketten } from './LesmateriaalPakketten';
import { LesmateriaalPricing, LesmateriaalPrijsBadge } from './LesmateriaalPricing';
import { LesmateriaalFaq } from './LesmateriaalFaq';
import { LesmateriaalFeedback } from './LesmateriaalFeedback';
import { LesmateriaalLicentieBlok } from './LesmateriaalLicentieBlok';
import { LesmateriaalVerwachting } from './LesmateriaalVerwachting';
import { LesmateriaalDoeMiddag } from './LesmateriaalDoeMiddag';
import { LesmateriaalDoeMiddagIdeeen } from './LesmateriaalDoeMiddagIdeeen';
import { LesmateriaalChatgptHub } from './LesmateriaalChatgptHub';
import { LESMATERIAAL_PAKKETTEN } from './lesmateriaal-data';
import { ClipboardList, Users, Projector, Mail } from 'lucide-react';

/** Stripe-env op runtime (Vercel), niet alleen bij build inbakken */
export const dynamic = 'force-dynamic';

export const metadata = buildPageMetadata({
  path: '/lesmateriaal',
  title: 'Lesmateriaal digitale vaardigheden voor senioren',
  description:
    'Kant-en-klaar activiteiten- en lesmateriaal voor digitale vaardigheden van senioren. Voor bibliotheken, buurthuizen en vrijwilligers: Doe-Middag of cursus. PDF downloaden, printen en praktisch oefenen — geen online cursusplatform.',
  keywords: [
    'lesmateriaal digitale vaardigheden',
    'lesmateriaal senioren',
    'digitale vaardigheden senioren',
    'Doe-Middag voor ouderen',
    'activiteiten voor senioren',
    'activiteiten buurthuis',
    'computerles senioren',
    'lesmateriaal voor vrijwilligers',
    'bibliotheek',
    'buurthuis',
    'zelf lesgeven',
    'PDF',
    'printbaar lesmateriaal',
    'WhatsApp les',
    'DigiD les',
  ],
});

/** Alleen koopbare producten in CollectionPage ItemList (geen supportpagina’s). */
const hubProductItems = [
  ...LESMATERIAAL_PAKKETTEN.map((p) => ({
    name: `Pakket ${p.code}: ${p.title}`,
    path: `/lesmateriaal/${p.slug}`,
  })),
  {
    name: 'Praktisch werken met ChatGPT',
    path: '/lesmateriaal/chatgpt',
  },
];

const collectionSchema = buildCollectionPageSchema(
  'Lesmateriaal digitale vaardigheden voor senioren',
  'Kant-en-klaar activiteiten- en lesmateriaal (PDF) voor bibliotheken, buurthuizen en vrijwilligers: digitale lessen of een Doe-Middag voor senioren, met draaiboek en praktische oefeningen.',
  '/lesmateriaal',
  hubProductItems,
);

type HubProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LesmateriaalPage({ searchParams }: HubProps) {
  const params = (await searchParams) ?? {};
  const bestelRaw = params.bestel;
  const bestel =
    typeof bestelRaw === 'string' ? bestelRaw : Array.isArray(bestelRaw) ? bestelRaw[0] : '';
  const bestelLos = bestel === 'los';

  const checkoutMode = getLesmateriaalCheckoutMode();
  const compleetPaymentLinkBase = getLesmateriaalPaymentLinkBase('compleet');
  const compleetChannel = resolveCheckoutChannelAvailability({
    mode: checkoutMode,
    sessionsInfrastructureReady: isSessionsCheckoutReady(),
    priceConfigured: isStripePriceConfigured('STRIPE_PRICE_LESMATERIAAL_COMPLEET'),
    paymentLinkBase: compleetPaymentLinkBase,
  });
  const compleetCheckoutEnabled = compleetChannel.checkoutEnabled;

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

          <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] font-semibold leading-tight mb-3 max-w-3xl">
            Lesmateriaal digitale vaardigheden voor senioren
          </h1>
          <p className="text-navy/80 text-senior-base font-semibold leading-relaxed max-w-2xl mb-3">
            Organiseer eenvoudig een gezellige en leerzame Doe-Middag voor senioren.
          </p>
          <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-4">
            Met kant-en-klaar activiteiten- en lesmateriaal ontdekken senioren samen smartphone,
            tablet en computer — en oefenen ze meteen mee, op hun eigen apparaat en in hun eigen
            tempo.
          </p>
          <p className="text-navy/65 text-senior-sm leading-relaxed max-w-2xl mb-10">
            Per thema een PDF met draaiboek, oefentaken en zaalchecklist. Geschikt voor
            vrijwilligers. Ongeveer 90 minuten. Voor bibliotheken, buurthuizen en
            seniorenverenigingen.
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

          <LesmateriaalDoeMiddag />

          <LesmateriaalDoeMiddagIdeeen />

          <LesmateriaalVerwachting />

          <LesmateriaalChatgptHub />

          <LesmateriaalPakketten bestelLos={bestelLos} />

          <LesmateriaalFeedback variant="hub" className="mt-14 md:mt-16 mb-14 md:mb-16" />

          <LesmateriaalFaq />

          <div className="mb-16 md:mb-20">
            <LesmateriaalLicentieBlok />
          </div>
        </div>
      </section>

      <section id="organisatie-bestellen" className="bg-slate scroll-mt-24 py-16 md:py-20">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <h2 className="font-serif text-navy text-[1.5rem] sm:text-[1.75rem] font-semibold mb-3">
            Organisatiepakket bestellen
          </h2>
          <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-8">
            Compleet digitaal lesmateriaal A–H met <strong>locatie-licentie</strong>: één vestiging,
            meerdere lesgroepen. Inclusief printrechten en begeleidersgids.
          </p>
          <LesmateriaalOrganisatieBestel
            checkoutEnabled={compleetCheckoutEnabled}
            paymentLinkBase={compleetPaymentLinkBase}
            checkoutMode={checkoutMode}
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
