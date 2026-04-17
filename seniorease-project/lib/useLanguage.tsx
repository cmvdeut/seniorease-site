'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Language, getTranslations, Translations, getCurrentLanguage, setLanguage as saveLanguage } from './translations';

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
  switchLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>('nl');

  useEffect(() => {
    // URL is leading: /en = English, anything else = Dutch
    const lang = pathname.startsWith('/en') ? 'en' : 'nl';
    setLanguageState(lang);
  }, [pathname]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveLanguage(lang);
    
    // Update URL if needed
    const currentPath = pathname;
    if (lang === 'en' && !currentPath.startsWith('/en')) {
      // Switch to English - add /en prefix
      const newPath = '/en' + currentPath;
      router.push(newPath);
    } else if (lang === 'nl' && currentPath.startsWith('/en')) {
      // Switch to Dutch - remove /en prefix
      const newPath = currentPath.replace(/^\/en/, '');
      router.push(newPath || '/');
    }
  };

  const switchLanguage = () => {
    const newLang = language === 'nl' ? 'en' : 'nl';
    setLanguage(newLang);
  };

  const translations = getTranslations(language);

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

