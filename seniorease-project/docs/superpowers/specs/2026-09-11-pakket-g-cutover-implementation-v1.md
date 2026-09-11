# PAKKET G CUTOVER IMPLEMENTATION V1
— TER REVIEW

**Status:** TER REVIEW — **geen deploy** · **geen commit**  
**Datum:** 2026-09-11  
**Fase:** 4J — CUTOVER (redirects + shop/checkout cutover)

**Parent freeze (ATOMIC B):** `98d81a0955572673410e3c518b1f901cfcc4b181`

**Pre-cutover external gate:** GOEDGEKEURD & BEVROREN 🔒 · CUTOVER READINESS: READY

**Technische conclusie:** **CUTOVER IMPLEMENTATION: PASS**  
*(Menselijke review + freeze vereist vóór deploy.)*

---

## 1. Scope

Lokaal uitgevoerd:

- Shop toont canonical `pakket-g-telefoon` (MOBILE_G) en `pakket-h-ai` (AI_H)
- Permanente Next.js redirects: F-phone → G-phone · old G → H-AI
- Canonical checkout refs: `pakket_pakket-g-telefoon` / `pakket_pakket-h-ai`
- Legacy fulfillment + fileIds + ZIP identifiers intact
- Cutover-verificatiematrix C1–C25
- ATOMIC A/B shop-asserts aangepast aan cutover-expectatie

**Niet** gedaan: deploy · commit · Stripe/Payment Links · Vercel env · Brevo · sync · PDF-regeneratie · fysieke assetmigratie · H1–H4-lesmigratie · legacy-delete.

---

## 2. Pre-hash

**16/16 PASS** (vóór cutover-code; baselines = inventaris/snapshot).

---

## 3. Gewijzigde bestanden

| Bestand | Wijziging |
|---------|-----------|
| `app/lesmateriaal/lesmateriaal-data.ts` | Shop = canonical; legacy in `LEGACY_COMPAT_PAKKETTEN`; `listRoutablePakketten` = shop + legacy |
| `next.config.js` | Permanente redirects F-phone → G-phone · pakket-g → h-ai |
| `scripts/verify-pakket-g-atomic-a.ts` | Shop-asserts → cutover-expectatie (+ legacy resolve) |
| `scripts/verify-pakket-g-atomic-b.ts` | Shop-asserts → cutover-expectatie (geen legacy kaarten) |
| `scripts/verify-pakket-g-cutover.ts` | **Nieuw** — C1–C25 |
| `docs/superpowers/specs/2026-09-11-pakket-g-cutover-implementation-v1.md` | Dit rapport |

Geen PDF/source/private wijziging.

---

## 4. Shop cutover

| | MOBILE_G | AI_H |
|--|----------|------|
| Zichtbaar pakket | **Pakket G** (`code: G`) | **Pakket H** (`code: H`) |
| Titel | Internet — telefoon/tablet | AI voor dagelijks gebruik |
| Publieke slug | `pakket-g-telefoon` | `pakket-h-ai` |
| Displaylessen | G1–G4 | G1–G4 |
| Tech codes | Ft1–Ft4 | G1–G4 |
| fileIds | `ft*` | `g*` |

Shopoverzicht: **exact één** mobiele internetkaart + **exact één** AI-kaart.  
Legacy `pakket-f-telefoon` / `pakket-g` **niet** in shop; wel resolveerbaar via `getPakketBySlug` / `listRoutablePakketten`.

---

## 5. Redirects

| Source | Destination | Permanent |
|--------|-------------|-----------|
| `/lesmateriaal/pakket-f-telefoon` | `/lesmateriaal/pakket-g-telefoon` | ja |
| `/lesmateriaal/pakket-g` | `/lesmateriaal/pakket-h-ai` | ja |

**HARD:** `/pakket-g` → **alleen** AI (`pakket-h-ai`). **Nooit** naar `pakket-g-telefoon`.  
Canonical routes hebben **geen** redirect (geen loop).

---

## 6. Checkout refs

| Pagina/slug | `client_reference_id` |
|-------------|------------------------|
| `pakket-g-telefoon` (canonical shop) | `pakket_pakket-g-telefoon` |
| `pakket-h-ai` (canonical shop) | `pakket_pakket-h-ai` |
| `pakket-f-telefoon` (legacy, indien bereikt) | `pakket_pakket-f-telefoon` |
| `pakket-g` (legacy, indien bereikt) | `pakket_pakket-g` |

Geen historische identifier hergebruikt voor een ander product.

---

## 7. Loose lessons

| Context | Display | Tech | Checkout |
|---------|---------|------|----------|
| Mobiel G1–G4 | G1–G4 | Ft1–Ft4 | `los_ft1`–`los_ft4` |
| AI G1–G4 | G1–G4 | G1–G4 | `los_g1`–`los_g4` |

**HARD:** mobiel **nooit** `los_g*`; AI **geen** `los_ft*` / **geen** `los_h*`.

---

## 8. Legacy fulfillment

| Reference | Entitlement | Assets |
|-----------|-------------|--------|
| `pakket_pakket-f-telefoon` | MOBILE_G | `ft*` onder `pakket-f-telefoon/` |
| `pakket_pakket-g` | AI_H | `g*` onder `pakket-g/` |

Redirects = alleen webnavigatie. Fulfillment/entitlement **ongewijzigd**.

---

## 9. Signed tokens / fileIds

