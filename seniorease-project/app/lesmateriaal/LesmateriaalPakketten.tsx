import Link from 'next/link';
import {
  LESMATERIAAL_PAKKETTEN,
  formatPrijs,
  LOSSE_LES_PRIJS,
  PAKKET_PRIJS,
} from './lesmateriaal-data';
import { ArrowRight } from 'lucide-react';

export function LesmateriaalPakketten({
  bestelLos = false,
}: {
  /** true = bezoeker komt via “Losse les” en kiest daarna één les op de themapagina */
  bestelLos?: boolean;
}) {
  return (
    <div id="themapakketten" className="scroll-mt-24">
      <h2 className="font-serif text-navy text-[1.5rem] sm:text-[1.75rem] font-semibold mb-3">
        {bestelLos ? 'Kies een thema voor uw losse les' : 'Kies uw thema (A–H)'}
      </h2>
      <p className="text-navy/65 text-senior-sm mb-8 max-w-xl">
        {bestelLos ? (
          <>
            Kies het thema. Op de volgende pagina kiest u <strong>één</strong> van de vier lessen
            voor {formatPrijs(LOSSE_LES_PRIJS)} — niet het hele pakket.
          </>
        ) : (
          <>
            Elk thema is kant-en-klaar activiteiten- en lesmateriaal (PDF): 4 lessen à 90
            minuten voor {formatPrijs(PAKKET_PRIJS)}. Internet: telefoon/tablet (G) of computer
            (F).
          </>
        )}
      </p>

      <ul
        className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 list-none p-0 m-0"
        aria-label="Themapakketten A tot H"
      >
        {LESMATERIAAL_PAKKETTEN.map((pakket) => {
          const Icon = pakket.Icon;
          const href = bestelLos
            ? `/lesmateriaal/${pakket.slug}?bestel=los`
            : `/lesmateriaal/${pakket.slug}`;
          return (
            <li key={pakket.slug}>
              <Link
                href={href}
                className="group relative flex flex-col h-full rounded-xl bg-paper border border-navy/8 hover:border-gold px-5 py-5 transition-all hover:shadow-[0_4px_20px_rgba(46,36,28,0.06)]"
              >
                {pakket.popular && (
                  <span className="absolute top-3 right-3 rounded-full bg-gold px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide text-white">
                    Populair
                  </span>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <span className="shrink-0 w-11 h-11 rounded-lg bg-gold/12 text-gold flex items-center justify-center">
                    <Icon size={22} strokeWidth={2} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-gold font-bold text-[0.85rem] uppercase tracking-wide">
                      Pakket {pakket.code}
                    </p>
                    <h3 className="font-serif text-navy text-senior-sm font-semibold group-hover:text-gold transition-colors leading-snug truncate">
                      {pakket.title}
                    </h3>
                  </div>
                </div>

                <p className="text-navy/60 text-[1.05rem] leading-relaxed flex-1 mb-4 line-clamp-2">
                  {pakket.subtitle}
                </p>

                <p className="flex items-center justify-between gap-2 text-senior-sm">
                  <span className="text-navy/50">
                    {bestelLos ? `Losse les ${formatPrijs(LOSSE_LES_PRIJS)}` : pakket.device}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-gold group-hover:gap-2 transition-all">
                    {bestelLos ? 'Kies les' : 'Bekijken'}
                    <ArrowRight size={16} aria-hidden />
                  </span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
