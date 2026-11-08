import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/app/components/JsonLd';
import LesmateriaalPakketBestelPanel from '@/app/components/LesmateriaalPakketBestelPanel';
import { LesmateriaalFeedback } from '../LesmateriaalFeedback';
import { LesmateriaalLicentieBlok } from '../LesmateriaalLicentieBlok';
import { buildPageMetadata, SITE_URL } from '@/lib/seo';
import {
  formatPrijs,
  getPakketBySlug,
  lessonDisplayCode,
  listRoutablePakketten,
  LOSSE_LES_PRIJS,
} from '../lesmateriaal-data';
import { getLesmateriaalSeoOverride } from '../lesmateriaal-seo-overrides';
import { getLesmateriaalPaymentLinkBase } from '@/lib/lesmateriaal-checkout';
import {
  isSessionsCheckoutReady,
  isStripePriceConfigured,
} from '@/lib/lesmateriaal-checkout-catalog';
import {
  getLesmateriaalCheckoutMode,
  resolveCheckoutChannelAvailability,
} from '@/lib/lesmateriaal-checkout-mode';
import { Check } from 'lucide-react';
import { LesmateriaalScrollToBestel } from '../LesmateriaalScrollToBestel';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

/** Stripe-env op runtime (Vercel), niet alleen bij build inbakken */
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return listRoutablePakketten().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pakket = getPakketBySlug(slug);
  if (!pakket) return {};
  const seo = getLesmateriaalSeoOverride(slug);
  return buildPageMetadata({
    path: `/lesmateriaal/${slug}`,
    title: seo?.title ?? `Pakket ${pakket.code}: ${pakket.title}`,
    description:
      seo?.description ??
      `${pakket.description} Digitaal lesboek: vier lessen à 90 minuten. ${formatPrijs(pakket.price)} per pakket.`,
    keywords: ['lesmateriaal', pakket.title, 'senioren', 'PDF', pakket.code],
  });
}

