# 🇬🇧 Engelse Versie Testen in Android Studio

## 📱 Stap-voor-stap Handleiding

### Stap 1: Development Server Starten

1. **Open PowerShell** in de `seniorease-project` folder:
   ```powershell
   cd D:\MAUREEN\DEV\Seniorease\seniorease-project
   ```

2. **Start de development server** (toegankelijk voor emulator):
   ```powershell
   next dev -H 0.0.0.0 -p 3001
   ```
   
   Of als `next` niet werkt:
   ```powershell
   npm run dev
   ```
   
   **Belangrijk:** De server moet luisteren op `0.0.0.0` (niet alleen localhost) zodat de emulator erbij kan.

### Stap 2: Vind Je Computer IP Adres

**In PowerShell:**
```powershell
ipconfig | findstr IPv4
```

**Mogelijke IP adressen:**
- `192.168.178.175` (of vergelijkbaar)
- `172.22.160.1` (of vergelijkbaar)

**Noteer dit IP adres!** Je hebt het nodig voor stap 4.

### Stap 3: Android Studio Emulator Opstarten

1. **Open Android Studio**
2. **File → Open** → Selecteer: `D:\MAUREEN\DEV\Biblitoheek`
3. **Tools → Device Manager**
4. **Start een emulator:**
   - Klik op ▶️ naast een bestaande emulator
   - Of maak een nieuwe: **Create Device**
   - **Aanbevolen:** Pixel 5 of Pixel 6 met **Android 11+** (API 30+)
   - **Formaat:** Telefoon (niet tablet voor nu)

5. **Wacht tot emulator volledig opgestart is** (kan 1-2 minuten duren)
   - Je ziet het Android home screen
   - Alle apps zijn geladen

### Stap 4: Website Openen in Emulator

1. **In de emulator:**
   - Zoek naar **Chrome** in de app drawer
   - Of gebruik de standaard browser

2. **Navigeer naar de Engelse versie:**
   ```
   http://10.0.2.2:3001/en/bibliotheek
   ```
   
   **Of gebruik je IP adres:**
   ```
   http://192.168.178.175:3001/en/bibliotheek
   ```
   (Vervang `192.168.178.175` met jouw IP adres uit stap 2)

3. **Test ook de Nederlandse versie:**
   ```
   http://10.0.2.2:3001/bibliotheek
   ```

### Stap 5: Test Checklist

✅ **Engelse Versie (`/en/bibliotheek`):**
- [ ] Alle teksten zijn in het Engels
- [ ] "Welcome to My Library" (niet "Welkom bij Mijn Bibliotheek")
- [ ] "Add item manually" (niet "Item handmatig toevoegen")
- [ ] "Scan barcode with camera" (niet "Barcode scannen met camera")
- [ ] Taalwisselaar toont "🇳🇱 NL" (om terug te gaan naar Nederlands)
- [ ] Demo mode werkt (max 10 books)
- [ ] Gescande boeken behouden originele taal (auteur/titel)

✅ **Nederlandse Versie (`/bibliotheek`):**
- [ ] Alle teksten zijn in het Nederlands
- [ ] "Welkom bij Mijn Bibliotheek"
- [ ] Taalwisselaar toont "🇬🇧 EN" (om naar Engels te gaan)
- [ ] Demo mode werkt (max 10 boeken)

✅ **Taalwisselaar:**
- [ ] Klik op "🇬🇧 EN" → Gaat naar `/en/bibliotheek`
- [ ] Klik op "🇳🇱 NL" → Gaat naar `/bibliotheek`
- [ ] Teksten wisselen correct

✅ **Data Scheiding:**
- [ ] Voeg een boek toe in Nederlandse versie
- [ ] Wissel naar Engelse versie
- [ ] Engelse versie heeft GEEN boeken (gescheiden localStorage)
- [ ] Voeg een boek toe in Engelse versie
- [ ] Wissel terug naar Nederlandse versie
- [ ] Nederlandse boeken zijn er nog steeds

### Stap 6: Test Functionaliteit

✅ **Barcode Scanner:**
- [ ] Werkt in beide talen
- [ ] Gescande boeken behouden originele taal (auteur/titel in originele taal)

