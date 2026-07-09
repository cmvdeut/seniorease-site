import { buildPageMetadata } from '@/lib/seo';
import UitlegJsonLd from '@/app/components/UitlegJsonLd';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = buildPageMetadata({
  path: '/uitleg/computer-traag',
  title: "Computer traag of vastgelopen — wat kunt u doen?",
  description: "Uw computer reageert niet meer of wordt steeds trager? Rustige stappen: programma\\",
});

type Stap = { stap: string; uitleg: ReactNode; tip?: string };

function StappenLijst({ stappen }: { stappen: Stap[] }) {
  return (
    <ol className="space-y-6">
      {stappen.map((item, i) => (
        <li key={i} className="flex gap-5 items-start list-none">
          <div className="flex-shrink-0 w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center font-bold text-senior-lg">
            {i + 1}
          </div>
          <div className="pt-1 flex-1">
            <p className="text-senior-base font-bold text-gray-800 mb-1">{item.stap}</p>
            <div className="text-senior-base text-gray-700 leading-relaxed">{item.uitleg}</div>
            {item.tip && (
              <p className="text-senior-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-2">
                💡 {item.tip}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ComputerTraagPage() {
  const vastgelopenStappen: Stap[] = [
    {
      stap: 'Even wachten',
      uitleg: 'Soms denkt de computer even na — bijvoorbeeld na een grote update. Wacht 1 à 2 minuten voordat u verder gaat.',
    },
    {
      stap: 'Eén programma sluiten',
      uitleg: (
        <>
          Klik rechtsboven in het venster op het <strong>kruisje ✕</strong>. Werkt dat niet? Houd <strong>Ctrl</strong> ingedrukt en druk op <strong>Shift</strong> en <strong>Esc</strong> tegelijk — dan opent <strong>Taakbeheer</strong>. Klik op een programma → <strong>Taak beëindigen</strong>.
        </>
      ),
      tip: 'Op een Mac: druk tegelijk op Option + Command + Esc om een vast programma te sluiten.',
    },
    {
      stap: 'Computer herstarten',
      uitleg: (
        <>
          Klik op <strong>Start</strong> (Windows-logo linksonder) → <strong>Aan/uit</strong> → <strong>Opnieuw opstarten</strong>. Sla eerst open documenten op als u nog kunt. Na herstart werkt veel weer normaal.
        </>
      ),
    },
  ];

  const traagStappen: Stap[] = [
    {
      stap: 'Te veel programma\'s tegelijk open?',
      uitleg: (
        <>
          Elk open venster kost geheugen. Sluit wat u niet gebruikt — e-mail, browser met veel tabbladen, oude documenten. Alleen het kruisje ✕ is genoeg.
        </>
      ),
    },
    {
      stap: 'Schijf bijna vol?',
      uitleg: (
        <>
          Is de opslag vol, dan wordt alles trager. Verwijder oude bestanden uit <strong>Downloads</strong>, leeg de <strong>Prullenbak</strong>, of verplaats foto&apos;s naar een externe schijf. Zie{' '}
          <Link href="/uitleg/bestanden-vinden" className="font-bold text-primary hover:underline">Bestanden vinden</Link>.
        </>
      ),
    },
    {
      stap: 'Updates laten afronden',
      uitleg: (
        <>
          Windows installeert soms updates op de achtergrond. Laat de computer een keer rustig <strong>herstarten</strong> na een melding &quot;Update vereist&quot;. Dat hoort bij onderhoud — geen paniek.
        </>
      ),
      tip: 'Klik nooit op vreemde pop-ups met &quot;Uw computer is besmet! Bel dit nummer!&quot; — dat is oplichting, geen echte Windows-melding.',
    },
    {
      stap: 'Internet traag of computer traag?',
      uitleg: (
        <>
          Werkt alleen websites langzaam? Dan kan het aan <strong>wifi</strong> liggen, niet aan de pc. Zie{' '}
          <Link href="/digitale-hulp/wifi-werkt-niet-oplossen" className="font-bold text-primary hover:underline">Wifi werkt niet – oplossen</Link>.
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-cream">
      <UitlegJsonLd slug="computer-traag" />
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/digitale-hulp/computer" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base">
              ← Computer hulp
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Computer traag of vastgelopen
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Rustig stappenplan — u kunt zelf meer oplossen dan u denkt.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Computer uitleg navigatie">
              <span className="text-senior-sm text-gray-500 font-semibold mr-1">💻 Computer:</span>
              <Link href="/uitleg/email-bijlage" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">E-mail bijlage</Link>
              <Link href="/uitleg/bestanden-vinden" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Bestanden vinden</Link>
              <span className="text-senior-sm font-bold text-primary underline">Computer traag</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Eerst dit onderscheid</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
                <p className="text-senior-base font-bold text-red-800 mb-2">Vastgelopen</p>
                <p className="text-senior-sm text-gray-700">Muis beweegt niet, scherm reageert niet, alles staat stil.</p>
              </div>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
                <p className="text-senior-base font-bold text-amber-800 mb-2">Traag</p>
                <p className="text-senior-sm text-gray-700">Alles duurt langer — openen, typen, pagina&apos;s laden.</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Als de computer vastloopt</h2>
            <StappenLijst stappen={vastgelopenStappen} />
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Als de computer traag wordt</h2>
            <StappenLijst stappen={traagStappen} />
          </section>

          <section className="bg-neutral-cream border-2 border-primary/20 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Wanneer hulp vragen?</h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              Blijft de pc na herstarten elke dag vastlopen? Horen harde geluiden? Of krijgt u steeds vreemde waarschuwingen? Vraag dan een familielid of een lokale computerhulp. Bewaar belangrijke foto&apos;s en documenten op een usb-stick of in de cloud — zie{' '}
              <Link href="/digitale-hulp/wat-is-de-cloud" className="font-bold text-primary hover:underline">Wat is de cloud?</Link>.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/bestanden-vinden" className="text-senior-base font-bold text-primary hover:underline">Bestanden vinden →</Link></li>
              <li><Link href="/digitale-hulp/wifi-werkt-niet-oplossen" className="text-senior-base font-bold text-primary hover:underline">Wifi / internet problemen →</Link></li>
              <li><Link href="/uitleg/veiligheid" className="text-senior-base font-bold text-primary hover:underline">Nep-waarschuwingen herkennen →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
