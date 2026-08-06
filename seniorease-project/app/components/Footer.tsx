import Link from 'next/link';
import BrandLogo from './BrandLogo';

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23 12.2s0-3.4-.4-5c-.2-1-.9-1.7-1.9-1.9C18.7 5 12 5 12 5s-6.7 0-8.7.3c-1 .2-1.7.9-1.9 1.9C1 8.8 1 12.2 1 12.2s0 3.4.4 5c.2 1 .9 1.7 1.9 1.9 2 .3 8.7.3 8.7.3s6.7 0 8.7-.3c1-.2 1.7-.9 1.9-1.9.4-1.6.4-5 .4-5zM9.8 15.5v-6.6l6.3 3.3-6.3 3.3z" />
    </svg>
  );
}

const navCol = [
  { href: '/digitale-hulp', label: 'Digitale hulp' },
  { href: '/uitleg', label: 'Gidsen' },
  { href: '/kijk-en-help', label: 'Kijk & Help' },
  { href: '/tools', label: 'Tools' },
  { href: '/over-ons', label: 'Over ons' },
];

const contactCol = [
  { href: '/contact', label: 'Contact' },
  { href: '/voorwaarden', label: 'Voorwaarden' },
  { href: '/privacy', label: 'Privacy' },
];

const socials = [
  {
    href: 'https://www.facebook.com/seniorease.nl',
    label: 'Facebook',
    Icon: FacebookIcon,
  },
  {
    href: 'https://www.youtube.com/@SeniorEaseNL',
    label: 'YouTube',
    Icon: YoutubeIcon,
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <BrandLogo size={32} />
              <span className="font-serif text-senior-base font-semibold text-white">
                SeniorEase
              </span>
            </div>
            <p className="text-white/80 text-senior-xs leading-relaxed max-w-xs">
              SeniorEase maakt technologie begrijpelijk — vertrouwd en in uw eigen tempo, voor senioren.
            </p>
            <p className="mt-6 text-white/45 text-senior-xs">© 2026 SeniorEase</p>
          </div>

          <div>
            <h2 className="font-serif text-senior-sm font-semibold text-gold mb-4">Navigatie</h2>
            <ul className="space-y-3">
              {navCol.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-senior-xs text-gold/90 hover:text-gold-light transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-senior-sm font-semibold text-gold mb-4">Contact</h2>
            <ul className="space-y-3">
              {contactCol.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-senior-xs text-gold/90 hover:text-gold-light transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:justify-self-end">
            <h2 className="font-serif text-senior-sm font-semibold text-gold mb-4 lg:text-right">
              Volg ons
            </h2>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gold/20 hover:bg-gold text-gold hover:text-navy flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
