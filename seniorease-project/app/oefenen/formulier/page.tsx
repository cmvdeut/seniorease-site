'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OefenFormulierPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    preference: '',
    agree: false,
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = 'Dit veld is verplicht.';
    if (!formData.email.trim()) next.email = 'Dit veld is verplicht.';
    else if (!formData.email.includes('@') || !formData.email.includes('.'))
      next.email = 'Vul een geldig e-mailadres in (met @).';
    if (!formData.topic) next.topic = 'Kies een optie uit de lijst.';
    if (!formData.preference) next.preference = 'Kies één van de rondjes.';
    if (!formData.agree) next.agree = 'Zet een vinkje om verder te gaan.';
    if (!formData.message.trim()) next.message = 'Dit veld is verplicht.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const fieldClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-senior-base focus:outline-none focus:border-primary transition-colors ${
      errors[field] ? 'border-red-300 bg-red-50' : 'border-neutral-stone/60 bg-white'
    }`;

  return (
    <main className="min-h-screen bg-neutral-cream">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          href="/"
          className="text-primary hover:underline font-medium mb-8 inline-block"
          style={{ fontSize: '1.1rem' }}
        >
          ← Terug naar home
        </Link>

        <p className="font-semibold text-primary mb-2" style={{ fontSize: '1.05rem' }}>
          Oefenpagina · Lesmateriaal Pakket F
        </p>
        <h1
          className="font-bold text-gray-900 mb-2 leading-tight"
          style={{ fontSize: '2.2rem', letterSpacing: '-0.01em' }}
        >
          Oefenformulier
        </h1>
        <p className="text-gray-600 mb-6" style={{ fontSize: '1.15rem' }}>
          Oefen hier rustig een formulier invullen. U mag op Verzenden klikken — SeniorEase
          bewaart <strong>geen</strong> persoonsgegevens. Gebruik oefengegevens, bijvoorbeeld
          Jan en test@voorbeeld.nl.
        </p>

        <div
          className="rounded-xl p-5 mb-8 border border-amber-200"
          style={{ background: '#FFFBF0' }}
        >
          <p className="text-gray-800" style={{ fontSize: '1.05rem' }}>
            Velden met een rood sterretje (*) zijn verplicht. Krijgt u een foutmelding? Lees die,
            vul bij, en probeer opnieuw.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <h2 className="font-bold text-green-800 mb-2" style={{ fontSize: '1.35rem' }}>
              Oefening gelukt
            </h2>
            <p className="text-green-700 mb-6" style={{ fontSize: '1.15rem' }}>
              Uw oefeninvoer is niet opgeslagen. U mag het formulier zo vaak opnieuw oefenen.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  topic: '',
                  preference: '',
                  agree: false,
                  message: '',
                });
                setErrors({});
              }}
              className="font-semibold text-primary hover:underline"
              style={{ fontSize: '1.1rem' }}
            >
              Opnieuw oefenen
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block font-bold text-gray-800 mb-1 text-senior-base">
                  Naam (tekstveld) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldClass('name')}
                  placeholder="Bijvoorbeeld: Jan"
                  autoComplete="off"
                />
                {errors.name && <p className="mt-1 text-senior-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block font-bold text-gray-800 mb-1 text-senior-base">
                  E-mailadres (e-mailveld) <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldClass('email')}
                  placeholder="test@voorbeeld.nl"
                  autoComplete="off"
                />
                {errors.email && <p className="mt-1 text-senior-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="topic" className="block font-bold text-gray-800 mb-1 text-senior-base">
                  Onderwerp (keuzelijst) <span className="text-red-500">*</span>
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className={fieldClass('topic')}
                >
                  <option value="">Kies een onderwerp...</option>
                  <option value="oefening">Dit is een oefening</option>
                  <option value="vraag">Ik heb een vraag</option>
                  <option value="anders">Anders</option>
                </select>
                {errors.topic && <p className="mt-1 text-senior-sm text-red-600">{errors.topic}</p>}
              </div>

              <fieldset>
                <legend className="block font-bold text-gray-800 mb-2 text-senior-base">
                  Hoe oefent u vandaag? (keuzerondje) <span className="text-red-500">*</span>
                </legend>
                <div className="space-y-3">
                  {[
                    { value: 'computer', label: 'Op de computer' },
                    { value: 'tablet', label: 'Op een tablet' },
                    { value: 'telefoon', label: 'Op de telefoon' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 text-gray-800 cursor-pointer"
                      style={{ fontSize: '1.1rem' }}
                    >
                      <input
                        type="radio"
                        name="preference"
                        value={opt.value}
                        checked={formData.preference === opt.value}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                {errors.preference && (
                  <p className="mt-1 text-senior-sm text-red-600">{errors.preference}</p>
                )}
              </fieldset>

              <div>
                <label
                  className="flex items-start gap-3 text-gray-800 cursor-pointer"
                  style={{ fontSize: '1.1rem' }}
                >
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5"
                  />
                  <span>
                    Ik weet dat dit een oefening is (vinkvakje){' '}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.agree && <p className="mt-1 text-senior-sm text-red-600">{errors.agree}</p>}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-bold text-gray-800 mb-1 text-senior-base"
                >
                  Bericht (tekstveld) <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={fieldClass('message')}
                  placeholder="Dit is een oefening"
                />
                {errors.message && (
                  <p className="mt-1 text-senior-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full font-bold text-white py-4 rounded-xl hover:opacity-90 transition-opacity"
                style={{ background: '#8B5E3C', fontSize: '1.15rem' }}
              >
                Verzenden
              </button>
            </form>
          </div>
        )}

        <p className="mt-8 text-gray-500" style={{ fontSize: '1rem' }}>
          Dit is geen contactformulier. Voor echte vragen:{' '}
          <Link href="/contact" className="text-primary underline">
            seniorease.nl/contact
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
