import FotoArchief from '../components/FotoArchief';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/foto-archief',
  title: "Foto Archief – familiefoto's labelen voor uw album",
  description:
    "Label personen op oude groepsfoto's met nummers en namen. Handig naast albums op uw telefoon — exporteer en deel met familie.",
  keywords: ['foto archief', 'familiefoto\'s', 'foto album senioren'],
});

export default function Page() {
  return <FotoArchief />;
}
