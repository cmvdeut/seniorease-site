'use client';

import { createContext, useContext, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, CreditCard, Mail } from 'lucide-react';
import { formatPrijs } from '@/app/lesmateriaal/lesmateriaal-data';
import {
  CHATGPT_ACHT_LOS_TOTAAL,
  CHATGPT_COMPLEET_PRIJS,
  CHATGPT_COMPLEET_REFERENCE,
  CHATGPT_EEN_PRIJS,
  CHATGPT_LESSONS,
  CHATGPT_ORG_PRIJS,
  CHATGPT_ORG_REFERENCE,
  getChatgptCheckoutMeta,
  type ChatgptReferenceId,
} from '@/app/lesmateriaal/chatgpt/chatgpt-data';
import {
  buildChatgptCheckoutUrl,
  isChatgptCheckoutEmail,
  saveChatgptCheckoutSession,
} from '@/lib/chatgpt-checkout';

type CheckoutBases = {
  een: string | null;
  compleet: string | null;
  organisatie: string | null;
};

type Ctx = {
  email: string;
  setEmail: (v: string) => void;
  bases: CheckoutBases;
  error: string;
  setError: (v: string) => void;
  buy: (referenceId: ChatgptReferenceId) => void;
};

const ChatgptCheckoutCtx = createContext<Ctx | null>(null);

function useChatgptCheckout(): Ctx {
  const ctx = useContext(ChatgptCheckoutCtx);
  if (!ctx) throw new Error('ChatgptCheckoutCtx ontbreekt');
  return ctx;
}

function BuyButton({
  referenceId,
  label,
  featured = false,
}: {
  referenceId: ChatgptReferenceId;
  label: string;
  featured?: boolean;
}) {
  const { bases, buy } = useChatgptCheckout();
  const kind =
    referenceId === CHATGPT_COMPLEET_REFERENCE
      ? 'compleet'
      : referenceId === CHATGPT_ORG_REFERENCE
        ? 'organisatie'
        : 'een';
  const enabled = Boolean(bases[kind]);

  if (!enabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="Online bestellen is tijdelijk niet beschikbaar"
        className={`inline-flex w-full cursor-not-allowed items-center justify-center min-h-[44px] px-4 py-2.5 font-semibold text-[0.9rem] rounded-full border-2 opacity-70 ${
          featured
            ? 'bg-gold/70 text-white border-navy/20'
            : 'bg-cream text-navy/70 border-navy/12'
        }`}
      >
        {label}
        <span className="sr-only"> — online bestellen tijdelijk niet beschikbaar</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => buy(referenceId)}
      className={`inline-flex w-full items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 font-semibold text-[0.9rem] rounded-full border-2 transition-colors touch-manipulation ${
        featured
          ? 'bg-gold hover:bg-gold-light text-white border-navy/25 shadow-[0_2px_0_0_rgba(46,36,28,0.18)]'
          : 'bg-cream hover:bg-slate text-navy border-navy/15'
      }`}
    >
      <CreditCard size={16} aria-hidden />
      {label}
    </button>
  );
}

