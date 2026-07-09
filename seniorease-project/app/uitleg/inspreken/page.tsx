import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://www.seniorease.nl/uitleg/inspreken" },
    { "@type": "ListItem", "position": 3, "name": "Inspreken op uw telefoon", "item": "https://www.seniorease.nl/uitleg/inspreken" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kan ik inspreken gebruiken in plaats van typen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Op bijna elke smartphone staat een microfoonknopje op het toetsenbord. Tik erop, spreek uw tekst in, en uw telefoon zet het om naar geschreven tekst. Dit werkt in WhatsApp, e-mail, Google en de meeste andere apps."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe stuur ik een spraakbericht via WhatsApp?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open het gesprek in WhatsApp. Houd het microfoon-icoontje rechts van het typveld ingedrukt en spreek uw bericht in. Laat los om te verzenden. De ontvanger kan het bericht afspelen wanneer het hem uitkomt."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is het verschil tussen een spraakbericht en ingesproken tekst?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bij een spraakbericht hoort de ontvanger uw stem. Bij ingesproken tekst zet uw telefoon uw stem om naar geschreven woorden — de ontvanger leest een normaal tekstbericht."
      }
    },
  ],
};

export const metadata = buildPageMetadata({
  path: '/uitleg/inspreken',
  title: "Inspreken op uw telefoon – typen zonder toetsenbord, uitleg voor senioren",
  description: "Hoe spreekt u tekst in op uw smartphone? Uitleg voor senioren: spraakbericht via WhatsApp, inspreken via toetsenbord en Google-zoekopdrachten inspreken.",
});

