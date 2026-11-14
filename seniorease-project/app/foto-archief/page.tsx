import FotoArchief from '../components/FotoArchief';
import YoutubeWatchCta from '@/app/components/YoutubeWatchCta';
import { buildPageMetadata } from '@/lib/seo';
import { YOUTUBE_VIDEOS, youtubeWatchUrl } from '@/lib/youtube-videos';

export const metadata = buildPageMetadata({
  path: '/foto-archief',
  title: "Foto Archief – familiefoto's labelen voor uw album",
  description:
    "Label personen op oude groepsfoto's met nummers en namen. Handig naast albums op uw telefoon — exporteer en deel met familie.",
  keywords: ['foto archief', 'familiefoto\'s', 'foto album senioren'],
});

export default function Page() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-senior mx-auto px-5 sm:px-6 pt-10 pb-4">
        <YoutubeWatchCta
          description="Korte video: wat Foto Archief doet — namen op groepsfoto’s, rustig uitgelegd."
          href={youtubeWatchUrl(YOUTUBE_VIDEOS.fotoArchief)}
          linkLabel="Bekijk de Foto Archief-video op YouTube"
        />
      </div>
      <FotoArchief />
    </main>
  );
}
