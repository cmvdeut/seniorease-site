import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Over ons | SeniorEase',
  description: 'Wie zit er achter SeniorEase? Een senior die graag bijblijft met nieuwe technologie en anderen wil helpen hetzelfde te doen.',
};

export default function OverOnsPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <div className="max-w-3xl mx-auto px-6 py-10">

        <Link href="/" className="text-primary hover:underline font-medium mb-8 inline-block" style={{ minHeight: 'auto', fontSize: '1.1rem' }}>
          ← Terug naar home
        </Link>

        <h1 className="mb-8 leading-tight" style={{ fontSize: '2.4rem' }}>
          Over SeniorEase
        </h1>

        {/* Intro met foto */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8 mb-6">
          <div className="flex flex-col sm:flex-row gap-8 items-start mb-6">
            <div className="flex-shrink-0 w-full sm:w-56 relative">
              <div aria-hidden
                className="absolute -bottom-3 -right-3 w-full h-full bg-neutral-stone"
                style={{ borderRadius: '58% 42% 55% 45% / 48% 55% 45% 52%' }} />
              <Image
                src="/images/senior male.jpg"
                alt="Senior met smartphone"
                width={224}
                height={260}
                className="relative object-cover w-full shadow-md"
                style={{ borderRadius: '58% 42% 55% 45% / 48% 55% 45% 52%', height: '260px', objectPosition: '50% 25%' }}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/heart-logo.png" alt="SeniorEase logo" width={40} height={40} className="opacity-90" />
                <p className="text-gray-500 italic" style={{ fontSize: '1.1rem' }}>
                  Herkent u dat droevige gezichtje? Dat is expres zo.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1.15rem' }}>
                Als senior kan ik best treurig worden van alle nieuwe technologie. Vroeger was het
                overzichtelijk — een televisie, een telefoon aan de muur, een radio. Nu is er een smartphone,
                een tablet, een cloud, een app voor alles, en elke week iets nieuws.
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4" style={{ fontSize: '1.15rem' }}>
            Dat gevoel van "het gaat me allemaal te snel" — dat ken ik maar al te goed.
            Het droevige gezichtje in ons logo staat voor precies dat gevoel. Want ik begrijp het.
            Technologie hoort niet overweldigend te zijn.
          </p>
          <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1.15rem' }}>
            Ik ben gewoon een senior — iemand die nieuwsgierig is naar nieuwe technieken
            en er alles aan doet om bij te blijven, maar ook weet hoe lastig dat soms is.
            Precies daarom is SeniorEase er: zodat u niet alleen staat.
          </p>
        </div>

        {/* Waarom SeniorEase */}
        <div className="rounded-xl p-8 mb-6 border border-amber-200" style={{ background: '#FFFBF0' }}>
          <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '1.5rem' }}>
            Waarom SeniorEase?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4" style={{ fontSize: '1.15rem' }}>
            Ik merkte dat uitleg over technologie vaak te moeilijk is — te veel jargon, te snel,
            te weinig geduld voor wie het nog niet kent. Terwijl het helemaal niet ingewikkeld
            hoeft te zijn.
          </p>
          <p className="text-gray-700 leading-relaxed" style={{ fontSize: '1.15rem' }}>
            Dus begon ik het zelf op te schrijven. Rustig, stap voor stap, in gewone taal.
            Zo is SeniorEase ontstaan — een plek waar technologie simpel wordt uitgelegd,
            zonder gedoe.
          </p>
        </div>

        {/* Missie */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8 mb-6">
          <h2 className="font-bold text-gray-900 mb-5" style={{ fontSize: '1.5rem' }}>
            Wat wil SeniorEase bereiken?
          </h2>
          <ul className="space-y-3">
            {[
              'Technologie begrijpelijk maken voor iedereen',
              'Uitleg geven zonder ingewikkelde woorden',
              'Senioren helpen mee te doen in een digitale wereld',
              'Een vertrouwde plek zijn voor al uw technologievragen',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700" style={{ fontSize: '1.15rem' }}>
                <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: '#8B5E3C' }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8">
          <h2 className="font-bold text-gray-900 mb-3" style={{ fontSize: '1.5rem' }}>
            Vragen of suggesties?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6" style={{ fontSize: '1.15rem' }}>
            Heeft u een vraag, een suggestie of meer uitleg over een bepaald onderwerp? Ik hoor het graag!
          </p>
          <Link
            href="/contact"
            className="inline-block font-bold text-white py-3 px-6 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
            style={{ background: '#8B5E3C', fontSize: '1.15rem', minHeight: 'auto' }}
          >
            Neem contact op →
          </Link>
        </div>

      </div>
    </main>
  );
}
