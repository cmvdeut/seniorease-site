import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.seniorease.nl' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Uitleg',
      item: 'https://www.seniorease.nl/uitleg/boodschappen-bestellen',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Online boodschappen bestellen',
      item: 'https://www.seniorease.nl/uitleg/boodschappen-bestellen',
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Online boodschappen bestellen en laten bezorgen',
  description:
    'Stap voor stap boodschappen bestellen bij een online supermarkt: account, producten kiezen, bezorgmoment en betalen.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Open de webwinkel of app',
      text: 'Open de website of app van de supermarkt of online boodschappendienst die u wilt gebruiken.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Maak een account aan',
      text: 'Log in of maak een account aan met uw e-mailadres en een wachtwoord.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Voeg producten toe',
      text: 'Zoek producten via de zoekbalk of blader door categorieën. Voeg ze toe aan uw winkelwagen.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Kies bezorging en betaal',
      text: 'Kies een dag en tijdslot voor bezorging (of ophalen), controleer uw adres en betaal met iDEAL.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wat kost thuisbezorging van boodschappen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dat verschilt per winkel en per tijdslot. Soms betaalt u een paar euro bezorgkosten, soms is bezorging gratis vanaf een bepaald bestelbedrag. U ziet de kosten voordat u betaalt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe ver van tevoren moet ik bestellen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vaak tot een dag van tevoren. Op drukke momenten (vrijdag, zaterdag) zijn tijdslots snel vol — reserveer dan liever eerder.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat als een product niet leverbaar is?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ontbreekt een product, dan betaalt u daar meestal niet voor. Sommige winkels bieden een vervanger aan; u kunt dat vaak van tevoren aangeven.',
      },
    },
  ],
};

export const metadata = buildPageMetadata({
  path: '/uitleg/boodschappen-bestellen',
  title: 'Online boodschappen bestellen – thuisbezorging uitgelegd',
  description:
    'Hoe bestelt u boodschappen online? Stap-voor-stap: account, producten kiezen, bezorgmoment of ophalen, betalen met iDEAL.',
});

