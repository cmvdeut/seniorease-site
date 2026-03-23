import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Over ons | SeniorEase',
  description: 'Wie zit er achter SeniorEase? Een senior die graag bijblijft met nieuwe technologie en anderen wil helpen hetzelfde te doen.',
};

export default function OverOnsPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      <div className="container mx-auto px-6 py-12 max-w-3xl">

        {/* Terug naar home */}
        <a href="/" className="text-primary hover:underline text-senior-sm mb-8 inline-block">
          ← Terug naar home
        </a>

        {/* Titel */}
        <h1 className="text-senior-2xl font-bold text-gray-800 mb-6">
          Over SeniorEase
        </h1>

        {/* Intro */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-4 mb-6">
            <img src="/heart-logo.png" alt="SeniorEase logo" className="w-16 h-16" />
            <p className="text-senior-base text-gray-500 italic">
              Herkent u dat droevige gezichtje? Dat is expres zo.
            </p>
          </div>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
            Als senior kun je soms best treurig worden van alle nieuwe technologie. Vroeger was het
            overzichtelijk — een televisie, een telefoon aan de muur, een radio. Nu is er een smartphone,
            een tablet, een cloud, een app voor alles, en elke week iets nieuws.
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
            Dat gevoel van "het gaat me allemaal te snel" — dat kennen wij maar al te goed.
            Het droevige gezichtje in ons logo staat voor precies dat gevoel. Want we begrijpen het.
            Technologie hoort niet overweldigend te zijn.
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            Achter SeniorEase zit een gewone senior — iemand die nieuwsgierig is naar nieuwe technieken
            en er alles aan doet om bij te blijven, maar ook weet hoe lastig dat soms is.
            Precies daarom is SeniorEase er: zodat u niet alleen staat.
          </p>
        </div>

        {/* Waarom SeniorEase */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-8">
          <h2 className="text-senior-xl font-bold text-gray-800 mb-4">
            Waarom SeniorEase?
          </h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Ik merkte dat uitleg over technologie vaak te moeilijk is — te veel jargon, te snel,
            te weinig geduld voor wie het nog niet kent. Terwijl het helemaal niet ingewikkeld
            hoeft te zijn.
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            Dus begon ik het zelf op te schrijven. Rustig, stap voor stap, in gewone taal.
            Zo is SeniorEase ontstaan — een plek waar technologie simpel wordt uitgelegd,
            zonder gedoe.
          </p>
        </div>

        {/* Missie */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-senior-xl font-bold text-gray-800 mb-4">
            Wat wilt SeniorEase bereiken?
          </h2>
          <ul className="space-y-3">
            {[
              'Technologie begrijpelijk maken voor iedereen',
              'Uitleg geven zonder ingewikkelde woorden',
              'Senioren helpen mee te doen in een digitale wereld',
              'Een vertrouwde plek zijn voor al uw technologievragen',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-senior-base text-gray-700">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-senior-xl font-bold text-gray-800 mb-4">
            Vragen of suggesties?
          </h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Heeft u een vraag, een suggestie of een onderwerp waarover u meer uitleg wilt?
            Ik hoor het graag!
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-white font-bold py-3 px-6 rounded-xl text-senior-base hover:opacity-90 transition-opacity"
          >
            Neem contact op →
          </a>
        </div>

      </div>
    </main>
  );
}
