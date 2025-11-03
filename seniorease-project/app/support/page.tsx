'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SupportPage() {
  const [email, setEmail] = useState('');
  const [licentieCode, setLicentieCode] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  // Genereer licentie code en download link voor klant
  function genereerLicentieCode() {
    if (!email.trim()) {
      alert('Vul een email adres in van de klant');
      return;
    }

    // Genereer unieke licentie code
    const code = `SUP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setLicentieCode(code);

    // Genereer directe download link met licentie code
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const activerLink = `${baseUrl}/activeer-licentie?code=${code}`;
    const downloadLink = `${baseUrl}/download`;
    
    setDownloadLink(`
      Stuur deze informatie naar de klant:
      
      Email: ${email}
      Licentie Code: ${code}
      
      Stap 1 - Activeer licentie:
      Ga naar: ${activerLink}
      (Of ga naar ${baseUrl}/activeer-licentie en voer code in: ${code})
      
      Stap 2 - Download APK:
      Na activering ga naar: ${downloadLink}
      
      Of directe link (werkt alleen na activering):
      ${downloadLink}
    `);

    // Kopieer naar clipboard als mogelijk
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Licentie Code: ${code}\n\nActiveer hier: ${activerLink}\n\nDownload hier: ${downloadLink}`
      );
    }
  }

  // Kopieer licentie code
  function kopieerLicentieCode() {
    if (licentieCode && navigator.clipboard) {
      navigator.clipboard.writeText(licentieCode);
      alert('Licentie code gekopieerd naar klembord!');
    }
  }

  // Kopieer volledige instructies
  function kopieerInstructies() {
    if (downloadLink && navigator.clipboard) {
      navigator.clipboard.writeText(downloadLink);
      alert('Instructies gekopieerd naar klembord!');
    }
  }

  return (
    <main className="min-h-screen bg-neutral-cream p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="text-6xl mb-6">👨‍💼</div>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary mb-4">
              Support - Licentie Activeren voor Klant
            </h1>
            <p className="text-senior-lg text-gray-700">
              Genereer een licentie code en download link voor een klant die er niet uitkomt
            </p>
          </div>

          {/* Formulier */}
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-senior-base font-bold text-gray-700 mb-2">
                Klant Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base focus:border-primary"
                placeholder="klant@voorbeeld.nl"
              />
              <p className="text-senior-xs text-gray-500 mt-2">
                Email adres van de klant die hulp nodig heeft
              </p>
            </div>

            {/* Genereer Knop */}
            <button
              onClick={genereerLicentieCode}
              className="w-full bg-primary text-white px-10 py-6 rounded-xl text-senior-lg font-bold
                       hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
            >
              🔑 Genereer Licentie Code & Download Link
            </button>

            {/* Resultaat */}
            {licentieCode && (
              <div className="space-y-4">
                {/* Licentie Code */}
                <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                  <h3 className="text-senior-base font-bold text-green-900 mb-3">
                    ✅ Licentie Code gegenereerd:
                  </h3>
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <p className="text-senior-lg font-mono font-bold text-green-700 break-all text-center">
                      {licentieCode}
                    </p>
                  </div>
                  <button
                    onClick={kopieerLicentieCode}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg text-senior-base font-bold
                             hover:bg-green-700 transition-all"
                  >
                    📋 Kopieer Licentie Code
                  </button>
                </div>

                {/* Activer Link */}
                <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                  <h3 className="text-senior-base font-bold text-blue-900 mb-3">
                    🔗 Directe Activer Link:
                  </h3>
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <p className="text-senior-sm font-mono text-blue-700 break-all text-center">
                      {typeof window !== 'undefined' ? `${window.location.origin}/activeer-licentie?code=${licentieCode}` : ''}
                    </p>
                  </div>
                  <p className="text-senior-xs text-blue-800 mb-3">
                    Stuur deze link naar de klant. Ze kunnen erop klikken om direct hun licentie te activeren.
                  </p>
                </div>

                {/* Instructies */}
                {downloadLink && (
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                    <h3 className="text-senior-base font-bold text-yellow-900 mb-3">
                      📝 Instructies voor Klant:
                    </h3>
                    <div className="bg-white rounded-lg p-4 mb-3">
                      <pre className="text-senior-xs text-gray-800 whitespace-pre-wrap font-sans">
                        {downloadLink}
                      </pre>
                    </div>
                    <button
                      onClick={kopieerInstructies}
                      className="w-full bg-yellow-600 text-white px-6 py-3 rounded-lg text-senior-base font-bold
                               hover:bg-yellow-700 transition-all"
                    >
                      📋 Kopieer Alle Instructies
                    </button>
                  </div>
                )}

                {/* Email Template */}
                <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6">
                  <h3 className="text-senior-base font-bold text-purple-900 mb-3">
                    📧 Email Template:
                  </h3>
                  <div className="bg-white rounded-lg p-4 mb-3 text-left">
                    <p className="text-senior-xs text-gray-800 mb-2">
                      <strong>Onderwerp:</strong> Uw Seniorease Licentie Code
                    </p>
                    <div className="text-senior-xs text-gray-700 space-y-2">
                      <p>Beste klant,</p>
                      <p>U heeft een licentie code aangevraagd. Hier is uw code:</p>
                      <p className="font-mono font-bold text-center py-2 bg-gray-100 rounded">
                        {licentieCode}
                      </p>
                      <p>
                        <strong>Stap 1:</strong> Activeer uw licentie door op deze link te klikken:<br/>
                        <a href={`${typeof window !== 'undefined' ? window.location.origin : ''}/activeer-licentie?code=${licentieCode}`} className="text-blue-600 underline">
                          Activeer licentie
                        </a>
                      </p>
                      <p>
                        <strong>Stap 2:</strong> Download de app via deze link:<br/>
                        <a href={`${typeof window !== 'undefined' ? window.location.origin : ''}/download`} className="text-blue-600 underline">
                          Download app
                        </a>
                      </p>
                      <p>Met vriendelijke groet,<br/>Seniorease Support</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Info */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
              <p className="text-senior-sm text-blue-900 font-bold mb-2">
                💡 Hoe werkt dit?
              </p>
              <ol className="text-senior-xs text-blue-800 text-left space-y-1 ml-4 list-decimal">
                <li>Vul het email adres van de klant in</li>
                <li>Klik op "Genereer Licentie Code"</li>
                <li>Stuur de licentie code en instructies naar de klant</li>
                <li>Klant activeert licentie op /activeer-licentie</li>
                <li>Klant downloadt APK op /download</li>
              </ol>
            </div>

            {/* Terug Link */}
            <div className="text-center">
              <Link
                href="/"
                className="text-senior-base text-primary hover:underline"
              >
                ← Terug naar home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

