# PAKKET G ATOMIC B IMPLEMENTATION V1
— TER REVIEW

**Status:** TER REVIEW — **geen redirects** · **geen cutover** · **geen commit** · **geen deploy**  
**Datum:** 2026-09-11  
**Fase:** 4G — ATOMIC B (canonical catalog + shop routes)  

**Parent freeze (ATOMIC A):** `eff1e7ec274afd98f136fe4a29ffe30965802dfc`  

**Technische conclusie:** **ATOMIC B IMPLEMENTATION: PASS**  
*(Menselijke review beslist over goedkeuring — vooral catalogus-/aliasconstructie.)*

---

## 1. Scope

Toegevoegd:

- Canonical routeerbare pakketten `pakket-g-telefoon` en `pakket-h-ai`
- Display vs technische lescodes (`displayCode` / `code`)
- Shop-overzicht blijft legacy-only (geen dubbele kaarten)
- Compleet_org / zip-compleet storage-deduplicatie
- Verificatiescript ATOMIC B

**Niet** gedaan: redirects · shop-cutover · checkout-default-switch · Stripe/Vercel/Brevo · sync · PDF · deploy · commit.

---

## 2. Pre-hash

**16/16 PASS**

---

## 3. Gewijzigde bestanden

| Bestand | Wijziging |
|---------|-----------|
| `app/lesmateriaal/lesmateriaal-data.ts` | `displayCode` · `CANONICAL_PAKKETTEN` · `listShopPakketten` / `listRoutablePakketten` · `getPakketBySlug` |
| `app/lesmateriaal/[slug]/page.tsx` | `listRoutablePakketten` in static params · `lessonDisplayCode` in UI |
| `app/components/LesmateriaalPakketBestelPanel.tsx` | Select/labels tonen `displayCode`; value blijft technische `code` |
| `lib/lesmateriaal-fulfillment.ts` | Order-label via gevraagde slug; compleet/zip-compleet dedupe op storage-slug |
| `scripts/verify-pakket-g-atomic-b.ts` | **Nieuw** B-tests |
| `scripts/verify-pakket-g-atomic-a.ts` | Shop-asserts via `listShopPakketten` (niet “getPakketBySlug === undefined”) |
| `docs/superpowers/specs/2026-09-11-pakket-g-atomic-b-implementation-v1.md` | Dit rapport |

---

## 4. Catalogusarchitectuur (kritisch punt)

**Keuze:** twee lagen

| Laag | Inhoud | Gebruik |
|------|--------|---------|
| `LESMATERIAAL_PAKKETTEN` / `listShopPakketten()` | Alleen legacy (incl. `pakket-f-telefoon`, `pakket-g`) | Overzichtskaarten, hub SEO-items, compleet_org-iteratie, interessepeiling |
| `CANONICAL_PAKKETTEN` (intern) | `pakket-g-telefoon`, `pakket-h-ai` | Route lookup via `getPakketBySlug` / `listRoutablePakketten` |

**Waarom:** voorkomt dat “twee slugs” → “twee shopkaarten” en → “dubbele downloads in compleet_org”.

**Inhoud:**

- Canonical mobiel deelt titels/lessen met F-telefoon-basis, maar `code: 'G'` + `displayCode: G1–G4` + technische `Ft1–Ft4`.
- Canonical AI: `code: 'H'` (technische H-identity op pakketniveau), lessen blijven **G1–G4** (geen H1–H4).
- Geen tweede PACKAGE_SOURCE; assets via ATOMIC A aliases.

**Review-aandacht:** of pakketletter **H** voor AI-canonical acceptabel is zonder lescodes H1–H4; of display tijdelijk nog “G” had moeten blijven. Huidige keuze: H op pakketkaart, G op lessen/PDF-consistentie.

---

## 5. Vier route-resoluties

| Route | Lookup | Entitlement |
|-------|--------|-------------|
| `/lesmateriaal/pakket-f-telefoon` | legacy shop | MOBILE_G |
| `/lesmateriaal/pakket-g-telefoon` | canonical | MOBILE_G |
| `/lesmateriaal/pakket-g` | legacy shop | AI_H |
| `/lesmateriaal/pakket-h-ai` | canonical | AI_H |

Onbekende slug → `notFound()` (bestaand).

---

## 6. Displaycode vs technische code

| Context | Display | Technisch (`code` / `los_*`) |
|---------|---------|------------------------------|
| Canonical mobiel | G1–G4 | Ft1–Ft4 → `los_ft*` |
| Canonical AI | G1–G4 | G1–G4 → `los_g*` |
| Legacy mobiel | Ft1–Ft4 | Ft1–Ft4 |
| Legacy AI | G1–G4 | G1–G4 |

