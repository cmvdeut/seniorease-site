# PAKKET G ATOMIC A IMPLEMENTATION V1
— TER REVIEW

**Status:** TER REVIEW — **geen cutover** · **geen shop/redirect/deploy** · **geen commit**  
**Datum:** 2026-09-11  
**Fase:** 4E — ATOMIC A (entitlement + dual package resolution)  

**Technische conclusie:** **ATOMIC A IMPLEMENTATION: PASS**  
*(Menselijke review beslist over goedkeuring/bevriezing.)*

---

## 1. Scope

Geïmplementeerd:

- Interne entitlements `MOBILE_G` / `AI_H`
- Dual resolution: canonical slugs → bestaande storage/PACKAGE_SOURCE + private paths
- Fulfillment-orderresolutie voor canonical package references
- ZIP-assetresolutie via dezelfde aliaslaag
- Verificatiescript T1–T20 + regressie

**Niet** gedaan: shop-cutover · redirects · checkout-defaults · Stripe/Vercel/Brevo · sync · PDF · fileId-rename · legacy delete · deploy · commit.

---

## 2. Pre-hash gate

**16/16 PASS** (vóór codewijziging; baselines = runbook/inventaris).

---

## 3. Gewijzigde codebestanden

| Bestand | Rol |
|---------|-----|
| `lib/lesmateriaal-fulfillment.ts` | Entitlement + storage-aliases + dual `assetsForSlug` / `resolveFulfillmentOrder` / ZIP-labels |
| `scripts/verify-pakket-g-atomic-a.ts` | **Nieuw** — ATOMIC A verificatie (geen productgedrag) |
| `docs/superpowers/specs/2026-09-11-pakket-g-atomic-a-implementation-v1.md` | Dit rapport |

**Niet gewijzigd:** `lesmateriaal-data.ts` · `lesmateriaal-checkout.ts` · sync · shop pages · webhook · private PDF’s · Stripe.

---

## 4. Entitlementmodel

```text
LesmateriaalEntitlement = 'MOBILE_G' | 'AI_H'
```

| Storage slug (authoritative) | Entitlement |
|------------------------------|-------------|
| `pakket-f-telefoon` | MOBILE_G |
| `pakket-g` | AI_H |

API: `entitlementForPackageSlug(slug)`.

---

## 5. Legacy / canonical mappings

| Identifier | Storage slug | Entitlement |
|------------|--------------|-------------|
| `pakket-f-telefoon` · `pakket_pakket-f-telefoon` | `pakket-f-telefoon` | MOBILE_G |
| `pakket-g-telefoon` · `pakket_pakket-g-telefoon` | `pakket-f-telefoon` | MOBILE_G |
| `pakket-g` · `pakket_pakket-g` | `pakket-g` | AI_H |
| `pakket-h-ai` · `pakket_pakket-h-ai` | `pakket-g` | AI_H |

**HARD:** `pakket-g` / `pakket_pakket-g` → AI_H only (geen alias naar mobiel).

---

## 6. PACKAGE_SOURCE / resolver

- `PACKAGE_SOURCE` blijft één definitie per storage-slug (geen vier gekopieerde sets).
- `PACKAGE_STORAGE_ALIASES`: `pakket-g-telefoon`→`pakket-f-telefoon`, `pakket-h-ai`→`pakket-g`.
- `resolveStoragePackageSlug` + `assetsForSlug` gebruiken storage-slug voor `destRel` → fysiek:
  - MOBILE_G → `private/.../pakket-f-telefoon/ft*.pdf`
  - AI_H → `private/.../pakket-g/g*.pdf`
- Geen nieuwe private mappen · geen copy/move.

---

## 7. Parserwijziging

`parseClientReferenceId` **ongewijzigd** — modern formaat `pakket_{slug}` accepteerde al `pakket-g-telefoon` / `pakket-h-ai`.

Wijziging zit in `resolveFulfillmentOrder`: cataloguslookup via **storage-slug** zodat canonical references een order krijgen zonder shop-entries.

---

## 8. Loose lesson behavior

Ongewijzigd first-match op `PACKAGE_SOURCE`:

- `los_ft*` → Ft* / `ft*` (MOBILE)
- `los_g*` → G* / `g*` (AI)
- Geen `los_h*` · geen mobiele `los_g*`

