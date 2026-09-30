/**
 * SeniorEase – Praktisch werken met ChatGPT
 * APART productlijn — NIET in LESMATERIAAL_PAKKETTEN (A–H).
 *
 * Checkout-URL’s komen uit env via lib/chatgpt-checkout.ts — niet hier hardcoden.
 */

export type ChatgptReferenceId =
  | 'chatgpt_a1'
  | 'chatgpt_a2'
  | 'chatgpt_a3'
  | 'chatgpt_a4'
  | 'chatgpt_a5'
  | 'chatgpt_a6'
  | 'chatgpt_a7'
  | 'chatgpt_a8'
  | 'chatgpt_b_compleet'
  | 'chatgpt_c_organisatie';

export const CHATGPT_EEN_PRIJS = 9.95;
export const CHATGPT_COMPLEET_PRIJS = 49.95;
export const CHATGPT_ORG_PRIJS = 149;
/** 8 × €9,95 — alleen voor prijsvergelijking op de pagina */
export const CHATGPT_ACHT_LOS_TOTAAL = 79.6;

export type ChatgptLessonSku = {
  id: string;
  number: number;
  title: string;
  description: string;
  referenceId: ChatgptReferenceId;
};

export const CHATGPT_LESSONS: ChatgptLessonSku[] = [
  {
    id: 'A1',
    number: 1,
    title: 'Mijn eerste gesprek met ChatGPT',
    description: 'Voor de eerste kennismaking met ChatGPT.',
    referenceId: 'chatgpt_a1',
  },
  {
    id: 'A2',
    number: 2,
    title: 'ChatGPT helpt bij gewone dingen',
    description: 'Ontdek hoe ChatGPT kan helpen bij alledaagse vragen.',
    referenceId: 'chatgpt_a2',
  },
  {
    id: 'A3',
    number: 3,
    title: 'Zo krijgt u een beter antwoord',
    description: 'Leer hoe u verder vraagt en een antwoord laat aanpassen.',
    referenceId: 'chatgpt_a3',
  },
  {
    id: 'A4',
    number: 4,
    title: 'Schrijven met ChatGPT',
    description: 'Gebruik ChatGPT als hulp bij het schrijven.',
    referenceId: 'chatgpt_a4',
  },
  {
    id: 'A5',
    number: 5,
    title: 'Samen iets plannen',
    description: 'Gebruik ChatGPT om stap voor stap iets te organiseren of plannen.',
    referenceId: 'chatgpt_a5',
  },
  {
    id: 'A6',
    number: 6,
    title: 'Moeilijke informatie begrijpelijk maken',
    description: 'Laat ingewikkelde informatie eenvoudiger uitleggen.',
    referenceId: 'chatgpt_a6',
  },
  {
    id: 'A7',
    number: 7,
    title: 'Uitzoeken, vergelijken en kiezen',
    description: 'Gebruik ChatGPT als hulpmiddel om mogelijkheden op een rij te zetten.',
    referenceId: 'chatgpt_a7',
  },
  {
    id: 'A8',
    number: 8,
    title: 'ChatGPT voor míjn leven',
    description: 'Ontdek waar ChatGPT in uw eigen dagelijks leven van pas kan komen.',
    referenceId: 'chatgpt_a8',
  },
];

export const CHATGPT_COMPLEET_REFERENCE: ChatgptReferenceId = 'chatgpt_b_compleet';
export const CHATGPT_ORG_REFERENCE: ChatgptReferenceId = 'chatgpt_c_organisatie';

export const CHATGPT_FAQ = [
  {
    question: 'Heb ik ervaring met ChatGPT nodig?',
    answer: 'Nee.',
  },
  {
    question: 'Moet de begeleider docent zijn?',
    answer:
      'Nee. Het materiaal is zo opgezet dat ook een begeleider zonder onderwijs- of ChatGPT-expertise ermee kan werken.',
  },
  {
    question: 'Hoe lang duurt een bijeenkomst?',
    answer:
      'Ongeveer 90 minuten. Het complete programma bestaat uit acht bijeenkomsten.',
  },
  {
    question: 'Kan ik eerst één onderwerp proberen?',
    answer: 'Ja. Eén praktische uitleg kost €9,95.',
  },
  {
    question: 'Wat is het verschil tussen €49,95 en €149?',
    answer:
      'Het lesmateriaal is hetzelfde. Het complete uitlegpakket van €49,95 is voor één groep. Het organisatiepakket van €149 geeft gebruiksrecht voor meerdere groepen en begeleiders op één fysieke locatie.',
  },
  {
    question: 'Is Pakket H nodig voordat we hiermee beginnen?',
    answer:
      'Nee. Pakket H of andere eerdere AI-lessen zijn geen vereiste voorkennis.',
  },
  {
    question: 'Mag ik het materiaal doorsturen naar een andere vestiging?',
    answer: 'Nee. Het organisatiepakket geldt voor één fysieke locatie.',
  },
] as const;
