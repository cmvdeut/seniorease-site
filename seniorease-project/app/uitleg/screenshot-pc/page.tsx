import { buildPageMetadata } from '@/lib/seo';
import UitlegJsonLd from '@/app/components/UitlegJsonLd';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = buildPageMetadata({
  path: '/uitleg/screenshot-pc',
  title: "Screenshot maken op uw computer — uitleg voor senioren",
  description: "Hoe maakt u een foto van uw computerscherm (screenshot) op Windows of Mac? Waar vindt u die foto terug? Stap voor stap uitgelegd.",
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

export default function ScreenshotPcPage() {
  const windowsStappen: Stap[] = [
    {
      stap: 'Hele scherm — sneltoets',
      uitleg: (
        <>
          Druk op de toets <strong>PrtScn</strong> (Print Screen, vaak rechtsboven op het toetsenbord). De foto staat op het klembord. Open <strong>Paint</strong> of <strong>Word</strong>, klik in het document en druk <strong>Ctrl + V</strong> om te plakken. Sla op via <strong>Bestand → Opslaan als</strong>.
        </>
      ),
      tip: 'Werkt PrtScn niet? Probeer Fn + PrtScn — op sommige laptops moet u de Fn-toets meedrukken.',
    },
    {
      stap: 'Deel van het scherm kiezen (Windows 10/11)',
      uitleg: (
        <>
          Druk tegelijk op <strong>Windows-toets + Shift + S</strong>. Het scherm wordt grijs. Sleep met de muis een rechthoek om het stuk dat u wilt vastleggen. De foto wordt gekopieerd — plak hem in Paint of Word met <strong>Ctrl + V</strong>, of klik op de melding rechtsonder om direct op te slaan.
        </>
      ),
    },
    {
      stap: 'Hele scherm direct opslaan',
      uitleg: (
        <>
          Druk op <strong>Windows-toets + PrtScn</strong>. Het scherm flitst kort. De screenshot staat in de map <strong>Afbeeldingen → Schermafbeeldingen</strong> (of <strong>Pictures → Screenshots</strong> in het Engels).
        </>
      ),
    },
  ];

  const macStappen: Stap[] = [
    {
      stap: 'Hele scherm (Mac)',
      uitleg: (
        <>
          Druk tegelijk op <strong>Shift + Command (⌘) + 3</strong>. U hoort een cameraschuttergeluid. De foto staat op uw <strong>Bureaublad</strong>.
        </>
      ),
    },
    {
      stap: 'Deel van het scherm (Mac)',
      uitleg: (
        <>
          Druk tegelijk op <strong>Shift + Command (⌘) + 4</strong>. De muis wordt een kruis. Sleep een rechthoek. Loslaten = klaar. Ook deze foto staat op het Bureaublad.
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <UitlegJsonLd slug="screenshot-pc" />
      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/digitale-hulp/computer" className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base">
              ← Computer hulp
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              Screenshot maken op uw computer
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Een foto van uw scherm — handig om iets te bewaren of door te sturen.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Computer uitleg navigatie">
              <span className="text-senior-sm text-navy/55 font-semibold mr-1">💻 Computer:</span>
              <span className="text-senior-sm font-bold text-gold underline">Screenshot pc</span>
              <Link href="/uitleg/letters-groter-pc" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Letters groter</Link>
              <Link href="/uitleg/programma-installeren" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Programma installeren</Link>
              <Link href="/digitale-hulp/screenshot-en-schermopname-telefoon" className="text-senior-sm font-bold text-gold hover:text-gold-light hover:underline">Screenshot telefoon</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Wat is een screenshot?</h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed">
              Een <strong>screenshot</strong> (schermafbeelding) is een foto van wat er op uw scherm staat. Handig voor een foutmelding, een bevestiging, een recept of een bericht dat u wilt bewaren of naar familie wilt sturen. Op de telefoon werkt het anders — zie{' '}
              <Link href="/digitale-hulp/screenshot-en-schermopname-telefoon" className="font-semibold text-gold hover:text-gold-light">Screenshot op telefoon</Link>.
            </p>
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">Windows — stap voor stap</h2>
            <StappenLijst stappen={windowsStappen} />
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-6">Mac — stap voor stap</h2>
            <StappenLijst stappen={macStappen} />
          </section>

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Waar vind ik mijn screenshot?</h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
              Op Windows vaak in <strong>Afbeeldingen → Schermafbeeldingen</strong>. Heeft u zelf opgeslagen? Kijk in <strong>Downloads</strong> of op het <strong>Bureaublad</strong>. Meer hulp:{' '}
              <Link href="/uitleg/bestanden-vinden" className="font-semibold text-gold hover:text-gold-light">Bestanden vinden</Link>.
            </p>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed">
              Wilt u de foto per e-mail sturen? Zie{' '}
              <Link href="/uitleg/email-bijlage" className="font-semibold text-gold hover:text-gold-light">E-mail bijlage openen en opslaan</Link> — daar staat ook hoe u zelf een bijlage toevoegt.
            </p>
          </section>

          <section className="bg-cream border-2 border-navy/8/20 rounded-2xl p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">Let op bij delen</h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed">
              Controleer vóór u een screenshot doorstuurt of er geen <strong>wachtwoorden</strong>, <strong>bankgegevens</strong> of persoonlijke brieven in beeld staan. Meer over veilig omgaan met gegevens:{' '}
              <Link href="/uitleg/veiligheid" className="font-semibold text-gold hover:text-gold-light">Oplichting herkennen</Link>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
