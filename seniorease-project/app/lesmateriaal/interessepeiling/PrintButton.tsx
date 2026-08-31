'use client';

import SeniorButton from '@/app/components/SeniorButton';
import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <SeniorButton variant="secondary" icon={Printer} onClick={() => window.print()}>
      Printen of opslaan als PDF
    </SeniorButton>
  );
}