function EmailBar() {
  const { email, setEmail, error, bases } = useChatgptCheckout();
  const anyEnabled = Boolean(bases.een || bases.compleet || bases.organisatie);
  if (!anyEnabled) {
    return (
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 text-senior-sm text-navy/80 leading-relaxed mb-8 max-w-2xl">
        Online bestellen wordt hier geactiveerd zodra de betaalomgeving is aangesloten. Tot die
        tijd kunt u contact opnemen via info@seniorease.nl.
      </div>
    );
  }

  function syncEmailFromEvent(value: string) {
    setEmail(value);
  }

  return (
    <div className="mb-8 max-w-xl space-y-3">
      <label htmlFor="chatgpt-email" className="block font-semibold text-navy text-senior-sm">
        E-mailadres voor uw download
      </label>
      <div className="relative">
        <Mail
          className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/35"
          size={18}
          aria-hidden
        />
        <input
          id="chatgpt-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => syncEmailFromEvent(e.target.value)}
          onInput={(e) => syncEmailFromEvent((e.target as HTMLInputElement).value)}
          onBlur={(e) => syncEmailFromEvent(e.target.value)}
          placeholder="naam@voorbeeld.nl"
          className="w-full min-h-[48px] rounded-xl border-2 border-navy/15 bg-white pl-10 pr-4 py-3 text-senior-base text-navy focus:border-gold focus:outline-none"
        />
      </div>
      <p className="text-navy/50 text-senior-xs leading-relaxed m-0">
        Vul dit één keer in. Daarna kunt u hieronder een onderwerp of pakket bestellen. Veilig
        betalen via Stripe ·{' '}
        <Link href="/voorwaarden" className="text-gold underline hover:text-gold-light">
          voorwaarden
        </Link>
      </p>
      {error ? (
        <p
          role="alert"
          className="text-red-800 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-senior-sm m-0"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 list-none p-0 m-0">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-navy/80 text-senior-sm leading-snug"
        >
          <Check className="text-gold shrink-0 mt-0.5" size={16} strokeWidth={2.5} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ChatgptShop({ bases }: { bases: CheckoutBases }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const emailRef = useRef('');

  function updateEmail(value: string) {
    emailRef.current = value;
    setEmail(value);
  }

  /** Lees e-mail uit ref én DOM (autofill vuurt soms geen React onChange). */
  function resolveEmail(): string {
    if (typeof document !== 'undefined') {
      const el = document.getElementById('chatgpt-email') as HTMLInputElement | null;
      const fromDom = el?.value?.trim() ?? '';
      if (fromDom) {
        if (fromDom !== emailRef.current) updateEmail(fromDom);
        return fromDom;
      }
    }
    return emailRef.current.trim() || email.trim();
  }

  function buy(referenceId: ChatgptReferenceId) {
    setError('');
    const trimmed = resolveEmail();
    if (!isChatgptCheckoutEmail(trimmed)) {
      setError('Vul een geldig e-mailadres in — daar sturen we de download naartoe.');
      document.getElementById('chatgpt-email')?.focus();
      return;
    }

    const kind =
      referenceId === CHATGPT_COMPLEET_REFERENCE
        ? 'compleet'
        : referenceId === CHATGPT_ORG_REFERENCE
          ? 'organisatie'
          : 'een';
    const paymentLinkBase = bases[kind];
    const url = buildChatgptCheckoutUrl({
      referenceId,
      email: trimmed,
      paymentLinkBase,
    });
    if (!url) {
      setError('Online betalen is tijdelijk niet beschikbaar. Neem contact op.');
      return;
    }

    const sku = getChatgptCheckoutMeta(referenceId);
    saveChatgptCheckoutSession({
      email: trimmed,
      referenceId,
      label: sku.label,
      price: sku.price,
    });
    window.location.href = url;
  }

  return (
    <ChatgptCheckoutCtx.Provider
      value={{ email, setEmail: updateEmail, bases, error, setError, buy }}
    >
      {/* 2. DRIE PRODUCTKEUZES */}
      <section
        id="mogelijkheden"
        aria-labelledby="chatgpt-mogelijkheden-heading"
        className="scroll-mt-24 bg-cream pb-12 md:pb-16"
      >
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <h2
            id="chatgpt-mogelijkheden-heading"
            className="font-serif text-navy text-[1.45rem] sm:text-[1.65rem] font-semibold leading-tight mb-2"
          >
            Kies wat bij u past
          </h2>
          <p className="text-navy/60 text-senior-sm mb-6 max-w-2xl">
            Alle prijzen zijn inclusief BTW. Eenmalige betaling — geen abonnement.
          </p>

          <EmailBar />

          <ul className="grid lg:grid-cols-3 gap-3 lg:gap-4 items-stretch list-none p-0 m-0 max-w-4xl">
            <li className="flex">
              <article className="relative flex flex-col w-full rounded-xl border border-navy/10 bg-paper p-4 sm:p-5 hover:border-navy/20 hover:shadow-sm transition-shadow">
                <header className="mb-3">
                  <h3 className="font-serif text-navy text-[1.1rem] font-semibold mb-0.5">
                    Eén praktische uitleg
                  </h3>
                  <p className="font-serif text-navy text-[1.75rem] font-semibold leading-none mb-2">
                    {formatPrijs(CHATGPT_EEN_PRIJS)}
                  </p>
                  <p className="text-navy/60 text-[0.9rem] leading-snug">
                    Wilt u eerst één onderwerp proberen? Kies één van de acht praktische
                    onderwerpen.
                  </p>
                </header>
                <a
                  href="#onderwerpen"
                  className="mt-auto mb-0 w-full inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 font-semibold text-[0.9rem] rounded-full border-2 bg-cream hover:bg-slate text-navy border-navy/15 transition-colors touch-manipulation"
                >
                  Kies een onderwerp →
                </a>
              </article>
            </li>

            <li className="flex">
              <article className="relative flex flex-col w-full rounded-xl border-2 border-gold bg-gold/[0.07] p-5 sm:p-6 shadow-[0_10px_32px_rgba(139,94,60,0.18)] ring-1 ring-gold/25 lg:-translate-y-1">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white">
                  Compleet
                </span>
                <header className="mb-3 pt-0.5">
                  <h3 className="font-serif text-navy text-[1.15rem] sm:text-[1.2rem] font-semibold mb-0.5">
                    Compleet uitlegpakket
                  </h3>
                  <p className="font-serif text-navy text-[1.9rem] font-semibold leading-none mb-2">
                    {formatPrijs(CHATGPT_COMPLEET_PRIJS)}
                  </p>
                  <p className="text-navy/60 text-[0.9rem] leading-snug mb-3">
                    Alle 8 onderwerpen. Het complete pakket om alle acht bijeenkomsten te geven
                    aan één groep.
                  </p>
                  <p className="text-navy/55 text-[0.85rem] leading-snug">
                    8 losse onderwerpen: {formatPrijs(CHATGPT_ACHT_LOS_TOTAAL)}
                    <br />
                    Compleet:{' '}
                    <strong className="text-navy">{formatPrijs(CHATGPT_COMPLEET_PRIJS)}</strong>
                  </p>
                </header>
                <div className="mt-auto">
                  <BuyButton
                    referenceId={CHATGPT_COMPLEET_REFERENCE}
                    label={`Compleet uitlegpakket – ${formatPrijs(CHATGPT_COMPLEET_PRIJS)}`}
                    featured
                  />
                </div>
              </article>
            </li>

            <li className="flex">
              <article className="relative flex flex-col w-full rounded-xl border border-navy/10 bg-paper p-4 sm:p-5 hover:border-navy/20 hover:shadow-sm transition-shadow">
                <header className="mb-3">
                  <h3 className="font-serif text-navy text-[1.1rem] font-semibold mb-0.5">
                    Organisatiepakket · één locatie
                  </h3>
                  <p className="font-serif text-navy text-[1.75rem] font-semibold leading-none mb-2">
                    {formatPrijs(CHATGPT_ORG_PRIJS)}
                  </p>
                  <p className="text-navy/60 text-[0.9rem] leading-snug mb-2">
                    Voor organisaties die het materiaal op één fysieke locatie met meerdere
                    groepen en begeleiders willen gebruiken.
                  </p>
                  <p className="text-navy/55 text-[0.85rem] leading-snug">
                    Dezelfde complete materialen als het pakket van{' '}
                    {formatPrijs(CHATGPT_COMPLEET_PRIJS)}, maar met ruimere gebruiksrechten.
                  </p>
                </header>
                <div className="mt-auto">
                  <BuyButton
                    referenceId={CHATGPT_ORG_REFERENCE}
                    label={`Organisatiepakket – ${formatPrijs(CHATGPT_ORG_PRIJS)}`}
                  />
                </div>
              </article>
            </li>
          </ul>
        </div>
      </section>

      {/* 3. DE 8 ONDERWERPEN */}
      <section
        id="onderwerpen"
        aria-labelledby="chatgpt-onderwerpen-heading"
        className="scroll-mt-24 bg-slate py-14 md:py-16"
      >
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <h2
            id="chatgpt-onderwerpen-heading"
            className="font-serif text-navy text-[1.45rem] sm:text-[1.65rem] font-semibold leading-tight mb-2"
          >
            Kies één praktische uitleg
          </h2>
          <p className="text-navy/65 text-senior-sm mb-8 max-w-xl">
            Wilt u eerst één onderwerp proberen? Kies voor {formatPrijs(CHATGPT_EEN_PRIJS)} één
            praktische uitleg.
          </p>

          <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
            {CHATGPT_LESSONS.map((les) => (
              <li key={les.id}>
                <article className="flex flex-col h-full rounded-xl bg-paper border border-navy/8 px-5 py-5">
                  <p className="text-gold font-bold text-[0.85rem] uppercase tracking-wide mb-1">
                    Onderwerp {les.number}
                  </p>
                  <h3 className="font-serif text-navy text-senior-sm font-semibold leading-snug mb-2">
                    {les.title}
                  </h3>
                  <p className="text-navy/60 text-[1.05rem] leading-relaxed flex-1 mb-4">
                    {les.description}
                  </p>
                  <p className="font-semibold text-navy text-senior-sm mb-3">
                    {formatPrijs(CHATGPT_EEN_PRIJS)}
                  </p>
                  <BuyButton
                    referenceId={les.referenceId}
                    label={`Kies dit onderwerp – ${formatPrijs(CHATGPT_EEN_PRIJS)}`}
                  />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. WAT KRIJGT U BIJ ÉÉN PRAKTISCHE UITLEG */}
      <section
        aria-labelledby="chatgpt-een-inhoud-heading"
        className="bg-cream py-14 md:py-16"
      >
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <h2
            id="chatgpt-een-inhoud-heading"
            className="font-serif text-navy text-[1.45rem] sm:text-[1.65rem] font-semibold leading-tight mb-6"
          >
            Alles voor één praktische bijeenkomst
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-start max-w-3xl">
            <CheckList
              items={[
                'Draaiboek voor de begeleider',
                'Beamerpresentatie',
                'Deelnemerskaart',
                'Oefenkaart',
                'Hulp bij vastlopen',
                'Checklist zaal & techniek',
                'START_HIER met duidelijke instructies',
                'Gebruikslicentie',
              ]}
            />
            <div>
              <p className="text-navy/65 text-senior-sm leading-relaxed mb-5">
                Afhankelijk van het gekozen onderwerp kunnen aanvullende materialen zijn
                toegevoegd.
              </p>
              <div className="rounded-xl border border-gold/30 bg-gold/10 px-5 py-4">
                <p className="text-navy text-senior-sm font-semibold leading-relaxed m-0">
                  U hoeft geen docent of ChatGPT-expert te zijn.
                  <br />
                  Volg het draaiboek stap voor stap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPLEET — CTA opnieuw */}
      <section
        id="compleet"
        aria-labelledby="chatgpt-compleet-heading"
        className="scroll-mt-24 bg-slate py-14 md:py-16"
      >
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <h2
            id="chatgpt-compleet-heading"
            className="font-serif text-navy text-[1.45rem] sm:text-[1.65rem] font-semibold leading-tight mb-2"
          >
            Liever alle acht onderwerpen?
          </h2>
          <p className="font-serif text-navy text-[1.25rem] font-semibold mb-3">
            Compleet uitlegpakket — {formatPrijs(CHATGPT_COMPLEET_PRIJS)}
          </p>
          <p className="text-navy/65 text-senior-sm leading-relaxed max-w-2xl mb-2">
            8 × 90 minuten praktische uitleg.
          </p>
          <p className="text-navy/65 text-senior-sm leading-relaxed max-w-2xl mb-6">
            Het pakket bevat alle acht onderwerpen plus de hulpmiddelen waarmee een begeleider
            de bijeenkomsten kan voorbereiden en uitvoeren.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mb-6">
            <CheckList
              items={[
                'Alle 8 lessen',
                'Draaiboeken',
                'Beamerpresentaties',
                'Deelnemerskaarten',
                'Oefenkaarten',
                'Hulp bij vastlopen',
                'Persoonlijke AI-lijst',
                'Startklaar deelnemer',
                'Lesvoorbereiding & printoverzicht',
                'Zaal & techniek',
                'Planning voor 8 bijeenkomsten',
                'START_HIER-begeleidersgids',
              ]}
            />
            <div className="space-y-4">
              <p className="text-navy/70 text-senior-sm leading-relaxed">
                De complete download bevat <strong>41 PDF-bestanden</strong>, overzichtelijk per
                les en functie geordend.
              </p>
              <p className="text-navy/70 text-senior-sm leading-relaxed">
                <strong>Gebruiksrecht:</strong> één groep.
              </p>
              <BuyButton
                referenceId={CHATGPT_COMPLEET_REFERENCE}
                label={`Compleet uitlegpakket – ${formatPrijs(CHATGPT_COMPLEET_PRIJS)}`}
                featured
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. ORGANISATIES */}
      <section
        id="organisatie"
        aria-labelledby="chatgpt-org-heading"
        className="scroll-mt-24 bg-cream py-14 md:py-16"
      >
        <div className="max-w-senior mx-auto px-5 sm:px-6">
          <h2
            id="chatgpt-org-heading"
            className="font-serif text-navy text-[1.45rem] sm:text-[1.65rem] font-semibold leading-tight mb-2"
          >
            Werkt u bij een bibliotheek, buurthuis of organisatie?
          </h2>
          <p className="font-serif text-navy text-[1.25rem] font-semibold mb-3">
            Organisatiepakket · één locatie — {formatPrijs(CHATGPT_ORG_PRIJS)}
          </p>
          <p className="text-navy/65 text-senior-sm leading-relaxed max-w-2xl mb-4">
            Voor onder andere bibliotheken, buurthuizen, wijkcentra, welzijnsorganisaties,
            seniorenorganisaties en vrijwilligersorganisaties.
          </p>
          <p className="text-navy/65 text-senior-sm leading-relaxed max-w-2xl mb-4">
            U krijgt dezelfde complete set met 8 onderwerpen als bij het complete uitlegpakket.
          </p>

          <div className="rounded-xl border-2 border-gold/35 bg-paper px-5 py-5 mb-5 max-w-2xl">
            <p className="text-navy text-senior-sm font-semibold leading-relaxed m-0 mb-3">
              Het organisatiepakket geeft gebruiksrecht voor meerdere groepen en begeleiders op
              één fysieke locatie.
            </p>
            <CheckList
              items={[
                'Geen doorverkoop',
                'Niet openbaar online delen',
                'Niet verspreiden naar andere locaties',
              ]}
            />
          </div>

          <p className="text-navy/60 text-senior-sm leading-relaxed max-w-2xl mb-6">
            Heeft uw organisatie meerdere locaties? Het organisatiepakket van{' '}
            {formatPrijs(CHATGPT_ORG_PRIJS)} geldt voor één fysieke locatie.
          </p>

          <div className="max-w-md">
            <BuyButton
              referenceId={CHATGPT_ORG_REFERENCE}
              label={`Organisatiepakket – ${formatPrijs(CHATGPT_ORG_PRIJS)}`}
              featured
            />
          </div>
        </div>
      </section>
    </ChatgptCheckoutCtx.Provider>
  );
}
