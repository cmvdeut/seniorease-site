# PAKKET G FIRST LIVE PURCHASE V1
— TER REVIEW

**Status:** AFGEROND — technische gates PASS · live download ZIP/print/beamer PASS (2026-09-13)  
**Datum:** 2026-09-13  
**Fase:** 4M — FIRST LIVE PURCHASE VERIFICATION · DEEL 1 (Pakket G mobiel)  

**Canonical slug:** `pakket-g-telefoon`  
**Verwachte reference:** `pakket_pakket-g-telefoon`  
**Verwachte entitlement:** `MOBILE_G`  

**Geen** Stripe/Vercel/Brevo writes in deze verificatie.

---

## 1. Aankoop gevonden

| Veld | Waarde |
|------|--------|
| Gevonden | **JA** (Stripe Live, read-only) |
| Session (gemaskeerd) | `cs_live_a1JQ…X0Ri` |
| Created (UTC) | 2026-09-13T10:27:48Z |
| Bedrag | €19,95 (`1995` eur) |
| Livemode | **true** |
| Mode | payment |

Geen test/fake order · geen webhook replay.

---

## 2. Payment status

**`payment_status = paid`** · `status = complete` → **PASS**

---

## 3. client_reference_id

**`pakket_pakket-g-telefoon`** → **PASS**

Expliciet **niet**:

| Verboden waarde | Check |
|-----------------|-------|
| `pakket_pakket-g` | afwezig |
| `pakket_pakket-f-telefoon` | afwezig |
| `pakket_pakket-h-ai` | afwezig |

---

## 4. Entitlement

Via bestaande fulfillment-logica (`parseClientReferenceId` → `entitlementForPackageSlug` / `resolveFulfillmentOrder`):

| | |
|--|--|
| Resultaat | **MOBILE_G** |
| Order label | `Pakket G: Internet — telefoon/tablet` |
| Kind | `pakket` |
| NOOIT AI_H | **bevestigd** |

---

## 5. fileIds

Exacte set voor deze aankoop:

```
ft1-print
ft1-beamer
ft2-print
ft2-beamer
ft3-print
ft3-beamer
ft4-print
ft4-beamer
```

| Check | Resultaat |
|-------|-----------|
| Alleen `ft*` | **PASS** |
| Geen `g*` | **PASS** |
| Aantal | 8 |

---

## 6. Storage-resolve

Alle relative paths onder:

`pakket-f-telefoon/*.pdf`

| Check | Resultaat |
|-------|-----------|
| Legacy storage map | **PASS** |
| Private bestanden aanwezig (lokaal baseline) | **PASS** (8/8) |
| Canonical map `pakket-g-telefoon/` vereist | **NEE** (bestaat niet — correct) |
| AI-pad `pakket-g/` in deze order | **NEE** |

---

## 7. Fulfillmentmail

Brevo transactional (read-only):

| Veld | Waarde |
|------|--------|
| Subject | `SeniorEase lesmateriaal — Pakket G: Internet — telefoon/tablet` |
| From | `info@seniorease.nl` |
| Ontvanger | live klant-e-mail (gemaskeerd in dit rapport) |
| Events | **sent** → **delivered** (2026-09-13 ~12:28 NL-tijd) |
| Signed downloadlinks | **aanwezig** (ZIP + 8 losse PDF-links) |
| Linklabels | Ft1–Ft4 print + beamer · ZIP “pakket F-t” (storage-label) |
| AI / Pakket H / `g*` downloads | **niet aanwezig** |

**Fulfillment mail: PASS**

*Opmerking (niet blocking voor entitlement): ZIP-knoptekst gebruikt nog storage-label “pakket F-t”; inhoud is MOBILE_G/`ft*`.*

---

## 8. Downloadtest (live order)

Via bestaande live session `pakket_pakket-g-telefoon` → `order-status` → signed URLs (2026-09-13):

- [x] ZIP opent (`application/zip`, ~7,8 MB) — label **Alles downloaden (ZIP) — pakket G**
- [x] Print-PDF opent (`application/pdf`) — label **G1 — lesmateriaal (print)**
- [x] Beamer-PDF opent (`application/pdf`) — label **G1 — beamer (optioneel)**
- [x] Labels klantgericht (G1–G4), geen Ft*/pakket F
- [x] Geen AI-documenten in deze order

**Status in dit document:** **PASS**

---

## 9. Cross-entitlement

| Check | Resultaat |
|-------|-----------|
| `pakket_pakket-g-telefoon` → MOBILE_G | **PASS** |
| assets `ft*` only | **PASS** |
| AI_H | **GEEN** |
| `g*` | **GEEN** |

**Cross-entitlement: GEEN**

---

## 10. Externe writes

| Systeem | Writes in deze fase |
|---------|---------------------|
| Code / git | **GEEN** (verificatie); copy A–H later apart |
| Deploy | **GEEN** (verificatie) |
| Stripe | **GEEN** (alleen read) |
| Vercel env | **GEEN** (tijdelijke lokale env-pull voor live key, daarna verwijderd) |
| Brevo | **GEEN** (alleen read; geen herverzending) |
| Sync / PDF / assets | **GEEN** |

---

## 11. GO/NO-GO

| | |
|--|--|
| Technische live-aankoop gates (payment · ref · entitlement · fileIds · storage · mail · cross) | **GO / PASS** |
| Live download ZIP + print + beamer | **GO / PASS** |
| Pakket H herbouw | **LATER** — shop mag blijven staan; inhoud volgt |

---

## Eindrapport-samenvatting

| Gate | Resultaat |
|------|-----------|
| Payment | **PASS** |
| client_reference_id | **PASS** |
| MOBILE_G entitlement | **PASS** |
| ft* fileIds | **PASS** |
| Geen g* | **PASS** |
| Storage resolve | **PASS** |
| Fulfillment mail | **PASS** |
| Print-PDF download | **PASS** |
| Beamer-PDF download | **PASS** |
| ZIP download | **PASS** |
| Cross-entitlement | **GEEN** |
| External writes (verificatie) | **GEEN** |
| **PAKKET G FIRST LIVE PURCHASE** | **PASS** |

**Pakket H:** blijft zichtbaar in de shop; herbouw volgt apart.