import Link from 'next/link';
import { StepIllustration } from './StepIllustration';

export const metadata = {
  title: "WhatsApp uitleg voor senioren – eerste stappen stap voor stap",
  description: "Leer WhatsApp gebruiken: berichten sturen, foto's versturen en ontvangen. Duidelijke uitleg speciaal voor senioren, ook voor beginners.",
};

export default function WhatsAppBasisPage() {
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
              WhatsApp – Eerste stappen
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Kort overzicht: WhatsApp openen, berichten sturen, foto&apos;s versturen en ontvangen, en een duimpje als antwoord.
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Intro */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <p className="text-senior-base md:text-senior-lg text-gray-800 leading-relaxed">
              Met WhatsApp kunt u gratis berichten en foto&apos;s sturen naar familie en vrienden.
              Hieronder vindt u de basis in korte stappen. Neem gerust uw tijd en oefen op uw eigen tempo.
            </p>
            <p className="mt-4 text-senior-base text-gray-700">
              <strong>Printbare handleiding:</strong>{' '}
              <a href="/handleiding-whatsapp.html" target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline hover:no-underline">
                Open de handleiding
              </a>
              {' '}(alle delen in één document). U kunt die pagina printen of als PDF opslaan (Afdrukken → Opslaan als PDF).
            </p>
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
              <p className="text-senior-base font-bold text-gray-800">Veiligheid in het kort</p>
              <p className="text-senior-base text-gray-700 mt-1">Stuur nooit wachtwoorden of bankgegevens via WhatsApp. Klik niet op vreemde links. Als iemand om geld vraagt, bel die persoon eerst even op een nummer dat u kent om te controleren of het echt is. Meer over veiligheid staat in <strong>Deel 3</strong>.</p>
            </div>
          </div>

          {/* Eerste stappen */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
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
                <p className="text-senior-base text-gray-800"><strong>WhatsApp openen</strong> – Tik op het groene icoon met het telefoontje op uw telefoonscherm.</p>
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
                <p className="text-senior-base text-gray-800"><strong>Een gesprek kiezen</strong> – Tik op een naam in de lijst. Voor een nieuw gesprek: tik op het groene icoon rechtsonder (het &quot;nieuwe chat&quot;-icoon).</p>
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
                <p className="text-senior-base text-gray-800"><strong>Een bericht sturen</strong> – Tik onderaan in het witte vak (het typveld), typ uw bericht en tik op het blauwe verzend-icoon – het vliegtuigje rechts van het vak.</p>
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
                <p className="text-senior-base text-gray-800"><strong>Foto&apos;s versturen</strong> – Tik op het paperclip-icoon of het camera-icoon naast het vak waar u normaal typt.</p>
              </div>
            </div>
          </div>

          {/* Foto's versturen */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
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
            <ol className="list-decimal list-outside pl-6 space-y-4 text-senior-base md:text-senior-lg text-gray-800 leading-relaxed mt-6">
              <li>Open WhatsApp en open het gesprek waar u de foto naartoe wilt sturen.</li>
              <li>Tik naast het typveld op het <strong>paperclip-icoon</strong> of het <strong>camera-icoon</strong>.</li>
              <li>Kies &quot;Foto&apos;s&quot; of &quot;Galerij&quot;.</li>
              <li>Tik op de foto die u wilt versturen om hem te selecteren.</li>
              <li>Tik op <strong>Versturen</strong> (of het verzend-icoon).</li>
            </ol>
            <p className="mt-4 text-senior-base text-gray-600">
              Tip: voor meerdere foto&apos;s kunt u meerdere foto&apos;s selecteren voordat u op Versturen tikt.
            </p>
          </div>

          {/* Foto's ontvangen */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
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
            <ol className="list-decimal list-outside pl-6 space-y-4 text-senior-base md:text-senior-lg text-gray-800 leading-relaxed mt-6">
              <li>Open WhatsApp en ga naar het gesprek waar u een melding van hebt (bijv. &quot;1 nieuw bericht&quot; – dat ziet u naast de naam in de lijst).</li>
              <li>In het gesprek ziet u een kleine weergave van de foto. <strong>Tik op de foto</strong> om hem groot te openen.</li>
              <li>U kunt inzoomen door met twee vingers uit elkaar te bewegen op het scherm. Terug: tik op de pijl of buiten de foto.</li>
              <li>Om de foto op te slaan: kijk onderaan of tik op de drie puntjes (rechtsboven) en zoek &quot;Opslaan&quot; of &quot;Downloaden&quot;. Daarna staat de foto in uw Galerij.</li>
            </ol>
          </div>

          {/* Duimpje terugsturen */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-6">
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
            <ol className="list-decimal list-outside pl-6 space-y-4 text-senior-base md:text-senior-lg text-gray-800 leading-relaxed mt-6">
              <li><strong>Houd uw vinger ongeveer 1 seconde</strong> op het bericht waarop u wilt reageren.</li>
              <li>Er verschijnt een rij met kleine plaatjes (emoji&apos;s). Tik op het <strong>duimpje</strong> 👍.</li>
              <li>Uw duimpje wordt als antwoord onder het bericht geplaatst. De ander ziet dat u het bericht hebt gezien en bevestigd.</li>
            </ol>
            <p className="mt-4 text-senior-base text-gray-600">
              Tip: een duimpje is een snelle manier om te laten weten dat u het bericht hebt gelezen en akkoord bent. Bij kleinkinderen mag het ook een kus-emoji 😘 zijn.
            </p>
          </div>

          {/* Samenvatting */}
          <div className="bg-primary/10 border-4 border-primary rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">
              Kort samengevat
            </h2>
            <ul className="space-y-2 text-senior-base md:text-senior-lg text-gray-800">
              <li><strong>Foto versturen:</strong> Gesprek openen → paperclip/camera → Foto&apos;s kiezen → foto selecteren → Versturen.</li>
              <li><strong>Foto ontvangen:</strong> Gesprek openen → op de foto tikken → eventueel Opslaan.</li>
              <li><strong>Duimpje sturen:</strong> Lang indrukken op een bericht → duimpje 👍 tikken.</li>
            </ul>
          </div>

          {/* Navigatie */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <a
              href="/handleiding-whatsapp.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-primary font-bold text-senior-base rounded-xl border-4 border-primary hover:bg-neutral-cream min-h-[56px] flex items-center justify-center"
            >
              Handleiding downloaden / printen
            </a>
            <Link
              href="/uitleg/whatsapp-deel2"
              className="inline-block px-8 py-4 bg-primary text-white font-bold text-senior-base rounded-xl hover:bg-primary-dark border-4 border-primary min-h-[56px] flex items-center justify-center"
            >
              WhatsApp – Deel 2 (spraak, bellen, groepen)
            </Link>
            <Link
              href="/hulp"
              className="inline-block px-8 py-4 bg-white text-primary font-bold text-senior-base rounded-xl border-4 border-primary hover:bg-neutral-cream min-h-[56px] flex items-center justify-center"
            >
              Meer hulp & veelgestelde vragen
            </Link>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-white text-primary font-bold text-senior-base rounded-xl border-4 border-primary hover:bg-neutral-cream min-h-[56px] flex items-center justify-center"
            >
              Terug naar home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
