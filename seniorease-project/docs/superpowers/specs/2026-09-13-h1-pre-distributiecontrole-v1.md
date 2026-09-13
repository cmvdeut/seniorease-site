# H1 — PRE-DISTRIBUTIECONTROLE V1

**Status:** GOEDGEKEURD & BEVROREN 🔒  
**Datum controle:** 2026-09-13  
**Datum besluiten + freeze:** 2026-09-13  
**Fase 4A:** READ-ONLY inventarisatie + pre-distributiecontrole  
**Fase 4B:** Producteigenaarbesluiten + Git-baseline freeze  

**Inhoud:** H1 INHOUD V2.0 — GOEDGEKEURD & BEVROREN 🔒  
**Productie:** H1 PRODUCTIE V2.0 — GOEDGEKEURD & BEVROREN 🔒  
(`lesmateriaal/H-ai/H1-wat-kan-ai-voor-mij-doen/GOEDGEKEURD.md`)

**HARD tot aparte cutover-opdracht:** geen inhoud/layout-wijziging · geen cutover · geen sync · geen push/deploy · geen Stripe/Brevo/storage-writes · geen shop/fulfillment-wijziging.

---

## 0. Producteigenaarbesluiten (fase 4B) — BEVROREN

### 0.1 Historische kopers — JA

**BESLUIT: JA** — historische kopers mogen bij een toekomstige download de nieuwe H1 ontvangen zodra `g1-print` / `g1-beamer` naar de goedgekeurde H1-assets wijzen.

Geldt o.a. voor bestaande rechten via:

- `pakket_pakket-g`  
- `pakket_pakket-h-ai`  
- `los_g1`  
- `compleet_org`  

**Motivering:** H1 is de vernieuwde eerste AI-les binnen dezelfde AI-productfamilie.  
**Geen** aparte oude G1-v1 distributielaag behouden.  
Technische fileIds blijven ongewijzigd.

### 0.2 Gemini-webroute — geen productieblocker

Afwezigheid van een harde Gemini-URL in de klant-PDF’s is **geen** productieblocker.  
Bevroren H1-PDF’s worden hiervoor **niet** gewijzigd.

Operationeel vereist H1 dat de begeleider vóór de les Gemini-web opent, de actuele route test, en die beschikbaar heeft.

**Gate G:** PASS — *Operationele voorbereidingsvoorwaarde. Geen wijziging van de bevroren H1-productie vereist.*  
Geen URL verzinnen · geen webonderzoek · geen PDF-regeneratie.

### 0.3 Cutover-richting — vastgelegd, niet uitgevoerd

**Voorkeur:** bestaande technische bron/sync-mapping expliciet naar goedgekeurde H1-productie leiden:

- H1 print → technische G1 → `g1-print`  
- H1 beamer → technische G1 → `g1-beamer`  

Technische identifiers blijven behouden.

**Niet** als structurele oplossing:

- A. H1 dupliceren onder kunstmatige oude G-ai/G1-bestandsnamen  
- B. Alleen private `g1-*.pdf` handmatig overschrijven  

Reden: sync moet reproduceerbaar naar de nieuwe H1-bron wijzen.  
**Nog geen cutover uitgevoerd.**

### 0.4 Shoptekst — latere cutovertaak (niet nu)

Klantgericht later:

- `displayCode`: **H1**  
- titel: **Wat kan AI voor mij doen?**  

Technisch intern behouden: **G1** · `g1-print` · `g1-beamer` · `los_g1`.  
**Nog geen shopcode gewijzigd in fase 4B.**

---

## 1. Executive summary

De nieuwe H1-productie (8-pagina print · 23-dia beamer) is **hashbaar en product-klaar**, maar **nog niet aangesloten** op de live fulfillment-laag.

Live levert de eerste AI-les nog steeds uit via **technische G1** / **fileIds `g1-print` · `g1-beamer`**, met bron/sync onder `lesmateriaal/G-ai/G1-wat-is-ai/` en private storage `private/lesmateriaal-downloads/pakket-g/`. Canonical shop-slug is **`pakket-h-ai`** (entitlement **AI_H**); legacy **`pakket-g`** is alias van **dezelfde** AI-familie — **niet** mobiel Pakket G.

**Historische koper-upgrade:** **BESLOTEN JA** (fase 4B) — zie §0.1.

**Resterend vóór live cutover (aparte opdracht):**

