import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oefenformulier | SeniorEase',
  description:
    'Veilig oefenformulier voor lesmateriaal Pakket F. Oefen invullen en verzenden — SeniorEase bewaart geen persoonsgegevens.',
  robots: { index: false, follow: false },
};

export default function OefenFormulierLayout({ children }: { children: React.ReactNode }) {
  return children;
}
