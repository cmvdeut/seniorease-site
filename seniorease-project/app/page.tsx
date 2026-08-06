import JsonLd from './components/JsonLd';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import TopicsSection from './components/TopicsSection';
import AiHighlight from './components/AiHighlight';
import FAQAccordion from './components/FAQAccordion';
import {
  buildPageMetadata,
  DEFAULT_DESCRIPTION,
  webApplicationSchema,
} from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/',
  title: 'SeniorEase – Digitale hulp voor senioren',
  description: DEFAULT_DESCRIPTION,
  absoluteTitle: true,
  keywords: [
    'digitale hulp senioren',
    'technologie voor ouderen',
    'WhatsApp uitleg',
    'DigiD uitleg',
    'gratis tools senioren',
    'ChatGPT senioren',
    'AI voor senioren',
  ],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={webApplicationSchema} />
      <Hero />
      <TrustStrip />
      <TopicsSection />
      <AiHighlight spacious />
      <FAQAccordion />
    </main>
  );
}
