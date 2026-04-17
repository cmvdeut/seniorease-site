# AI Contentmachine – SeniorEase

Eén systeem voor **alle** AI-content van SeniorEase: social media én website-artikelen.

---

## Wat zit erin?

| Onderdeel | Wat het doet | Hoe je het gebruikt |
|-----------|--------------|----------------------|
| **Social posts** | 3× per week automatisch posts met Claude → Facebook | Vercel cron (ma/wo/vr 10:00), of handmatig `npm run test-generate` |
| **Website-artikelen** | AI schrijft uitlegartikelen voor Digitale hulp (zelfde stijl als bestaande) | Lokaal: `npm run generate-article -- "Onderwerp"` |

Beide gebruiken dezelfde **ANTHROPIC_API_KEY** (Claude) in `.env`.

---

## Website-artikelen genereren

### 1. Eén artikel

```bash
cd Agent/seniorease-content-agent
npm run generate-article -- "WhatsApp groep aanmaken"
```

- Er wordt een bestand weggeschreven in **`output/artikel-<slug>.json`**.
- Daarin staan: slug, title, description, keywords, intro, probleem, stappen, tips, samenvatting, gerelateerde slugs.

### 2. Artikel op de site zetten

1. **artikelen.ts**  
   Voeg een nieuw item toe in `app/digitale-hulp/artikelen.ts`:

   ```ts
   { slug: "<slug>", title: "<title>", description: "<description>", keywords: ["..."] }
   ```

2. **Artikelcontent**  
   In `app/digitale-hulp/[slug]/page.tsx` een nieuw `case '<slug>':` toevoegen en de gegenereerde intro, probleem, stappen, tips en samenvatting in JSX zetten. Voor "Gerelateerde uitleg" de `relatedSlugs` uit de JSON gebruiken en naar `/digitale-hulp/...` of `/uitleg/...` linken.

### 3. Onderwerpen-ideeën

- In **`config/article-topics.json`** staat een lijst met ideeën.
- Je kunt elk onderwerp handmatig aan de CLI geven:  
  `npm run generate-article -- "Jouw onderwerp"`.

---

## Vereisten

- **Claude API-key** in `.env` als `ANTHROPIC_API_KEY` (zelfde als voor social posts).
- **Node 18+** en `npm install` in `Agent/seniorease-content-agent`.

---

## Overzicht flow

```
┌─────────────────────────────────────────────────────────────┐
│  AI Contentmachine SeniorEase                               │
├─────────────────────────────────────────────────────────────┤
│  Social media          │  Website (Digitale hulp)           │
│  • generate-content   │  • generate-article.js             │
│  • schedule-posts      │  • output/artikel-<slug>.json      │
│  • Facebook (cron)     │  • Handmatig in artikelen.ts +     │
│                        │    [slug]/page.tsx plakken         │
└─────────────────────────────────────────────────────────────┘
```

Vragen of aanpassingen? Pas de prompts in `lib/article-generator.js` of `lib/claude.js` aan.
