# H3 — Productievoorbereiding v1

**Status:** TER REVIEW  
**Datum:** 2026-09-13  
**Fase:** 1B — twee mini-correcties · inhoud freeze · alleen inventarisatie  
**Inhoud (bindend · frozen):** `docs/superpowers/specs/2026-09-13-h3-betere-vragen-stellen-aan-ai-inhoud-v2.md` 🔒  
**Architectuur:** `docs/superpowers/specs/2026-09-13-pakket-h-ai-inhoudsarchitectuur-v2.md` 🔒  
**Productiestandaard-referentie:** H1/H2 in `lesmateriaal/H-ai/` (zes onderdelen · `_pdf_base`)

**HARD STOP deze fase:** geen PDF · geen definitieve screenshots · geen H1/H2 · geen H4 · geen shop/Stripe/Brevo/Vercel · geen technische G/H-laag.

---

## 1. Inhoud — freezebevestiging

### Correcties uitgevoerd (alleen deze twee)

| # | Correctie | Resultaat |
|---|-----------|-----------|
| **1** | Timing → normale uitvoering circa 90 min (85 + overgang) | **JA** |
| **2** | Route C = H2-contract (deelnemer stuurt inhoud; helper mag noodzakelijke bediening) | **JA** |

### Geen andere inhoudelijke wijzigingen

Kern ongewijzigd: VERBETEREN · WAT/INFO/HOE · niet-altijd-alle-drie · voor/na · doorvragen H2 · H2/H4-grenzen · oefeningen · eindmissie · zes onderdelen.

### Explicit frozen

| Onderdeel | Status |
|-----------|--------|
| Functie VERBETEREN | frozen |
| WAT WILT U? → GEEF WAT INFORMATIE → ZEG HOE U HET WILT | frozen |
| Niet-altijd-alle-drie-regel | frozen |
| H2/H4-grenzen | frozen |
| Route A/B/C-contract uit H2 | frozen |
| Oefeninhoud · eindmissie | frozen |
| Timing circa 90 min (eindmissie 10–12 beschermd) | frozen |
| Zes productonderdelen | frozen |

---

## 2. Timing (frozen)

| Blok | Min |
|------|-----|
| Welkom + H2-retrieval | 5 |
| Startsituatie vage vraag | 5 |
| WAT WILT U? | 8 |
| GEEF WAT INFORMATIE | 8 |
| ZEG HOE U HET WILT | 8 |
| Voor/na | 6 |
| Oefenronde 1 | 9 |
| Oefenronde 2 | 11 |
| Oefenronde 3 | 8 |
| Eindmissie | **12** (10–12) |
| Afronding | 5 |
| Subtotaal | **85** |
| Overgang/uitloop | ca. 5 |
| **Totaal** | **circa 90** |

Eindmissie bij tijdnood **beschermen**. Geen extra inhoud.

---

## 3. Visuele strategie H3

H3 toont **niet** hoe Gemini wordt bediend (H2).  
H3 toont **wat** het verschil is tussen een vage en een duidelijkere vraag.

| Middel | Rol |
|--------|-----|
| **SeniorEase VOOR/NA-kaarten** | Centraal · grote vraagteksten · projecteerbaar |
| **Drie-blokken geheugensteun** | WAT · INFO · HOE · tekst dominant · optioneel 1 icoon/blok |
| **Echte Gemini-UI** | Alleen waar voor/na of doorvragen **zichtbaar** wordt |

Geen package-wide iconensysteem bevriezen.

---

## 4. Minimale Gemini-screenshotlijst

### Noodzakelijk

| ID | Doel | Inhoud |
|----|------|--------|
| **H3-S1 · VOOR** | Antwoord ontstaat, sluit nog niet goed aan | Vraag: *Wat kan ik koken?* + **kort** echt Gemini-antwoord |
| **H3-S2 · NA** | Deelnemer ziet het verschil | Verbeterde vraag (avondmaaltijd · aardappelen/broccoli/eieren · max. drie stappen) + **kort** bruikbaar antwoord |