---

## 9. ZIP behavior

`assetsForZipBundle('zip-pakket-…')` → `assetsForSlug` (met alias).

| ZIP id | Assets |
|--------|--------|
| `zip-pakket-f-telefoon` | MOBILE_G ft* |
| `zip-pakket-g-telefoon` | MOBILE_G ft* (zelfde) |
| `zip-pakket-g` | AI_H g* |
| `zip-pakket-h-ai` | AI_H g* (zelfde) |

Geen ZIP gegenereerd / verplaatst.

---

## 10. Checkout behavior

`lib/lesmateriaal-checkout.ts` **niet** gewijzigd.

Shop slugs blijven:

- mobiel → `pakket_pakket-f-telefoon`
- AI → `pakket_pakket-g`

Canonical references worden herkend door fulfillment, maar **niet** door shop geproduceerd.

---

## 11. Positieve tests

Uitgevoerd: `npx --yes tsx scripts/verify-pakket-g-atomic-a.ts` → **38 passed, 0 failed**

T1–T13 + ZIP dual + shop-unchanged + findAsset + pakket-a/los_a1: **PASS**

---

## 12. Negatieve tests

T14–T20: **PASS** (geen cross-entitlement; onbekende slug → parse ok, order `null`)

---

## 13. Regressietests

| Check | Resultaat |
|-------|-----------|
| `pakket-a` / `pakket_pakket-a` / `los_a1` | PASS |
| `compleet_org` | PASS |
| `findAssetByFileId` ft*/g* | PASS |
| Shop catalogus zonder canonical entries | PASS |
| Checkoutrefs legacy | PASS |

---

## 14. Post-hash gate

**16/16 PASS** (na implementatie; private bytes ongewijzigd).

---

## 15. Rollback

Baseline commit: `ad63d512392366a4e6f04445d903e18de842b8c5`

**Niet** `git reset --hard` (andere dirty files).

Rollback ATOMIC A:

1. Herstel alleen:
   - `lib/lesmateriaal-fulfillment.ts` naar pre-ATOMIC-A inhoud (of `git checkout ad63d512 -- seniorease-project/lib/lesmateriaal-fulfillment.ts` vanuit monorepo-root)
2. Verwijder `scripts/verify-pakket-g-atomic-a.ts` indien gewenst
3. Geen PDF/Stripe/private/filesystem rollback nodig

---

## 16. Open punten

- Shop/cutover/canonical routes: latere fase  
- Eerste echte live aankoop-controle (4D restrisico)  
- Sync script bewust **niet** dual (voorkomt nieuwe private mappen)  
- Geen commit in deze opdracht  

---

## 17. GO/NO-GO

| Criterium | Status |
|-----------|--------|
| Pre/post hash 16/16 | PASS |
| Vier package refs | PASS |
| Legacy + canonical MOBILE_G / AI_H | PASS |
| ft* / g* scheiding · los · geen cross | PASS |
| Checkoutrefs unchanged · shop unchanged | PASS |
| Geen redirects · geen physical asset change | PASS |
| Regressie | PASS |
| Rollback beschreven | PASS |

**ATOMIC A IMPLEMENTATION: PASS**

---

## 18. Self-check

| | |
|--|--|
| Alleen ATOMIC A-scope | ✅ |
| Geen shop/redirect/cutover/deploy/sync/PDF/Stripe | ✅ |
| Geen commit | ✅ |
| `pakket-g` blijft AI | ✅ |
| Rapport TER REVIEW (niet GOEDGEKEURD/BEVROREN) | ✅ |

### Commando’s uitgevoerd

```text
python …  # pre-hash 16/16
npx --yes tsx scripts/verify-pakket-g-atomic-a.ts  # 38 passed
python …  # post-hash 16/16
npx --yes tsc --noEmit -p tsconfig.json  # exit 0
```

Geen `sync:lesmateriaal-downloads` · geen `build` · geen deploy.

---

**Volgende stap bij PASS:** MENSELIJKE REVIEW VAN ATOMIC A  

**STOP.** Geen cutover · geen ATOMIC B · geen shopwijziging · geen redirect · geen deploy.
