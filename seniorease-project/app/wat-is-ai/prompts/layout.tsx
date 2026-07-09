import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/wat-is-ai/prompts',
  title: 'ChatGPT prompts voor senioren — voorbeelden en tips',
  description:
    'Handige voorbeelden van prompts voor ChatGPT. Wat kunt u vragen aan AI? Rustige uitleg en kant-en-klare zinnen voor senioren.',
  keywords: ['ChatGPT prompts', 'AI senioren', 'voorbeelden ChatGPT'],
});

export default function PromptsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
