import Image from 'next/image';
import { Lightbulb } from 'lucide-react';

/**
 * Tijdelijke campagne-hook: Week van Digitaal Meedoen 2026.
 * Zichtbaar 16 nov – 6 dec 2026 (Europe/Amsterdam).
 */
const WINDOW_START = '2026-11-16';
const WINDOW_END = '2026-12-06';

export function isWeekVanDigitaalMeedoenWindow(now = new Date()): boolean {
  const day = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Amsterdam',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
  return day >= WINDOW_START && day <= WINDOW_END;
}

type PromoVariant = 'foto' | 'lampje';

/** Compacte blikvanger bovenaan — klikt door naar Waarom nu? */
export function LesmateriaalCampagnePromo({
  variant = 'foto',
}: {
  variant?: PromoVariant;
}) {
  if (!isWeekVanDigitaalMeedoenWindow()) {
    return null;
  }

  return (
    <a
      href="#lesmateriaal-waarom-nu"
      className="group mb-8 md:mb-10 flex overflow-hidden rounded-senior border border-gold/35 bg-gold/10 hover:bg-gold/15 hover:border-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      {variant === 'foto' ? (
        <span className="relative w-[5.5rem] sm:w-36 md:w-44 shrink-0 min-h-[5.25rem]">
          <Image
            src="/images/campagne/week-digitaal-meedoen-samen-laptop-v2.jpg"
            alt=""
            fill
            className="object-cover object-[center_28%]"
            sizes="(max-width: 640px) 88px, 176px"
            priority
          />
        </span>
      ) : (
        <span className="flex items-center justify-center w-16 sm:w-20 shrink-0 bg-gold/15 border-r border-gold/20">
          <Lightbulb
            className="text-gold"
            size={28}
            strokeWidth={1.75}
            aria-hidden
          />
        </span>
      )}

      <span className="flex flex-1 items-center justify-between gap-3 px-3.5 py-3 sm:px-5 sm:py-3.5 min-w-0">
        <span className="min-w-0">
          <span className="block text-gold font-bold text-senior-xs uppercase tracking-[0.12em] mb-0.5">
            23–29 november 2026
          </span>
          <span className="block font-serif text-navy text-senior-sm sm:text-senior-base font-semibold leading-snug">
            Week van Digitaal Meedoen — waarom dit lesmateriaal nu past
          </span>
        </span>
        <span
          className="shrink-0 text-gold font-semibold text-senior-sm group-hover:translate-x-0.5 transition-transform"
          aria-hidden
        >
          →
        </span>
      </span>
    </a>
  );
}

/** Volledig blok boven Waarom nu / themapakketten */
export function LesmateriaalCampagneHook() {
  if (!isWeekVanDigitaalMeedoenWindow()) {
    return null;
  }

  return (
    <section
      aria-labelledby="lesmateriaal-campagne-heading"
      className="mb-10 md:mb-12"
    >
      <div className="rounded-senior bg-paper border border-navy/8 p-5 sm:p-6 max-w-2xl">
        <p className="text-gold font-bold text-senior-xs uppercase tracking-[0.12em] mb-2">
          23–29 november 2026
        </p>
        <h2
          id="lesmateriaal-campagne-heading"
          className="font-serif text-navy text-[1.35rem] sm:text-[1.5rem] font-semibold leading-tight mb-3"
        >
          Week van Digitaal Meedoen
        </h2>
        <p className="text-navy/70 text-senior-sm leading-relaxed mb-5">
          Landelijke week om digitaal meedoen zichtbaar te maken. Past goed bij een
          Doe-Middag op het eigen toestel — met kant-en-klaar lesmateriaal voor uw
          begeleider.
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-x-5 sm:gap-y-2">
          <a
            href="#themapakketten"
            className="inline-flex items-center justify-center rounded-senior bg-gold px-4 py-2.5 text-white font-semibold text-senior-sm hover:bg-gold-light transition-colors"
          >
            Kies een thema voor deze week
          </a>
          <a
            href="https://digihulp.nl/weekvandigitaalmeedoen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gold font-semibold text-senior-sm hover:text-gold-light"
          >
            Activiteiten in de buurt →
          </a>
        </div>
      </div>
    </section>
  );
}