export default function InsprekenPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/uitleg" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base">
              ← Terug naar alle uitleg
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Inspreken op uw telefoon
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Typen is niet nodig — spreek gewoon wat u wilt zeggen.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Intro */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Liever spreken dan typen?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              Typen op een klein telefoonschermpje kan lastig zijn. Gelukkig kunt u op bijna elke
              smartphone gewoon inspreken — uw telefoon zet uw stem automatisch om naar tekst,
              of stuurt uw stem als spraakbericht.
            </p>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              Hieronder leest u hoe dat werkt in WhatsApp, via het toetsenbord en bij Google.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "💬", label: "Spraakbericht via WhatsApp" },
                { icon: "⌨️", label: "Inspreken via toetsenbord" },
                { icon: "🔍", label: "Google inspreken" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-gray-800">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* WhatsApp spraakbericht */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-2">
              1. Spraakbericht sturen via WhatsApp
            </h2>
            <p className="text-senior-base text-gray-500 mb-6">
              De ontvanger hoort uw stem — u hoeft niets te typen.
            </p>
            <ol className="space-y-6">
              {[
                {
                  stap: "Open een gesprek in WhatsApp",
                  uitleg: "Tik op de persoon aan wie u wilt schrijven.",
                },
                {
                  stap: "Zoek het microfoon-icoontje",
                  uitleg: "Rechts van het witte typveld staat een microfoon-icoontje 🎤. Dat gebruikt u voor een spraakbericht.",
                },
                {
                  stap: "Houd het microfoon-icoontje ingedrukt",
                  uitleg: "Houd uw vinger op het icoontje en spreek uw bericht in. U ziet een rode balk — dat betekent dat u opneemt.",
                  tip: "Spreek duidelijk en niet te snel. U hoeft niet hard te praten.",
                },
                {
                  stap: "Laat los om te verzenden",
                  uitleg: "Haal uw vinger van het scherm. Het spraakbericht wordt meteen verstuurd. De ontvanger kan het afspelen wanneer het hem uitkomt.",
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
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
              <p className="text-senior-base font-bold text-gray-800">Bericht annuleren?</p>
              <p className="text-senior-base text-gray-700 mt-1">Veeg uw vinger naar links terwijl u het icoontje ingedrukt houdt. Het bericht wordt dan niet verstuurd.</p>
            </div>
          </section>

          {/* Inspreken via toetsenbord */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-2">
              2. Inspreken via het toetsenbord
            </h2>
            <p className="text-senior-base text-gray-500 mb-6">
              Uw stem wordt omgezet naar tekst — werkt in WhatsApp, e-mail, notities en meer.
            </p>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
              Op bijna elk telefoontoetsenbord staat een microfoon-icoontje. Als u daarop tikt,
              kunt u inspreken in plaats van typen. Uw telefoon schrijft automatisch op wat u zegt.
              Dit werkt in <strong>elke app</strong> waar u tekst kunt invoeren.
            </p>
            <ol className="space-y-5">
              {[
                {
                  stap: "Tik op een tekstveld",
                  uitleg: "Tik ergens waar u normaal zou typen — in WhatsApp, een e-mail, de notities-app of waar dan ook. Het toetsenbord verschijnt.",
                },
                {
                  stap: "Zoek het microfoon-icoontje op het toetsenbord",
                  uitleg: "Kijk op het toetsenbord naar een microfoon-icoontje 🎤. Bij Android staat het vaak rechtsonder of in de balk boven het toetsenbord. Bij iPhone staat het links van de spatiebalk.",
                },
                {
                  stap: "Tik op het microfoon-icoontje",
                  uitleg: "Het toetsenbord verdwijnt en u ziet een microfoon op uw scherm. Spreek nu uw tekst in.",
                  tip: "Zeg ook leestekens als u die wilt: 'komma', 'punt', 'vraagteken'. Zeg 'nieuw alinea' voor een nieuwe regel.",
                },
                {
                  stap: "De tekst verschijnt automatisch",
                  uitleg: "Terwijl u spreekt, verschijnen de woorden op het scherm. Controleer daarna of alles goed staat — soms maakt de telefoon een foutje bij moeilijke woorden.",
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

          {/* Google inspreken */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-2">
              3. Google inspreken
            </h2>
            <p className="text-senior-base text-gray-500 mb-6">
              Zoeken zonder typen — spreek gewoon uw vraag in.
            </p>
            <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
              In de Google-app of in Chrome kunt u uw zoekopdracht inspreken.
              Handig als u niet precies weet hoe iets gespeld wordt.
            </p>
            <ol className="space-y-4 list-decimal list-outside pl-6 text-senior-base text-gray-700">
              <li>Open de <strong>Google-app</strong> of ga naar <strong>google.nl</strong> in uw browser.</li>
              <li>Tik op het <strong>microfoon-icoontje</strong> in de zoekbalk.</li>
              <li>Spreek uw zoekopdracht in, bijv. &quot;wat is het weer in Amsterdam morgen&quot;.</li>
              <li>Google zoekt meteen voor u.</li>
            </ol>
            <div className="mt-5 p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
              <p className="text-senior-base font-bold text-gray-800">💡 Tip</p>
              <p className="text-senior-base text-gray-700 mt-1">U kunt ook vragen stellen zoals u dat normaal zou doen: &quot;hoe verwijder ik een foto op mijn telefoon&quot; of &quot;wat is een goed recept voor appeltaart&quot;.</p>
            </div>
          </section>

          {/* Waar nog meer */}
          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-4">
              Waar kunt u nog meer inspreken?
            </h2>
            <ul className="space-y-3">
              {[
                { app: "WhatsApp", uitleg: "Spraakbericht sturen (uw stem) of tekst inspreken via toetsenbord" },
                { app: "E-mail", uitleg: "Tik in het berichtveld en gebruik het microfoon-icoontje op het toetsenbord" },
                { app: "Notities / Memo's", uitleg: "Snel een notitie inspreken zonder te typen" },
                { app: "Google", uitleg: "Zoekopdrachten inspreken via het microfoon-icoontje" },
                { app: "Google Translate", uitleg: "Tekst inspreken om te vertalen — handig op vakantie" },
                { app: "Siri (iPhone)", uitleg: "Houd de zijknop ingedrukt en stel een vraag of geef een opdracht" },
                { app: "Google Assistent (Android)", uitleg: "Zeg 'Hey Google' en stel uw vraag" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-senior-base text-gray-700">
                  <span className="text-primary font-bold mt-1 text-xl">🎤</span>
                  <span><strong>{item.app}:</strong> {item.uitleg}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Veelgestelde vragen</h2>
            <div className="space-y-6">
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Wat is het verschil tussen een spraakbericht en ingesproken tekst?</p>
                <p className="text-senior-base text-gray-700">Bij een spraakbericht hoort de ontvanger uw stem. Bij ingesproken tekst zet uw telefoon uw stem om naar geschreven woorden — de ontvanger leest een normaal tekstbericht.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Ik zie geen microfoon-icoontje op mijn toetsenbord. Wat nu?</p>
                <p className="text-senior-base text-gray-700">Soms moet u het toetsenbord even instellen. Ga op Android naar Instellingen → Algemeen beheer → Toetsenbord. Op iPhone staat het microfoon-icoontje links van de spatiebalk als inspreken is ingeschakeld via Instellingen → Toegankelijkheid.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Werkt inspreken ook in het Nederlands?</p>
                <p className="text-senior-base text-gray-700">Ja. Zorg dat uw telefoon is ingesteld op Nederlands, dan herkent hij Nederlandse woorden goed. U kunt ook in dialect of met een accent inspreken — de telefoon past zich aan.</p>
              </div>
            </div>
          </section>

          {/* Gerelateerd */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/whatsapp-basis" className="text-senior-base font-bold text-primary hover:underline">WhatsApp – eerste stappen →</Link></li>
              <li><Link href="/uitleg/google-translate" className="text-senior-base font-bold text-primary hover:underline">Google Translate gebruiken →</Link></li>
              <li><Link href="/uitleg/veiligheid" className="text-senior-base font-bold text-primary hover:underline">Veilig op internet →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
