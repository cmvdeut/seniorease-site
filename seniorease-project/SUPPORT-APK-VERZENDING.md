# 📧 Support: APK naar Klant Sturen

## 🎯 Overzicht

Als een klant er niet uitkomt met de normale download, kun je als support een licentie code genereren en directe links maken om het APK te sturen.

## 🚀 Snel Starten

### Optie 1: Via Support Pagina (Aanbevolen)

1. Ga naar: **`/support`** (bijv. `https://seniorease.nl/support`)
2. Vul het email adres van de klant in
3. Klik op **"Genereer Licentie Code & Download Link"**
4. Kopieer de licentie code en instructies
5. Stuur naar klant via email of telefoon

### Optie 2: Directe Links

Voor een klant die al een licentie heeft (via betaling of support):
- **Download pagina:** `https://seniorease.nl/download`
- Werkt automatisch als licentie actief is

Voor een klant zonder licentie:
1. Genereer licentie code via `/support`
2. Stuur activer link: `https://seniorease.nl/activeer-licentie?code=SUP-1234567890-ABC`
3. Na activering kan klant naar `/download`

## 📋 Stappen voor Support

### Stap 1: Open Support Pagina
```
https://seniorease.nl/support
```

### Stap 2: Genereer Licentie
1. Vul email adres klant in
2. Klik op "Genereer Licentie Code"
3. Je krijgt:
   - Licentie code (bijv. `SUP-1234567890-ABC`)
   - Directe activer link
   - Download link
   - Email template

### Stap 3: Stuur naar Klant

**Via Email:**
```
Onderwerp: Uw Seniorease Licentie Code

Beste [klant naam],

U heeft een licentie code aangevraagd. Hier is uw code:

[LICENTIE CODE]

Stap 1: Activeer uw licentie door op deze link te klikken:
[ACTIVER LINK]

Stap 2: Download de app:
[DOWNLOAD LINK]

Met vriendelijke groet,
Seniorease Support
```

**Via Telefoon:**
1. Geef licentie code door
2. Leg uit: "Ga naar seniorease.nl/activeer-licentie"
3. "Voer de licentie code in die ik u geef"
4. "Na activering, ga naar seniorease.nl/download"

## 🔗 Directe Links

### Voor Klant met Licentie Code
```
https://seniorease.nl/activeer-licentie?code=SUP-1234567890-ABC
```

### Voor Klant zonder Code
```
https://seniorease.nl/activeer-licentie
```
(Dan code handmatig invoeren)

### Download Pagina
```
https://seniorease.nl/download
```
(Werkt alleen met actieve licentie)

## ✅ Wat Klant Moet Doen

1. **Ontvang licentie code** van support
2. **Ga naar:** `/activeer-licentie` of klik op de activer link
3. **Voer licentie code in** (of wordt automatisch ingevuld via link)
4. **Klik op "Activeer Licentie"**
5. **Wordt automatisch doorgestuurd naar download pagina**
6. **Download APK** via de knop of QR code
7. **Installeer APK** op Android telefoon

## 🛠️ Technische Details

### Licentie Types
- **Stripe licentie:** Automatisch na betaling (`source: 'stripe'`)
- **Support licentie:** Handmatig gegenereerd (`source: 'support'`)
- **Test licentie:** Voor testing (`source: 'test'`)

### Licentie Format
```
SUP-[timestamp]-[random]
Bijvoorbeeld: SUP-1707123456789-ABC123XYZ
```

### Opslag
- Licentie wordt opgeslagen in `localStorage`
- Werkt per apparaat/browser
- Blijft actief tot gebruiker data wist

## 📞 Alternatieve Methodes

### Methode 1: APK Bestand Direct Sturen
Als alles faalt, kun je het APK bestand zelf sturen:
1. Download APK uit `public/Seniorease-Bibliotheek.apk`
2. Upload naar WeTransfer of Google Drive
3. Stuur link naar klant
4. Klant moet APK downloaden en installeren (zonder licentie check)

⚠️ **Nadeel:** Klant moet handmatig "onbekende bronnen" toestaan

### Methode 2: QR Code Screenshot
1. Ga naar `/download` (met licentie)
2. Maak screenshot van QR code
3. Stuur screenshot naar klant
4. Klant scant QR code met telefoon

## 🔒 Beveiliging

- Licentie codes zijn uniek
- Codes werken alleen één keer per apparaat
- Geen server-side verificatie (client-side alleen)
- Voor productie: overweeg database tracking

## 💡 Tips

1. **Altijd email vragen:** Voor tracking en follow-up
2. **Test eerst zelf:** Activeer licentie code zelf om te testen
3. **Duidelijke instructies:** Geef klant stap-voor-stap uitleg
4. **Follow-up:** Check of klant succesvol heeft geïnstalleerd
5. **Backup plan:** Als online niet werkt, stuur APK bestand direct

## 🐛 Troubleshooting

**Klant kan licentie niet activeren:**
- Check of code correct is ingevoerd
- Check of klant de juiste URL gebruikt
- Test code zelf eerst

**Klant kan APK niet downloaden:**
- Check of licentie actief is (localStorage)
- Test download link zelf
- Stuur APK bestand direct als backup

**Klant krijgt "geen licentie" melding:**
- Klant moet eerst licentie activeren
- Check of licentie correct is opgeslagen
- Vraag klant om te checken op `/activeer-licentie`

