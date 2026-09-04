import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oefenen met downloaden',
  description:
    'Oefenpagina voor les B4: veilig een SeniorEase-oefenbestand downloaden. Geen advertenties, geen login.',
  robots: { index: false, follow: false },
};

export default function B4OefenenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
