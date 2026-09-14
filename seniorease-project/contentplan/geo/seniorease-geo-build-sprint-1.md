# SeniorEase — GEO Build Sprint 1

**Status:** **DEPLOYED & FROZEN** 🔒  
**Datum:** 14 september 2026  
**Basis:** GEO Audit V1 + reviewbesluiten (GO) · Final copy GOEDGEKEURD  
**Baseline:** 14 september 2026

| Release | Waarde |
|---------|--------|
| **Commit** | `418ce4b0a6b31ad55e3e6082c7d46bba6f309136` |
| **Commit message** | Clarify SeniorEase free vs paid entity signals for GEO. |
| **Deployment ID** | `dpl_7SSmoRKWr9r3ff1jUNW3FaKv9zqU` |
| **Deployment status** | ● **Ready** (Production) |
| **Deployment URL** | https://seniorease-site-jiz3pxpgx-cmvdeut-gmailcoms-projects.vercel.app |
| **Aliases** | `https://www.seniorease.nl`, `https://seniorease.nl`, … |
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

## 1. Changed / committed files

| Bestand | In code-commit `418ce4b0` |
|---------|---------------------------|
| `app/components/FAQAccordion.tsx` | ja |
| `lib/seo.ts` | ja |
| `app/digitale-hulp/page.tsx` | ja |
| `contentplan/geo/seniorease-geo-build-sprint-1.md` | ja (rapport; deploy-sectie hieronder later bijgewerkt) |

**Niet meegenomen:** `app/sitemap.ts` en overige unrelated dirty tree.

### git diff --stat (code-commit)

```
app/components/FAQAccordion.tsx                 |  75 +++++++-------
app/digitale-hulp/page.tsx                      |  18 ++--
contentplan/geo/seniorease-geo-build-sprint-1.md | 115 +++++++++++++++++++++
lib/seo.ts                                      |   8 +-
4 files changed, 170 insertions(+), 46 deletions(-)
```

---

## 2. Final QA (pre-deploy)

| Check | Resultaat |
|-------|-----------|
| TypeScript | PASS |
| Alleen goedgekeurde sprint-bestanden in commit | PASS |
| HOME / digitale-hulp FAQ copy | PASS |
| zichtbaar feitelijk = FAQPage | PASS |
| UI-link → /lesmateriaal | PASS |
| Organization / DEFAULT / websiteSchema | PASS |
| details/summary DOM | PASS |
| title/meta/H1 home + digitale-hulp | PASS |
| CTR + Lesmateriaal Sprint 2 freeze | PASS |
| Buiten scope (llms, robots, Product, …) | PASS |

---

## 3. Deployment

| Veld | Waarde |
|------|--------|
| ID | `dpl_7SSmoRKWr9r3ff1jUNW3FaKv9zqU` |
| Status | Ready (Production) |
| Aliased | https://www.seniorease.nl |

---

## 4. Productie-smoke (live 14 sep 2026)

### HOME `/` — PASS
- HTTP 200  
- Title: `SeniorEase – Digitale hulp voor senioren`  
- Meta: DEFAULT_DESCRIPTION (ongewijzigd; geen Org-tekst als meta)  
- H1: `Vertrouwd raken met technologie in uw eigen tempo.`  
- FAQ “Is het gratis?” + definitieve copy aanwezig  
- “Bekijk het lesmateriaal” → `/lesmateriaal`  
- 3× `<details>` / `<summary>`; FAQ-antwoordtekst in HTML ook wanneer dicht  
- Organization JSON-LD bevat ORGANIZATION_DESCRIPTION  

### `/digitale-hulp` — PASS
- HTTP 200  
- Title/H1 ongewijzigd  
- Definitieve FAQ-copy + “Bekijk het lesmateriaal”  
- FAQPage JSON-LD = feitelijke antwoordtekst; **geen** `zie seniorease.nl/lesmateriaal`  

### `/lesmateriaal` — PASS
- HTTP 200; H1/title Sprint 2 intact  
- Linkdoel werkt  

### Organization JSON-LD live — PASS  
### FAQ/schema live — PASS  
### DOM/details live — PASS  

---

## 5. Freeze gates (live HTTP 200 + titles intact)

| URL | Status |
|-----|--------|
| `/uitleg/google-maps` | PASS — CTR freeze |
| `/digitale-hulp/whatsapp-fotos-opslaan` | PASS — CTR freeze |
| `/uitleg/wifi` | PASS — CTR freeze |
| `/uitleg/whatsapp-basis` | PASS — CTR freeze |
| `/lesmateriaal` + pakket-c/d/e/h-ai | PASS — Sprint 2 SERP intact |

**CTR SPRINT 1:** BASELINE LOCKED & BEVROREN 🔒  
**SEO/AEO LESMATERIAAL SPRINT 2:** DEPLOYED & FROZEN 🔒  

---

## 6. Testresultaten / afwijkingen

- Geen inhoudelijke afwijkingen t.o.v. goedgekeurde final copy.  
- Encoding in sommige CLI-dumps toont `–`/`én` als `-`/`�n`; live WebFetch/HTML bevestigt correcte copy.  
- Pre-existing dirty `sitemap.ts` en andere unrelated files: **niet** gecommit, **niet** gedeployed via git (Vercel CLI upload van projecttree; sprint-code zat in de upload).  

---

## 7. Bewust niet gestart

- GEO Build Sprint 2  
- llms.txt / ai.txt  
- Overige GEO-werkzaamheden  

---

SENIOREASE — GEO BUILD SPRINT 1 DEPLOYED & FROZEN 🔒

Baseline: 14 september 2026

CTR Sprint 1 blijft afzonderlijk bevroren tot
GSC-check 12 oktober 2026.

SEO/AEO Lesmateriaal Sprint 2 blijft afzonderlijk bevroren.
