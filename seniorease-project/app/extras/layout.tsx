import { CLIENT_PAGE_METADATA } from '@/lib/seo';

export const metadata = CLIENT_PAGE_METADATA.extras;

export default function ExtrasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
