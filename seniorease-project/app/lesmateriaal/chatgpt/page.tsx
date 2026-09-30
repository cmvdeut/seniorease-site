import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import { buildFAQSchema, buildPageMetadata } from '@/lib/seo';
import { Users, ClipboardList, Check } from 'lucide-react';
import {
  CHATGPT_FAQ,
} from './chatgpt-data';
import { ChatgptShop } from './ChatgptShop';
import { getChatgptPaymentLinkBase } from '@/lib/chatgpt-checkout';

export const metadata = buildPageMetadata({
  path: '/lesmateriaal/chatgpt',
  title: 'Praktisch werken met ChatGPT — lesmateriaal',
  description:
    'SeniorEase – Praktisch werken met ChatGPT: acht praktische onderwerpen van eerste vraag tot zelfstandig ChatGPT gebruiken. Eén uitleg €9,95 · compleet pakket €49,95 · organisatiepakket één locatie €149.',
  keywords: [
    'ChatGPT lesmateriaal',
    'ChatGPT senioren',
    'AI lespakket',
    'bibliotheek ChatGPT',
    'SeniorEase ChatGPT',
  ],
});

const faqSchema = buildFAQSchema(
  CHATGPT_FAQ.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
);

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 list-none p-0 m-0">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-navy/80 text-senior-sm leading-snug"
        >
          <Check className="text-gold shrink-0 mt-0.5" size={16} strokeWidth={2.5} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function LesmateriaalChatgptPage() {
  const checkoutBases = {
    een: getChatgptPaymentLinkBase('een'),
    compleet: getChatgptPaymentLinkBase('compleet'),
    organisatie: getChatgptPaymentLinkBase('organisatie'),
  };

  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={faqSchema} />

      {/* 1. HERO */}
      <section className="bg-cream">
        <div className="max-w-senior mx-auto px-5 sm:px-6 pt-14 md:pt-20 pb-10 md:pb-12">
          <Link
            href="/lesmateriaal"
            className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
          >
            ← Terug naar lesmateriaal
          </Link>

          <p className="inline-flex items-center gap-2 rounded-full bg-gold/15 text-gold font-semibold text-senior-sm px-4 py-2 mb-6">
            Nieuw · apart van themapakketten A–H
          </p>

          <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] font-semibold leading-tight mb-3 max-w-3xl">
            Praktisch werken met ChatGPT
          </h1>
          <p className="text-navy/80 text-senior-base font-semibold leading-relaxed max-w-2xl mb-3">
            Eenvoudige uitleg. Samen proberen. Zelf kunnen doen.
          </p>
          <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-4">
            Van eerste vraag tot zelfstandig ChatGPT gebruiken in het dagelijks leven.
          </p>
          <p className="text-navy/65 text-senior-sm leading-relaxed max-w-2xl mb-8">
            Acht praktische onderwerpen waarmee u stap voor stap leert werken met ChatGPT. Alles
            staat klaar voor de begeleider — ook zonder onderwijsachtergrond of ChatGPT-expertise.
          </p>

          <a
            href="#mogelijkheden"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 font-semibold text-[0.95rem] text-white bg-gold hover:bg-gold-light rounded-full border-2 border-navy/25 shadow-[0_2px_0_0_rgba(46,36,28,0.18)] transition-colors touch-manipulation"
          >
            Bekijk de mogelijkheden
          </a>
        </div>
      </section>

      <ChatgptShop bases={checkoutBases} />

      {/* 7. ZO WERKT HET */}
      <section aria-labelledby="chatgpt-stappen-heading" className="bg-slate py-14 md:py-16">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <h2
            id="chatgpt-stappen-heading"
            className="font-serif text-navy text-[1.45rem] sm:text-[1.65rem] font-semibold leading-tight mb-8"
          >
            Zo werkt het
          </h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0">
            {[
              {
                n: '1',
                title: 'Kies',
                text: 'Eén onderwerp, het complete pakket of het organisatiepakket.',
              },
              {
                n: '2',
                title: 'Betaal veilig',
                text: 'Via de beveiligde betaalomgeving.',
              },
              {
                n: '3',
                title: 'Download direct',
                text: 'Na betaling krijgt u toegang tot uw download.',
              },
              {
                n: '4',
                title: 'Ook per e-mail',
                text: 'U ontvangt de downloadlinks eveneens per e-mail.',
              },
            ].map((step) => (
              <li
                key={step.n}
                className="rounded-xl bg-paper border border-navy/8 px-5 py-5"
              >
                <p className="text-gold font-bold text-senior-sm mb-1">Stap {step.n}</p>
                <h3 className="font-serif text-navy font-semibold text-senior-sm mb-2">
                  {step.title}
                </h3>
                <p className="text-navy/65 text-senior-sm leading-relaxed m-0">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. VOOR WIE */}
      <section aria-labelledby="chatgpt-voor-wie-heading" className="bg-cream py-14 md:py-16">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <h2
            id="chatgpt-voor-wie-heading"
            className="font-serif text-navy text-[1.45rem] sm:text-[1.65rem] font-semibold leading-tight mb-8"
          >
            Voor wie?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            <article className="rounded-xl bg-paper border border-navy/8 px-5 py-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-11 h-11 rounded-lg bg-gold/12 text-gold flex items-center justify-center">
                  <Users size={22} aria-hidden />
                </span>
                <h3 className="font-serif text-navy font-semibold text-senior-base m-0">
                  Voor de deelnemer
                </h3>
              </div>
              <p className="text-navy/70 text-senior-sm leading-relaxed m-0">
                Geen ChatGPT-ervaring nodig. De deelnemer moet een smartphone, tablet, laptop
                of computer enigszins zelfstandig kunnen bedienen, internet kunnen openen en
                korte tekst kunnen typen.
              </p>
            </article>
            <article className="rounded-xl bg-paper border border-navy/8 px-5 py-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-11 h-11 rounded-lg bg-gold/12 text-gold flex items-center justify-center">
                  <ClipboardList size={22} aria-hidden />
                </span>
                <h3 className="font-serif text-navy font-semibold text-senior-base m-0">
                  Voor de begeleider
                </h3>
              </div>
              <p className="text-navy/70 text-senior-sm leading-relaxed m-0 mb-4">
                Geen docent of ChatGPT-expert nodig. Het materiaal vertelt wat u voorbereidt,
                wat u laat zien, wat deelnemers zelf doen en wat u kunt doen als iemand
                vastloopt.
              </p>
              <CheckList
                items={[
                  'Circa 8–10 deelnemers per groep',
                  'Begeleider + helper/vrijwilliger wenselijk, vooral vanaf ongeveer 6 deelnemers',
                ]}
              />
            </article>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section
        aria-labelledby="chatgpt-faq-heading"
        className="bg-slate py-14 md:py-16 mb-8"
      >
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <h2
            id="chatgpt-faq-heading"
            className="font-serif text-navy text-[1.45rem] sm:text-[1.65rem] font-semibold leading-tight mb-8"
          >
            Veelgestelde vragen
          </h2>
          <div className="max-w-2xl space-y-4">
            {CHATGPT_FAQ.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl bg-paper border border-navy/8 px-5 py-4"
              >
                <summary className="font-semibold text-navy text-senior-sm cursor-pointer list-none flex items-center justify-between gap-3 min-h-[44px]">
                  {item.question}
                  <span className="text-gold text-xl leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-navy/70 text-senior-sm leading-relaxed mt-3 mb-1">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-10">
            <Link
              href="/lesmateriaal"
              className="text-gold hover:text-gold-light font-semibold text-senior-sm"
            >
              ← Terug naar al het lesmateriaal
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
