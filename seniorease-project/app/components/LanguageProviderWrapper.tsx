'use client';

import { LanguageProvider } from '../../lib/useLanguage';
import { ReactNode } from 'react';

export function LanguageProviderWrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

