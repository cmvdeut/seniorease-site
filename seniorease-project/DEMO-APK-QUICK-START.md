# 🚀 Demo APK - Quick Start

## ✅ Wat is Al Klaar

1. ✅ **API Route:** `/api/download-demo-app` - Werkt!
2. ✅ **QR Code:** Linkt naar demo APK download
3. ✅ **Homepage:** Demo sectie staat bovenaan
4. ✅ **Geen licentie vereist** voor demo APK

---

## 📦 Wat JIJ Moet Doen

### Stap 1: Maak Demo APK in Android Studio

**Je hebt nodig:**
- Android Studio project (ergens op je computer)
- Dezelfde app, maar met limiet van 10 items

**Hoe:**
1. Open Android Studio
2. Open je Seniorease Bibliotheek project
3. Zorg dat er een limiet van 10 items is in de code
4. **Build → Generate Signed Bundle / APK**
5. Kies **APK** (niet AAB)
6. Selecteer je keystore (of maak nieuwe)
7. Kies **release** variant
8. Wacht tot build klaar is

### Stap 2: Hernoem APK

**Belangrijk:** Exact deze naam:
```
Seniorease-Bibliotheek-Demo.apk
```

### Stap 3: Upload naar Website

**Optie A: Via GitHub Desktop**
1. Sleep `Seniorease-Bibliotheek-Demo.apk` naar `public` folder
2. Commit: "Add: Demo APK"
3. Push naar GitHub
4. Vercel deployt automatisch

**Optie B: Via Command Line**
```bash
# Kopieer APK naar public folder
copy "C:\pad\naar\Seniorease-Bibliotheek-Demo.apk" "public\Seniorease-Bibliotheek-Demo.apk"

# Of sleep het bestand naar public folder in Windows Explorer

# Commit en push
git add public/Seniorease-Bibliotheek-Demo.apk
git commit -m "Add: Demo APK voor gratis download"
git push origin main
```

---

## 🎯 Test Checklist

Na upload:

1. **Test QR Code:**
   - [ ] Ga naar: `https://seniorease.nl`
   - [ ] Scan QR code met telefoon
   - [ ] APK download start automatisch

2. **Test Directe Link:**
   - [ ] Ga naar: `https://seniorease.nl/api/download-demo-app`
   - [ ] APK download start

3. **Test APK:**
   - [ ] Installeer APK op Android telefoon
   - [ ] App opent correct
   - [ ] Demo limiet werkt (max 10 items)

---

## 📍 Waar Moet Het Bestand?

```
seniorease-project/
└── public/
    ├── Seniorease-Bibliotheek.apk          (Betaalde versie)
    └── Seniorease-Bibliotheek-Demo.apk    (Demo versie) ← HIER!
```

---

## ⚠️ Belangrijk

- **APK moet ondertekend zijn** (signed)
- **Gebruik release build** (niet debug)
- **Exacte bestandsnaam:** `Seniorease-Bibliotheek-Demo.apk`
- **Plaats in:** `public` folder

---

## 🆘 Problemen?

**"Demo APK bestand nog niet beschikbaar"**
- ✅ Check of bestand in `public` folder staat
- ✅ Check of bestandsnaam exact klopt (hoofdletters!)
- ✅ Check of bestand gecommit en gepusht is

**APK kan niet geïnstalleerd worden**
- ✅ Check of APK ondertekend is
- ✅ Check of "onbekende bronnen" toegestaan is op telefoon

---

**Klaar! Upload je demo APK en het werkt direct!** 🎉




