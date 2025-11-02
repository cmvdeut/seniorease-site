'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TestStripePage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [email, setEmail] = useState('test@example.com');

  const addResult = (test: string, passed: boolean) => {
    setTestResults(prev => [...prev, `${passed ? '✅' : '❌'} ${test}`]);
  };

  const runTests = () => {
    setTestResults([]);
    
    // Test 1: SessionStorage functionaliteit
    try {
      sessionStorage.setItem('seniorease-payment-email', email);
      const retrieved = sessionStorage.getItem('seniorease-payment-email');
      addResult('SessionStorage opslag', retrieved === email);
    } catch (e) {
      addResult('SessionStorage opslag', false);
    }

    // Test 2: LocalStorage functionaliteit
    try {
      const testLicense = {
        code: 'TEST-123',
        email: email,
        date: new Date().toISOString(),
        valid: true
      };
      localStorage.setItem('seniorease-licentie', JSON.stringify(testLicense));
      const retrieved = localStorage.getItem('seniorease-licentie');
      const parsed = JSON.parse(retrieved || '{}');
      addResult('LocalStorage licentie opslag', parsed.code === 'TEST-123');
    } catch (e) {
      addResult('LocalStorage licentie opslag', false);
    }

    // Test 3: Stripe URL constructie
    try {
      const stripeUrl = new URL('https://buy.stripe.com/cNi3co3yC45O70b4NM6c000');
      stripeUrl.searchParams.set('client_reference_id', email);
      const urlString = stripeUrl.toString();
      addResult('Stripe URL constructie', urlString.includes(email));
    } catch (e) {
      addResult('Stripe URL constructie', false);
    }

    // Test 4: Check of success pagina bestaat
    fetch('/betalen/success')
      .then(res => {
        addResult('Success pagina bereikbaar', res.ok);
      })
      .catch(() => {
        addResult('Success pagina bereikbaar', false);
      });
  };

  useEffect(() => {
    // Auto-run tests bij mount
    runTests();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-cream p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8">
          <h1 className="text-senior-2xl font-bold text-primary mb-6">
            🧪 Stripe Configuratie Test
          </h1>

          <div className="space-y-6">
            {/* Test Email Input */}
            <div>
              <label className="block text-senior-base font-bold text-gray-700 mb-2">
                Test Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base focus:border-primary"
              />
            </div>

            {/* Test Results */}
            <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
              <h2 className="text-senior-lg font-bold text-gray-800 mb-4">
                Test Resultaten:
              </h2>
              <div className="space-y-2">
                {testResults.length === 0 ? (
                  <p className="text-senior-sm text-gray-500">Tests worden uitgevoerd...</p>
                ) : (
                  testResults.map((result, index) => (
                    <div key={index} className="text-senior-sm font-mono">
                      {result}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={runTests}
                className="bg-primary text-white px-6 py-4 rounded-xl text-senior-base font-bold hover:bg-primary-dark transition-all"
              >
                🔄 Herhaal Tests
              </button>
              
              <Link
                href="/betalen"
                className="block bg-secondary text-white px-6 py-4 rounded-xl text-senior-base font-bold hover:bg-secondary-dark transition-all text-center"
              >
                → Naar Betalingspagina
              </Link>

              <Link
                href="/betalen/success"
                className="block bg-green-600 text-white px-6 py-4 rounded-xl text-senior-base font-bold hover:bg-green-700 transition-all text-center"
              >
                → Test Success Pagina
              </Link>

              <Link
                href="/bibliotheek"
                className="block bg-gray-600 text-white px-6 py-4 rounded-xl text-senior-base font-bold hover:bg-gray-700 transition-all text-center"
              >
                → Test Bibliotheek
              </Link>
            </div>

            {/* Stripe Configuratie Info */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mt-6">
              <h3 className="text-senior-base font-bold text-yellow-900 mb-2">
                ⚠️ Belangrijk: Stripe Dashboard Configuratie
              </h3>
              <ol className="text-senior-sm text-yellow-800 space-y-2 list-decimal list-inside">
                <li>Ga naar Stripe Dashboard → Products → Payment Links</li>
                <li>Klik op je Payment Link (cNi3co3yC45O70b4NM6c000)</li>
                <li>Settings → After payment → Success page URL</li>
                <li>Stel in: <code className="bg-yellow-100 px-2 py-1 rounded">https://jouw-vercel-url.vercel.app/betalen/success</code></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

