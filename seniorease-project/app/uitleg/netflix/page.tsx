import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://www.seniorease.nl/uitleg/netflix" },
    { "@type": "ListItem", "position": 3, "name": "Netflix gebruiken", "item": "https://www.seniorease.nl/uitleg/netflix" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Netflix installeren en gebruiken op tablet of smartphone",
  "description": "Stap voor stap Netflix installeren, inloggen en een film of serie kijken.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Netflix installeren", "text": "Open de App Store (iPhone/iPad) of Play Store (Android). Zoek op 'Netflix' en tik op Installeren." },
    { "@type": "HowToStep", "position": 2, "name": "Account aanmaken of inloggen", "text": "Open Netflix. Tik op 'Aanmelden' als u al een account heeft, of op 'Aanmelden' om een nieuw account te maken." },
    { "@type": "HowToStep", "position": 3, "name": "Een film of serie zoeken", "text": "Tik op het vergrootglas onderaan. Typ de naam van een film of serie en tik erop." },
    { "@type": "HowToStep", "position": 4, "name": "Afspelen", "text": "Tik op de grote afspeelknop. De film of aflevering begint vanzelf." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kost Netflix geld?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, Netflix is een betaald abonnement. U betaalt maandelijks, momenteel vanaf ongeveer €5 per maand. U kunt op elk moment opzeggen."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik Netflix op mijn televisie kijken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Als uw televisie een 'Smart TV' is, staat de Netflix-app er vaak al op. Zoek op uw afstandsbediening naar een Netflix-knop of open de app via het beginscherm van uw tv."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe zet ik ondertiteling aan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tik tijdens het afspelen op het scherm. Er verschijnen icoontjes bovenaan. Tik op het tekstballonnetje of het icoontje met 'CC'. Kies 'Nederlands' voor Nederlandse ondertiteling."
      }
    },
  ],
};

export const metadata = buildPageMetadata({
  path: '/uitleg/netflix',
  title: "Netflix gebruiken op tablet of smartphone – uitleg voor senioren",
  description: "Hoe installeert u Netflix en kijkt u films en series? Stap-voor-stap uitleg speciaal voor senioren, inclusief ondertiteling instellen en zoeken naar films.",
});

