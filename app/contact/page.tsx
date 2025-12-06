'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Naam is verplicht';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mailadres is verplicht';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Ongeldig e-mailadres';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Onderwerp is verplicht';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Bericht is verplicht';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Bericht moet minimaal 10 tekens bevatten';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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
              Contact
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">✉️</div>
              <p className="text-senior-lg text-gray-700 mb-6">
                Heeft u vragen, opmerkingen of hulp nodig? Wij helpen u graag!
              </p>
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border-4 border-green-300 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-5xl mb-3">✅</div>
                  <h3 className="text-senior-lg font-bold text-green-800 mb-2">
                    Bericht verzonden!
                  </h3>
                  <p className="text-senior-base text-green-700">
                    Wij hebben uw bericht ontvangen en zullen zo spoedig mogelijk reageren.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="bg-red-50 border-4 border-red-300 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-5xl mb-3">❌</div>
                  <h3 className="text-senior-lg font-bold text-red-800 mb-2">
                    Er ging iets mis
                  </h3>
                  <p className="text-senior-base text-red-700">
                    Uw bericht kon niet worden verzonden. Probeer het opnieuw of stuur een e-mail naar info@seniorease.nl
                  </p>
                </div>
              </div>
            )}

            {/* Contact Formulier */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Naam */}
              <div>
                <label htmlFor="name" className="block text-senior-base font-bold text-gray-800 mb-2">
                  Uw naam <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-4 text-senior-base
                    ${errors.name ? 'border-red-300 bg-red-50' : 'border-neutral-stone bg-white'}
                    focus:border-primary focus:outline-none`}
                  placeholder="Bijvoorbeeld: Jan Jansen"
                />
                {errors.name && (
                  <p className="mt-2 text-senior-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-senior-base font-bold text-gray-800 mb-2">
                  Uw e-mailadres <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-4 text-senior-base
                    ${errors.email ? 'border-red-300 bg-red-50' : 'border-neutral-stone bg-white'}
                    focus:border-primary focus:outline-none`}
                  placeholder="bijvoorbeeld@email.nl"
                />
                {errors.email && (
                  <p className="mt-2 text-senior-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Onderwerp */}
              <div>
                <label htmlFor="subject" className="block text-senior-base font-bold text-gray-800 mb-2">
                  Onderwerp <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-4 text-senior-base
                    ${errors.subject ? 'border-red-300 bg-red-50' : 'border-neutral-stone bg-white'}
                    focus:border-primary focus:outline-none`}
                >
                  <option value="">Kies een onderwerp...</option>
                  <option value="algemeen">Algemene vraag</option>
                  <option value="technisch">Technische support</option>
                  <option value="licentie">Vraag over licentie</option>
                  <option value="bug">Bug melding</option>
                  <option value="suggestie">Suggestie</option>
                  <option value="anders">Anders</option>
                </select>
                {errors.subject && (
                  <p className="mt-2 text-senior-sm text-red-600">{errors.subject}</p>
                )}
              </div>

              {/* Bericht */}
              <div>
                <label htmlFor="message" className="block text-senior-base font-bold text-gray-800 mb-2">
                  Uw bericht <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-xl border-4 text-senior-base resize-y
                    ${errors.message ? 'border-red-300 bg-red-50' : 'border-neutral-stone bg-white'}
                    focus:border-primary focus:outline-none`}
                  placeholder="Beschrijf uw vraag of opmerking hier..."
                />
                {errors.message && (
                  <p className="mt-2 text-senior-sm text-red-600">{errors.message}</p>
                )}
                <p className="mt-2 text-senior-xs text-gray-500">
                  Minimaal 10 tekens
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-primary text-white px-8 py-4 rounded-xl text-senior-lg font-bold
                    ${isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl'}
                    transition-all`}
                >
                  {isSubmitting ? '⏳ Verzenden...' : '📧 Verstuur bericht'}
                </button>
              </div>
            </form>

            {/* Direct Email Opties (Alternatief) */}
            <div className="mb-8">
              <h2 className="text-senior-lg font-bold text-gray-800 mb-4 text-center">
                Of stuur direct een e-mail:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Algemene Vragen */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <div className="text-4xl mb-4">📧</div>
                <h2 className="text-senior-lg font-bold text-primary mb-3">
                  Algemene Vragen
                </h2>
                <p className="text-senior-base text-gray-700 mb-4">
                  Voor vragen over de app, licenties, of algemene informatie:
                </p>
                <a
                  href="mailto:info@seniorease.nl"
                  className="inline-block bg-primary text-white px-6 py-4 rounded-xl text-senior-base font-bold
                           hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
                >
                  info@seniorease.nl
                </a>
              </div>

              {/* Technische Support */}
              <div className="bg-neutral-cream rounded-xl p-6 border-2 border-gray-200">
                <div className="text-4xl mb-4">🛠️</div>
                <h2 className="text-senior-lg font-bold text-primary mb-3">
                  Technische Support
                </h2>
                <p className="text-senior-base text-gray-700 mb-4">
                  Voor technische problemen, bugs of installatie hulp:
                </p>
                <a
                  href="mailto:support@seniorease.nl"
                  className="inline-block bg-secondary text-white px-6 py-4 rounded-xl text-senior-base font-bold
                           hover:bg-secondary-dark transition-all shadow-lg hover:shadow-xl"
                >
                  support@seniorease.nl
                </a>
              </div>

              </div>
            </div>

            {/* Contact Informatie */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
              <h3 className="text-senior-base font-bold text-blue-900 mb-3">
                💡 Wanneer reageren wij?
              </h3>
              <ul className="text-senior-sm text-blue-800 space-y-2">
                <li>✓ Wij streven ernaar binnen 1-2 werkdagen te reageren</li>
                <li>✓ Voor dringende technische problemen proberen wij sneller te reageren</li>
                <li>✓ Vermeld in uw e-mail bij voorkeur uw apparaattype en browser</li>
              </ul>
            </div>

            {/* Veelgestelde Vragen Link */}
            <div className="text-center">
              <p className="text-senior-base text-gray-700 mb-4">
                Heeft u een snelle vraag? Bekijk eerst onze veelgestelde vragen:
              </p>
              <Link
                href="/hulp"
                className="inline-block bg-gray-600 text-white px-6 py-4 rounded-xl text-senior-base font-bold
                         hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl"
              >
                → Bekijk veelgestelde vragen
              </Link>
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