1. Git-baseline van goedgekeurde H1 (fase 4B).  
2. Cutover volgens §0.3 (bron/sync → H1 · fileIds gelijk).  
3. Optioneel shoptekst §0.4.

**STOP na fase 4B:** wacht op aparte opdracht **H1 DISTRIBUTIE-CUTOVER**.

---

## 2. Nieuwe H1 baseline + hashes

### Productiemap

`lesmateriaal/H-ai/H1-wat-kan-ai-voor-mij-doen/`

### Definitieve PDF’s (goedgekeurd)

| | Bestand | Pagina’s | Bytes | Laatste schrijf (lokaal) |
|--|---------|----------|-------|---------------------------|
| Print | `pdf/SeniorEase-H1-Wat-kan-AI-voor-mij-doen-v2.pdf` | **8** | 705965 | 2026-09-13 16:38:42 |
| Beamer | `beamer/SeniorEase-H1-Beamer-v2.pdf` | **23** | 714806 | 2026-09-13 16:39:44 |

### SHA-256 — distributie-integriteitsbaseline

| Asset | SHA-256 |
|-------|---------|
| **H1 print** | `3e2d740666f5a377d0bd41731eb37f728ffce68ce5c281bb52dddb25b3291a52` |
| **H1 beamer** | `a9d1485bcf406b3ce388cfc218fa8b34eee4d0e52a4597bbb39c8c4df1f54489` |

Deze fase heeft de PDF’s **niet** gewijzigd (alleen gelezen / gehasht).

### Zes brononderdelen + freeze

1. `start-hier.md`  
2. `draaiboek.md`  
3. Beamer (`build_beamer.py` → beamer-PDF)  
4. `hulp-bij-vastlopen.md`  
5. `deelnemerskaart.md`  
6. `zaalchecklist.md`  

Plus: `GOEDGEKEURD.md` · iconen A–D in `assets/icons/` · versie **v2.0**.

---

## 3. Huidige oude AI/G1 technische mapping

### Bronmap (READ-ONLY)

`lesmateriaal/G-ai/G1-wat-is-ai/`

Aangetroffen PDF’s (geen v2 aanwezig):

| | Bestandsnaam | SHA-256 | Bytes |
|--|--------------|---------|-------|
| Print | `pdf/SeniorEase-G1-Wat-Is-AI-v1.pdf` | `6bb4f7c77c6df34220b03411be66e03d8cd5aabe9c962f6ec862bdaa27c58c76` | 690126 |
| Beamer | `beamer/SeniorEase-G1-Beamer-v1.pdf` | `c372e5b43b9d557f65b0e899c42998022c4d48eacb3c9c2d2d68b8db1c6e8ab3` | 1128360 |

Catalogus/sync verwachten **`SeniorEase-G1-Wat-Is-AI-v2.pdf` / `SeniorEase-G1-Beamer-v2.pdf`**; sync valt terug op v1 als v2 ontbreekt (`scripts/sync-lesmateriaal-downloads.js`).

### Live private storage (uitgeleverd)

`private/lesmateriaal-downloads/pakket-g/`

| fileId | Relatief pad | SHA-256 (huidig) | = bron G1-v1? |
|--------|--------------|------------------|---------------|
| `g1-print` | `pakket-g/g1-print.pdf` | `6bb4f7c7…c58c76` | **JA** |
| `g1-beamer` | `pakket-g/g1-beamer.pdf` | `c372e5b4…e8ab3` | **JA** |

≠ nieuwe H1-hashes (**cutover nog niet uitgevoerd**).

Private PDF’s staan in `.gitignore` (`private/lesmateriaal-downloads/**/*.pdf`) — rebuild via sync/prebuild.

### Technische codes & labels

| Veld | Waarde |
|------|--------|
| Technische lescode | **G1** |
| fileIds | **`g1-print` · `g1-beamer`** |
| PACKAGE_SOURCE slug | **`pakket-g`** |
| Bronfolder | `G-ai` / `G1-wat-is-ai` |
| Klantlabel (via `pakket-h-ai`) | display = technische `G1` (geen `displayCode` H1) · titel shop: **“Wat is AI?”** |

### Antwoorden A–F (huidige live eerste AI-les)

