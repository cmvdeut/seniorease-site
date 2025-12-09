'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestDemoPage() {
  const router = useRouter();

  useEffect(() => {
    // Verwijder licentie uit localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('seniorease-licentie');
      console.log('✅ Licentie verwijderd uit localStorage');
      
      // Wacht even en redirect naar bibliotheek
      setTimeout(() => {
        router.push('/bibliotheek');
      }, 1000);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-neutral-cream flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin text-6xl mb-4">⏳</div>
        <p className="text-senior-lg text-gray-700 mb-2">
          Licentie wordt verwijderd...
        </p>
        <p className="text-senior-base text-gray-600">
          Je wordt doorgestuurd naar de bibliotheek pagina
        </p>
      </div>
    </div>
  );
}