export default function NetflixPage() {
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
              Netflix gebruiken
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Films en series kijken op uw tablet, smartphone of televisie — stap voor stap uitgelegd.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Wat is Netflix */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Wat is Netflix?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              Netflix is een dienst waarmee u films, series en documentaires kunt kijken wanneer u wilt.
              U heeft geen tv-gids nodig en u hoeft niet te wachten — u kiest zelf wat u kijkt en wanneer.
            </p>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              Netflix werkt op uw tablet, smartphone, computer en op de meeste moderne televisies.
              U betaalt een vast bedrag per maand en kunt op elk moment opzeggen.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🎬", label: "Duizenden films en series" },
                { icon: "📱", label: "Op tablet, telefoon of tv" },
                { icon: "⏸️", label: "Stop en kijk verder wanneer u wilt" },
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
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Stap 1: Netflix installeren
            </h2>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              Netflix is een gratis app om te installeren. U betaalt alleen voor het abonnement zodra u inlogt.
            </p>
            <div className="space-y-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-senior-base font-bold text-blue-900 mb-3">📱 Op Android (Samsung, Motorola, etc.)</h3>
                <ol className="space-y-3 list-decimal list-outside pl-6 text-senior-base text-gray-700">
                  <li>Open de <strong>Play Store</strong> (het gekleurde driehoekje op uw telefoon).</li>
                  <li>Tik bovenaan op de zoekbalk en typ <strong>Netflix</strong>.</li>
                  <li>Tik op het rode Netflix-icoontje in de lijst.</li>
                  <li>Tik op <strong>Installeren</strong> en wacht tot het klaar is.</li>
                </ol>
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-senior-base font-bold text-gray-900 mb-3">🍎 Op iPhone of iPad</h3>
                <ol className="space-y-3 list-decimal list-outside pl-6 text-senior-base text-gray-700">
                  <li>Open de <strong>App Store</strong> (blauw icoontje met een &quot;A&quot;).</li>
                  <li>Tik onderaan op <strong>Zoeken</strong> en typ <strong>Netflix</strong>.</li>
                  <li>Tik op <strong>Krijg</strong> of het wolkje naast de Netflix-app.</li>
                  <li>Bevestig met uw vingerafdruk of wachtwoord. De app installeert vanzelf.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Inloggen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Stap 2: Inloggen of account aanmaken
            </h2>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              Open de Netflix-app. U ziet een beginscherm met twee opties.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-base">A</div>
                <div>
                  <p className="text-senior-base font-bold text-gray-800">Heeft u al een account?</p>
                  <p className="text-senior-base text-gray-700">Tik op <strong>Aanmelden</strong>. Vul uw e-mailadres en wachtwoord in en tik op <strong>Aanmelden</strong>.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-base">B</div>
                <div>
                  <p className="text-senior-base font-bold text-gray-800">Nog geen account?</p>
                  <p className="text-senior-base text-gray-700">Tik op <strong>Aan de slag</strong>. Vul uw e-mailadres in, kies een wachtwoord en kies een abonnement. U kunt betalen met creditcard of iDEAL.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
              <p className="text-senior-base font-bold text-gray-800">💡 Tip</p>
              <p className="text-senior-base text-gray-700 mt-1">Schrijf uw e-mailadres en wachtwoord op een papiertje en bewaar dit op een veilige plek. U heeft het nodig als u Netflix op een ander apparaat wilt gebruiken.</p>
            </div>
          </section>

          {/* Film kijken */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Stap 3: Een film of serie kijken
            </h2>
            <ol className="space-y-6">
              {[
                {
                  stap: "Zoek een film of serie",
                  uitleg: "Tik onderaan op het vergrootglas. Typ de naam van een film of serie die u wilt kijken. U kunt ook gewoon scrollen op het beginscherm — Netflix laat populaire films en series zien.",
                },
                {
                  stap: "Tik op de film of serie",
                  uitleg: "Er verschijnt een pagina met informatie: een korte beschrijving, hoe lang de film duurt en welke taal beschikbaar is.",
                },
                {
                  stap: "Tik op de afspeelknop",
                  uitleg: "De grote driehoek (▶) start de film. Hij begint vanzelf te spelen.",
                },
                {
                  stap: "Pauze of verdergaan",
                  uitleg: "Tik één keer op het scherm om de bedieningsknoppen te zien. Tik op ❚❚ om te pauzeren. Netflix onthoudt waar u gebleven bent — de volgende keer gaat u verder waar u stopte.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start list-none">
                  <div className="flex-shrink-0 w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
                    {i + 1}
                  </div>
                  <div className="pt-1 flex-1">
                    <p className="text-senior-base font-bold text-gray-800 mb-1">{item.stap}</p>
                    <p className="text-senior-base text-gray-700 leading-relaxed">{item.uitleg}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Ondertiteling */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Ondertiteling instellen
            </h2>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
              Bij buitenlandse films of als u de dialogen niet goed kunt verstaan, kunt u ondertiteling aanzetten.
            </p>
            <ol className="space-y-3 list-decimal list-outside pl-6 text-senior-base text-gray-700">
              <li>Speel de film af en tik eenmalig op het scherm.</li>
              <li>Tik rechtsboven op het icoontje met tekstballonnetjes of de letters <strong>CC</strong>.</li>
              <li>Kies <strong>Nederlands</strong> onder &quot;Ondertitels&quot;.</li>
              <li>Tik ergens anders op het scherm om de knoppen te verbergen.</li>
            </ol>
          </section>

          {/* FAQ */}
          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-6">
              Veelgestelde vragen
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Kost Netflix geld?</p>
                <p className="text-senior-base text-gray-700">Ja, Netflix is een betaald abonnement. U betaalt maandelijks, momenteel vanaf ongeveer €5 per maand. U kunt op elk moment opzeggen.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Kan ik Netflix op mijn televisie kijken?</p>
                <p className="text-senior-base text-gray-700">Ja. Als uw televisie een &quot;Smart TV&quot; is, staat de Netflix-app er vaak al op. Zoek op uw afstandsbediening naar een Netflix-knop of open de app via het beginscherm van uw tv.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Hoe zeg ik Netflix op?</p>
                <p className="text-senior-base text-gray-700">Ga naar de Netflix-website op uw computer. Log in, klik rechtsboven op uw naam, ga naar &quot;Account&quot; en kies &quot;Abonnement annuleren&quot;. U kunt tot aan het einde van de betaalperiode blijven kijken.</p>
              </div>
            </div>
          </section>

          {/* Gerelateerd */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/npo-start" className="text-senior-base font-bold text-primary hover:underline">NPO Start gebruiken →</Link></li>
              <li><Link href="/uitleg/youtube-tv" className="text-senior-base font-bold text-primary hover:underline">YouTube kijken op tv →</Link></li>
              <li><Link href="/uitleg/wifi" className="text-senior-base font-bold text-primary hover:underline">WiFi instellen →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
