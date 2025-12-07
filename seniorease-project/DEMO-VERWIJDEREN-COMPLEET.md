# 🗑️ Demo Elementen Volledig Verwijderen

**Probleem:** Demo elementen zijn nog steeds zichtbaar op de website.

**Oplossing:** Verwijder of pas aan alle demo-gerelateerde elementen.

---

## 🔍 Wat Is Er Nog Zichtbaar?

### 1. Homepage - Demo Download Sectie
**Locatie:** `app/page.tsx` regel 144-149

**Wat staat er:**
```tsx
{/* Demo Versie - Compact en netjes uitgelijnd */}
<div className="bg-white rounded-2xl shadow-xl border-4 border-primary overflow-hidden">
  <div className="p-5 md:p-6">
    <DemoDownload />
  </div>
</div>
```

**Opties:**
- **Optie A:** Verwijder hele sectie (als demo APK niet meer nodig is)
- **Optie B:** Hernoem naar "Gratis APK Download" (als demo APK nog beschikbaar moet zijn)
- **Optie C:** Verplaats naar `/download` pagina (als alleen daar nodig)

### 2. DemoDownload Component
**Locatie:** `app/components/DemoDownload.tsx`

**Wat doet het:**
- Toont QR code voor demo APK download
- Toont "Demo versie: Max. 10 items"
- Link naar demo APK bestand

**Opties:**
- **Optie A:** Verwijder component volledig
- **Optie B:** Hernoem naar "GratisDownload" en verwijder "demo" tekst
- **Optie C:** Pas tekst aan: "Gratis versie" i.p.v. "Demo versie"

### 3. Download Pagina
**Locatie:** `app/download/page.tsx`

**Wat staat er:**
- Demo mode checks
- Demo banner
- Demo install instructies

**Status:** Deze pagina is bedoeld voor mobiele APK download, niet voor web versie.

---

## ✅ Aanbevolen Oplossing

### Optie 1: Verwijder Demo Sectie van Homepage (Aanbevolen)

**Als web versie volledig gratis is en demo APK niet meer nodig is:**

1. Verwijder DemoDownload sectie van homepage
2. Verwijder DemoDownload component (of bewaar voor later)
3. Update download pagina (als nodig)

### Optie 2: Hernoem naar "Gratis APK" (Als Demo APK Nog Beschikbaar Moet Zijn)

**Als demo APK nog beschikbaar moet zijn maar niet als "demo" gepresenteerd:**

1. Hernoem "Demo Versie" → "Gratis Versie"
2. Verwijder "Max. 10 items" limiet tekst (als web versie onbeperkt is)
3. Pas component aan

---

## 🔧 Stap voor Stap: Optie 1 (Verwijderen)

### Stap 1: Verwijder Demo Sectie van Homepage

**Bestand:** `app/page.tsx`

**Verwijder deze regels (ongeveer regel 144-149):**
```tsx
{/* Demo Versie - Compact en netjes uitgelijnd */}
<div className="bg-white rounded-2xl shadow-xl border-4 border-primary overflow-hidden">
  <div className="p-5 md:p-6">
    <DemoDownload />
  </div>
</div>
```

**En verwijder de import (regel 4):**
```tsx
import DemoDownload from './components/DemoDownload';
```

### Stap 2: (Optioneel) Verwijder DemoDownload Component

**Als je het niet meer nodig hebt:**
- Verwijder: `app/components/DemoDownload.tsx`
- Of bewaar het voor later gebruik

### Stap 3: Test Lokaal

```powershell
cd "d:\MAUREEN\DEV\Seniorease\seniorease-project"
npm run dev
```

**Test:**
- Homepage: Geen demo sectie meer
- Bibliotheek: Geen demo elementen
- Download pagina: (blijft zoals het is, voor APK download)

### Stap 4: Deploy

```powershell
git add app/page.tsx
git commit -m "Remove: Demo download section from homepage - web version is fully free"
git push origin main
```

---

## 🔧 Stap voor Stap: Optie 2 (Hernoemen)

### Stap 1: Update DemoDownload Component

**Bestand:** `app/components/DemoDownload.tsx`

**Wijzig:**
- "Demo versie" → "Gratis versie"
- "Max. 10 items" → Verwijder of wijzig naar "Onbeperkt" (als web versie onbeperkt is)
- Pas styling aan (als nodig)

### Stap 2: Update Homepage Tekst

**Bestand:** `app/page.tsx`

**Wijzig commentaar:**
```tsx
{/* Gratis APK Download - Compact en netjes uitgelijnd */}
```

### Stap 3: Test en Deploy

---

## 📋 Checklist

**Voor Verwijderen:**
- [ ] Demo sectie verwijderd van homepage
- [ ] DemoDownload import verwijderd
- [ ] (Optioneel) DemoDownload component verwijderd
- [ ] Getest lokaal
- [ ] Geen demo elementen meer zichtbaar

**Voor Hernoemen:**
- [ ] "Demo" → "Gratis" in alle teksten
- [ ] Limiet teksten aangepast of verwijderd
- [ ] Component hernoemd (optioneel)
- [ ] Getest lokaal
- [ ] Teksten kloppen

---

## 🎯 Wat Wil Je Doen?

**Kies een optie:**

1. **Verwijder demo sectie volledig** → Optie 1
2. **Hernoem naar "Gratis"** → Optie 2
3. **Iets anders** → Laat me weten wat je wilt

**Laat me weten welke optie je wilt, dan pas ik het direct aan!** 🔧