| Vraag | Antwoord |
|-------|----------|
| **A. Uitgeleverde bestanden** | `g1-print.pdf` · `g1-beamer.pdf` (inhoud = oude G1 v1 “Wat is AI?”) |
| **B. Technische lesson code** | **G1** |
| **C. fileIds** | **`g1-print` · `g1-beamer`** |
| **D. Storage-/bronpaden** | Storage: `private/lesmateriaal-downloads/pakket-g/` · Sync-bron: `lesmateriaal/G-ai/G1-wat-is-ai/{pdf,beamer}/SeniorEase-G1-*-v2.pdf` (fallback v1) |
| **E. ZIP mapping** | `zip-pakket-h-ai` / `zip-pakket-g` → `assetsForSlug` → storage `pakket-g` → o.a. g1–g4 · `zip-compleet` dedupt op storage-slug |
| **F. Download/mail/order** | Token bevat `fileId` · `order-status` / Brevo bouwen signed URL’s · `GET /api/lesmateriaal/download` → `findAssetByFileId` → **huidig** bestand op schijf |

---

## 4. Canonical / legacy contract

| Slug | Rol | Storage | Entitlement |
|------|-----|---------|-------------|
| **`pakket-h-ai`** | Canonical shop AI | alias → **`pakket-g`** | **AI_H** |
| **`pakket-g`** | Legacy alias, zelfde AI-familie | **`pakket-g`** (zichzelf) | **AI_H** |
| `pakket-g-telefoon` | Canonical mobiel internet | → `pakket-f-telefoon` | **MOBILE_G** |

Redirect (bestaand, niet gewijzigd): `/lesmateriaal/pakket-g` → `/lesmateriaal/pakket-h-ai` (**nooit** mobiel).

Checkout-refs (pattern):

- Canonical pakket: `pakket_pakket-h-ai`  
- Legacy pakket: `pakket_pakket-g` → zelfde AI_H assets  
- Los: `los_g1`  
- Compleet: `compleet_org`

**Canonical vs legacy semantiek:** **PASS** — `pakket-g` blijft AI; `pakket-g-telefoon` is MOBILE_G.

---

## 5. Historische koperimpact

### Wat gebeurt er bij latere asset-vervanging?

**JA — productbeslissing vereist.**

Als `g1-print` / `g1-beamer` later de nieuwe H1-PDF’s bevatten, krijgen bestaande/historische kopers van:

- `pakket_pakket-g` / `pakket_pakket-h-ai`  
- `los_g1`  
- `compleet_org` (onderdeel AI)

bij **nieuwe downloads** (geldige signed URL of vernieuwde links) **de nieuwe H1**, niet de oude “Wat is AI?”-les.

### Versie vastgezet of altijd actueel?

| Mechanisme | Gedrag |
|------------|--------|
| Download-token | Bevat `fileId|orderId|email|exp` — **geen** content-hash / versie |
| Download-route | Lost `fileId` op naar **actueel** bestand onder `private/…` |
| E-mail | Stuurt tokens met dezelfde `fileId`s |

Conclusie: downloads zijn **fileId-live**, niet pin-naar-oude-bytes.  
Vervanging van private assets = **inhoudelijke upgrade voor alle toekomstige downloads** van dat fileId.

**NIET besloten in dit rapport** of dat gewenst is.

---

## 6. Losse les

| Veld | Huidig |
|------|--------|
| Reference | **`los_g1`** |
| Entitlement/assets | Via `assetsForLesson('g1')` → `g1-print` · `g1-beamer` |
| Shop technical code | `G1` in `pakket-h-ai.lessons` |
| `los_h1` | **Bestaat niet** in `PACKAGE_SOURCE` — zou **lege/geen** assets geven |

**Bij latere H1-cutover (zonder fileId-wijziging):**  
Nieuwe aankoop `los_g1` krijgt automatisch nieuwe H1-bestanden zodra private `g1-*` (via sync) H1 bevatten.  
Shop-titel/display (`Wat is AI?` · zichtbare `G1`) is een **aparte** tekst/mapping-opdracht — niet nodig om fileIds te breken.

---

## 7. Compleet / organisatie / ZIP

| Bundel | Gedrag t.o.v. eerste AI-les |
|--------|------------------------------|
| `compleet_org` | Loopt `LESMATERIAAL_PAKKETTEN` · dedupe op **storage-slug** · AI één keer via `pakket-h-ai` → storage `pakket-g` → g1–g4 |
| `zip-compleet` | Idem, alle pakketten dedupt |
| `zip-pakket-h-ai` | Assets van storage `pakket-g` (g*) |
| `zip-pakket-g` | Zelfde storage-assets (legacy slug) |

ZIP-entrynamen gebruiken fileId-afgeleide code → **`G1`** in bestandsnaam (`SeniorEase-G1-Lesmateriaal.pdf`), mapnaam klantgericht via `pakket-h-ai` (“H - …”).

