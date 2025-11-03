# 📱 APK Upload Instructies

## Stap 1: APK Bestand Voorbereiden

### 1a. Signing Key Voorbereiden (EERSTE KEER ALLEEN)

⚠️ **Belangrijk:** Als je nog geen signing key hebt, maak er eerst een aan:

1. **Maak een nieuwe signing key:**
   - In Android Studio: **Build → Generate Signed Bundle / APK**
   - Selecteer: **APK**
   - Klik op: **Create new...** (onder "Key store path")
   - Vul in:
     - **Key store path:** Kies een locatie en naam (bijv. `C:\Users\JouwNaam\seniorease-release-key.jks`)
     - **Password:** Kies een sterk wachtwoord (BEWAAR DIT GOED!)
     - **Key alias:** Bijv. `seniorease-key`
     - **Key password:** (kan hetzelfde zijn als store password)
     - **Validity:** Bijv. 25 jaar (voor lange termijn)
     - **First and last name:** Bijv. "Seniorease App"
     - **Organizational unit:** Bijv. "Development"
     - **Organization:** Bijv. "Seniorease"
     - **City/Locality:** Jouw stad
     - **State/Province:** Jouw provincie
     - **Country Code:** NL
   - Klik **OK**
   - **BEWAAR HET WACHTWOORD EN HET .jks BESTAND VEILIG!** Je hebt deze nodig voor alle toekomstige updates.

2. **Bij volgende builds:** Gebruik dezelfde key store en password

### 1b. Exporteer APK uit Android Studio

1. **Open je project in Android Studio**

2. **Ga naar:** **Build → Generate Signed Bundle / APK**

3. **Selecteer:** **APK** (niet AAB)

4. **Selecteer je signing key:**
   - Als je al een key hebt: Kies "Choose existing..." en selecteer je `.jks` bestand
   - Voer het wachtwoord in
   - Als je "Create new..." ziet, zie stap 1a hierboven

5. **Kies build variant:**
   - Selecteer **release** (niet debug!)

6. **Finish en wacht:**
   - Wacht tot build klaar is
   - Locatie: `app/release/app-release.apk` (of vergelijkbaar)

7. **Controleer of APK ondertekend is:**
   - **Windows (PowerShell):** 
     ```powershell
     .\check-apk-signature.ps1
     ```
     (Script staat in project root)
   - **Mac/Linux (Terminal):**
     ```bash
     jarsigner -verify -verbose -certs public/Seniorease-Bibliotheek.apk
     ```
   - Als je ziet "jar verified" = ✅ APK is goed ondertekend
   - Als je een fout ziet = ❌ APK is niet ondertekend → exporteer opnieuw met signing key

### 1c. Hernoem het bestand

- Hernoem naar: `Seniorease-Bibliotheek.apk`
- Dit moet exact zijn, hoofdlettergevoelig!

### 1d. Verifieer dat het het juiste bestand is

⚠️ **BELANGRIJK:** Controleer voordat je uploadt:

1. **Open het APK bestand in Android Studio:**
   - Ga naar: **Build → Analyze APK**
   - Selecteer je APK bestand
   - Check:
     - ✅ Package name klopt
     - ✅ Versie nummer klopt
     - ✅ App naam klopt
     - ✅ Het is een release build (niet debug!)

2. **Of gebruik het controle script:**
   ```powershell
   .\check-apk-info.ps1
   ```
   Dit toont bestandsgrootte en laatste wijzigingsdatum

## Stap 2: Upload naar Website

⚠️ **WAARSCHUWING:** Vervang het oude bestand! Als er al een APK in de `public` folder staat, verwijder deze eerst of vervang deze.

1. **Verwijder het oude APK bestand (als die bestaat):**
   - Via GitHub Desktop: Delete `public/Seniorease-Bibliotheek.apk`
   - Via Command Line:
     ```bash
     # Verwijder oude APK
     rm public/Seniorease-Bibliotheek.apk
     # Of op Windows:
     del public\Seniorease-Bibliotheek.apk
     ```

2. **Plaats NIEUWE bestand in `public` folder:**
   ```
   seniorease-project/
   └── public/
       └── Seniorease-Bibliotheek.apk  ← Hier! (NIEUWE versie)
   ```

3. **Via GitHub Desktop:**
   - Sleep het NIEUWE APK bestand naar de `public` folder
   - **VERVANG** het oude bestand als het systeem vraagt
   - Commit de wijziging met duidelijke message: "Update naar nieuwe APK versie X.X"
   - Push naar GitHub

4. **Via Command Line:**
   ```bash
   # Kopieer NIEUWE APK naar public folder (vervangt oude)
   cp [pad-naar-jouw-NIEUWE-apk].apk public/Seniorease-Bibliotheek.apk
   
   # Commit en push
   git add public/Seniorease-Bibliotheek.apk
   git commit -m "Update APK naar nieuwe versie [versie nummer]"
   git push origin main
   ```
   
   **Op Windows PowerShell:**
   ```powershell
   # Kopieer en vervang oude APK
   Copy-Item "[pad-naar-jouw-NIEUWE-apk].apk" -Destination "public\Seniorease-Bibliotheek.apk" -Force
   
   # Commit en push
   git add public/Seniorease-Bibliotheek.apk
   git commit -m "Update APK naar nieuwe versie"
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

**"De gedownloade app is niet de juiste APK":**
- ❌ **Probleem:** Er staat waarschijnlijk een oud APK bestand in de `public` folder
- ✅ **Oplossing:**
  1. Exporteer de NIEUWE APK uit Android Studio opnieuw
  2. Gebruik het script `.\check-apk-info.ps1` om te controleren welk bestand er staat
  3. **VERWIJDER** het oude APK bestand uit `public` folder
  4. **PLAATS** het nieuwe APK bestand in `public` folder (met dezelfde naam)
  5. Commit en push naar GitHub
  6. Wacht op Vercel deployment (kan 1-2 minuten duren)
  7. Test opnieuw - het nieuwe bestand zou nu moeten downloaden
- 💡 **Tip:** Check de "Laatste wijziging" datum in `check-apk-info.ps1` om te zien of het recent is

**"Bestand mogelijk schade" waarschuwing op Android:**
- Dit is een normale beveiligingswaarschuwing - het bestand is veilig
- Gebruikers kunnen gewoon op "Toestaan" of "Doorgaan" klikken
- Zorg er wel voor dat je APK goed ondertekend is (zie Stap 1b punt 7)

**APK kan niet geïnstalleerd worden:**
- ❌ **Check 1:** Is de APK ondertekend?
  - Windows: Gebruik `.\check-apk-signature.ps1` script
  - Mac/Linux: Gebruik `jarsigner -verify -verbose -certs public/Seniorease-Bibliotheek.apk`
  - Als dit faalt → APK is niet goed ondertekend, exporteer opnieuw met signing key
- ❌ **Check 2:** Is het een release build?
  - Debug builds kunnen problemen geven, gebruik altijd release variant
- ✅ **Als beide goed zijn:** Check of gebruiker "Onbekende bronnen" heeft toegestaan

**Download werkt niet:**
- Check licentie: gebruik `/test-licentie` om test licentie te activeren
- Check browser console voor errors
- Test op desktop eerst, dan mobiel

**QR code werkt niet:**
- Check of URL correct is in QR code
- Test met verschillende QR code scanner apps
- Zorg dat licentie actief is op apparaat dat scan

**"App niet geïnstalleerd" fout:**
- APK is waarschijnlijk niet goed ondertekend → exporteer opnieuw met signing key
- APK kan corrupt zijn → download opnieuw
- Controleer of er voldoende opslagruimte is op het apparaat

