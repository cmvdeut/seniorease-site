# 📚 SeniorEase Project - Complete Samenvatting

**Laatst bijgewerkt:** 2025-01-XX  
**Versie:** 2.0 (met Engelse versie)  
**Status:** Actief in ontwikkeling

---

## 🎯 Project Overzicht

**SeniorEase** is een web applicatie speciaal ontworpen voor senioren om hun boeken collectie bij te houden. De applicatie is beschikbaar in **Nederlands** en **Engels**, met een focus op:
- Grote, duidelijke teksten
- Eenvoudige interface
- Geen technische termen
- Rustige, geruststellende communicatie
- Geen account verplichting
- Direct gebruik zonder registratie

### Kernfunctionaliteit

1. **Mijn Bibliotheek** - Boeken collectie beheer
   - Barcode scanner (ISBN/EAN)
   - Handmatige invoer
   - Online boek zoeken (Google Books API, Open Library)
   - Export (CSV, PDF)
   - Backup/Restore functionaliteit
   - Delen via WhatsApp/Email

2. **Demo Mode** - Gratis proberen
   - Max 10 boeken in demo versie
   - Volledige functionaliteit beschikbaar
   - Upgrade optie naar volledige versie (€2,99 eenmalig)

3. **Multi-taal Support**
   - Nederlands (standaard)
   - Engels (via `/en` routes)
   - Gescheiden data per taal
   - Taalwisselaar in header

4. **Extra Tools**
   - Grote Klok
   - Rekenmachine
   - Verjaardagskalender
   - Puzzels (Sudoku, Woordzoeker, Memory)

---

## 🛠️ Technische Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (useState, useEffect)
- **Storage:** localStorage (client-side)
- **Barcode Scanner:** QuaggaJS
- **QR Codes:** qrcode.react

### Backend
- **Runtime:** Node.js 20
- **API Routes:** Next.js API Routes
- **File Serving:** Next.js static file serving

### Deployment
- **Hosting:** Vercel
- **Domain:** seniorease.nl
- **DNS:** Strato
- **Version Control:** GitHub (cmvdeut/seniorease-site)

### Build Tools
- **Package Manager:** npm
- **Build Command:** `npm run build`
- **Development:** `npm run dev`

---

## 📁 Project Structuur

```
seniorease-project/
│
├── app/                              # Next.js App Router
│   ├── api/                          # API Routes
│   │   ├── contact/                  # Contact formulier
│   │   ├── download-app/             # Volledige APK download
│   │   ├── download-demo-app/        # Demo APK download
│   │   ├── poll-submit/              # Poll submissions
│   │   └── stripe-webhook/           # Payment webhooks
│   │
│   ├── components/                   # React Components
│   │   ├── DemoDownload.tsx          # Demo download component
│   │   ├── GebruikMijnBibliotheekButton.tsx  # Device-specific routing
│   │   ├── LanguageSwitcher.tsx      # Taalwisselaar
│   │   ├── LanguageProviderWrapper.tsx # Language context wrapper
│   │   ├── MobileDownload.tsx        # Mobile download component
│   │   └── PWAInstall.tsx            # PWA install prompt
│   │
│   ├── en/                           # Engelse versie routes
│   │   ├── layout.tsx                # English layout
│   │   ├── page.tsx                  # English homepage
│   │   └── bibliotheek/
│   │       └── page.tsx               # English library (re-exports)
│   │
│   ├── bibliotheek/                  # Bibliotheek app
│   │   └── page.tsx                  # Main library page (NL/EN)
│   │
│   ├── probeer-mijn-bibliotheek/     # Demo intro pagina
│   │   └── page.tsx
│   │
│   ├── gebruik-mijn-bibliotheek/     # Device routing pagina
│   │   └── page.tsx
│   │
│   ├── zo-werkt-het/                 # Uitleg pagina
│   │   └── page.tsx
│   │
│   ├── uitlegvideo/                  # Video pagina
│   │   └── page.tsx
│   │
│   ├── hulp/                         # Help/FAQ pagina
│   │   └── page.tsx
│   │
│   ├── contact/                     # Contact pagina
│   │   └── page.tsx
│   │
│   ├── extras/                       # Handige extra's
│   │   └── page.tsx
│   │
│   ├── puzzels/                      # Puzzels (Sudoku, Woordzoeker, Memory)
│   │   └── page.tsx
│   │
│   ├── klok/                         # Grote klok
│   │   └── page.tsx
│   │
│   ├── rekenmachine/                 # Rekenmachine
│   │   └── page.tsx
│   │
│   ├── kalender/                     # Verjaardagskalender
│   │   └── page.tsx
│   │
│   ├── page.tsx                      # Homepage
│   ├── layout.tsx                    # Root layout
│   ├── globals.css                   # Global styles
│   └── not-found.tsx                 # 404 pagina
│
├── lib/                              # Utility libraries
│   ├── translations.ts                # i18n vertaalbestanden
│   └── useLanguage.tsx               # Language context & hook
│
├── public/                           # Static files
│   ├── Seniorease-Bibliotheek.apk    # Volledige Android APK
│   ├── Seniorease-Bibliotheek-Demo.apk # Demo Android APK
│   ├── heart-logo.png                # Logo
│   └── manifest.json                 # PWA manifest
│
├── middleware.ts                     # Next.js middleware (routing)
├── next.config.js                    # Next.js configuratie
├── package.json                      # Dependencies
├── tailwind.config.js                # Tailwind CSS config
├── tsconfig.json                     # TypeScript config
├── vercel.json                       # Vercel deployment config
├── .nvmrc                            # Node.js versie (20)
├── .npmrc                            # npm configuratie
└── .env.local                        # Environment variables (lokaal)
```

