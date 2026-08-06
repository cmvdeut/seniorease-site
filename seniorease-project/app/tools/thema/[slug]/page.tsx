import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import JsonLd from '@/app/components/JsonLd';
import YoutubeHint from '@/app/components/YoutubeHint';
import { buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';
import { getYoutubeForPath } from '@/lib/youtube-videos';
import {
  TOOL_CATEGORIES,
  getToolCategory,
  getToolsByCategory,
  type ToolCategoryId,
} from '../../tools-data';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return TOOL_CATEGORIES.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = getToolCategory(slug);
  if (!category) return {};
  return buildPageMetadata({
    path: `/tools/thema/${category.id}`,
    title: `${category.titel} – handige tools`,
    description: `${category.omschrijving} Gemaakt voor senioren.`,
  });
}

export default async function ToolsThemaPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getToolCategory(slug);
  if (!category) notFound();

  const items = getToolsByCategory(category.id as ToolCategoryId);
  const schema = buildCollectionPageSchema(
    `${category.titel} – tools voor senioren`,
    category.omschrijving,
    `/tools/thema/${category.id}`,
    items.map((t) => ({ name: t.title, path: t.href })),
  );

  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={schema} />
      <div className="max-w-senior mx-auto px-5 sm:px-6 py-14 md:py-20">
        <Link
          href="/tools"
          className="text-gold hover:text-gold-light font-semibold mb-8 inline-flex text-senior-sm min-h-[44px] items-center"
        >
          ← Terug naar alle tools
        </Link>

        <h1 className="font-serif text-navy text-[1.85rem] sm:text-[2.35rem] font-semibold leading-tight mb-3">
          {category.titel}
        </h1>
        <p className="text-navy/70 text-senior-base mb-10 leading-relaxed max-w-2xl">
          {category.omschrijving}
        </p>

        <div className="bg-slate rounded-senior border border-navy/8 shadow-sm p-7 sm:p-9">
          <ul className="bg-paper rounded-senior border border-navy/8 divide-y divide-navy/10 overflow-hidden">
            {items.map((tool) => {
              const youtube = getYoutubeForPath(tool.href);
              return (
                <li key={tool.href}>
                  <div className="py-4 px-5">
                    <Link
                      href={tool.href}
                      className="flex items-center gap-4 text-senior-base font-semibold text-navy hover:text-gold transition-colors min-h-[48px] group"
                    >
                      {tool.brandIconUrl ? (
                        <Image
                          src={tool.brandIconUrl}
                          alt=""
                          width={36}
                          height={36}
                          className="object-contain shrink-0"
                        />
                      ) : (
                        <tool.Icon
                          size={28}
                          strokeWidth={1.75}
                          className="text-gold shrink-0"
                          aria-hidden
                        />
                      )}
                      <span className="flex-1">
                        <span className="block">{tool.title}</span>
                        <span className="block font-normal text-navy/60 text-senior-sm mt-0.5">
                          {tool.description}
                        </span>
                      </span>
                      <span
                        className="text-navy/30 group-hover:text-gold transition-colors"
                        aria-hidden
                      >
                        ›
                      </span>
                    </Link>
                    {youtube && (
                      <div className="mt-2 pl-12">
                        <YoutubeHint path={tool.href} />
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
