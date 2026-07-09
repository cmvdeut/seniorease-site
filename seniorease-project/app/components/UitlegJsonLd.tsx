import JsonLd from '@/app/components/JsonLd';
import { buildUitlegSchemas } from '@/lib/seo';
import { UITLEG_SCHEMA_DATA } from '@/lib/uitleg-schema-data';

type UitlegJsonLdProps = {
  slug: keyof typeof UITLEG_SCHEMA_DATA | string;
};

export default function UitlegJsonLd({ slug }: UitlegJsonLdProps) {
  const entry = UITLEG_SCHEMA_DATA[slug];
  if (!entry) return null;

  return <JsonLd data={buildUitlegSchemas(slug, entry)} />;
}
