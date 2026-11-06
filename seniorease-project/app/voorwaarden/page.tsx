'use client';

import Link from 'next/link';

export default function VoorwaardenPage() {
  const lastUpdate = new Date().toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-10 md:py-14">
        <Link
          href="/"
          className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex min-h-[48px] items-center text-senior-xs"
        >
          ← Terug naar home
        </Link>

        <h1 className="font-serif font-semibold text-navy mb-3 leading-tight text-senior-2xl">
          Algemene voorwaarden
        </h1>
        <p className="text-navy/70 mb-8 text-senior-sm leading-relaxed max-w-2xl">
          Hier leest u de voorwaarden voor de website SeniorEase en voor de app Mijn Bibliotheek.
          Ons privacybeleid staat apart op de privacy-pagina.
        </p>

        <div className="bg-paper rounded-senior border border-navy/10 p-6 sm:p-8 md:p-10 space-y-12">
          <p className="text-navy/55 text-senior-xs m-0">Laatste wijziging: {lastUpdate}</p>

          {/* 1. Website */}
          <section aria-labelledby="voorwaarden-website">
            <h2
              id="voorwaarden-website"
              className="font-serif font-semibold text-navy mb-6 text-senior-xl leading-tight"
            >
              1. Website SeniorEase
            </h2>

            <div className="space-y-6 text-navy/85 text-senior-sm leading-relaxed">
              <p>
                Welkom bij SeniorEase. Door onze website en de gratis gidsen, uitleg en tools te
                gebruiken, gaat u akkoord met deze voorwaarden. Lees ze daarom zorgvuldig door.
              </p>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  1.1 Gebruik van de website
                </h3>
                <p>
                  SeniorEase biedt informatie, uitlegfilmpjes en hulpmiddelen voor senioren. U mag
                  de site gebruiken voor persoonlijk, niet-commercieel gebruik. Het is niet
                  toegestaan de website te misbruiken, te verstoren of schade toe te brengen aan
                  onze systemen of aan andere bezoekers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  1.2 Gratis content en tools
                </h3>
                <p>
                  De uitleg, gidsen en tools op de website zijn gratis. Alleen de app Mijn
                  Bibliotheek is een apart product waarvoor kosten kunnen gelden; die kunt u wel
                  gratis uitproberen. Zie ook deel 2 van deze pagina.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  1.3 Gegevens en privacy
                </h3>
                <p>
                  Hoe wij omgaan met gegevens staat in ons privacybeleid:{' '}
                  <Link href="/privacy" className="font-semibold text-gold underline underline-offset-2 hover:text-gold-light">
                    Privacybeleid
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  1.4 Geen professioneel advies
                </h3>
                <p>
                  SeniorEase biedt informatie ter ondersteuning, maar geen medisch, juridisch,
                  financieel of ander professioneel advies. U blijft zelf verantwoordelijk voor
                  beslissingen die u neemt op basis van onze content.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  1.5 Intellectueel eigendom
                </h3>
                <p>
                  Teksten, afbeeldingen, video’s, logo’s en lay-out op deze website zijn eigendom
                  van SeniorEase (of van de rechtmatige eigenaar). Het is niet toegestaan deze
                  inhoud te kopiëren, te verspreiden of commercieel te gebruiken zonder
                  schriftelijke toestemming.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  1.6 Externe diensten
                </h3>
                <p>
                  Soms verwijzen wij door naar externe platforms, bijvoorbeeld YouTube of
                  Facebook. Voor die diensten gelden de voorwaarden van die aanbieders. SeniorEase
                  is niet verantwoordelijk voor de inhoud of werking van externe websites.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  1.7 Aansprakelijkheid
                </h3>
                <p>
                  Wij doen ons best om de website actueel, toegankelijk en veilig te houden, maar
                  kunnen niet garanderen dat alles altijd foutloos werkt. Voor zover de wet dat
                  toelaat is SeniorEase niet aansprakelijk voor schade die voortkomt uit het
                  gebruik van de website of de informatie daarop.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  1.8 Wijzigingen
                </h3>
                <p>
                  Wij kunnen deze voorwaarden wijzigen wanneer dat nodig is. De meest recente
                  versie staat altijd op deze pagina.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-navy/15" />

          {/* 2. Bibliotheek */}
          <section aria-labelledby="voorwaarden-bibliotheek">
            <h2
              id="voorwaarden-bibliotheek"
              className="font-serif font-semibold text-navy mb-6 text-senior-xl leading-tight"
            >
              2. Mijn Bibliotheek-app
            </h2>

            <div className="space-y-6 text-navy/85 text-senior-sm leading-relaxed">
              <p>
                Dit deel geldt specifiek voor de SeniorEase Bibliotheek-app (Mijn Bibliotheek).
              </p>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">2.1 Licentie</h3>
                <p>
                  Door aankoop van de SeniorEase Bibliotheek-app via de Google Play Store verkrijgt
                  u een levenslange licentie voor persoonlijk gebruik. De licentie is niet
                  overdraagbaar naar andere personen.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  2.2 Prijs en betaling
                </h3>
                <p>
                  De app kost eenmalig € 4,99. Betaling verloopt via de Google Play Store. Na
                  succesvolle betaling ontvangt u direct toegang tot de app. U ontvangt geen
                  fysiek product.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">2.3 Gebruik</h3>
                <p>
                  De app is bedoeld voor persoonlijk gebruik. U mag de app gebruiken om uw boeken-
                  en muziekcollectie bij te houden. Het is niet toegestaan de app te gebruiken voor
                  commerciële doeleinden zonder toestemming.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">2.4 Retourbeleid</h3>
                <p>
                  Het retourbeleid van Google Play is van toepassing. Binnen 2 uur na aankoop kunt
                  u de app terugbetaald krijgen via de Play Store. U kunt de app ook eerst gratis
                  uitproberen via de browser op seniorease.nl.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">2.5 Updates</h3>
                <p>
                  Toekomstige updates van de app zijn inbegrepen bij uw aankoop. Wij streven ernaar
                  de app regelmatig te verbeteren en nieuwe functies toe te voegen.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  2.6 Beschikbaarheid
                </h3>
                <p>
                  Wij streven ernaar de app beschikbaar te houden, maar kunnen niet garanderen dat
                  de app altijd zonder onderbrekingen beschikbaar is. Wij zijn niet aansprakelijk
                  voor eventueel gegevensverlies.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  2.7 Gegevens in de app
                </h3>
                <p className="mb-2">Voor de app geldt onder meer:</p>
                <ul className="list-disc list-inside ml-1 space-y-1">
                  <li>
                    E-mailadres: voor uw licentie en eventuele communicatie
                  </li>
                  <li>
                    Bibliotheekdata (boeken- en muziekcollectie): alleen lokaal op uw apparaat
                  </li>
                  <li>
                    Betalingen lopen via Google Play; wij zien geen betaalgegevens
                  </li>
                </ul>
                <p className="mt-3">
                  Meer over privacy op de hele SeniorEase-site leest u in het{' '}
                  <Link href="/privacy" className="font-semibold text-gold underline underline-offset-2 hover:text-gold-light">
                    privacybeleid
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  2.8 Wijzigingen app-voorwaarden
                </h3>
                <p>
                  Wij behouden ons het recht voor deze app-voorwaarden te wijzigen. Wijzigingen
                  worden bekendgemaakt via de website. Uw gebruik na wijzigingen betekent
                  acceptatie van de nieuwe voorwaarden.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-navy/15" />

          <section aria-labelledby="voorwaarden-contact">
            <h2
              id="voorwaarden-contact"
              className="font-serif font-semibold text-navy mb-4 text-senior-xl leading-tight"
            >
              3. Contact
            </h2>
            <p className="text-navy/85 text-senior-sm leading-relaxed m-0">
              Heeft u vragen over deze voorwaarden? Neem contact op via{' '}
              <a
                href="mailto:info@seniorease.nl"
                className="font-semibold text-gold underline underline-offset-2 hover:text-gold-light"
              >
                info@seniorease.nl
              </a>{' '}
              of via onze{' '}
              <Link href="/contact" className="font-semibold text-gold underline underline-offset-2 hover:text-gold-light">
                contactpagina
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