✅ **Demo Mode:**
- [ ] Max 10 boeken in beide talen
- [ ] Demo banner verschijnt correct
- [ ] Limiet werkt in beide talen

✅ **Opties Menu:**
- [ ] Alle menu items zijn vertaald
- [ ] "Export CSV", "Export PDF", etc. in Engels
- [ ] "Exporteer CSV", "Exporteer PDF", etc. in Nederlands

---

## 🔧 Troubleshooting

### Probleem: "Kan niet verbinden" in emulator

**Oplossing 1: Gebruik 10.0.2.2**
- Android emulator heeft een special IP voor localhost
- Gebruik: `http://10.0.2.2:3001/en/bibliotheek`
- Dit verwijst automatisch naar `localhost` op je computer

**Oplossing 2: Check Firewall**
- Windows Firewall kan poort 3001 blokkeren
- Ga naar: Windows Defender Firewall → Advanced Settings
- Maak een nieuwe Inbound Rule voor poort 3001

**Oplossing 3: Check Server**
```powershell
# Check of server draait
netstat -an | findstr 3001
```
Moet `LISTENING` tonen op `0.0.0.0:3001`

### Probleem: "localhost werkt niet"

**Oplossing:**
- Gebruik **ALTIJD** `10.0.2.2` in emulator (niet `localhost` of `127.0.0.1`)
- Of gebruik je IP adres: `http://192.168.178.175:3001`

### Probleem: Taalwisselaar werkt niet

**Oplossing:**
1. Check browser console (F12 in emulator Chrome)
2. Check of er errors zijn
3. Refresh de pagina (F5)

### Probleem: Teksten zijn niet vertaald

**Oplossing:**
1. Check of je op de juiste URL bent:
   - Engels: `/en/bibliotheek`
   - Nederlands: `/bibliotheek`
2. Check browser console voor errors
3. Refresh de pagina

---

## 📋 Snelle Test Commands

```powershell
# 1. Start server (toegankelijk voor emulator)
cd D:\MAUREEN\DEV\Seniorease\seniorease-project
next dev -H 0.0.0.0 -p 3001

# 2. Check IP adres
ipconfig | findstr IPv4

# 3. Test in browser (op computer)
# Nederlandse versie:
http://localhost:3001/bibliotheek
# Engelse versie:
http://localhost:3001/en/bibliotheek

# 4. Test in emulator (gebruik 10.0.2.2)
# Nederlandse versie:
http://10.0.2.2:3001/bibliotheek
# Engelse versie:
http://10.0.2.2:3001/en/bibliotheek
```

---

## 🎯 Belangrijkste Test Punten

1. **Taalwisselaar:** Werkt correct tussen NL en EN
2. **Data Scheiding:** NL en EN hebben aparte localStorage
3. **Gescande Boeken:** Behouden originele taal (auteur/titel)
4. **Demo Mode:** Werkt in beide talen (max 10 boeken)
5. **Alle Teksten:** Volledig vertaald in beide talen

---

## 💡 Tips

### Chrome DevTools in Emulator:
- **Remote Debugging:**
  - Op computer: Open `chrome://inspect`
  - Zorg dat emulator USB debugging heeft
  - Zie emulator in lijst
  - Klik "Inspect" om console te zien

### Network Tab:
- Check of alle requests succesvol zijn
- Geen 404 errors
- Check of `/en/bibliotheek` correct laadt

### Console Logs:
- Check voor errors
- Taal detectie logs
- localStorage logs

---

## 🚀 Volgende Stappen

Na succesvol testen:

1. **Native Android App Engelse Versie:**
   - We kunnen later een Engelse versie maken van de native Android app
   - Dit vereist vertalingen in de Android project (`D:\MAUREEN\DEV\Biblitoheek`)

2. **Meer Pagina's Vertalen:**
   - Homepage (`/en`)
   - "Zo werkt het" pagina
   - "Hulp" pagina
   - Etc.

3. **APK Bestanden:**
   - Engelse demo APK maken
   - Engelse volledige APK maken

---

**Klaar om te testen!** 🎉

