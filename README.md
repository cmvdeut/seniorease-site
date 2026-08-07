# SeniorEase

Eenvoudige digitale hulpmiddelen voor senioren om boeken en muziek bij te houden.

## 🚀 Lokaal testen

Start een lokale server:

```bash
python3 -m http.server 3000
```

Open vervolgens: **http://localhost:3000**

## 📁 Bestanden/structuur

```
D:\MAUREEN\DEV\Seniorease\
├── index.html          # Hoofdpagina
├── privacy.html        # Privacybeleid
├── hulp.html          # Hulp & ondersteuning
├── kopen.html         # Betaalpagina
├── sw.js              # Service Worker (PWA)
├── manifest.webmanifest # PWA manifest
└── icons/
    ├── icon-192.png   # Favicon (192x192)
    └── icon-512.png   # App logo (512x512)
```

## 💳 Betaalpagina

### Betaalpagina (`kopen.html`):
- **Eenvoudige keuze**: iDEAL/bankapp of kaart
- **Gebruiksvriendelijk**: Duidelijke knoppen voor senioren
- **Responsive**: Werkt op alle apparaten
- **Toegankelijk**: Aria-labels voor screen readers

### Koopknop in `index.html` regel 59-62:

```html
<!-- Koop knop -->
<a href="kopen.html" 
   class="block rounded-2xl px-6 py-4 text-lg font-medium bg-se-brown text-white hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl">
    Eenmalig €2,99 – Koop nu
</a>
```

### Payment Provider Setup:
1. **Kies provider**: Stripe, Mollie, of Plink
2. **Configureer**: iDEAL, kaart, Bancontact
3. **Vervang URL**: `https://buy.stripe.com/DE-PLAATS-HIER-JE-ECHTE-LINK` in `index.html` en `kopen.html`
4. **Test**: Beide betaalmethoden werken correct

## 📸 Screenshots toevoegen

### Demo Modal Screenshots:
1. **Upload screenshots** naar `screenshots/` map
2. **Vervang SVG icons** door `<img>` tags in `index.html`
3. **Gebruik formaten**: PNG, JPG, WebP
4. **Optimale grootte**: 400x600px (mobile) of 800x1200px (desktop)

### Voorbeeld vervanging:
```html
<!-- Van SVG naar echte screenshot -->
<div class="bg-gray-100 rounded-lg p-8 text-center mb-3">
  <img src="screenshots/hoofdscherm.png" alt="Hoofdscherm" class="w-full h-48 object-cover rounded-lg">
</div>
```

## 📱 PWA testen

### Chrome DevTools
1. Open **F12** → **Application** tab
2. Controleer:
   - **Manifest**: Alle velden correct ingevuld
   - **Service Workers**: Status "activated and running"
   - **Storage**: Cache bestanden aanwezig

### Lighthouse audit
1. Open **F12** → **Lighthouse** tab
2. Selecteer **"Installable"** categorie
3. Klik **"Generate report"**
4. **"Installable"** moet groen zijn ✅

### PWA installatie testen
- Klik op **"Installeer als app"** knop
- Of gebruik Chrome menu → **"App installeren"**
- App moet als standalone app openen

## 🌐 Deploy

### Vercel (actief)
- **Live URL**: [seniorease.nl](https://seniorease.nl)
- **GitHub**: [github.com/cmvdeut/seniorease-site](https://github.com/cmvdeut/seniorease-site)
- **Auto-deploy**: Elke push naar `main` triggert een deployment op Vercel

We gebruiken **geen** Netlify.

## 🎨 Styling

- **Framework**: Tailwind CSS (via CDN)
- **Kleuren**: SeniorEase theme (beige/bruin)
- **Responsive**: Mobile-first design
- **Toegankelijkheid**: Grote letters, goede contrasten

## 📞 Support

Voor vragen: **support@seniorease.nl**
