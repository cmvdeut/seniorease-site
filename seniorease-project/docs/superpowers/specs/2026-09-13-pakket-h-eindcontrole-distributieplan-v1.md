# Pakket H — Eindcontrole + distributieplan v1

**Status:** TER REVIEW  
**Datum:** 2026-09-13  
**Fase:** 3A — inventariseren en plan maken · **NIETS GEWIJZIGD**  
**Doel:** cutover H2–H4 voorbereiden · H1 behouden · pakketbrede distributie later

**Bindend:**  
- Architectuur: `docs/superpowers/specs/2026-09-13-pakket-h-ai-inhoudsarchitectuur-v2.md` 🔒  
- H1-cutover: commit `9036821c46329094d806b57c1a72f62ce3d514be` 🔒  
- H1–H4 productie: `lesmateriaal/H-ai/H*/GOEDGEKEURD.md` 🔒  

---

## 0. Samenvatting

| Laag | Status |
|------|--------|
| H1–H4 inhoud + productie frozen | **JA** |
| H1 distributie-cutover (bytes + mapping) | **JA** (behouden) |
| H2–H4 distributie-cutover | **NEE** — nog oude G-bytes via v1-fallback |
| Customer-facing H2–H4 lesnamen | **NEE** — nog oude G-titels |
| Live byte-verification H1–H4 | **NEE** — wacht op geldige live entitlement |
| Code/sync/shop in 3A gewijzigd | **NEE** |

**Geen hard page-count blocker.** H2/H3/H4 aantallen matchen verwachting.

**Belangrijkste 3B-voorwaarden:**  
1. baseline-commit van frozen H2–H4 PDF’s (nu **untracked**);  
2. expand/verify/cutover source-mapping G2–G4 → H2–H4;  
3. customer-facing labels H1–H4;  
4. hash-gates + regressietests;  
5. live byte-gate apart (blokkeert niet code-freeze, wel “live verified”-claim).

---

## 1. PAKKET H FROZEN

| Les | Inhoud | Productie | GOEDGEKEURD.md |
|-----|--------|-----------|----------------|
| H1 | JA 🔒 | JA 🔒 | **JA** |
| H2 | JA 🔒 | JA 🔒 | **JA** |
| H3 | JA 🔒 | JA 🔒 | **JA** |
| H4 | JA 🔒 | JA 🔒 | **JA** |

---

## 2. PDF BASELINE (bron · frozen productie)

### H1 (reeds in distributie · hashes MATCH private)

| | Pad | Pagina’s | SHA-256 |
|--|-----|----------|---------|
| Print | `lesmateriaal/H-ai/H1-wat-kan-ai-voor-mij-doen/pdf/SeniorEase-H1-Wat-kan-AI-voor-mij-doen-v2.pdf` | **8** | `3e2d740666f5a377d0bd41731eb37f728ffce68ce5c281bb52dddb25b3291a52` |
| Beamer | `…/beamer/SeniorEase-H1-Beamer-v2.pdf` | **23** | `a9d1485bcf406b3ce388cfc218fa8b34eee4d0e52a4597bbb39c8c4df1f54489` |

Private `pakket-g/g1-print.pdf` / `g1-beamer.pdf`: **exact dezelfde hashes**. H1 niet opnieuw cutoveren.

### H2

| | Pad | Pagina’s | SHA-256 |
|--|-----|----------|---------|
| Print | `lesmateriaal/H-ai/H2-een-ai-assistent-gebruiken/pdf/SeniorEase-H2-Een-AI-assistent-gebruiken-v2.pdf` | **8** | `f87db31cd768e2dcb49528a2e2e8e40b3ac1a3312a9dd21745f6c04fd6a15b2c` |
| Beamer | `…/beamer/SeniorEase-H2-Beamer-v2.pdf` | **24** | `216903cd1f4219c26075a1ea4eb24e214aae7f48c4c36d9415f2e2f2dd720c4f` |

Verwacht 8/24: **MATCH**. Productie frozen: **JA**.

### H3

| | Pad | Pagina’s | SHA-256 |
|--|-----|----------|---------|
| Print | `lesmateriaal/H-ai/H3-betere-vragen-stellen-aan-ai/pdf/SeniorEase-H3-Betere-vragen-stellen-aan-AI-v2.pdf` | **7** | `0ee16c7d67f9509986946221d1797bbda11ca25c62ef8f35cff8ebd88c9f8744` |
| Beamer | `…/beamer/SeniorEase-H3-Beamer-v2.pdf` | **23** | `919d426ce35aeedee453b2c6d2d2619c0d3fc9291709fac48aa0f6f9dba344f6` |

