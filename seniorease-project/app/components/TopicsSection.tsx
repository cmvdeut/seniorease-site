import type { ReactNode } from 'react';
import Link from 'next/link';
import TopicCard from './TopicCard';
import {
  GoogleBadge,
  WhatsAppBadge,
  ShieldBadge,
  MailBadge,
} from './GuideTopicBadge';

const GUIDES: {
  title: string;
  href: string;
  imageUrl: string;
  overlay: ReactNode;
}[] = [
  {
    title: 'Google gebruiken',
    href: '/digitale-hulp/googelen-google-zoeken',
    imageUrl: '/images/topics/google-v3.jpg',
    overlay: <GoogleBadge />,
  },
  {
    title: 'WhatsApp basis',
    href: '/digitale-hulp/whatsapp-uitleg-beginners',
    imageUrl: '/images/topics/whatsapp-v4.jpg',
    overlay: <WhatsAppBadge />,
  },
  {
    title: 'Veilig internetten',
    href: '/digitale-hulp/veilig-internet',
    imageUrl: '/images/topics/veilig-v3.jpg',
    overlay: <ShieldBadge />,
  },
  {
    title: 'E-mail instellen',
    href: '/digitale-hulp/e-mail-openen',
    imageUrl: '/images/topics/email-v3.jpg',
    overlay: <MailBadge />,
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
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center min-h-touch px-9 py-3 font-semibold text-white bg-gold hover:bg-gold-light rounded-full transition-colors text-senior-sm"
        >
          Bekijk alles
        </Link>
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