**Dubbele oude G1 + nieuwe H1:** niet automatisch, zolang er **één** storage-pad `pakket-g/g1-*` blijft. Risico ontstaat pas bij **extra** fileIds/paden zonder dedupe — dat is nu niet zo.

---

## 8. Gemini-webroute

### In goedgekeurde H1-bestanden

| Bron | Bevinding |
|------|-----------|
| Print-PDF | Instructie: “Gemini-web getest · **URL op A4**” · checklist “Exacte URL op A4 beschikbaar” · **geen** `http(s)` · **geen** `gemini.google…` |
| Beamer-PDF | “Google Gemini als voorbeeld” · **geen** concrete URL |
| `start-hier.md` / `zaalchecklist.md` | Zelfde: vooraf testen · URL op A4 · uitvoeringspunt |

### Conclusie

**B — alleen instructie** dat de begeleider de actuele Gemini-webroute vooraf klaarzet.  
**Geen concrete Gemini-URL** in de definitieve klantbestanden.

### Fase 4B — producteigenaar

**Geen productieblocker.** Bevroren H1-PDF’s blijven ongewijzigd.  
**Gate G: PASS** — operationele voorbereidingsvoorwaarde; geen wijziging van bevroren H1-productie vereist.  
Geen URL verzinnen · geen webonderzoek · geen PDF-regeneratie.

---

## 9. Klantbenaming (nieuwe H1-PDF’s)

| Check | Print | Beamer |
|-------|-------|--------|
| Pakket H | **JA** (print) | niet in extract (beamer is deelnemersdia’s) |
| H1 | **JA** | **JA** |
| Wat kan AI voor mij doen? | **JA** | **JA** |
| Pakket G (klant) | **NEE** | **NEE** |
| Technische G1 zichtbaar | **NEE** | **NEE** |
| “docent” | **NEE** | **NEE** |
| v1 | **NEE** | **NEE** |
| placeholders / TODO | **NEE** | **NEE** |
| vaste prijs / € | **NEE** | **NEE** |

**Klantbenaming PDF’s:** **PASS**

**Let op (shop, buiten PDF-freeze):**  
`app/lesmateriaal/lesmateriaal-data.ts` toont voor `pakket-h-ai` nog lessen **G1–G4** met titel **“Wat is AI?”** e.d. Dat is **geen** PDF-fout, wel een **aparte pre-/post-cutover shoptekst-beslissing**.

---

## 10. Exact toekomstige distributiemapping

Concept zonder aannames — op basis van gevonden contracten:

| NIEUW GOEDGEKEURD | TOEKOMSTIG TECHNISCH DOEL (huidige live contract) |
|-------------------|--------------------------------------------------|
| H1 print `SeniorEase-H1-Wat-kan-AI-voor-mij-doen-v2.pdf` | fileId **`g1-print`** → `private/lesmateriaal-downloads/pakket-g/g1-print.pdf` |
| H1 beamer `SeniorEase-H1-Beamer-v2.pdf` | fileId **`g1-beamer`** → `private/lesmateriaal-downloads/pakket-g/g1-beamer.pdf` |
| Klantgericht H1 | Technische code blijft **G1** (tenzij latere opdracht fileIds/codes wijzigt) |
| Pakket-aankoop | `pakket_pakket-h-ai` (canonical) · legacy `pakket_pakket-g` |
| Losse aankoop | `los_g1` |
| Compleet / ZIP | zelfde `g1-*` via storage-dedupe |

### G — kan zonder fileIds / orders / legacy te breken?

| Eis | Haalbaar? |
|-----|-----------|
| fileIds niet wijzigen | **JA** — inhoud achter `g1-print`/`g1-beamer` vervangen |
| historische orders niet breken | **JA** technisch (tokens blijven werken) · **inhoudelijk** wel upgrade → productbeslissing |
| legacy `pakket-g` niet breken | **JA** — blijft AI_H alias |
| G1-semantiek niet onveilig wijzigen | **JA** als G1 = “eerste AI-les” blijft; **NEE** als G1 semantisch “Wat is AI?”-definitieles moet blijven |

### H — wat synchroniseren bij latere cutover (opties, niet uitvoeren)

