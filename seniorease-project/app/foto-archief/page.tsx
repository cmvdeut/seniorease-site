import FotoArchief from '../components/FotoArchief';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foto Archief – familiefoto\'s labelen voor uw album',
  description: 'Label personen op oude groepsfoto\'s met nummers en namen. Handig naast albums op uw telefoon — exporteer en deel met familie.',
};

export default function Page() {
  return <FotoArchief />;
}
