import { Mail } from 'lucide-react';

export default function NieuwsbriefBlok() {
  return (
    <section id="nieuwsbrief" className="bg-amber-50 border border-amber-200 rounded-2xl p-8 my-8 mx-auto max-w-2xl text-center scroll-mt-24">
      <div className="inline-flex rounded-xl p-2.5 bg-primary-soft mb-3">
        <Mail size={26} strokeWidth={1.75} className="text-primary" />
      </div>
      <h2 className="text-2xl mb-2">
        Ontvang elke week een digitale tip
      </h2>
      <p className="text-gray-600 mb-6">
        Gratis. Geen spam. Altijd opzegbaar.
      </p>
      <div className="ml-embedded" data-form="2LZinn" suppressHydrationWarning />
    </section>
  );
}
