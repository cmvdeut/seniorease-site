# H1 — DISTRIBUTIE-CUTOVER IMPLEMENTATIE V1

**Status:** GOEDGEKEURD & BEVROREN 🔒  
**Datum implementatie:** 2026-09-13  
**Datum goedgekeurd / bevroren:** 2026-09-13  
**Fase:** 4C implementatie · 4D freeze + commit  

**Producteigenaar:** cutover goedgekeurd · geen aanvullende correctieronde.

### Bevroren resultaat

| | |
|--|--|
| Klantgericht | **H1** · Wat kan AI voor mij doen? |
| Technisch | **G1** · `g1-print` · `g1-beamer` · `los_g1` |
| Canonical | `pakket-h-ai` |
| Legacy | `pakket-g` |
| Entitlement | **AI_H** |
| Storage | `pakket-g` |
| Structurele bron | `lesmateriaal/H-ai/H1-wat-kan-ai-voor-mij-doen/` |

### Bevroren besluiten

- Structurele H1-bronmapping: **goedgekeurd**  
- Technische G1-identifiers: **behouden**  
- Historische kopers mogen nieuwe H1 ontvangen: **JA**  
- `displayCode` **H1**: **goedgekeurd**  
- Klanttitel: **goedgekeurd**  
- ZIP-entrynaam technisch G1 mag blijven: **JA**  
- Gemini Gate G: **PASS** (operationeel · geen PDF-wijziging)  
- H1-PDF’s gewijzigd: **NEE**  

**HARD tot aparte deploy-opdracht:** geen push · geen productie-sync · geen Stripe/Brevo · geen H2.

---

## 1. Executive summary

De goedgekeurde H1-productie is **structureel** aangesloten op de bestaande technische eerste AI-les:

| Klantgericht | Technisch (ongewijzigd) |
|--------------|-------------------------|
| **H1** · Wat kan AI voor mij doen? | **G1** · `g1-print` · `g1-beamer` · `los_g1` |

Bron/sync wijst reproduceerbaar naar `lesmateriaal/H-ai/H1-wat-kan-ai-voor-mij-doen/`.  
Private `pakket-g/g1-*` = exacte H1-hashes. G2–G4 ongewijzigd.  
Historische kopers: **JA** (besloten) — krijgen bij nieuwe download de nieuwe H1.  
**Geen** commit · push · deploy · Stripe/Brevo · H2.

---

## 2. Pre-cutover baseline

| | |
|--|--|
| Git baseline | `7da44aec9de9f8515f0f21bdf9560173b2374bef` |
| Parent | `3763e08761a20cdb7099e365e02be10d3af27673` |
| H1 print SHA-256 | `3e2d740666f5a377d0bd41731eb37f728ffce68ce5c281bb52dddb25b3291a52` |
| H1 beamer SHA-256 | `a9d1485bcf406b3ce388cfc218fa8b34eee4d0e52a4597bbb39c8c4df1f54489` |

Pre-implementatie hash-gate: **PASS** (bron-PDF’s ongewijzigd).

---

## 3. Gewijzigde bestanden

| Bestand | Rol |
|---------|-----|
| `lib/lesmateriaal-fulfillment.ts` | G1-bron → H-ai/H1 · per-les `folder`-override |
| `scripts/sync-lesmateriaal-downloads.js` | Zelfde mapping · 5e array-element folder-override |
| `app/lesmateriaal/lesmateriaal-data.ts` | `displayCode: H1` · titel eerste les (shop + legacy compat) |
| `scripts/verify-pakket-g-atomic-b.ts` | Asserts H1-display |
| `scripts/verify-pakket-g-cutover.ts` | Asserts H1-display |
| `scripts/verify-h1-distributie-cutover.ts` | **Nieuw** — H1 cutover-regressie + hash-gates |

**Niet gewijzigd:** H1-PDF’s · G-ai bronnen · fileIds · Stripe · redirects · sitemap · private (alleen via sync) · unrelated Agent/Facebook-worktree.

---

## 4. G1 → H1 bronmapping

### PACKAGE_SOURCE / sync (`pakket-g` · les G1)

| | Waarde |
|--|--------|
| Technische code | `G1` |
| Bronfolder | `H-ai` (override) |
| Dir | `H1-wat-kan-ai-voor-mij-doen` |
| Print | `pdf/SeniorEase-H1-Wat-kan-AI-voor-mij-doen-v2.pdf` |
| Beamer | `beamer/SeniorEase-H1-Beamer-v2.pdf` |
| Dest | `private/lesmateriaal-downloads/pakket-g/g1-print.pdf` · `g1-beamer.pdf` |
| fileIds | `g1-print` · `g1-beamer` |