export default async function LesmateriaalPakketPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const pakket = getPakketBySlug(slug);
  if (!pakket) notFound();

  const sp = (await searchParams) ?? {};
  const bestelRaw = sp.bestel;
  const bestel =
    typeof bestelRaw === 'string' ? bestelRaw : Array.isArray(bestelRaw) ? bestelRaw[0] : '';
  const preferLos = bestel === 'los';
  const lesRaw = sp.les;
  const lesParam =
    typeof lesRaw === 'string' ? lesRaw : Array.isArray(lesRaw) ? lesRaw[0] : '';
  const initialLessonCode = pakket.lessons.some((l) => l.code === lesParam)
    ? lesParam
    : undefined;

  const checkoutMode = getLesmateriaalCheckoutMode();
  const pakketPaymentLinkBase = getLesmateriaalPaymentLinkBase('pakket', slug);
  const losPaymentLinkBase = getLesmateriaalPaymentLinkBase('los');
  const sessionsInfrastructureReady = isSessionsCheckoutReady();
  const pakketChannel = resolveCheckoutChannelAvailability({
    mode: checkoutMode,
    sessionsInfrastructureReady,
    priceConfigured: isStripePriceConfigured('STRIPE_PRICE_LESMATERIAAL_PAKKET'),
    paymentLinkBase: pakketPaymentLinkBase,
  });
  const losChannel = resolveCheckoutChannelAvailability({
    mode: checkoutMode,
    sessionsInfrastructureReady,
    priceConfigured: isStripePriceConfigured('STRIPE_PRICE_LESMATERIAAL_LOS'),
    paymentLinkBase: losPaymentLinkBase,
  });
  const pakketUsesSessions = pakketChannel.usesSessions;
  const losUsesSessions = losChannel.usesSessions;
  const pakketCheckoutEnabled = pakketChannel.checkoutEnabled;
  const losCheckoutEnabled = losChannel.checkoutEnabled;
  const Icon = pakket.Icon;
  const seo = getLesmateriaalSeoOverride(slug);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `SeniorEase digitaal lesboek pakket ${pakket.code}`,
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
      <LesmateriaalScrollToBestel targetId="bestellen-los" enabled={preferLos} />

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-14 md:py-20">
        <Link
          href={preferLos ? '/lesmateriaal?bestel=los#themapakketten' : '/lesmateriaal'}
          className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
        >
          ← {preferLos ? 'Andere thema’s voor een losse les' : 'Alle pakketten'}
        </Link>

        <div className="flex items-start gap-4 mb-6">
          <span className="shrink-0 w-14 h-14 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
            <Icon size={28} strokeWidth={2} aria-hidden />
          </span>
          <div>
            <p className="text-gold font-bold text-senior-sm uppercase tracking-wide mb-1">
              Pakket {pakket.code}
              {preferLos ? ' · losse les' : ''}
            </p>
            <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.2rem] font-semibold leading-tight">
              {pakket.title}
            </h1>
          </div>
        </div>

        <div className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-8 space-y-3">
          {seo?.openingLead ? <p>{seo.openingLead}</p> : null}
          <p>{pakket.description}</p>
        </div>

        {preferLos ? (
          <p className="mb-8 max-w-2xl rounded-senior border border-gold/30 bg-gold/10 px-5 py-4 text-navy text-senior-sm leading-relaxed">
            U bestelt <strong>één losse les</strong> ({formatPrijs(LOSSE_LES_PRIJS)}), niet het hele
            pakket. Kies hieronder welke les — of ga direct naar bestellen.
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3 mb-10">
          {pakket.popular && !preferLos ? (
            <span className="rounded-full bg-gold text-white text-senior-sm font-semibold px-4 py-2">
              Populair
            </span>
          ) : null}
          {!preferLos ? (
            <a
              href="#bestellen-pakket"
              className="rounded-full bg-navy text-white text-senior-sm font-semibold px-4 py-2 min-h-touch inline-flex items-center hover:bg-navy/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 transition-colors"
            >
              Heel pakket {formatPrijs(pakket.price)} →
            </a>
          ) : null}
          <a
            href="#bestellen-los"
            className={`rounded-full text-senior-sm font-semibold px-4 py-2 min-h-touch inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 transition-colors ${
              preferLos
                ? 'bg-navy text-white hover:bg-navy/90'
                : 'bg-paper border border-navy/15 text-navy hover:border-gold hover:text-gold'
            }`}
          >
            Losse les {formatPrijs(LOSSE_LES_PRIJS)} →
          </a>
        </div>

        {pakket.relatedNote && !preferLos ? (
          <p className="text-navy/70 text-senior-sm bg-slate rounded-senior border border-navy/8 px-5 py-4 mb-10 max-w-2xl">
            {pakket.relatedNote}
          </p>
        ) : null}

        <div className={`grid gap-8 mb-12 ${preferLos ? '' : 'lg:grid-cols-2'}`}>
          <div className="bg-paper rounded-senior border border-navy/8 p-7">
            <h2 className="font-serif text-navy text-[1.35rem] font-semibold mb-2">
              {preferLos ? 'Kies welke les u wilt bestellen' : 'Vier lessen (à 90 min)'}
            </h2>
            {preferLos ? (
              <p className="text-navy/65 text-senior-sm mb-5">
                Tik op een les om die te selecteren bij bestellen.
              </p>
            ) : (
              <div className="mb-5" />
            )}
            <ol className="space-y-3 list-none p-0 m-0">
              {pakket.lessons.map((les) => {
                const selected = preferLos && initialLessonCode === les.code;
                const content = (
                  <>
                    <span className="font-bold text-gold shrink-0">{lessonDisplayCode(les)}</span>
                    <span className="flex-1">{les.title}</span>
                    {preferLos ? (
                      <span className="text-gold font-semibold shrink-0 text-senior-sm">
                        {selected ? 'Gekozen' : 'Kies →'}
                      </span>
                    ) : null}
                  </>
                );
                return (
                  <li key={les.code}>
                    {preferLos ? (
                      <Link
                        href={`/lesmateriaal/${slug}?bestel=los&les=${encodeURIComponent(les.code)}#bestellen-los`}
                        className={`flex gap-3 items-center text-navy text-senior-sm sm:text-senior-base rounded-senior border px-4 py-3 min-h-touch transition-colors ${
                          selected
                            ? 'border-gold bg-gold/10'
                            : 'border-navy/10 bg-white hover:border-gold'
                        }`}
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className="flex gap-3 text-navy text-senior-sm sm:text-senior-base">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {!preferLos ? (
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
          ) : null}
        </div>

        {pakket.guideLinks && pakket.guideLinks.length > 0 && !preferLos ? (
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
        ) : null}

        <div
          id="bestellen"
          className="bg-slate rounded-senior border border-navy/8 p-7 sm:p-9 max-w-xl scroll-mt-24"
        >
          <h2 className="font-serif text-navy text-[1.35rem] font-semibold mb-3">
            {preferLos ? 'Losse les bestellen' : 'Direct bestellen'}
          </h2>
          <p className="text-navy/70 text-senior-sm leading-relaxed mb-6">
            {preferLos
              ? `PDF voor één lesmiddag — ${formatPrijs(LOSSE_LES_PRIJS)}. Digitaal per e-mail.`
              : 'Digitaal lesboek (PDF) per e-mail — download, print en geef les. Geen online cursus. Geschikt voor bibliotheken, buurthuizen en particulieren.'}
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
            pakketUsesSessions={pakketUsesSessions}
            losUsesSessions={losUsesSessions}
            preferLos={preferLos}
            initialLessonCode={initialLessonCode}
          />
          <div className="mt-6">
            <LesmateriaalLicentieBlok variant="compact" />
          </div>
        </div>

        <LesmateriaalFeedback
          variant="pakket"
          pakketSlug={slug}
          pakketCode={pakket.code}
          pakketTitle={pakket.title}
          className="mt-10 md:mt-12 max-w-xl"
        />
      </div>
    </main>
  );
}
