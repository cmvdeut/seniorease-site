'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export type FAQItem = {
  question: string;
  answer: ReactNode;
};

const linkClass = 'font-semibold text-gold underline underline-offset-2 hover:text-gold-light';

const DEFAULT_FAQ: FAQItem[] = [
  {
    question: 'Is het moeilijk?',
    answer:
      'Nee. Alle uitleg is geschreven voor mensen die nog nooit met een onderwerp hebben gewerkt. Stap voor stap, zonder moeilijke woorden.',
  },
  {
    question: 'Is het gratis?',
    answer: (
      <>
        Ja. De uitleg, gidsen en tools op SeniorEase zijn gratis. Alleen de app Mijn
        Bibliotheek is een apart product waarvoor kosten kunnen gelden — die kunt u wel
        gratis uitproberen. Daarnaast is er betaald downloadbaar PDF-lesmateriaal voor
        bibliotheken, buurthuizen en andere organisaties die zelf digitale lessen voor
        senioren willen geven.{' '}
        <Link href="/lesmateriaal" className={linkClass}>
          Bekijk het lesmateriaal
        </Link>
      </>
    ),
  },
  {
    question: 'Zijn er ook uitlegfilmpjes?',
    answer: (
      <>
        Ja. Er staan al veel uitlegfilmpjes klaar, bijvoorbeeld bij{' '}
        <Link href="/kijk-en-help" className={linkClass}>
          Kijk &amp; Help
        </Link>{' '}
        en bij verschillende gidsen. Soms verwijzen we door naar{' '}
        <a
          href="https://www.youtube.com/@SeniorEaseNL"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          YouTube
        </a>
        , zodat u het filmpje daar rustig kunt bekijken. We proberen de site en de
        filmpjes regelmatig bij te werken met nieuwe uitleg.
      </>
    ),
  },
];

type FAQAccordionProps = {
  items?: FAQItem[];
  title?: string;
  /** Op homepage: volle sectie met padding. Op hubs: compact in bestaande layout. */
  embedded?: boolean;
};

/**
 * Native &lt;details&gt;/&lt;summary&gt;: antwoorden blijven in de DOM (ook dicht),
 * keyboard + screenreader via browser-semantiek. `name` = exclusief openen waar ondersteund.
 */
export default function FAQAccordion({
  items = DEFAULT_FAQ,
  title = 'Veelgestelde vragen',
  embedded = false,
}: FAQAccordionProps) {
  const groupName = embedded ? 'seniorease-faq-embedded' : 'seniorease-faq';

  return (
    <section className={embedded ? 'py-4 md:py-6' : 'bg-cream py-20 md:py-24'}>
      <div className={embedded ? 'max-w-3xl mx-auto' : 'max-w-3xl mx-auto px-5 sm:px-6'}>
        <h2 className="font-serif text-center text-navy text-[1.65rem] sm:text-[1.9rem] mb-10 font-semibold">
          {title}
        </h2>
        <div className="space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              name={groupName}
              className="group rounded-senior overflow-hidden open:shadow-sm"
            >
              <summary
                className="flex w-full cursor-pointer list-none items-center justify-between gap-4 min-h-touch px-6 py-4 font-semibold text-senior-sm text-left text-white transition-colors hover:opacity-90 rounded-senior group-open:rounded-t-senior group-open:rounded-b-none [&::-webkit-details-marker]:hidden"
                style={{ backgroundColor: '#A07654' }}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={22}
                  strokeWidth={2.5}
                  className="shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="px-6 py-5 bg-paper text-navy/85 text-senior-sm leading-relaxed rounded-b-senior border border-t-0 border-navy/10">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