---

## 🔑 Belangrijke Bestanden & Functies

### Core Files

#### `app/bibliotheek/page.tsx`
**Hoofdfunctionaliteit bibliotheek app:**
- Barcode scanner integratie (QuaggaJS)
- Boek zoeken (Google Books API, Open Library)
- Items toevoegen/bewerken/verwijderen
- Export functionaliteit (CSV, PDF)
- Backup/Restore
- Demo mode detectie en limiet (10 boeken)
- Multi-taal support (NL/EN)
- Feedback formulier na eerste boek
- Onboarding teksten

**Belangrijke state:**
- `items`: LibraryItem[] - Boekenlijst
- `isDemoMode`: boolean - Demo mode status
- `hasLicense`: boolean - Licentie status
- `language`: 'nl' | 'en' - Huidige taal

**Belangrijke functies:**
- `addItem()` - Voeg boek toe (met demo limiet check)
- `deleteItem()` - Verwijder boek
- `exportToCSV()` - Export naar CSV
- `exportToPDF()` - Export naar PDF (jsPDF)
- `backupMaken()` - Maak backup
- `lookupBook()` - Zoek boek via API

#### `lib/translations.ts`
**i18n vertaalbestand:**
- Definieert alle vertalingen voor NL en EN
- Helper functies:
  - `getTranslations(lang)` - Haal vertalingen op
  - `getCurrentLanguage()` - Detecteer huidige taal
  - `setLanguage(lang)` - Sla taal op
  - `getStorageKey(key, lang)` - Taal-specifieke localStorage keys

**Structuur:**
- `common` - Algemene teksten (save, cancel, etc.)
- `nav` - Navigatie items
- `home` - Homepage teksten
- `library` - Bibliotheek teksten
- `try` - Demo pagina teksten
- `options` - Opties menu
- `feedback` - Feedback formulier
- `errors` - Foutmeldingen
- `success` - Succesmeldingen

#### `lib/useLanguage.tsx`
**Language context provider:**
- Detecteert taal uit URL (`/en` = Engels)
- Biedt `useLanguage()` hook
- Functies:
  - `language` - Huidige taal
  - `translations` - Vertalingen object
  - `setLanguage(lang)` - Wijzig taal
  - `switchLanguage()` - Wissel tussen NL/EN

#### `app/components/LanguageSwitcher.tsx`
**Taalwisselaar component:**
- Toont 🇬🇧 EN / 🇳🇱 NL knop
- Wisselt tussen `/bibliotheek` en `/en/bibliotheek`
- Staat in header van alle pagina's

#### `app/page.tsx`
**Homepage:**
- Hero sectie met call-to-action
- Herkenning sectie
- "Wat is Mijn Bibliotheek" uitleg
- "Hoe werkt het" sectie
- Demo & Volledige versie info
- YouTube video's sectie
- Facebook sectie
- Navigatie menu
- Taalwisselaar in header

