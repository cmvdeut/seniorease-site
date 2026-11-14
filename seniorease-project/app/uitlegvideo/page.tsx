import Link from 'next/link';
import YoutubeWatchCta from '@/app/components/YoutubeWatchCta';
import { buildPageMetadata } from '@/lib/seo';
import { YOUTUBE_CHANNEL_URL } from '@/lib/youtube-videos';

export const metadata = buildPageMetadata({
  path: '/uitlegvideo',
  title: "Uitlegvideo's op YouTube — SeniorEase",
  description:
    'Rustige SeniorEase-uitlegvideo’s op YouTube: WhatsApp, veiligheid, foto’s, Maps en meer. Stap voor stap, groot en duidelijk.',
  keywords: ['uitlegvideo', 'YouTube', 'SeniorEase', 'WhatsApp', 'senioren'],
});

const VOORBEELDEN = [
  { href: '/uitleg/whatsapp-basis', label: 'WhatsApp – eerste stappen' },
  { href: '/uitleg/veiligheid', label: 'Oplichting herkennen' },
  { href: '/uitleg/google-maps', label: 'Google Maps' },
  { href: '/uitleg/fotos-maken', label: "Betere foto's maken" },
  { href: '/uitleg/videobellen', label: 'Videobellen' },
] as const;

export default function UitlegvideoPage() {
  return (
    <main className="min-h-screen bg-cream">
      <header className="bg-cream border-b border-navy/10 py-6">
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light mb-4 text-senior-base"
            >
              ← Terug naar home
            </Link>
            <h1 className="font-serif text-[1.85rem] sm:text-[2.35rem] font-semibold text-navy leading-tight">
              Uitlegvideo&apos;s
            </h1>
            <p className="text-senior-base text-navy/70 mt-2">
              Rustige filmpjes van SeniorEase — op YouTube, in uw eigen tempo.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-4">
              Op ons YouTube-kanaal staan uitlegvideo&apos;s over WhatsApp, veiligheid, foto&apos;s,
              Maps en meer. Alles stap voor stap, met grote letters en een rustig tempo.
            </p>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed">
              Zoekt u in YouTube op <strong>SeniorEaseNL</strong>, dan vindt u ons.
            </p>
          </section>

          <YoutubeWatchCta
            title="Liever kijken dan lezen?"
            description="Open het SeniorEase-kanaal op YouTube. Daar ziet u alle uitlegvideo’s bij elkaar."
            href={YOUTUBE_CHANNEL_URL}
            linkLabel="Bekijk SeniorEase-video’s op YouTube"
          />

          <section className="bg-slate rounded-senior border border-navy/8 p-8 md:p-10">
            <h2 className="font-serif text-senior-lg font-semibold text-navy mb-4">
              Ook op de site nalezen
            </h2>
            <p className="text-senior-sm md:text-senior-base text-navy/80 leading-relaxed mb-6">
              Bij deze onderwerpen staat de video ook op de uitlegpagina — handig als u liever
              meeleest.
            </p>
            <ul className="space-y-3 m-0 pl-0 list-none">
              {VOORBEELDEN.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-senior-base font-semibold text-gold hover:text-gold-light"
                  >
                    {item.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
