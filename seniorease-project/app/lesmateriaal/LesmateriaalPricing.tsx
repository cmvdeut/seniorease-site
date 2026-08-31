import Link from 'next/link';
import { Check } from 'lucide-react';
import {
  formatPrijs,
  LOSSE_LES_PRIJS,
  ORG_COMPLEET_PRIJS,
  PAKKET_PRIJS,
} from './lesmateriaal-data';
import { isLesmateriaalCheckoutEnabled } from '@/lib/lesmateriaal-checkout';

type PricingTier = {
  id: string;
  name: string;
  price: number;
  priceNote: string;
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
};

const TIERS: PricingTier[] = [
  {
    id: 'los',
    name: 'Losse les',
    price: LOSSE_LES_PRIJS,
    priceNote: 'eenmalig',
    tagline: 'Eén lesmiddag uitproberen.',
    features: [
      'Draaiboek voor de begeleider',
      'Deelnemerskaart en oefentaken',
      'Zaalchecklist en nazorgkaart',
      '90 minuten — eigen telefoon of tablet',
      'Digitaal lesboek (PDF) — geen online cursus',
      'Direct per e-mail (download)',
    ],
    cta: { label: 'Kies een les', href: '#themapakketten' },
  },
  {
    id: 'pakket',
    name: 'Themapakket',
    price: PAKKET_PRIJS,
    priceNote: 'eenmalig',
    tagline: 'Volledig thema, vier lesmiddagen.',
    featured: true,
    badge: 'Meest gekozen',
    features: [
      'Alles uit losse les, vier keer',
      '4 lessen à 90 minuten',
      'Digitaal lesboek — download & print',
      'Beamer-PDF inbegrepen (waar beschikbaar)',
      'Sluit aan bij gratis gidsen op de site',
    ],
    cta: { label: 'Bekijk thema\'s', href: '#themapakketten' },
  },
  {
    id: 'compleet',
    name: 'Organisatie',
    price: ORG_COMPLEET_PRIJS,
    priceNote: 'eenmalig',
    tagline: 'Bibliotheek, buurthuis of stichting.',
    features: [
      'Alle themapakketten A–G',
      'Locatie-licentie: één vestiging',
      'Printrechten voor meerdere lesgroepen',
      'Begeleidersgids inbegrepen',
      'Beamer-PDF waar beschikbaar',
    ],
    cta: { label: 'Direct bestellen', href: '#organisatie-bestellen' },
  },
];

const TRUST_ITEMS = [
  'Prijzen incl. BTW',
  'Direct download per e-mail',
  'iDEAL en creditcard',
  'Geen abonnement — eenmalig',
  'Factuur op aanvraag',
];

export function LesmateriaalPricing() {
  const anyCheckout =
    isLesmateriaalCheckoutEnabled('pakket') ||
    isLesmateriaalCheckoutEnabled('los') ||
    isLesmateriaalCheckoutEnabled('compleet');

  return (
    <section aria-labelledby="lesmateriaal-pricing-heading" className="mb-12 md:mb-14">
      <p className="text-gold font-bold text-senior-xs uppercase tracking-[0.12em] mb-3">
        Eenvoudige prijzen
      </p>
      <h2
        id="lesmateriaal-pricing-heading"
        className="font-serif text-navy text-[1.45rem] sm:text-[1.65rem] font-semibold leading-tight mb-2 max-w-2xl"
      >
        Kies wat bij u past.
      </h2>
      <p className="text-navy/65 text-senior-sm leading-relaxed max-w-2xl mb-2">
        Losse les, heel thema of alles voor uw organisatie. Eenmalige betaling — geen
        abonnement.
      </p>
      <p className="text-navy/55 text-senior-xs leading-relaxed max-w-2xl mb-8">
        Alle prijzen zijn inclusief BTW. Wilt u een officiële factuur op naam van uw
        organisatie?{' '}
        <Link href="/contact" className="text-gold underline hover:text-gold-light">
          Neem contact op
        </Link>{' '}
        — online betalen via Stripe kan ook.
      </p>

      <ul className="grid lg:grid-cols-3 gap-3 lg:gap-4 items-stretch list-none p-0 m-0 max-w-4xl">
        {TIERS.map((tier) => (
          <li key={tier.id} className="flex">
            <article
              className={`relative flex flex-col w-full rounded-xl border bg-paper p-4 sm:p-5 transition-shadow ${
                tier.featured
                  ? 'border-gold border-2 shadow-[0_6px_24px_rgba(139,94,60,0.12)]'
                  : 'border-navy/10 hover:border-navy/20 hover:shadow-sm'
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-3 py-0.5 text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-wide text-white">
                  {tier.badge}
                </span>
              )}

              <header className="mb-3 pt-0.5">
                <h3 className="font-serif text-navy text-[1.1rem] sm:text-[1.15rem] font-semibold mb-0.5">
                  {tier.name}
                </h3>
                <p className="text-navy/60 text-[0.9rem] leading-snug">{tier.tagline}</p>
              </header>

              <div className="mb-4">
                <p className="flex items-baseline gap-1 flex-wrap">
                  <span className="font-serif text-navy text-[1.75rem] sm:text-[1.85rem] font-semibold leading-none">
                    {formatPrijs(tier.price)}
                  </span>
                  <span className="text-navy/50 text-[0.85rem] font-medium">
                    / {tier.priceNote}
                  </span>
                </p>
              </div>

              <Link
                href={tier.cta.href}
                className={`mb-5 w-full inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 font-semibold text-[0.9rem] rounded-full border-2 transition-colors touch-manipulation ${
                  tier.featured
                    ? 'bg-gold hover:bg-gold-light text-white border-navy/25 shadow-[0_2px_0_0_rgba(46,36,28,0.18)]'
                    : 'bg-cream hover:bg-slate text-navy border-navy/15'
                }`}
              >
                {tier.cta.label} →
              </Link>

              <ul className="space-y-2 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-navy/80 text-[0.875rem] leading-snug"
                  >
                    <Check
                      className="text-gold shrink-0 mt-0.5"
                      size={15}
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>

      <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-navy/55 text-senior-xs sm:text-[1rem] list-none p-0 m-0">
        {TRUST_ITEMS.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <Check className="text-gold shrink-0" size={16} strokeWidth={2.5} aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      {!anyCheckout && (
        <p className="mt-6 text-center text-navy/50 text-senior-xs">
          Online betalen wordt binnenkort geactiveerd — bestellen kan al via contact.
        </p>
      )}
    </section>
  );
}

export function LesmateriaalPrijsBadge() {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-gold/15 text-gold font-semibold text-senior-sm px-4 py-2">
      Vanaf {formatPrijs(LOSSE_LES_PRIJS)} · incl. BTW · geen abonnement
    </p>
  );
}