#### `middleware.ts`
**Next.js middleware:**
- Laat `/en` routes door
- Laat static files door
- Laat API routes door

---

## 🎨 Design Systeem

### Kleuren (Tailwind CSS)
- **Primary:** `#8B5E3C` (bruin)
- **Accent:** Custom accent kleur
- **Background:** `neutral-cream` (licht crème)
- **Text:** `gray-700`, `gray-800`

### Typography
**Custom font sizes (senior-friendly):**
- `text-senior-xs` - 14px
- `text-senior-sm` - 16px
- `text-senior-base` - 18px
- `text-senior-lg` - 20px
- `text-senior-xl` - 24px
- `text-senior-2xl` - 28px
- `text-senior-3xl` - 32px

**Definitie in `tailwind.config.js`:**
```javascript
fontSize: {
  'senior-xs': ['14px', { lineHeight: '1.5' }],
  'senior-sm': ['16px', { lineHeight: '1.5' }],
  // ... etc
}
```

### Spacing & Layout
- Container: `max-w-6xl mx-auto`
- Padding: `px-6 py-8` (standaard)
- Gaps: `gap-4` (standaard tussen elementen)
- Rounded corners: `rounded-xl` (standaard)

---

## 🔐 Data Management

### localStorage Keys

**Nederlandse versie:**
- `seniorease-library` - Boekenlijst
- `seniorease-demo-mode` - Demo mode status
- `seniorease-licentie` - Licentie status
- `seniorease-first-book-feedback` - Feedback gegeven status
- `seniorease-language` - Taal voorkeur

**Engelse versie:**
- `seniorease-library-en` - Engelse boekenlijst
- `seniorease-demo-mode-en` - Engelse demo mode
- `seniorease-first-book-feedback-en` - Engelse feedback

**Gedeeld:**
- `seniorease-language` - Taal voorkeur (gedeeld)

**Helper functie:**
```typescript
getStorageKey(key: string, lang: Language): string
// Returns: key (NL) or key-en (EN)
```

### Data Structuur

**LibraryItem:**
```typescript
interface LibraryItem {
  id: string;              // UUID
  type: 'book';            // Alleen boeken
  title: string;            // Boek titel
  author: string;           // Auteur (originele taal behouden)
  barcode: string;          // ISBN/EAN
  dateAdded: string;        // ISO date string
  notes?: string;           // Optionele notities
}
```

---

## 🌐 Internationalization (i18n)

### Implementatie
- **Systeem:** Custom i18n (geen externe library)
- **Detectie:** URL-based (`/en` = Engels)
- **Storage:** localStorage voor voorkeur
- **Context:** React Context API

### Routes
- **Nederlands:** `/bibliotheek`, `/`, etc.
- **Engels:** `/en/bibliotheek`, `/en`, etc.

### Taalwisselaar
- Component: `LanguageSwitcher`
- Locatie: Header (rechtsboven)
- Functionaliteit: Wisselt tussen `/bibliotheek` en `/en/bibliotheek`

### Vertalingen
- **Bestand:** `lib/translations.ts`
- **Structuur:** TypeScript interface met alle teksten
- **Uitbreiding:** Voeg nieuwe keys toe aan `Translations` interface

---

## 📱 Demo Mode

### Detectie
1. URL parameter: `?demo=true`
2. localStorage: `seniorease-demo-mode === 'true'`
3. Device detectie: Android = automatisch demo (optioneel)

### Limieten
- **Max boeken:** 10
- **Functionaliteit:** Volledig beschikbaar
- **Banner:** Toont "Demo versie - X/10 boeken gebruikt"

### Upgrade Flow
1. Demo limiet bereikt → Toon upgrade prompt
2. Link naar `/betalen` pagina
3. Volledige versie: €2,99 eenmalig

### APK Bestanden
- **Demo:** `public/Seniorease-Bibliotheek-Demo.apk`
- **Volledig:** `public/Seniorease-Bibliotheek.apk`
- **Download routes:** `/api/download-demo-app`, `/api/download-app`

---

## 🔌 API Integraties

### Google Books API
**Gebruik:** Boek informatie ophalen via ISBN
**Endpoint:** `https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}`
**Response:** Boek details (titel, auteur, etc.)

### Open Library API
**Gebruik:** Alternatieve boek zoekfunctie
**Endpoint:** `https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json&jscmd=data`
**Response:** Boek details

