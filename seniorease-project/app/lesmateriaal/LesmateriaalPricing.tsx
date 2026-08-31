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
      'Direct per e-mail (PDF)',
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
      'Beamer-PDF inbegrepen (waar beschikbaar)',
      'Sluit aan bij gratis gidsen op de site',
      'WhatsApp, DigiD, AI en meer',
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
      'Printrechten voor uw locatie(s)',
      'Begeleidersgids inbegrepen',
      'Beamer-PDF waar beschikbaar',
      'Eén aankoop — heel jaar lesgeven',
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
    <section aria-labelledby="lesmateriaal-pricing-heading" className="mb-16 md:mb-20">
      <p className="text-gold font-bold text-senior-xs uppercase tracking-[0.12em] mb-3">
        Eenvoudige prijzen
      </p>
      <h2
        id="lesmateriaal-pricing-heading"
        className="font-serif text-navy text-[1.65rem] sm:text-[2rem] font-semibold leading-tight mb-3 max-w-2xl"
      >
        Kies wat bij u past.
      </h2>
      <p className="text-navy/65 text-senior-sm leading-relaxed max-w-2xl mb-3">
        Losse les, heel thema of alles voor uw organisatie. Eenmalige betaling — geen
        abonnement.
      </p>
      <p className="text-navy/55 text-senior-xs leading-relaxed max-w-2xl mb-10">
        Alle prijzen zijn inclusief BTW. Wilt u een officiële factuur op naam van uw
        organisatie?{' '}
        <Link href="/contact" className="text-gold underline hover:text-gold-light">
          Neem contact op
        </Link>{' '}
        — online betalen via Stripe kan ook.
      </p>

      <ul className="grid lg:grid-cols-3 gap-5 lg:gap-6 items-stretch list-none p-0 m-0">
        {TIERS.map((tier) => (
          <li key={tier.id} className="flex">
            <article
              className={`relative flex flex-col w-full rounded-2xl border bg-paper p-6 sm:p-7 transition-shadow ${
                tier.featured
                  ? 'border-gold border-2 shadow-[0_8px_32px_rgba(139,94,60,0.15)] lg:-mt-2 lg:mb-2'
                  : 'border-navy/10 hover:border-navy/20 hover:shadow-sm'
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-4 py-1 text-[0.7rem] sm:text-senior-xs font-bold uppercase tracking-wide text-white">
                  {tier.badge}
                </span>
              )}

              <header className="mb-5 pt-1">
                <h3 className="font-serif text-navy text-[1.35rem] font-semibold mb-1">
                  {tier.name}
                </h3>
                <p className="text-navy/60 text-senior-sm leading-snug">{tier.tagline}</p>
              </header>

              <div className="mb-6">
                <p className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-serif text-navy text-[2.25rem] sm:text-[2.5rem] font-semibold leading-none">
                    {formatPrijs(tier.price)}
                  </span>
                  <span className="text-navy/50 text-senior-sm font-medium">
                    / {tier.priceNote}
                  </span>
                </p>
              </div>

              <Link
                href={tier.cta.href}
                className={`mb-7 w-full inline-flex items-center justify-center min-h-touch px-6 py-3.5 font-semibold text-senior-sm rounded-full border-2 transition-colors touch-manipulation ${
                  tier.featured
                    ? 'bg-gold hover:bg-gold-light text-white border-navy/25 shadow-[0_3px_0_0_rgba(46,36,28,0.22)]'
                    : 'bg-cream hover:bg-slate text-navy border-navy/15'
                }`}
              >
                {tier.cta.label} →
              </Link>

              <ul className="space-y-3 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-navy/80 text-senior-sm leading-snug"
                  >
                    <Check
                      className="text-gold shrink-0 mt-0.5"
                      size={18}
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
