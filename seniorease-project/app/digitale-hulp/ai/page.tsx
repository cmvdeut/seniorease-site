import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import CategoryHub from '@/app/components/CategoryHub';
import { buildCollectionPageSchema, buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/digitale-hulp/ai',
  title: 'AI uitleg',
  description:
    'Wat is AI, hoe gebruikt u ChatGPT en hoe kunt u AI veilig inzetten? Uitleg voor senioren.',
  keywords: ['AI senioren', 'ChatGPT', 'kunstmatige intelligentie'],
});

const artikelen = [
  { title: 'Wat is AI?', href: '/wat-is-ai' },
  { title: 'ChatGPT uitleg', href: '/wat-is-ai/chatgpt' },
  { title: 'AI gebruiken', href: '/wat-is-ai/uitproberen' },
];

const collectionSchema = buildCollectionPageSchema(
  'AI uitleg voor senioren',
  'Wat is AI, hoe gebruikt u ChatGPT en hoe kunt u AI veilig inzetten?',
  '/digitale-hulp/ai',
  artikelen.map((a) => ({ name: a.title, path: a.href })),
);

export default function AICategoriePage() {
  return (
    <>
      <JsonLd data={collectionSchema} />
      <CategoryHub
        title="AI & ChatGPT"
        description="Vragen stellen in gewone taal — met ChatGPT of gratis via Google. Simpel uitgelegd."
        intro="AI (kunstmatige intelligentie) en ChatGPT helpen u antwoorden te vinden in gewone taal. Via Google kan het ook gratis: na het zoeken tikt u links bovenaan op AI-modus. Handig voor inzichten — maar controleer belangrijke feiten altijd, want AI is niet voor 100% betrouwbaar."
        articles={artikelen}
        tip={
          <>
            Begin rustig met{' '}
            <Link href="/wat-is-ai" className="font-semibold text-gold hover:text-gold-light underline">
              Wat is AI?
            </Link>
            , of leer eerst{' '}
            <Link
              href="/digitale-hulp/googelen-google-zoeken"
              className="font-semibold text-gold hover:text-gold-light underline"
            >
              googelen
            </Link>{' '}
            (inclusief de knop AI-modus). Liever ChatGPT stap voor stap? Ga naar{' '}
            <Link
              href="/wat-is-ai/chatgpt"
              className="font-semibold text-gold hover:text-gold-light underline"
            >
              ChatGPT-uitleg
            </Link>
            .
          </>
        }
      />
    </>
  );
}
