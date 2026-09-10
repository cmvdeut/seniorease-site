# E4 productie-/verificatienotitie v2.0

**Datum:** 2026-09-11  
**Status:** E4 PRODUCTIE V2.0 — TER VISUELE REVIEW  
**Inhoud:** `docs/superpowers/specs/2026-09-10-e4-berichten-overheid-vinden-lezen-inhoud-v2.md` 🔒 BEVROREN

## Openbare MijnOverheid-interface (geverifieerd)

| | |
|--|--|
| Start | `https://www.mijnoverheid.nl/` |
| Titel | MijnOverheid |
| Inloglabel | **Inloggen met DigiD** |
| DigiD-route | `/digid/login` zichtbaar |
| Berichtenbox | publiek genoemd op startpagina |
| Login uitgevoerd | **Nee** |

Details: `VERIFICATIE-MIJNOVERHEID.md`

## Demolaag (gereconstrueerd · SeniorEase-oefenomgeving)

Permanent label: **SENIOREASE — OEFENOMGEVING**

| Code | Asset | Inhoud |
|------|-------|--------|
| A | `e4-demo-overzicht.png` | MijnOverheid-oefenoverzicht |
| B | `e4-demo-berichtenbox-a.png` | Berichtenbox met 4 fictieve berichten · A gemarkeerd |
| C+D | `e4-demo-bericht-a.png` | Bericht A + bijlage herkenbaar |
| E | `e4-demo-terug.png` | Terug naar Berichtenbox |
| F | `e4-demo-berichtenbox-b.png` | Berichtenbox-eindmissiestand (alleen print/review · **niet** op eindmissie-beamer) |
| G | `e4-demo-bericht-b.png` | Bericht B (alleen print/review · **niet** op eindmissie-beamer) |

Geen echte accounts · geen echte berichten · geen naam/BSN/adres · geen financiële of zorggegevens.

## Oefenberichten

- **A:** Gemeente Oefenstad · openingstijden bibliotheek · 3 sep 2026 · `Openingstijden-bibliotheek.pdf`
- **B:** Waterschap Oefenwater · onderhoud fietspad · 8 sep 2026 · `Informatie-onderhoud-fietspad.pdf`

## Productie-resultaat

- Print: **18** pagina’s — START HIER · Draaiboek · Hulp · Deelnemerskaart · Zaalchecklist · Beamer-verwijzing  
- Beamer: **30** dia’s — deelnemersgericht · geen methodenamen · eindmissie zonder antwoordroute  
- Eindmissie: **exact 12 minuten** op beamer vermeld · bericht B niet vooraf verklapt  
- Bouw: `build_assets.py` · `build_pdf.py` · `build_beamer.py` (zelfde `_pdf_base` als E1–E3)

## Distributie

**Nog niet.** Actieve `private/lesmateriaal-downloads/pakket-e/e4-*.pdf` niet vervangen.  
v1 in `_archief-v1/` (indien aanwezig) · niet verwijderd.
