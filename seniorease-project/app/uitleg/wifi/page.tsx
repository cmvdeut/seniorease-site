import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = buildPageMetadata({
  path: '/uitleg/wifi',
  title: "WiFi instellen op smartphone en tablet – stap voor stap uitleg voor senioren",
  description: "Hoe verbindt u uw smartphone of tablet met het wifi-netwerk thuis? Stap-voor-stap uitleg voor senioren, inclusief wachtwoord invullen en problemen oplossen.",
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://www.seniorease.nl/uitleg/wifi" },
    { "@type": "ListItem", "position": 3, "name": "WiFi instellen", "item": "https://www.seniorease.nl/uitleg/wifi" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "WiFi instellen op Android",
  "description": "Stap voor stap verbinding maken met het wifi-netwerk thuis op uw Android-telefoon.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Open Instellingen", "text": "Tik op het tandwiel-icoontje op uw telefoon. Dat is de Instellingen-app." },
    { "@type": "HowToStep", "position": 2, "name": "Tik op 'Verbindingen' of 'Netwerk en internet'", "text": "De exacte naam verschilt per telefoon, maar zoek naar iets met 'verbinding' of 'netwerk'." },
    { "@type": "HowToStep", "position": 3, "name": "Tik op 'WiFi'", "text": "Zorg dat WiFi aanstaat. U ziet nu een lijst van beschikbare netwerken." },
    { "@type": "HowToStep", "position": 4, "name": "Tik op de naam van uw thuisnetwerk", "text": "De netwerknaam staat ook op de sticker van uw router." },
    { "@type": "HowToStep", "position": 5, "name": "Typ het wachtwoord in", "text": "Voer het WiFi-wachtwoord in. Let op: dit is hoofdlettergevoelig." },
    { "@type": "HowToStep", "position": 6, "name": "Tik op 'Verbinden'", "text": "Als het wachtwoord klopt, verschijnt er 'Verbonden' onder de netwerknaam." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Moet ik elke keer opnieuw het wachtwoord invoeren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee. Zodra u eenmaal verbonden bent, onthoudt uw telefoon het netwerk. Thuis verbindt het automatisch zodra u binnen bereik bent."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik WiFi gebruiken bij iemand anders thuis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Vraag de naam van het netwerk en het wachtwoord. Ga naar Instellingen → WiFi en volg dezelfde stappen als thuis."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is het verschil tussen WiFi en mobiele data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WiFi gebruikt het signaal van uw router thuis. Mobiele data gebruikt het netwerk van uw telefoonprovider (4G/5G). WiFi is gratis zolang u een internetabonnement heeft; mobiele data wordt van uw databundel afgetrokken."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe weet ik of ik verbonden ben met WiFi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kijk naar de bovenkant van uw scherm. Als u het WiFi-icoontje ziet (een soort waaier van streepjes), bent u verbonden."
      }
    }
  ]
};

