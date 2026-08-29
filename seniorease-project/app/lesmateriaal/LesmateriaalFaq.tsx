import JsonLd from '@/app/components/JsonLd';
import { buildFAQSchema } from '@/lib/seo';
import {
  formatPrijs,
  LOSSE_LES_PRIJS,
  ORG_COMPLEET_PRIJS,
  PAKKET_PRIJS,
} from './lesmateriaal-data';

export const LESMATERIAAL_FAQ = [
  {
    question: 'Wat krijg ik na betaling?',
    answer: `U ontvangt per e-mail een downloadlink naar PDF-bestanden. Bij een losse les: draaiboek, deelnemerskaart, oefentaken, zaalchecklist en nazorgkaart voor die ene lesmiddag. Bij een themapakket: dat vier keer (4 lessen). Bij het organisatiepakket: alle thema's A–G, inclusief begeleidersgids.`,
  },
  {
    question: 'Wat is het verschil tussen losse les, themapakket en organisatiepakket?',
    answer: `Een losse les (${formatPrijs(LOSSE_LES_PRIJS)}) is één lesmiddag van 90 minuten — handig om te proberen. Een themapakket (${formatPrijs(PAKKET_PRIJS)}) bevat vier aansluitende lessen over één thema (bijv. WhatsApp). Het organisatiepakket (${formatPrijs(ORG_COMPLEET_PRIJS)}) geeft alle thema's, printrechten voor uw locatie(s) en de begeleidersgids.`,
  },
  {
    question: 'Is er een abonnement of maandelijkse kosten?',
    answer:
      'Nee. Alles is een eenmalige betaling. Geen abonnement, geen verborgen kosten per les of per deelnemer.',
  },
  {
    question: 'Hoe snel krijg ik de PDF\'s?',
    answer:
      'Meestal binnen enkele minuten per e-mail. Lukt dat niet? Controleer uw map ongewenste e-mail of neem contact op — u hoort binnen één werkdag van ons.',
  },
  {
    question: 'Moet ik een beamer of PowerPoint hebben?',
    answer:
      'Nee. Print op tafel is de basis — deelnemers oefenen op hun eigen telefoon, tablet of computer. Heeft uw zaal een beamer? Dan kunt u optioneel een beamer-PDF gebruiken (inbegrepen bij aankoop, waar beschikbaar).',
  },
  {
    question: 'Mag ik printen voor mijn bibliotheek of buurthuis?',
    answer: `Bij losse les of themapakket: voor eigen gebruik of kleine groepen. Voor structureel lesgeven op locatie: kies het organisatiepakket (${formatPrijs(ORG_COMPLEET_PRIJS)}) — daarmee krijgt u printrechten voor georganiseerde activiteiten binnen uw organisatie.`,
  },
  {
    question: 'Zit pakket G (AI) in het organisatiepakket?',
    answer:
      'Ja. Het compleet organisatiepakket bevat alle thema\'s A t/m G, inclusief AI voor dagelijks gebruik, plus beamer-PDF\'s waar die klaar zijn.',
  },
  {
    question: 'Kan ik betalen via factuur in plaats van online?',
    answer:
      'Ja. Neem contact op — voor bibliotheken en stichtingen regelen we graag een factuur of offerte naast online betalen via iDEAL of creditcard.',
  },
] as const;

const faqSchema = buildFAQSchema(
  LESMATERIAAL_FAQ.map((item) => ({ question: item.question, answer: item.answer })),
);

export function LesmateriaalFaq() {
  return (
    <section
      id="veelgestelde-vragen"
      aria-labelledby="lesmateriaal-faq-heading"
      className="mb-16 md:mb-20 scroll-mt-24"
    >
      <JsonLd data={faqSchema} />

      <p className="text-gold font-bold text-senior-xs uppercase tracking-[0.12em] mb-3">
        Veelgestelde vragen
      </p>
      <h2
        id="lesmateriaal-faq-heading"
        className="font-serif text-navy text-[1.65rem] sm:text-[2rem] font-semibold leading-tight mb-10 max-w-2xl"
      >
        Goed om te weten.
      </h2>

      <ol className="space-y-0 divide-y divide-navy/10 border-t border-navy/10 list-none p-0 m-0 max-w-3xl">
        {LESMATERIAAL_FAQ.map((item, index) => (
          <li key={item.question} className="py-6 first:pt-6">
            <article>
              <h3 className="font-serif text-navy text-senior-base sm:text-[1.3rem] font-semibold leading-snug mb-3 flex gap-4">
                <span
                  className="text-gold/70 font-mono text-senior-sm tabular-nums shrink-0 pt-0.5"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item.question}</span>
              </h3>
              <p className="text-navy/75 text-senior-sm leading-relaxed pl-0 sm:pl-10">
                {item.answer}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
