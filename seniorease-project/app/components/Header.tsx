'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

const NAV_LINKS = [
  { href: '/digitale-hulp', label: 'Digitale hulp' },
  { href: '/uitleg', label: 'Gidsen' },
  { href: '/kijk-en-help', label: 'Kijk & Help' },
  { href: '/tools', label: 'Tools' },
  { href: '/over-ons', label: 'Over ons' },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';

  // Sluit het menu bij overstap naar desktopbreedte (tablet → landscape / groot scherm)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-paper text-navy border-b border-navy/10">
      <div className="max-w-senior mx-auto px-4 sm:px-6 flex items-center justify-between min-h-16 py-2 gap-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 min-h-[48px] shrink-0"
          onClick={() => setOpen(false)}
          aria-current={pathname === '/' ? 'page' : undefined}
        >
          <BrandLogo size={36} />
          <span className="font-serif text-senior-sm font-semibold tracking-tight text-navy">
            SeniorEase
          </span>
        </Link>

        {/* Vanaf lg: alle links naast elkaar. Tablet/telefoon: hamburger. */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1" aria-label="Hoofdmenu">
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActivePath(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={
                  active
                    ? 'px-2.5 xl:px-3 py-2.5 text-senior-xs font-semibold text-gold border-b-2 border-gold whitespace-nowrap'
                    : 'px-2.5 xl:px-3 py-2.5 text-senior-xs font-semibold text-navy/80 hover:text-gold transition-colors whitespace-nowrap'
                }
                style={{ minHeight: '48px', display: 'inline-flex', alignItems: 'center' }}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-3 xl:ml-4 px-5 xl:px-6 py-2 text-senior-xs font-semibold text-white bg-gold hover:bg-gold-light rounded-full transition-colors whitespace-nowrap"
            style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
            aria-current={isActivePath(pathname, '/contact') ? 'page' : undefined}
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2.5 rounded-xl hover:bg-cream transition-colors text-gold shrink-0"
          style={{ minHeight: '48px', minWidth: '48px' }}
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
          aria-controls="mobiel-hoofdmenu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          id="mobiel-hoofdmenu"
          className="lg:hidden bg-paper border-t border-navy/10 px-4 sm:px-6 pb-5 pt-2 space-y-1"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActivePath(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={
                  active
                    ? 'flex items-center px-4 py-3.5 text-senior-xs font-semibold text-white bg-gold rounded-2xl'
                    : 'flex items-center px-4 py-3.5 text-senior-xs font-semibold text-navy hover:bg-cream rounded-2xl transition-colors'
                }
                style={{ minHeight: '56px' }}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="flex items-center justify-center mt-2 px-4 py-3.5 text-senior-xs font-semibold text-white bg-gold hover:bg-gold-light rounded-full text-center transition-colors"
            style={{ minHeight: '56px' }}
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