Verwacht 7/23: **MATCH**. Productie frozen: **JA**.

### H4

| | Pad | Pagina’s | SHA-256 |
|--|-----|----------|---------|
| Print | `lesmateriaal/H-ai/H4-ai-antwoorden-controleren-en-veilig-gebruiken/pdf/SeniorEase-H4-AI-antwoorden-controleren-en-veilig-gebruiken-v2.pdf` | **7** | `afcf65e2c1acd9ddbc07bfc8812a1a2d63b21e01b1de8abe22d0b76390400782` |
| Beamer | `…/beamer/SeniorEase-H4-Beamer-v2.pdf` | **31** | `fc634a8f2f3918216bb30cd1c07c69e102c59fe59a3d59571e0c8cefa3092066` |

Verwacht 7/31: **MATCH**. Productie frozen: **JA**.

---

## 3. TECHNISCH — actuele code (geverifieerd)

### Slugs / entitlements

| Rol | Waarde | Status |
|-----|--------|--------|
| Canonical AI | `pakket-h-ai` → entitlement **AI_H** · storage **`pakket-g`** | OK |
| Legacy AI | `pakket-g` → **AI_H** · storage `pakket-g` | OK |
| Canonical mobile G | `pakket-g-telefoon` → **MOBILE_G** · storage **`pakket-f-telefoon`** | OK |
| Legacy mobile | `pakket-f-telefoon` → MOBILE_G | OK |
| Redirect | `/lesmateriaal/pakket-g` → `/lesmateriaal/pakket-h-ai` | OK (nooit mobiel) |
| Redirect | `/lesmateriaal/pakket-f-telefoon` → `/lesmateriaal/pakket-g-telefoon` | OK |

### Technische AI-codes / fileIds (behouden)

| Customer | Tech code | fileIds | Purchase ref |
|----------|-----------|---------|--------------|
| H1 | G1 | `g1-print` · `g1-beamer` | `los_g1` |
| H2 | G2 | `g2-print` · `g2-beamer` | `los_g2` |
| H3 | G3 | `g3-print` · `g3-beamer` | `los_g3` |
| H4 | G4 | `g4-print` · `g4-beamer` | `los_g4` |
| Pakket | — | 8× g* | `pakket_pakket-h-ai` |
| Legacy pakket | — |zelfde 8× g* | `pakket_pakket-g` |
| Compleet | — | alle pakketten (storage-dedupe) | `compleet_org` |

**Geen `los_h*`** — historisch `los_g*` blijft.

### PACKAGE_SOURCE — huidige mapping

Bestanden: `lib/lesmateriaal-fulfillment.ts` · `scripts/sync-lesmateriaal-downloads.js` (spiegel).

| Les | Huidige bron | Distributie-bytes nu |
|-----|--------------|----------------------|
| G1/H1 | `H-ai/H1-…` · H1-v2 PDF’s | **H1 frozen** |
| G2 | `G-ai/G2-ai-gebruiken` · vraagt `*-v2.pdf` | **v1-fallback** → oude G2 |
| G3 | `G-ai/G3-goede-vragen` · vraagt `*-v2.pdf` | **v1-fallback** → oude G3 |
| G4 | `G-ai/G4-ai-veilig` · vraagt `*-v2.pdf` | **v1-fallback** → oude G4 |

### Oude G2–G4 baseline (private + bron)

| fileId | SHA-256 | Private MATCH | Bron (v1) |
|--------|---------|---------------|-----------|
| g2-print | `091ca37ad2a98ccc7ef1eb87bb49b0f9c334d0024c8b1e8b8f691bb14a026760` | **JA** | `G-ai/…/SeniorEase-G2-AI-Gebruiken-v1.pdf` |
| g2-beamer | `522bf077bfcaaaec7d744c09a50dcc0f3bc9563d82cd9c325b4fb7b5713c65ef` | **JA** | v1 beamer |
| g3-print | `d40dcebffe4f201ab92159e4910bad916891b38293017551de0156618224b8fc` | **JA** | v1 |
| g3-beamer | `0eb5ffb86ced6aba39a57e98d4a626a0e9411b148efaf5ef333053715ff00fa4` | **JA** | v1 |
| g4-print | `bf3d5f963134824a1c07bc46663e6b33dc1031622fcdc0d62a8047afffc7fb7a` | **JA** | v1 |
| g4-beamer | `5af7827115bf4058035c670e036ca35ac9cd933c92f4170293000495ee92fc77` | **JA** | v1 |

