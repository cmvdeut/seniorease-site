# SeniorEase — Hybrid homepage TrustStrip

**Status:** Approved for implementation (brainstorm 2026-08-06)  
**Date:** 2026-08-06  
**Scope:** Homepage only — restore live geruststelling under new shell

---

## Goal

Keep the new homepage shell (Header, Hero, TopicsSection, AiHighlight, FAQ, Footer).  
Bring back the strongest live trust moment: the three USP’s, as an open cream band directly under the hero.

Success: visitors feel the same reassurance as on live, without undoing the clearer structure of the redesign.

---

## Placement

Homepage order:

1. Hero  
2. **TrustStrip** (new)  
3. TopicsSection  
4. AiHighlight  
5. FAQAccordion  

---

## Content (exact copy from live)

| Icon (lucide) | Title | Description |
|---------------|--------|-------------|
| `Heart` | U kunt niets kapotmaken | Echt niet. Uitproberen kan altijd veilig. |
| `RotateCcw` | Fouten maken mag | Zo leert iedereen — ook wij deden dat. |
| `Clock3` | In uw eigen tempo | Geen haast. Stap voor stap, zo vaak als u wilt. |

---

## Visual design

- Open band: `bg-cream`, no cards, no box-shadow  
- Desktop: 3 columns, centered; mobile: stacked, centered  
- Per item: circular icon on soft gold/primary tint → serif title (`text-navy`) → body (`text-navy/70`)  
- Spacing: generous section padding; optional hairline top/bottom so the band reads between hero and topics  
- Typography: existing senior tokens (≥18px)  
- Tokens: cream / navy / gold — match current Tailwind theme

---

## Technical

- New file: `app/components/TrustStrip.tsx`  
- Server component (no client state)  
- Wire in `app/page.tsx`: `<TrustStrip />` between `<Hero />` and `<TopicsSection />`  
- No changes to Header, Footer, FAQ, hubs, URLs, or SEO metadata  

---

## Out of scope

- Mijn Bibliotheek / nieuwsbrief / Facebook blocks from live homepage  
- Restyling `/digitale-hulp`, `/uitleg`, `/tools`  
- Changing FAQ copy (overlap with “kapotmaken” is fine; USP stays visible)  
- Production deploy (local review first)

---

## Acceptance

- [ ] TrustStrip visible under hero on `http://localhost:3001`  
- [ ] Copy and icons match the table above  
- [ ] No cards; cream open band; readable on mobile  
- [ ] Rest of homepage shell unchanged  
