'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Naam is verplicht';
    if (!formData.email.trim()) newErrors.email = 'E-mailadres is verplicht';
    else if (!formData.email.includes('@') || !formData.email.includes('.')) newErrors.email = 'Ongeldig e-mailadres';
    if (!formData.subject.trim()) newErrors.subject = 'Onderwerp is verplicht';
    if (!formData.message.trim()) newErrors.message = 'Bericht is verplicht';
    else if (formData.message.trim().length < 10) newErrors.message = 'Bericht moet minimaal 10 tekens bevatten';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-senior-base focus:outline-none focus:border-primary transition-colors ${
      errors[field] ? 'border-red-300 bg-red-50' : 'border-neutral-stone/60 bg-white'
    }`;

  return (
    <main className="min-h-screen bg-neutral-cream">
      <div className="max-w-3xl mx-auto px-6 py-10">

        <Link href="/" className="text-primary hover:underline font-medium mb-8 inline-block" style={{ fontSize: '1.1rem' }}>
          ← Terug naar home
        </Link>

        <h1 className="font-bold text-gray-900 mb-2 leading-tight" style={{ fontSize: '2.4rem', letterSpacing: '-0.01em' }}>
          Contact
        </h1>
        <p className="text-gray-500 mb-8" style={{ fontSize: '1.15rem' }}>
          Heeft u vragen, opmerkingen of hulp nodig? Wij helpen u graag.
        </p>

        {/* Success — formulier verdwijnt na verzenden */}
        {submitStatus === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 mb-6 text-center">
            <h2 className="font-bold text-green-800 mb-2" style={{ fontSize: '1.35rem' }}>
              Bericht verzonden
            </h2>
            <p className="text-green-700 mb-6" style={{ fontSize: '1.15rem' }}>
              Wij hebben uw bericht ontvangen en reageren zo spoedig mogelijk.
            </p>
            <button
              type="button"
              onClick={() => setSubmitStatus('idle')}
              className="font-semibold text-primary hover:underline"
              style={{ fontSize: '1.1rem' }}
            >
              Nog een bericht sturen
            </button>
          </div>
        ) : (
          <>
            {/* Error */}
            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-red-800 mb-1" style={{ fontSize: '1.2rem' }}>Er ging iets mis</h3>
                <p className="text-red-700" style={{ fontSize: '1.1rem' }}>
                  Uw bericht kon niet worden verzonden. Probeer het opnieuw of stuur een e-mail naar{' '}
                  <a href="mailto:info@seniorease.nl" className="underline">info@seniorease.nl</a>
                </p>
              </div>
            )}

            {/* Formulier */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8 mb-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block font-bold text-gray-800 mb-1 text-senior-base">
                    Uw naam <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                    className={inputClass('name')} placeholder="Bijvoorbeeld: Jan Jansen" />
                  {errors.name && <p className="mt-1 text-senior-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block font-bold text-gray-800 mb-1 text-senior-base">
                    Uw e-mailadres <span className="text-red-500">*</span>
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                    className={inputClass('email')} placeholder="bijvoorbeeld@email.nl" />
                  {errors.email && <p className="mt-1 text-senior-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block font-bold text-gray-800 mb-1 text-senior-base">
                    Onderwerp <span className="text-red-500">*</span>
                  </label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange}
                    className={inputClass('subject')}>
                    <option value="">Kies een onderwerp...</option>
                    <option value="algemeen">Algemene vraag</option>
                    <option value="technisch">Technische support</option>
                    <option value="licentie">Vraag over licentie</option>
                    <option value="bug">Bug melding</option>
                    <option value="suggestie">Suggestie</option>
                    <option value="anders">Anders</option>
                  </select>
                  {errors.subject && <p className="mt-1 text-senior-sm text-red-600">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block font-bold text-gray-800 mb-1 text-senior-base">
                    Uw bericht <span className="text-red-500">*</span>
                  </label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange}
                    rows={5} className={inputClass('message')} placeholder="Beschrijf uw vraag of opmerking..." />
                  {errors.message && <p className="mt-1 text-senior-sm text-red-600">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-bold text-white py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ background: '#8B5E3C', fontSize: '1.15rem' }}
                >
                  {isSubmitting ? 'Verzenden...' : 'Verstuur bericht'}
                </button>
              </form>
            </div>
          </>
        )}

        {/* Direct e-mail */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-6">
            <h2 className="font-bold text-gray-900 mb-2" style={{ fontSize: '1.2rem' }}>Algemene vragen</h2>
            <p className="text-gray-600 mb-4" style={{ fontSize: '1.05rem' }}>
              Voor vragen over de site, uitleg of licenties:
            </p>
            <a href="mailto:info@seniorease.nl" className="font-bold text-primary hover:underline" style={{ fontSize: '1.05rem' }}>
              info@seniorease.nl
            </a>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-6">
            <h2 className="font-bold text-gray-900 mb-2" style={{ fontSize: '1.2rem' }}>Technische support</h2>
            <p className="text-gray-600 mb-4" style={{ fontSize: '1.05rem' }}>
              Voor technische problemen of installatie hulp:
            </p>
            <a href="mailto:support@seniorease.nl" className="font-bold text-primary hover:underline" style={{ fontSize: '1.05rem' }}>
              support@seniorease.nl
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="rounded-xl p-6 border border-amber-200" style={{ background: '#FFFBF0' }}>
          <p className="font-bold text-gray-900 mb-2" style={{ fontSize: '1.1rem' }}>Wanneer reageren wij?</p>
          <ul className="space-y-1 text-gray-700" style={{ fontSize: '1.05rem' }}>
            <li>Wij streven ernaar binnen 1–2 werkdagen te reageren.</li>
            <li>Vermeld uw apparaattype en browser bij technische vragen.</li>
          </ul>
        </div>

      </div>
    </main>
  );
}
