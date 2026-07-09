import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://www.seniorease.nl/uitleg/9292" },
    { "@type": "ListItem", "position": 3, "name": "9292 OV-app gebruiken", "item": "https://www.seniorease.nl/uitleg/9292" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Een reisadvies opzoeken in de 9292 app",
  "description": "Stap voor stap uw OV-reis plannen met de 9292 app.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "9292 installeren", "text": "Open de App Store of Play Store, zoek op '9292' en tik op Installeren." },
    { "@type": "HowToStep", "position": 2, "name": "Van en naar invullen", "text": "Open de app. Vul bij 'Van' uw vertrekadres of plaatsnaam in en bij 'Naar' uw bestemming." },
    { "@type": "HowToStep", "position": 3, "name": "Datum en tijd kiezen", "text": "Kies of u nu wilt vertrekken of op een bepaalde tijd. Tik op 'Plan reis'." },
    { "@type": "HowToStep", "position": 4, "name": "Reisadvies bekijken", "text": "U ziet meerdere reismogelijkheden met bus, trein of tram. Tik op een optie voor de details: perron, overstap en aankomsttijd." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is de 9292 app gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, de 9292 app is gratis te downloaden en te gebruiken. U kunt er reisadviezen mee opzoeken voor alle OV in Nederland: trein, bus, tram, metro en ferry."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik ook een OV-chipkaart opladen via 9292?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee, de 9292 app is alleen voor reisadvies. Voor het opladen van uw OV-chipkaart gaat u naar ov-chipkaart.nl of een NS-automaat op het station."
      }
    },
    {
      "@type": "Question",
      "name": "Wat doe ik als de app mijn locatie niet herkent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Geef de 9292 app toestemming om uw locatie te gebruiken via de instellingen van uw telefoon. Of typ gewoon uw adres of plaatsnaam handmatig in het veld 'Van'."
      }
    },
  ],
};

export const metadata = buildPageMetadata({
  path: '/uitleg/9292',
  title: "9292 OV-app gebruiken – reizen met het openbaar vervoer, uitleg senioren",
  description: "Hoe plant u een trein- of busreis met de 9292 app? Stap-voor-stap uitleg voor senioren. Bus, trein, tram en metro in heel Nederland.",
});

export default function OvAppPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base">
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              9292 OV-app gebruiken
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Uw trein- of busreis plannen met de 9292 app — stap voor stap uitgelegd.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Wat is 9292 */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Wat is de 9292 app?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              De 9292 app is de officiële reisplanner voor het openbaar vervoer in Nederland.
              U typt waar u vandaan komt en waar u naartoe wilt — de app zoekt de beste route
              met trein, bus, tram, metro of ferry.
            </p>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              De app laat ook realtime vertragingen zien, zodat u weet of uw trein op tijd rijdt.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🚂", label: "Trein, bus en tram" },
                { icon: "⏱️", label: "Realtime vertragingen" },
                { icon: "🗺️", label: "Heel Nederland" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Installeren */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              9292 installeren
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-senior-base font-bold text-blue-900 mb-2">📱 Android</p>
                <p className="text-senior-base text-gray-700">Open de <strong>Play Store</strong>, zoek op <strong>9292</strong> en tik op Installeren.</p>
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                <p className="text-senior-base font-bold text-gray-900 mb-2">🍎 iPhone / iPad</p>
                <p className="text-senior-base text-gray-700">Open de <strong>App Store</strong>, zoek op <strong>9292</strong> en tik op Krijg.</p>
              </div>
            </div>
          </section>

          {/* Reis plannen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Een reis plannen
            </h2>
            <ol className="space-y-6">
              {[
                {
                  stap: "Open de 9292 app",
                  uitleg: "Tik op het donkerblauwe 9292-icoontje op uw telefoon.",
                },
                {
                  stap: "Vul 'Van' in",
                  uitleg: "Tik op het veld 'Van' en typ uw vertrekadres, plaatsnaam of station. De app stelt suggesties voor zodra u begint te typen.",
                  tip: "Tik op het locatie-icoontje om uw huidige locatie automatisch in te vullen.",
                },
                {
                  stap: "Vul 'Naar' in",
                  uitleg: "Tik op het veld 'Naar' en typ uw bestemming — een adres, plaatsnaam of station.",
                },
                {
                  stap: "Kies de vertrektijd",
                  uitleg: "Wilt u nu vertrekken? Laat dan 'Nu' staan. Wilt u op een bepaald tijdstip reizen? Tik op 'Nu' en stel een datum en tijd in.",
                },
                {
                  stap: "Tik op 'Plan reis'",
                  uitleg: "De app toont meerdere reismogelijkheden. U ziet de vertrektijd, aankomsttijd, reisduur en hoeveel keer u moet overstappen.",
                },
                {
                  stap: "Tik op een reisoptie voor details",
                  uitleg: "U ziet precies welke bus of trein u moet nemen, op welk perron u moet staan en hoe laat u overstapt.",
                  tip: "Tik op 'Bewaar reis' om de route op te slaan voor later.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start list-none">
                  <div className="flex-shrink-0 w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
                    {i + 1}
                  </div>
                  <div className="pt-1 flex-1">
                    <p className="text-senior-base font-bold text-gray-800 mb-1">{item.stap}</p>
                    <p className="text-senior-base text-gray-700 leading-relaxed">{item.uitleg}</p>
                    {item.tip && (
                      <p className="text-senior-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-2">
                        💡 {item.tip}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Handige functies */}
          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-4">Handige functies</h2>
            <ul className="space-y-4">
              {[
                { icon: "🔔", tip: "Stel een reisalarm in zodat u een melding krijgt als het tijd is om te vertrekken." },
                { icon: "⚠️", tip: "De app toont vertragingen en storingen realtime. Zo staat u nooit voor verrassingen." },
                { icon: "♿", tip: "U kunt aangeven dat u een rolstoel of rollator heeft. De app houdt dan rekening met toegankelijkheid." },
                { icon: "🌙", tip: "Laat nachtbussen zien door te zoeken op een tijdstip na middernacht." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-senior-base text-gray-700">
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Is de 9292 app gratis?</p>
                <p className="text-senior-base text-gray-700">Ja, de app is gratis te downloaden en te gebruiken voor alle reisadviezen.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Kan ik ook een OV-chipkaart opladen via 9292?</p>
                <p className="text-senior-base text-gray-700">Nee, 9292 is alleen voor reisadvies. Voor het opladen gaat u naar ov-chipkaart.nl of een NS-automaat.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Wat als de app mijn locatie niet herkent?</p>
                <p className="text-senior-base text-gray-700">Typ uw adres of plaatsnaam handmatig in. Of geef de app toestemming voor uw locatie via de instellingen van uw telefoon.</p>
              </div>
            </div>
          </section>

          {/* Gerelateerd */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg over reizen</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/google-maps" className="text-senior-base font-bold text-primary hover:underline">Google Maps gebruiken →</Link></li>
              <li><Link href="/uitleg/google-translate" className="text-senior-base font-bold text-primary hover:underline">Google Translate gebruiken →</Link></li>
              <li><Link href="/uitleg/wifi" className="text-senior-base font-bold text-primary hover:underline">WiFi instellen →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
