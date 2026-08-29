import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/app/components/JsonLd';
import LesmateriaalPakketBestelPanel from '@/app/components/LesmateriaalPakketBestelPanel';
import { buildPageMetadata, SITE_URL } from '@/lib/seo';
import {
  LESMATERIAAL_PAKKETTEN,
  formatPrijs,
  getPakketBySlug,
  LOSSE_LES_PRIJS,
} from '../lesmateriaal-data';
import { getLesmateriaalPaymentLinkBase } from '@/lib/lesmateriaal-checkout';
import { Check } from 'lucide-react';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return LESMATERIAAL_PAKKETTEN.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pakket = getPakketBySlug(slug);
  if (!pakket) return {};
  return buildPageMetadata({
    path: `/lesmateriaal/${slug}`,
    title: `Pakket ${pakket.code}: ${pakket.title}`,
    description: `${pakket.description} Vier lessen à 90 minuten. ${formatPrijs(pakket.price)} per pakket.`,
    keywords: ['lesmateriaal', pakket.title, 'senioren', 'PDF', pakket.code],
  });
}

export default async function LesmateriaalPakketPage({ params }: Props) {
  const { slug } = await params;
  const pakket = getPakketBySlug(slug);
  if (!pakket) notFound();

  const pakketPaymentLinkBase = getLesmateriaalPaymentLinkBase('pakket', slug);
  const losPaymentLinkBase = getLesmateriaalPaymentLinkBase('los');
  const pakketCheckoutEnabled = pakketPaymentLinkBase !== null;
  const losCheckoutEnabled = losPaymentLinkBase !== null;
  const Icon = pakket.Icon;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `SeniorEase lesmateriaal pakket ${pakket.code}`,
    description: pakket.description,
    brand: { '@type': 'Brand', name: 'SeniorEase' },
    offers: {
      '@type': 'Offer',
      price: pakket.price.toFixed(2),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/lesmateriaal/${slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={productSchema} />

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-14 md:py-20">
        <Link
          href="/lesmateriaal"
          className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
        >
          ← Alle pakketten
        </Link>

        <div className="flex items-start gap-4 mb-6">
          <span className="shrink-0 w-14 h-14 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
            <Icon size={28} strokeWidth={2} aria-hidden />
          </span>
          <div>
            <p className="text-gold font-bold text-senior-sm uppercase tracking-wide mb-1">
              Pakket {pakket.code}
            </p>
            <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.2rem] font-semibold leading-tight">
              {pakket.title}
            </h1>
          </div>
        </div>

        <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-8">
          {pakket.description}
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="rounded-full bg-navy text-white text-senior-sm font-semibold px-4 py-2">
            {formatPrijs(pakket.price)} · 4 lessen
          </span>
          <span className="rounded-full bg-paper border border-navy/15 text-navy text-senior-sm font-semibold px-4 py-2">
            {pakket.device}
          </span>
          <span className="rounded-full bg-paper border border-navy/15 text-navy text-senior-sm font-semibold px-4 py-2">
            Losse les {formatPrijs(LOSSE_LES_PRIJS)}
          </span>
        </div>

        {pakket.relatedNote && (
          <p className="text-navy/70 text-senior-sm bg-slate rounded-senior border border-navy/8 px-5 py-4 mb-10 max-w-2xl">
            {pakket.relatedNote}
          </p>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-paper rounded-senior border border-navy/8 p-7">
            <h2 className="font-serif text-navy text-[1.35rem] font-semibold mb-5">
              Vier lessen (à 90 min)
            </h2>
            <ol className="space-y-3">
              {pakket.lessons.map((les) => (
                <li
                  key={les.code}
                  className="flex gap-3 text-navy text-senior-sm sm:text-senior-base"
                >
                  <span className="font-bold text-gold shrink-0">{les.code}</span>
                  <span>{les.title}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-paper rounded-senior border border-navy/8 p-7">
            <h2 className="font-serif text-navy text-[1.35rem] font-semibold mb-5">
              In elk PDF-pakket
            </h2>
            <ul className="space-y-3">
              {pakket.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-navy text-senior-sm">
                  <Check className="text-gold shrink-0 mt-0.5" size={18} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-navy/60 text-senior-sm mt-6 leading-relaxed">
              Didactiek: kijken → doen → controleren → pauzeren. Geen bord verplicht — print op
              tafel.
            </p>
          </div>
        </div>

        {pakket.guideLinks && pakket.guideLinks.length > 0 && (
          <div className="mb-12">
            <h2 className="font-serif text-navy text-[1.35rem] font-semibold mb-4">
              Gratis gidsen op SeniorEase
            </h2>
            <ul className="flex flex-wrap gap-3">
              {pakket.guideLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-touch items-center rounded-full border-2 border-navy/20 bg-paper px-5 py-2.5 text-senior-sm font-semibold text-navy hover:border-gold hover:text-gold transition-colors"
                  >
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-slate rounded-senior border border-navy/8 p-7 sm:p-9 max-w-xl">
          <h2 className="font-serif text-navy text-[1.35rem] font-semibold mb-3">
            Direct bestellen
          </h2>
          <p className="text-navy/70 text-senior-sm leading-relaxed mb-6">
            PDF-download per e-mail. Geschikt voor bibliotheken, buurthuizen en particulieren.
          </p>
          <LesmateriaalPakketBestelPanel
            slug={slug}
            pakketCode={pakket.code}
            pakketTitle={pakket.title}
            price={pakket.price}
            lessons={pakket.lessons}
            pakketCheckoutEnabled={pakketCheckoutEnabled}
            losCheckoutEnabled={losCheckoutEnabled}
            pakketPaymentLinkBase={pakketPaymentLinkBase}
            losPaymentLinkBase={losPaymentLinkBase}
          />
        </div>
      </div>
    </main>
  );
}
