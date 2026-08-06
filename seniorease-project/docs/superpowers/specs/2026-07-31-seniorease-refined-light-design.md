# SeniorEase — Refined Light redesign (Stitch A)

**Status:** Approved for Fase 1 local build (2026-07-31)  
**Date:** 2026-07-31  
**Visual north star:** Stitch homepage redesign 1 + WhatsApp Basis Gids screen  
**Choice:** A — Deep Navy header/footer + Warm Beige CTAs + Soft Cream surfaces  
**Workflow:** Local review only until user approves push to production.

---

## 1. Merk & tokens

| Token | Value | Gebruik |
|-------|--------|---------|
| Cream | `#FDFBF7` | Hero, lichte pagina-achtergronden |
| Navy | `#1A2B48` | Header, footer, koppen, primaire tekst |
| Beige | `#E5DED0` | CTA-knoppen, accent-vlakken, FAQ idle |
| White | `#FFFFFF` | Kaarten op cream/slate |
| Slate | ~`#5A6B7D`–`#6B7C8F` | Mid-section homepage (gidsen/tools band); gids-detail canvas |

**Niet meer als primary:** bruin `#8B5E3C` (mag later als legacy/accent verdwijnen of alleen op oude pagina’s tot migratie).

**Typografie**
- Koppen: Lora (al in project) of Playfair Display
- Body: Source Sans 3 (al in project) — **niet** Inter (project voorkeur); basis ≥18–20px
- Knoppen: min. hoogte 48–60px, `rounded-2xl` / ~1.5rem

**Logo:** tekst “SeniorEase” + klein blad-icoon in beige op navy (Stitch); hartlogo uitfaseren of tijdelijk naast houden tot assets klaar zijn.

---

## 2. Visuele patronen (vast)

### Homepage (scherm 1)
1. **Navy sticky header** — logo links, links: Digitale hulp · Gidsen · Tools · Over ons · beige Contact-knop  
2. **Cream hero** — serif H1 links, korte lead, beige CTA “Begin met leren”; foto rechts (oudere duo met laptop/tablet)  
3. **Slate band** — twee grote panels: “Meest bekeken gidsen” (2×2 foto/icoon-kaarten) + “Handige tools” (2×2 icoon-kaarten); beige “Bekijk alles”  
4. **FAQ** — accordion; actief = navy, idle = beige  
5. **Navy footer** — 4 kolommen (merk, navigatie, contact, socials)

### Gids-detail (scherm 2 — WhatsApp)
1. Zelfde navy header/footer  
2. **Slate pagina-achtergrond**, witte/serif titel  
3. Beige “Wat u leert”-box  
4. Genummerde stappen: tekst links, telefoon-mockup rechts  
5. Pro-tip beige callout  
6. Grote beige “Vorige stap” / “Volgende stap”  
7. Sidebar: inhoudsopgave + gerelateerde onderwerpen  

**Mobiel:** hero stapelt; panels onder elkaar; sidebar onder content.

---

## 3. Informatie-architectuur (mapping)

| Stitch / PRD | Huidige site | Actie |
|--------------|--------------|--------|
| Gidsen | `/uitleg` (+ deels `/digitale-hulp`) | Nav-label “Gidsen” → `/uitleg` (of later `/gidsen` redirect) |
| Digitale hulp | `/digitale-hulp` | Behouden |
| Tools | `/tools` | Behouden + Stitch cards layout |
| Over ons / Contact | bestaand | Behouden |
| Kijk & Help | `/kijk-en-help` | **Behouden in nav** (niet in Stitch-mock; wel product) |
| Helpcentrum + spraakzoeken | deels zoek op home/digitale-hulp | Fase 2 |
| Filters Apparaat/Niveau | — | Fase 2 op `/uitleg` |
| Instellingen tekstgrootte | — | Fase 2 |
| Interactieve oefeningen | — | Fase 3 |
| Veilig-online checklist UI | `/uitleg/veiligheid` bestaat | Fase 2 restyle |
| Print-vriendelijke gids | — | Fase 2 |

---

## 4. Fasering

### Fase 1 — Shell + homepage (nu)
- Tokens in Tailwind/`globals.css` (navy/cream/beige)
- StickyNav + footer in Stitch-A stijl
- Homepage layout volgens scherm 1 (hergebruik bestaande links/content waar mogelijk)
- Geen breaking rename van URLs

### Fase 2 — Gidsen & tools
- `/uitleg` en gids-detail template zoals WhatsApp-scherm
- `/tools` grid zoals Stitch tools
- Helpcentrum-zoek + filters + print + voorkeuren (tekstgrootte)

### Fase 3 — PRD extras
- Spraakzoeken, oefeningen, bewaarde gidsen, checklist-interactie

---

## 5. Content / SEO-bewust
- Bestaande SEO (`buildPageMetadata`, schema) behouden tijdens restyle
- Nederlandse “u”-toon; geen Engelse Stitch-strings op productie
- Tools in mock (“Wachtwoord manager”, “Notities”) alleen tonen als ze bestaan — anders koppelen aan echte tools (Bibliotheek, Afvinken, enz.)

---

## 6. Expliciet niet in Fase 1
- Volledige site in één keer migreren
- Nested dark gids-pagina’s live zetten zonder template
- Nieuwe features (spraak, oefeningen, account/bewaard)
- Inter als body font
- Bruin volledig verwijderen uit alle oude pagina’s in één PR

---

## Goedkeuring gevraagd
Bevestig dat Fase 1 (tokens + nav/footer + homepage Stitch A) mag starten. Daarna: implementatieplan + code.