Read-only gecontroleerd:

- `ft1-print` → `pakket-f-telefoon/ft1-print.pdf`
- `g1-print` → `pakket-g/g1-print.pdf`

Geen fileId-rename · geen token-payloadwijziging · geen secretwijziging.

---

## 10. ZIP compatibility

| Identifier | Resultaat |
|------------|-----------|
| `zip-pakket-f-telefoon` | MOBILE_G |
| `zip-pakket-g-telefoon` | MOBILE_G |
| `zip-pakket-g` | AI_H |
| `zip-pakket-h-ai` | AI_H |

Geen ZIP fysiek gegenereerd of verplaatst.

---

## 11. Compleet_org

Na shop-cutover (shop = canonical only):

- MOBILE_G exact één keer (via storage-dedupe)
- AI_H exact één keer
- 8× `ft*` · 8× `g*` · geen duplicate fileIds

Fulfillment blijft dedupliceren op `resolveStoragePackageSlug`.

---

## 12. SEO / sitemap

`app/sitemap.ts` mappt `LESMATERIAAL_PAKKETTEN` → na cutover:

- `/lesmateriaal/pakket-g-telefoon`
- `/lesmateriaal/pakket-h-ai`

Legacy routes **niet** als aparte sitemap-producten.  
Geen SEO-refactor nodig (automatisch via catalogus).

Site-search / hub / interessepeiling gebruiken dezelfde shopcatalogus → canonical.

---

## 13. Cutover testmatrix

Script: `scripts/verify-pakket-g-cutover.ts`

**25 passed, 0 failed** (C1–C25).

---

## 14. ATOMIC A regressie

**40 passed, 0 failed**

Shop-asserts aangepast (was: “shop legacy-only”):

| Was (pre-cutover) | Nu (cutover) | Waarom |
|-------------------|--------------|--------|
| shop heeft geen `pakket-g-telefoon` / `pakket-h-ai` | shop **heeft** beide canonicals | Goedgekeurde cutover: shop = canonical |
| shop heeft `pakket-f-telefoon` / `pakket-g` | shop **geen** legacy; wel resolveerbaar | Geen dubbele kaarten; legacy fulfillment blijft |

Fulfillment-/ZIP-/fileId-asserts ongewijzigd in betekenis.

---

## 15. ATOMIC B regressie

**31 passed, 0 failed**

Shop-asserts aangepast (was: “shop excludes canonical / still has legacy”):

| Was | Nu | Waarom |
|-----|-----|--------|
| shop excludes canonical | shop **heeft** canonical | Cutover |
| shop still has legacy | shop **excludes** legacy | Geen duplicaten |
| — | exactly one mobile + one AI card | Expliciete anti-duplicaat-check |

Overige B1–B16 / display / entitlement / compleet asserts intact.

---

## 16. TypeScript

```text
npx --yes tsc --noEmit -p tsconfig.json
```

**exit 0 — PASS**

---

## 17. Post-hash

**16/16 PASS** (zelfde baselines; geen PDF/private wijziging).

---

## 18. Rollback

**Doel:** ATOMIC B freeze `98d81a0955572673410e3c518b1f901cfcc4b181`

Rollback **alleen** cutover-hunks:

1. Herstel `lesmateriaal-data.ts` shop = legacy + `CANONICAL_PAKKETTEN` (ATOMIC B-vorm)
2. Verwijder cutover-redirects uit `next.config.js`
3. Herstel A/B shop-asserts of verwijder cutover-script
4. **Geen** `git reset --hard`
5. ATOMIC A/B compatibility layers (fulfillment aliases, entitlements, fileIds) **intact laten**

---

## 19. Open punten

- Menselijke review + freeze vóór deploy
- Live redirect-gedrag pas na deploy verifieerbaar in browser
- Geen H1–H4-lesmigratie (bewust buiten scope)
- AI pakketletter **H** vs displaylessen **G1–G4** blijft tot latere inhoudsfase

---

## 20. GO/NO-GO

| Gate | Status |
|------|--------|
| Pre/post hash 16/16 | PASS |
| Shop canonical | PASS |
| Redirects hard rules | PASS |
| Checkout + legacy fulfillment | PASS |
| Loose / ZIP / fileIds / compleet | PASS |
| Cutover C1–C25 | PASS |
| ATOMIC A/B | PASS |
| TypeScript | PASS |
| External writes | GEEN |
| Deploy | NEE |

**GO voor menselijke review + freeze.**  
**NO-GO voor deploy** tot expliciete goedkeuring.

---

## 21. Self-check

- [x] Geen `pakket-g` → mobiel
- [x] `pakket_pakket-g` blijft AI_H
- [x] Mobiel = `ft*` / `los_ft*`
- [x] AI = `g*` / `los_g*`
- [x] Legacy fulfillment intact
- [x] Signed fileIds intact
- [x] compleet_org geen duplicates
- [x] Geen redirect-loop
- [x] Canonical routes bereikbaar (catalog)
- [x] Geen Stripe/Vercel/Brevo/sync/PDF
- [x] Hash 16/16
- [x] Rollbackpad gedocumenteerd
- [x] Geen commit · geen deploy

---

**Volgende stap bij PASS:** MENSELIJKE REVIEW + FREEZE VOORDAT DEPLOY WORDT TOEGESTAAN.

**STOP. GEEN DEPLOY. GEEN COMMIT.**
