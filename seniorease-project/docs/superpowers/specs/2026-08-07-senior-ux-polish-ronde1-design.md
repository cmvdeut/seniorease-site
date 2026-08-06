# Senior UX polish — ronde 1 (homepage + header + knoppen)

**Date:** 2026-08-07  
**Status:** Approved for planning  
**Scope:** Homepage, global header, primary/secondary button treatment (token-first)

## Goal

Vergroot leesbaarheid, knop-herkenbaarheid en navigatievertrouwen voor senioren — zonder de rustige SeniorEase-huisstijl te verliezen.

## Out of scope (later)

- Tools-kaarten / grotere tool-iconen sitebreed
- Sticky “Hulp nodig?”-knop
- Nieuwe social-proof / testimonial-sectie
- Volledige sitebrede contrast-audit van alle uitlegpagina’s

## Approach

**Token-first:** centrale knop- en contrast-utility’s in Tailwind/CSS; homepage + header gebruiken die. Andere pagina’s profiteren later mee als ze dezelfde classes gaan gebruiken.

## Decisions

| Onderwerp | Keuze |
|-----------|--------|
| Omvang ronde 1 | Homepage + header + knoppen |
| Nav-iconen | Alleen in **mobiel** menu; desktop alleen tekst |
| Knopstijl | Duidelijk: rand + merkbare schaduw + actie-icoon (pijl/start) |

## Design

### 1. Contrast (homepage + header)

- Body / supporting copy op crème of paper: van typisch `text-navy/70` naar **`text-navy/85`–`text-navy/90`**.
- Headings blijven `text-navy` (vol).
- Meta/footer-achtige tekst mag lichter blijven.
- Bestaande `senior-*` schaal blijft (min. ~18px body).

**Bestanden (indicatief):** `Hero.tsx`, `TrustStrip.tsx`, `TopicsSection.tsx`, `AiHighlight.tsx`, `FAQAccordion.tsx`, `Header.tsx`.

### 2. Knoppen (gedeelde stijl)

**Primair (gold):**

- Achtergrond `bg-gold`, hover `bg-gold-light`
- Duidelijke rand (donkerder gold of `navy` op lage opacity)
- Lichte, merkbare box-shadow (geen glow, geen multi-layer “AI-shadow”)
- Optioneel Lucide-icoon rechts (bijv. `ArrowRight` of `Play` voor “Begin met leren”)
- `min-h-touch` (≥ 48px), `font-semibold`, `text-senior-sm` of `text-senior-base`
- Border-radius: mag `rounded-full` blijven (bestaande look), of iets rustiger `rounded-senior` als dat consistenter voelt — **voorkeur: `rounded-full` behouden** voor merkcontinuïteit

**Secundair (paper):**

- `bg-paper`, `text-navy`, duidelijke `border` met `navy/20`–`navy/30`
- Zelfde hoogte en schaduwgewicht als primair (lichter)

**Implementatie:** bij voorkeur herbruikbare classes of een klein `SeniorButton`-achtig patroon (Link/button) zodat Hero, TopicsSection, AiHighlight en header-Contact hetzelfde gebruiken.

### 3. Header — desktop

- Nav-labels: **`text-senior-sm`** (was `senior-xs`)
- Meer horizontale padding / duidelijkere active state (gold + underline of pill)
- Geen iconen naast labels
- Contact-knop: primaire knopstijl (rand + schaduw)

### 4. Header — mobiel

- Zelfde routes; naast label een Lucide-icoon, bijv.:
  - Digitale hulp → `Smartphone` of `BookOpen`
  - Gidsen → `BookOpen`
  - Kijk & Help → `PlayCircle`
  - Tools → `Wrench`
  - Over ons → `Users`
  - Contact → `Mail` of `MessageCircle`
- Rijhoogte ruim (≈ 56px), icoon + tekst duidelijk uitgelijnd

### 5. Homepage vertrouwen (licht)

- TrustStrip: iets grotere iconen; beschrijving naar donkerder navy-opacity
- Geen nieuwe secties in deze ronde

## Success criteria

- Hero-CTA en andere home-CTA’s zien er duidelijk “klikbaar” uit (rand + schaduw + icoon).
- Desktop-nav is groter en makkelijker te lezen zonder iconen.
- Mobiel menu toont tekst + icoon.
- Supporting tekst op home heeft merkbaar beter contrast op crème.
- Geen paarse/glow-look; huisstijl navy/gold/cream blijft.

## Non-goals

- Geen volledige component-library refactor buiten knop + nav.
- Geen copy-herscrijven van de hele homepage (tenzij nodig voor knoplabels).
