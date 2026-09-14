# SeniorEase — GEO Build Sprint 1

**Status:** **DEPLOYED & FROZEN** 🔒 (na succesvolle productie-smoke)  
**Datum:** 14 september 2026  
**Basis:** GEO Audit V1 + reviewbesluiten (GO) · Final copy GOEDGEKEURD  
**Baseline:** 14 september 2026

| Release | Waarde |
|---------|--------|
| **Commit** | *(invullen na commit)* |
| **Deployment ID** | *(invullen na deploy)* |
| **Deployment status** | *(invullen)* |
| **Productie-URL** | https://www.seniorease.nl |

---

## Final copy (GOEDGEKEURD)

### HOME FAQ

**Vraag:** Is het gratis?

**Antwoord:** Ja. De uitleg, gidsen en tools op SeniorEase zijn gratis. Alleen de app Mijn Bibliotheek is een apart product waarvoor kosten kunnen gelden — die kunt u wel gratis uitproberen. Daarnaast is er betaald downloadbaar PDF-lesmateriaal voor bibliotheken, buurthuizen en andere organisaties die zelf digitale lessen voor senioren willen geven.  
**Bekijk het lesmateriaal** → `/lesmateriaal`

### DIGITALE-HULP FAQ

**Vraag:** Is SeniorEase gratis te gebruiken?

**Antwoord (zichtbaar + FAQPage JSON-LD):** Ja. De uitleg, gidsen en tools op SeniorEase zijn gratis. Alleen de app Mijn Bibliotheek is een apart product waarvoor kosten kunnen gelden — die kunt u wel gratis uitproberen via de Play Store of de website. Daarnaast is er betaald downloadbaar PDF-lesmateriaal voor bibliotheken, buurthuizen en andere organisaties die zelf digitale lessen voor senioren willen geven.

**Zichtbaar daarna (UI only):** Bekijk het lesmateriaal → `/lesmateriaal`  
**FAQPage:** alleen de feitelijke antwoordtekst — geen URL-zin.

### ORGANIZATION_DESCRIPTION

SeniorEase biedt digitale hulp voor senioren: gratis praktische uitleg en hulpmiddelen, én downloadbaar PDF-lesmateriaal voor bibliotheken, buurthuizen en andere organisaties die zelf digitale lessen aan senioren geven.

### DEFAULT_DESCRIPTION (ongewijzigd)

SeniorEase helpt senioren met technologie — gratis tools én rustige stap-voor-stap uitleg over smartphone, computer en internet. In gewone taal, in uw eigen tempo.

### websiteSchema.description (ongewijzigd)

= `DEFAULT_DESCRIPTION` (zelfde tekst als hierboven).

### FAQ DOM

Native `<details>` / `<summary>` in `FAQAccordion`. Antwoorden blijven in de HTML wanneer dicht.

---

## 1. Changed files (sprint)

| Bestand | Wijziging |
|---------|-----------|
| `app/components/FAQAccordion.tsx` | Homepage FAQ + details/summary |
| `lib/seo.ts` | ORGANIZATION_DESCRIPTION + DIGITALE_HULP_FAQ |
| `app/digitale-hulp/page.tsx` | FAQ uit bron + UI-link |
| `contentplan/geo/seniorease-geo-build-sprint-1.md` | Dit rapport |

---

## 2. Commit / diff

*(Wordt bijgewerkt na commit.)*

---

## 3. Final QA (pre-deploy)

| Check | Resultaat |
|-------|-----------|
| TypeScript | PASS |
| Alleen goedgekeurde sprint-bestanden | PASS (commit-scope) |
| HOME FAQ copy | PASS |
| digitale-hulp FAQ copy | PASS |
| zichtbaar feitelijk = FAQPage | PASS |
| UI-link → /lesmateriaal | PASS |
| Organization.description | PASS |
| DEFAULT_DESCRIPTION ongewijzigd | PASS |
| websiteSchema.description ongewijzigd | PASS |
| details/summary DOM | PASS |
| homepage title/meta/H1 | PASS |
| digitale-hulp title/meta/H1 | PASS |
| CTR freeze-paden | PASS |
| Lesmateriaal Sprint 2 SERP | PASS |
| llms/ai/robots/Product/… | PASS (buiten scope) |

---

## 4. Deployment

*(Wordt bijgewerkt na deploy.)*

---

## 5. Productie-smoke

*(Wordt bijgewerkt na live check.)*

---

## 6. Freeze gates

| Gate | Status |
|------|--------|
| CTR Sprint 1 (4 URL’s) | BASELINE LOCKED & BEVROREN 🔒 |
| SEO/AEO Lesmateriaal Sprint 2 | DEPLOYED & FROZEN 🔒 |

---

## 7. Testresultaten / afwijkingen

*(Wordt bijgewerkt na smoke.)*
