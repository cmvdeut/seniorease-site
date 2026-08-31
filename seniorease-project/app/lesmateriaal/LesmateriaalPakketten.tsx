import Link from 'next/link';
import { LESMATERIAAL_PAKKETTEN, formatPrijs, PAKKET_PRIJS } from './lesmateriaal-data';
import { ArrowRight } from 'lucide-react';

export function LesmateriaalPakketten() {
  return (
    <div id="themapakketten" className="scroll-mt-24">
      <h2 className="font-serif text-navy text-[1.5rem] sm:text-[1.75rem] font-semibold mb-3">
        Kies uw thema (A–G)
      </h2>
      <p className="text-navy/65 text-senior-sm mb-8 max-w-xl">
        Elk thema is een digitaal lesboek (PDF): 4 lessen à 90 minuten voor {formatPrijs(PAKKET_PRIJS)}.
        Pakket F heeft twee varianten (telefoon of computer).
      </p>

      <ul
        className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 list-none p-0 m-0"
        aria-label="Themapakketten A tot G"
      >
        {LESMATERIAAL_PAKKETTEN.map((pakket) => {
          const Icon = pakket.Icon;
          return (
            <li key={pakket.slug}>
              <Link
                href={`/lesmateriaal/${pakket.slug}`}
                className="group flex flex-col h-full rounded-xl bg-paper border border-navy/8 hover:border-gold px-5 py-5 transition-all hover:shadow-[0_4px_20px_rgba(46,36,28,0.06)]"
              >
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
                  <span className="text-navy/50">{pakket.device}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-gold group-hover:gap-2 transition-all">
                    Bekijken
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
