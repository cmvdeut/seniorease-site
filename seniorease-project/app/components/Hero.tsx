import Link from 'next/link';
import Image from 'next/image';

type HeroProps = {
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
};

/**
 * Hero met de bestaande SeniorEase-foto (senior-vrouw-laptop),
 * toegepast zoals op de live homepage: rechts als zachte mask-fade
 * op desktop, afgeronde foto onder de tekst op mobiel.
 */
export default function Hero({
  headline = 'Vertrouwd raken met technologie in uw eigen tempo.',
  subtext = 'Stap-voor-stap digitale hulp, gidsen en handige tools voor senioren.',
  ctaLabel = 'Begin met leren',
  ctaHref = '/uitleg',
  imageSrc = '/images/senior-vrouw-laptop.png',
  imageAlt = 'Senior vrouw gebruikt laptop thuis',
}: HeroProps) {
  const maskStyle = {
    objectPosition: '65% 25%',
    maskImage:
      'linear-gradient(90deg, transparent 0%, black 55%), linear-gradient(0deg, transparent 0%, black 20%, black 85%, transparent 100%)',
    maskComposite: 'intersect' as const,
    WebkitMaskImage:
      'linear-gradient(90deg, transparent 0%, black 55%), linear-gradient(0deg, transparent 0%, black 20%, black 85%, transparent 100%)',
    WebkitMaskComposite: 'source-in' as const,
  };

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Desktop: foto rechts, vloeiend overlopend in crème */}
      <div
        aria-hidden
        className="absolute top-0 right-0 hidden md:block"
        style={{ width: '58%', height: '100%', opacity: 0.9 }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          style={maskStyle}
          priority
          sizes="58vw"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 py-12 md:py-16 lg:py-20">
        <div className="max-w-xl md:max-w-[46%] lg:max-w-[42%]">
          <h1 className="font-serif text-[2.25rem] sm:text-[2.6rem] lg:text-senior-3xl text-navy mb-5 leading-[1.12] font-semibold">
            {headline}
          </h1>
          <p className="text-navy/70 text-senior-lg mb-8 leading-relaxed max-w-md">
            {subtext}
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center min-h-[56px] px-8 py-3.5 font-semibold text-navy bg-gold hover:bg-gold-light rounded-full transition-colors text-senior-base"
          >
            {ctaLabel}
          </Link>
        </div>

        {/* Mobiel: foto onder de tekst, zachte ronde vorm */}
        <div className="mt-10 md:hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={640}
            height={360}
            className="w-full object-cover rounded-3xl"
            style={{ objectPosition: '65% 25%' }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
