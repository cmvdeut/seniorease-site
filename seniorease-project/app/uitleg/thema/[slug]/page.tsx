import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/app/components/JsonLd';
import YoutubeHint from '@/app/components/YoutubeHint';
import { buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';
import { getYoutubeForPath } from '@/lib/youtube-videos';
import { getUitlegCluster, UITLEG_CLUSTERS } from '../../clusters';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return UITLEG_CLUSTERS.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const cluster = getUitlegCluster(slug);
  if (!cluster) return {};
  return buildPageMetadata({
    path: `/uitleg/thema/${cluster.id}`,
    title: `${cluster.titel} – uitleg`,
    description: `${cluster.omschrijving} Stap-voor-stap uitleg voor senioren.`,
  });
}

export default async function UitlegThemaPage({ params }: PageProps) {
  const { slug } = await params;
  const cluster = getUitlegCluster(slug);
  if (!cluster) notFound();

  const schema = buildCollectionPageSchema(
    `${cluster.titel} – uitleg voor senioren`,
    cluster.omschrijving,
    `/uitleg/thema/${cluster.id}`,
    cluster.paginas.map((p) => ({ name: p.label, path: p.href })),
  );

  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={schema} />
      <div className="max-w-senior mx-auto px-5 sm:px-6 py-14 md:py-20">
        <Link
          href="/uitleg"
          className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
        >
          ← Terug naar alle uitleg
        </Link>

        <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] font-semibold leading-tight mb-3">
          {cluster.titel}
        </h1>
        <p className="text-navy/70 text-senior-base mb-10 leading-relaxed max-w-2xl">
          {cluster.omschrijving}
        </p>

        <div className="bg-slate rounded-senior border border-navy/8 shadow-sm p-7 sm:p-9">
          <ul className="bg-paper rounded-senior border border-navy/8 divide-y divide-navy/10 overflow-hidden">
            {cluster.paginas.map((p) => {
              const youtube = getYoutubeForPath(p.href);
              return (
                <li key={p.href}>
                  <div className="py-4 px-5">
                    <Link
                      href={p.href}
                      className="flex items-center justify-between text-senior-base font-semibold text-navy hover:text-gold transition-colors min-h-[48px] group"
                    >
                      {p.label}
                      <span
                        className="text-navy/30 group-hover:text-gold transition-colors"
                        aria-hidden
                      >
                        ›
                      </span>
                    </Link>
                    {youtube && (
                      <div className="mt-2">
                        <YoutubeHint path={p.href} />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
