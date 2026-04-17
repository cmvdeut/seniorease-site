import Link from 'next/link';
import Image from 'next/image';
import {
  Smartphone, Monitor, Globe, ShieldCheck, Bot,
  Calculator, CheckSquare, CalendarDays, PuzzleIcon,
  BookOpen, ChevronRight, ArrowRight,
} from 'lucide-react';
import GebruikMijnBibliotheekButton from './components/GebruikMijnBibliotheekButton';
import NieuwsbriefBlok from './components/NieuwsbriefBlok';
import { artikelen } from './digitale-hulp/artikelen';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@SeniorEaseNL';
const FACEBOOK_PAGE_URL  = 'https://www.facebook.com/SeniorEaseNL';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SeniorEase",
    "description": "Digitale hulp voor senioren — simpel uitgelegd.",
    "url": "https://seniorease.nl",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web, Android, iOS",
    "audience": { "@type": "Audience", "audienceType": "Senioren, Ouderen" },
  };

  return (
    <main className="min-h-screen" style={{ background: '#F5EEE6' }}>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Tekst — links */}
            <div className="flex-1 min-w-0">
              <Link href="/over-ons" style={{ minHeight: 'auto' }} className="inline-block mb-6">
                <Image
                  src="/heart-logo.png"
                  alt="SeniorEase"
                  width={56}
                  height={56}
                  className="opacity-90"
                  priority
                />
              </Link>

              <h1 className="font-bold text-gray-900 mb-4 leading-tight"
                  style={{ fontSize: '2.6rem', letterSpacing: '-0.02em' }}>
                Digitale hulp voor senioren
              </h1>
              <p className="text-gray-500 mb-10"
                 style={{ fontSize: '1.3rem', lineHeight: 1.65, maxWidth: '480px' }}>
                Stap voor stap uitleg over smartphone, computer en internet — in uw eigen tempo.
              </p>

              {/* 3 CTA-knoppen */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Link href="/digitale-hulp/smartphone"
                  className="flex items-center gap-2.5 font-semibold text-white rounded-xl px-6 py-4 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: '#8B5E3C', fontSize: '1.2rem' }}>
                  <Smartphone size={21} strokeWidth={1.75} />
                  Smartphone
                </Link>
                <Link href="/digitale-hulp/computer"
                  className="flex items-center gap-2.5 font-semibold text-white rounded-xl px-6 py-4 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: '#8B5E3C', fontSize: '1.2rem' }}>
                  <Monitor size={21} strokeWidth={1.75} />
                  Computer
                </Link>
                <Link href="/digitale-hulp/internet-email"
                  className="flex items-center gap-2.5 font-semibold text-white rounded-xl px-6 py-4 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: '#8B5E3C', fontSize: '1.2rem' }}>
                  <Globe size={21} strokeWidth={1.75} />
                  Internet &amp; e-mail
                </Link>
              </div>

              {/* Secundaire links */}
              <div className="flex flex-wrap gap-6">
                <Link href="/digitale-hulp/veilig-internet"
                  className="flex items-center gap-1.5 font-medium hover:underline"
                  style={{ color: '#8B5E3C', fontSize: '1.05rem', minHeight: 'auto' }}>
                  <ShieldCheck size={16} strokeWidth={2} />
                  Veilig internet
                </Link>
                <Link href="/digitale-hulp/ai"
                  className="flex items-center gap-1.5 font-medium hover:underline"
                  style={{ color: '#8B5E3C', fontSize: '1.05rem', minHeight: 'auto' }}>
                  <Bot size={16} strokeWidth={2} />
                  AI uitleg
                </Link>
              </div>
            </div>

            {/* Foto — rechts */}
            <div className="flex-shrink-0 w-full lg:w-[420px]">
              <Image
                src="/images/senior female.png"
                alt="Senior vrouw gebruikt tablet thuis"
                width={420}
                height={480}
                className="rounded-2xl shadow-lg object-cover w-full"
                style={{ maxHeight: '480px' }}
                priority
              />
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ZOEKBALK
      ════════════════════════════════════════ */}
      <section style={{ background: '#F5EEE6' }} className="py-10 border-y border-neutral-stone/50">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-center font-semibold text-gray-700 mb-4" style={{ fontSize: '1.2rem' }}>
            Of zoek direct op onderwerp
          </p>
          <form action="/digitale-hulp" method="get">
            <label htmlFor="home-zoek" className="sr-only">Zoek naar een onderwerp</label>
            <div className="flex gap-3">
              <input
                id="home-zoek"
                type="search"
                name="q"
                placeholder="bijv. WhatsApp, wifi, wachtwoord…"
                className="flex-1 rounded-xl border border-neutral-stone focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white text-gray-800 placeholder-gray-400 transition-colors shadow-sm"
                style={{ fontSize: '1.2rem', padding: '0.9rem 1.25rem' }}
              />
              <button type="submit"
                className="font-bold text-white rounded-xl shadow-sm hover:opacity-90 transition-opacity px-6"
                style={{ background: '#8B5E3C', fontSize: '1.2rem', minHeight: 'auto' }}>
                Zoeken
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ════════════════════════════════════════
          POPULAIRE ONDERWERPEN
      ════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-bold text-gray-900" style={{ fontSize: '1.75rem' }}>
              Waar anderen naar zoeken
            </h2>
            <Link href="/uitleg"
              className="flex items-center gap-1 font-semibold hover:underline"
              style={{ color: '#8B5E3C', fontSize: '1.1rem', minHeight: 'auto' }}>
              Alle uitleg <ArrowRight size={16} />
            </Link>
          </div>

          <ul className="divide-y divide-neutral-stone/40">
            {[
              { href: '/digitale-hulp/whatsapp-uitleg-beginners', label: 'WhatsApp uitleg voor beginners' },
              { href: '/uitleg/qr-code',                          label: 'QR-code scannen' },
              { href: '/uitleg/wifi',                             label: 'WiFi instellen' },
              { href: '/uitleg/veiligheid',                       label: 'Oplichting herkennen' },
              { href: '/digitale-hulp/whatsapp-fotos-opslaan',    label: "Foto's opslaan via WhatsApp" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href}
                  className="flex items-center justify-between py-4 text-gray-800 font-semibold hover:text-primary transition-colors group"
                  style={{ fontSize: '1.25rem', minHeight: 'auto' }}>
                  {label}
                  <ChevronRight size={20} strokeWidth={2}
                    className="text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HANDIGE TOOLS
      ════════════════════════════════════════ */}
      <section style={{ background: '#F5EEE6' }} className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-bold text-gray-900" style={{ fontSize: '1.75rem' }}>
              Handige tools
            </h2>
            <Link href="/tools"
              className="flex items-center gap-1 font-semibold hover:underline"
              style={{ color: '#8B5E3C', fontSize: '1.1rem', minHeight: 'auto' }}>
              Alle tools <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/rekenmachine', Icon: Calculator,    title: 'Rekenmachine',       desc: 'Grote knoppen, helder scherm' },
              { href: '/kalender',     Icon: CalendarDays,  title: 'Verjaardagskalender', desc: 'Nooit meer een verjaardag vergeten' },
              { href: '/afvinken',     Icon: CheckSquare,   title: 'Afvinken',            desc: 'Simpele takenlijst' },
              { href: '/puzzels',      Icon: PuzzleIcon,    title: 'Dagelijkse puzzel',   desc: 'Elke dag een nieuwe uitdaging' },
            ].map(({ href, Icon, title, desc }) => (
              <Link key={href} href={href}
                className="group bg-white rounded-2xl p-6 flex flex-col items-start gap-3 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/20">
                <div className="rounded-xl p-2.5" style={{ background: 'rgba(139,94,60,0.08)' }}>
                  <Icon size={24} strokeWidth={1.75} style={{ color: '#8B5E3C' }} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 leading-snug mb-1" style={{ fontSize: '1.15rem' }}>{title}</p>
                  <p className="text-gray-500 leading-snug" style={{ fontSize: '1rem' }}>{desc}</p>
                </div>
                <span className="mt-auto text-sm font-semibold group-hover:underline" style={{ color: '#8B5E3C' }}>
                  Openen →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BIBLIOTHEEK + NIEUWSBRIEF + FACEBOOK
      ════════════════════════════════════════ */}
      <section className="bg-white py-16 border-t border-neutral-stone/40">
        <div className="max-w-5xl mx-auto px-6 space-y-8">

          {/* Bibliotheek */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl p-6 border border-neutral-stone/60 bg-neutral-50">
            <div className="rounded-xl p-3 flex-shrink-0" style={{ background: 'rgba(139,94,60,0.08)' }}>
              <BookOpen size={26} strokeWidth={1.75} style={{ color: '#8B5E3C' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 mb-1" style={{ fontSize: '1.2rem' }}>Mijn Bibliotheek</p>
              <p className="text-gray-500" style={{ fontSize: '1.05rem' }}>
                Altijd weten welke boeken u al heeft — gratis op de pc, als app op uw telefoon.
              </p>
            </div>
            <div className="flex-shrink-0">
              <GebruikMijnBibliotheekButton variant="small" />
            </div>
          </div>

          {/* Nieuwsbrief */}
          <NieuwsbriefBlok />

          {/* Facebook */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl p-6 bg-blue-50 border border-blue-100">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 mb-1" style={{ fontSize: '1.2rem' }}>
                Volg ons op Facebook
              </p>
              <p className="text-gray-500" style={{ fontSize: '1.05rem' }}>
                Tips, uitleg en antwoorden op vragen van andere senioren.
              </p>
            </div>
            <a href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 font-bold text-white rounded-xl px-5 py-3 hover:opacity-90 transition-opacity shadow-sm"
              style={{ background: '#1877F2', fontSize: '1.1rem' }}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.271h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
              Volg ons
            </a>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold mb-3" style={{ fontSize: '1.05rem' }}>Privacybeleid</p>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors block py-1" style={{ fontSize: '0.95rem' }}>
                Lees ons privacybeleid
              </Link>
            </div>
            <div>
              <p className="font-bold mb-3" style={{ fontSize: '1.05rem' }}>Hulp</p>
              <Link href="/hulp" className="text-gray-400 hover:text-white transition-colors block py-1" style={{ fontSize: '0.95rem' }}>Veelgestelde vragen</Link>
              <Link href="/digitale-hulp" className="text-gray-400 hover:text-white transition-colors block py-1" style={{ fontSize: '0.95rem' }}>Digitale hulp</Link>
            </div>
            <div>
              <p className="font-bold mb-3" style={{ fontSize: '1.05rem' }}>Contact</p>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors block py-1" style={{ fontSize: '0.95rem' }}>Neem contact op</Link>
              <Link href="/over-ons" className="text-gray-400 hover:text-white transition-colors block py-1" style={{ fontSize: '0.95rem' }}>Over ons</Link>
            </div>
            <div>
              <p className="font-bold mb-3" style={{ fontSize: '1.05rem' }}>Video&apos;s</p>
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors block py-1" style={{ fontSize: '0.95rem' }}>
                Bekijk op YouTube
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image src="/heart-logo.png" alt="SeniorEase" width={28} height={28} className="opacity-60" />
              <span className="text-gray-500" style={{ fontSize: '0.9rem' }}>SeniorEase.nl</span>
            </div>
            <p className="text-gray-600" style={{ fontSize: '0.9rem' }}>© 2025 · Handige technologie zonder gedoe</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
