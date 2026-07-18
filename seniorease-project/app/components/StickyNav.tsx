'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const MenuIcon = () => (
  <svg {...iconProps}>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg {...iconProps}>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="6" y1="18" x2="18" y2="6" />
  </svg>
);

const NAV_LINKS = [
  { href: '/digitale-hulp', label: 'Digitale hulp' },
  { href: '/uitleg', label: 'Uitleg' },
  { href: '/tools', label: 'Tools' },
  { href: '/over-ons', label: 'Over ons' },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function StickyNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';

  const linkClass = (href: string, isCta = false) => {
    const active = isActivePath(pathname, href);
    if (isCta) {
      return active
        ? 'ml-2 px-4 py-2.5 text-senior-xs font-bold text-white bg-primary-dark rounded-lg transition-colors shadow-sm'
        : 'ml-2 px-4 py-2.5 text-senior-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors shadow-sm';
    }
    return active
      ? 'px-3 py-2.5 text-senior-xs font-semibold text-primary bg-primary/10 rounded-lg transition-colors'
      : 'px-3 py-2.5 text-senior-xs font-semibold text-gray-700 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors';
  };

  const mobileLinkClass = (href: string, isCta = false) => {
    const active = isActivePath(pathname, href);
    if (isCta) {
      return 'block px-3 py-3 text-senior-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors text-center';
    }
    return active
      ? 'block px-3 py-3 text-senior-xs font-semibold text-primary bg-primary/10 rounded-lg transition-colors'
      : 'block px-3 py-3 text-senior-xs font-semibold text-gray-700 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-stone shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between" style={{ minHeight: '64px', height: 'auto', paddingTop: '4px', paddingBottom: '4px' }}>
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ minHeight: '44px' }}
          onClick={() => setOpen(false)}
          aria-current={pathname === '/' ? 'page' : undefined}
        >
          <Image src="/heart-logo.png" alt="SeniorEase" width={36} height={36} className="w-9 h-9" />
          <span className="text-senior-sm font-bold text-primary hidden sm:block">SeniorEase</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={linkClass(href)}
              style={{ minHeight: '44px' }}
              aria-current={isActivePath(pathname, href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={linkClass('/contact', true)}
            style={{ minHeight: '44px' }}
            aria-current={isActivePath(pathname, '/contact') ? 'page' : undefined}
          >
            Contact
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2.5 rounded-lg hover:bg-neutral-stone/50 transition-colors text-gray-700"
          style={{ minHeight: '44px', minWidth: '44px' }}
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-neutral-stone px-4 pb-4 space-y-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={mobileLinkClass(href)}
              style={{ minHeight: '48px' }}
              aria-current={isActivePath(pathname, href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={mobileLinkClass('/contact', true)}
            style={{ minHeight: '48px' }}
            aria-current={isActivePath(pathname, '/contact') ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
