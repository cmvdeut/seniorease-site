'use client';

import Link from 'next/link';
import { COMPANY, companyBtwLine } from '@/lib/company';

export default function VoorwaardenPage() {
  const lastUpdate = new Date().toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const btwLine = companyBtwLine();

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
          Deze voorwaarden gelden voor de website {COMPANY.brandName}, de app Mijn Bibliotheek en
          de digitale lesmaterialen die u via {COMPANY.brandName}.nl koopt. Privacy staat apart op
          de{' '}
          <Link href="/privacy" className="font-semibold text-gold underline underline-offset-2 hover:text-gold-light">
            privacy-pagina
          </Link>
          .
        </p>

        <div className="bg-paper rounded-senior border border-navy/10 p-6 sm:p-8 md:p-10 space-y-12">
          <p className="text-navy/55 text-senior-xs m-0">Laatste wijziging: {lastUpdate}</p>

          {/* 1 */}
          <section aria-labelledby="vw-1">
            <h2 id="vw-1" className="font-serif font-semibold text-navy mb-6 text-senior-xl leading-tight">
              1. Gebruik van de website en gratis hulpmiddelen
            </h2>
            <div className="space-y-6 text-navy/85 text-senior-sm leading-relaxed">
              <p>
                {COMPANY.brandName} is een merk van {COMPANY.legalName}. Door de website en de
                gratis gidsen, uitleg en tools te gebruiken, gaat u akkoord met deze voorwaarden.
              </p>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">1.1 Gebruik</h3>
                <p>
                  U mag de site gebruiken voor persoonlijk, niet-commercieel gebruik. Misbruik,
                  verstoring of schade aan systemen of andere bezoekers is niet toegestaan.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">1.2 Gratis content</h3>
                <p>
                  Uitleg, gidsen en tools op de website zijn gratis. Betaalde producten (Mijn
                  Bibliotheek via Google Play, en digitaal lesmateriaal via deze website) vallen
                  onder de aparte onderdelen hieronder.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">1.3 Geen professioneel advies</h3>
                <p>
                  {COMPANY.brandName} biedt praktische uitleg, geen medisch, juridisch, financieel
                  of ander professioneel advies. U blijft zelf verantwoordelijk voor uw keuzes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">1.4 Intellectueel eigendom</h3>
                <p>
                  Teksten, afbeeldingen, video’s, logo’s en lay-out zijn eigendom van{' '}
                  {COMPANY.legalName} of van de rechtmatige eigenaar. Kopiëren, verspreiden of
                  commercieel gebruik zonder schriftelijke toestemming is niet toegestaan.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">1.5 Externe diensten</h3>
                <p>
                  Soms verwijzen wij naar externe platforms (bijvoorbeeld YouTube of Facebook).
                  Daarvoor gelden de voorwaarden van die aanbieders.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-navy/15" />

          {/* 2 */}
          <section aria-labelledby="vw-2">
            <h2 id="vw-2" className="font-serif font-semibold text-navy mb-6 text-senior-xl leading-tight">
              2. Mijn Bibliotheek — app en webversie
            </h2>
            <div className="space-y-6 text-navy/85 text-senior-sm leading-relaxed">
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  2.1 Android-app (Google Play)
                </h3>
                <p className="mb-2">
                  De Android-app Mijn Bibliotheek is <strong>gratis te downloaden</strong> via de
                  Google Play Store. U kunt de app gratis installeren en uitproberen.
                </p>
                <p className="mb-2">
                  Voor <strong>onbeperkt aantal items</strong> (volledige functionaliteit) is een{' '}
                  <strong>eenmalige in-app-aankoop</strong> via Google Play nodig. Er is{' '}
                  <strong>geen abonnement</strong>.
                </p>
                <p className="mb-2">
                  Betaling en eventuele terugbetaling verlopen via Google Play, volgens de regels
                  van Google Play. De actuele prijs ziet u in de Play Store / in de app. Wij zien
                  geen betaalgegevens.
                </p>
                <p>
                  De licentie is voor persoonlijk gebruik en niet overdraagbaar naar andere
                  personen.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  2.2 Gratis webversie
                </h3>
                <p>
                  Op{' '}
                  <Link href="/bibliotheek" className="font-semibold text-gold underline underline-offset-2 hover:text-gold-light">
                    seniorease.nl/bibliotheek
                  </Link>{' '}
                  kunt u Mijn Bibliotheek gratis in de browser gebruiken. Dat is een aparte,
                  gratis webversie. Er loopt geen betaling via Stripe of Google Play voor dit
                  browsergebruik. Bibliotheekgegevens blijven lokaal op uw apparaat.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">2.3 Gegevens in de app</h3>
                <ul className="list-disc list-inside ml-1 space-y-1">
                  <li>E-mailadres: voor licentie en communicatie waar van toepassing</li>
                  <li>Collectiegegevens: lokaal op uw apparaat</li>
                  <li>In-app-betalingen: via Google Play</li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="border-navy/15" />

          {/* 3 */}
          <section aria-labelledby="vw-3">
            <h2 id="vw-3" className="font-serif font-semibold text-navy mb-6 text-senior-xl leading-tight">
              3. Digitale lesmaterialen en downloads
            </h2>
            <div className="space-y-6 text-navy/85 text-senior-sm leading-relaxed">
              <p>
                Via {COMPANY.brandName}.nl kunt u digitaal lesmateriaal kopen. Dit omvat onder
                meer:
              </p>
              <ul className="list-disc list-inside ml-1 space-y-1">
                <li>
                  <strong>Lesmaterialen A–H</strong> — themapakketten en losse lessen (PDF’s) en
                  het compleet organisatiepakket A–H
                </li>
                <li>
                  <strong>ChatGPT-lesmaterialen</strong> — losse onderwerpen, compleet uitlegpakket
                  en organisatiepakket (ZIP met PDF’s)
                </li>
              </ul>
              <p>
                U ontvangt <strong>digitale bestanden</strong> (PDF en/of ZIP, afhankelijk van het
                product). Er is <strong>geen fysieke verzending</strong>.
              </p>
              <p>
                U koopt een <strong>gebruiksrecht</strong>, geen eigendom van het auteursrecht.
                Gebruiksrechten staan op de productpagina en, waar meegeleverd, in de
                gebruikslicentie bij de download. Wij nemen geen rechten aan die daar niet staan.
              </p>
            </div>
          </section>

          <hr className="border-navy/15" />

          {/* 4 */}
          <section aria-labelledby="vw-4">
            <h2 id="vw-4" className="font-serif font-semibold text-navy mb-6 text-senior-xl leading-tight">
              4. Organisatielicenties en toegestaan gebruik
            </h2>
            <div className="space-y-6 text-navy/85 text-senior-sm leading-relaxed">
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  4.1 Persoonlijk of groepsgebruik (A–H themapakket / losse les; ChatGPT één onderwerp)
                </h3>
                <p>
                  Bedoeld voor eigen gebruik of één lesgroep. Commercieel hergebruik,
                  doorverkoop of openbaar online plaatsen is niet toegestaan zonder schriftelijke
                  toestemming.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  4.2 Compleet uitlegpakket ChatGPT
                </h3>
                <p>
                  Voor één groep, volgens de productinformatie op de ChatGPT-lesmateriaalpagina en
                  de meegeleverde gebruikslicentie.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">
                  4.3 Organisatielicentie — één locatie
                </h3>
                <p className="mb-2">
                  Het organisatiepakket A–H en het ChatGPT-organisatiepakket geven gebruiksrecht
                  voor <strong>één fysieke locatie</strong> (bijvoorbeeld één bibliotheekvestiging
                  of buurthuis), met meerdere lesgroepen en begeleiders op die locatie, voor zover
                  de productpagina dat beschrijft.
                </p>
                <p>
                  Niet toegestaan: doorverkoop, openbaar online delen, of structureel gebruik op
                  andere locaties zonder aparte licentie.
                </p>
              </div>
              <p>
                Er is <strong>geen automatische belofte</strong> van twaalf maanden gratis
                inhoudelijke updates. U ontvangt de versie die u koopt; eventuele correcties
                delen wij alleen als wij dat zo aanbieden.
              </p>
            </div>
          </section>

          <hr className="border-navy/15" />

          {/* 5 */}
          <section aria-labelledby="vw-5">
            <h2 id="vw-5" className="font-serif font-semibold text-navy mb-6 text-senior-xl leading-tight">
              5. Betaling, levering en downloadondersteuning
            </h2>
            <div className="space-y-6 text-navy/85 text-senior-sm leading-relaxed">
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">5.1 Betaling</h3>
                <p>
                  Digitale lesmaterialen op {COMPANY.brandName}.nl betaalt u via{' '}
                  <strong>Stripe</strong> (bijvoorbeeld iDEAL of creditcard). Mijn Bibliotheek
                  Android betaalt u via <strong>Google Play</strong> (in-app). Prijzen op de
                  website zijn inclusief btw, tenzij anders vermeld.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">5.2 Levering</h3>
                <p>
                  Na geslaagde betaling krijgt u toegang tot downloadlinks op de bedanktpagina en
                  per e-mail. Links zijn beperkt geldig; sla de bestanden op uw eigen computer op.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">5.3 Downloadhulp</h3>
                <p>
                  Werkt een link niet of ontbreekt een bestand? Mail{' '}
                  <a
                    href={`mailto:${COMPANY.emailSupport}`}
                    className="font-semibold text-gold underline underline-offset-2 hover:text-gold-light"
                  >
                    {COMPANY.emailSupport}
                  </a>
                  . Wij helpen u zo snel mogelijk opnieuw aan de juiste download.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">5.4 Factuur</h3>
                <p>
                  U ontvangt van Stripe een betalingsbewijs. Een officiële factuur op naam van uw
                  organisatie leveren wij <strong>op verzoek</strong>, en standaard wanneer dat
                  wettelijk verplicht is. Facturatie kan in de toekomst via e-Boekhouden.nl
                  verlopen.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-navy/15" />

          {/* 6 */}
          <section aria-labelledby="vw-6">
            <h2 id="vw-6" className="font-serif font-semibold text-navy mb-6 text-senior-xl leading-tight">
              6. Herroepingsrecht en wettelijke consumentenrechten
            </h2>
            <div className="space-y-6 text-navy/85 text-senior-sm leading-relaxed">
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">6.1 Consumenten — digitaal lesmateriaal</h3>
                <p className="mb-2">
                  Koopt u als consument digitaal lesmateriaal dat niet op een materiële drager
                  wordt geleverd, dan geldt in beginsel een wettelijke bedenktijd.
                </p>
                <p className="mb-2">
                  Omdat de download <strong>direct na betaling</strong> beschikbaar komt, vragen
                  wij vóór de betaling uw <strong>uitdrukkelijke toestemming</strong> om meteen te
                  leveren, én uw erkenning dat u het herroepingsrecht verliest zodra de levering is
                  begonnen — voor zover de wet dat toestaat. Die toestemming is niet vooraf
                  aangevinkt en wordt vastgelegd bij de bestelling. U ontvangt een bevestiging
                  per e-mail.
                </p>
                <p>
                  <strong>Zonder</strong> die toestemming starten wij de directe digitale levering
                  niet via deze checkout. Wij schrijven niet dat het herroepingsrecht “automatisch”
                  vervalt zonder deze stappen.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">6.2 Organisaties / zakelijke kopers</h3>
                <p>
                  Koopt u als organisatie of onderneming, dan geldt het herroepingsrecht voor
                  consumenten mogelijk niet. Neem bij twijfel contact op vóór aankoop. Rechten bij
                  gebrekkige digitale producten blijven van toepassing volgens de wet.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">6.3 Gebrekkige inhoud</h3>
                <p>
                  Is het bestand beschadigd, onvolledig of niet wat u redelijkerwijs mocht
                  verwachten? Dan behoudt u de wettelijke rechten die daarop van toepassing zijn.
                  Neem contact op via {COMPANY.emailSupport}.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 text-senior-base">6.4 Mijn Bibliotheek (Google Play)</h3>
                <p>
                  Voor de in-app-aankoop gelden de retour- en herroepingsregels van Google Play.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-navy/15" />

          {/* 7 */}
          <section aria-labelledby="vw-7">
            <h2 id="vw-7" className="font-serif font-semibold text-navy mb-6 text-senior-xl leading-tight">
              7. Contactgegevens en klachten
            </h2>
            <div className="space-y-4 text-navy/85 text-senior-sm leading-relaxed">
              <p className="m-0">
                <strong>{COMPANY.brandName}</strong> is een product van{' '}
                <strong>{COMPANY.legalName}</strong>
                <br />
                KvK: {COMPANY.kvk}
                <br />
                Vestigingsplaats: {COMPANY.city}
                {btwLine ? (
                  <>
                    <br />
                    {btwLine}
                  </>
                ) : null}
              </p>
              <p className="m-0">
                Algemeen:{' '}
                <a
                  href={`mailto:${COMPANY.emailGeneral}`}
                  className="font-semibold text-gold underline underline-offset-2 hover:text-gold-light"
                >
                  {COMPANY.emailGeneral}
                </a>
                <br />
                Bestellingen en downloads:{' '}
                <a
                  href={`mailto:${COMPANY.emailSupport}`}
                  className="font-semibold text-gold underline underline-offset-2 hover:text-gold-light"
                >
                  {COMPANY.emailSupport}
                </a>
                <br />
                Of via de{' '}
                <Link href="/contact" className="font-semibold text-gold underline underline-offset-2 hover:text-gold-light">
                  contactpagina
                </Link>
                .
              </p>
              <p className="m-0">
                Heeft u een klacht over een bestelling of download? Mail {COMPANY.emailSupport} met
                uw bestelgegevens. Wij reageren zo spoedig mogelijk, doorgaans binnen 1–2
                werkdagen.
              </p>
              <p className="text-navy/60 text-senior-xs m-0">
                Open punt: een volledig vestigingsadres (straat en huisnummer) is nog niet voor
                publicatie aangeleverd en staat daarom niet op deze pagina.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
