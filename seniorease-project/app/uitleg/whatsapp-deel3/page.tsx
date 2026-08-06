'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const STEP_IMAGES: Record<number, string> = {
  1: '/images/uitleg/whatsapp/deel3-berichten.jpg',
  2: '/images/uitleg/whatsapp/deel3-organisatie.jpg',
  3: '/images/uitleg/whatsapp/deel3-groepen.jpg',
  4: '/images/uitleg/whatsapp/deel3-privacy.jpg',
  5: '/images/uitleg/whatsapp/deel3-media-backup.jpg',
};

function StepIllustration({ step, children }: { step: number; children: React.ReactNode }) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = STEP_IMAGES[step];

  return (
    <div className="my-6">
      <div className="relative inline-block">
        <div className="absolute -top-2 -left-2 z-10 w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center text-senior-lg font-bold  border-2 border-white">
          {step}
        </div>
        <div className="w-40 h-52 md:w-48 md:h-64 bg-gray-100 rounded-2xl border border-navy/15 flex items-center justify-center p-3 shadow-inner overflow-hidden">
          {src && !imgFailed ? (
            <Image
              src={src}
              alt={`Stap ${step} illustratie`}
              width={192}
              height={256}
              className="w-full h-full object-cover rounded-xl"
              onError={() => setImgFailed(true)}
              unoptimized
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}

export default function WhatsAppDeel3Page() {
  return (
    <main className="min-h-screen bg-cream">
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
              WhatsApp – Deel 3 (Geavanceerd)
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Berichten beheren, organiseren, groepsinstellingen, privacy en back-up.
            </p>
          </div>
        </div>
      </header>

      <section className="max-w-senior mx-auto px-5 sm:px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Intro */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <p className="text-senior-sm md:text-senior-base text-navy leading-relaxed">
              In dit deel leert u handige extra functies: berichten doorsturen of verwijderen, gesprekken organiseren,
              groepsinstellingen, privacy en back-up. Voor als u WhatsApp al een tijdje gebruikt. Neem gerust uw tijd – deze functies zijn optioneel.
            </p>
            <p className="mt-4 text-senior-base text-navy/70">
              Nog niet zover? Start met <Link href="/uitleg/whatsapp-basis" className="text-gold font-bold underline hover:no-underline">Eerste stappen</Link> of <Link href="/uitleg/whatsapp-deel2" className="text-gold font-bold underline hover:no-underline">Deel 2</Link>.{' '}
              <a href="/handleiding-whatsapp.html" target="_blank" rel="noopener noreferrer" className="text-gold font-bold underline hover:no-underline">Printbare handleiding</a> (alle delen in één document).
            </p>
          </div>

          {/* 1. Berichten: doorsturen, verwijderen, beantwoorden */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              1. Berichten: doorsturen, verwijderen en beantwoorden
            </h2>
            <StepIllustration step={1}>
              <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                <rect x="25" y="55" width="55" height="35" rx="8" fill="#DCF8C6" stroke="#9CA3AF"/>
                <path d="M70 65 L85 72 L70 79" stroke="#25D366" strokeWidth="2" fill="none"/>
                <rect x="45" y="100" width="55" height="25" rx="6" fill="white" stroke="#9CA3AF"/>
                <text x="60" y="152" textAnchor="middle" fill="#6B7280" fontSize="9">Lang indrukken</text>
              </svg>
            </StepIllustration>
            <h3 className="text-senior-lg font-bold text-navy mt-4">Bericht doorsturen</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li><strong>Houd uw vinger lang</strong> op het bericht dat u wilt doorsturen.</li>
              <li>Kies <strong>Doorsturen</strong> (of het pijl-icoon). Selecteer het gesprek of de persoon.</li>
              <li>Tik op <strong>Versturen</strong>. Het bericht wordt gekopieerd naar dat gesprek.</li>
            </ol>
            <h3 className="text-senior-lg font-bold text-navy mt-6">Bericht verwijderen</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li><strong>Houd uw vinger lang</strong> op het bericht. Kies <strong>Verwijderen</strong> (prullenbak-icoon).</li>
              <li>Bevestig met <strong>Verwijderen voor mij</strong> (alleen bij u weg) of <strong>Verwijderen voor iedereen</strong> (ook bij de ander, binnen ca. 1 uur).</li>
            </ol>
            <h3 className="text-senior-lg font-bold text-navy mt-6">Bericht beantwoorden</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li><strong>Houd uw vinger lang</strong> op het bericht. Kies <strong>Beantwoorden</strong> (of het pijl-icoon naar links).</li>
              <li>Typ uw antwoord. Het bericht waarop u reageert staat erboven als verwijzing. Tik op Versturen.</li>
            </ol>
            <p className="mt-4 text-senior-base text-navy/70">
              Tip: handig in drukke groepen om duidelijk te maken op welk bericht u reageert.
            </p>
          </div>

          {/* 2. Organisatie: pinnen, archief, zoeken */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              2. Organisatie: gesprek pinnen, archief en zoeken
            </h2>
            <StepIllustration step={2}>
              <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                <rect x="25" y="25" width="70" height="20" rx="4" fill="#FEF3C7" stroke="#9CA3AF"/>
                <circle cx="35" cy="35" r="4" fill="#F59E0B"/>
                <rect x="25" y="55" width="70" height="15" rx="4" fill="#D1D5DB"/>
                <rect x="25" y="78" width="70" height="15" rx="4" fill="#D1D5DB"/>
                <text x="60" y="152" textAnchor="middle" fill="#6B7280" fontSize="10">Pinnen, archief</text>
              </svg>
            </StepIllustration>
            <h3 className="text-senior-lg font-bold text-navy mt-4">Gesprek pinnen</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li><strong>Houd uw vinger lang</strong> op het gesprek in de chatlijst. Kies <strong>Vastmaken</strong> of <strong>Pinnen</strong>.</li>
              <li>Het gesprek blijft bovenaan staan, ook als er nieuwe berichten binnenkomen.</li>
            </ol>
            <h3 className="text-senior-lg font-bold text-navy mt-6">Gesprek archiveren (opbergen)</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li><strong>Houd uw vinger lang</strong> op het gesprek. Kies <strong>Archiveren</strong> (opbergen).</li>
              <li>Het gesprek verdwijnt uit de hoofdlijst maar blijft bewaard. U vindt het terug door met uw vinger naar beneden te vegen op de chatlijst, of via het menu.</li>
            </ol>
            <h3 className="text-senior-lg font-bold text-navy mt-6">Zoeken in gesprekken</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li>Tik bovenaan in WhatsApp op het <strong>zoek-icoon</strong> (vergrootglas).</li>
              <li>Typ een woord of naam. U ziet gesprekken en berichten die overeenkomen.</li>
            </ol>
            <p className="mt-4 text-senior-base text-navy/70">
              Tip: pinnen is handig voor gesprekken met familie of de huisarts die u vaak nodig heeft.
            </p>
          </div>

          {/* 3. Groepen: dempen, admin, verlaten */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              3. Groepen: dempen, admin en groep verlaten
            </h2>
            <StepIllustration step={3}>
              <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                <circle cx="40" cy="40" r="12" fill="#9CA3AF"/>
                <circle cx="80" cy="40" r="12" fill="#9CA3AF"/>
                <path d="M55 55 L65 55 L60 65 Z" fill="#F59E0B"/>
                <rect x="30" y="90" width="60" height="35" rx="6" fill="white" stroke="#9CA3AF"/>
                <text x="60" y="152" textAnchor="middle" fill="#6B7280" fontSize="10">Groepsinfo</text>
              </svg>
            </StepIllustration>
            <h3 className="text-senior-lg font-bold text-navy mt-4">Groep dempen (mute)</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li>Open de groep. Tik op de <strong>groepsnaam</strong> bovenaan.</li>
              <li>Kies <strong>Meldingen dempen</strong> of <strong>Stil</strong>. Kies voor hoe lang (8 uur, 1 week, altijd).</li>
              <li>U krijgt geen meldingen meer van die groep, maar u kunt wel nog berichten lezen wanneer u wilt.</li>
            </ol>
            <h3 className="text-senior-lg font-bold text-navy mt-6">Beheerder van de groep</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li>De <strong>aanmaker</strong> van de groep is automatisch beheerder. Beheerders kunnen mensen toevoegen, verwijderen en groepsinstellingen wijzigen.</li>
              <li>Andere beheerders toevoegen: groepsnaam → Deelnemers → lang indrukken op een naam → Beheerder maken.</li>
            </ol>
            <h3 className="text-senior-lg font-bold text-navy mt-6">Groep verlaten</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li>Tik op de groepsnaam, veeg of scroll naar beneden, en tik op <strong>Groep verlaten</strong>. Bevestig met &quot;Ja&quot; of &quot;Verlaten&quot;.</li>
              <li>U ontvangt geen berichten meer. De groep blijft bestaan voor de anderen.</li>
            </ol>
            <p className="mt-4 text-senior-base text-navy/70">
              Tip: dempen is handig bij drukke groepen waar u niet op elk bericht hoeft te reageren.
            </p>
          </div>

          {/* 4. Privacy */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              4. Privacy: laatst gezien, profielfoto en leesbevestigingen
            </h2>
            <StepIllustration step={4}>
              <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                <circle cx="60" cy="50" r="25" fill="#9CA3AF"/>
                <rect x="35" y="85" width="50" height="40" rx="4" fill="white" stroke="#9CA3AF"/>
                <text x="60" y="105" textAnchor="middle" fill="#6B7280" fontSize="8">Privacy</text>
                <text x="60" y="152" textAnchor="middle" fill="#6B7280" fontSize="10">Instellingen</text>
              </svg>
            </StepIllustration>
            <h3 className="text-senior-lg font-bold text-navy mt-4">Waar vindt u de instellingen?</h3>
            <p className="text-senior-base text-navy leading-relaxed">
              Open WhatsApp en ga naar het scherm met uw chatlijst. Tik rechtsboven op de <strong>drie puntjes</strong> (⋮) of het <strong>tandwiel-icoon</strong>. Kies <strong>Instellingen</strong>. Op sommige telefoons staat &quot;Instellingen&quot; als tab onderaan.
            </p>
            <h3 className="text-senior-lg font-bold text-navy mt-6">Privacy-opties</h3>
            <p className="text-senior-base text-navy leading-relaxed">
              Ga naar <strong>Instellingen → Account → Privacy</strong>. Daar kunt u bepalen wat anderen van u zien.
            </p>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed mt-4">
              <li><strong>Laatst gezien:</strong> Wanneer u voor het laatst online was. Kies: Iedereen, Mijn contacten, of Niemand.</li>
              <li><strong>Profielfoto:</strong> Wie uw profielfoto mag zien. Kies: Iedereen, Mijn contacten, of Niemand.</li>
              <li><strong>Leesbevestigingen:</strong> De twee blauwe vinkjes die verschijnen als iemand uw bericht heeft gelezen – aan of uit. Als uit: anderen zien niet wanneer u een bericht hebt gelezen.</li>
            </ol>
            <p className="mt-4 text-senior-base text-navy/70">
              Tip: veel senioren zetten &quot;Laatst gezien&quot; op Niemand of alleen contacten, voor meer rust.
            </p>
          </div>

          {/* 5. Media en back-up */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              5. Media en back-up: downloaden en reservekopie
            </h2>
            <StepIllustration step={5}>
              <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                <rect x="35" y="45" width="50" height="35" rx="4" fill="#D1D5DB" stroke="#9CA3AF"/>
                <path d="M55 95 L60 105 L65 95" stroke="#25D366" strokeWidth="2" fill="none"/>
                <rect x="40" y="115" width="40" height="25" rx="4" fill="#9CA3AF"/>
                <text x="60" y="152" textAnchor="middle" fill="#6B7280" fontSize="10">Back-up</text>
              </svg>
            </StepIllustration>
            <h3 className="text-senior-lg font-bold text-navy mt-4">Waar vindt u de instellingen?</h3>
            <p className="text-senior-base text-navy leading-relaxed">
              Net als bij Privacy: open WhatsApp, tik op de <strong>drie puntjes</strong> (⋮) of het <strong>tandwiel</strong> rechtsboven, en kies <strong>Instellingen</strong>. Neem gerust uw tijd om door de menu&apos;s te gaan.
            </p>
            <h3 className="text-senior-lg font-bold text-navy mt-6">Automatisch downloaden</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li>In Instellingen: tik op <strong>Opslag en gegevens</strong>, daarna op <strong>Media automatisch downloaden</strong>.</li>
              <li>U kunt kiezen wanneer foto&apos;s en video&apos;s mogen binnenkomen: via <strong>WiFi</strong> (thuisnetwerk), via <strong>mobiele data</strong> (internet onderweg), of <strong>nooit</strong> (alleen handmatig als u erop tikt).</li>
              <li>Tip: zet video&apos;s op &quot;Alleen WiFi&quot; – dat bespaart uw mobiele data en voorkomt onverwachte kosten.</li>
            </ol>
            <h3 className="text-senior-lg font-bold text-navy mt-6">Back-up maken (reservekopie)</h3>
            <p className="text-senior-base text-navy leading-relaxed mb-2">
              Een <strong>back-up</strong> is een reservekopie van uw gesprekken. Handig als uw telefoon kapot gaat of zoekraakt – dan kunt u uw berichten en foto&apos;s terugzetten op een nieuwe telefoon.
            </p>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li>In Instellingen: tik op <strong>Chats</strong>, daarna op <strong>Back-up van chat</strong>.</li>
              <li>Tik op <strong>Back-up maken</strong>. De kopie wordt opgeslagen (vaak in uw Google-account of op de telefoon).</li>
              <li>Bij een nieuwe telefoon: installeer WhatsApp en kies bij het opstarten voor &quot;Back-up herstellen&quot;. Uw gesprekken komen dan terug.</li>
            </ol>
            <p className="mt-4 text-senior-base text-navy/70">
              Tip: maak regelmatig een back-up, bijvoorbeeld elke zondag. Dan bent u gerust als er iets met uw telefoon gebeurt.
            </p>
          </div>

          {/* Veiligheid */}
          <div className="bg-white rounded-2xl border border-navy/10 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              Veiligheid: zo blijft u veilig op WhatsApp
            </h2>
            <p className="text-senior-base text-navy leading-relaxed mb-4">
              Met deze tips loopt u minder risico op oplichting of misbruik.
            </p>
            <ul className="space-y-3 text-senior-base text-navy leading-relaxed list-disc list-outside pl-6">
              <li><strong>Alleen mensen die u kent:</strong> Beantwoord geen berichten van onbekende nummers. Als u iemand niet kent, kunt u het gesprek negeren of blokkeren (lang indrukken op het gesprek → Blokkeren).</li>
              <li><strong>Geen wachtwoorden of bankgegevens:</strong> Stuur nooit uw wachtwoord, pincode of bankgegevens via WhatsApp. Geen enkele bank of officiële instantie vraagt daarom via WhatsApp.</li>
              <li><strong>Geen vreemde links aanklikken:</strong> Tik niet op links in berichten van onbekenden. Soms proberen oplichters zo gegevens te stelen. Bij twijfel: niet tikken.</li>
              <li><strong>Iemand vraagt om geld:</strong> Als iemand die beweert uw kleinkind of kennis te zijn om geld vraagt, bel dan eerst op een nummer dat u al had (niet het nummer uit het bericht) om te controleren of het klopt.</li>
              <li><strong>Twee-staps-verificatie (extra beveiliging):</strong> In <strong>Instellingen → Account → Twee-staps-verificatie</strong> kunt u een pincode instellen. Dan hebben anderen uw telefoon nodig én die pincode om WhatsApp te gebruiken. Dat maakt het voor dieven lastiger.</li>
            </ul>
            <p className="mt-4 text-senior-base text-navy/70">
              Heeft u iets verdachts gezien of gedaan? Neem contact op met iemand die u vertrouwt of met uw bank als het om geld gaat. U kunt ook aangifte doen bij de politie.
            </p>
          </div>

          {/* Samenvatting */}
          <div className="bg-gold/10 border border-navy/8 rounded-2xl p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Kort samengevat
            </h2>
            <ul className="space-y-2 text-senior-sm md:text-senior-base text-navy">
              <li><strong>Berichten:</strong> Lang indrukken → Doorsturen, Verwijderen of Beantwoorden.</li>
              <li><strong>Organisatie:</strong> Lang indrukken op gesprek → Pinnen of Archiveren. Zoeken via vergrootglas.</li>
              <li><strong>Groepen:</strong> Groepsnaam → Meldingen dempen, Beheerder, of Groep verlaten.</li>
              <li><strong>Privacy:</strong> Instellingen → Account → Privacy → Laatst gezien, profielfoto, leesbevestigingen.</li>
              <li><strong>Media & back-up:</strong> Instellingen → Opslag/Media en Chats/Back-up. Regelmatig back-up maken.</li>
              <li><strong>Veiligheid:</strong> Geen wachtwoorden of bankgegevens sturen, geen vreemde links tikken, bij geldvragen eerst bellen. Twee-staps-verificatie in Instellingen → Account.</li>
            </ul>
          </div>

          {/* Navigatie */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link
              href="/uitleg/whatsapp-deel2"
              className="inline-block px-8 py-4 bg-gold text-white font-bold text-senior-base rounded-xl hover:bg-gold-light border border-navy/8 min-h-[56px] flex items-center justify-center"
            >
              WhatsApp – Deel 2
            </Link>
            <Link
              href="/uitleg/whatsapp-basis"
              className="inline-block px-8 py-4 bg-white text-gold font-bold text-senior-base rounded-xl border border-navy/8 hover:bg-cream min-h-[56px] flex items-center justify-center"
            >
              WhatsApp – Eerste stappen
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
