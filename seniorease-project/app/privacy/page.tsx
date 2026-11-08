'use client';

import Link from 'next/link';
import { COMPANY } from '@/lib/company';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Privacybeleid
            </h1>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <div className="prose max-w-none">
              <div className="mb-8">
                <p className="text-senior-base text-gray-700 mb-4">
                  Laatst bijgewerkt:{' '}
                  {new Date().toLocaleDateString('nl-NL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-senior-base text-gray-700">
                  {COMPANY.brandName} (merk van {COMPANY.legalName}) hecht aan uw privacy. Hieronder
                  staat welke gegevens wij verwerken bij de website, Mijn Bibliotheek, digitale
                  lesmaterialen en contact.
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">
                  1. Gegevens die wij verzamelen
                </h2>
                <div className="space-y-4 text-senior-base text-gray-700">
                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.1 Contactformulier
                    </h3>
                    <p>
                      Naam, e-mailadres, onderwerp en bericht — om uw vraag te beantwoorden.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.2 Digitale lesmaterialen (A–H en ChatGPT)
                    </h3>
                    <p className="mb-2">Bij bestelling verwerken wij onder meer:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>E-mailadres (download en orderbevestiging)</li>
                      <li>Bestelgegevens (product, bedrag, tijdstip) via Stripe</li>
                      <li>
                        Toestemming voor directe digitale levering (vastgelegd bij bestelling)
                      </li>
                      <li>Technische downloadtokens (tijdelijke, beveiligde links)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.3 Mijn Bibliotheek
                    </h3>
                    <p className="mb-2">
                      <strong>Webversie:</strong> collectiegegevens blijven lokaal in uw browser.
                      Wij hebben daar geen toegang toe.
                    </p>
                    <p>
                      <strong>Android-app:</strong> e-mailadres voor licentie/communicatie waar van
                      toepassing. In-app-betalingen via Google Play — wij zien geen
                      betaalkaartgegevens.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-senior-lg font-bold text-gray-800 mb-2">
                      1.4 Betalingen
                    </h3>
                    <p>
                      Lesmateriaal: Stripe verwerkt de betaling. Bibliotheek-app: Google Play
                      verwerkt de in-app-aankoop. Wij ontvangen geen volledige
                      creditcard- of bankgegevens.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">
                  2. Doeleinden
                </h2>
                <ul className="list-disc list-inside ml-4 space-y-2 text-senior-base text-gray-700">
                  <li>Leveren van downloads en orderbevestigingen</li>
                  <li>Klantenservice bij bestellingen en downloads</li>
                  <li>Vastleggen van wettelijk vereiste toestemming bij digitale levering</li>
                  <li>Beheren van app-licenties waar van toepassing</li>
                  <li>Beantwoorden van contactberichten</li>
                  <li>Verbeteren van de website via anonieme statistieken</li>
                </ul>
                <p className="mt-4 text-senior-base text-gray-700">
                  Wij gebruiken uw gegevens niet voor marketing zonder uw toestemming.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">
                  3. Delen met verwerkers / derden
                </h2>
                <div className="space-y-4 text-senior-base text-gray-700">
                  <p>Wij delen gegevens alleen voor zover nodig voor de dienst:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>
                      <strong>Stripe</strong> — betalingen en ordergegevens lesmateriaal
                    </li>
                    <li>
                      <strong>Brevo</strong> — verzenden van order- en downloadmails (en
                      eventuele auditbevestiging van digitale toestemming)
                    </li>
                    <li>
                      <strong>Google Play</strong> — in-app-aankoop Mijn Bibliotheek
                    </li>
                    <li>
                      <strong>Vercel</strong> — hosting van de website
                    </li>
                    <li>
                      <strong>Wettelijke verplichting</strong> — als de wet dat eist
                    </li>
                  </ul>
                  <p className="mt-4">Wij verkopen uw gegevens niet.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">
                  4. Bewaartermijnen
                </h2>
                <div className="space-y-3 text-senior-base text-gray-700">
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>
                      Contactberichten: zolang nodig om uw vraag af te handelen, daarna niet langer
                      dan nodig voor administratie of wettelijke plichten
                    </li>
                    <li>
                      Order- en betalingsgegevens: volgens wettelijke bewaarplichten voor
                      administratie/facturatie (doorgaans tot 7 jaar waar van toepassing)
                    </li>
                    <li>
                      Downloadlinks: tijdelijk (beperkte geldigheid); bestanden bewaart u zelf
                    </li>
                    <li>
                      Toestemmingsregistratie digitale levering: bewaard als bewijs bij de
                      bestelling
                    </li>
                    <li>Lokale bibliotheekdata: blijft op uw apparaat tot u die wist</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">
                  5. Cookies en statistieken
                </h2>
                <div className="space-y-4 text-senior-base text-gray-700">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Google Analytics</strong> — anonieme bezoekstatistieken
                    </li>
                    <li>
                      <strong>Vercel Analytics</strong> — prestaties (privacyvriendelijk)
                    </li>
                  </ul>
                  <p>Wij gebruiken geen advertentie-trackers.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">6. Uw rechten</h2>
                <div className="space-y-4 text-senior-base text-gray-700">
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Inzage, correctie, verwijdering (waar van toepassing)</li>
                    <li>Bezwaar tegen verwerking</li>
                    <li>Beperking van verwerking</li>
                  </ul>
                  <p className="mt-4">
                    Mail{' '}
                    <a
                      href={`mailto:${COMPANY.emailGeneral}`}
                      className="text-primary hover:underline font-bold"
                    >
                      {COMPANY.emailGeneral}
                    </a>{' '}
                    of{' '}
                    <a
                      href={`mailto:${COMPANY.emailSupport}`}
                      className="text-primary hover:underline font-bold"
                    >
                      {COMPANY.emailSupport}
                    </a>
                    .
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-senior-xl font-bold text-primary mb-4">
                  7. Verantwoordelijke
                </h2>
                <p className="text-senior-base text-gray-700">
                  {COMPANY.legalName} (KvK {COMPANY.kvk}), vestigingsplaats {COMPANY.city}. Merk:{' '}
                  {COMPANY.brandName}.
                </p>
              </section>

              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <p className="text-senior-sm text-gray-500">
                  Wij kunnen dit privacybeleid wijzigen. De actuele versie staat op deze pagina.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="inline-block text-senior-base text-primary hover:underline">
              ← Terug naar home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
