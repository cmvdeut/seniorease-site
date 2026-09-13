# H2 — Productievoorbereiding v1

**Status:** TER REVIEW  
**Datum:** 2026-09-13  
**Fase:** 1B — mini-correctie · inhoud freeze · alleen inventarisatie  
**Inhoud (bindend · frozen):** `docs/superpowers/specs/2026-09-13-h2-een-ai-assistent-gebruiken-inhoud-v2.md` 🔒  
**Architectuur:** `docs/superpowers/specs/2026-09-13-pakket-h-ai-inhoudsarchitectuur-v2.md` 🔒  
**Productiestandaard-referentie:** `lesmateriaal/H-ai/H1-wat-kan-ai-voor-mij-doen/` (zes onderdelen · `_pdf_base` · build-scripts)

**HARD STOP deze fase:** geen PDF · geen screenshots verzamelen · geen H1 · geen H3 · geen shop/Stripe/Brevo/Vercel · geen technische G/H-laag.

---

## 1. Inhoud — freezebevestiging

### Enige correctie (uitgevoerd)

**Oefenronde 1** vervangen:

| | Was | Nu (frozen) |
|--|-----|-------------|
| Startvraag | …rustig uitje op een regenachtige dag | **Geef mij drie ideeën voor een gezellige middag thuis.** |
| Vervolgvraag | …weinig wil lopen | **Welke is het makkelijkst om te organiseren?** |

Reden: zuiver BEDIENEN · geen locatie-/uitjesinformatie die naar H4-broncontrole trekt.

### Geen andere inhoudelijke wijzigingen

Alle overige H2-inhoud ongewijzigd. Status inhoud: **GOEDGEKEURD & BEVROREN** 🔒.

### Explicit frozen

| Onderdeel | Status |
|-----------|--------|
| Functie BEDIENEN | frozen |
| Hoofdroute OPENEN → VRAGEN → ANTWOORD LEZEN → DOORVRAGEN | frozen |
| Nieuw gesprek (aanvullend) | frozen |
| Account/login-contract | frozen |
| Fallback A/B/C · ~2-minutenregel | frozen |
| Helper “Wat ziet u nu?” | frozen |
| H3-grens · H4-grens | frozen |
| Privacyregels | frozen |
| Oefeninhoud (incl. ronde 1) | frozen |
| Eindmissie | frozen |
| Zes productonderdelen · ~90 min | frozen |

---

## 2. Actuele officiële Gemini-webroute (NL)

### Vastgestelde URL (officieel)

