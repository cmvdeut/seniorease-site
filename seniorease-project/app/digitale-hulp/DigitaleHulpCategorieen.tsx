import Link from 'next/link';
import { Smartphone, Monitor, Mail, Shield, Sparkles, type LucideIcon } from 'lucide-react';

const CATEGORIES: {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
}[] = [
  {
    title: 'Smartphone',
    description: 'WhatsApp, foto’s, letters groter, apps.',
    href: '/digitale-hulp/smartphone',
    Icon: Smartphone,
  },
  {
    title: 'Computer',
    description: 'E-mail, bestanden, trage pc, programma’s.',
    href: '/digitale-hulp/computer',
    Icon: Monitor,
  },
  {
    title: 'Internet & e-mail',
    description: 'Online, mailen, googelen, wifi.',
    href: '/digitale-hulp/internet-email',
    Icon: Mail,
  },
  {
    title: 'Veilig internet',
    description: 'Phishing, wachtwoorden, oplichting.',
    href: '/digitale-hulp/veilig-internet',
    Icon: Shield,
  },
  {
    title: 'AI & ChatGPT',
    description: 'Gratis via Google: tik op AI-modus.',
    href: '/digitale-hulp/ai',
    Icon: Sparkles,
  },
];

export function DigitaleHulpCategorieen() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {CATEGORIES.map(({ title, description, href, Icon }) => (
        <Link
          key={href}
          href={href}
          className="bg-slate rounded-senior border border-navy/8 p-6 sm:p-7 min-h-touch hover:border-gold/40 transition-colors group flex flex-col"
        >
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-paper text-gold">
            <Icon size={28} strokeWidth={1.75} aria-hidden />
          </span>
          <h3 className="font-serif text-navy text-senior-lg font-semibold mb-2 group-hover:text-gold transition-colors">
            {title}
          </h3>
          <p className="text-navy/65 text-senior-sm leading-relaxed flex-1">{description}</p>
          <span className="mt-5 text-gold font-semibold text-senior-sm">Bekijken →</span>
        </Link>
      ))}
    </div>
  );
}
