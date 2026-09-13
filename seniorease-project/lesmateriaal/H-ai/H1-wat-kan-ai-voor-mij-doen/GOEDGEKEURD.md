# H1 — WAT KAN AI VOOR MIJ DOEN?
# PRODUCTIE V2.0 — GOEDGEKEURD & BEVROREN 🔒

**Status:** PRODUCTIE V2.0 — GOEDGEKEURD & BEVROREN 🔒  
**Goedgekeurd (producteigenaar):** 2026-09-13  
**Fase:** 3C — formele freeze na tweede visuele review  

**Inhoud:** `docs/superpowers/specs/2026-09-13-h1-wat-kan-ai-voor-mij-doen-inhoud-v2.md` 🔒  
**Architectuur:** `docs/superpowers/specs/2026-09-13-pakket-h-ai-inhoudsarchitectuur-v2.md` 🔒  

## Statuslagen

| Laag | Status |
|------|--------|
| H1 INHOUD V2.0 | GOEDGEKEURD & BEVROREN 🔒 |
| H1 PRODUCTIE V2.0 | **GOEDGEKEURD & BEVROREN** 🔒 |
| H1 DISTRIBUTIE | **nog niet** — wacht op aparte pre-distributiecontrole |

## Bevroren productieversie

Deze bestanden en onderdelen vormen de goedgekeurde H1-productieversie V2.0:

| Onderdeel | Pad / vastlegging |
|-----------|-------------------|
| Print-PDF | `pdf/SeniorEase-H1-Wat-kan-AI-voor-mij-doen-v2.pdf` — **8** pagina’s |
| Beamer-PDF | `beamer/SeniorEase-H1-Beamer-v2.pdf` — **23** dia’s |
| START HIER | `start-hier.md` |
| Draaiboek | `draaiboek.md` |
| Beamer (bron) | `build_beamer.py` + gegenereerde PDF |
| Hulp bij vastlopen | `hulp-bij-vastlopen.md` |
| Deelnemerskaart | `deelnemerskaart.md` |
| Zaalchecklist | `zaalchecklist.md` |
| Iconenset A–D | `assets/icons/` (zie hieronder) |
| Visuele opbouw | beamer dia’s 1–23 · print pagina’s 1–8 (incl. 3B-correcties) |
| Fallback A/B/C | vastgelegd in inhoud + productie |
| Eindmissie | vastgelegd in inhoud + productie |

QA-renders bij freeze: `_qa_pages/` — **8** print · **23** beamer (geen stale renders).

## Visuele review (producteigenaar) — PASS

- dia 3 leesbaarheid: PASS  
- dia 6 TEKST → GEWONE TAAL: PASS  
- dia 9 kort antwoord: PASS  
- iconen A–D voor H1: PASS  
- print-PDF: PASS  
- beamer-PDF: PASS  
- overflow/afsnijding: geen blokkades  
- dubbele tekstlagen: geen blokkades  

## Iconenstatus

De huidige iconen voor:

- **UITLEGGEN** — `icon-uitleggen.png`  
- **IDEEËN** — `icon-ideeen.png`  
- **FORMULEREN** — `icon-formuleren.png`  
- **STAPPEN / MOGELIJKHEDEN** — `icon-stappen.png`  

zijn:

**GOEDGEKEURD VOOR H1** 🔒

Zij zijn hiermee **niet** automatisch:

- Pakket-H-brede standaard  
- SeniorEase-brede standaard  

Dat kan pas na beoordeling in latere lessen.

## Gemini

Echte Gemini-screenshots zijn **geen** ontbrekend productieonderdeel van H1.

- H1 gebruikt Gemini-web als **live** demonstratieomgeving.  
- SeniorEase-demo-kaarten zijn bewust **uitlegweergaven**, geen nabootsing van Gemini.  
- Volledige bediening/interface blijft primair **H2**.  
- HARD: geen nep-Gemini-interface · geen SeniorEase-kaart presenteren als echt Gemini-scherm.

## Pre-distributiepunt (blokkeert freeze níet)

Exacte actuele Gemini-webroute/URL vastleggen en testen voor de begeleider  
(START HIER · zaalchecklist / voorbereiding).

Dit punt moet **vóór definitieve distributie** worden gesloten.  
Geen accountcreatie als lesonderdeel.

## Verboden zonder aparte opdracht

- Inhoud / PDF-layout / beamer / iconen / markdown-bronnen wijzigen  
- Distributie · shop · Stripe · fulfillment · slugs/fileIds  
- Technische G/H-laag / migratie  
- H2 starten  
