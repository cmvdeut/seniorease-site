# Pakket H — Distributie-cutover v1

**Status:** PAKKET H DISTRIBUTIE-CUTOVER · **LOKAAL GEÏMPLEMENTEERD — TER REVIEW**  
**Datum:** 2026-09-13  
**Fase:** 3B — baseline + source/sync cutover + lokale verificatie  
**Push:** NEE · **Deploy:** NEE · **Live byte-gate:** WACHT OP GELDIGE LIVE ENTITLEMENT

**Bindend:**  
- Plan 3A: `docs/superpowers/specs/2026-09-13-pakket-h-eindcontrole-distributieplan-v1.md` (GOEDGEKEURD)  
- Architectuur: `docs/superpowers/specs/2026-09-13-pakket-h-ai-inhoudsarchitectuur-v2.md` 🔒  
- H1–H4 productie: frozen · **geen PDF-regeneratie in 3B**

---

## BASELINE

| | |
|--|--|
| Commit SHA | `4a9ea5426808378c5d8f6caf04c24bb9ece0c8a1` |
| Parent | `9036821c46329094d806b57c1a72f62ce3d514be` |
| Message | `chore: freeze h2-h4 production baseline` |
| Files count | **158** |
| Unrelated files committed | **0** |

Inhoud: H2–H4 productie (PDF/beamer, bron-md, builds, gemini-assets, `_qa_pages`, `GOEDGEKEURD.md`) + H2/H3/H4 specs + 3A-eindcontroleplan. Geen review-ZIPs · geen `raw/`-captures · geen Agent/A–G unrelated.

---

## FROZEN HASHES

| | Print | Beamer |
|--|-------|--------|
| H1 | `3e2d740666f5a377d0bd41731eb37f728ffce68ce5c281bb52dddb25b3291a52` | `a9d1485bcf406b3ce388cfc218fa8b34eee4d0e52a4597bbb39c8c4df1f54489` |
| H2 | `f87db31cd768e2dcb49528a2e2e8e40b3ac1a3312a9dd21745f6c04fd6a15b2c` | `216903cd1f4219c26075a1ea4eb24e214aae7f48c4c36d9415f2e2f2dd720c4f` |
| H3 | `0ee16c7d67f9509986946221d1797bbda11ca25c62ef8f35cff8ebd88c9f8744` | `919d426ce35aeedee453b2c6d2d2619c0d3fc9291709fac48aa0f6f9dba344f6` |
| H4 | `afcf65e2c1acd9ddbc07bfc8812a1a2d63b21e01b1de8abe22d0b76390400782` | `fc634a8f2f3918216bb30cd1c07c69e102c59fe59a3d59571e0c8cefa3092066` |

Bron-gates vóór cutover: **ALL MATCH**.

---

## PRIVATE NA SYNC

Sync via `node scripts/sync-lesmateriaal-downloads.js` · **geen** v1-fallback-log voor g1–g4 · 64 OK / 0 MISS.

| fileId | SHA-256 | = frozen H |
|--------|---------|------------|
| g1-print | `3e2d7406…291a52` | **JA** |
| g1-beamer | `a9d1485b…f54489` | **JA** |
| g2-print | `f87db31c…a15b2c` | **JA** |
| g2-beamer | `216903cd…720c4f` | **JA** |
| g3-print | `0ee16c7d…9f8744` | **JA** |
| g3-beamer | `919d426c…344f6` | **JA** |
| g4-print | `afcf65e2…400782` | **JA** |
| g4-beamer | `fc634a8f…092066` | **JA** |

Oude G-v1 private hashes voor g2–g4: **niet meer actief**.

**Git-note:** `private/lesmateriaal-downloads/**/*.pdf` is gitignored → private bytes lokaal gesynchroniseerd, niet in cutover-commit. Deploy vereist sync op build/host (`npm run sync:lesmateriaal-downloads` / prebuild).

---

## MOBILE

| | |
|--|--|
| ft* before/after match | **JA** (8/8 vs pre-cutover snapshot) |
| Mobile source mapping gewijzigd | **NEE** |

---

## MAPPING

| Tech | Source | v1 fallback actief |
|------|--------|--------------------|
| G1 → H1 | `H-ai/H1-wat-kan-ai-voor-mij-doen` · H1-v2 | **NEE** (reeds 4C) |
| G2 → H2 | `H-ai/H2-een-ai-assistent-gebruiken` · H2-v2 | **NEE** |
| G3 → H3 | `H-ai/H3-betere-vragen-stellen-aan-ai` · H3-v2 | **NEE** |
| G4 → H4 | `H-ai/H4-ai-antwoorden-controleren-en-veilig-gebruiken` · H4-v2 | **NEE** |

Identifiers behouden: `G1–G4` · `g*-print/beamer` · `los_g1`–`los_g4` · storage `pakket-g` · canonical `pakket-h-ai` · legacy `pakket-g`.

---

## CUSTOMER

