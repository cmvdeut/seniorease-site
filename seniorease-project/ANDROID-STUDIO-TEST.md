# 📱 Demo Testen in Android Studio

## ✅ Stap-voor-stap Handleiding

### Stap 1: Development Server Starten

1. **Start de development server** (als deze nog niet draait):
   ```bash
   npm run dev
   ```
   
   De server draait nu op: `http://localhost:3001`

### Stap 2: Development Server Toegankelijk Maken voor Emulator

**Belangrijk:** De Android emulator kan niet direct naar `localhost` of `127.0.0.1` verbinden. We moeten het IP adres van je computer gebruiken.

**Je IP adres:** `192.168.178.175` (of `172.22.160.1`)

### Stap 3: Next.js Server Configureren

De development server moet luisteren op alle interfaces (niet alleen localhost):

**Optie A: Via package.json (Aanbevolen)**
- Wijzig `package.json`:
  ```json
  "dev": "next dev -H 0.0.0.0 -p 3001"
  ```

**Optie B: Via Command Line**
- Start server met:
  ```bash
  next dev -H 0.0.0.0 -p 3001
  ```

### Stap 4: Android Studio Emulator Opstarten

1. **Open Android Studio**
2. **Tools → Device Manager**
3. **Start een Android emulator** (of maak er een aan)
   - Aanbevolen: Android 11+ (API 30+)
   - Telefoon of Tablet formaat

### Stap 5: Website Openen in Emulator

1. **Open Chrome browser** in de emulator
2. **Navigeer naar:**
   ```
   http://192.168.178.175:3001
   ```
   (Vervang met jouw IP adres als anders)

### Stap 6: Test Checklist

✅ **Homepage:**
- [ ] Gele demo QR code sectie staat bovenaan
- [ ] QR code is zichtbaar
- [ ] Geen "Download GRATIS Demo" knop meer

✅ **Bibliotheek Pagina (`/bibliotheek`):**
- [ ] Demo mode wordt geactiveerd (Android detectie)
- [ ] Demo banner verschijnt: "Demo Versie - 0/10 items gebruikt"
- [ ] Alleen "Boek" optie beschikbaar (geen Album/CD)
- [ ] Geen type selectie in formulier
- [ ] Geen filter dropdown

✅ **Functionaliteit:**
- [ ] Items kunnen worden toegevoegd (max 10 in demo)
- [ ] Barcode scanner werkt
- [ ] Boek zoekfunctie werkt
- [ ] PDF export werkt
- [ ] Email delen werkt

### Stap 7: Test op Desktop/iOS (Niet Android)

**Test dat demo NIET werkt op:**
- [ ] Desktop browser → Moet licentie vereisen
- [ ] iOS emulator (als beschikbaar) → Moet licentie vereisen

---

## 🔧 Troubleshooting

### Probleem: "Kan niet verbinden" in emulator

**Oplossing:**
1. Check firewall instellingen (Windows Firewall)
2. Zorg dat poort 3001 open is
3. Probeer het andere IP adres (`172.22.160.1`)

### Probleem: "localhost werkt niet"

**Oplossing:**
- Gebruik altijd het IP adres (`192.168.178.175:3001`)
- Niet `localhost:3001` of `127.0.0.1:3001`

### Probleem: Demo mode werkt niet

**Oplossing:**
1. Check browser console (F12 in emulator Chrome)
2. Check of Android wordt gedetecteerd:
   ```javascript
   console.log(navigator.userAgent);
   ```
   Moet "Android" bevatten

### Probleem: Camera werkt niet in emulator

**Oplossing:**
- Barcode scanner vereist echte camera
- Test camera functionaliteit op echte Android apparaat
- In emulator: gebruik handmatige barcode invoer

---

## 📋 Snelle Test Commands

```bash
# 1. Start server (toegankelijk voor emulator)
next dev -H 0.0.0.0 -p 3001

# 2. Check IP adres
ipconfig | findstr IPv4

# 3. Test in browser (op computer)
http://localhost:3001

# 4. Test in emulator (gebruik IP adres)
http://192.168.178.175:3001
```

---

## 🎯 Belangrijkste Test Punten

1. **Android Detectie:** Demo mode moet automatisch activeren op Android
2. **Geen Album/CD:** Alleen boeken optie beschikbaar
3. **Demo Limiet:** Max 10 items in demo mode
4. **QR Code:** Zichtbaar op homepage, bovenaan
5. **Geen Banner:** Geen "Download GRATIS Demo" knop meer

---

## 💡 Tips

- **Chrome DevTools in Emulator:** 
  - Open Chrome → Menu → More tools → Remote debugging
  - Verbind met emulator voor debugging

- **Network Tab:**
  - Check of alle requests succesvol zijn
  - Geen 404 errors

- **Console Logs:**
  - Check voor errors
  - Android detectie logs

---

**Klaar om te testen!** 🚀

