export type QuizQuestion = {
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
};

/** Senior-vriendelijke algemene kennis — rustig, herkenbaar, geen trucs. */
export const QUIZ_BANK: QuizQuestion[] = [
  {
    question: 'Welke kleur krijgt een banaan als hij rijp is?',
    options: ['Rood', 'Geel', 'Blauw', 'Paars'],
    correctIndex: 1,
  },
  {
    question: 'Hoeveel dagen heeft een week?',
    options: ['Vijf', 'Zes', 'Zeven', 'Acht'],
    correctIndex: 2,
  },
  {
    question: 'Wat is de hoofdstad van Nederland?',
    options: ['Rotterdam', 'Den Haag', 'Utrecht', 'Amsterdam'],
    correctIndex: 3,
  },
  {
    question: 'Welk seizoen komt na de zomer?',
    options: ['Lente', 'Herfst', 'Winter', 'Zomer'],
    correctIndex: 1,
  },
  {
    question: 'Hoeveel poten heeft een kat meestal?',
    options: ['Twee', 'Drie', 'Vier', 'Zes'],
    correctIndex: 2,
  },
  {
    question: 'Welke drank drinken veel mensen ’s ochtends warm?',
    options: ['Limonade', 'Koffie of thee', 'Frisdrank', 'Sap uit de koelkast'],
    correctIndex: 1,
  },
  {
    question: 'Wat is 5 + 3?',
    options: ['6', '7', '8', '9'],
    correctIndex: 2,
  },
  {
    question: 'Welk dier zegt “miauw”?',
    options: ['Hond', 'Koe', 'Kat', 'Paard'],
    correctIndex: 2,
  },
  {
    question: 'In welk land ligt Amsterdam?',
    options: ['België', 'Duitsland', 'Frankrijk', 'Nederland'],
    correctIndex: 3,
  },
  {
    question: 'Welke planeet is de aarde?',
    options: ['De maan', 'Een ster', 'Een planeet', 'Een komeet'],
    correctIndex: 2,
  },
  {
    question: 'Wat hoort bij Kerstmis?',
    options: ['Paashaas', 'Kerstboom', 'Sinterklaasstoet in juli', 'Vuurwerk op Koningsdag'],
    correctIndex: 1,
  },
  {
    question: 'Hoeveel maanden heeft een jaar?',
    options: ['Tien', 'Elf', 'Twaalf', 'Dertien'],
    correctIndex: 2,
  },
  {
    question: 'Welke kleur heeft gras meestal?',
    options: ['Blauw', 'Groen', 'Oranje', 'Roze'],
    correctIndex: 1,
  },
  {
    question: 'Wat gebruikt u om brood te snijden?',
    options: ['Een lepel', 'Een vork', 'Een mes', 'Een bord'],
    correctIndex: 2,
  },
  {
    question: 'Welke dag komt na maandag?',
    options: ['Zondag', 'Dinsdag', 'Vrijdag', 'Zaterdag'],
    correctIndex: 1,
  },
  {
    question: 'Wat is de kleur van de Nederlandse vlag?',
    options: ['Blauw-wit-rood', 'Rood-wit-blauw', 'Groen-wit-oranje', 'Geel-zwart'],
    correctIndex: 1,
  },
  {
    question: 'Waar groeien tulpen vooral bekend om?',
    options: ['Spanje', 'Nederland', 'Noorwegen', 'Italië'],
    correctIndex: 1,
  },
  {
    question: 'Wat doet een wekker?',
    options: ['Koken', 'Stofzuigen', 'U wakker maken', 'De deur openen'],
    correctIndex: 2,
  },
  {
    question: 'Hoeveel seizoenen heeft een jaar in Nederland?',
    options: ['Twee', 'Drie', 'Vier', 'Vijf'],
    correctIndex: 2,
  },
  {
    question: 'Welke vogel is bekend van “koekkoek”?',
    options: ['Mus', 'Koekoek', 'Duif', 'Zwaan'],
    correctIndex: 1,
  },
  {
    question: 'Wat drinkt een baby meestal?',
    options: ['Koffie', 'Bier', 'Melk', 'Wijn'],
    correctIndex: 2,
  },
  {
    question: 'Welk fruit is oranje van buiten en sappig van binnen?',
    options: ['Banaan', 'Sinaasappel', 'Druif', 'Peer'],
    correctIndex: 1,
  },
  {
    question: 'Waar zet u uw auto meestal stil bij een rood verkeerslicht?',
    options: ['Doorrijden', 'Stoppen', 'Achteruitrijden', 'Claxonneren'],
    correctIndex: 1,
  },
  {
    question: 'Wat is warmer: ijs of soep?',
    options: ['Ijs', 'Soep', 'Allebei even warm', 'Geen van beide'],
    correctIndex: 1,
  },
];

export const QUESTIONS_PER_QUIZ = 5;

/** Stabiele dagelijkse selectie van vragen (zelfde set op dezelfde dag). */
export function getDailyQuizQuestions(date = new Date()): QuizQuestion[] {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const start = (dayOfYear * QUESTIONS_PER_QUIZ) % QUIZ_BANK.length;
  const picked: QuizQuestion[] = [];
  for (let i = 0; i < QUESTIONS_PER_QUIZ; i++) {
    picked.push(QUIZ_BANK[(start + i) % QUIZ_BANK.length]);
  }
  return picked;
}

export function getTodayKey(date = new Date()): string {
  return date.toISOString().split('T')[0];
}
