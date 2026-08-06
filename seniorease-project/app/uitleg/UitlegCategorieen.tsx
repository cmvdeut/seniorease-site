import Link from 'next/link';
import {
  Tv,
  Video,
  ShoppingBag,
  MapPin,
  Smartphone,
  Camera,
  Monitor,
  Landmark,
  Music,
  Bike,
  type LucideIcon,
} from 'lucide-react';
import { UITLEG_CLUSTERS } from './clusters';

const ICONS: Record<string, LucideIcon> = {
  streaming: Tv,
  videobellen: Video,
  winkelen: ShoppingBag,
  reizen: MapPin,
  smartphone: Smartphone,
  fotos: Camera,
  computer: Monitor,
  digid: Landmark,
  muziek: Music,
  hobby: Bike,
};

export function UitlegCategorieen() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {UITLEG_CLUSTERS.map((cluster) => {
        const Icon = ICONS[cluster.id] ?? Smartphone;
        return (
          <Link
            key={cluster.id}
            href={`/uitleg/thema/${cluster.id}`}
            className="bg-slate rounded-senior border border-navy/8 p-6 sm:p-7 min-h-touch hover:border-gold/40 transition-colors group flex flex-col"
          >
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-paper text-gold">
              <Icon size={28} strokeWidth={1.75} aria-hidden />
            </span>
            <h3 className="font-serif text-navy text-senior-lg font-semibold mb-2 group-hover:text-gold transition-colors">
              {cluster.titel}
            </h3>
            <p className="text-navy/65 text-senior-sm leading-relaxed flex-1">
              {cluster.omschrijving}
            </p>
            <span className="mt-5 text-gold font-semibold text-senior-sm">Bekijken →</span>
          </Link>
        );
      })}
    </div>
  );
}