**v1-fallback status:** actief voor G2–G4 (geen G*-v2 PDF in G-ai; sync valt terug op v1).  
Na H2–H4-cutover: mapping naar H-ai · geen G-v1 meer voor AI-download.

### Historische kopers

Besluit bevestigd: **bestaande AI-kopers krijgen nieuwe H1–H4** via dezelfde fileIds/`los_g*`/`pakket_pakket-g`.  
Geen aparte oude customer-distributielaag. Technisch `g*` / `los_g*` behouden.

---

## 4. CUSTOMER-FACING

### Shopstructuur

| Check | Status |
|-------|--------|
| Exact één `pakket-g-telefoon` (mobiel G) | **JA** |
| Exact één `pakket-h-ai` (AI H) | **JA** |
| Geen zichtbare oude AI-“Pakket G”-kaart in shop | **JA** (legacy `pakket-g` alleen compat, niet in `listShopPakketten`) |

### Pakket H-kaart (`app/lesmateriaal/lesmateriaal-data.ts`)

| Veld | Nu | Doel na cutover |
|------|-----|-----------------|
| slug | `pakket-h-ai` | behouden |
| title | **AI voor dagelijks gebruik** | **AI in het dagelijks leven** (productnaam) |
| H1 | displayCode H1 · titel OK | behouden |
| H2 | code G2 · **geen** displayCode · titel *AI openen en gebruiken* | displayCode **H2** · *Een AI-assistent gebruiken* |
| H3 | G3 · *Goede vragen stellen* | **H3** · *Betere vragen stellen aan AI* |
| H4 | G4 · *AI veilig gebruiken* | **H4** · *AI-antwoorden controleren en veilig gebruiken* |
| includes | nog *Oefentaken* · *Nazorgkaart* | aligneren op zes H-onderdelen (geen oefentaken/nazorg) |
| prijs | `PAKKET_PRIJS` 19,95 · `LOSSE_LES_PRIJS` 6,95 · compleet 149 | **niet wijzigen** |
| checkout | `pakket_pakket-h-ai` · `los_g1`…`los_g4` | behouden |

### Customer-facing checklist

| | |
|--|--|
| shop correct (slugs/kaarten) | **DEELS** — structuur OK · AI-titels/ondertitel/includes verouderd |
| H1 correct | **JA** |
| H2 correct | **NEE** |
| H3 correct | **NEE** |
| H4 correct | **NEE** |
| old G labels remaining | `lesmateriaal-data.ts` (shop + legacy `pakket-g`): G2–G4 titels; ZIP-entrycodes `SeniorEase-G#-*` (technisch, bewust); mobiel Ft→G1–G4 display OK |

**Mobiele shopnaam:** nu *Internet — telefoon/tablet* (niet letterlijk *Internet op telefoon & tablet*). Soft gap — alleen wijzigen indien producteigenaar dat wil; **geen collision**.

---

## 5. ZIP / PAKKETDOWNLOAD

| Bundel | Inhoud nu | Dedupe |
|--------|-----------|--------|
| `zip-pakket-h-ai` | 8 assets: g1–g4 print+beamer | H1 nieuw · G2–G4 oud |
| `zip-pakket-g` |zelfde 8 (storage alias) | 1× AI |
| `zip-compleet` | alle shop-pakketten · **storage-dedupe** | AI 1× · mobiel 1× |

| Check | Nu | Na cutover |
|-------|-----|------------|
| H1 once | JA (H1-bytes) | JA |
| H2 once | JA (oude G2-bytes) | JA (H2-bytes) |
| H3 once | JA (oud) | JA (nieuw) |
| H4 once | JA (oud) | JA (nieuw) |
| duplicates AI | NEE | NEE |
| mobile collision | NEE | NEE |

