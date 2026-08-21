import JsonLd from '@/app/components/JsonLd';
import { buildVideoObjectSchema } from '@/lib/seo';
import { YOUTUBE_VIDEOS, YOUTUBE_VIDEO_META } from '@/lib/youtube-videos';

type YoutubeVideoJsonLdProps = {
  videoKey: keyof typeof YOUTUBE_VIDEOS;
};

/** VideoObject JSON-LD for embedded YouTube guides. */
export default function YoutubeVideoJsonLd({ videoKey }: YoutubeVideoJsonLdProps) {
  const meta = YOUTUBE_VIDEO_META[videoKey];
  return (
    <JsonLd
      data={buildVideoObjectSchema({
        name: meta.name,
        description: meta.description,
        videoId: YOUTUBE_VIDEOS[videoKey],
        uploadDate: meta.uploadDate,
        path: meta.path,
      })}
    />
  );
}