`lesmateriaal/G-ai/G1-wat-is-ai/` **niet** verwijderd/overschreven — historisch bronmateriaal.  
Actieve sync voor G1 valt **niet** meer terug op G1-v1 (geen `fallback-v1` voor g1 in sync-log).  
G2–G4 blijven `G-ai` (nog wel v1-fallback daar — ongewijzigd gedrag).

---

## 5. Shop displayCode / titel

`pakket-h-ai` (en legacy `pakket-g` compat):

| Veld | Waarde |
|------|--------|
| `code` (technisch) | `G1` |
| `displayCode` | **H1** |
| `title` | **Wat kan AI voor mij doen?** |

Pagina `/lesmateriaal/[slug]` gebruikt `lessonDisplayCode(les)` → toont **H1**.  
H2–H4 klantinhoud: **niet** gewijzigd.

---

## 6. Canonical / legacy contract

| Slug | Entitlement | Storage | Eerste les assets |
|------|-------------|---------|-------------------|
| `pakket-h-ai` | **AI_H** | `pakket-g` | `g1-*` = H1 |
| `pakket-g` | **AI_H** | `pakket-g` |zelfde `g1-*` |
| `pakket-g-telefoon` | **MOBILE_G** | `pakket-f-telefoon` | `ft*` |

Redirect (bestaand): `/lesmateriaal/pakket-g` → `/lesmateriaal/pakket-h-ai` · **nooit** mobiel.  
**MOBILE_G-collision:** **NEE**.

---

## 7. Losse les

| | |
|--|--|
| Reference | **`los_g1`** (behouden · geen `los_h1`) |
| Assets | `g1-print` + `g1-beamer` = nieuwe H1-bytes |
| Download-labels | `H1 — …` |

---

## 8. Compleet / ZIP

| Bundel | g1-print voorkomen | Inhoud |
|--------|-------------------|--------|
| `compleet_org` | **1×** | H1 |
| `zip-pakket-h-ai` | **1×** | H1 |
| `zip-pakket-g` | **1×** | H1 (legacy-compatible) |
| `zip-compleet` | via storage-dedupe | zelfde |

Geen oude G1 + nieuwe H1 naast elkaar.

**ZIP-entrynaam (intern):** nog fileId-gebaseerd →  
`H - AI voor dagelijks gebruik/SeniorEase-G1-Lesmateriaal.pdf`  
(Download-label klantgericht: **H1**). ZIP-contract niet herontworpen.

---

## 9. Lokale sync

`npm run sync:lesmateriaal-downloads` — **OK**  
g1 zonder fallback-v1 · G2–G4 ongewijzigd (nog v1-fallback zoals voorheen).

---

## 10. H1 bronhashes (post)

| Asset | SHA-256 | |
|-------|---------|--|
| Print | `3e2d740666f5a377d0bd41731eb37f728ffce68ce5c281bb52dddb25b3291a52` | **PASS** |
| Beamer | `a9d1485bcf406b3ce388cfc218fa8b34eee4d0e52a4597bbb39c8c4df1f54489` | **PASS** |

PDF’s **niet** geregenereerd.

---

## 11. Private g1 hashes (post)

| fileId | SHA-256 | = H1? |
|--------|---------|-------|
| `g1-print` | `3e2d740666f5a377d0bd41731eb37f728ffce68ce5c281bb52dddb25b3291a52` | **JA** |
| `g1-beamer` | `a9d1485bcf406b3ce388cfc218fa8b34eee4d0e52a4597bbb39c8c4df1f54489` | **JA** |

---

## 12. G2–G4 voor/na hashes

| fileId | SHA-256 (voor = na) |
|--------|---------------------|
| `g2-print` | `091ca37ad2a98ccc7ef1eb87bb49b0f9c334d0024c8b1e8b8f691bb14a026760` |
| `g2-beamer` | `522bf077bfcaaaec7d744c09a50dcc0f3bc9563d82cd9c325b4fb7b5713c65ef` |
| `g3-print` | `d40dcebffe4f201ab92159e4910bad916891b38293017551de0156618224b8fc` |
| `g3-beamer` | `0eb5ffb86ced6aba39a57e98d4a626a0e9411b148efaf5ef333053715ff00fa4` |
| `g4-print` | `bf3d5f963134824a1c07bc46663e6b33dc1031622fcdc0d62a8047afffc7fb7a` |
| `g4-beamer` | `5af7827115bf4058035c670e036ca35ac9cd933c92f4170293000495ee92fc77` |

