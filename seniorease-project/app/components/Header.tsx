'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function LeafMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 3c-1.5 4-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-4.5-7-6-11z" opacity="0.95" />
      <path d="M12 10v10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: '/digitale-hulp', label: 'Digitale hulp' },
  { href: '/uitleg', label: 'Gidsen' },
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

  return (
    <header className="sticky top-0 z-50 bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between min-h-16 py-2">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-gold min-h-touch"
          onClick={() => setOpen(false)}
          aria-current={pathname === '/' ? 'page' : undefined}
        >
          <LeafMark className="text-gold shrink-0" />
          <span className="font-serif text-senior-sm font-semibold tracking-tight text-white">
            SeniorEase
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Hoofdmenu">
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActivePath(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={
                  active
                    ? 'px-3 py-2.5 text-senior-xs font-semibold text-gold border-b-2 border-gold'
                    : 'px-3 py-2.5 text-senior-xs font-semibold text-white/90 hover:text-gold transition-colors'
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
            className="ml-4 px-6 py-2 text-senior-xs font-semibold text-navy bg-gold hover:bg-gold-light rounded-full transition-colors"
            style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
            aria-current={isActivePath(pathname, '/contact') ? 'page' : undefined}
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2.5 rounded-xl hover:bg-white/10 transition-colors text-gold"
          style={{ minHeight: '48px', minWidth: '48px' }}
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy border-t border-white/15 px-4 pb-5 pt-2 space-y-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActivePath(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={
                  active
                    ? 'block px-4 py-3.5 text-senior-xs font-semibold text-navy bg-gold rounded-2xl'
                    : 'block px-4 py-3.5 text-senior-xs font-semibold text-white/90 hover:bg-white/10 rounded-2xl transition-colors'
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
            className="block mt-2 px-4 py-3.5 text-senior-xs font-semibold text-navy bg-gold hover:bg-gold-light rounded-full text-center transition-colors"
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
