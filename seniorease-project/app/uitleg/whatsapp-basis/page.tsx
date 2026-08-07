import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { StepIllustration } from './StepIllustration';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.seniorease.nl" },
    { "@type": "ListItem", "position": 2, "name": "Uitleg", "item": "https://www.seniorease.nl/uitleg/whatsapp-basis" },
    { "@type": "ListItem", "position": 3, "name": "WhatsApp – Eerste stappen", "item": "https://www.seniorease.nl/uitleg/whatsapp-basis" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "WhatsApp gebruiken – eerste stappen",
  "description": "Leer WhatsApp openen, berichten sturen en foto's versturen in 4 eenvoudige stappen.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "WhatsApp openen", "text": "Tik op het groene icoon met het telefoontje op uw telefoonscherm." },
    { "@type": "HowToStep", "position": 2, "name": "Een gesprek kiezen", "text": "Tik op een naam in de lijst. Voor een nieuw gesprek: tik op het groene icoon rechtsonder." },
    { "@type": "HowToStep", "position": 3, "name": "Een bericht sturen", "text": "Tik in het witte vak onderaan, typ uw bericht en tik op het blauwe verzend-icoon." },
    { "@type": "HowToStep", "position": 4, "name": "Foto's versturen", "text": "Tik op het paperclip-icoon of het camera-icoon naast het typveld, kies een foto en tik op versturen." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kost WhatsApp geld?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WhatsApp zelf is gratis. Via wifi betaalt u geen sms-kosten. Met mobiele data telt het gebruik mee voor uw databundel.",
      },
    },
    {
      "@type": "Question",
      "name": "Hoe open ik WhatsApp?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tik op het groene icoon met het witte telefoontje op uw telefoonscherm. Staat het er niet? Zoek in de App Store of Play Store op WhatsApp en installeer de app.",
      },
    },
    {
      "@type": "Question",
      "name": "Hoe stuur ik een bericht?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open een gesprek, tik in het witte vak onderaan, typ uw tekst en tik op het blauwe verzend-icoon.",
      },
    },
    {
      "@type": "Question",
      "name": "Hoe stuur ik een foto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In een gesprek tikt u op het paperclip- of camera-icoon naast het typvak, kiest u een foto en tikt u op versturen.",
      },
    },
    {
      "@type": "Question",
      "name": "Is WhatsApp veilig?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Berichten zijn versleuteld, maar stuur nooit wachtwoorden of bankgegevens via WhatsApp. Klik niet op vreemde links. Twijfelt u? Bel de persoon via een nummer dat u kent.",
      },
    },
  ],
};

export const metadata = buildPageMetadata({
  path: '/uitleg/whatsapp-basis',
  title: "WhatsApp uitleg voor senioren – eerste stappen stap voor stap",
  description: "Leer WhatsApp gebruiken: berichten sturen, foto's versturen en veilig appen. Rustige uitleg voor senioren, stap voor stap.",
});

