# SEO/AEO Lesmateriaal — Build Sprint 2

**Status:** DEPLOYED & FROZEN 🔒  
**Datum:** 14 september 2026  
**Bron-audit:** `contentplan/gsc/seo-aeo-lesmateriaal-audit-v1.md` (GOEDGEKEURD)  
**Baseline:** 14 september 2026

| Release | Waarde |
|---------|--------|
| **Commit hash** | _(na commit)_ |
| **Deployment ID** | _(na deploy)_ |
| **Deployment status** | _(na deploy)_ |
| **Productie-URL** | https://www.seniorease.nl |

---

## Copy-correctie vóór commit (Pakket H meta)

**Finale meta** `/lesmateriaal/pakket-h-ai` (~168 tekens):

> AI-lesmateriaal waarmee uw organisatie zelf een praktische AI-workshop voor senioren kan geven. Gemini is voorbeeld; ook bij andere AI-assistenten. Vier lessen, €19,95.

- Geen “vendor-onafhankelijk”
- Gemini = voorbeeld, niet het product
- Geen ChatGPT-cursus-suggestie

---

## Scope-check (hard)

| Check | Resultaat |
|-------|-----------|
| routes gewijzigd | **NEE** |
| redirects gewijzigd | **NEE** |
| canonicals gewijzigd | **NEE** (self-canonical via bestaande `buildPageMetadata`) |
| prijzen gewijzigd | **NEE** (€6,95 / €19,95 / €149) |
| checkout gewijzigd | **NEE** |
| Stripe gewijzigd | **NEE** |
| Brevo gewijzigd | **NEE** |
| fulfillment gewijzigd | **NEE** |
| PDF/lesinhoud gewijzigd | **NEE** |
| `lesmateriaal-data.ts` | **NEE** |
| CTR Sprint 1 onverwacht gewijzigd | **NEE** |
| GEO-sprint | **NEE** |
| nieuwe landingspagina’s / routes | **NEE** |
| QAPage | **NEE** |

---

## Per gewijzigde URL

### 1. `/lesmateriaal`

| Veld | BEFORE | AFTER |
|------|--------|-------|
| **Title** | Digitaal lesmateriaal voor bibliotheken en begeleiders | Lesmateriaal digitale vaardigheden voor senioren |
| **Meta** | Digitaal lesboek (PDF) voor rustige doe-middagen… | Lesmateriaal digitale vaardigheden voor senioren — voor bibliotheken, buurthuizen en organisaties die zelf les willen geven. Digitaal lesboek (PDF): downloaden, printen, praktisch oefenen. Geen online cursusplatform. Themapakketten en losse lessen. |
| **H1** | Digitaal lesmateriaal voor rustige doe-middagen. | Lesmateriaal digitale vaardigheden voor senioren |
| **Openingscopy** | Ja | Ja — org-zin onder H1 + productbelofte |
| **FAQ** | Ja | Ja — 6 AEO-vragen vooraan; zichtbaar ↔ FAQPage synchroon |
| **Schema** | CollectionPage + FAQPage | CollectionPage aangescherpt; FAQPage bijgewerkt |
| **Bestanden** | `page.tsx`, `LesmateriaalFaq.tsx` | |

### 2. `/lesmateriaal/pakket-c`

| Veld | BEFORE | AFTER |
|------|--------|-------|
| **Title** | Pakket C: WhatsApp | WhatsApp-lesmateriaal — zelf een cursus voor senioren geven |
| **Meta** | description + Digitaal lesboek… €19,95 | Kant-en-klaar WhatsApp-lesmateriaal… zelf cursus/workshop… €19,95. |
| **H1** | WhatsApp | WhatsApp *(ongewijzigd)* |
| **Openingscopy** | description | lead + description |
| **Schema** | Product + Offer | **intact** (description/prijs uit data) |

### 3. `/lesmateriaal/pakket-d`

| Veld | BEFORE | AFTER |
|------|--------|-------|
| **Title** | Pakket D: Veilig online | Veilig online — lesmateriaal voor organisaties |
| **Meta** | description + Digitaal lesboek… | Lesmateriaal veilig internetten… zelf lessen… €19,95. |
| **H1** | Veilig online | Veilig online *(ongewijzigd)* |
| **Openingscopy** | description | lead + description |
| **Schema** | Product + Offer | **intact** |

### 4. `/lesmateriaal/pakket-e`

| Veld | BEFORE | AFTER |
|------|--------|-------|
| **Title** | Pakket E: DigiD & digitale overheid | DigiD-lesmateriaal — zelf een workshop voor senioren geven |
| **Meta** | description + Digitaal lesboek… | DigiD-lesmateriaal… zonder echte login in de klas… €19,95. |
| **H1** | DigiD & digitale overheid | DigiD & digitale overheid *(ongewijzigd)* |
| **Openingscopy** | description (geen echte login) | lead + description |
| **Schema** | Product + Offer | **intact** |

### 5. `/lesmateriaal/pakket-h-ai`

| Veld | BEFORE | AFTER |
|------|--------|-------|
| **Title** | Pakket H: Pakket H — AI in het dagelijks leven | Pakket H — AI in het dagelijks leven — lesmateriaal voor organisaties |
| **Meta** | Leer AI gebruiken… | **Finale:** AI-lesmateriaal waarmee uw organisatie zelf een praktische AI-workshop voor senioren kan geven. Gemini is voorbeeld; ook bij andere AI-assistenten. Vier lessen, €19,95. |
| **H1** | Pakket H — AI in het dagelijks leven | *(ongewijzigd; lessen H1–H4 in data ongewijzigd)* |
| **Openingscopy** | description | lead + description |
| **Schema** | Product + Offer | **intact** |

---

## B2C → B2B bruggen

| Bronpagina | Doel | Bestand |
|------------|------|---------|
| `/digitale-hulp/whatsapp-uitleg-beginners` | Pakket C | `WhatsAppBeginnersGuide.tsx` |
| `/digitale-hulp/whatsapp-videobellen-uitleg` | Pakket C | `WhatsAppVideobellenGuide.tsx` |
| `/uitleg/veiligheid` | Pakket D | `uitleg/veiligheid/page.tsx` |
| `/digitale-hulp/phishing-herkennen` | Pakket D | `digitale-hulp/[slug]/page.tsx` |
| `/uitleg/digid` | Pakket E | `uitleg/digid/page.tsx` |
| `/wat-is-ai` | Pakket H | `wat-is-ai/page.tsx` |
| `/digitale-hulp/wat-is-ai-simpel-uitgelegd` | Pakket H | `digitale-hulp/[slug]/page.tsx` |

---

## CTR Sprint 1 — FREEZE GATE

Geen inhoudelijke wijziging aan:

- `/uitleg/google-maps`
- `/digitale-hulp/whatsapp-fotos-opslaan`
- `/uitleg/wifi`
- `/uitleg/whatsapp-basis`

**CTR SPRINT 1 — BASELINE LOCKED & BEVROREN 🔒**  
GSC-check: 12 oktober 2026.

---

## Commit / deploy / smoke

_(Wordt hieronder ingevuld na commit + productie-smoke.)_

### Changed-files

```
(pending)
```

### git diff --stat

```
(pending)
```

### Productie-smoke

_(pending)_

### Bruglink-smoke

_(pending)_

### Afwijkingen

geen (na afronding)
