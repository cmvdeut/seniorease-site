'use client';

import { useLanguage } from '../../lib/useLanguage';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const { language, switchLanguage } = useLanguage();
  const pathname = usePathname();

  // Don't show on certain pages if needed
  // if (pathname.includes('/test-')) return null;

  return (
    <button
      onClick={switchLanguage}
      className="text-senior-sm font-bold text-primary hover:text-primary-dark transition-colors px-3 py-2 rounded-lg hover:bg-primary/10"
      aria-label={language === 'nl' ? 'Switch to English' : 'Schakel over naar Nederlands'}
    >
      {language === 'nl' ? '🇬🇧 EN' : '🇳🇱 NL'}
    </button>
  );
}

