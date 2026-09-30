import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { formatPrijs } from './lesmateriaal-data';
import {
  CHATGPT_COMPLEET_PRIJS,
  CHATGPT_EEN_PRIJS,
  CHATGPT_ORG_PRIJS,
} from './chatgpt/chatgpt-data';

/** Hub-only: hele euro’s zonder ,00 (bijv. € 149). */
function formatHubPrijs(amount: number): string {
  if (Number.isInteger(amount)) {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return formatPrijs(amount);
}

/**
 * Aparte productlijn op /lesmateriaal — niet gekoppeld aan A–H-catalogus.
 */
export function LesmateriaalChatgptHub() {
  return (
    <section
      id="chatgpt"
      aria-labelledby="lesmateriaal-chatgpt-heading"
      className="mb-14 md:mb-16 scroll-mt-24"
    >
      <article className="relative rounded-xl border-2 border-gold/40 bg-paper p-5 sm:p-7 md:p-8 shadow-[0_6px_24px_rgba(139,94,60,0.08)]">
        <span className="absolute -top-2.5 left-5 sm:left-7 rounded-full bg-gold px-3 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide text-white">
          Nieuw
        </span>

        <p className="text-gold font-bold text-senior-xs uppercase tracking-[0.12em] mb-2 pt-1">
          Apart programma
        </p>
        <h2
          id="lesmateriaal-chatgpt-heading"
          className="font-serif text-navy text-[1.45rem] sm:text-[1.75rem] font-semibold leading-tight mb-2 max-w-2xl"
        >
          Praktisch werken met ChatGPT
        </h2>
        <p className="text-navy/70 text-senior-base font-semibold leading-snug mb-2 max-w-2xl">
          Eenvoudige uitleg. Samen proberen. Zelf kunnen doen.
        </p>
        <p className="text-navy/65 text-senior-sm leading-relaxed mb-3 max-w-2xl">
          Van eerste vraag tot zelfstandig ChatGPT gebruiken in het dagelijks leven.
        </p>
        <p className="text-navy/60 text-senior-sm leading-relaxed mb-6 max-w-2xl">
          8 praktische onderwerpen. Rustige uitleg, direct oefenen en alles voorbereid voor de
          begeleider.
        </p>

        <ul className="flex flex-col gap-2.5 mb-7 list-none p-0 m-0 min-w-0 lg:flex-row lg:flex-wrap lg:gap-x-5 lg:gap-y-2">
          {[
            { label: 'Eén praktische uitleg', price: CHATGPT_EEN_PRIJS },
            { label: 'Alle 8 onderwerpen', price: CHATGPT_COMPLEET_PRIJS },
            { label: 'Voor organisaties · één locatie', price: CHATGPT_ORG_PRIJS },
          ].map((item) => (
            <li
              key={item.label}
              className="flex items-start gap-2 min-w-0 text-navy/80 text-senior-sm leading-snug"
            >
              <Check
                className="text-gold shrink-0 mt-0.5"
                size={16}
                strokeWidth={2.5}
                aria-hidden
              />
              <span className="min-w-0 break-words">
                {item.label} —{' '}
                <strong className="text-navy font-semibold whitespace-nowrap">
                  {formatHubPrijs(item.price)}
                </strong>
              </span>
            </li>
          ))}
        </ul>

        <Link
          href="/lesmateriaal/chatgpt"
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 font-semibold text-[0.95rem] text-white bg-gold hover:bg-gold-light rounded-full border-2 border-navy/25 shadow-[0_2px_0_0_rgba(46,36,28,0.18)] transition-colors touch-manipulation"
        >
          Bekijk Praktisch werken met ChatGPT
          <ArrowRight size={18} aria-hidden />
        </Link>
      </article>
    </section>
  );
}
