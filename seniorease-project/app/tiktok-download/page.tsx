'use client';

import { useState } from 'react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function TikTokDownloadPage() {
  const [copied, setCopied] = useState(false);
  const downloadUrl = typeof window !== 'undefined' ? `${window.location.origin}/download` : 'https://www.seniorease.nl/download';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* TikTok Formaat Container (9:16 aspect ratio) */}
        <div 
          className="bg-white rounded-3xl shadow-2xl border-4 border-primary overflow-hidden"
          style={{
            aspectRatio: '9/16',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Content - flex-1 om ruimte te vullen */}
          <div className="p-5 pt-6 flex flex-col items-center justify-center flex-1 text-center">
            {/* Titel sectie */}
            <div className="mb-5">
              <h1 className="text-senior-lg font-bold text-primary mb-2">
                📲 Probeer SeniorEase GRATIS
              </h1>
              <p className="text-senior-base text-gray-700 font-semibold">
                Demo voor Android 📱
              </p>
            </div>

            {/* Features */}
            <div className="w-full space-y-2.5 mb-5">
              <div className="flex items-center justify-center gap-2 text-senior-sm text-gray-700">
                <span className="text-xl">✔️</span>
                <span>Scan boeken met barcode</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-senior-sm text-gray-700">
                <span className="text-xl">✔️</span>
                <span>Zoekfunctie</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-senior-sm text-gray-700">
                <span className="text-xl">✔️</span>
                <span>Max. 10 boeken opslaan</span>
              </div>
            </div>

            {/* Grote Download Knop */}
            <Link
              href={downloadUrl}
              className="w-full mb-3"
            >
              <div className="bg-primary hover:bg-primary-dark text-white rounded-2xl p-5 shadow-xl transform transition-all hover:scale-105 active:scale-95">
                <div className="text-senior-base font-bold mb-2">
                  👉 Download de demo nu
                </div>
                <div className="text-senior-sm font-bold opacity-95">
                  via de link in bio!
                </div>
              </div>
            </Link>
          </div>

          {/* Footer met QR code - flex-shrink-0 */}
          <div className="w-full p-3 bg-neutral-stone flex-shrink-0">
            <div className="bg-white rounded-xl p-2.5 mb-2.5">
              <p className="text-senior-xs text-gray-600 mb-1.5 text-center font-bold">Of scan de QR code:</p>
              <div className="flex justify-center">
                <QRCodeSVG
                  value={downloadUrl}
                  size={110}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full bg-white hover:bg-gray-50 text-primary border-2 border-primary rounded-xl p-2.5 text-senior-xs font-bold transition-all"
            >
              {copied ? '✅ Gekopieerd!' : '📋 Link in bio'}
            </button>
          </div>
        </div>

        {/* Desktop instructies */}
        <div className="mt-6 text-center text-senior-sm text-gray-600">
          <p className="mb-2">💡 <strong>Voor TikTok:</strong></p>
          <p>Maak een screenshot van deze pagina of gebruik de knop in je video!</p>
          <p className="mt-2 text-senior-xs">Link: <code className="bg-gray-200 px-2 py-1 rounded">{downloadUrl}</code></p>
        </div>
      </div>
    </div>
  );
}