### Stripe (Payment)
**Gebruik:** Betalingen verwerken
**Webhook:** `/api/stripe-webhook`
**Status:** Geconfigureerd maar mogelijk niet actief

---

## 🚀 Deployment

### Vercel Configuratie

**`vercel.json`:**
```json
{
  "installCommand": "npm install --legacy-peer-deps --no-audit --no-fund",
  "buildCommand": "npm run build",
  "framework": "nextjs"
}
```

**`.nvmrc`:**
```
20
```

**`.npmrc`:**
```
legacy-peer-deps=true
prefer-offline=false
cache-max=0
force=true
audit=false
fund=false
```

### Environment Variables
**Lokaal (`.env.local`):**
- `VERCEL_TOKEN` - Vercel API token (voor scripts)

**Vercel Dashboard:**
- Environment variables worden daar ingesteld
- Geen hardcoded tokens in code!

### DNS Configuratie
- **Domain:** seniorease.nl
- **Registrar:** Strato
- **Hosting:** Vercel
- **A Record:** 216.198.79.1 (of Vercel IP)
- **CNAME:** www → Vercel

---

## 📦 Dependencies

### Core
- `next`: ^16.0.7
- `react`: ^18.x
- `react-dom`: ^18.x
- `typescript`: ^5.x

### UI & Styling
- `tailwindcss`: ^3.x
- `qrcode.react`: QR code generatie
- `quagga`: Barcode scanner

### Utilities
- `jspdf`: PDF generatie
- `dotenv`: Environment variables (voor scripts)

### Development
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `eslint`
- `eslint-config-next`

---

## 🎯 Belangrijke Features

### 1. Barcode Scanner
- **Library:** QuaggaJS
- **Functionaliteit:** Scan ISBN/EAN codes
- **Fallback:** Handmatige invoer
- **API Lookup:** Automatisch boek informatie ophalen

### 2. Export Functionaliteit
- **CSV:** Eenvoudige export voor Excel
- **PDF:** Formatted export met jsPDF
- **Email:** Delen via email client
- **WhatsApp:** Delen via WhatsApp

### 3. Backup/Restore
- **Backup:** Export naar JSON bestand
- **Restore:** Import van JSON bestand
- **Storage:** Client-side (localStorage)

### 4. Puzzels
- **Sudoku:** Met moeilijkheidsgraden
- **Woordzoeker:** Met drag-to-select
- **Memory:** Memory spel
- **Progress:** Opslaan per moeilijkheidsgraad

### 5. Progressive Web App (PWA)
- **Manifest:** `public/manifest.json`
- **Install Prompt:** `PWAInstall` component
- **Offline:** Basis offline functionaliteit

---

## 🔒 Security & Best Practices

### Security
- ✅ **Geen hardcoded tokens** - Alle tokens in environment variables
- ✅ **HTTPS only** - Vercel forceert HTTPS
- ✅ **Input validation** - Client-side en server-side
- ✅ **XSS protection** - React escape automatisch
- ✅ **CSRF protection** - Next.js built-in

### Best Practices
- ✅ **TypeScript** - Type safety
- ✅ **Error handling** - Try-catch blocks
- ✅ **Loading states** - User feedback
- ✅ **Accessibility** - ARIA labels
- ✅ **SEO** - Metadata in layout

---

## 📝 Development Guidelines

### Code Style
- **TypeScript:** Strict mode
- **Components:** Functional components met hooks
- **Naming:** PascalCase voor components, camelCase voor functies
- **Comments:** Nederlands voor business logic, Engels voor technische details

### File Organization
- **Components:** `app/components/`
- **Pages:** `app/[route]/page.tsx`
- **Utilities:** `lib/`
- **Static:** `public/`

### Git Workflow
- **Main branch:** `main`
- **Commits:** Duidelijke commit messages
- **No force push:** Altijd pull voor push

---

## 🐛 Bekende Issues & Limitations

### Limitations
1. **localStorage:** Client-side only, geen cloud sync
2. **Camera:** Werkt niet in emulator (alleen echte device)
3. **Offline:** Beperkte offline functionaliteit
4. **iOS:** Geen native iOS app (alleen web)

### Known Issues
- Geen bekende kritieke issues op dit moment

---

## 🚧 Toekomstige Uitbreidingen