1. **Bronpad-wijziging** in `PACKAGE_SOURCE` + `sync-lesmateriaal-downloads.js` naar `H-ai/H1-…` bestandsnamen, daarna sync → private `g1-*`.  
2. **Of** H1-PDF’s plaatsen/hernoemen onder verwachte G-ai v2-namen, daarna sync.  
3. **Of** alleen private `g1-*.pdf` overschrijven — werkt tot volgende sync opnieuw uit G-ai v1/v2 trekt.

Na cutover: hashes van uitgeleverde `g1-print`/`g1-beamer` **moeten** gelijk zijn aan H1-baseline hierboven.

---

## 11. Git / worktree

| Veld | Waarde |
|------|--------|
| Branch | `main` (tracks `origin/main`) |
| HEAD | `3763e08761a20cdb7099e365e02be10d3af27673` — `fix: align A-H shop copy and close G live download gate` |
| `lesmateriaal/H-ai/` tracked | **0 bestanden** |
| `lesmateriaal/H-ai/` | **untracked** (`?? lesmateriaal/H-ai/`) |
| Specs | o.a. `?? docs/superpowers/specs/2026-09-13-h1-…` · `?? …pakket-h-ai-inhoudsarchitectuur-v2.md` |
| Commit/push deze fase | **Niet uitgevoerd** |

### Markering

**BLOCKER VÓÓR DISTRIBUTIE — GIT-BASELINE:**  
Goedgekeurde H1-productie staat **nog niet veilig in Git**.  
Aparte commit-opdracht nodig vóór of als eerste stap van distributie-cutover.

---

## 12. Externe systemen

Deze fase: **repository-read-only**. Geen writes naar Stripe · Vercel · Brevo · storage · shop · productie.

### Latere externe verificatie (na cutover-opdracht)

| Wat | Waarom |
|-----|--------|
| Vercel deploy + `sync:lesmateriaal-downloads` / prebuild | Bevestigen dat private `g1-*` op runtime de H1-hashes hebben |
| Testorder `pakket_pakket-h-ai` / `los_g1` | Download-bytes ↔ baseline-hashes |
| Brevo-mail links | Zelfde fileIds, nieuwe content |
| Stripe Payment Links | Alleen als shop/reference-tekst wijzigt (niet nodig puur voor asset-replace) |

---

## 13. Gates A–I

| Gate | Onderwerp | Uitslag |
|------|-----------|---------|
| **A** | Nieuwe H1 PDF’s definitief en hashbaar | **PASS** |
| **B** | Technische eerste-AI-les mapping volledig bekend | **PASS** |
| **C** | Canonical `pakket-h-ai` / legacy `pakket-g` semantiek veilig | **PASS** |
| **D** | Historische koperimpact | **PASS** + **BESLOTEN JA** (fase 4B · §0.1) |
| **E** | Losse H1 mapping bekend (`los_g1`) | **PASS** |
| **F** | Compleet/ZIP-impact bekend | **PASS** |
| **G** | Gemini voorbereiding | **PASS** — operationele voorbereidingsvoorwaarde; geen wijziging bevroren H1-productie |
| **H** | Klantbenaming schoon (H1-PDF’s) | **PASS** |
| **I** | Git-baseline veilig | **PASS** na fase-4B-commit (zie post-commit) |

---

## 14. Blockers

**Gesloten in fase 4B:**

1. ~~Git-baseline~~ — commit goedgekeurde H1-productie + frozen specs.  
2. ~~Gemini-URL als productieblocker~~ — herclassificeerd als operationele voorwaarde (Gate G PASS).  
3. ~~Historische koper-beslissing~~ — **JA** (§0.1).  
4. ~~Cutover-richting~~ — vastgelegd (§0.3); uitvoering later.

**Open tot aparte cutover-opdracht:**

1. Bron/sync naar H1 leiden · private `g1-*` hash-gate.  
2. Shoptekst displayCode H1 / titel (§0.4).  

**Geen blocker:** fileIds wijzigen · legacy `pakket-g` semantiek · ZIP-dedupe · aparte G1-v1-laag.

---

## 15. Exact aanbevolen volgende stap

Aparte opdracht: **H1 DISTRIBUTIE-CUTOVER** volgens §0.3 (bron/sync → H1 · fileIds gelijk · hash-gate) + optioneel shoptekst §0.4.  
Geen H2. Geen push/deploy zonder expliciete opdracht.

---

## Rapport-einde

**Fase 4A/4B:** controle + besluiten + Git-baseline.  
**Geen cutover. Geen sync. Geen push. Geen deploy. Geen H2.**

Wacht op review / cutover-opdracht door producteigenaar.
