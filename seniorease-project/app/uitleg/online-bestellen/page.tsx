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
      item: 'https://www.seniorease.nl/uitleg/online-bestellen',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Online bestellen',
      item: 'https://www.seniorease.nl/uitleg/online-bestellen',
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Iets online bestellen',
  description:
    'Stap voor stap iets bestellen in een webwinkel: zoeken, in het winkelmandje leggen, bezorgwijze kiezen en betalen.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Open de webwinkel',
      text: 'Open de website of app van de winkel waar u wilt bestellen.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Zoek een product',
      text: 'Typ in de zoekbalk wat u zoekt. Tik op een product om de prijs, beoordelingen en bezorgopties te bekijken.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Leg het in uw winkelmandje',
      text: 'Kies “In winkelmandje” of een vergelijkbare knop. Controleer daarna uw mandje.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Kies bezorging en betaal',
      text: 'Kies bezorging aan huis, een afhaalpunt of een pakketkluis. Betaal bij voorkeur met iDEAL via uw eigen bank.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is online bestellen veilig?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bij een bekende webwinkel met een slotje in de adresbalk (https) en betaling via iDEAL is bestellen meestal veilig. Twijfelt u? Laat een helper meekijken of kies een winkel die u kent.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat is het verschil tussen thuisbezorging, afhaalpunt en pakketkluis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Thuisbezorging komt naar uw adres. Bij een afhaalpunt haalt u het pakket op bij een winkel of servicepunt. Bij een pakketkluis (openbare box) opent u een kluisje met een code of QR-code op uw telefoon.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat als ik iets wil terugsturen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bij online aankopen heeft u wettelijk minimaal 14 dagen bedenktijd. Via “Mijn bestellingen” vraagt u een retourlabel aan en stuurt u het pakket terug.',
      },
    },
  ],
};

export const metadata = buildPageMetadata({
  path: '/uitleg/online-bestellen',
  title: 'Online bestellen – bestellen, bezorgen en terugsturen uitgelegd',
  description:
    'Hoe bestelt u veilig online? Stap-voor-stap: zoeken, betalen met iDEAL, bezorging aan huis, afhaalpunt of pakketkluis, en iets terugsturen.',
});

