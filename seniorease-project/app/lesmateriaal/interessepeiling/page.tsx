import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';
import { LESMATERIAAL_PAKKETTEN } from '../lesmateriaal-data';
import { PrintButton } from './PrintButton';

export const metadata = buildPageMetadata({
  path: '/lesmateriaal/interessepeiling',
  title: 'Interessepeiling digitale lessen',
  description:
    'Printbaar formulier om interesse te peilen onder bezoekers van buurthuis, bibliotheek of clubhuis — voordat u lesmateriaal bestelt.',
  keywords: ['interessepeiling', 'buurthuis', 'bibliotheek', 'lesmateriaal', 'senioren'],
});

const THEMA_OPTIONS = LESMATERIAAL_PAKKETTEN.map((p) => ({
  code: p.code,
  label: p.title,
}));

function FieldLine({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <div className={`mb-4 ${wide ? 'sm:col-span-2' : ''}`}>
      <p className="text-navy font-semibold text-senior-sm mb-1.5">{label}</p>
      <div className="border-b-2 border-navy/25 min-h-[2rem]" aria-hidden />
    </div>
  );
}

export default function InteressepeilingPage() {
  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-sheet { box-shadow: none !important; border: none !important; padding: 0 !important; }
          main { background: white !important; }
        }
      `}</style>

      <main className="min-h-screen bg-cream">
        <div className="max-w-senior mx-auto px-5 sm:px-6 py-10 md:py-14">
          <div className="no-print mb-8">
            <Link
              href="/lesmateriaal"
              className="text-gold hover:text-gold-light font-semibold mb-6 inline-flex text-senior-sm min-h-[44px] items-center"
            >
              ← Lesmateriaal
            </Link>
            <h1 className="font-serif text-navy text-[1.65rem] sm:text-[2rem] font-semibold leading-tight mb-3 max-w-2xl">
              Interessepeiling digitale lessen
            </h1>
            <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-6">
              Print dit formulier (of sla het op als PDF) en leg het een week in de huiskamer,
              bij het koffieapparaat of deel het op uw vrijwilligersapp. Zo ontdekt u welke
              onderwerpen leven — voordat u lesmateriaal bestelt.
            </p>
            <PrintButton />
          </div>

          <article className="print-sheet bg-paper rounded-senior border border-navy/10 p-6 sm:p-10 max-w-3xl mx-auto">
            <header className="mb-8 pb-6 border-b border-navy/15">
              <p className="text-gold font-bold text-senior-xs uppercase tracking-[0.12em] mb-2">
                SeniorEase
              </p>
              <h2 className="font-serif text-navy text-[1.5rem] font-semibold mb-2">
                Waar heeft u interesse in?
              </h2>
              <p className="text-navy/65 text-senior-sm leading-relaxed">
                Vink aan wat u aanspreekt. Meerdere keuzes mag. Geen verplichting — alleen om te
                peilen wat er leeft in ons buurthuis / clubhuis / bibliotheek.
              </p>
            </header>

            <section className="mb-8">
              <h3 className="font-serif text-navy font-semibold text-senior-base mb-4">
                Thema&apos;s (vink aan)
              </h3>
              <ul className="space-y-3 list-none p-0 m-0">
                {THEMA_OPTIONS.map(({ code, label }) => (
                  <li key={code} className="flex items-start gap-3 text-navy/85 text-senior-sm">
                    <span
                      className="shrink-0 mt-0.5 w-5 h-5 border-2 border-navy/40 rounded-sm"
                      aria-hidden
                    />
                    <span>
                      <strong className="text-navy">Pakket {code}</strong> — {label}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="font-serif text-navy font-semibold text-senior-base mb-4">
                Enkele vragen
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-6">
                <FieldLine label="Heeft u een smartphone of tablet?" />
                <FieldLine label="Heeft u wifi thuis of in de zaal?" />
                <FieldLine label="Hoe vaak komt u hier (per week)?" />
                <FieldLine label="Zou u een les van 90 minuten willen volgen?" />
                <FieldLine label="Met hoeveel mensen zou u samen willen oefenen?" wide />
                <FieldLine label="Wat wilt u het liefst leren? (vrij invullen)" wide />
              </div>
            </section>

            <section className="mb-8">
              <h3 className="font-serif text-navy font-semibold text-senior-base mb-4">
                Voor de organisatie (optioneel)
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-6">
                <FieldLine label="Naam locatie / vereniging" wide />
                <FieldLine label="Contactpersoon" />
                <FieldLine label="E-mail of telefoon" />
                <FieldLine label="Opmerkingen" wide />
              </div>
            </section>

            <footer className="pt-6 border-t border-navy/15 text-navy/60 text-senior-sm leading-relaxed">
              <p className="mb-2">
                Ingevulde formulieren verzamelen? Stuur een foto of samenvatting naar{' '}
                <strong className="text-navy">info@seniorease.nl</strong> — dan adviseren we graag
                welk pakket past.
              </p>
              <p>
                Meer info:{' '}
                <span className="text-navy font-medium">seniorease.nl/lesmateriaal</span>
              </p>
            </footer>
          </article>

          <p className="no-print mt-8 text-center text-navy/50 text-senior-xs max-w-md mx-auto">
            Tip: print dubbelzijdig of hang één exemplaar op het prikbord. Eén week is genoeg om
            richting te krijgen.
          </p>
        </div>
      </main>
    </>
  );
}
