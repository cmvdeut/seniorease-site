# Pakket H — Productie deploy v1

**Status:** PAKKET H — PRODUCTIE DEPLOY · **TER REVIEW**  
**Datum:** 2026-09-13  
**Fase:** 3C — push + deploy + host sync + post-deploy verify  

**Bindend:**  
- Cutover 3B: `docs/superpowers/specs/2026-09-13-pakket-h-distributie-cutover-v1.md` (GOEDGEKEURD)  
- Baseline `4a9ea542` · Cutover `45ff3201` · Report-note `fd0f4475`  
- H1–H4 content/productie: GOEDGEKEURD & BEVROREN 🔒  

---

## GIT

| | |
|--|--|
| Local HEAD (pre/push) | `fd0f4475d34ebb885b6d323bf51f709ad252ca86` |
| Remote HEAD vóór | `9036821c46329094d806b57c1a72f62ce3d514be` |
| Remote HEAD ná | `fd0f4475d34ebb885b6d323bf51f709ad252ca86` |
| Gepushte range | `9036821c..fd0f4475` |
| Commits | `4a9ea542` baseline · `45ff3201` cutover · `fd0f4475` rapport-SHA |
| Unrelated dirty meegenomen | **NEE** (staged leeg · alleen commits gepusht) |

---

## PRE-PUSH GATE

| Check | Resultaat |
|-------|-----------|
| HEAD bevat baseline + cutover | **JA** |
| Staged area leeg | **JA** |
| H1–H4 bronhashes ongewijzigd | **JA** |
| Mobile ft* ongewijzigd vs snapshot | **JA** |
| Stripe/Brevo/redirect in push-diff | **NEE** |
| Local verify suites | **256 PASS / 0 FAIL / 0 SKIP** |

---

## DEPLOY

| | |
|--|--|
| Route | Git push `origin/main` → Vercel production (bestaande Git-integratie) |
| Status | **● Ready** |
| Deployment id | `dpl_6eDETxnZCAk429LytytxUG9Vjci9` |
| Deployment URL | https://seniorease-site-ca12bovwa-cmvdeut-gmailcoms-projects.vercel.app |
| Production aliases | https://www.seniorease.nl · https://seniorease.nl · `seniorease-site.vercel.app` |
| Build success | **JA** |
| Handmatige hotfix | **NEE** |

---

## HOST / BUILD SYNC

`prebuild` → `node scripts/sync-lesmateriaal-downloads.js` (zelfde als `npm run sync:lesmateriaal-downloads`).

| | |
|--|--|
| Sync in build logs | **JA** — `> node scripts/sync-lesmateriaal-downloads.js` |
| Resultaat | **Klaar: 64 gekopieerd, 0 ontbrekend** |
| g1–g4 private OK in log | **JA** (`pakket-g/g1`…`g4` print+beamer) |
| v1-fallback voor g2–g4 | **NEE** (geen `fallback-v1` in buildlog) |
| Mapping in code (deployed) | G1→H1 · G2→H2 · G3→H3 · G4→H4 via `H-ai` + H*-v2 |

Private PDF’s blijven gitignored; productie-bytes komen uit deze build-sync.

---

## CUSTOMER (productie www.seniorease.nl)

| Check | Status |
|-------|--------|
| Pakketnaam | **PASS** — *Pakket H — AI in het dagelijks leven* |
| H1–H4 displayCodes | **PASS** — H1 · H2 · H3 · H4 |
| H1–H4 titels | **PASS** — frozen titels |
| Includes (zes H-delen) | **PASS** — START HIER · Draaiboek · Beamer-PDF · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist |
| Geen Nazorgkaart in H-includes | **PASS** |
| Exact één Pakket H-kaart | **PASS** |
| Exact één mobiel Pakket G | **PASS** — *Internet — telefoon/tablet* |
| Geen zichtbare legacy AI-kaart `pakket-g` | **PASS** |
| Geen oude G2/G3/G4 lestitels op H-pagina | **PASS** |
| Prijzen | **PASS** — €19,95 · los €6,95 |

**Soft residuals (niet in 3C-scope · geen productwijziging gedaan):**  
1. FAQ/compleet-tekst bevat nog *“AI voor dagelijks gebruik (pakket H)”* (`LesmateriaalFaq.tsx`) — niet de H-kaarttitel.  
2. Gedeelde losse-les CTA: *“Draaiboek + oefentaken voor één lesmiddag”* (`LesmateriaalPricing`) — H-includes zelf zijn correct.

---

## ROUTES