export default function OnlineBestellenPage() {
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
              Online bestellen
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Van webwinkel tot deurmat — bestellen, bezorgen en terugsturen, stap voor stap.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Stel, u wilt iets bestellen zonder naar de winkel te gaan
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
              Online bestellen betekent: u kiest een product op een website of in een app, betaalt,
              en het pakket komt naar u toe — of u haalt het zelf op. Dat werkt bij bijna alle
              webwinkels ongeveer hetzelfde.
            </p>
            <p className="text-senior-base text-navy/80 leading-relaxed mb-6">
              Het scherm kan er per winkel iets anders uitzien. De stappen hieronder herkent u
              bijna overal.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Bestellen', tekst: 'Zoeken, mandje, betalen' },
                { label: 'Bezorgen', tekst: 'Thuis, afhaalpunt of kluis' },
                { label: 'Terugsturen', tekst: 'Bedenktijd en retourlabel' },
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
              Zo bestelt u iets online
            </h2>
            <ol className="space-y-6">
              {[
                {
                  stap: 'Open de webwinkel',
                  uitleg:
                    'Open de website of app van de winkel. Controleer of er een slotje in de adresbalk staat (https). Twijfelt u of de site echt is? Vraag een helper of zoek de winkel via Google in plaats van via een link in een mail.',
                },
                {
                  stap: 'Zoek een product',
                  uitleg:
                    'Tik of klik in de zoekbalk bovenaan. Typ wat u zoekt, bijvoorbeeld “tuinschaar” of “sokken”. Open daarna één product om prijs, maat, beoordelingen en bezorginformatie te lezen.',
                  tip: 'Veel sterren en eerlijke beoordelingen geven vaak meer zekerheid. Twijfel? Kies een product met veel beoordelingen.',
                },
                {
                  stap: 'Leg het in uw winkelmandje',
                  uitleg:
                    'Kies de knop “In winkelmandje”, “In winkelwagen” of iets vergelijkbaars. U kunt daarna verder kijken of meteen naar bestellen gaan.',
                },
                {
                  stap: 'Ga naar bestellen',
                  uitleg:
                    'Open het winkelmandje (vaak rechtsboven). Controleer wat erin ligt en kies “Bestellen”, “Afrekenen” of “Doorgaan naar betalen”.',
                },
                {
                  stap: 'Inloggen of account aanmaken',
                  uitleg:
                    'De meeste winkels vragen een account. Log in met uw e-mailadres en wachtwoord, of maak gratis een account aan. Noteer uw wachtwoord op een veilige plek.',
                },
                {
                  stap: 'Kies hoe u het pakket wilt ontvangen',
                  uitleg:
                    'Kies bezorging aan huis, een afhaalpunt bij u in de buurt, of een pakketkluis (openbare box). Vul of controleer uw adres goed.',
                },
                {
                  stap: 'Betaal met iDEAL',
                  uitleg:
                    'Kies iDEAL en uw eigen bank. U komt in de vertrouwde betaalomgeving van uw bank. Bevestig de betaling zoals u dat gewend bent.',
                  tip: 'iDEAL is meestal duidelijker dan betalen met creditcard of “achteraf betalen”, omdat u direct via uw bank betaalt.',
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
              Drie manieren van bezorgen
            </h2>
            <p className="text-senior-base text-navy/80 leading-relaxed mb-6">
              Bij het afrekenen kiest u hoe het pakket bij u komt. Niet elke optie staat bij elke
              winkel — u ziet wat er mogelijk is.
            </p>
            <div className="space-y-5">
              {[
                {
                  titel: 'Aan huis',
                  tekst:
                    'De bezorger brengt het pakket naar uw adres. Staat er een tijdvak of “verwachte bezorgdag”? Noteer die. Bent u niet thuis, dan volgt vaak een kaartje, een buur, of een afhaalpunt.',
                },
                {
                  titel: 'Afhaalpunt',
                  tekst:
                    'U haalt het pakket op bij een servicepunt: bijvoorbeeld een winkel, kiosk of PostNL-punt. U krijgt een bericht wanneer het klaarligt. Neem een legitimatiebewijs mee als dat gevraagd wordt.',
                },
                {
                  titel: 'Pakketkluis (openbare box)',
                  tekst:
                    'Het pakket ligt in een kluisje bij een station, winkel of op straat. U krijgt een code of QR-code per e-mail of in de app. Open het kluisje, haal uw pakket eruit, en sluit de deur weer.',
                  tip: 'Handig als u niet zeker weet of u thuis bent. Bewaar de code tot u het pakket heeft opgehaald.',
                },
              ].map((item) => (
                <div key={item.titel} className="bg-cream border border-navy/10 rounded-xl p-5">
                  <p className="text-senior-base font-bold text-navy mb-2">{item.titel}</p>
                  <p className="text-senior-base text-navy/80 leading-relaxed">{item.tekst}</p>
                  {item.tip && (
                    <p className="text-senior-sm text-navy/70 bg-paper border border-navy/10 rounded-lg px-3 py-2 mt-3">
                      {item.tip}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Na uw bestelling
            </h2>
            <ul className="space-y-3">
              {[
                'U krijgt een bevestigingsmail met bestelnummer en verwachte bezorging.',
                'Vaak volgt een tweede mail of bericht als het pakket onderweg is, soms met een track & trace-link.',
                'Bewaar die mail: handig bij vragen of als u iets wilt terugsturen.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-senior-base text-navy/80">
                  <span className="text-gold font-bold mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Iets terugsturen
            </h2>
            <p className="text-senior-base text-navy/80 leading-relaxed mb-4">
              Past het niet, of valt het tegen? Bij online aankopen heeft u wettelijk{' '}
              <strong>minimaal 14 dagen bedenktijd</strong>. Veel winkels geven langer.
            </p>
            <p className="text-senior-base text-navy/80 leading-relaxed mb-4">
              Log in → open “Mijn bestellingen” → kies retourneren → volg de instructies voor het
              retourlabel. Daarna brengt u het pakket naar een afhaalpunt of pakketkluis.
            </p>
            <p className="text-senior-base text-navy/80 leading-relaxed">
              Uitgebreide stappen:{' '}
              <Link
                href="/uitleg/online-retourneren"
                className="font-semibold text-gold hover:text-gold-light"
              >
                Online bestelling terugsturen →
              </Link>
            </p>
          </section>

          <section className="bg-paper border border-navy/10 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-navy mb-4">Veilig online winkelen</h2>
            <ul className="space-y-4">
              {[
                'Controleer het slotje en https in de adresbalk voordat u inlogt of betaalt.',
                'Betaal bij voorkeur met iDEAL via uw eigen bank.',
                'Klik niet op “betaal nu”-links in vreemde e-mails of WhatsApp-berichten — open de winkel zelf.',
                'Bewaar de bevestigingsmail met bestelnummer.',
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
                <p className="text-senior-base font-bold text-navy mb-1">Is online bestellen veilig?</p>
                <p className="text-senior-base text-navy/80">
                  Bij een bekende webwinkel, met slotje in de adresbalk en betaling via iDEAL, is
                  bestellen meestal veilig. Twijfelt u? Vraag een helper of kies een winkel die u
                  kent.
                </p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">
                  Wat als ik niet thuis ben bij bezorging?
                </p>
                <p className="text-senior-base text-navy/80">
                  Kies dan vooraf een afhaalpunt of pakketkluis. Bij thuisbezorging volgt vaak een
                  bericht met een nieuw ophaalpunt als u niet open doet.
                </p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">
                  Wat als ik iets wil terugsturen?
                </p>
                <p className="text-senior-base text-navy/80">
                  U heeft minimaal 14 dagen bedenktijd. Meer uitleg:{' '}
                  <Link
                    href="/uitleg/online-retourneren"
                    className="text-gold font-bold hover:underline"
                  >
                    terugsturen uitgelegd
                  </Link>
                  .
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
                  href="/uitleg/boodschappen-bestellen"
                  className="text-senior-base font-semibold text-gold hover:text-gold-light"
                >
                  Online boodschappen bestellen →
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