| | |
|--|--|
| Pakketnaam | **Pakket H — AI in het dagelijks leven** |
| displayCodes | **H1 · H2 · H3 · H4** |
| Titels | Wat kan AI voor mij doen? · Een AI-assistent gebruiken · Betere vragen stellen aan AI · AI-antwoorden controleren en veilig gebruiken |
| Includes | START HIER · Draaiboek · Beamer-PDF · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist |
| Geen oefentaken/nazorg | **JA** |
| Prijzen unchanged | **JA** (`19.95` / `6.95` / `149`) |

Legacy `pakket-g` customer-facing: **aligned** met Pakket H (slug/entitlement/storage ongewijzigd).

Mobiele soft-gap titel (*Internet — telefoon/tablet*): **niet** meegenomen (scope).

---

## LEGACY / HISTORICAL BUYERS

| Check | Status |
|-------|--------|
| `pakket-g` AI compatible | **JA** → AI_H · 8× g* = H1–H4 |
| `pakket-f-telefoon` mobile compatible | **JA** · ft* ongewijzigd |
| `los_g*` compatible | **JA** → nieuwe H-bytes per les |
| Historical buyer upgrade | **JA** — zelfde refs, nieuwe H1–H4 bytes |
| Geen `los_h*` | **JA** |

Purchase refs behouden: `pakket_pakket-h-ai` · `pakket_pakket-g` · `los_g1`–`los_g4` · `compleet_org`.

---

## ZIP

| Bundel | Asset count | Notes |
|--------|-------------|-------|
| `zip-pakket-h-ai` | **8** | g1–g4 print+beamer · 1× elk · geen ft* · geen oude G-v1 |
| `zip-pakket-g` | **8** |zelfde AI_H-set |
| Duplicates | **0** | |
| Mobile collision | **NEE** | |

Interne ZIP-entrynamen: bestaand SeniorEase-G#-patroon **bewust behouden** (geen cosmetische rename).

---

## COMPLETE €149

| Check | Status |
|-------|--------|
| Pakket H exact één keer (storage-dedupe) | **JA** |
| AI 8 g* | **JA** |
| Mobiel G exact één keer met ft* | **JA** |
| Geen legacy AI-duplicaat | **JA** |
| Dedupe correct | **JA** |

---

## FORBIDDEN

| | |
|--|--|
| Stripe changed | **NEE** |
| Brevo changed | **NEE** |
| Redirect changed | **NEE** |
| Bedankt / session_id contract | **NEE** (ongewijzigd; success URL blijft `…/lesmateriaal/bedankt?session_id={CHECKOUT_SESSION_ID}`) |
| H1 source/bytes changed | **NEE** |
| Mobile mapping changed | **NEE** |

Pre-existing dirty worktree (Agent/Facebook/A–G/e.d.): **niet** gecommit.

---

## TESTS

| Suite | PASS | FAIL | SKIP |
|-------|------|------|------|
| `verify-pakket-h-distributie-cutover` | **121** | **0** | **0** |
| `verify-h1-distributie-cutover` | **36** | **0** | **0** |
| `verify-pakket-g-cutover` | **26** | **0** | **0** |
| `verify-pakket-g-atomic-a` | **40** | **0** | **0** |
| `verify-pakket-g-atomic-b` | **33** | **0** | **0** |
| **Totaal** | **256** | **0** | **0** |

---

## GIT (CUTOVER)

| | |
|--|--|
| Commit SHA | *(zie na commit hieronder / `git rev-parse HEAD`)* |
| Parent | baseline `4a9ea542…` |
| Expected files | fulfillment · sync · lesmateriaal-data · verify-scripts · dit rapport |
| Private PDFs in commit | **NEE** (gitignore) |
| Unrelated files committed | **0** |
| Push | **NEE** |

Exacte committed file list wordt na cutover-commit vastgelegd in de review-samenvatting.

---

## ROLLBACK (niet uitgevoerd)

1. **H1 ongemoeid laten** (mapping + bytes blijven H1).  
2. Zet G2–G4 `PACKAGE_SOURCE` / sync terug naar pre-cutover `G-ai/G2…G4` v2-namen (v1-fallback herstelt oude bytes).  
3. `node scripts/sync-lesmateriaal-downloads.js` → private g2–g4 herstellen.  
4. Shop/legacy labels onafhankelijk terugzetten in `lesmateriaal-data.ts` indien gewenst.  
5. Mobile G / Stripe / Brevo / redirects: **niet aanraken**.

---

## LIVE

**LIVE BYTE GATE — WACHT OP GELDIGE LIVE ENTITLEMENT**

Na deploy + sync op host: download via live `session_id` (`pakket_pakket-h-ai` / `pakket_pakket-g` / `los_g*` / `compleet_org`) en SHA-256 vs frozen tabel hierboven.

---

## HARD STOP

- Geen push · geen deploy · geen Vercel · geen live purchase  
- Geen Stripe/Brevo-wijziging · geen PDF-regeneratie · geen mobile G rename  
