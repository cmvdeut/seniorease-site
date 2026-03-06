import FotoArchief from '../components/FotoArchief';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foto Archief – foto\'s bewaren en personen omschrijven',
  description: 'Bewaar uw mooiste foto\'s en omschrijf wie erop staan. Handig hulpmiddel voor senioren om herinneringen te bewaren.',
};

export default function Page() {
  return <FotoArchief />;
}