| Route | Resultaat |
|-------|-----------|
| Canonical AI `/lesmateriaal/pakket-h-ai` | **200** |
| Legacy AI `/lesmateriaal/pakket-g` | **308 → `/lesmateriaal/pakket-h-ai`** (nooit mobiel) |
| Canonical mobile `/lesmateriaal/pakket-g-telefoon` | **200** |
| Legacy mobile `/lesmateriaal/pakket-f-telefoon` | **308 → `/lesmateriaal/pakket-g-telefoon`** |
| Collision `/pakket-g` → mobiel | **NEE** |

---

## ENTITLEMENTS (build/config verify op deployed code)

| Ref | Resolve |
|-----|---------|
| `pakket_pakket-h-ai` | **PASS** → AI_H · 8× g* |
| `pakket_pakket-g` | **PASS** → AI_H ·zelfde set (historical) |
| `los_g1`…`los_g4` | **PASS** → H1–H4 print+beamer |
| `compleet_org` | **PASS** · dedupe |
| `los_h*` | **niet aanwezig** (correct) |

Historische refs wijzen naar nieuwe H1–H4 assetset (zelfde fileIds).

---

## ZIP / COMPLETE

| Check | Status |
|-------|--------|
| Pakket H ZIP 8 assets | **PASS** |
| Duplicates | **0** |
| ft* in AI ZIP | **NEE** |
| Complete: H once (8 g*) | **PASS** |
| Complete: mobile G once (8 ft*) | **PASS** |

---

## FORBIDDEN

| | |
|--|--|
| Stripe changed | **NEE** |
| Brevo changed | **NEE** |
| Payment Links changed | **NEE** |
| Redirect changed | **NEE** |
| session_id contract | **NEE** (ongewijzigd) |
| H1 mapping/bytes changed | **NEE** |
| Mobile mapping changed | **NEE** |

---

## TESTS

### LOCAL VERIFY (pre-push)

| Suite | PASS | FAIL | SKIP |
|-------|------|------|------|
| verify-pakket-h-distributie-cutover | 121 | 0 | 0 |
| verify-h1-distributie-cutover | 36 | 0 | 0 |
| verify-pakket-g-cutover | 26 | 0 | 0 |
| verify-pakket-g-atomic-a | 40 | 0 | 0 |
| verify-pakket-g-atomic-b | 33 | 0 | 0 |
| **Totaal** | **256** | **0** | **0** |

### BUILD VERIFY

| | PASS | FAIL | SKIP |
|--|------|------|------|
| Sync 64/0 + geen g2–g4 v1-fallback | **1** | **0** | **0** |
| Entitlement/ZIP/complete smoke (deployed code) | **15** | **0** | **0** |
| **Totaal** | **16** | **0** | **0** |

### PRODUCTION SMOKE

| | PASS | FAIL | SKIP |
|--|------|------|------|
| Redirects (4) | **4** | **0** | **0** |
| Shop + H-pagina customer-facing (hard checks) | **14** | **0** | **0** |
| Soft residual FAQ/CTA copy | — | — | genoteerd (geen hard fail) |
| **Totaal hard** | **18** | **0** | **0** |

### LIVE BYTE VERIFY

| | |
|--|--|
| Geldige live entitlement beschikbaar | **NEE** |
| Hash verified | **NEE** |
| Status | **LIVE BYTE GATE — WACHT OP GELDIGE LIVE ENTITLEMENT** |

Geen aankoop voor QA · geen secret · geen bypass.

---

## LIVE BYTE (open)

Vereist bestaande productie `session_id` voor  
`pakket_pakket-h-ai` / `pakket_pakket-g` / `los_g*` / `compleet_org`  
→ normale `/api/lesmateriaal/order-status` + download → SHA-256 vs frozen H1–H4.

Blokkeert deploy-goedkeuring **niet** (conform 3C-opdracht).

---

## HARD STOP

Geen extra productwijzigingen · geen refactor · geen ZIP rename · geen mobile titelwijziging · geen Stripe/Brevo.

---

## Samenvatting voor review

**PAKKET H — PRODUCTIE DEPLOY · TER REVIEW**

- Push: **JA** (`9036821c..fd0f4475`)  
- Deploy: **Ready** `dpl_6eDETxnZCAk429LytytxUG9Vjci9` → www.seniorease.nl  
- Sync: **64 OK / 0 MISS · geen g2–g4 v1-fallback**  
- Production smoke: **18 PASS / 0 FAIL**  
- Customer-facing H1–H4: **PASS**  
- Legacy AI + mobile: **PASS** (geen collision)  
- Tests local: **256/0/0** · build: **16/0/0** · smoke: **18/0/0**  
- Live byte gate: **WACHT OP GELDIGE LIVE ENTITLEMENT**
