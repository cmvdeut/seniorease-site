import Link from 'next/link';
import {
  LESMATERIAAL_LICENTIE_FOOTER,
  LESMATERIAAL_LICENTIE_ITEMS,
  LESMATERIAAL_LICENTIE_KORT,
  LESMATERIAAL_PRODUCT_LABEL,
} from './lesmateriaal-licentie';

type Props = {
  variant?: 'default' | 'compact';
};

export function LesmateriaalLicentieBlok({ variant = 'default' }: Props) {
  if (variant === 'compact') {
    return (
      <p className="text-navy/60 text-senior-xs leading-relaxed">
        {LESMATERIAAL_LICENTIE_KORT}{' '}
        <Link href="/lesmateriaal#gebruikslicentie" className="text-gold underline hover:text-gold-light">
          Gebruikslicentie
        </Link>
      </p>
    );
  }

  return (
    <section
      id="gebruikslicentie"
      aria-labelledby="gebruikslicentie-heading"
      className="scroll-mt-24 rounded-senior bg-paper border border-navy/8 p-7 sm:p-8"
    >
      <p className="text-gold font-bold text-senior-xs uppercase tracking-[0.12em] mb-2">
        Gebruikslicentie
      </p>
      <h2
        id="gebruikslicentie-heading"
        className="font-serif text-navy text-[1.35rem] font-semibold mb-3"
      >
        {LESMATERIAAL_PRODUCT_LABEL}
      </h2>
      <p className="text-navy/70 text-senior-sm leading-relaxed mb-6 max-w-2xl">
        {LESMATERIAAL_LICENTIE_KORT} U downloadt een zelfstandig lesboek — geen abonnement op een
        leeromgeving.
      </p>
      <ul className="space-y-4 mb-6 list-none p-0 m-0">
        {LESMATERIAAL_LICENTIE_ITEMS.map((item) => (
          <li key={item.title}>
            <h3 className="font-semibold text-navy text-senior-sm mb-1">{item.title}</h3>
            <p className="text-navy/70 text-senior-sm leading-relaxed">{item.text}</p>
          </li>
        ))}
      </ul>
      <p className="text-navy/55 text-senior-xs leading-relaxed">{LESMATERIAAL_LICENTIE_FOOTER}</p>
    </section>
  );
}
