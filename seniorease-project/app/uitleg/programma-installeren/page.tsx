import { buildPageMetadata } from '@/lib/seo';
import UitlegJsonLd from '@/app/components/UitlegJsonLd';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = buildPageMetadata({
  path: '/uitleg/programma-installeren',
  title: "Programma installeren op uw computer — uitleg voor senioren",
  description: "Hoe installeert u veilig een programma op Windows of Mac? Microsoft Store, officiële website en waar u op moet letten. Stap voor stap.",
});

type Stap = { stap: string; uitleg: ReactNode; tip?: string };

function StappenLijst({ stappen }: { stappen: Stap[] }) {
  return (
    <ol className="space-y-6">
      {stappen.map((item, i) => (
        <li key={i} className="flex gap-5 items-start list-none">
          <div className="flex-shrink-0 w-11 h-11 bg-gold text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
            {i + 1}
          </div>
          <div className="pt-1 flex-1">
            <p className="text-senior-base font-bold text-navy mb-1">{item.stap}</p>
            <div className="text-senior-base text-navy/80 leading-relaxed">{item.uitleg}</div>
            {item.tip && (
              <p className="text-senior-sm text-navy/70 bg-paper border border-navy/10 rounded-lg px-3 py-2 mt-2">
                {item.tip}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ProgrammaInstallerenPage() {
  const storeStappen: Stap[] = [
    {
      stap: 'Microsoft Store openen (Windows)',
      uitleg: (
        <>
          Klik op <strong>Start</strong> en typ <strong>Microsoft Store</strong>. Open de app (winkel-icoon). Dit is de officiële &quot;winkel&quot; voor programma&apos;s op Windows — vergelijkbaar met de Play Store op uw telefoon.
        </>
      ),
    },
    {
      stap: 'Zoeken en installeren',
      uitleg: (
        <>
          Typ bovenaan de naam van het programma (bijv. <strong>Spotify</strong> of <strong>LibreOffice</strong>). Klik op het juiste resultaat → <strong>Installeren</strong> of <strong>Ophalen</strong>. Wacht tot het klaar is. Het programma verschijnt in Start.
        </>
      ),
      tip: 'Op Mac: open de <strong>App Store</strong> (blauw icoon) en zoek op dezelfde manier.',
    },
  ];

  const websiteStappen: Stap[] = [
    {
      stap: 'Alleen van de echte website downloaden',
      uitleg: (
        <>
          Sommige programma&apos;s staan niet in de Store. Ga dan naar de <strong>officiële website</strong> van het bedrijf — bijv. <strong>adobe.com</strong>, niet via een vreemde link in een e-mail. Klik op <strong>Downloaden</strong> en kies de versie voor Windows of Mac.
        </>
      ),
      tip: 'Twijfelt u over een link? Vraag een familielid of typ het adres zelf in de browser — niet klikken op links in e-mails.',
    },
    {
      stap: 'Installatiebestand openen',
      uitleg: (
        <>
          Het bestand komt meestal in <strong>Downloads</strong>. Dubbelklik op het bestand (eindigt vaak op <strong>.exe</strong> op Windows). Volg de stappen: <strong>Volgende</strong>, <strong>Installeren</strong>, <strong>Voltooien</strong>. Lees mee — vink geen extra programma&apos;s aan die u niet kent.
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <UitlegJsonLd slug="programma-installeren" />
      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/digitale-hulp/computer" className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base">
              ← Computer hulp
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              Programma installeren op uw computer
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Veilig software op uw pc zetten — via de winkel of de officiële website.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Computer uitleg navigatie">
              <span className="text-senior-sm text-navy/55 font-semibold mr-1">💻 Computer:</span>
              <Link href="/uitleg/screenshot-pc" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Screenshot pc</Link>
              <Link href="/uitleg/letters-groter-pc" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Letters groter</Link>
              <span className="text-senior-sm font-bold text-gold underline">Programma installeren</span>
              <Link href="/digitale-hulp/apps-installeren" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Apps op telefoon</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Programma vs app</h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed">
              Op uw <strong>telefoon</strong> heet het een app (Play Store of App Store). Op uw <strong>computer</strong> heet het een programma. Het idee is hetzelfde: software die u extra functies geeft — e-mail, foto&apos;s bewerken, muziek luisteren. Voor apps op uw telefoon:{' '}
              <Link href="/digitale-hulp/apps-installeren" className="font-semibold text-gold hover:text-gold-light">Apps installeren op telefoon</Link>.
            </p>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">Via Microsoft Store (aanbevolen)</h2>
            <StappenLijst stappen={storeStappen} />
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">Via de officiële website</h2>
            <StappenLijst stappen={websiteStappen} />
          </section>

          <section className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-red-800 mb-4">Waar u op moet letten</h2>
            <ul className="space-y-3 text-senior-sm md:text-senior-base text-navy/80">
              <li>❌ Klik <strong>niet</strong> op vreemde links in e-mails of pop-ups (&quot;Uw computer is besmet!&quot;).</li>
              <li>❌ Installeer geen programma&apos;s die u per telefoon laat betalen of om uw pincode vragen.</li>
              <li>✅ Gebruik de Microsoft Store, Mac App Store of de echte website van het bedrijf.</li>
              <li>✅ Heeft u hulp nodig? Vraag een vertrouwd familielid mee te kijken.</li>
            </ul>
            <p className="text-senior-sm md:text-senior-base text-navy/80 mt-4">
              Meer over nepberichten:{' '}
              <Link href="/uitleg/veiligheid" className="font-semibold text-gold hover:text-gold-light">Oplichting herkennen</Link>.
            </p>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Meer uitleg</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/bestanden-vinden" className="text-senior-base font-semibold text-gold hover:text-gold-light">Bestanden vinden (Downloads) →</Link></li>
              <li><Link href="/uitleg/computer-traag" className="text-senior-base font-semibold text-gold hover:text-gold-light">Computer traag →</Link></li>
              <li><Link href="/digitale-hulp/wifi-werkt-niet-oplossen" className="text-senior-base font-semibold text-gold hover:text-gold-light">Internet / wifi problemen →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
