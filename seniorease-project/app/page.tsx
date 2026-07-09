import Link from 'next/link';
import Image from 'next/image';
import {
  Smartphone, Monitor, Globe, ShieldCheck, Bot,
  Calculator, CheckSquare, CalendarDays, PuzzleIcon,
  BookOpen, ChevronRight, ArrowRight, Heart, RotateCcw, Clock3,
} from 'lucide-react';
import GebruikMijnBibliotheekButton from './components/GebruikMijnBibliotheekButton';
import NieuwsbriefBlok from './components/NieuwsbriefBlok';
import JsonLd from './components/JsonLd';
import { webApplicationSchema } from '@/lib/seo';

const FACEBOOK_PAGE_URL = 'https://www.facebook.com/SeniorEaseNL';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: '#F5EEE6' }}>
      <JsonLd data={webApplicationSchema} />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#F5EEE6' }}>
        {/* Foto rechts als zachte achtergrond, vloeiend overlopend in de crème kleur */}
        <div aria-hidden className="absolute top-0 right-0 hidden lg:block" style={{ width: '58%', height: '85%', opacity: 0.85 }}>
          <Image
            src="/images/senior-vrouw-laptop.png"
            alt="Senior die rustig aan een laptop werkt — digitale hulp voor senioren"
            fill
            className="object-cover"
            style={{
              objectPosition: '65% 25%',
              maskImage: 'linear-gradient(90deg, transparent 0%, black 55%), linear-gradient(0deg, transparent 0%, black 20%, black 85%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 55%), linear-gradient(0deg, transparent 0%, black 20%, black 85%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
            }}
            priority
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <div className="max-w-xl">
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

            <h1 className="mb-5 leading-tight" style={{ fontSize: '3rem' }}>
              Digitale hulp voor senioren
            </h1>
            <p className="text-gray-700 mb-10"
               style={{ fontSize: '1.3rem', lineHeight: 1.65, maxWidth: '480px' }}>
              Stap voor stap uitleg over smartphone, computer en internet — in uw eigen tempo.
            </p>

              {/* Eén duidelijke hoofdknop */}
              <div className="mb-8">
                <Link href="/uitleg"
                  className="inline-flex items-center gap-2.5 font-semibold text-white rounded-xl px-8 py-4 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 bg-primary"
                  style={{ fontSize: '1.25rem' }}>
                  Bekijk alle uitleg
                  <ArrowRight size={22} strokeWidth={2} />
                </Link>
              </div>

              {/* Categorieën als rustige chips */}
              <div className="flex flex-wrap gap-3">
                {[
                  { href: '/digitale-hulp/ai',              Icon: Bot,         label: 'AI uitleg' },
                  { href: '/digitale-hulp/smartphone',      Icon: Smartphone,  label: 'Smartphone' },
                  { href: '/digitale-hulp/computer',        Icon: Monitor,     label: 'Computer' },
                  { href: '/digitale-hulp/internet-email',  Icon: Globe,       label: 'Internet & e-mail' },
                  { href: '/digitale-hulp/veilig-internet', Icon: ShieldCheck, label: 'Veilig internet' },
                ].map(({ href, Icon, label }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-2 font-semibold rounded-xl px-4 py-2.5 bg-white border border-neutral-stone text-gray-700 hover:border-primary hover:text-primary transition-colors"
                    style={{ fontSize: '1.1rem' }}>
                    <Icon size={19} strokeWidth={1.75} className="text-primary" />
                    {label}
                  </Link>
                ))}
              </div>
          </div>

          {/* Mobiel: foto onder de tekst, zachte ronde vorm */}
          <div className="mt-12 lg:hidden">
            <Image
              src="/images/senior-vrouw-laptop.png"
              alt="Senior vrouw gebruikt laptop thuis"
              width={640}
              height={360}
              className="w-full object-cover rounded-3xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          GERUSTSTELLING
      ════════════════════════════════════════ */}
      <section className="bg-white py-14 border-t border-neutral-stone/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { Icon: Heart,      title: 'U kunt niets kapotmaken', desc: 'Echt niet. Uitproberen kan altijd veilig.' },
              { Icon: RotateCcw,  title: 'Fouten maken mag',        desc: 'Zo leert iedereen — ook wij deden dat.' },
              { Icon: Clock3,     title: 'In uw eigen tempo',       desc: 'Geen haast. Stap voor stap, zo vaak als u wilt.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3">
                <div className="rounded-full p-3.5 bg-primary-soft">
                  <Icon size={26} strokeWidth={1.75} className="text-primary" />
                </div>
                <p className="font-semibold text-gray-900" style={{ fontSize: '1.2rem' }}>{title}</p>
                <p className="text-gray-500" style={{ fontSize: '1.05rem' }}>{desc}</p>
              </div>
            ))}
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
                placeholder="bijv. Google, WhatsApp, wifi, ChatGPT…"
                className="flex-1 rounded-xl border border-neutral-stone focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white text-gray-800 placeholder-gray-400 transition-colors shadow-sm"
                style={{ fontSize: '1.2rem', padding: '0.9rem 1.25rem' }}
              />
              <button type="submit"
                className="font-bold text-white rounded-xl shadow-sm hover:opacity-90 transition-opacity px-6 bg-primary"
                style={{ fontSize: '1.2rem', minHeight: 'auto' }}>
                Zoeken
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ════════════════════════════════════════
          POPULAIRE ONDERWERPEN
      ════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 style={{ fontSize: '1.9rem' }}>
              Meest bekeken uitleg
            </h2>
            <Link href="/uitleg"
              className="flex items-center gap-1 font-semibold hover:underline"
              style={{ color: '#8B5E3C', fontSize: '1.1rem', minHeight: 'auto' }}>
              Alle uitleg <ArrowRight size={16} />
            </Link>
          </div>

          <ul className="divide-y divide-neutral-stone/40">
            {[
              { href: '/digitale-hulp/googelen-google-zoeken', label: 'Googelen — zo zoekt u op Google' },
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
      <section style={{ background: '#F5EEE6' }} className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 style={{ fontSize: '1.9rem' }}>
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
                className="group bg-white rounded-2xl p-7 flex flex-col items-start gap-3 shadow-sm hover:shadow-md transition-all">
                <div className="rounded-xl p-2.5 bg-primary-soft">
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
          MOGELIJKE VRAGEN
      ════════════════════════════════════════ */}
      <section style={{ background: '#F5EEE6' }} className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-center mb-10" style={{ fontSize: '1.9rem' }}>
            Mogelijke vragen
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Ik ben niet zo handig met een computer, kan ik dit wel?',
                a: 'Ja. Alle uitleg is geschreven voor mensen die nog nooit met een onderwerp hebben gewerkt. Stap voor stap, zonder moeilijke woorden.',
              },
              {
                q: 'Kan ik iets fout doen?',
                a: 'Nee, u kunt niets kapotmaken door te klikken of te proberen. Twijfelt u toch? Sluit de app of pagina gewoon en begin opnieuw.',
              },
              {
                q: 'Moet ik alles in één keer snappen?',
                a: 'Nee. U kunt een uitleg zo vaak lezen als u wilt, en op elk moment stoppen en later verdergaan.',
              },
              {
                q: 'Kost het gebruik van SeniorEase geld?',
                a: 'De uitleg en de meeste tools zijn gratis. Bij een enkele tool staat duidelijk vermeld als er kosten aan verbonden zijn.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="font-semibold text-gray-900 mb-2" style={{ fontSize: '1.15rem' }}>{q}</p>
                <p className="text-gray-600 leading-relaxed" style={{ fontSize: '1.05rem' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BIBLIOTHEEK + NIEUWSBRIEF + FACEBOOK
      ════════════════════════════════════════ */}
      <section className="bg-white py-20 border-t border-neutral-stone/40">
        <div className="max-w-5xl mx-auto px-6 space-y-8">

          {/* Bibliotheek */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl p-6 border border-neutral-stone/60 bg-neutral-50">
            <div className="rounded-xl p-3 flex-shrink-0 bg-primary-soft">
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl p-6 bg-neutral-50 border border-neutral-stone/60">
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

    </main>
  );
}
