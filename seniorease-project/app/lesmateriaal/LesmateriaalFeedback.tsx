'use client';

import { useId, useState } from 'react';
import SeniorButton from '@/app/components/SeniorButton';

type Variant = 'hub' | 'pakket';

type Props = {
  variant: Variant;
  pakketSlug?: string;
  pakketCode?: string;
  pakketTitle?: string;
  className?: string;
};

export function LesmateriaalFeedback({
  variant,
  pakketSlug,
  pakketCode,
  pakketTitle,
  className = '',
}: Props) {
  const formId = useId();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const isHub = variant === 'hub';
  const headingId = `${formId}-heading`;

  const title = isHub ? 'Mist u een onderwerp?' : 'Heeft u dit lespakket gebruikt?';
  const intro = isHub
    ? 'SeniorEase blijft het lesmateriaal uitbreiden. Heeft u een onderwerp waar uw deelnemers graag meer over willen leren? Of heeft u een idee waarmee we het bestaande lesmateriaal kunnen verbeteren? Ook een korte reactie over de prijs is welkom.'
    : 'We horen graag wat goed werkt, wat beter kan en welke onderwerpen u nog mist.';
  const hubExtra = isHub ? 'Uw ervaring en ideeën zijn van harte welkom.' : null;
  const formIntro =
    'Werkt u met ons lesmateriaal of heeft u een onderwerp dat u graag toegevoegd zou zien? Laat het ons weten. Ook een korte reactie is welkom.';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setFieldError('');

    const trimmed = message.trim();
    if (trimmed.length < 10) {
      setFieldError('Schrijf minstens een paar zinnen (minimaal 10 tekens).');
      return;
    }
    if (email.trim() && (!email.includes('@') || !email.includes('.'))) {
      setFieldError('Dit e-mailadres lijkt niet geldig.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lesmateriaal/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          message: trimmed,
          source: variant,
          pakketSlug,
          pakketCode,
          pakketTitle,
        }),
      });
      const data = await response.json().catch(() => null);
      if (response.ok && data?.success) {
        setDone(true);
        setName('');
        setEmail('');
        setMessage('');
        return;
      }
      setError(
        data?.error ||
          'Uw bericht kon niet worden verzonden. Probeer het opnieuw of mail naar info@seniorease.nl.'
      );
    } catch {
      setError(
        'Uw bericht kon niet worden verzonden. Probeer het opnieuw of mail naar info@seniorease.nl.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-navy/15 bg-paper text-navy text-senior-sm focus:outline-none focus:border-gold transition-colors';

  return (
    <section
      aria-labelledby={headingId}
      className={`rounded-senior border border-navy/8 bg-paper p-6 sm:p-8 ${className}`.trim()}
    >
      {done ? (
        <div>
          <h2
            id={headingId}
            className="font-serif text-navy text-[1.35rem] sm:text-[1.5rem] font-semibold mb-3"
          >
            Bedankt voor uw reactie!
          </h2>
          <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl">
            Uw idee helpt ons om SeniorEase beter te laten aansluiten bij wat deelnemers en
            begeleiders nodig hebben.
          </p>
        </div>
      ) : (
        <>
          <h2
            id={headingId}
            className={`font-serif text-navy font-semibold mb-3 ${
              isHub ? 'text-[1.5rem] sm:text-[1.75rem]' : 'text-[1.25rem] sm:text-[1.35rem]'
            }`}
          >
            {title}
          </h2>
          <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-3">
            {intro}
          </p>
          {hubExtra ? (
            <p className="text-navy/70 text-senior-base leading-relaxed max-w-2xl mb-6">
              {hubExtra}
            </p>
          ) : (
            <div className="mb-5" />
          )}

          {!open ? (
            <SeniorButton type="button" onClick={() => setOpen(true)} icon={false}>
              Geef uw idee of feedback
            </SeniorButton>
          ) : (
            <div className="mt-2 border-t border-navy/10 pt-6">
              <h3 className="font-serif text-navy text-[1.2rem] font-semibold mb-2">
                Uw idee helpt SeniorEase verder
              </h3>
              <p className="text-navy/65 text-senior-sm leading-relaxed max-w-2xl mb-6">
                {formIntro}
              </p>

              {error && (
                <div
                  className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-senior-sm text-red-800"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                  <label
                    htmlFor={`${formId}-message`}
                    className="block font-semibold text-navy text-senior-sm mb-1.5"
                  >
                    Uw idee of feedback <span className="text-gold">*</span>
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (fieldError) setFieldError('');
                    }}
                    className={inputClass}
                    placeholder="Bijvoorbeeld: een les over… of iets dat beter kan…"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-email`}
                    className="block font-semibold text-navy text-senior-sm mb-1.5"
                  >
                    E-mailadres <span className="text-navy/45 font-normal">(optioneel)</span>
                  </label>
                  <p className="text-navy/55 text-senior-xs mb-2">
                    Alleen nodig als we mogen terugmailen.
                  </p>
                  <input
                    type="email"
                    id={`${formId}-email`}
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldError) setFieldError('');
                    }}
                    className={inputClass}
                    placeholder="bijvoorbeeld@email.nl"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-name`}
                    className="block font-semibold text-navy text-senior-sm mb-1.5"
                  >
                    Naam <span className="text-navy/45 font-normal">(optioneel)</span>
                  </label>
                  <input
                    type="text"
                    id={`${formId}-name`}
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Bijvoorbeeld: Anne"
                    autoComplete="name"
                  />
                </div>

                {fieldError && (
                  <p className="text-senior-sm text-red-700" role="alert">
                    {fieldError}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 pt-1">
                  <SeniorButton type="submit" disabled={isSubmitting} icon={false}>
                    {isSubmitting ? 'Verzenden…' : 'Verstuur feedback'}
                  </SeniorButton>
                  <SeniorButton
                    type="button"
                    variant="secondary"
                    icon={false}
                    onClick={() => {
                      setOpen(false);
                      setError('');
                      setFieldError('');
                    }}
                  >
                    Annuleren
                  </SeniorButton>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </section>
  );
}
