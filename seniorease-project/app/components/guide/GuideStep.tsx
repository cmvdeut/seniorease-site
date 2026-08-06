import type { ReactNode } from 'react';
import Image from 'next/image';

type GuideStepProps = {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
  tip?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** When true, image already includes the phone chrome (no nested frame). */
  deviceImage?: boolean;
};

function PhoneFrame({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="w-full max-w-[220px] sm:max-w-[240px] mx-auto md:mx-0 md:ml-auto">
      <div className="relative rounded-[2rem] border-[3px] border-navy bg-navy p-2 shadow-xl">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-24 h-5 bg-navy rounded-b-2xl" aria-hidden />
        <div className="relative aspect-[9/19] rounded-[1.5rem] overflow-hidden bg-paper">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="240px"
          />
        </div>
      </div>
    </div>
  );
}

function DeviceImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="w-full max-w-[240px] sm:max-w-[280px] mx-auto md:mx-0 md:ml-auto drop-shadow-xl">
      <div className="relative aspect-[9/16]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="280px"
          priority={false}
        />
      </div>
    </div>
  );
}

export default function GuideStep({
  id,
  number,
  title,
  children,
  tip,
  imageSrc,
  imageAlt = '',
  deviceImage = false,
}: GuideStepProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        <div>
          <h2 className="font-serif text-navy text-[1.4rem] sm:text-[1.65rem] font-semibold mb-4 leading-tight">
            {number}. {title}
          </h2>
          <div className="text-navy/85 text-senior-sm sm:text-senior-base leading-relaxed space-y-4">
            {children}
          </div>
          {tip && (
            <div className="mt-5 bg-gold text-white rounded-2xl px-5 py-4 text-senior-sm leading-relaxed flex gap-3 items-start">
              <span className="text-xl shrink-0 mt-0.5" aria-hidden>
                💡
              </span>
              <p>
                <span className="font-semibold">Pro Tip: </span>
                {tip}
              </p>
            </div>
          )}
        </div>

        {imageSrc && (
          <div className="flex justify-center md:justify-end">
            {deviceImage ? (
              <DeviceImage src={imageSrc} alt={imageAlt} />
            ) : (
              <PhoneFrame src={imageSrc} alt={imageAlt} />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
