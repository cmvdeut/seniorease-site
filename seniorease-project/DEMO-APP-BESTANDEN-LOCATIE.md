# 📁 Demo App - Bestanden Locatie Overzicht

**Project Type:** Next.js 16 (React/TypeScript)
**Geen traditionele HTML/CSS/JS bestanden** - Alles is in React componenten (.tsx) en CSS modules

---

## 📂 Belangrijkste Demo App Bestanden

### 1. **React Componenten (TypeScript/TSX)**

**Demo Download Component:**
```
app/components/DemoDownload.tsx
```
- Component voor demo download sectie
- Toont demo banner en download knop

**Test Demo Pagina:**
```
app/test-demo/page.tsx
```
- Test pagina om demo mode te activeren
- Verwijdert licentie automatisch

**Bibliotheek Pagina (met demo mode):**
```
app/bibliotheek/page.tsx
```
- Hoofdfunctionaliteit bibliotheek app
- Bevat demo mode logica
- Limiet van 10 items in demo versie

**Download Pagina (met demo info):**
```
app/download/page.tsx
```
- Download pagina met demo informatie
- Demo banner en features

**Homepage (met demo sectie):**
```
app/page.tsx
```
- Hoofdpagina met demo sectie bovenaan
- QR code voor demo download

---

### 2. **API Routes (TypeScript)**

**Demo APK Download API:**
```
app/api/download-demo-app/route.ts
```
- Server-side route voor demo APK download
- Handelt download af van `public/Seniorease-Bibliotheek-Demo.apk`

---

### 3. **Styling (CSS)**

**Globale Styles:**
```
app/globals.css
```
- Alle globale CSS
- Tailwind CSS configuratie
- Custom senior-vriendelijke font sizes

**Inline Styling:**
- Meeste styling via Tailwind CSS classes in componenten
- Geen aparte CSS bestanden per component

---

### 4. **Static Assets (Public Folder)**

**Demo APK Bestand:**
```
public/Seniorease-Bibliotheek-Demo.apk
```
- Android APK bestand voor demo versie
- Direct downloadbaar via `/api/download-demo-app`

**Andere Assets:**
```
public/
├── Seniorease-Bibliotheek-Demo.apk  (Demo APK)
├── Seniorease-Bibliotheek.apk       (Betaalde versie)
├── heart-logo.png                   (Logo)
└── ... (andere assets)
```

---

## 🗂️ Complete Bestandsstructuur

```
seniorease-project/
│
├── app/                              # Next.js App Router
│   ├── components/
│   │   └── DemoDownload.tsx         # Demo download component
│   │
│   ├── api/
│   │   └── download-demo-app/
│   │       └── route.ts             # Demo APK download API
│   │
│   ├── bibliotheek/
│   │   └── page.tsx                 # Bibliotheek app (met demo mode)
│   │
│   ├── download/
│   │   └── page.tsx                 # Download pagina (met demo info)
│   │
│   ├── test-demo/
│   │   └── page.tsx                 # Test pagina voor demo mode
│   │
│   ├── page.tsx                     # Homepage (met demo sectie)
│   │
│   └── globals.css                  # Globale CSS styles
│
└── public/                           # Static files
    └── Seniorease-Bibliotheek-Demo.apk  # Demo APK bestand
```

---

## 💻 Code Type Overzicht

### **Geen HTML Bestanden**
- ❌ Geen `.html` bestanden
- ✅ React componenten (`.tsx`) renderen HTML

### **Geen Aparte JavaScript Bestanden**
- ❌ Geen `.js` bestanden voor demo app
- ✅ TypeScript/React componenten (`.tsx`)
- ✅ API routes in TypeScript (`.ts`)

### **CSS Locatie**
- ✅ `app/globals.css` - Globale styles
- ✅ Tailwind CSS classes inline in componenten
- ✅ Geen aparte CSS bestanden per component

---

## 🔍 Waar Is De Demo Code?

### **Frontend (Client-Side)**
**Locatie:** `app/bibliotheek/page.tsx`
- Demo mode detectie
- Demo banner weergave
- Limiet van 10 items
- Upgrade knop

**Belangrijke secties:**
```typescript
// Demo mode check
const hasLicense = typeof window !== 'undefined' && 
  localStorage.getItem('seniorease-licentie') === 'actief';

// Demo limiet
const DEMO_LIMIT = 10;
const isDemo = !hasLicense;
```

### **Download Functionaliteit**
**Locatie:** `app/api/download-demo-app/route.ts`
- Server-side download handler
- APK bestand uitlezen
- Content-Type headers

### **UI Componenten**
**Locatie:** `app/components/DemoDownload.tsx`
- Demo banner component
- Download knop
- Feature lijst

---

## 📝 Belangrijkste Demo Features

### 1. **Demo Mode Detectie**
```typescript
// In app/bibliotheek/page.tsx
const hasLicense = localStorage.getItem('seniorease-licentie') === 'actief';
const isDemo = !hasLicense;
```

### 2. **Demo Limiet**
```typescript
const DEMO_LIMIT = 10;
if (isDemo && libraryItems.length >= DEMO_LIMIT) {
  // Toon upgrade prompt
}
```

### 3. **Demo Banner**
```typescript
// In app/bibliotheek/page.tsx
{isDemo && (
  <div className="demo-banner">
    Demo Versie - {libraryItems.length}/{DEMO_LIMIT} items gebruikt
  </div>
)}
```

---

## 🎯 Hoe Te Bewerken

### **Demo Functionaliteit Aanpassen:**
1. Open: `app/bibliotheek/page.tsx`
2. Zoek naar: `DEMO_LIMIT` of `isDemo`
3. Pas aan en save

### **Demo UI Aanpassen:**
1. Open: `app/components/DemoDownload.tsx`
2. Pas styling of tekst aan
3. Save

### **Demo Download Aanpassen:**
1. Open: `app/api/download-demo-app/route.ts`
2. Pas download logica aan
3. Save

### **Styling Aanpassen:**
1. Open: `app/globals.css`
2. Of pas Tailwind classes aan in componenten
3. Save

---

## 📦 Build Output

**Na `npm run build`:**
- Next.js compileert alle `.tsx` → JavaScript bundles
- CSS wordt geoptimaliseerd
- Static assets blijven in `public/`

**Geen aparte HTML/CSS/JS bestanden** - Alles wordt server-side gerenderd of client-side gehydrateerd

---

## 🔗 URLs

**Demo gerelateerde pagina's:**
- `/` - Homepage (met demo sectie)
- `/bibliotheek` - Bibliotheek app (met demo mode)
- `/download` - Download pagina (met demo info)
- `/test-demo` - Test pagina (verwijdert licentie)
- `/api/download-demo-app` - Demo APK download

---

**Samenvatting:** Dit is een Next.js project, dus alle "HTML/CSS/JS" zit in React componenten (`.tsx`) en wordt gecompileerd tijdens build. Geen traditionele HTML/CSS/JS bestanden! 🚀






