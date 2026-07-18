import JsonLd from '@/app/components/JsonLd';
import { CLIENT_PAGE_METADATA, toolsCollectionSchema } from '@/lib/seo';

export const metadata = CLIENT_PAGE_METADATA.tools;

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={toolsCollectionSchema} />
      {children}
    </>
  );
}
