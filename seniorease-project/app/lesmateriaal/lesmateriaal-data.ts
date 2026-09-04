import type { LucideIcon } from 'lucide-react';
import {
  Smartphone,
  Monitor,
  MessageCircle,
  Shield,
  Landmark,
  Globe,
  Sparkles,
} from 'lucide-react';

export type LesmateriaalLes = {
  code: string;
  title: string;
};

export type LesmateriaalPakket = {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  device: string;
  price: number;
  status: 'klaar' | 'binnenkort';
  Icon: LucideIcon;
  description: string;
  lessons: LesmateriaalLes[];
  includes: string[];
  guideLinks?: { href: string; label: string }[];
  relatedNote?: string;
};

export const PAKKET_PRIJS = 19.95;
export const LOSSE_LES_PRIJS = 6.95;
export const ORG_COMPLEET_PRIJS = 149;

export const LESMATERIAAL_PAKKETTEN: LesmateriaalPakket[] = [
  {
    slug: 'pakket-a',
    code: 'A',
    title: 'Telefoon & tablet — basis',
    subtitle: '4 lessen · telefoon/tablet',
    device: 'Telefoon of tablet',
    price: PAKKET_PRIJS,
    status: 'klaar',
    Icon: Smartphone,
    description:
      'Rustige doe-middagen op het eigen toestel: startscherm, apps, wifi en foto’s. Print op tafel; beamer optioneel.',
    lessons: [
      { code: 'A1', title: 'Ik ken mijn telefoon en durf hem te bedienen' },
      { code: 'A2', title: 'Een app zoeken en installeren' },
      { code: 'A3', title: 'Verbinding maken met internet' },
      { code: 'A4', title: 'Foto’s maken, terugvinden en delen' },
    ],
    includes: ['Draaiboek', 'Deelnemerskaart', 'Oefentaken', 'Zaalchecklist', 'Nazorgkaart', 'Beamer-PDF (optioneel)'],
    guideLinks: [
      { href: '/uitleg/wifi', label: 'Wifi uitleg' },
      { href: '/uitleg/fotos-maken', label: 'Foto’s maken' },
    ],
  },
  {
    slug: 'pakket-b',
    code: 'B',
    title: 'Computer & laptop — basis',
    subtitle: '4 lessen · computer',
    device: 'Computer of laptop',
    price: PAKKET_PRIJS,
    status: 'klaar',
    Icon: Monitor,
    description:
      'Muis, toetsenbord, vensters, bestanden en downloaden. Voor buurthuizen met pc’s of deelnemers met laptop.',
    lessons: [
      { code: 'B1', title: 'De computer leren bedienen' },
      { code: 'B2', title: 'Werken met vensters en tabbladen' },
      { code: 'B3', title: 'Bestanden opslaan en terugvinden' },
      { code: 'B4', title: 'Downloaden, openen en printen' },
    ],
    includes: ['START HIER', 'Draaiboek', 'Deelnemerskaart', 'Hulp bij vastlopen', 'Zaalchecklist', 'Beamer-PDF (optioneel)'],
    guideLinks: [
      { href: '/uitleg/bestanden-vinden', label: 'Bestanden vinden' },
      { href: '/digitale-hulp/computer', label: 'Computer hulp' },
    ],
  },
  {
    slug: 'pakket-c',
    code: 'C',
    title: 'WhatsApp',
    subtitle: '4 lessen · telefoon/tablet',
    device: 'Primair telefoon of tablet',
    price: PAKKET_PRIJS,
    status: 'klaar',
    Icon: MessageCircle,
    description:
      'Berichten, foto’s, bellen, groepen en veilig omgaan met WhatsApp. Sluit aan bij onze gratis WhatsApp-gidsen.',
    lessons: [
      { code: 'C1', title: 'Berichten sturen' },
      { code: 'C2', title: 'Foto’s en documenten' },
      { code: 'C3', title: 'Bellen en groepen' },
      { code: 'C4', title: 'Privacy en fraude' },
    ],
    includes: ['Draaiboek', 'Deelnemerskaart', 'Oefentaken', 'Zaalchecklist', 'Nazorgkaart', 'Beamer-PDF (optioneel)'],
    guideLinks: [
      { href: '/uitleg/whatsapp-basis', label: 'WhatsApp basis' },
      { href: '/digitale-hulp/whatsapp-uitleg-beginners', label: 'WhatsApp voor beginners' },
    ],
  },
  {
    slug: 'pakket-d',
    code: 'D',
    title: 'Veilig online',
    subtitle: '4 lessen · elk toestel',
    device: 'Telefoon, tablet of computer',
    price: PAKKET_PRIJS,
    status: 'klaar',
    Icon: Shield,
    description:
      'Nepberichten, phishing, WhatsApp/SMS-fraude en veilig betalen. Oefenen op het eigen toestel — geen verdachte links aanklikken in de les.',
    lessons: [
      { code: 'D1', title: 'Nepberichten herkennen' },
      { code: 'D2', title: 'Phishing, links en QR-codes' },
      { code: 'D3', title: 'WhatsApp- en SMS-fraude' },
      { code: 'D4', title: 'Veilig betalen' },
    ],
    includes: ['Draaiboek', 'Deelnemerskaart', 'Oefentaken', 'Zaalchecklist', 'Nazorgkaart', 'Beamer-PDF (optioneel)'],
    guideLinks: [
      { href: '/uitleg/veiligheid', label: 'Veiligheid gids' },
      { href: '/digitale-hulp/phishing-herkennen', label: 'Phishing herkennen' },
    ],
  },
  {
    slug: 'pakket-e',
    code: 'E',
    title: 'DigiD & digitale overheid',
    subtitle: '4 lessen · tik/klik kaders',
    device: 'Telefoon, tablet of computer',
    price: PAKKET_PRIJS,
    status: 'klaar',
    Icon: Landmark,
    description:
      'Praktische kennismaking: DigiD, MijnOverheid, gemeente en Belastingdienst. Privacyvriendelijk — geen aanvragen in de klas. Veilig online: pakket D.',
    lessons: [
      { code: 'E1', title: 'DigiD' },
      { code: 'E2', title: 'MijnOverheid' },
      { code: 'E3', title: 'Gemeente & Belastingdienst' },
      { code: 'E4', title: 'Berichtenbox en berichten van de overheid' },
    ],
    includes: ['Draaiboek', 'Deelnemerskaart', 'Oefentaken', 'Zaalchecklist', 'Nazorgkaart', 'Beamer-PDF (optioneel)'],
    guideLinks: [{ href: '/uitleg/digid', label: 'DigiD uitleg' }],
  },
  {
    slug: 'pakket-f-telefoon',
    code: 'F-t',
    title: 'Internet — telefoon/tablet',
    subtitle: '4 lessen · telefoon/tablet',
    device: 'Telefoon of tablet',
    price: PAKKET_PRIJS,
    status: 'klaar',
    Icon: Globe,
    description:
      'Internet met aanraken: zoeken, mobiele browser, QR-codes, formulieren en downloads. Apart van F-computer (muis/toetsenbord).',
    lessons: [
      { code: 'Ft1', title: 'Iets opzoeken op Google' },
      { code: 'Ft2', title: 'Browser gebruiken' },
      { code: 'Ft3', title: 'QR-codes openen' },
      { code: 'Ft4', title: 'Formulieren en downloads' },
    ],
    includes: ['Draaiboek', 'Deelnemerskaart', 'Oefentaken', 'Zaalchecklist', 'Nazorgkaart', 'Beamer-PDF (optioneel)'],
    relatedNote:
      'F-computer = muis/toetsenbord. F-telefoon = aanraken, QR en mobiele formulieren — kies wat bij uw groep past.',
    guideLinks: [
      { href: '/uitleg/google-maps', label: 'Google Maps' },
      { href: '/uitleg/qr-code', label: 'QR-code uitleg' },
    ],
  },
  {
    slug: 'pakket-f-computer',
    code: 'F-c',
    title: 'Internet — computer',
    subtitle: '4 lessen · computer',
    device: 'Computer of laptop',
    price: PAKKET_PRIJS,
    status: 'klaar',
    Icon: Globe,
    description:
      'Internetvaardigheden op de pc: zoeken, websites en tabbladen, veilig downloaden, formulieren. Pakket B = computer bedienen; dit pakket = internet gebruiken.',
    lessons: [
      { code: 'Fc1', title: 'Zoeken met Google' },
      { code: 'Fc2', title: 'Websites en tabbladen' },
      { code: 'Fc3', title: 'Veilig downloaden en bestanden herkennen' },
      { code: 'Fc4', title: 'Formulieren invullen' },
    ],
    includes: ['Draaiboek', 'Deelnemerskaart', 'Oefentaken', 'Zaalchecklist', 'Nazorgkaart', 'Beamer-PDF (optioneel)'],
    relatedNote:
      'F-computer = muis/toetsenbord. F-telefoon = aanraken, QR en mobiele formulieren — kies wat bij uw groep past.',
    guideLinks: [{ href: '/digitale-hulp/googelen-google-zoeken', label: 'Googelen voor beginners' }],
  },
  {
    slug: 'pakket-g',
    code: 'G',
    title: 'AI voor dagelijks gebruik',
    subtitle: '4 lessen · tik/klik · add-on',
    device: 'Telefoon, tablet of computer',
    price: PAKKET_PRIJS,
    status: 'klaar',
    Icon: Sparkles,
    description:
            'Wat is AI, Gemini als voorbeeld in de browser, goede vragen stellen en veilig gebruiken. Inclusief beamerpresentatie per les — eerst kijken, daarna oefenen op eigen toestel (telefoon, tablet of computer).',
    lessons: [
      { code: 'G1', title: 'Wat is AI?' },
      { code: 'G2', title: 'AI openen en gebruiken' },
      { code: 'G3', title: 'Goede vragen stellen' },
      { code: 'G4', title: 'AI veilig gebruiken' },
    ],
    includes: [
      'Draaiboek',
      'Deelnemerskaart',
      'Oefentaken',
      'Zaalchecklist',
      'Nazorgkaart',
      'Beamer-PDF (per les)',
    ],
    guideLinks: [
      { href: '/wat-is-ai', label: 'Wat is AI?' },
      { href: '/wat-is-ai/chatgpt', label: 'ChatGPT uitleg' },
      { href: '/wat-is-ai/prompts', label: 'Goede vragen (prompts)' },
    ],
  },
];

export function getPakketBySlug(slug: string): LesmateriaalPakket | undefined {
  return LESMATERIAAL_PAKKETTEN.find((p) => p.slug === slug);
}

export function formatPrijs(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}