export default function BoodschappenBestellenPage() {
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

      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base"
            >
              ← Terug naar home
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              Online boodschappen bestellen
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Boodschappen laten bezorgen of ophalen — zonder de drukte van de winkel.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Stel, u wilt boodschappen zonder de deur uit
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
              Online boodschappen bestellen werkt bij de meeste supermarkten en
              boodschappendiensten ongeveer hetzelfde: u kiest producten, kiest een moment, en betaalt
              online. Het scherm kan er iets anders uitzien — de stappen herkent u bijna overal.
            </p>
            <p className="text-senior-base text-navy/80 leading-relaxed mb-6">
              Handig als lopen of tillen zwaar is, als u geen auto heeft, of als u de drukte wilt
              mijden. U betaalt soms bezorgkosten; die ziet u altijd vóór u afrekent.
            </p>
            <div className="bg-cream border border-navy/10 rounded-xl p-5 mb-6">
              <p className="text-senior-base font-bold text-navy mb-2">
                Welke winkels bezorgen bij u?
              </p>
              <p className="text-senior-base text-navy/80 leading-relaxed mb-3">
                Dat verschilt per postcode. Op een vergelijkingssite ziet u een overzicht van
                online boodschappendiensten, met bezorgkosten en minimale bestelbedragen. Vul daarna
                op de website van de winkel zelf uw postcode in — dan weet u zeker of bezorging bij
                u mogelijk is.
              </p>
              <p className="text-senior-base text-navy/80 leading-relaxed">
                Overzicht (geen SeniorEase):{' '}
                <a
                  href="https://maaltijdkorting.nl/blog/boodschappen-laten-bezorgen-kosten-vergelijken/"
                  className="font-semibold text-gold hover:text-gold-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  boodschappen laten bezorgen vergeleken
                </a>
                . Kosten en dekking kunnen veranderen — controleer altijd bij de winkel.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Bestellen', tekst: 'Zoeken en winkelwagen' },
                { label: 'Moment kiezen', tekst: 'Bezorgen of ophalen' },
                { label: 'Betalen', tekst: 'Meestal via iDEAL' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-cream border border-navy/10 rounded-xl p-4 text-center"
                >
                  <p className="text-senior-sm font-bold text-navy">{item.label}</p>
                  <p className="text-senior-sm text-navy/70 mt-1">{item.tekst}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Zo bestelt u boodschappen
            </h2>
            <ol className="space-y-6">
              {[
                {
                  stap: 'Open de webwinkel of app',
                  uitleg:
                    'Open de website of app van de winkel of dienst die u wilt gebruiken. Controleer het slotje in de adresbalk (https). Twijfelt u? Open de site via Google of vraag een helper.',
                },
                {
                  stap: 'Maak een account aan (eenmalig)',
                  uitleg:
                    "Tik op 'Inloggen' en daarna op 'Account aanmaken' (of vergelijkbare knoppen). Vul uw e-mailadres in en kies een wachtwoord. Dit doet u meestal maar één keer.",
                  tip: 'Schrijf e-mailadres en wachtwoord op en bewaar ze op een vaste, veilige plek.',
                },
                {
                  stap: 'Kies eerst een bezorg- of ophaalmoment',
                  uitleg:
                    'Veel winkels laten u eerst een dag en tijdslot kiezen. Vul uw postcode of adres in. Zo weet u of er plek is — en wat de bezorgkosten zijn.',
                  tip: 'Op drukke dagen zijn slots snel vol. Reserveer dan een paar dagen eerder.',
                },
                {
                  stap: 'Producten toevoegen',
                  uitleg:
                    'Zoek via de zoekbalk of blader door categorieën (brood, zuivel, groenten). Voeg producten toe met een plusje of “In winkelwagen”.',
                  tip: 'Heeft u vaste boodschappen? Sla producten op als favorieten of herhaal een eerdere bestelling, als de winkel dat aanbiedt.',
                },
                {
                  stap: 'Controleer uw winkelwagen',
                  uitleg:
                    'Open het winkelwagen-icoontje. Controleer producten, aantallen en het totaalbedrag. Haal weg wat u niet wilt.',
                },
                {
                  stap: 'Betaal met iDEAL',
                  uitleg:
                    'Ga naar afrekenen. Controleer adres en moment. Kies iDEAL en uw eigen bank. Bevestig de betaling zoals u dat gewend bent.',
                },
              ].map((item, i) => (
                <li key={item.stap} className="flex gap-5 items-start list-none">
                  <div className="flex-shrink-0 w-11 h-11 bg-gold text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
                    {i + 1}
                  </div>
                  <div className="pt-1 flex-1">
                    <p className="text-senior-base font-bold text-navy mb-1">{item.stap}</p>
                    <p className="text-senior-base text-navy/80 leading-relaxed">{item.uitleg}</p>
                    {item.tip && (
                      <p className="text-senior-sm text-navy/70 bg-paper border border-navy/10 rounded-lg px-3 py-2 mt-2">
                        {item.tip}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Bezorgen of ophalen
            </h2>
            <p className="text-senior-base text-navy/80 leading-relaxed mb-6">
              Bij boodschappen kiest u meestal één van deze opties (niet overal allebei):
            </p>
            <div className="space-y-5">
              {[
                {
                  titel: 'Thuisbezorging',
                  tekst:
                    'De bezorger brengt de boodschappen naar uw adres in het gekozen tijdslot. U heeft al online betaald — u hoeft aan de deur niets te pinnen. Noteer het tijdvak in uw agenda.',
                },
                {
                  titel: 'Ophalen in de winkel',
                  tekst:
                    'U bestelt online en haalt de tas op bij de winkel of een ophaalpunt. Handig als u wél kunt komen, maar niet wilt zoeken in de schappen.',
                },
              ].map((item) => (
                <div key={item.titel} className="bg-cream border border-navy/10 rounded-xl p-5">
                  <p className="text-senior-base font-bold text-navy mb-2">{item.titel}</p>
                  <p className="text-senior-base text-navy/80 leading-relaxed">{item.tekst}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Op de bezorgdag
            </h2>
            <ul className="space-y-3">
              {[
                'U krijgt vaak een bericht wanneer de bezorger onderweg is.',
                'De boodschappen komen tot aan uw deur (of tot het ophaalpunt).',
                'Controleer kort of alles er is. Ontbreekt er iets? Neem contact op via de app of klantenservice — bewaar uw bestelnummer.',
                'Koelverse producten meteen in de koelkast of vriezer zetten.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-senior-base text-navy/80">
                  <span className="text-gold font-bold mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-paper border border-navy/10 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-navy mb-4">Veilig bestellen</h2>
            <ul className="space-y-4">
              {[
                'Betaal bij voorkeur met iDEAL via uw eigen bank.',
                'Klik niet op betaallinks in vreemde e-mails of WhatsApp — open de winkel zelf.',
                'Controleer adres en tijdslot vóór u betaalt.',
                'Bewaar de bevestigingsmail of het overzicht in de app.',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-3 text-senior-base text-navy/80">
                  <span className="text-gold font-bold mt-1">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Veelgestelde vragen
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">Wat kost thuisbezorging?</p>
                <p className="text-senior-base text-navy/80">
                  Dat verschilt per winkel en tijdslot. Soms een paar euro, soms gratis vanaf een
                  bepaald bedrag. U ziet de kosten vóór u betaalt.
                </p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">
                  Hoe ver van tevoren moet ik bestellen?
                </p>
                <p className="text-senior-base text-navy/80">
                  Meestal tot een dag van tevoren. Op drukke momenten zijn slots snel vol — bestel op
                  tijd.
                </p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">
                  Wat als een product niet leverbaar is?
                </p>
                <p className="text-senior-base text-navy/80">
                  U betaalt dan meestal niet voor dat product. Soms wordt een vervanger aangeboden;
                  dat kunt u vaak van tevoren aangeven.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Meer uitleg over online winkelen
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/uitleg/online-bestellen"
                  className="text-senior-base font-semibold text-gold hover:text-gold-light"
                >
                  Online bestellen (pakketten) →
                </Link>
              </li>
              <li>
                <Link
                  href="/uitleg/online-retourneren"
                  className="text-senior-base font-semibold text-gold hover:text-gold-light"
                >
                  Iets terugsturen: hoe werkt dat? →
                </Link>
              </li>
              <li>
                <Link
                  href="/uitleg/veiligheid"
                  className="text-senior-base font-semibold text-gold hover:text-gold-light"
                >
                  Veilig op internet →
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
