import Link from 'next/link';

const OEFEN = '/oefenen/b4/SeniorEase-oefenbestand.pdf';
const EINDE = '/oefenen/b4/SeniorEase-eindmissie.pdf';

export default function B4DownloadenOefenPage() {
  return (
    <main className="min-h-screen bg-cream text-navy">
      <div className="max-w-2xl mx-auto px-6 py-10 sm:py-14">
        <Link
          href="/"
          className="inline-block text-primary font-semibold underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          style={{ fontSize: '1.15rem' }}
        >
          ← Terug naar home
        </Link>

        <p
          className="mt-8 font-semibold text-primary"
          style={{ fontSize: '1.1rem' }}
        >
          Oefenpagina · Les B4
        </p>
        <h1
          className="mt-2 font-heading font-bold text-navy leading-tight"
          style={{ fontSize: 'clamp(1.85rem, 4vw, 2.4rem)' }}
        >
          Oefenen met downloaden
        </h1>
        <p className="mt-4 text-navy/80 leading-relaxed" style={{ fontSize: '1.2rem' }}>
          In deze oefening downloadt u een veilig SeniorEase-oefenbestand.
        </p>
        <p className="mt-2 text-navy/70 leading-relaxed" style={{ fontSize: '1.15rem' }}>
          Gebruik deze pagina alleen voor de oefening uit les B4.
        </p>

        {/* Onderdeel 1 — Oefenbestand */}
        <section
          className="mt-10 rounded-2xl border-2 border-slate bg-paper p-6 sm:p-8"
          aria-labelledby="oefenbestand-titel"
        >
          <p
            className="font-bold uppercase tracking-wide text-primary"
            style={{ fontSize: '0.95rem' }}
          >
            Onderdeel 1
          </p>
          <h2
            id="oefenbestand-titel"
            className="mt-2 font-heading font-bold text-navy"
            style={{ fontSize: '1.65rem' }}
          >
            Oefenbestand
          </h2>
          <p className="mt-3 text-navy/80 leading-relaxed" style={{ fontSize: '1.2rem' }}>
            Dit bestand gebruikt u tijdens de les.
          </p>
          <p className="mt-2 text-navy/60" style={{ fontSize: '1.05rem' }}>
            Bestandsnaam: <strong className="text-navy">SeniorEase-oefenbestand.pdf</strong>
          </p>
          <a
            href={OEFEN}
            download="SeniorEase-oefenbestand.pdf"
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-primary px-6 py-4 text-center font-bold text-white shadow-sm transition hover:bg-primary-dark focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            style={{ fontSize: '1.25rem', minHeight: '3.5rem' }}
          >
            Download het oefenbestand
          </a>
        </section>

        {/* Onderdeel 2 — Eindmissie */}
        <section
          className="mt-8 rounded-2xl border-2 border-navy/25 bg-white p-6 sm:p-8"
          aria-labelledby="eindmissie-titel"
        >
          <p
            className="font-bold uppercase tracking-wide text-navy"
            style={{ fontSize: '0.95rem' }}
          >
            Onderdeel 2
          </p>
          <h2
            id="eindmissie-titel"
            className="mt-2 font-heading font-bold text-navy"
            style={{ fontSize: '1.65rem' }}
          >
            Eindmissie
          </h2>
          <p className="mt-3 text-navy/80 leading-relaxed" style={{ fontSize: '1.2rem' }}>
            Dit bestand gebruikt u aan het einde van de les.
          </p>
          <p className="mt-2 text-navy/60" style={{ fontSize: '1.05rem' }}>
            Bestandsnaam: <strong className="text-navy">SeniorEase-eindmissie.pdf</strong>
          </p>
          <a
            href={EINDE}
            download="SeniorEase-eindmissie.pdf"
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-navy px-6 py-4 text-center font-bold text-white shadow-sm transition hover:bg-navy-light focus:outline-none focus-visible:ring-4 focus-visible:ring-navy/30 focus-visible:ring-offset-2"
            style={{ fontSize: '1.25rem', minHeight: '3.5rem' }}
          >
            Download de eindmissie
          </a>
        </section>

        <p className="mt-10 text-navy/55 leading-relaxed" style={{ fontSize: '1.05rem' }}>
          Tip: na het downloaden vindt u het bestand vaak terug via Verkenner → Downloads.
          Open het niet alleen vanuit de downloadmelding van de browser — oefen ook zelf
          terugvinden.
        </p>
      </div>
    </main>
  );
}
