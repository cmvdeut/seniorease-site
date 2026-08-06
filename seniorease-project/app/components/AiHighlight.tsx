import { Sparkles } from 'lucide-react';
import YoutubeHint from '@/app/components/YoutubeHint';
import SeniorButton from './SeniorButton';

type AiHighlightProps = {
  /** Iets meer padding op homepage */
  spacious?: boolean;
};

/**
 * Prominente AI/ChatGPT-uitleg: nuttig, ook gratis via Google, niet blind vertrouwen.
 */
export default function AiHighlight({ spacious = false }: AiHighlightProps) {
  return (
    <section className={spacious ? 'bg-cream py-16 md:py-20' : 'bg-cream py-12 md:py-16'}>
      <div className="max-w-senior mx-auto px-5 sm:px-6">
        <div className="bg-slate rounded-senior border border-navy/8 p-7 sm:p-9 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-paper text-gold">
              <Sparkles size={28} strokeWidth={1.75} aria-hidden />
            </span>

            <div className="flex-1 min-w-0">
              <h2 className="font-serif text-navy text-[1.5rem] sm:text-[1.75rem] font-semibold mb-3 leading-tight">
                AI en ChatGPT — gewoon proberen
              </h2>
              <p className="text-navy/85 text-senior-sm leading-relaxed mb-4 max-w-2xl">
                Met AI (zoals ChatGPT) kunt u vragen stellen in gewone taal: een recept, een
                uitleg, een ideetje voor een brief. Handig om sneller inzicht te krijgen.
              </p>
              <p className="text-navy/85 text-senior-sm leading-relaxed mb-4 max-w-2xl">
                <strong className="text-navy font-semibold">Wist u dat?</strong> Als u googelt, ziet
                u links bovenaan vaak de knop <strong className="text-navy">AI-modus</strong>. Tik
                daarop en u kunt in gewone taal vragen stellen — gratis, via Google. Geen aparte
                app nodig.
              </p>
              <p className="text-navy/85 text-senior-sm leading-relaxed mb-6 max-w-2xl">
                Belangrijk: vertrouw AI niet voor 100%. Controleer belangrijke feiten (gezondheid,
                geld, overheidszaken). Gebruik het als hulp voor inzichten — niet als enige bron.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <SeniorButton href="/digitale-hulp/ai">AI-uitleg bekijken</SeniorButton>
                <SeniorButton
                  href="/digitale-hulp/googelen-google-zoeken"
                  variant="secondary"
                  icon={false}
                >
                  Eerst googelen leren
                </SeniorButton>
              </div>

              <div className="mt-5">
                <YoutubeHint path="/wat-is-ai" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
