import JsonLd from '@/app/components/JsonLd';
import { CLIENT_PAGE_METADATA, HULP_FAQ_SCHEMA } from '@/lib/seo';

export const metadata = CLIENT_PAGE_METADATA.hulp;

export default function HulpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={HULP_FAQ_SCHEMA} />
      {children}
    </>
  );
}
