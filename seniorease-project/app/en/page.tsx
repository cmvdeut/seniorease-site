// This will be the English homepage
// For now, redirect to main page - we'll implement this later
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EnglishHomePage() {
  const router = useRouter();
  
  useEffect(() => {
    // For now, just show that English version is coming
    // Later we'll implement the full English homepage
  }, [router]);

  return (
    <div className="min-h-screen bg-neutral-cream flex items-center justify-center">
      <div className="text-center">
        <p className="text-senior-xl text-gray-700">English version coming soon...</p>
        <a href="/" className="text-primary hover:underline mt-4 inline-block">
          Go to Dutch version
        </a>
      </div>
    </div>
  );
}

