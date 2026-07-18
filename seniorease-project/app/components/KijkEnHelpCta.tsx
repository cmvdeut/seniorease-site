import Link from 'next/link';
import { Eye } from 'lucide-react';

/**
 * Vast blok onder artikelen: doorverwijzing naar Kijk & Help.
 */
export default function KijkEnHelpCta({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <aside
      className={`rounded-xl border border-primary/25 ${compact ? 'p-5' : 'p-6 sm:p-8'}`}
      style={{ background: '#FFFBF0' }}
      aria-labelledby="kijk-en-help-cta-kop"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary-soft"
          aria-hidden
        >
          <Eye size={28} strokeWidth={1.75} className="text-primary" />
        </div>
        <div className="flex-1">
          <h2
            id="kijk-en-help-cta-kop"
            className="font-bold text-gray-900 mb-1"
            style={{ fontSize: compact ? '1.25rem' : '1.4rem' }}
          >
            Heeft u een scherm dat u niet begrijpt?
          </h2>
          <p className="text-gray-700 mb-4" style={{ fontSize: '1.1rem', lineHeight: 1.55 }}>
            Probeer Kijk &amp; Help. Maak een foto of kies een screenshot — SeniorEase legt
            rustig uit wat u ziet.
          </p>
          <Link
            href="/kijk-en-help"
            className="inline-flex items-center justify-center font-bold text-white rounded-xl px-6 py-3.5 bg-primary hover:bg-primary-dark transition-colors shadow-sm"
            style={{ fontSize: '1.15rem', minHeight: '48px' }}
          >
            Probeer Kijk &amp; Help
          </Link>
        </div>
      </div>
    </aside>
  );
}