**Interne ZIP-namen:** `SeniorEase-G1-Lesmateriaal.pdf` e.d. (fileId→code). H1-cutover liet dit bewust. Voor H2–H4: **zelfde patroon behouden** tenzij aparte opdracht ZIP-entry naar H# wil (onnodig risico).  
Labels in download-UI komen uit `customerFacingLessonCode` / `displayCode` — die wél naar H2–H4.

---

## 6. COMPLETE (€149)

| Check | Status |
|-------|--------|
| Pakket H once | **JA** (storage `pakket-g` gededuped t.o.v. canonical `pakket-h-ai`) |
| Legacy AI duplicate | **NEE** |
| Mobile collision | **NEE** |
| Plan | Na cutover: zelfde dedupe · assetsForSlug levert H1–H4-bytes |

---

## 7. PAYMENT / DOWNLOAD

| Check | Status |
|-------|--------|
| refs mapped | `pakket_pakket-h-ai` · `pakket_pakket-g` · `los_g1`–`los_g4` · `compleet_org` |
| historical refs | zelfde fileIds → na cutover nieuwe bytes |
| redirect bedankt | `?session_id={CHECKOUT_SESSION_ID}` — **niet wijzigen** |
| Stripe Payment Links | **onaangeroerd** in 3A/3B-plan |
| Brevo | **onaangeroerd** (fileIds/labels via bestaande fulfillment) |

---

## 8. TESTS — voorgestelde suites (FASE 3B)

Uitbreiden op bestaande:  
`verify-pakket-g-atomic-a/b.ts` · `verify-pakket-g-cutover.ts` · `verify-h1-distributie-cutover.ts`  
→ nieuw: `verify-h2-h4-distributie-cutover.ts` (of H-pakket compleet).

| ID | Suite | Verwachte uitkomst |
|----|-------|--------------------|
| A | Hash gates frozen H1–H4 | private g1–g4 SHA = baseline §2 |
| B | G/H collision | AI_H ≠ MOBILE_G · g* ≠ ft* |
| C | Canonical routes | `pakket-h-ai` · `pakket-g-telefoon` resolve + entitlement |
| D | Legacy routes | `pakket-g`→AI_H · `pakket-f-telefoon`→MOBILE_G · redirects |
| E | Shop display | 1× mobiel · 1× AI · H1–H4 displayCodes/titels |
| F | Losse refs | `los_g1`…`los_g4` → 2 assets elk · labels H# |
| G | Pakket refs | `pakket_pakket-h-ai` · `pakket_pakket-g` → 8 g* · 1× elk fileId |
| H | Historisch | `pakket_pakket-g` bytes = H1–H4 na cutover |
| I | ZIP | zip-h-ai / zip-g: 8 · geen dubbels · geen ft* |
| J | Compleet | storage-dedupe · AI 8 · mobiel 8 ft* |
| K | Entitlement | resolveFulfillmentOrder voor alle refs non-null |
| L | Sync/source | PACKAGE_SOURCE H-ai paden · geen v1-fallback voor g2–g4 |
| M | Mobiele G-regressie | ft* hashes ongewijzigd t.o.v. pre-cutover snapshot |
| N | H1-regressie | g1 hashes ongewijzigd |
| O | Stripe/Brevo/redirect | geen diff in Payment Link URL / webhook success path |

---

## 9. CUTOVERPLAN (FASE 3B) — nog niet uitvoeren

### Principe

**EXPAND → VERIFY → CUTOVER → VERIFY → CONTRACT**  
Legacy identifiers (`g*` · `los_g*` · storage `pakket-g`) **niet verwijderen**.

### Exacte bestanden om te wijzigen (3B)

| Bestand | Wijziging |
|---------|-----------|
| `lib/lesmateriaal-fulfillment.ts` | PACKAGE_SOURCE G2–G4 → `folder: H-ai` · dirs H2/H3/H4 · print/beamer H*-v2 namen |
| `scripts/sync-lesmateriaal-downloads.js` | Spiegel PACKAGE_SOURCE |
| `app/lesmateriaal/lesmateriaal-data.ts` | shop + legacy: displayCode H2–H4 · frozen titels · pakkettitel/includes/omschrijving |
| `scripts/verify-*.ts` | hash gates H2–H4 · display asserts · sync asserts |
| `private/lesmateriaal-downloads/pakket-g/g2-*`…`g4-*` | via sync (niet handmatig) |

**Niet wijzigen:** H1–H4 PDF-bytes · Stripe · Brevo · redirects bedankt · mobile PACKAGE_SOURCE · G-ai bronnen (archief).