export default function WhatsAppBasisPage() {
  return (
    <main className="min-h-screen bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
              WhatsApp – Eerste stappen
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Kort overzicht: WhatsApp openen, berichten sturen, foto&apos;s versturen en ontvangen, en een duimpje als antwoord.
            </p>
          </div>
        </div>
      </header>

      <section className="max-w-senior mx-auto px-5 sm:px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Intro */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <p className="text-senior-sm md:text-senior-base text-navy leading-relaxed">
              Met WhatsApp kunt u gratis berichten en foto&apos;s sturen naar familie en vrienden.
              Hieronder vindt u de basis in korte stappen. Neem gerust uw tijd en oefen op uw eigen tempo.
            </p>
            <p className="mt-4 text-senior-base text-navy/80">
              <strong>Printbare handleiding:</strong>{' '}
              <a href="/handleiding-whatsapp.html" target="_blank" rel="noopener noreferrer" className="text-gold font-bold underline hover:no-underline">
                Open de handleiding
              </a>
              {' '}(alle delen in één document). U kunt die pagina printen of als PDF opslaan (Afdrukken → Opslaan als PDF).
            </p>
            <div className="mt-6 p-4 rounded-xl bg-paper border border-navy/10">
              <p className="text-senior-base font-bold text-navy">Veiligheid in het kort</p>
              <p className="text-senior-base text-navy/80 mt-1">Stuur nooit wachtwoorden of bankgegevens via WhatsApp. Klik niet op vreemde links. Als iemand om geld vraagt, bel die persoon eerst even op een nummer dat u kent om te controleren of het echt is. Meer over veiligheid staat in <strong>Deel 3</strong>.</p>
            </div>
          </div>

          {/* Eerste stappen */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Eerste stappen met WhatsApp
            </h2>

            <div className="space-y-8">
              <div>
                <StepIllustration step={1}>
                  <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                    <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                    <circle cx="60" cy="50" r="25" fill="#25D366"/>
                    <path d="M50 45 L60 55 L75 38" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
                    <path d="M30 120 L90 120" stroke="#9CA3AF" strokeWidth="2"/>
                    <text x="60" y="135" textAnchor="middle" fill="#6B7280" fontSize="10">Tik hier</text>
                  </svg>
                </StepIllustration>
                <p className="text-senior-base text-navy"><strong>WhatsApp openen</strong> – Tik op het groene icoon met het telefoontje op uw telefoonscherm.</p>
              </div>

              <div>
                <StepIllustration step={2}>
                  <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                    <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                    <rect x="20" y="25" width="25" height="25" rx="12" fill="#9CA3AF"/>
                    <rect x="55" y="28" width="55" height="8" rx="2" fill="#D1D5DB"/>
                    <rect x="55" y="42" width="40" height="6" rx="2" fill="#E5E7EB"/>
                    <rect x="20" y="60" width="25" height="25" rx="12" fill="#9CA3AF"/>
                    <rect x="55" y="63" width="55" height="8" rx="2" fill="#D1D5DB"/>
                    <path d="M25 85 L95 85" stroke="#EF4444" strokeWidth="3" strokeDasharray="4 2"/>
                    <text x="60" y="100" textAnchor="middle" fill="#6B7280" fontSize="10">Kies een naam</text>
                  </svg>
                </StepIllustration>
                <p className="text-senior-base text-navy"><strong>Een gesprek kiezen</strong> – Tik op een naam in de lijst. Voor een nieuw gesprek: tik op het groene icoon rechtsonder (het &quot;nieuwe chat&quot;-icoon).</p>
              </div>

              <div>
                <StepIllustration step={3}>
                  <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                    <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                    <rect x="20" y="115" width="70" height="25" rx="4" fill="white" stroke="#9CA3AF" strokeWidth="1"/>
                    <text x="55" y="132" textAnchor="middle" fill="#9CA3AF" fontSize="8">Typ hier...</text>
                    <path d="M95 122 L105 127 L95 132" fill="#3B82F6" stroke="#2563EB" strokeWidth="1"/>
                    <path d="M95 122 L105 127" stroke="#EF4444" strokeWidth="2"/>
                    <text x="60" y="155" textAnchor="middle" fill="#6B7280" fontSize="10">Verzend-icoon</text>
                  </svg>
                </StepIllustration>
                <p className="text-senior-base text-navy"><strong>Een bericht sturen</strong> – Tik onderaan in het witte vak (het typveld), typ uw bericht en tik op het blauwe verzend-icoon – het vliegtuigje rechts van het vak.</p>
              </div>

              <div>
                <StepIllustration step={4}>
                  <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                    <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                    <rect x="20" y="115" width="70" height="25" rx="4" fill="white" stroke="#9CA3AF" strokeWidth="1"/>
                    <rect x="22" y="120" width="12" height="15" rx="2" fill="#9CA3AF"/>
                    <path d="M38 125 L42 120 L46 125 L42 130 Z" fill="#6B7280"/>
                    <path d="M38 125 L42 120" stroke="#EF4444" strokeWidth="2"/>
                    <text x="60" y="155" textAnchor="middle" fill="#6B7280" fontSize="10">Paperclip</text>
                  </svg>
                </StepIllustration>
                <p className="text-senior-base text-navy"><strong>Foto&apos;s versturen</strong> – Tik op het paperclip-icoon of het camera-icoon naast het vak waar u normaal typt.</p>
              </div>
            </div>
          </div>

          {/* Foto's versturen */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Foto&apos;s versturen
            </h2>
            <StepIllustration step={5}>
              <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                <rect x="30" y="50" width="60" height="45" rx="4" fill="#D1D5DB" stroke="#9CA3AF"/>
                <circle cx="60" cy="72" r="8" fill="#9CA3AF"/>
                <rect x="20" y="115" width="80" height="25" rx="4" fill="white" stroke="#9CA3AF"/>
                <rect x="25" y="120" width="12" height="15" rx="2" fill="#6B7280"/>
                <path d="M25 120 L27 118" stroke="#EF4444" strokeWidth="2"/>
                <text x="60" y="155" textAnchor="middle" fill="#6B7280" fontSize="10">Foto kiezen → Versturen</text>
              </svg>
            </StepIllustration>
            <ol className="list-decimal list-outside pl-6 space-y-4 text-senior-sm md:text-senior-base text-navy leading-relaxed mt-6">
              <li>Open WhatsApp en open het gesprek waar u de foto naartoe wilt sturen.</li>
              <li>Tik naast het typveld op het <strong>paperclip-icoon</strong> of het <strong>camera-icoon</strong>.</li>
              <li>Kies &quot;Foto&apos;s&quot; of &quot;Galerij&quot;.</li>
              <li>Tik op de foto die u wilt versturen om hem te selecteren.</li>
              <li>Tik op <strong>Versturen</strong> (of het verzend-icoon).</li>
            </ol>
            <p className="mt-4 text-senior-base text-navy/70">
              Tip: voor meerdere foto&apos;s kunt u meerdere foto&apos;s selecteren voordat u op Versturen tikt.
            </p>
          </div>

          {/* Foto's ontvangen */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Foto&apos;s ontvangen en bekijken
            </h2>
            <StepIllustration step={6}>
              <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                <rect x="25" y="70" width="70" height="50" rx="4" fill="#D1D5DB" stroke="#9CA3AF"/>
                <circle cx="60" cy="92" r="10" fill="#9CA3AF"/>
                <path d="M50 95 L60 85 L70 95 L60 105 Z" fill="#6B7280"/>
                <path d="M55 60 L60 50 L65 60" fill="#EF4444"/>
                <text x="60" y="135" textAnchor="middle" fill="#6B7280" fontSize="10">Tik op de foto</text>
              </svg>
            </StepIllustration>
            <ol className="list-decimal list-outside pl-6 space-y-4 text-senior-sm md:text-senior-base text-navy leading-relaxed mt-6">
              <li>Open WhatsApp en ga naar het gesprek waar u een melding van hebt (bijv. &quot;1 nieuw bericht&quot; – dat ziet u naast de naam in de lijst).</li>
              <li>In het gesprek ziet u een kleine weergave van de foto. <strong>Tik op de foto</strong> om hem groot te openen.</li>
              <li>U kunt inzoomen door met twee vingers uit elkaar te bewegen op het scherm. Terug: tik op de pijl of buiten de foto.</li>
              <li>Om de foto op te slaan: kijk onderaan of tik op de drie puntjes (rechtsboven) en zoek &quot;Opslaan&quot; of &quot;Downloaden&quot;. Daarna staat de foto in uw Galerij.</li>
            </ol>
          </div>

          {/* Duimpje terugsturen */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Duimpje als antwoord sturen
            </h2>
            <StepIllustration step={7}>
              <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                <rect x="20" y="55" width="55" height="30" rx="8" fill="#DCF8C6" stroke="#9CA3AF"/>
                <text x="47" y="75" textAnchor="middle" fill="#333" fontSize="18">👍</text>
                <rect x="45" y="95" width="55" height="25" rx="8" fill="white" stroke="#9CA3AF"/>
                <text x="72" y="112" textAnchor="middle" fill="#333" fontSize="14">👍</text>
                <path d="M95 122 L105 127 L95 132" fill="#3B82F6" stroke="#2563EB" strokeWidth="1"/>
                <text x="60" y="155" textAnchor="middle" fill="#6B7280" fontSize="10">Tik op bericht → Duimpje</text>
              </svg>
            </StepIllustration>
            <ol className="list-decimal list-outside pl-6 space-y-4 text-senior-sm md:text-senior-base text-navy leading-relaxed mt-6">
              <li><strong>Houd uw vinger ongeveer 1 seconde</strong> op het bericht waarop u wilt reageren.</li>
              <li>Er verschijnt een rij met kleine plaatjes (emoji&apos;s). Tik op het <strong>duimpje</strong> 👍.</li>
              <li>Uw duimpje wordt als antwoord onder het bericht geplaatst. De ander ziet dat u het bericht hebt gezien en bevestigd.</li>
            </ol>
            <p className="mt-4 text-senior-base text-navy/70">
              Tip: een duimpje is een snelle manier om te laten weten dat u het bericht hebt gelezen en akkoord bent. Bij kleinkinderen mag het ook een kus-emoji 😘 zijn.
            </p>
          </div>

          {/* Samenvatting */}
          <div className="bg-gold/10 border border-navy/8 rounded-2xl p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Kort samengevat
            </h2>
            <ul className="space-y-2 text-senior-sm md:text-senior-base text-navy">
              <li><strong>Foto versturen:</strong> Gesprek openen → paperclip/camera → Foto&apos;s kiezen → foto selecteren → Versturen.</li>
              <li><strong>Foto ontvangen:</strong> Gesprek openen → op de foto tikken → eventueel Opslaan.</li>
              <li><strong>Duimpje sturen:</strong> Lang indrukken op een bericht → duimpje 👍 tikken.</li>
            </ul>
          </div>

          {/* Gerelateerde uitleg */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Gerelateerde uitleg</h2>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/digitale-hulp/whatsapp-fotos-opslaan" className="text-senior-base font-semibold text-gold hover:text-gold-light underline">
                  WhatsApp foto&apos;s opslaan
                </Link>
              </li>
              <li>
                <Link href="/uitleg/qr-code" className="text-senior-base font-semibold text-gold hover:text-gold-light underline">
                  QR-code scannen
                </Link>
              </li>
              <li>
                <Link href="/digitale-hulp/smartphone" className="text-senior-base font-semibold text-gold hover:text-gold-light underline">
                  Smartphone hulp (alle artikelen)
                </Link>
              </li>
              <li>
                <Link href="/uitleg/veiligheid" className="text-senior-base font-semibold text-gold hover:text-gold-light underline">
                  Oplichting herkennen
                </Link>
              </li>
              <li>
                <Link href="/uitleg/wifi" className="text-senior-base font-semibold text-gold hover:text-gold-light underline">
                  WiFi instellen
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigatie */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <a
              href="/handleiding-whatsapp.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-gold font-bold text-senior-base rounded-xl border border-navy/8 hover:bg-cream min-h-[56px] flex items-center justify-center"
            >
              Handleiding downloaden / printen
            </a>
            <Link
              href="/uitleg/whatsapp-deel2"
              className="inline-block px-8 py-4 bg-gold text-white font-bold text-senior-base rounded-xl hover:bg-gold-light border border-navy/8 min-h-[56px] flex items-center justify-center"
            >
              WhatsApp – Deel 2 (spraak, bellen, groepen)
            </Link>
            <Link
              href="/hulp"
              className="inline-block px-8 py-4 bg-white text-gold font-bold text-senior-base rounded-xl border border-navy/8 hover:bg-cream min-h-[56px] flex items-center justify-center"
            >
              Meer hulp & veelgestelde vragen
            </Link>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-white text-gold font-bold text-senior-base rounded-xl border border-navy/8 hover:bg-cream min-h-[56px] flex items-center justify-center"
            >
              Terug naar home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
