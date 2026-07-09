import { buildPageMetadata } from '@/lib/seo';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = buildPageMetadata({
  path: '/uitleg/letters-groter-pc',
  title: "Letters groter maken op uw computer — uitleg voor senioren",
  description: "Tekst te klein op uw pc of laptop? Zo zet u grotere letters aan in Windows, Mac en in uw browser. Stap voor stap voor senioren.",
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

export default function LettersGroterPcPage() {
  const windowsStappen: Stap[] = [
    {
      stap: 'Tekstgrootte in Windows aanpassen',
      uitleg: (
        <>
          Klik op <strong>Start</strong> → <strong>Instellingen</strong> (tandwiel) → <strong>Toegankelijkheid</strong> → <strong>Weergave</strong>. Bij <strong>Tekstgrootte</strong> sleept u de schuif naar rechts voor grotere letters. Klik op <strong>Toepassen</strong>.
        </>
      ),
      tip: 'Oudere Windows? Zoek in Instellingen naar &quot;Schaal en indeling&quot; en verhoog het percentage (bijv. 125% of 150%).',
    },
    {
      stap: 'Alles groter maken (schalen)',
      uitleg: (
        <>
          In dezelfde instellingen kunt u ook <strong>Schaal</strong> verhogen — dan worden knoppen, tekst én vensters groter. Probeer 125% als standaard te klein is.
        </>
      ),
    },
  ];

  const macStappen: Stap[] = [
    {
      stap: 'Tekst groter op Mac',
      uitleg: (
        <>
          Klik op het <strong>Apple-menu</strong> → <strong>Systeeminstellingen</strong> → <strong>Beeldschermen</strong>. Kies een lagere <strong>resolutie</strong> (grotere items) of zet <strong>Schaal</strong> op &quot;Groter tekst&quot;.
        </>
      ),
    },
  ];

  const browserStappen: Stap[] = [
    {
      stap: 'Alleen een website groter (inzoomen)',
      uitleg: (
        <>
          In Chrome, Edge of Firefox: druk <strong>Ctrl + plus (+)</strong> om in te zoomen. <strong>Ctrl + min (-)</strong> maakt weer kleiner. <strong>Ctrl + 0</strong> zet terug naar normaal. Op Mac: <strong>Command + plus</strong>.
        </>
      ),
      tip: 'Veel browsers onthouden uw zoom per site — handig als u vaak dezelfde pagina bezoekt.',
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-cream">
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/digitale-hulp/computer" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base">
              ← Computer hulp
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Letters groter maken op uw computer
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Beter lezen op uw pc, laptop of in de browser — zonder moeite.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Computer uitleg navigatie">
              <span className="text-senior-sm text-gray-500 font-semibold mr-1">💻 Computer:</span>
              <Link href="/uitleg/screenshot-pc" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Screenshot pc</Link>
              <span className="text-senior-sm font-bold text-primary underline">Letters groter</span>
              <Link href="/uitleg/programma-installeren" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Programma installeren</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Te kleine letters?</h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
              Veel mensen vinden de standaard tekst op een computer te klein. Gelukkig kunt u dat aanpassen — voor het hele systeem, of alleen in uw browser. Op uw telefoon werkt het anders: zie{' '}
              <Link href="/digitale-hulp/letters-groter-maken-telefoon" className="font-bold text-primary hover:underline">Letters groter op telefoon</Link>.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Windows</h2>
            <StappenLijst stappen={windowsStappen} />
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Mac</h2>
            <StappenLijst stappen={macStappen} />
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Websites groter lezen (browser)</h2>
            <StappenLijst stappen={browserStappen} />
          </section>

          <section className="bg-neutral-cream border-2 border-primary/20 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">E-books met grote letters</h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
              Leest u graag boeken op tablet of e-reader? In de Libby-app kunt u de lettergrootte vrij instellen. Zie{' '}
              <Link href="/uitleg/ebooks" className="font-bold text-primary hover:underline">E-books lezen</Link>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