### Volgorde

1. **Baseline commit:** H2–H4 frozen PDF’s + GOEDGEKEURD + specs (nu untracked).  
2. **Expand:** source-mapping H2–H4 in fulfillment + sync (nog zonder shop-label-eis als tests gefaseerd).  
3. **Verify:** sync dry-run · hash A · L · N.  
4. **Cutover shop labels:** lesmateriaal-data H2–H4 + pakket-copy.  
5. **Verify:** E–K · M · O.  
6. **Contract:** documenteer freeze distributie H2–H4 · geen identifier-delete.  
7. **Deploy** (aparte goedkeuring).  
8. **Live byte** (aparte entitlement).

### Rollback

- Revert mapping G2–G4 naar G-ai v1-paden + re-sync → oude hashes terug.  
- H1-mapping onaangeroerd laten.  
- Shop-label revert onafhankelijk mogelijk.

---

## 10. LIVE BYTE VERIFICATION

| | |
|--|--|
| Methode | Na deploy: download via geldige LIVE sessie (`pakket_pakket-h-ai` / `pakket_pakket-g` / `los_g*` / `compleet_org`) · SHA-256 vs §2 |
| Bypass / test-auth | **verboden** |
| Production secret tonen | **verboden** |
| Huidige entitlement beschikbaar | **NEE** (eerdere H1-live verificatie: geen live AI-session gevonden) |
| Status | **LIVE BYTE GATE — WACHT OP GELDIGE LIVE ENTITLEMENT** |
| Blokkeert code-freeze/deploy? | **Niet noodzakelijk** |
| Blokkeert “live byte-verified”-claim? | **JA** |

---

## 11. GIT BASELINE (3A)

| | |
|--|--|
| Branch | `main` (tracks `origin/main`) |
| HEAD | `9036821c46329094d806b57c1a72f62ce3d514be` — *feat: cut over first ai lesson to h1* |
| Parent | `7da44aec9de9f8515f0f21bdf9560173b2374bef` |
| Dirty | **JA** — zeer groot worktree (~553 porcelain entries; veel unrelated Agent/Facebook/A–F + untracked H2–H4) |
| H1 | tracked (cutover commit) |
| H2/H3/H4 productie | **untracked** (`git ls-files` count 0) |

### Baseline-plan vóór 3B-cutover

1. **Geen big-bang commit** van hele dirty tree.  
2. Aparte baseline-commit(s): alleen `lesmateriaal/H-ai/H2…H4` frozen PDF’s + bronnen + `GOEDGEKEURD.md` + relevante specs.  
3. Daarna cutover-commit: fulfillment + sync + shop labels + verify scripts.  
4. Unrelated dirty files **niet** meenemen.

---

## 12. Afwijkingen t.o.v. opdracht-aannames

| Aanname | Bevinding |
|---------|-----------|
| fileIds g1–g4 | **Klopt** |
| los_g1–g4 | **Klopt** |
| pakket_pakket-h-ai / legacy pakket_pakket-g | **Klopt** |
| H2–H4 al op H-ai gemapt | **NEE** — alleen H1 |
| Shop toont H2–H4 titels | **NEE** |
| Pakkettitel “AI in het dagelijks leven” | **NEE** — nu “AI voor dagelijks gebruik” |
| Page counts H2/H3/H4 | **MATCH** — geen STOP |

---

## 13. Blockers / open punten (review)

| # | Ernst | Punt |
|---|-------|------|
| 1 | **Hoog (3B-gate)** | H2–H4 untracked — baseline-commit nodig vóór cutover |
| 2 | **Hoog (product)** | Customer-facing H2–H4 + pakketcopy nog oud |
| 3 | **Hoog (distributie-bytes)** | Private g2–g4 = oude G-v1 tot cutover |
| 4 | **Medium** | Live byte-gate open (geen entitlement) |
| 5 | **Laag** | Dirty unrelated worktree — scope-discipline bij commit |
| 6 | **Info** | ZIP-entrycodes blijven G# (bewust, zoals H1) |

**Geen page-count STOP.**

---

## 14. HARD STOP (3A)

Geen PDF · sync · shop · manifest · ZIP · purchase ref · Stripe · Brevo · redirect · G/H-laag · commit · push · deploy in deze fase.

**Wacht op review vóór FASE 3B.**