Bestelpanel: `<option value={les.code}>` + zichtbare `lessonDisplayCode(les)`.

---

## 7. Checkoutreferences

| Pagina-slug | `client_reference_id` |
|-------------|------------------------|
| `pakket-f-telefoon` | `pakket_pakket-f-telefoon` |
| `pakket-g-telefoon` | `pakket_pakket-g-telefoon` |
| `pakket-g` | `pakket_pakket-g` |
| `pakket-h-ai` | `pakket_pakket-h-ai` |

Geen Stripe Payment Link-wijziging; shared PAKKET-link blijft.

---

## 8. Loose lessons

Canonical mobiel G1-display → checkout **`los_ft1`** (nooit `los_g1`).  
Canonical AI → **`los_g1`**.

---

## 9. Compleet-org deduplicatie

`resolveFulfillmentOrder(compleet)` en `assetsForZipBundle('zip-compleet')` itereren **alleen** `LESMATERIAAL_PAKKETTEN` en skippen duplicate **storage-slugs**.

Test: 8× `ft*` + 8× `g*` · geen dubbele fileIds.

---

## 10. Shopoverzicht

`LesmateriaalPakketten` / hub blijven op `LESMATERIAAL_PAKKETTEN` → **geen** dubbele G/H-kaarten.

Canonical alleen via directe URL.

---

## 11. Redirectstatus

**GEEN** nieuwe redirects (`next.config.js` / middleware ongewijzigd voor pakket-slugs).

---

## 12. Tests

```text
npx --yes tsx scripts/verify-pakket-g-atomic-b.ts
→ 29 passed, 0 failed
```

B1–B16 (+ shop/display/AI-no-H* asserts): **PASS**

---

## 13. ATOMIC A regressie

```text
npx --yes tsx scripts/verify-pakket-g-atomic-a.ts
→ 38 passed, 0 failed
```

Verify-script shop-asserts aangepast aan `listShopPakketten` (nodig na routeerbare canonicals).

---

## 14. TypeScript

```text
npx --yes tsc --noEmit -p tsconfig.json
→ exit 0
```

---

## 15. Post-hash

**16/16 PASS** · geen sync/PDF-wijziging.

---

## 16. Rollback

Terug naar ATOMIC A freeze **zonder** `git reset --hard`:

1. Herstel naar `eff1e7ec…` inhoud van:
   - `app/lesmateriaal/lesmateriaal-data.ts`
   - `app/lesmateriaal/[slug]/page.tsx`
   - `app/components/LesmateriaalPakketBestelPanel.tsx`
   - `lib/lesmateriaal-fulfillment.ts`
   - `scripts/verify-pakket-g-atomic-a.ts`
2. Verwijder:
   - `scripts/verify-pakket-g-atomic-b.ts`
   - dit rapportdocument (optioneel)

ATOMIC A-compatibiliteitslaag blijft intact.

---

## 17. Open punten

- Menselijke review: AI pakketletter **H** vs alleen slug `pakket-h-ai`
- Redirects / shop-cutover / sitemap-canonical: latere fasen
- Eerste live aankoop-controle (4D)

---

## 18. GO/NO-GO

| Criterium | Status |
|-----------|--------|
| Pre/post hash 16/16 | PASS |
| Vier routes + vier checkoutrefs | PASS |
| Display G1–G4 + Ft fulfillment | PASS |
| Loose lessons / geen cross | PASS |
| compleet_org + shop geen duplicaten | PASS |
| `pakket-g` blijft AI | PASS |
| ATOMIC A 38/0 | PASS |
| TypeScript | PASS |
| Geen redirects / physical assets | PASS |

**ATOMIC B IMPLEMENTATION: PASS**

---

## 19. Self-check

| | |
|--|--|
| Geen redirects/cutover/deploy/commit/sync/PDF | ✅ |
| Catalogusalias zonder dubbele shop/compleet | ✅ |
| Rapport TER REVIEW | ✅ |

### Commando’s

```text
python …                 # pre-hash 16/16
npx tsx …/atomic-a.ts    # 38/0
npx tsx …/atomic-b.ts    # 29/0
npx tsc --noEmit         # 0
python …                 # post-hash 16/16
```

---

**Volgende stap:** MENSELIJKE REVIEW (focus catalogus-/aliasconstructie)  

**STOP.** Geen redirects · geen cutover · geen deploy · geen commit.
