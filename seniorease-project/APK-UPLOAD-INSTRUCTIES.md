# 📱 APK Upload Instructies

## Stap 1: APK Bestand Voorbereiden

1. **Exporteer APK uit Android Studio:**
   - Open je project in Android Studio
   - Ga naar: **Build → Generate Signed Bundle / APK**
   - Kies: **APK** (niet AAB)
   - Selecteer je signing key
   - Kies **release** build variant
   - Wacht tot build klaar is
   - Locatie: `app/release/app-release.apk` (of vergelijkbaar)

2. **Hernoem het bestand:**
   - Hernoem naar: `Seniorease-Bibliotheek.apk`
   - Dit moet exact zijn, hoofdlettergevoelig!

## Stap 2: Upload naar Website

1. **Plaats bestand in `public` folder:**
   ```
   seniorease-project/
   └── public/
       └── Seniorease-Bibliotheek.apk  ← Hier!
   ```

2. **Via GitHub Desktop:**
   - Sleep het APK bestand naar de `public` folder
   - Commit de wijziging
   - Push naar GitHub

3. **Via Command Line:**
   ```bash
   # Kopieer APK naar public folder
   cp [pad-naar-jouw-apk].apk public/Seniorease-Bibliotheek.apk
   
   # Commit en push
   git add public/Seniorease-Bibliotheek.apk
   git commit -m "Voeg Android APK toe"
   git push origin main
   ```

## Stap 3: Testen

1. **Wacht op Vercel deployment** (automatisch na push)

2. **Test de download:**
   - Ga naar: `https://seniorease.nl/download`
   - Log in met test licentie (via `/test-licentie`)
   - Klik op "Download APK"
   - Controleer of bestand correct downloadt

3. **Test QR code:**
   - Scan de QR code met je telefoon
   - Controleer of download start

## Belangrijke Notities

⚠️ **Bestandsgrootte:**
- APK bestanden kunnen groot zijn (10-50MB)
- Vercel heeft geen specifieke limiet, maar grote bestanden kunnen traag laden
- Overweeg bestand compressie als het >50MB is

✅ **Beveiliging:**
- APK wordt alleen geserveerd via `/api/download-app` route
- Route checkt licentie (client-side)
- Bestand staat in `public` folder, dus direct toegankelijk als je de URL kent
- Voor extra beveiliging zou je server-side licentie check kunnen toevoegen

📱 **Installatie:**
- Gebruikers moeten "Onbekende bronnen" toestaan (eenmalig)
- Instructies staan duidelijk op de `/download` pagina
- QR code maakt download makkelijk op mobiel

---

## Wat Gebeurt Er Nu?

### Na Betaling:
1. Gebruiker betaalt via Stripe
2. Wordt doorgestuurd naar `/betalen/success`
3. Ziet knop: **"📱 Download App (Android)"**
4. Klikt op knop → gaat naar `/download`
5. Ziet QR code + download knop
6. Download APK
7. Installeer via instructies

### QR Code:
- QR code op `/download` pagina linkt naar: `https://seniorease.nl/api/download-app`
- Scan met telefoon camera
- Download start automatisch (als licentie actief is)

---

## Troubleshooting

**"APK bestand nog niet beschikbaar" foutmelding:**
- Check of bestand exact `Seniorease-Bibliotheek.apk` heet (hoofdlettergevoelig!)
- Check of bestand in `public` folder staat
- Check of bestand gecommit en gepusht is naar GitHub

**Download werkt niet:**
- Check licentie: gebruik `/test-licentie` om test licentie te activeren
- Check browser console voor errors
- Test op desktop eerst, dan mobiel

**QR code werkt niet:**
- Check of URL correct is in QR code
- Test met verschillende QR code scanner apps
- Zorg dat licentie actief is op apparaat dat scan

