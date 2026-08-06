# TrustStrip Hybrid Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the three live geruststellings-USP’s as an open cream TrustStrip directly under the homepage hero, without changing the rest of the new shell.

**Architecture:** One server component (`TrustStrip`) with fixed copy/icons from live. Wire it into `app/page.tsx` between `Hero` and `TopicsSection`. No client state, no new dependencies, no SEO/URL changes.

**Tech Stack:** Next.js App Router, React 19, Tailwind (navy/gold/cream tokens), lucide-react

**Spec:** `docs/superpowers/specs/2026-08-06-hybrid-truststrip-design.md`

## Global Constraints

- Copy and icons must match the spec table exactly (Heart / RotateCcw / Clock3 + Dutch titles/descriptions)
- Open band only: `bg-cream`, no cards, no box-shadow
- Homepage only; do not restyle hubs or restore Bibliotheek/nieuwsbrief/Facebook
- Typography ≥ `text-senior-xs` (18px)
- Local review on `http://localhost:3001` before any production deploy
- This repo has no component unit-test runner; verify visually + by reading the rendered source

---

## File map

| File | Responsibility |
|------|----------------|
| `app/components/TrustStrip.tsx` | Trust strip UI (create) |
| `app/page.tsx` | Insert `<TrustStrip />` between Hero and TopicsSection (modify) |

---

### Task 1: Create TrustStrip component

**Files:**
- Create: `app/components/TrustStrip.tsx`

**Interfaces:**
- Consumes: `lucide-react` icons `Heart`, `RotateCcw`, `Clock3`; Tailwind tokens `cream`, `navy`, `primary`, `senior-*`, `max-w-senior`
- Produces: default export `TrustStrip` — React server component, no props

- [ ] **Step 1: Create `app/components/TrustStrip.tsx` with this exact content**

```tsx
import { Heart, RotateCcw, Clock3, type LucideIcon } from 'lucide-react';

const ITEMS: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Heart,
    title: 'U kunt niets kapotmaken',
    desc: 'Echt niet. Uitproberen kan altijd veilig.',
  },
  {
    Icon: RotateCcw,
    title: 'Fouten maken mag',
    desc: 'Zo leert iedereen — ook wij deden dat.',
  },
  {
    Icon: Clock3,
    title: 'In uw eigen tempo',
    desc: 'Geen haast. Stap voor stap, zo vaak als u wilt.',
  },
];

/**
 * Open geruststellingsband onder de hero — copy/iconen van live homepage.
 */
export default function TrustStrip() {
  return (
    <section
      aria-label="Waarom SeniorEase veilig voelt"
      className="bg-cream border-y border-navy/8"
    >
      <div className="max-w-senior mx-auto px-5 sm:px-6 py-12 md:py-16">
        <ul className="grid sm:grid-cols-3 gap-10 sm:gap-8 list-none m-0 p-0">
          {ITEMS.map(({ Icon, title, desc }) => (
            <li
              key={title}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="rounded-full p-3.5 bg-primary-soft">
                <Icon
                  size={26}
                  strokeWidth={1.75}
                  className="text-primary"
                  aria-hidden
                />
              </div>
              <h2 className="font-serif text-navy text-senior-sm font-semibold leading-snug m-0">
                {title}
              </h2>
              <p className="text-navy/70 text-senior-xs leading-relaxed m-0 max-w-xs">
                {desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Sanity-check the file exists and exports default**

Run from `seniorease-project`:

```bash
npx --yes tsc --noEmit --pretty false 2>&1 | Select-String -Pattern "TrustStrip" -SimpleMatch
```

Expected: no output mentioning `TrustStrip` (or empty). If `tsc` fails project-wide for unrelated reasons, at least confirm the file is syntactically valid by opening it — do not “fix” unrelated type errors in this task.

- [ ] **Step 3: Commit (only if the user asked to commit)**

```bash
git add seniorease-project/app/components/TrustStrip.tsx
git commit -m "$(cat <<'EOF'
Add TrustStrip component with live geruststelling copy.

EOF
)"
```

If the user has not asked to commit, skip this step and continue.

---

### Task 2: Wire TrustStrip into the homepage

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: default export `TrustStrip` from `./components/TrustStrip`
- Produces: homepage order Hero → TrustStrip → TopicsSection → AiHighlight → FAQAccordion

- [ ] **Step 1: Update `app/page.tsx` to this content**

```tsx
import JsonLd from './components/JsonLd';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import TopicsSection from './components/TopicsSection';
import AiHighlight from './components/AiHighlight';
import FAQAccordion from './components/FAQAccordion';
import {
  buildPageMetadata,
  DEFAULT_DESCRIPTION,
  webApplicationSchema,
} from '@/lib/seo';

export const metadata = buildPageMetadata({
  path: '/',
  title: 'SeniorEase – Digitale hulp voor senioren',
  description: DEFAULT_DESCRIPTION,
  absoluteTitle: true,
  keywords: [
    'digitale hulp senioren',
    'technologie voor ouderen',
    'WhatsApp uitleg',
    'DigiD uitleg',
    'gratis tools senioren',
    'ChatGPT senioren',
    'AI voor senioren',
  ],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={webApplicationSchema} />
      <Hero />
      <TrustStrip />
      <TopicsSection />
      <AiHighlight spacious />
      <FAQAccordion />
    </main>
  );
}
```

- [ ] **Step 2: Ensure the dev server is running**

If not already running:

```bash
npm run dev
```

Expected: Next.js ready on `http://localhost:3001`

- [ ] **Step 3: Visual acceptance checklist**

Open `http://localhost:3001` and verify:

1. Directly under the hero: three USP’s with exact titles  
   - “U kunt niets kapotmaken”  
   - “Fouten maken mag”  
   - “In uw eigen tempo”  
2. No card chrome (no white boxes with shadow on the strip)  
3. Cream background; icons in soft brown circles  
4. Desktop: three columns; mobile width: stacked and centered  
5. TopicsSection (“Meest bekeken gidsen” / “Handige tools”) still follows immediately after  
6. Header, FAQ, Footer unchanged  

Optional HTML check (PowerShell):

```powershell
(Invoke-WebRequest -Uri http://localhost:3001 -UseBasicParsing).Content | Select-String -Pattern "U kunt niets kapotmaken","Fouten maken mag","In uw eigen tempo"
```

Expected: all three strings present.

- [ ] **Step 4: Commit (only if the user asked to commit)**

```bash
git add seniorease-project/app/page.tsx seniorease-project/app/components/TrustStrip.tsx
git commit -m "$(cat <<'EOF'
Show TrustStrip under homepage hero for hybrid redesign.

EOF
)"
```

If already committed in Task 1, only stage `app/page.tsx` (and TrustStrip if uncommitted). Skip if the user did not ask to commit.

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Placement under hero | Task 2 |
| Exact three USP copy + icons | Task 1 |
| Open cream band, no cards | Task 1 |
| Homepage only / no hubs / no Bibliotheek blocks | Global + Task 2 (only `page.tsx`) |
| Senior typography tokens | Task 1 (`senior-xs` / `senior-sm`) |
| Local visual acceptance | Task 2 Step 3 |

No placeholders remaining. Component name `TrustStrip` is consistent across tasks.
