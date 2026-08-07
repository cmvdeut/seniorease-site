import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/uitleg/mobiel-parkeren',
  title: 'Mobiel parkeren met uw telefoon – uitleg voor senioren',
  description:
    'Hoe betaalt u parkeren met een app op uw telefoon? Stap-voor-stap uitleg: app kiezen, zone invoeren, starten en stoppen — zonder muntjes.',
  keywords: ['mobiel parkeren', 'parkeerapp', 'Parkmobile', 'Yellowbrick', 'parkeren telefoon'],
});

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.seniorease.nl' },
    { '@type': 'ListItem', position: 2, name: 'Uitleg', item: 'https://www.seniorease.nl/uitleg' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Mobiel parkeren',
      item: 'https://www.seniorease.nl/uitleg/mobiel-parkeren',
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Mobiel parkeren met uw telefoon',
  description:
    'Parkeren betalen via een app: zonecode invoeren, sessie starten en later stoppen.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Kies een parkeerapp',
      text: 'Installeer een app die in uw gemeente werkt, bijvoorbeeld Parkmobile, Yellowbrick of de app van uw gemeente.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Maak een account',
      text: 'Vul uw kenteken en een betaalwijze in (vaak iDEAL of creditcard). Doe dit een keer rustig thuis.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Start het parkeren',
      text: 'Typ de zone- of gebiedscode van het bord bij de parkeerplaats en tik op Start.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Stop het parkeren',
      text: 'Als u wegrijdt, open de app en tik op Stop. Dan betaalt u alleen voor de tijd die u echt geparkeerd heeft.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Welke parkeerapp moet ik gebruiken?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dat hangt van uw gemeente af. Kijk op het bord bij de parkeerplaats of op de gemeentesite. Vaak ziet u Parkmobile, Yellowbrick of een lokale app.',
      },
    },
    {
      '@type': 'Question',
      name: 'Moet ik muntjes meenemen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nee, bij mobiel parkeren betaalt u via de app. Wel even controleren of het bord mobiel betalen toestaat.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat als ik vergeet te stoppen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zet een wekker of herinnering. Sommige apps sturen een melding. Stop altijd in de app als u wegrijdt, anders loopt de tijd door.',
      },
    },
  ],
};

export default function MobielParkerenPage() {
  return (
    <main className="min-h-screen bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-14 md:py-20">
        <Link
          href="/uitleg"
          className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
        >
          ← Terug naar alle uitleg
        </Link>

        <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] font-semibold leading-tight mb-3 max-w-2xl">
          Mobiel parkeren met uw telefoon
        </h1>
        <p className="text-navy/70 text-senior-base mb-12 leading-relaxed max-w-2xl">
          Parkeren betalen via een app — zonder muntjes of een papieren kaartje uit de automaat.
        </p>

        <div className="space-y-8 max-w-3xl">
          <section className="bg-slate rounded-senior border border-navy/8 p-7 sm:p-9">
            <h2 className="font-serif text-navy text-senior-lg font-semibold mb-3">
              Wat is mobiel parkeren?
            </h2>
            <p className="text-navy/80 text-senior-sm leading-relaxed">
              Bij veel parkeerplaatsen betaalt u met een app op uw telefoon. U vult uw kenteken en
              de zone in, start het parkeren, en stopt weer als u weggaat. Het bedrag wordt
              automatisch afgeschreven. Handig: u hoeft geen passend kleingeld te hebben.
            </p>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-7 sm:p-9">
            <h2 className="font-serif text-navy text-senior-lg font-semibold mb-3">
              Welke app moet ik gebruiken?
            </h2>
            <p className="text-navy/80 text-senior-sm leading-relaxed mb-4">
              Dat verschilt per gemeente of parkeerterrein. Op het bord bij de parkeerplaats staat
              vaak welke app(s) werken. Bekende apps zijn onder andere:
            </p>
            <ul className="space-y-2 text-navy/80 text-senior-sm">
              <li className="flex gap-2">
                <span className="text-gold font-bold shrink-0">•</span>
                <span>Parkmobile</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold shrink-0">•</span>
                <span>Yellowbrick</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold shrink-0">•</span>
                <span>ANWB Parkeren / EasyPark</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold shrink-0">•</span>
                <span>Soms een eigen app van uw gemeente</span>
              </li>
            </ul>
            <p className="text-navy/70 text-senior-sm leading-relaxed mt-4">
              Tip: installeer de app een keer thuis, en vul rustig uw gegevens in vóórdat u gaat
              parkeren.
            </p>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-7 sm:p-9">
            <h2 className="font-serif text-navy text-senior-lg font-semibold mb-5">
              Stap voor stap
            </h2>
            <ol className="space-y-5">
              {[
                {
                  t: 'App installeren',
                  d: 'Open de Play Store (Android) of App Store (iPhone). Zoek de app die op het bord staat en tik op Installeren.',
                },
                {
                  t: 'Account maken',
                  d: 'Maak een account met uw e-mailadres. Vul uw kenteken in en koppel een betaalwijze (vaak iDEAL of een bankpas).',
                },
                {
                  t: 'Zonecode lezen',
                  d: 'Op het blauwe of witte parkeerbord staat een zone- of gebiedscode (cijfers). Noteer die of typ hem direct in de app.',
                },
                {
                  t: 'Parkeren starten',
                  d: 'Controleer kenteken en zone. Tik op Start of Begin parkeren. Bewaar uw telefoon bij u — u moet later kunnen stoppen.',
                },
                {
                  t: 'Parkeren stoppen',
                  d: 'Als u terugkomt bij de auto: open de app en tik op Stop. Dan eindigt de betaling. Vergeet u te stoppen, dan loopt de teller door.',
                },
              ].map((stap, i) => (
                <li key={stap.t} className="bg-paper rounded-senior border border-navy/8 p-5">
                  <p className="font-semibold text-navy text-senior-sm mb-1">
                    <span className="text-gold mr-2">{i + 1}.</span>
                    {stap.t}
                  </p>
                  <p className="text-navy/75 text-senior-sm leading-relaxed pl-6">{stap.d}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-7 sm:p-9">
            <h2 className="font-serif text-navy text-senior-lg font-semibold mb-3">
              Handige tips
            </h2>
            <ul className="space-y-3 text-navy/80 text-senior-sm leading-relaxed">
              <li className="flex gap-2">
                <span className="text-gold font-bold shrink-0">•</span>
                <span>Zorg dat uw telefoon genoeg batterij heeft voordat u start.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold shrink-0">•</span>
                <span>
                  Controleer of de zone klopt — een verkeerde zone kan een boete betekenen.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold shrink-0">•</span>
                <span>
                  In de meeste parkeergarages werkt kentekenherkenning: de slagboom leest uw
                  kenteken bij binnenkomst en bij vertrek. U betaalt dan vaak aan een automaat of
                  via de app — controleer de borden bij de ingang.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold shrink-0">•</span>
                <span>
                  Mag u gratis parkeren (bijv. met een blauwe schijf)? Dan hoeft u de app niet te
                  gebruiken.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold shrink-0">•</span>
                <span>
                  Lukt de app niet? Zoek of er nog een automaat is, of vraag hulp in een winkel in
                  de buurt.
                </span>
              </li>
            </ul>
          </section>

          <p className="pt-2">
            <Link
              href="/uitleg"
              className="text-senior-sm font-semibold text-gold hover:text-gold-light"
            >
              ← Alle uitleg
            </Link>
            <span className="text-navy/30 mx-3">·</span>
            <Link
              href="/uitleg/google-maps"
              className="text-senior-sm font-semibold text-gold hover:text-gold-light"
            >
              Google Maps →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