**G2–G4 ongewijzigd: JA**

---

## 13. Tests

| Suite | Resultaat |
|-------|-----------|
| `scripts/verify-h1-distributie-cutover.ts` | **36 passed, 0 failed** |
| `scripts/verify-pakket-g-atomic-a.ts` | **40 passed, 0 failed** |
| `scripts/verify-pakket-g-atomic-b.ts` | **33 passed, 0 failed** |
| `scripts/verify-pakket-g-cutover.ts` | **26 passed, 0 failed** |

---

## 14. Lokale routecontrole

| Check | Uitkomst |
|-------|----------|
| Shop-data eerste les | **H1** · Wat kan AI voor mij doen? |
| Pagina gebruikt `lessonDisplayCode` | **JA** (`app/lesmateriaal/[slug]/page.tsx`) |
| Redirect `/lesmateriaal/pakket-g` | → `/lesmateriaal/pakket-h-ai` (**PASS**) |
| Productie-deploy | **NEE** |

---

## 15. Git / worktree scope

**HEAD (ongewijzigd t.o.v. baseline):** `7da44aec…`  
**Commit deze fase:** **NEE**

### In scope (dirty / untracked voor latere review-commit)

- `lib/lesmateriaal-fulfillment.ts`  
- `scripts/sync-lesmateriaal-downloads.js`  
- `app/lesmateriaal/lesmateriaal-data.ts`  
- `scripts/verify-pakket-g-atomic-b.ts`  
- `scripts/verify-pakket-g-cutover.ts`  
- `scripts/verify-h1-distributie-cutover.ts` (nieuw)  
- dit rapport `docs/superpowers/specs/2026-09-13-h1-distributie-cutover-implementatie-v1.md`

### Private (gitignore · sync-output)

- `private/lesmateriaal-downloads/pakket-g/g1-print.pdf`  
- `private/lesmateriaal-downloads/pakket-g/g1-beamer.pdf`  

### Unrelated (niet meegenomen)

- Agent/Facebook/YouTube dirty files  
- review-ZIP / `__pycache__` onder H-ai  

---

## 16. Open punten

1. **Producteigenaar-review** van deze cutover · daarna aparte **commit**-opdracht.  
2. **Deploy / Vercel sync** — pas na goedgekeurde commit (private assets op runtime opnieuw syncen).  
3. ZIP-entry bestandsnaam blijft intern `SeniorEase-G1-…` (bewust niet herontworpen).  
4. Gemini: operationele voorbereiding (Gate G al PASS) — geen PDF-wijziging.  
5. H2–H4 content/shop: later.

---

## 17. Exact aanbevolen volgende stap

1. Producteigenaar reviewt dit rapport (**TER REVIEW**).  
2. Bij GO: aparte opdracht **H1 cutover freeze-commit** (alleen cutover-scope · geen push tenzij gevraagd).  
3. Daarna aparte opdracht **deploy / live sync-verificatie** (download-bytes ↔ H1-hashes).  
4. Geen H2 zonder aparte opdracht.

---

## Eindrapportage

**H1 DISTRIBUTIE-CUTOVER IMPLEMENTATIE V1 — GOEDGEKEURD & BEVROREN** 🔒

| Check | |
|-------|--|
| H1 bronhashes PASS | **JA** |
| structurele bronmapping H1 | **JA** |
| technische G1 behouden | **JA** |
| g1 fileIds behouden | **JA** |
| los_g1 behouden | **JA** |
| displayCode H1 | **JA** |
| klanttitel correct | **JA** |
| private g1 hashes = H1 | **JA** |
| G2–G4 ongewijzigd | **JA** |
| canonical pakket-h-ai PASS | **JA** |
| legacy pakket-g PASS | **JA** |
| MOBILE_G collision | **NEE** |
| compleet/ZIP dedupe PASS | **JA** |
| tests/build PASS | **JA** |
| H1 PDF's gewijzigd | **NEE** |
| commit gemaakt | zie fase 4D |
| push uitgevoerd | **NEE** (tot aparte opdracht) |
| deploy uitgevoerd | **NEE** |
| H2 gestart | **NEE** |

**Volgende stap:** aparte opdracht **H1 PRODUCTION DEPLOY + LIVE DOWNLOAD VERIFICATIE**.
