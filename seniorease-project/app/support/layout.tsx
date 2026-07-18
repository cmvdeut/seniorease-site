import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/support',
  title: 'Support',
  description: 'Interne supportpagina voor SeniorEase.',
  noIndex: true,
});

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
