import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';
import AIDemoChat from '../../components/AIDemoChat';

export const metadata = buildPageMetadata({
  path: '/wat-is-ai/uitproberen',
  title: 'AI uitproberen (Demo)',
  description:
    'Probeer een interactieve demo van een AI-assistent. Recept, brief, bijsluiter of gedicht — zie hoe AI u kan helpen.',
  keywords: ['AI demo', 'ChatGPT proberen', 'AI senioren'],
});

export default function UitproberenPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/wat-is-ai"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar Wat is AI?
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              AI uitproberen (Demo)
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Klik op een voorbeeld en zie hoe een AI-assistent reageert. Dit is een demo — bij de echte ChatGPT of Claude kunt u alles vragen!
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="AI Ontdekken subnavigatie">
              <Link href="/wat-is-ai" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Wat is AI?</Link>
              <span className="text-senior-sm font-bold text-primary underline">Uitproberen (Demo)</span>
              <Link href="/wat-is-ai/prompts" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Voorbeeldvragen</Link>
              <Link href="/wat-is-ai/zo-ziet-het-eruit" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Zo ziet het eruit</Link>
              <Link href="/wat-is-ai/chatgpt" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">ChatGPT stap voor stap</Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <AIDemoChat />

          <div className="mt-10 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8">
              <h2 className="text-senior-xl font-bold text-primary mb-4">
                Klaar om het echt te proberen?
              </h2>
              <p className="text-senior-base text-gray-700 mb-6">
                Ga naar <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">chatgpt.com</a> of <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">claude.ai</a>, maak een gratis account, en stel uw eigen vragen!
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-4 rounded-xl text-senior-base font-bold hover:bg-primary-dark transition-colors"
                >
                  ChatGPT openen →
                </a>
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-6 py-4 rounded-xl text-senior-base font-bold hover:bg-primary/10 transition-colors"
                >
                  Claude openen →
                </a>
              </div>
            </div>

            <p className="text-center">
              <Link
                href="/wat-is-ai/prompts"
                className="text-senior-base font-bold text-primary hover:text-primary-dark hover:underline"
              >
                Meer voorbeeldvragen bekijken →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
