import type { LucideIcon } from 'lucide-react';
import {
  Camera,
  Calculator,
  CheckSquare,
  CalendarDays,
  Clock,
  Brain,
  BookOpen,
  KeyRound,
  Wrench,
  Sparkles,
  Puzzle,
} from 'lucide-react';

export type ToolCategoryId = 'tools' | 'apps' | 'ontspanning';

export type ToolItem = {
  title: string;
  href: string;
  description: string;
  category: ToolCategoryId;
  Icon: LucideIcon;
  brandIconUrl?: string;
};

export type ToolCategory = {
  id: ToolCategoryId;
  titel: string;
  omschrijving: string;
  Icon: LucideIcon;
};

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'tools',
    titel: 'Tools',
    omschrijving: 'Rekenmachine, kalender, klok en meer.',
    Icon: Wrench,
  },
  {
    id: 'apps',
    titel: 'Apps',
    omschrijving: 'Mijn Bibliotheek en andere apps.',
    Icon: Sparkles,
  },
  {
    id: 'ontspanning',
    titel: 'Ontspanning',
    omschrijving: 'Puzzels en rustige hersengymnastiek.',
    Icon: Puzzle,
  },
];

export const TOOLS: ToolItem[] = [
  {
    title: 'Rekenmachine',
    href: '/rekenmachine',
    description: 'Grote knoppen — ook valuta omrekenen.',
    category: 'tools',
    Icon: Calculator,
  },
  {
    title: 'Verjaardagskalender',
    href: '/kalender',
    description: 'Nooit meer een verjaardag vergeten.',
    category: 'tools',
    Icon: CalendarDays,
  },
  {
    title: 'Wachtwoord manager',
    href: '/uitleg/wachtwoorden',
    description: 'Sterke wachtwoorden bewaren.',
    category: 'tools',
    Icon: KeyRound,
  },
  {
    title: 'Afvinken maar!',
    href: '/afvinken',
    description: 'Boodschappen en to-dolijstjes.',
    category: 'tools',
    Icon: CheckSquare,
  },
  {
    title: 'Foto Archief',
    href: '/foto-archief',
    description: 'Namen op groepsfoto’s bijhouden.',
    category: 'tools',
    Icon: Camera,
  },
  {
    title: 'Grote Klok',
    href: '/klok',
    description: 'Grote cijfers, makkelijk af te lezen.',
    category: 'tools',
    Icon: Clock,
  },
  {
    title: 'Dagelijkse Puzzel',
    href: '/puzzels',
    description: 'Sudoku, Memory of Quiz — max. twee per uur.',
    category: 'ontspanning',
    Icon: Brain,
  },
  {
    title: 'Mijn Bibliotheek',
    href: '/bibliotheek',
    description: 'Boeken en muziek bijhouden.',
    category: 'apps',
    Icon: BookOpen,
    brandIconUrl: '/heart-logo-smile.png',
  },
];

export function getToolCategory(id: string) {
  return TOOL_CATEGORIES.find((c) => c.id === id);
}

export function getToolsByCategory(id: ToolCategoryId) {
  return TOOLS.filter((t) => t.category === id);
}
