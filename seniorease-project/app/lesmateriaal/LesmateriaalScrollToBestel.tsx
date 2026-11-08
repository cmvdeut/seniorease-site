'use client';

import { useEffect } from 'react';

/** Scroll naar bestelblok bij losse-les-intent (na navigatie vanaf de hub). */
export function LesmateriaalScrollToBestel({
  targetId,
  enabled,
}: {
  targetId: string;
  enabled: boolean;
}) {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return;
    const el = document.getElementById(targetId);
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(t);
  }, [enabled, targetId]);

  return null;
}
