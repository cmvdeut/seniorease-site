import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/terms',
  title: 'Terms of Service',
  description: 'Terms of Service for SeniorEase.',
  noIndex: true,
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
