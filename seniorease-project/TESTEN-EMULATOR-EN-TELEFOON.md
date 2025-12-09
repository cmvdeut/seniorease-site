# 📱 Testen met Android Emulator of Echte Telefoon

## 🎯 Optie 1: Testen met Echte Telefoon (Aanbevolen - Makkelijker!)

### Stap 1: Zorg dat Telefoon en Computer op Zelfde Netwerk Zitten

1. **Check WiFi op telefoon:**
   - Zorg dat je telefoon verbonden is met hetzelfde WiFi netwerk als je computer
   - Bijvoorbeeld: beide op `192.168.178.x` netwerk

### Stap 2: Start Development Server

```bash
npm run dev
```

De server draait nu op: `http://0.0.0.0:3001` (toegankelijk voor alle devices)

### Stap 3: Vind Je Computer IP Adres

**Je IP adres:** `192.168.178.175` (of check met `ipconfig`)

### Stap 4: Open Website op Telefoon

1. **Open Chrome/Safari** op je telefoon
2. **Navigeer naar:**
   ```
   http://192.168.178.175:3001
   ```
   (Vervang met jouw IP adres als anders)

3. **Test de demo:**
   - Homepage: gele QR code bovenaan
   - Bibliotheek: demo mode actief
   - Max 10 items limiet

### Stap 5: Debug op Telefoon (Optioneel)

**Chrome Remote Debugging:**
1. Op computer: Open `chrome://inspect`
2. Zorg dat telefoon USB debugging heeft ingeschakeld
3. Zie je telefoon in de lijst
4. Klik "Inspect" om console te zien

---

## 🎯 Optie 2: Testen met Android Studio Emulator

### Stap 1: Start Development Server

```bash
npm run dev
```

### Stap 2: Open Android Studio

1. **Open Android Studio**
2. **Tools → Device Manager**
3. **Start een emulator:**
   - Klik op ▶️ naast een emulator
   - Of maak een nieuwe aan (Create Device)
   - Aanbevolen: **Pixel 5** of **Pixel 6** met **Android 11+**

### Stap 3: Wacht tot Emulator Volledig Opgestart is

- Wacht tot je het Android home screen ziet
- Dit kan 1-2 minuten duren

### Stap 4: Open Chrome in Emulator

1. **In de emulator:**
   - Zoek naar "Chrome" in de app drawer
   - Of gebruik de browser die standaard geïnstalleerd is

2. **Navigeer naar:**
   ```
   http://192.168.178.175:3001
   ```
   (Vervang met jouw IP adres)

### Stap 5: Als "Kan niet verbinden" Fout

**Probleem:** Emulator kan niet naar je computer IP verbinden

**Oplossingen:**

**A. Check Firewall:**
- Windows Firewall kan poort 3001 blokkeren
- Ga naar: Windows Defender Firewall → Advanced Settings
- Maak een nieuwe Inbound Rule voor poort 3001

**B. Gebruik 10.0.2.2 (Android Emulator Special IP):**
- Android emulator heeft een special IP voor localhost
- Gebruik in emulator: `http://10.0.2.2:3001`
- Dit verwijst automatisch naar `localhost` op je computer

**C. Check of Server Draait:**
```bash
# Check of server draait
netstat -an | findstr 3001
```

---

## 🔧 Troubleshooting

### Probleem: "Kan niet verbinden" op Telefoon

**Oplossing:**
1. Check dat telefoon en computer opzelfde WiFi zitten
2. Check firewall (Windows Firewall)
3. Probeer IP adres opnieuw te vinden:
   ```powershell
   ipconfig | findstr IPv4
   ```

### Probleem: "Kan niet verbinden" op Emulator

**Oplossing:**
1. Gebruik `http://10.0.2.2:3001` in plaats van je IP adres
2. Check of server draait: `netstat -an | findstr 3001`
3. Herstart emulator

### Probleem: Demo Mode Werkt Niet

**Oplossing:**
1. Open browser console (F12 of Chrome DevTools)
2. Check of Android wordt gedetecteerd:
   ```javascript
   console.log(navigator.userAgent);
   ```
3. Check localStorage:
   ```javascript
   console.log(localStorage.getItem('seniorease-licentie'));
   ```
   Moet `null` zijn voor demo mode

### Probleem: Camera Werkt Niet in Emulator

**Oplossing:**
- Barcode scanner vereist echte camera
- In emulator: gebruik handmatige barcode invoer
- Test camera op echte telefoon

---

## ✅ Test Checklist

### Homepage (`/`)
- [ ] Gele demo QR code sectie bovenaan
- [ ] QR code is zichtbaar en scanbaar
- [ ] Geen "Download GRATIS Demo" knop

### Bibliotheek (`/bibliotheek`)
- [ ] Demo banner verschijnt: "Demo Versie - 0/10 items gebruikt"
- [ ] Alleen "Boek" optie (geen Album/CD)
- [ ] Geen type selectie in formulier
- [ ] Items kunnen worden toegevoegd (max 10)
- [ ] Barcode scanner werkt (op echte telefoon)
- [ ] Boek zoekfunctie werkt
- [ ] PDF export werkt
- [ ] Email delen werkt

### Demo Limiet
- [ ] Max 10 items kunnen worden toegevoegd
- [ ] Waarschuwing bij 8+ items
- [ ] Blokkering bij 10 items
- [ ] "Koop licentie" knop onderaan pagina

---

## 💡 Tips

### Voor Echte Telefoon:
- **Makkelijker** dan emulator
- **Echte camera** voor barcode scanner
- **Sneller** opstarten
- **Betere performance**

### Voor Emulator:
- **Test verschillende Android versies**
- **Geen fysiek apparaat nodig**
- **Camera werkt niet** (gebruik handmatige invoer)
- **Langzamer** dan echte telefoon

---

## 🚀 Snel Starten

```bash
# 1. Start server
npm run dev

# 2. Vind IP adres
ipconfig | findstr IPv4

# 3. Open op telefoon/emulator
http://192.168.178.175:3001
# OF voor emulator:
http://10.0.2.2:3001
```

**Klaar om te testen!** 🎉




