# SEO/AEO Lesmateriaal — Build Sprint 2

**Status:** **DEPLOYED & FROZEN** 🔒  
**Datum:** 14 september 2026  
**Bron-audit:** `contentplan/gsc/seo-aeo-lesmateriaal-audit-v1.md` (GOEDGEKEURD)  
**Baseline:** 14 september 2026

| Release | Waarde |
|---------|--------|
| **Commit hash** | `af340a0585a6f55673f358e32f65b45123acd0c9` |
| **Commit message** | Improve SEO/AEO for lesmateriaal hub and packages C/D/E/H. |
| **Deployment ID** | `dpl_ACwTnTZ1sYc1uhukf8193j9Sd6FJ` |
| **Deployment URL** | https://seniorease-site-hnm7218za-cmvdeut-gmailcoms-projects.vercel.app |
| **Deployment status** | ● **Ready** (Production) |
| **Aliases** | `https://www.seniorease.nl`, `https://seniorease.nl`, … |
| **Productie-URL** | https://www.seniorease.nl |

---

## Copy-correctie vóór commit (Pakket H meta)

**Finale meta** `/lesmateriaal/pakket-h-ai` (~168 tekens):

> AI-lesmateriaal waarmee uw organisatie zelf een praktische AI-workshop voor senioren kan geven. Gemini is voorbeeld; ook bij andere AI-assistenten. Vier lessen, €19,95.

- Geen “vendor-onafhankelijk”
- Gemini = voorbeeld, niet het product
- Geen ChatGPT-cursus-suggestie  
**Productie-smoke:** meta aanwezig en correct.

---

## Scope-check (hard)

| Check | Resultaat |
|-------|-----------|
| routes gewijzigd | **NEE** |
| redirects gewijzigd | **NEE** |
| canonicals gewijzigd | **NEE** |
| prijzen gewijzigd | **NEE** (€6,95 / €19,95 / €149) |
| checkout / Stripe / Brevo / fulfillment | **NEE** |
| PDF/lesinhoud / `lesmateriaal-data.ts` | **NEE** |
| CTR Sprint 1 onverwacht gewijzigd | **NEE** |
| QAPage | **NEE** |
| TypeScript | **PASS** (`tsc --noEmit`) |

---

## Changed-files (commit)

```
seniorease-project/app/components/guide/WhatsAppBeginnersGuide.tsx
seniorease-project/app/components/guide/WhatsAppVideobellenGuide.tsx
seniorease-project/app/digitale-hulp/[slug]/page.tsx
seniorease-project/app/lesmateriaal/LesmateriaalFaq.tsx
seniorease-project/app/lesmateriaal/[slug]/page.tsx
seniorease-project/app/lesmateriaal/lesmateriaal-seo-overrides.ts
seniorease-project/app/lesmateriaal/page.tsx
seniorease-project/app/uitleg/digid/page.tsx
seniorease-project/app/uitleg/veiligheid/page.tsx
seniorease-project/app/wat-is-ai/page.tsx
seniorease-project/contentplan/gsc/seo-aeo-lesmateriaal-sprint-2-deploy.md
```

`git diff --stat` (commit):

```
11 files changed, 323 insertions(+), 31 deletions(-)
```

---

## Per gewijzigde URL (samenvatting)

| URL | Title (final) | H1 | Opening | Schema |
|-----|---------------|----|---------|--------|
| `/lesmateriaal` | Lesmateriaal digitale vaardigheden voor senioren \| SeniorEase | Lesmateriaal digitale vaardigheden voor senioren | org-zin + PDF-belofte | CollectionPage + FAQPage |
| `/lesmateriaal/pakket-c` | WhatsApp-lesmateriaal — zelf een cursus… | WhatsApp | lead + description | Product+Offer intact |
| `/lesmateriaal/pakket-d` | Veilig online — lesmateriaal voor organisaties | Veilig online | lead + description | Product+Offer intact |
| `/lesmateriaal/pakket-e` | DigiD-lesmateriaal — zelf een workshop… | DigiD & digitale overheid | lead + description (geen echte login) | Product+Offer intact |
| `/lesmateriaal/pakket-h-ai` | Pakket H — AI… — lesmateriaal voor organisaties | Pakket H — AI in het dagelijks leven | lead + description | Product+Offer intact |

---

## Productie-smoke (14 sep 2026, post-deploy)

| URL | HTTP | Title | Meta | H1 | Opening | Canonical | Extra |
|-----|------|-------|------|----|---------|-----------|-------|
| `/lesmateriaal` | **200** | OK | OK | OK | OK | self | 6 AEO-FAQ zichtbaar · FAQPage · geen QAPage |
| `/lesmateriaal/pakket-c` | **200** | OK | OK | OK | OK | self | Product/Offer · €19,95 · lessen intact |
| `/lesmateriaal/pakket-d` | **200** | OK | OK | OK | OK | self | Product/Offer · €19,95 |
| `/lesmateriaal/pakket-e` | **200** | OK | OK | OK | OK | self | Product/Offer · €19,95 · geen echte login |
| `/lesmateriaal/pakket-h-ai` | **200** | OK | OK (Gemini-voorbeeld, geen vendor-woord) | OK | OK | self | Product/Offer · €19,95 |

**Afwijkingen:** geen (smoke-script H1-check voor E faalde eerst op HTML-entity `&amp;` vs `&`; zichtbare H1 correct).

---

## Bruglink-smoke

| Bron → doel | Resultaat |
|-------------|-----------|
| whatsapp-uitleg-beginners → pakket-c | **PASS** (200→200, link aanwezig) |
| whatsapp-videobellen-uitleg → pakket-c | **PASS** |
| /uitleg/veiligheid → pakket-d | **PASS** |
| phishing-herkennen → pakket-d | **PASS** |
| /uitleg/digid → pakket-e | **PASS** |
| /wat-is-ai → pakket-h-ai | **PASS** |
| wat-is-ai-simpel-uitgelegd → pakket-h-ai | **PASS** |

---

## CTR Sprint 1 — FREEZE GATE

Geen inhoudelijke wijziging in deze sprint aan:

- `/uitleg/google-maps`
- `/digitale-hulp/whatsapp-fotos-opslaan`
- `/uitleg/wifi`
- `/uitleg/whatsapp-basis`

Alle vier bereikbaar **200** na deploy.

**CTR SPRINT 1 — BASELINE LOCKED & BEVROREN 🔒**  
GSC-check: 12 oktober 2026.

---

## B2C → B2B bruggen (bestanden)

| Bron | Doel | Bestand |
|------|------|---------|
| WhatsApp beginners | C | `WhatsAppBeginnersGuide.tsx` |
| WhatsApp videobellen | C | `WhatsAppVideobellenGuide.tsx` |
| Veiligheid | D | `uitleg/veiligheid/page.tsx` |
| Phishing herkennen | D | `digitale-hulp/[slug]/page.tsx` |
| DigiD | E | `uitleg/digid/page.tsx` |
| Wat is AI | H | `wat-is-ai/page.tsx` |
| AI simpel uitgelegd | H | `digitale-hulp/[slug]/page.tsx` |

---

SEO/AEO LESMATERIAAL — SPRINT 2 DEPLOYED & FROZEN 🔒

Baseline: 14 september 2026

CTR Sprint 1-pagina's blijven afzonderlijk bevroren tot GSC-check 12 oktober 2026.