export default function WifiPage() {
  return (
    <main className="min-h-screen bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Header */}
      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base">
              ← Terug naar home
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              WiFi instellen
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Verbinding maken met internet thuis — stap voor stap uitgelegd.
            </p>
            <p className="text-senior-sm text-navy/80 mt-3 max-w-2xl">
              Geen internet op uw telefoon of tablet? Hier leest u hoe u verbinding maakt met uw wifi thuis en wat u kunt doen als het niet lukt.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Smartphone navigatie">
              <span className="text-senior-sm text-navy/55 font-semibold mr-1">📱 Smartphone:</span>
              <Link href="/uitleg/whatsapp-basis" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">WhatsApp</Link>
              <Link href="/uitleg/google-maps" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Google Maps</Link>
              <span className="text-senior-sm font-bold text-gold underline">WiFi instellen</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Intro */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Wat is WiFi?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
              WiFi is een draadloze verbinding met het internet. Uw modem of router thuis zendt een signaal uit — uw telefoon of tablet vangt dat signaal op en heeft zo toegang tot internet, zonder dat er een snoer aan zit.
            </p>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-6">
              Eenmaal verbonden onthoudt uw toestel het netwerk. De volgende keer dat u thuiskomt, verbindt het automatisch.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "📶", label: "Draadloos internet" },
                { icon: "🏠", label: "Werkt thuis via uw router" },
                { icon: "🔁", label: "Verbindt automatisch" },
              ].map((item, i) => (
                <div key={i} className="bg-cream border-2 border-navy/8/30 rounded-xl p-4 text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-navy">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Wat heeft u nodig */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Wat heeft u nodig?
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: "📱",
                  titel: "Uw smartphone of tablet",
                  uitleg: "Het toestel dat u met internet wilt verbinden.",
                },
                {
                  icon: "📡",
                  titel: "Uw router of modem thuis",
                  uitleg: "Dit is het kastje van uw internetprovider (KPN, Ziggo, T-Mobile of een ander bedrijf). Hier komt het internetsignaal vandaan.",
                },
                {
                  icon: "🔑",
                  titel: "Het WiFi-wachtwoord",
                  uitleg: "Dit staat vaak op een sticker op de onderkant of achterkant van uw router. Het heet soms 'Wachtwoord', 'Password', 'WPA key' of 'WiFi-sleutel'.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start bg-cream border-2 border-navy/8/20 rounded-xl px-5 py-4">
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-senior-base font-bold text-navy mb-1">{item.titel}</p>
                    <p className="text-senior-base text-navy/80 leading-relaxed">{item.uitleg}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-paper border border-navy/10 rounded-xl p-5">
              <p className="text-senior-base font-bold text-amber-800 mb-1">Wachtwoord kwijt?</p>
              <p className="text-senior-base text-navy/80">Kijk op de sticker op uw router. Staat het er niet op? Bel uw internetprovider — zij kunnen het wachtwoord opnieuw instellen.</p>
            </div>
          </section>

          {/* Stap voor stap Android */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-2">
              WiFi instellen op Android
            </h2>
            <p className="text-senior-base text-navy/55 mb-8">(Samsung, Motorola, Google Pixel en de meeste andere telefoons)</p>

            <ol className="space-y-6">
              {[
                {
                  stap: "Open Instellingen",
                  uitleg: "Tik op het tandwiel-icoontje op uw telefoon. Dat is de Instellingen-app.",
                },
                {
                  stap: "Tik op 'Verbindingen' of 'Netwerk en internet'",
                  uitleg: "De exacte naam verschilt per telefoon, maar zoek naar iets met 'verbinding' of 'netwerk'.",
                },
                {
                  stap: "Tik op 'WiFi'",
                  uitleg: "Zorg dat WiFi aanstaat (het bolletje moet blauw of groen zijn). U ziet nu een lijst van beschikbare netwerken.",
                },
                {
                  stap: "Tik op de naam van uw thuisnetwerk",
                  uitleg: "De netwerknaam staat ook op de sticker van uw router. Tik erop.",
                },
                {
                  stap: "Typ het wachtwoord in",
                  uitleg: "Voer het WiFi-wachtwoord in. Let op: dit is hoofdlettergevoelig — een hoofdletter 'A' is anders dan een kleine 'a'.",
                  tip: "Tik op het oogje naast het wachtwoordveld om te controleren of u het goed heeft getypt.",
                },
                {
                  stap: "Tik op 'Verbinden'",
                  uitleg: "Als het wachtwoord klopt, verschijnt er 'Verbonden' onder de netwerknaam. Gelukt!",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start">
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

          {/* Stap voor stap iPhone/iPad */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-2">
              WiFi instellen op iPhone of iPad
            </h2>
            <p className="text-senior-base text-navy/55 mb-8">(Apple toestellen)</p>

            <ol className="space-y-6">
              {[
                {
                  stap: "Open Instellingen",
                  uitleg: "Tik op het grijze tandwiel-icoontje — de Instellingen-app.",
                },
                {
                  stap: "Tik op 'WiFi'",
                  uitleg: "U ziet dit bovenaan in het menu. Zorg dat WiFi aanstaat.",
                },
                {
                  stap: "Tik op de naam van uw thuisnetwerk",
                  uitleg: "U ziet een lijst met netwerken in de buurt. Tik op de naam van uw eigen netwerk.",
                },
                {
                  stap: "Typ het wachtwoord in en tik op 'Verbinden'",
                  uitleg: "Voer het wachtwoord in van de sticker op uw router. Tik daarna op 'Verbinden' of 'Join'.",
                  tip: "Tik op het oogje om te controleren of uw wachtwoord klopt voordat u verbindt.",
                },
                {
                  stap: "Klaar — u bent verbonden",
                  uitleg: "Er verschijnt een vinkje voor de netwerknaam en bovenaan uw scherm ziet u het WiFi-icoontje.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start">
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

          {/* Problemen oplossen */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Werkt het niet? Dit kunt u proberen
            </h2>
            <div className="space-y-4">
              {[
                {
                  probleem: "Verkeerd wachtwoord",
                  oplossing: "Controleer de sticker op uw router. Let op hoofd- en kleine letters, en of het een 0 (nul) of O (de letter O) is.",
                  icon: "🔑",
                },
                {
                  probleem: "Netwerk niet zichtbaar",
                  oplossing: "Zet WiFi even uit en weer aan op uw telefoon. Of loop dichter naar uw router toe.",
                  icon: "📶",
                },
                {
                  probleem: "Verbonden maar toch geen internet",
                  oplossing: "Zet uw router even uit (stekker eruit), wacht 30 seconden en zet hem weer aan. Dit lost veel problemen op.",
                  icon: "🔄",
                },
                {
                  probleem: "Vergeten wachtwoord",
                  oplossing: "Kijk op de sticker op uw router. Niet gevonden? Bel uw internetprovider (KPN, Ziggo, T-Mobile).",
                  icon: "📞",
                },
              ].map((item, i) => (
                <div key={i} className="border-2 border-navy/10 rounded-xl overflow-hidden">
                  <div className="bg-gold/10 px-6 py-4 border-b border-navy/10 flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="text-senior-base font-bold text-gold">{item.probleem}</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-senior-base text-navy/80 leading-relaxed">{item.oplossing}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Veelgestelde vragen */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Veel gestelde vragen
            </h2>
            <div className="space-y-5">
              {[
                {
                  vraag: "Moet ik elke keer opnieuw het wachtwoord invoeren?",
                  antwoord: "Nee. Zodra u eenmaal verbonden bent, onthoudt uw telefoon het netwerk. Thuis verbindt het automatisch zodra u binnen bereik bent.",
                },
                {
                  vraag: "Kan ik WiFi gebruiken bij iemand anders thuis?",
                  antwoord: "Ja. Vraag de naam van het netwerk en het wachtwoord. Ga naar Instellingen → WiFi en volg dezelfde stappen als thuis.",
                },
                {
                  vraag: "Wat is het verschil tussen WiFi en mobiele data?",
                  antwoord: "WiFi gebruikt het signaal van uw router thuis (of op een andere locatie). Mobiele data gebruikt het netwerk van uw telefoonprovider (4G/5G). WiFi is gratis zolang u een internetabonnement heeft; mobiele data wordt van uw databundel afgetrokken.",
                },
                {
                  vraag: "Hoe weet ik of ik verbonden ben met WiFi?",
                  antwoord: "Kijk naar de bovenkant van uw scherm. Als u het WiFi-icoontje ziet (een soort waaier van streepjes), bent u verbonden. Op Android staat er soms ook 'WiFi' in de statusbalk.",
                },
              ].map((item, i) => (
                <div key={i} className="border-2 border-navy/10 rounded-xl overflow-hidden">
                  <div className="bg-gold/10 px-6 py-4 border-b border-navy/10">
                    <p className="text-senior-base font-bold text-gold">❓ {item.vraag}</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-senior-base text-navy/80 leading-relaxed">{item.antwoord}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Samenvatting */}
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Samenvatting
            </h2>
            <div className="space-y-3 mb-8">
              {[
                "WiFi-wachtwoord staat op de sticker op uw router",
                "Instellingen → WiFi → netwerknaam kiezen → wachtwoord invoeren",
                "Eenmalig instellen — daarna verbindt het vanzelf",
                "Werkt het niet? Zet de router even uit en weer aan",
                "Hulp nodig? Bel uw internetprovider",
              ].map((punt, i) => (
                <div key={i} className="flex items-start gap-3 bg-cream border-2 border-navy/8/30 rounded-xl px-5 py-4">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✅</span>
                  <p className="text-senior-base text-navy/80 leading-relaxed">{punt}</p>
                </div>
              ))}
            </div>
            <Link href="/" className="inline-flex items-center gap-2 bg-gold text-white px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-gold-light transition-colors ">
              ← Terug naar home
            </Link>
          </section>

        </div>
      </div>
    </main>
  );
}
