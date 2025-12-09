# 📱 Demo APK Setup - Stap voor Stap

## ✅ Wat is Aangepast

1. **Nieuwe API route:** `/api/download-demo-app`
   - Download demo APK zonder licentie check
   - Bestand: `public/Seniorease-Bibliotheek-Demo.apk`

2. **QR Code aangepast:**
   - Linkt nu direct naar demo APK download
   - Geen licentie vereist
   - Werkt op alle apparaten

3. **Demo Download Component:**
   - QR code: `https://seniorease.nl/api/download-demo-app`
   - Link: "Of klik hier om demo APK te downloaden"

---

## 📦 Demo APK Maken

### Stap 1: Maak Demo Versie in Android Studio

1. **Open je Android Studio project**
2. **Zorg dat de app een limiet van 10 items heeft:**
   - Check in je code: `if (items.length >= 10) { /* blokkeer */ }`
   - Of gebruik een build variant met demo limiet

3. **Build Demo APK:**
   - **Build → Generate Signed Bundle / APK**
   - Kies **APK**
   - Selecteer je keystore
   - Kies **release** build variant
   - **Build variant:** Kies een variant met demo limiet (of maak er een)

### Stap 2: Hernoem APK

**Belangrijk:** Het bestand moet exact heten:
```
Seniorease-Bibliotheek-Demo.apk
```

### Stap 3: Upload naar Website

1. **Plaats APK in `public` folder:**
   ```
   public/Seniorease-Bibliotheek-Demo.apk
   ```

2. **Commit en push:**
   ```bash
   git add public/Seniorease-Bibliotheek-Demo.apk
   git commit -m "Add: Demo APK voor gratis download"
   git push origin main
   ```

3. **Vercel deployt automatisch**

---

## 🎯 Demo APK Vereisten

### Functionaliteit:
- ✅ **Alle features** van betaalde versie
- ✅ **Limiet:** Maximaal 10 items
- ✅ **Barcode scanner** werkt
- ✅ **Boek zoekfunctie** werkt
- ✅ **PDF export** werkt
- ✅ **Email delen** werkt

### Verschil met Betaalde Versie:
- ❌ **Limiet:** 10 items (betaald: onbeperkt)
- ✅ **Rest:** Identiek aan betaalde versie

---

## 🔗 QR Code Link

**Demo QR Code linkt naar:**
```
https://seniorease.nl/api/download-demo-app
```

**Of lokaal:**
```
http://localhost:3001/api/download-demo-app
```

---

## ✅ Test Checklist

### Na Upload Demo APK:

1. **Test QR Code:**
   - [ ] Scan QR code op homepage
   - [ ] APK download start automatisch
   - [ ] Geen licentie vereist

2. **Test Directe Link:**
   - [ ] Ga naar: `https://seniorease.nl/api/download-demo-app`
   - [ ] APK download start
   - [ ] Geen licentie vereist

3. **Test APK Installatie:**
   - [ ] Download APK op Android telefoon
   - [ ] Installeer APK (geef toestemming voor "onbekende bronnen")
   - [ ] App opent correct
   - [ ] Demo banner zichtbaar: "Demo Versie - 0/10 items"
   - [ ] Max 10 items kunnen worden toegevoegd
   - [ ] Alle functionaliteit werkt

4. **Test Limiet:**
   - [ ] Voeg 10 items toe
   - [ ] Probeer 11e item toe te voegen
   - [ ] Waarschuwing verschijnt
   - [ ] "Koop licentie" knop zichtbaar

---

## 📋 Bestandsstructuur

```
public/
  ├── Seniorease-Bibliotheek.apk          (Betaalde versie - met licentie)
  └── Seniorease-Bibliotheek-Demo.apk     (Demo versie - gratis)
```

---

## 🎯 Voordelen van Demo APK

✅ **Eenvoudiger:**
- Geen web camera permissies nodig
- Geen HTTPS vereiste
- Werkt offline na installatie

✅ **Betere UX:**
- Native app ervaring
- Sneller dan web versie
- Camera werkt altijd

✅ **Makkelijk te delen:**
- QR code → direct download
- Geen licentie check
- Werkt op alle Android apparaten

---

## 🚀 Volgende Stappen

1. **Maak demo APK** in Android Studio
2. **Upload** naar `public/Seniorease-Bibliotheek-Demo.apk`
3. **Commit en push** naar GitHub
4. **Test** op Android telefoon
5. **Deploy** naar productie

---

## 💡 Tips

- **APK Grootte:** Houd APK zo klein mogelijk (< 50MB)
- **Ondertekening:** Zorg dat APK goed ondertekend is
- **Testen:** Test altijd op echte Android telefoon voordat je deployt
- **Versie:** Gebruik andere versie nummer dan betaalde APK (bijv. 1.0.0-demo)

---

**Klaar om demo APK te maken!** 🎉




