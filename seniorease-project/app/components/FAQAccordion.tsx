'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type FAQItem = {
  question: string;
  answer: string;
};

const DEFAULT_FAQ: FAQItem[] = [
  {
    question: 'Is het moeilijk?',
    answer:
      'Nee. Alle uitleg is geschreven voor mensen die nog nooit met een onderwerp hebben gewerkt. Stap voor stap, zonder moeilijke woorden.',
  },
  {
    question: 'Kan ik iets fout doen?',
    answer:
      'Nee, u kunt niets kapotmaken door te klikken of te proberen. Twijfelt u toch? Sluit de pagina gewoon en begin opnieuw.',
  },
  {
    question: 'Hoe begin ik?',
    answer:
      'Klik op “Begin met leren” of kies een gids hieronder. U mag in uw eigen tempo lezen en zo vaak terugkomen als u wilt.',
  },
  {
    question: 'Is het gratis?',
    answer:
      'De uitleg en de meeste tools zijn gratis. Bij een enkele tool staat duidelijk vermeld als er kosten aan verbonden zijn.',
  },
];

type FAQAccordionProps = {
  items?: FAQItem[];
  title?: string;
};

export default function FAQAccordion({
  items = DEFAULT_FAQ,
  title = 'Veelgestelde vragen',
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-slate pb-16 -mt-2">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <h2 className="font-serif text-center text-white text-[1.6rem] sm:text-[1.85rem] mb-8 font-semibold">
          {title}
        </h2>
        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question} className="rounded-full overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className={`w-full flex items-center justify-between gap-4 min-h-[60px] px-6 py-4 font-semibold text-senior-sm text-left transition-colors ${
                    isOpen
                      ? 'bg-navy text-white rounded-t-3xl rounded-b-none'
                      : 'bg-gold text-navy rounded-full'
                  }`}
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
                  <div className="px-6 py-4 bg-cream text-navy/90 text-senior-sm leading-relaxed rounded-b-3xl">
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
