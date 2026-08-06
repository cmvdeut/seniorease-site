'use client';

import { useState, type ReactNode } from 'react';
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
    answer:
      'Ja. De uitleg, gidsen en tools op SeniorEase zijn gratis. Alleen de app Mijn Bibliotheek is een apart product waarvoor kosten kunnen gelden — die kunt u wel gratis uitproberen. Dat staat daar duidelijk vermeld.',
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

export default function FAQAccordion({
  items = DEFAULT_FAQ,
  title = 'Veelgestelde vragen',
  embedded = false,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className={embedded ? 'py-4 md:py-6' : 'bg-cream py-20 md:py-24'}>
      <div className={embedded ? 'max-w-3xl mx-auto' : 'max-w-3xl mx-auto px-5 sm:px-6'}>
        <h2 className="font-serif text-center text-navy text-[1.65rem] sm:text-[1.9rem] mb-10 font-semibold">
          {title}
        </h2>
        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className={`overflow-hidden ${
                  isOpen ? 'rounded-senior shadow-sm' : 'rounded-senior'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className={`w-full flex items-center justify-between gap-4 min-h-touch px-6 py-4 font-semibold text-senior-sm text-left text-white transition-colors hover:opacity-90 ${
                    isOpen ? 'rounded-t-senior' : 'rounded-senior'
                  }`}
                  style={{ backgroundColor: '#A07654' }}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={22}
                    strokeWidth={2.5}
                    className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <div className="px-6 py-5 bg-paper text-navy/85 text-senior-sm leading-relaxed rounded-b-senior border border-t-0 border-navy/10">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
