import Link from 'next/link';
import {
  MessageCircle,
  Camera,
  Shield,
  Sparkles,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Idee = {
  title: string;
  text: string;
  Icon: LucideIcon;
  links: { href: string; label: string }[];
};

const IDEEEN: Idee[] = [
  {
    title: 'Samen WhatsApp ontdekken',
    text: 'Berichten, foto’s of veilig WhatsApp gebruiken — met het WhatsApp-themapakket.',
    Icon: MessageCircle,
    links: [{ href: '/lesmateriaal/pakket-c', label: 'Pakket C · WhatsApp' }],
  },
  {
    title: 'Foto’s terugvinden, ordenen en delen',
    text: 'Op telefoon of tablet oefenen met foto’s — bijvoorbeeld les A4 in pakket A.',
    Icon: Camera,
    links: [{ href: '/lesmateriaal/pakket-a', label: 'Pakket A · Telefoon & tablet' }],
  },
  {
    title: 'Veilig internetten en oplichting herkennen',
    text: 'Verdachte berichten, links en veilig betalen — met pakket Veilig online.',
    Icon: Shield,
    links: [{ href: '/lesmateriaal/pakket-d', label: 'Pakket D · Veilig online' }],
  },
  {
    title: 'Kennismaken met ChatGPT of AI',
    text: 'Praktisch oefenen met ChatGPT, of AI in het dagelijks leven via themapakket H.',
    Icon: Sparkles,
    links: [
      { href: '/lesmateriaal/chatgpt', label: 'ChatGPT-lesmateriaal' },
      { href: '/lesmateriaal/pakket-h-ai', label: 'Pakket H · AI' },
    ],
  },
  {
    title: 'Handiger met smartphone of computer',
    text: 'Basisvaardigheden op het eigen toestel — telefoon/tablet of computer/laptop.',
    Icon: Smartphone,
    links: [
      { href: '/lesmateriaal/pakket-a', label: 'Pakket A · Telefoon' },
      { href: '/lesmateriaal/pakket-b', label: 'Pakket B · Computer' },
    ],
  },
];

/**
 * Inspiratie bij bestaande shopbare thema’s — geen aparte Doe-Middag-SKU’s.
 */
export function LesmateriaalDoeMiddagIdeeen() {
  return (
    <section
      aria-labelledby="lesmateriaal-doe-middag-ideeen-heading"
      className="mb-14 md:mb-16"
    >
      <p className="text-gold font-bold text-senior-xs uppercase tracking-[0.12em] mb-3">
        Inspiratie
      </p>
      <h2
        id="lesmateriaal-doe-middag-ideeen-heading"
        className="font-serif text-navy text-[1.5rem] sm:text-[1.75rem] font-semibold leading-tight mb-4 max-w-2xl"
      >
        Ideeën voor een SeniorEase Doe-Middag
      </h2>
      <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-8">
        Voorbeelden van thema’s voor een Doe-Middag of cursus. Elk idee linkt naar bestaand
        activiteiten- en lesmateriaal.
      </p>

      <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
        {IDEEEN.map(({ title, text, Icon, links }) => (
          <li
            key={title}
            className="rounded-senior bg-paper border border-navy/8 p-5 sm:p-6 flex flex-col gap-3"
          >
            <div className="flex gap-3 items-start">
              <Icon className="text-gold shrink-0 mt-0.5" size={22} aria-hidden />
              <div className="min-w-0">
                <h3 className="font-serif text-navy font-semibold text-senior-base mb-1.5">
                  {title}
                </h3>
                <p className="text-navy/65 text-senior-sm leading-relaxed">{text}</p>
              </div>
            </div>
            <p className="flex flex-wrap gap-x-4 gap-y-2 pl-0 sm:pl-8 m-0">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-gold font-semibold text-senior-sm hover:text-gold-light min-h-[44px]"
                >
                  {link.label}
                  <ArrowRight size={14} aria-hidden />
                </Link>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