| | |
|--|--|
| **Primaire les-URL** | `https://gemini.google.com` |
| **Alternatief / chatpad** | `https://gemini.google.com/app` (zelfde product · vaak zichtbaar na openen/chat) |
| **Bron** | Google Help — Gemini Apps · “Ga naar gemini.google.com” · NL-helpcentrum linkt naar [gemini.google.com](https://gemini.google.com/) |
| **Beschikbaarheid NL** | Nederland staat in de officiële landenlijst van de Gemini web-app · Nederlands is ondersteunde taal |

### Redirect / bereikbaarheid (getest zonder login)

| Test | Resultaat |
|------|-----------|
| `HEAD` `https://gemini.google.com` | **HTTP 200** · geen `Location`-redirectketen waargenomen |
| `HEAD` `https://gemini.google.com/app` | **HTTP 200** · geen redirectketen waargenomen |
| Account aangemaakt / login uitgevoerd | **NEE** (hard verboden in deze fase) |
| Persoonlijke gegevens / wachtwoorden | **Niet** gebruikt of opgeslagen |

**Lesinstructie (START HIER / A4):** deelnemers typen of openen:

> `gemini.google.com`

Niet: app installeren · niet: parallelle Android/iPhone-cursus · niet: niet-officiële mirror-URL’s.

### Gedrag zonder login (vastgesteld + lesgevolg)

| Wat | Vaststelling |
|-----|----------------|
| Site bereikbaar zonder account | **JA** — endpoint antwoordt (200) |
| Volledige chat-UI zonder Google-account | **Niet gegarandeerd** — Google’s consumer Gemini-web verwacht in de praktijk een Google-account voor vragen stellen; zonder login verschijnt vaak een **inlog-/accountprompt** of beperkte landingsweergave |
| Visuele pixel-UI zonder login vastgelegd | **NEE** in deze fase — geen screenshots · geen login · automatische HTML-fetch toont geen bruikbare bedienings-UI |
| Wanneer login gevraagd kan worden | Bij openen of vóór versturen van een vraag · verschilt per browser, cookie-status, eerdere Google-sessie |
| Lesgevolg | Login blijft **geen leerdoel** · bij loginmelding → fallback **B of C** (~2 min · groep gaat door) |

### Verschillen die begeleider kan tegenkomen

- Schermgrootte / browser (Chrome, Edge, Firefox, Safari).  
- Ingelogd vs niet-ingelogd (typvak vs loginprompt).  
- Actuele Gemini-interfacewijzigingen (knoppen/labels/layout).  
- Taal van de interface (Nederlands/Engels).  
- Eventueel model-/abonnementbanner (Advanced) — **niet** behandelen als lesstof.  

**Vaste zin:** *Uw scherm kan er iets anders uitzien. Dat is normaal.*  
Herkenning op **functie** (“Waar typ ik mijn vraag?”), niet op vaste pixelpositie.

### Open voor productiefase (niet blokkerend voor dit rapport)

Vóór definitieve beamer-screenshots: één keer **op een voorbereid les-/organisatie-account of demo-sessie** (buiten deelnemersles · geen wachtwoorden in repo) de UI visueel bevestigen en crops maken. Dat is **screenshot-productie**, niet deze inventarisatiefase.

---

## 3. Minimale screenshotlijst (didactisch)

**Regel:** alleen echte, actuele Gemini-interface · neutrale oefentekst · geen PII · relevante crop · max. één annotatie per instructiemoment · geen nep-UI · SeniorEase-iconen alleen geheugensteun.

**Demo-tekst voor captures (aanbevolen · frozen inhoud):**

- Vraag: *Geef mij drie eenvoudige ideeën voor een maaltijd met aardappelen, broccoli en eieren.*  
- Vervolg: *Welke is het makkelijkst?*  
- Nieuw gesprek: korte neutrale cadeau-vraag (geen privé).

### Functionele behoefte → gecombineerde schermen

| ID | Didactisch doel | Wat op het scherm | Combineert opdracht-items |
|----|-----------------|-------------------|---------------------------|
| **G2-S1** | OPENEN · “Hier typ ik” | Gemini bereikt · **leeg typvak** zichtbaar (crop: typvak + korte context) | 1 · 8 (leeg typvak) |
| **G2-S2** | VRAGEN vóór verzenden | Zelfde typvak met **ingevulde neutrale vraag** · verzendcontrole **herkenbaar** in beeld (één annotatie: versturen **of** typvak — niet beide) | 2 · 3 |
| **G2-S3** | ANTWOORD LEZEN | **Kort** AI-antwoord zichtbaar · eventueel hint scrollen als tekst langer is | 4 |
| **G2-S4** | DOORVRAGEN | Zelfde gesprek · **vervolgvraag** + **vervolgantwoord** (crop die beide herkenbaar maakt; anders S4a/S4b splitsen) | 5 · 6 |
| **G2-S5** | NIEUW GESPREK starten | Controloocatie **Nieuw gesprek / New chat** (of actueel equivalent) herkenbaar | 7 |
| **G2-S6** | Opnieuw beginnen | **Leeg** nieuw gesprek · typvak klaar (als S1 visueel te verschillend is van “na nieuw gesprek”; anders S1 hergebruiken) | 8 |

### Aantal benodigde Gemini-schermen

| | |
|--|--|
| **Minimaal (streven)** | **5** — als S6 = hergebruik S1 na nieuw gesprek |
| **Realistisch veilig** | **6** (G2-S1 t/m G2-S6) |
| **Alleen splitsen indien nodig** | S4 → S4a (vervolgvraag ingevuld) + S4b (vervolgantwoord) als één crop onleesbaar wordt op beamer |

**Niet maken (geen didactisch doel voor H2):** accountkeuzeschermen · cookie-popups als leskern · geschiedenis/zijbalk-beheer · modelkiezer · Advanced-upsell · app-store · ChatGPT-schermen.

### Annotatie / beamer

- Max. **één** duidelijke pijl/nummer per instructiedia.  
- Crop groot genoeg · geen volledige browserchrome-rommel.  
- Functie > pixelpositie.

---

## 4. Productieplan (nog niet uitvoeren)

**Doelmap (later):** `lesmateriaal/H-ai/H2-een-ai-assistent-gebruiken/`  
**Standaard:** zelfde zesdelige structuur als H1 · hergebruik `lesmateriaal/H-ai/_pdf_base.py` waar technisch relevant · eigen `build_pdf.py` / `build_beamer.py`.

| # | Onderdeel | Broninhoud | Productie-aantekening |
|---|-----------|------------|------------------------|
| 1 | **START HIER** | Inhoud §24 | ~1 A4 · URL `gemini.google.com` · fallback A/B/C · geen accountcreatie · helperregel · miniwoordenlijst |
| 2 | **Draaiboek** | §10–18 · §26 | Blokken met situatie/doel/zegt/laat zien/doet/tijd/check/helper · oefenronde 1 = middag thuis |
| 3 | **Beamer-PDF** | §27 + screenshots G2-S1… | Echte Gemini-crops · dia-architectuur uit inhoud · geen methodenaam op deelnemersdia’s |
| 4 | **Hulp bij vastlopen** | §22 matrix A–H | Login → B/C · “Wat ziet u nu?” |
| 5 | **Deelnemerskaart** | §23 | Route + woorden + schermzin + privacy + “kan fout zijn” |
| 6 | **Zaalchecklist** | §25 | Gemini bereikbaar · route getest · fallbackapparaat |

### Voorgestelde productiestappen (na review-goedkeuring)

1. Map H2 aanmaken · zes markdown-bronnen schrijven uit frozen inhoud.  
2. Screenshots G2-S1…S6 maken op actuele Gemini (neutrale tekst · geen PII).  
3. Beamer bouwen · print/START HIER-set bouwen (H1-achtige pipeline).  
4. Render-QA · visuele review producteigenaar.  
5. Pas daarna: eventuele distributie-cutover (aparte opdracht · niet H2-inhoud).

### Bewust niet in dit plan

- `oefentaken.md` · aparte nazorgkaart  
- H1-wijziging · G1–G4 tech  
- Shop / Stripe / fulfillment  

---

## 5. Rapportchecklist

| Check | |
|-------|--|
| H2 inhoud frozen | **JA** |
| Enige inhoudscorrectie uitgevoerd | **JA** (oefenronde 1) |
| Andere inhoud gewijzigd | **NEE** |
| Hoofdroute frozen | **JA** |
| Account/fallback frozen | **JA** |
| H3/H4-grenzen frozen | **JA** |
| Actuele officiële Gemini-route vastgesteld | **JA** |
| Exacte URL | **`https://gemini.google.com`** (chatpad ook: `https://gemini.google.com/app`) |
| Gedrag zonder login vastgesteld | **JA** (bereikbaar; chat niet gegarandeerd zonder account → fallback) |
| Minimale screenshotlijst compleet | **JA** |
| Aantal benodigde Gemini-schermen | **5–6** (veilig: **6**; streef combineer: **5**) |
| Zes productonderdelen voorbereid | **JA** (plan · nog niet geproduceerd) |
| PDF-productie gestart | **NEE** |
| H1 gewijzigd | **NEE** |
| Technische G/H-laag gewijzigd | **NEE** |
| Shop/Stripe/Brevo/Vercel gewijzigd | **NEE** |

---

## 6. STOP

Wacht op visuele/productiereview.  
Geen PDF · geen screenshots vastleggen · geen H3 · geen distributie tot aparte opdracht.
