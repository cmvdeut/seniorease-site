import { buildPageMetadata } from '@/lib/seo';
import UitlegJsonLd from '@/app/components/UitlegJsonLd';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = buildPageMetadata({
  path: '/uitleg/bestanden-vinden',
  title: "Bestanden vinden op uw computer — Downloads, Bureaublad en Verkenner",
  description: "Waar staan uw foto\\",
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
    <main className="min-h-screen bg-cream">
      <UitlegJsonLd slug="bestanden-vinden" />
      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/digitale-hulp/computer" className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base">
              ← Computer hulp
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              Bestanden vinden op uw computer
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Downloads, Bureaublad, Afbeeldingen — waar is mijn bestand gebleven?
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Computer uitleg navigatie">
              <span className="text-senior-sm text-navy/55 font-semibold mr-1">💻 Computer:</span>
              <Link href="/uitleg/email-bijlage" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">E-mail bijlage</Link>
              <span className="text-senior-sm font-bold text-gold underline">Bestanden vinden</span>
              <Link href="/uitleg/computer-traag" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Computer traag</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Drie plekken die u het meest nodig heeft</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { icon: '📥', label: 'Downloads', desc: 'Van internet of e-mail' },
                { icon: '🖥️', label: 'Bureaublad', desc: 'Iconen op uw startscherm' },
                { icon: '🖼️', label: 'Afbeeldingen', desc: 'Foto\'s die u bewaarde' },
              ].map((item, i) => (
                <div key={i} className="bg-cream border-2 border-navy/8/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-navy">{item.label}</p>
                  <p className="text-senior-xs text-navy/55 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed">
              U kunt niets kapotmaken door in mappen te kijken. Alleen <strong>verwijderen</strong> haalt bestanden weg — en dan vaak eerst naar de <strong>Prullenbak</strong>, waar u ze nog terug kunt halen.
            </p>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">Verkenner gebruiken (Windows)</h2>
            <StappenLijst stappen={verkennerStappen} />
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Mac gebruiker?</h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
              Op een Mac heet het programma <strong>Finder</strong> (blauw gezichtje in de dock). Links ziet u <strong>Downloads</strong>, <strong>Bureaublad</strong> en <strong>Afbeeldingen</strong> — hetzelfde idee als Verkenner op Windows.
            </p>
          </section>

          <section className="bg-paper border border-navy/10 rounded-2xl p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-navy mb-4">Veelgestelde vragen</h2>
            <div className="space-y-4">
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">Ik heb op Download geklikt — waar is het?</p>
                <p className="text-senior-base text-navy/80">Meestal in de map <strong>Downloads</strong> in Verkenner. Soms vraagt de computer eerst waar u wilt opslaan — kies een map en onthoud die naam.</p>
              </div>
              <div>
                <p className="text-senior-base font-bold text-navy mb-1">Ik heb per ongeluk iets verwijderd</p>
                <p className="text-senior-base text-navy/80">Open de <strong>Prullenbak</strong> op het bureaublad. Staat het bestand erin? Rechtsklik → <strong>Herstellen</strong>.</p>
              </div>
            </div>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Meer uitleg</h2>
            <ul className="space-y-3">
              <li><Link href="/uitleg/email-bijlage" className="text-senior-base font-semibold text-gold hover:text-gold-light">E-mail bijlage openen →</Link></li>
              <li><Link href="/uitleg/fotos-naar-computer" className="text-senior-base font-semibold text-gold hover:text-gold-light">Foto&apos;s naar computer →</Link></li>
              <li><Link href="/digitale-hulp/wat-is-de-cloud" className="text-senior-base font-semibold text-gold hover:text-gold-light">Wat is de cloud? →</Link></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
