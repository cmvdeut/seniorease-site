import FotoArchief from '../components/FotoArchief';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foto Archief - Personen Identificeren',
  description: 'Identificeer personen in fotos met genummerde annotaties',
};

export default function Page() {
  return <FotoArchief />;
}
