'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const STEP_IMAGES: Record<number, string> = {
  1: '/images/uitleg/whatsapp/deel2-spraakberichten.jpg',
  2: '/images/uitleg/whatsapp/deel2-bellen.jpg',
  3: '/images/uitleg/whatsapp/deel2-status.jpg',
  4: '/images/uitleg/whatsapp/deel2-notificaties.jpg',
  5: '/images/uitleg/whatsapp/deel2-groepen.jpg',
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

export default function WhatsAppDeel2Page() {
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
              WhatsApp – Deel 2
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Spraakberichten, bellen, status, notificaties en groepen – vervolgstappen.
            </p>
          </div>
        </div>
      </header>

      <section className="max-w-senior mx-auto px-5 sm:px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Intro */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <p className="text-senior-sm md:text-senior-base text-navy leading-relaxed">
              U kunt WhatsApp naast berichten en foto&apos;s ook gebruiken voor spraakberichten, bellen en groepen.
              Hieronder vindt u uitleg in de volgorde 1 tot 5. Neem gerust uw tijd – u hoeft niet alles in één keer te doen.
            </p>
            <p className="mt-4 text-senior-base text-navy/70">
              Heeft u de basis nog niet gedaan? Start met <Link href="/uitleg/whatsapp-basis" className="text-gold font-bold underline hover:no-underline">WhatsApp – Eerste stappen</Link>. Wilt u meer? Ga door naar <Link href="/uitleg/whatsapp-deel3" className="text-gold font-bold underline hover:no-underline">Deel 3 (Geavanceerd)</Link>.{' '}
              <a href="/handleiding-whatsapp.html" target="_blank" rel="noopener noreferrer" className="text-gold font-bold underline hover:no-underline">Printbare handleiding</a> (alle delen).
            </p>
          </div>

          {/* 1. Spraakberichten */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              1. Spraakberichten: opnemen en afspelen
            </h2>
            <StepIllustration step={1}>
              <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                <rect x="25" y="60" width="70" height="45" rx="8" fill="#DCF8C6" stroke="#9CA3AF"/>
                <circle cx="60" cy="82" r="12" fill="#25D366"/>
                <path d="M52 78 L60 82 L68 78" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <rect x="30" y="118" width="60" height="20" rx="4" fill="#9CA3AF"/>
                <text x="60" y="152" textAnchor="middle" fill="#6B7280" fontSize="10">Microfoon → Opnemen</text>
              </svg>
            </StepIllustration>
            <h3 className="text-senior-lg font-bold text-navy mt-4">Spraakbericht opnemen</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li>Open het gesprek en tik naast het typveld op het <strong>microfoon-icoon</strong> (het icoon dat op een microfoon lijkt). Of houd het icoon ingedrukt tijdens het inspreken.</li>
              <li>Spreek uw bericht in. U ziet vaak een golf of timer tijdens het opnemen.</li>
              <li>Laat uw vinger los of tik op <strong>Versturen</strong> om het spraakbericht te sturen.</li>
            </ol>
            <h3 className="text-senior-lg font-bold text-navy mt-6">Spraakbericht afspelen</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li><strong>Tik op het spraakbericht</strong> in het gesprek. Het wordt dan afgespeeld.</li>
              <li>U hoort het via de telefoon of luidspreker. Tik nogmaals om te pauzeren (als de app dat ondersteunt).</li>
            </ol>
            <p className="mt-4 text-senior-base text-navy/70">
              Tip: handig als typen lastig is of als u iets persoonlijks wilt zeggen.
            </p>
          </div>

          {/* 2. Bellen */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              2. Bellen: voice- en videobellen
            </h2>
            <StepIllustration step={2}>
              <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                <circle cx="60" cy="55" r="22" fill="#25D366"/>
                <path d="M55 50 L60 55 L65 50" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <circle cx="45" cy="95" r="8" fill="#9CA3AF"/>
                <circle cx="75" cy="95" r="8" fill="#9CA3AF"/>
                <text x="60" y="115" textAnchor="middle" fill="#6B7280" fontSize="9">Voice / Video</text>
                <text x="60" y="152" textAnchor="middle" fill="#6B7280" fontSize="10">Bovenin gesprek</text>
              </svg>
            </StepIllustration>
            <p className="text-senior-base text-navy leading-relaxed">
              In een gesprek kunt u <strong>gratis bellen</strong> (alleen geluid) of <strong>videobellen</strong> (met beeld).
            </p>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed mt-4">
              <li>Open het gesprek met de persoon die u wilt bellen.</li>
              <li><strong>Alleen geluid (bellen):</strong> tik bovenaan het gesprek, naast de naam, op het <strong>telefoon-icoon</strong>. De ander krijgt een belmelding.</li>
              <li><strong>Met beeld (videobellen):</strong> tik op het <strong>videocamera-icoon</strong> (naast het telefoon-icoon). U ziet elkaar tijdens het gesprek.</li>
              <li>Om op te hangen: tik op het rode <strong>ophang-icoon</strong> onderaan.</li>
            </ol>
            <p className="mt-4 text-senior-base text-navy/70">
              Tip: voor videobellen heeft u een goede internetverbinding nodig (bijv. wifi thuis). Anders kan het beeld haperen.
            </p>
          </div>

          {/* 3. Status */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              3. Status: bekijken of plaatsen
            </h2>
            <StepIllustration step={3}>
              <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                <circle cx="60" cy="35" r="18" fill="#25D366"/>
                <text x="60" y="40" textAnchor="middle" fill="white" fontSize="12">S</text>
                <rect x="20" y="60" width="80" height="50" rx="6" fill="#D1D5DB" stroke="#9CA3AF"/>
                <text x="60" y="90" textAnchor="middle" fill="#6B7280" fontSize="8">Status</text>
                <text x="60" y="152" textAnchor="middle" fill="#6B7280" fontSize="10">Tab Status</text>
              </svg>
            </StepIllustration>
            <p className="text-senior-base text-navy leading-relaxed">
              <strong>Status</strong> is een kort bericht of foto dat uw contacten 24 uur kunnen zien (daarna verdwijnt het).
            </p>
            <h3 className="text-senior-lg font-bold text-navy mt-4">Status bekijken</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li>Open WhatsApp. Tik op het tabblad <strong>Status</strong> (of &quot;Updates&quot;) – dat staat bovenaan of onderaan het scherm, naast &quot;Chats&quot;.</li>
              <li>Tik op een naam of icoon om de status van die persoon te bekijken.</li>
            </ol>
            <h3 className="text-senior-lg font-bold text-navy mt-6">Eigen status plaatsen</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li>Ga naar het tabblad <strong>Status</strong>. Tik op <strong>Mijn status</strong> of op het plus-icoon.</li>
              <li>Maak een foto of typ een korte tekst. Tik op <strong>Versturen</strong>. Uw contacten zien dit de komende 24 uur.</li>
            </ol>
            <p className="mt-4 text-senior-base text-navy/70">
              Tip: u hoeft geen status te plaatsen; het is vrijblijvend.
            </p>
          </div>

          {/* 4. Notificaties */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              4. Notificaties: geluid en meldingen aan/uit
            </h2>
            <StepIllustration step={4}>
              <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                <circle cx="60" cy="50" r="20" fill="#FBBF24" stroke="#9CA3AF"/>
                <path d="M55 42 L60 38 L65 42 L63 48 L60 52 L57 48 Z" fill="white"/>
                <rect x="35" y="85" width="50" height="35" rx="4" fill="white" stroke="#9CA3AF"/>
                <text x="60" y="105" textAnchor="middle" fill="#6B7280" fontSize="8">Melding</text>
                <text x="60" y="152" textAnchor="middle" fill="#6B7280" fontSize="10">Instellingen</text>
              </svg>
            </StepIllustration>
            <p className="text-senior-base text-navy leading-relaxed">
              U kunt instellen of u een <strong>geluid</strong> of <strong>melding</strong> wilt bij een nieuw bericht.
            </p>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed mt-4">
              <li>Open WhatsApp. Tik op de <strong>drie puntjes</strong> (rechtsboven) of ga naar <strong>Instellingen</strong>.</li>
              <li>Tik op <strong>Notificaties</strong> (of &quot;Meldingen&quot;).</li>
              <li>Zet <strong>Meldingen</strong> aan of uit. Kies een <strong>melodie</strong> (het geluid bij een nieuw bericht) of &quot;Geen geluid&quot; als u geen geluid wilt.</li>
              <li>U kunt notificaties ook op uw telefoon zelf aan of uit zetten: ga naar de <strong>Instellingen van uw telefoon</strong> (niet in WhatsApp) → Apps → WhatsApp.</li>
            </ol>
            <p className="mt-4 text-senior-base text-navy/70">
              Tip: &quot;Stil&quot; of &quot;Geen meldingen&quot; betekent dat u geen geluid of trilling krijgt bij nieuwe berichten. U kunt WhatsApp nog wel openen om berichten te lezen wanneer u dat wilt.
            </p>
          </div>

          {/* 5. Groepen */}
          <div className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">
              5. Groepen: aanmaken, iemand toevoegen, chatten
            </h2>
            <StepIllustration step={5}>
              <svg viewBox="0 0 120 160" className="w-full h-full" aria-hidden>
                <rect x="10" y="5" width="100" height="150" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
                <circle cx="40" cy="45" r="15" fill="#9CA3AF"/>
                <circle cx="80" cy="45" r="15" fill="#9CA3AF"/>
                <circle cx="60" cy="55" r="12" fill="#6B7280"/>
                <rect x="25" y="85" width="70" height="40" rx="6" fill="#DCF8C6" stroke="#9CA3AF"/>
                <text x="60" y="108" textAnchor="middle" fill="#6B7280" fontSize="8">Groepschat</text>
                <text x="60" y="152" textAnchor="middle" fill="#6B7280" fontSize="10">Nieuwe groep</text>
              </svg>
            </StepIllustration>
            <h3 className="text-senior-lg font-bold text-navy mt-4">Groep aanmaken</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li>Open WhatsApp. Tik op het <strong>groene icoon</strong> rechtsonder (nieuwe chat) of op de drie puntjes rechtsboven.</li>
              <li>Kies <strong>Nieuwe groep</strong>.</li>
              <li>Selecteer één of meer <strong>contacten</strong> (mensen uit uw telefoon die ook WhatsApp hebben). Tik op <strong>Volgende</strong>.</li>
              <li>Geef de groep een <strong>naam</strong> (bijv. &quot;Familie&quot;) en tik op <strong>Maken</strong>.</li>
            </ol>
            <h3 className="text-senior-lg font-bold text-navy mt-6">Iemand toevoegen aan een bestaande groep</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li>Open de <strong>groep</strong>. Tik op de groepsnaam bovenaan.</li>
              <li>Kies <strong>Deelnemers toevoegen</strong> (of &quot;Voeg deelnemer toe&quot;). Selecteer het contact en bevestig.</li>
            </ol>
            <h3 className="text-senior-lg font-bold text-navy mt-6">In een groep chatten</h3>
            <ol className="list-decimal list-outside pl-6 space-y-2 text-senior-base text-navy leading-relaxed">
              <li>Tik op de <strong>groep</strong> in uw chatlijst. Typ uw bericht en tik op <strong>Versturen</strong> – net als in een gewoon gesprek.</li>
              <li>Iedereen in de groep ziet het bericht. U ziet vaak wie wat heeft geschreven (naam boven het bericht).</li>
            </ol>
            <p className="mt-4 text-senior-base text-navy/70">
              Tip: handig voor familie- of vriendengroepen, bijvoorbeeld om afspraken of foto&apos;s te delen.
            </p>
          </div>

          {/* Samenvatting */}
          <div className="bg-gold/10 border border-navy/8 rounded-2xl p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Kort samengevat
            </h2>
            <ul className="space-y-2 text-senior-sm md:text-senior-base text-navy">
              <li><strong>Spraakbericht:</strong> Microfoon-icoon → inspreken → loslaten of Versturen. Afspelen: tik op het bericht.</li>
              <li><strong>Bellen:</strong> Gesprek openen → telefoon-icoon (geluid) of videocamera-icoon (beeld). Ophangen: rood icoon.</li>
              <li><strong>Status:</strong> Tab Status → bekijken of &quot;Mijn status&quot; plaatsen (foto of tekst, 24 uur zichtbaar).</li>
              <li><strong>Notificaties:</strong> Drie puntjes → Notificaties → meldingen en geluid aan/uit.</li>
              <li><strong>Groep:</strong> Nieuwe groep → contacten kiezen → naam geven → Maken. Berichten sturen zoals in een normaal gesprek.</li>
            </ul>
          </div>

          {/* Navigatie */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link
              href="/uitleg/whatsapp-deel3"
              className="inline-block px-8 py-4 bg-gold text-white font-bold text-senior-base rounded-xl hover:bg-gold-light border border-navy/8 min-h-[56px] flex items-center justify-center"
            >
              WhatsApp – Deel 3 (Geavanceerd)
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