### Gepland
1. **Cloud Sync:** Firebase/Supabase integratie
2. **User Accounts:** Optionele accounts voor sync
3. **Meer Talen:** Duits, Frans, etc.
4. **iOS App:** Native iOS versie
5. **Export Opties:** Meer export formaten

### Ideeën
- **Voice Input:** Spraakherkenning voor boek toevoegen
- **Book Recommendations:** Suggesties op basis van collectie
- **Statistics:** Uitgebreide statistieken
- **Social Sharing:** Delen op social media

---

## 📚 Belangrijke Documentatie

### Setup & Deployment
- `QUICKSTART.md` - Snel starten
- `ANDROID-STUDIO-TEST.md` - Testen in emulator
- `TEST-ENGLISH-VERSION-ANDROID.md` - Engelse versie testen
- `APK-INSTALLATIE-INSTRUCTIES.md` - APK installatie

### Development
- `ONTWIKKELINGS-RICHTLIJNEN.md` - Development guidelines
- `ARCHITECTURE.md` - Architectuur overzicht

### Troubleshooting
- `DEPLOYMENT-FIX.md` - Deployment problemen
- `SECURITY-FIX-URGENT.md` - Security fixes

---

## 🎓 Belangrijke Concepten

### Device Detection
```typescript
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
                 (window.innerWidth <= 768 && window.innerHeight <= 1024);
```

### Demo Mode Detection
```typescript
const urlParams = new URLSearchParams(window.location.search);
const demoParam = urlParams.get('demo');
const demoMode = localStorage.getItem('seniorease-demo-mode') === 'true' || 
                 demoParam === 'true';
```

### Language Detection
```typescript
const lang = pathname.startsWith('/en') ? 'en' : 'nl';
```

### Storage Key Helper
```typescript
function getStorageKey(key: string, lang: Language): string {
  return lang === 'en' ? `${key}-en` : key;
}
```

---

## 🔄 Recente Wijzigingen

### 2025-01-XX: Engelse Versie Toegevoegd
- ✅ i18n systeem geïmplementeerd
- ✅ Taalwisselaar component
- ✅ `/en` routes toegevoegd
- ✅ Alle bibliotheek teksten vertaald
- ✅ Gescheiden localStorage per taal
- ✅ Gescande boeken behouden originele taal

### Eerdere Wijzigingen
- Demo mode implementatie
- Puzzels met moeilijkheidsgraden
- Onboarding teksten
- Feedback formulier
- Social media links
- Menu vereenvoudiging
- Terminologie standaardisatie

---

## 📞 Contact & Support

### Project Info
- **Repository:** github.com/cmvdeut/seniorease-site
- **Domain:** seniorease.nl
- **Hosting:** Vercel

### Development
- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS

---

## ✅ Checklist voor Nieuwe Developers

### Setup
- [ ] Clone repository
- [ ] `npm install`
- [ ] `npm run dev`
- [ ] Open `http://localhost:3000`

### Testen
- [ ] Test Nederlandse versie: `/bibliotheek`
- [ ] Test Engelse versie: `/en/bibliotheek`
- [ ] Test taalwisselaar
- [ ] Test demo mode
- [ ] Test barcode scanner (op echte device)

### Development
- [ ] Lees `ONTWIKKELINGS-RICHTLIJNEN.md`
- [ ] Bekijk `lib/translations.ts` voor vertalingen
- [ ] Gebruik `useLanguage()` hook voor teksten
- [ ] Gebruik `getStorageKey()` voor localStorage

---

## 🎯 Quick Reference

### Belangrijkste Commands
```bash
npm run dev          # Start development server
npm run build        # Build voor productie
npm run start        # Start productie server
```

### Belangrijkste URLs
- Homepage: `/`
- Bibliotheek (NL): `/bibliotheek`
- Bibliotheek (EN): `/en/bibliotheek`
- Demo intro: `/probeer-mijn-bibliotheek`
- Hulp: `/hulp`
- Contact: `/contact`

### Belangrijkste Components
- `BibliotheekPage` - Hoofdfunctionaliteit
- `LanguageSwitcher` - Taalwisselaar
- `DemoDownload` - Demo download component
- `GebruikMijnBibliotheekButton` - Device routing

---

**Dit document dient als complete backup prompt voor het SeniorEase project. Alle belangrijke informatie staat hierin voor toekomstige ontwikkeling en onderhoud.**

