import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Bestanden vinden op uw computer — Downloads, Bureaublad en Verkenner',
  description:
    'Waar staan uw foto\'s, brieven en downloads op de computer? Rustige uitleg over Verkenner, Downloads en Bureaublad voor senioren.',
};

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

export default function BestandenVindenPage() {
  const verkennerStappen: Stap[] = [
    {
      stap: 'Verkenner openen',
      uitleg: (
        <>
          Klik op het <strong>map-icoon</strong> in de taakbalk onderaan (vaak blauw/geel). Heet <strong>Verkenner</strong> of <strong>Bestanden</strong>. Op sommige pc&apos;s staat het ook in het menu Start.
        </>
      ),
    },
    {
      stap: 'Downloads openen',
      uitleg: (
        <>
          Links in het venster ziet u mappen. Klik op <strong>Downloads</strong>. Hier belanden bestanden die u van internet heeft opgehaald — bijvoorbeeld een bijlage uit e-mail of een foto van een website.
        </>
      ),
      tip: 'Ziet u Downloads niet? Typ linksboven in de zoekbalk van Verkenner: Downloads.',
    },
    {
      stap: 'Bureaublad en Afbeeldingen',
      uitleg: (
        <>
          <strong>Bureaublad</strong> = het scherm met iconen waar u vaak programma&apos;s start. Bestanden die u daar opslaat, staan op het bureaublad én in de map Bureaublad in Verkenner.
          <br /><br />
          <strong>Afbeeldingen</strong> (of <strong>Pictures</strong>) = vaak de plek voor foto&apos;s die u bewust heeft opgeslagen.
        </>
      ),
    },
    {
      stap: 'Zoeken op bestandsnaam',
      uitleg: (
        <>
          Weet u (een deel van) de naam? Klik linksboven in Verkenner op het <strong>zoekveld</strong> (&quot;Zoeken in …&quot;). Typ bijvoorbeeld <strong>verjaardag</strong> of <strong>.pdf</strong>. Windows toont passende bestanden.
        </>
      ),
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
              Bestanden vinden op uw computer
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Downloads, Bureaublad, Afbeeldingen — waar is mijn bestand gebleven?
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Computer uitleg navigatie">
              <span className="text-senior-sm text-gray-500 font-semibold mr-1">💻 Computer:</span>
              <Link href="/uitleg/email-bijlage" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">E-mail bijlage</Link>
              <span className="text-senior-sm font-bold text-primary underline">Bestanden vinden</span>
              <Link href="/uitleg/computer-traag" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Computer traag</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Drie plekken die u het meest nodig heeft</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { icon: '📥', label: 'Downloads', desc: 'Van internet of e-mail' },
                { icon: '🖥️', label: 'Bureaublad', desc: 'Iconen op uw startscherm' },
                { icon: '🖼️', label: 'Afbeeldingen', desc: 'Foto\'s die u bewaarde' },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-gray-800">{item.label}</p>
                  <p className="text-senior-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">
              U kunt niets kapotmaken door in mappen te kijken. Alleen <strong>verwijderen</strong> haalt bestanden weg — en dan vaak eerst naar de <strong>Prullenbak</strong>, waar u ze nog terug kunt halen.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">Verkenner gebruiken (Windows)</h2>
            <StappenLijst stappen={verkennerStappen} />
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Mac gebruiker?</h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              Op een Mac heet het programma <strong>Finder</strong> (blauw gezichtje in de dock). Links ziet u <strong>Downloads</strong>, <strong>Bureaublad</strong> en <strong>Afbeeldingen</strong> — hetzelfde idee als Verkenner op Windows.
            </p>
          </section>

          <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-gray-800 mb-4">Veelgestelde vragen</h2>
            <div className="space-y-4">
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Ik heb op Download geklikt — waar is het?</p>
                <p className="text-senior-base text-gray-700">Meestal in de map <strong>Downloads</strong> in Verkenner. Soms vraagt de computer eerst waar u wilt opslaan — kies een map en onthoud die naam.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-gray-800 mb-1">Ik heb per ongeluk iets verwijderd</p>
                <p className="text-senior-base text-gray-700">Open de <strong>Prullenbak</strong> op het bureaublad. Staat het bestand erin? Rechtsklik → <strong>Herstellen</strong>.</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl border-4 border-neutral-stone p-8">
            <h2 className="text-senior-xl font-bold text-primary mb-4">Meer uitleg</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/email-bijlage" className="text-senior-base font-bold text-primary hover:underline">E-mail bijlage openen →</Link></li>
              <li><Link href="/uitleg/fotos-naar-computer" className="text-senior-base font-bold text-primary hover:underline">Foto&apos;s naar computer →</Link></li>
              <li><Link href="/digitale-hulp/wat-is-de-cloud" className="text-senior-base font-bold text-primary hover:underline">Wat is de cloud? →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
