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
    question: 'Voor welke organisaties is het lesmateriaal bedoeld?',
    answer:
      'Voor bibliotheken, buurthuizen, clubhuizen en andere organisaties die zelf digitale lessen willen geven aan senioren — met een eigen begeleider of vrijwilliger. U koopt digitaal lesmateriaal (PDF) om te downloaden en te printen; geen online cursusplatform.',
  },
  {
    question: 'Kan een vrijwilliger de lessen geven?',
    answer:
      'Ja. Het materiaal is gemaakt voor begeleiders en vrijwilligers die geen IT-docent zijn. U volgt het draaiboek: kijken → doen → controleren. Deelnemers oefenen op hun eigen toestel; u helpt waar nodig.',
  },
  {
    question: 'Moet de begeleider technisch deskundig zijn?',
    answer:
      'Nee. U hoeft geen IT-docent te zijn. Het draaiboek en de oefentaken leiden u door de les. Ziet een scherm er anders uit? Dat kan — vraag dan een helper of doe rustig verder met de volgende stap.',
  },
  {
    question: 'Wat zit er in een SeniorEase-lespakket?',
    answer: `Een themapakket (${formatPrijs(PAKKET_PRIJS)}) bevat vier aansluitende lessen van 90 minuten over één thema, als digitaal lesboek (PDF). Vaak vindt u onder meer een draaiboek, oefentaken of deelnemerskaart, zaalchecklist en soms beamer-PDF — de precieze onderdelen verschillen per pakket. Bekijk daarom altijd de pakketpagina. Een losse les (${formatPrijs(LOSSE_LES_PRIJS)}) is één lesmiddag; het organisatiepakket (${formatPrijs(ORG_COMPLEET_PRIJS)}) bevat alle themapakketten A–H plus begeleidersgids.`,
  },
  {
    question: 'Mag ik het lesmateriaal printen voor deelnemers?',
    answer: `Ja, binnen de gebruikslicentie. Bij een losse les of themapakket: voor eigen gebruik of kleine groepen. Voor structureel lesgeven op locatie: kies het organisatiepakket (${formatPrijs(ORG_COMPLEET_PRIJS)}) — daarmee krijgt u printrechten voor georganiseerde activiteiten binnen uw organisatie.`,
  },
  {
    question: 'Hoe ontvang ik het lesmateriaal na aankoop?',
    answer:
      'Na betaling ontvangt u automatisch per e-mail beveiligde downloadlinks naar de PDF-bestanden (geldig ongeveer 7 dagen — sla ze op). Op de bedanktpagina kunt u vaak ook direct downloaden. Geen mail? Controleer ongewenste e-mail of neem contact op — wij helpen binnen één werkdag.',
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
    question: 'Moet ik een beamer of PowerPoint hebben?',
    answer:
      'Nee. Print op tafel is de basis — deelnemers oefenen op hun eigen telefoon, tablet of computer. Heeft uw zaal een beamer? Dan kunt u optioneel een beamer-PDF gebruiken (inbegrepen bij aankoop, waar beschikbaar).',
  },
  {
    question: 'Zit pakket H (AI) in het organisatiepakket?',
    answer:
      'Ja. Het compleet organisatiepakket bevat alle themapakketten A–H, inclusief AI in het dagelijks leven (pakket H) en internet op telefoon/tablet (pakket G), plus beamer-PDF\'s per les (print blijft de basis).',
  },
  {
    question: 'Is dit een online cursus?',
    answer:
      'Nee. U koopt een digitaal lesboek (PDF) om te downloaden en te printen. Geen inlog op een leeromgeving, geen verplichte video\'s en geen abonnement. Gratis gidsen op seniorease.nl zijn apart en blijven gratis.',
  },
  {
    question: 'Wat mag ik met het lesmateriaal doen?',
    answer:
      'Themapakket of losse les: voor eigen gebruik of één lesgroep. Organisatie-licentie (compleet pakket): gebruik op één locatie voor meerdere lesgroepen; printen voor deelnemers op die locatie is toegestaan. Doorverkoop, openbaar online delen of gebruik op andere locaties is niet toegestaan. Zie ook de gebruikslicentie op deze pagina.',
  },
  {
    question: 'Zijn de prijzen inclusief BTW?',
    answer:
      'Ja. Alle genoemde bedragen (losse les, themapakket en organisatiepakket) zijn inclusief BTW. Bij online betaling via Stripe ontvangt u een betalingsbewijs per e-mail.',
  },
  {
    question: 'Kan ik een factuur krijgen?',
    answer:
      'Ja. Voor bibliotheken, buurthuizen en stichtingen maken we graag een officiële factuur op — vóór of na betaling. Neem contact op met naam en gegevens van uw organisatie. Online betalen via iDEAL of creditcard kan ook; het Stripe-bewijs is geen formele factuur.',
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
