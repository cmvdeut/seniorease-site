'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function TermsPage() {
  useEffect(() => {
    // Update document title
    document.title = 'Terms of Service – SeniorEase | SeniorEase';
  }, []);

  return (
    <main className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Terms of Service – SeniorEase
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              
              <p className="text-senior-sm text-gray-500 italic mb-6">
                Laatste update: {new Date().getFullYear()}
              </p>

              <p className="text-senior-base text-gray-700 mb-6">
                Welkom bij <strong>SeniorEase</strong>. Door onze website, app of diensten te gebruiken, ga je akkoord met deze voorwaarden. Lees ze daarom zorgvuldig door.
              </p>

              <h2 className="text-senior-xl font-bold text-primary mb-4 mt-8">
                1. Gebruik van onze diensten
              </h2>
              
              <p className="text-senior-base text-gray-700 mb-6">
                Onze diensten zijn bedoeld om gebruikers te ondersteunen met informatie, uitleg en hulpmiddelen gericht op senioren. Je stemt ermee in onze diensten niet te misbruiken, geen schade toe te brengen aan de website of systemen, en geen activiteiten te ondernemen die de werking ervan verstoren.
              </p>

              <h2 className="text-senior-xl font-bold text-primary mb-4 mt-8">
                2. Gegevens en privacy
              </h2>
              
              <p className="text-senior-base text-gray-700 mb-4">
                Wij gaan zorgvuldig om met jouw gegevens. Details over welke data we verzamelen en hoe we die verwerken, vind je in ons privacybeleid:
              </p>
              <p className="text-senior-base text-gray-700 mb-6">
                <Link href="/privacy" className="text-primary hover:underline">
                  https://seniorease.nl/privacy
                </Link>
              </p>

              <h2 className="text-senior-xl font-bold text-primary mb-4 mt-8">
                3. Geen professioneel advies
              </h2>
              
              <p className="text-senior-base text-gray-700 mb-6">
                SeniorEase biedt informatie ter ondersteuning, maar geen medisch, juridisch, financieel of ander professioneel advies. Gebruikers blijven zelf verantwoordelijk voor beslissingen die zij nemen op basis van onze content.
              </p>

              <h2 className="text-senior-xl font-bold text-primary mb-4 mt-8">
                4. Intellectueel eigendom
              </h2>
              
              <p className="text-senior-base text-gray-700 mb-6">
                Alle inhoud, waaronder teksten, afbeeldingen, video's, logo's en lay-out, is eigendom van SeniorEase. Het is niet toegestaan om deze inhoud te kopiëren, verspreiden of commercieel te gebruiken zonder schriftelijke toestemming.
              </p>

              <h2 className="text-senior-xl font-bold text-primary mb-4 mt-8">
                5. Gebruik van externe diensten
              </h2>
              
              <p className="text-senior-base text-gray-700 mb-6">
                Soms maken wij gebruik van externe platforms, zoals Facebook Login. Wanneer je via zulke platforms inlogt, ga je ook akkoord met hun voorwaarden. Wij ontvangen alleen gegevens waarvoor jij expliciet toestemming geeft.
              </p>

              <h2 className="text-senior-xl font-bold text-primary mb-4 mt-8">
                6. Aansprakelijkheid
              </h2>
              
              <p className="text-senior-base text-gray-700 mb-6">
                Hoewel wij ons best doen om onze diensten actueel, toegankelijk en veilig te houden, garanderen wij niet dat alles altijd foutloos werkt. SeniorEase is niet aansprakelijk voor schade die voortkomt uit het gebruik van onze website, app of diensten.
              </p>

              <h2 className="text-senior-xl font-bold text-primary mb-4 mt-8">
                7. Wijzigingen in deze voorwaarden
              </h2>
              
              <p className="text-senior-base text-gray-700 mb-6">
                Wij kunnen deze voorwaarden wijzigen wanneer dat nodig is. De meest recente versie is altijd te vinden op deze pagina.
              </p>

              <h2 className="text-senior-xl font-bold text-primary mb-4 mt-8">
                8. Contact
              </h2>
              
              <p className="text-senior-base text-gray-700 mb-4">
                Heb je vragen over deze voorwaarden? Neem gerust contact op via:
              </p>
              <p className="text-senior-base text-gray-700 mb-6">
                <a href="mailto:info@seniorease.nl" className="text-primary hover:underline">info@seniorease.nl</a>
              </p>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <p className="text-senior-sm text-gray-500">
                  &copy; {new Date().getFullYear()} SeniorEase. Alle rechten voorbehouden.
                </p>
              </div>

            </div>
          </div>

          {/* Terug Link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-block text-senior-base text-primary hover:underline"
            >
              ← Terug naar home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}



