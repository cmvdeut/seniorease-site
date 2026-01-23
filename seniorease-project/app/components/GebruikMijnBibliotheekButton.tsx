'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface GebruikMijnBibliotheekButtonProps {
  className?: string;
  variant?: 'default' | 'small';
}

export default function GebruikMijnBibliotheekButton({ 
  className = '',
  variant = 'default'
}: GebruikMijnBibliotheekButtonProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [href, setHref] = useState<string>('/bibliotheek');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check of het een mobiel apparaat is
    const userAgent = navigator.userAgent;
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(userAgent) || 
                         (window.innerWidth <= 768 && window.innerHeight <= 1024);
    
    setIsMobile(isMobileDevice);
    
    // Op mobiel: ga naar uitlegpagina, op desktop: direct naar bibliotheek
    setHref(isMobileDevice ? '/gebruik-mijn-bibliotheek' : '/bibliotheek');
  }, []);

  // Base classes
  const baseClasses = variant === 'small' 
    ? 'inline-block bg-primary text-white px-6 py-3 rounded-xl text-senior-base font-bold text-center hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:scale-105'
    : 'inline-block bg-primary text-white px-8 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-center';

  return (
    <Link 
      href={href}
      className={`${baseClasses} ${className}`}
    >
      👉 Gebruik Mijn Bibliotheek
    </Link>
  );
}


