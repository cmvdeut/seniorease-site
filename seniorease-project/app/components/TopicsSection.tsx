import type { ReactNode } from 'react';
import TopicCard from './TopicCard';
import SeniorButton from './SeniorButton';
import {
  GoogleBadge,
  WhatsAppBadge,
  ShieldBadge,
  DigiDBadge,
} from './GuideTopicBadge';

const GUIDES: {
  title: string;
  href: string;
  imageUrl: string;
  overlay: ReactNode;
}[] = [
  {
    title: 'DigiD — wat is het?',
    href: '/uitleg/digid',
    imageUrl: '/images/topics/email-v3.jpg',
    overlay: <DigiDBadge />,
  },
  {
    title: 'Oplichting herkennen',
    href: '/uitleg/veiligheid',
    imageUrl: '/images/topics/veilig-v3.jpg',
    overlay: <ShieldBadge />,
  },
  {
    title: 'WhatsApp basis',
    href: '/uitleg/whatsapp-basis',
    imageUrl: '/images/topics/whatsapp-v4.jpg',
    overlay: <WhatsAppBadge />,
  },
  {
    title: 'Google gebruiken',
    href: '/digitale-hulp/googelen-google-zoeken',
    imageUrl: '/images/topics/google-v3.jpg',
    overlay: <GoogleBadge />,
  },
];

const TOOLS = [
  {
    title: 'Rekenmachine',
    href: '/rekenmachine',
    illustrationUrl: '/images/tools/rekenmachine.png',
    illustrationBg: '#F3EDE4',
  },
  {
    title: 'Verjaardagskalender',
    href: '/kalender',
    illustrationUrl: '/images/tools/kalender.png',
    illustrationBg: '#F5EBE4',
  },
  {
    title: 'Wachtwoord manager',
    href: '/uitleg/wachtwoorden',
    illustrationUrl: '/images/tools/wachtwoord.png',
    illustrationBg: '#F5F0E0',
  },
  {
    title: 'Notities',
    href: '/afvinken',
    illustrationUrl: '/images/tools/notities.png',
    illustrationBg: '#EEF3E6',
  },
] as const;

function Panel({
  title,
  children,
  ctaHref,
}: {
  title: string;
  children: ReactNode;
  ctaHref: string;
}) {
  return (
    <div className="bg-slate rounded-senior p-7 sm:p-9 shadow-sm border border-navy/8 flex flex-col">
      <h2 className="font-serif text-navy text-[1.65rem] sm:text-[1.9rem] mb-8 font-semibold leading-tight">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-9 flex-1 content-start">
        {children}
      </div>
      <div className="flex justify-center mt-auto">
        <SeniorButton href={ctaHref}>Bekijk alles</SeniorButton>
      </div>
    </div>
  );
}

export default function TopicsSection() {
  return (
    <section className="bg-cream py-20 md:py-24">
      <div className="max-w-senior mx-auto px-5 sm:px-6 grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        <Panel title="Meest bekeken gidsen" ctaHref="/uitleg">
          {GUIDES.map((g) => (
            <TopicCard
              key={g.href}
              title={g.title}
              href={g.href}
              imageUrl={g.imageUrl}
              overlay={g.overlay}
            />
          ))}
        </Panel>

        <Panel title="Handige tools" ctaHref="/tools">
          {TOOLS.map((t) => (
            <TopicCard
              key={t.href}
              title={t.title}
              href={t.href}
              illustrationUrl={t.illustrationUrl}
              illustrationBg={t.illustrationBg}
            />
          ))}
        </Panel>
      </div>
    </section>
  );
}