### Aanbevolen (licht)

| ID | Doel | Inhoud |
|----|------|--------|
| **H3-S3 · DOORVRAGEN** | Verbetering kan als vervolgvraag | Bijv. *Maak het korter.* of *Ik heb alleen brood, kaas en tomaat.* + kort effect |

**H3-S3 noodzakelijk?** **NEE — AANBEVOLEN.**  
Reden: S3 versterkt de koppeling met H2-doorvragen, maar H3 blijft didactisch volledig met S1 + S2.  
Als de beamer zonder S3 rustiger is: **weglaten**.

### Niet maken (H2)

Openen · typvak · verzenden · nieuw gesprek · login.

### Aantal

| | |
|--|--|
| **Noodzakelijk** | **2** (H3-S1 · H3-S2) |
| **Aanbevolen totaal** | **3** (+ H3-S3) |

### Screenshotregels (latere productie)

- echte actuele Gemini-UI;  
- neutrale oefentekst · geen PII;  
- relevante crop · groot · projecteerbaar;  
- max. één annotatie per moment indien nodig;  
- antwoord **kort** op beamer (geen muurteksen).

---

## 5. Productieplan (nog niet uitvoeren)

**Doelmap (later):** `lesmateriaal/H-ai/H3-betere-vragen-stellen-aan-ai/`  
**Standaard:** zelfde zesdelige structuur als H1/H2 · hergebruik `lesmateriaal/H-ai/_pdf_base.py`.

| # | Onderdeel | Bron |
|---|-----------|------|
| 1 | START HIER | Inhoud §25 |
| 2 | Draaiboek | Timing §30 · blokken §7–21 |
| 3 | Beamer-PDF | VOOR/NA centraal · drie blokken · H3-S1/S2/(S3) spaarzaam |
| 4 | Hulp bij vastlopen | Matrix §23 |
| 5 | Deelnemerskaart | §24 |
| 6 | Zaalchecklist | §26 |

### Voorgestelde productiestappen (na review)

1. Map H3 + zes markdown-bronnen uit frozen inhoud.  
2. Optionele iconen drie blokken (alleen H3 · niet pakketbreed).  
3. Gemini H3-S1/S2/(S3) · korte crops.  
4. Beamer + print bouwen · render-QA · visuele review.  
5. Distributie: aparte opdracht.

### Bewust niet

- H1/H2 wijzigen of regenereren  
- H2-open-/typvak-dia’s herhalen  
- `oefentaken.md` · aparte nazorgkaart  

---

## 6. Rapportchecklist

| Check | |
|-------|--|
| H3 inhoud frozen | **JA** |
| Timing gecorrigeerd | **JA** |
| Les past circa 90 min | **JA** (85 + overgang) |
| Eindmissie beschermd | **JA** (10–12) |
| Route C gelijk aan H2-contract | **JA** |
| Andere inhoud gewijzigd | **NEE** |
| Functie VERBETEREN frozen | **JA** |
| WAT/INFO/HOE frozen | **JA** |
| H2-grens frozen | **JA** |
| H4-grens frozen | **JA** |
| Minimale Gemini-set bepaald | **JA** |
| Aantal noodzakelijke Gemini-schermen | **2** (S1+S2); aanbevolen **3** met S3 |
| H3-S3 noodzakelijk | **NEE — AANBEVOLEN** (versterkt H2-doorvragen; H3 didactisch volledig met S1+S2) |
| VOOR/NA visueel centraal | **JA** |
| Zes productonderdelen voorbereid | **JA** (plan) |
| PDF-productie gestart | **NEE** |
| H1 gewijzigd | **NEE** |
| H2 gewijzigd | **NEE** |
| Technische G/H-laag gewijzigd | **NEE** |
| Distributie/shop/Stripe/Brevo/Vercel | **NEE** |
| H4 gestart | **NEE** |

---

## 7. STOP

Wacht op review.  
Geen PDF · geen screenshots vastleggen · geen H4 · geen distributie tot aparte opdracht.
