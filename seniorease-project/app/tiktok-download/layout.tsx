import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/tiktok-download',
  title: 'Download via TikTok',
  description: 'Downloadlink voor Mijn Bibliotheek.',
  noIndex: true,
});

export default function TikTokDownloadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
