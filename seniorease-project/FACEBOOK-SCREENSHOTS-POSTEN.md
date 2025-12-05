# 📸 Facebook Screenshots Posten - Quick Start

## 🎯 In 3 stappen screenshots op Facebook

---

## Stap 1: Facebook Token Verkrijgen (5 minuten)

### 1.1 - Open Graph API Explorer
Ga naar: https://developers.facebook.com/tools/explorer/

### 1.2 - Selecteer je app en pagina
1. Klik op "Meta App" dropdown (rechtsboven)
   - Selecteer je app of maak een nieuwe aan
   
2. Klik op "User or Page" dropdown
   - Selecteer **"Get Page Access Token"**
   
3. Selecteer je pagina
   - ✅ Vink **senioreasenl** aan
   
4. Selecteer permissions:
   - ✅ `pages_read_engagement`
   - ✅ `pages_manage_posts`
   - ✅ `pages_read_user_content`
   - ✅ `pages_manage_metadata`

5. Klik **"Generate Access Token"**

### 1.3 - Kopieer de token
De token begint met `EAAG...` of `EAAb...`

⚠️ **LET OP:** Deze token is geldig voor 60 dagen!

---

## Stap 2: Configureer het Script (1 minuut)

### 2.1 - Maak .env bestand
```bash
cd Agent\seniorease-content-agent
```

### 2.2 - Kopieer de template
```bash
# Windows PowerShell:
Copy-Item ENV-TEMPLATE.txt .env

# Of handmatig:
# - Kopieer ENV-TEMPLATE.txt
# - Hernoem naar .env
```

### 2.3 - Vul je credentials in
Open `.env` en vervang:

```env
FACEBOOK_PAGE_ACCESS_TOKEN=JOUW_TOKEN_HIER
FACEBOOK_PAGE_ID=898268823367107
ANTHROPIC_API_KEY=sk-ant-xxxxx  # Optioneel, niet nodig voor screenshots
```

**Let op:**
- `FACEBOOK_PAGE_ACCESS_TOKEN`: De token die je in stap 1 kreeg
- `FACEBOOK_PAGE_ID`: Dit is al correct ingevuld (senioreasenl pagina)

---

## Stap 3: Post de Screenshots! (30 seconden)

### Optie A: Post één screenshot (test)
```bash
cd Agent\seniorease-content-agent

# Dry run eerst (test zonder te posten):
node post-screenshots.js --dry-run 1

# Als dat goed ziet eruit, post dan echt:
node post-screenshots.js 1
```

### Optie B: Zie alle beschikbare posts
```bash
node post-screenshots.js
```

Output:
```
📋 Beschikbare posts:

   1. Introductie - Bibliotheek Hoofdscherm
      Screenshot: Screenshot_1.png
      Preview: 📚 Houd je boekcollectie overzichtelijk met SeniorEa...

   2. Feature - Barcode Scanner
      Screenshot: Screenshot_2.png
      Preview: 🔍 Boeken toevoegen in een paar seconden!...

   3. Feature - Google Integratie
      Screenshot: Screenshot_4.png
      Preview: 💡 Slimme technologie in een simpele app!...

   4. Feature - Veiligheid & Privacy
      Screenshot: Screenshot_5.png
      Preview: 🔒 Jouw gegevens zijn veilig bij ons!...

   5. Feature - Meertalig
      Screenshot: Screenshot_3.png
      Preview: 🌍 Nederlands, Engels of een andere taal?...
```

### Optie C: Post alle screenshots tegelijk
```bash
node post-screenshots.js all

# Dit post alle 5 screenshots met 30 seconden tussen elk
```

---

## 📖 Gebruik Voorbeelden

### Test zonder te posten (dry-run)
```bash
# Test post 1
node post-screenshots.js --dry-run 1

# Test post 3
node post-screenshots.js --dry-run 3

# Test alle posts
node post-screenshots.js --dry-run all
```

### Post individuele screenshots
```bash
# Post alleen introductie (Screenshot 1)
node post-screenshots.js 1

# Post alleen barcode scanner (Screenshot 2)
node post-screenshots.js 2

# Post alleen Google integratie (Screenshot 4)
node post-screenshots.js 4
```

### Post planning (2x per week strategie)
```bash
# Week 1 - Maandag: Introductie
node post-screenshots.js 1

# Week 1 - Donderdag: Barcode Scanner
node post-screenshots.js 2

# Week 2 - Maandag: Google Integratie
node post-screenshots.js 3

# Week 2 - Donderdag: Veiligheid
node post-screenshots.js 4

# Week 3 - Maandag: Meertalig
node post-screenshots.js 5
```

---

## 🎯 Aanbevolen Planning

### Week 1-2: Introductie & Basis
- **Ma 10:00**: Post 1 - Introductie
- **Do 10:00**: Post 2 - Barcode Scanner

### Week 3-4: Slimme Features
- **Ma 10:00**: Post 3 - Google Integratie
- **Do 10:00**: Post 4 - Veiligheid & Privacy

### Week 5: Inclusiviteit
- **Ma 10:00**: Post 5 - Meertalig

### Week 6+: Herhalen
- Herhaal populaire posts
- Test verschillende tijden
- Voeg variaties toe

---

## 🔧 Troubleshooting

### Error: "Missing required environment variables"
**Oplossing:**
- Check of `.env` bestand bestaat in `Agent/seniorease-content-agent/`
- Check of `FACEBOOK_PAGE_ACCESS_TOKEN` en `FACEBOOK_PAGE_ID` ingevuld zijn

### Error: "Facebook API Error: Invalid OAuth token"
**Oplossing:**
- Je token is verlopen (tokens zijn 60 dagen geldig)
- Verkrijg nieuwe token via stap 1
- Update `.env` met nieuwe token

### Error: "Screenshot niet gevonden"
**Oplossing:**
- Check of screenshots in de juiste folder staan: `screenshots/`
- Check of bestandsnamen kloppen: `Screenshot_1.png`, `Screenshot_2.png`, etc.

### Error: "Permission denied"
**Oplossing:**
- Check of je Admin of Editor bent van de senioreasenl pagina
- Check of je de juiste permissions hebt geselecteerd in stap 1.2

### Error: "Rate limit exceeded"
**Oplossing:**
- Facebook heeft rate limits
- Wacht 5-10 minuten tussen posts
- Het script wacht automatisch 30 seconden tussen posts

---

## 💡 Tips & Tricks

### Beste tijden om te posten
**Doelgroep senioren (65+):**
- 🌅 Ochtend: 09:00 - 11:00 (beste tijd!)
- ☕ Middag: 14:00 - 16:00
- 🌆 Avond: 19:00 - 21:00

**Beste dagen:**
- Di, Wo, Do (weekdagen)
- Vermijd Ma ochtend en vrijdagmiddag

### Content variaties
Na de eerste ronde, probeer:
- Andere emojis
- Kortere teksten
- Testimonials toevoegen
- Call-to-action variëren

### Tracking
Monitor per post:
- 👁️ Bereik (hoeveel mensen zagen het)
- 💬 Engagement (likes, comments, shares)
- 🔗 Clicks (naar seniorease.nl)

Check in Facebook Page Insights!

---

## 🚀 Advanced: Automatisch Posten

### Optie 1: Windows Task Scheduler
Maak een scheduled task die automatisch post:

```powershell
# Maak bat file: post-weekly.bat
cd D:\MAUREEN\DEV\Seniorease\seniorease-project\Agent\seniorease-content-agent
node post-screenshots.js 1
```

**Setup Task Scheduler:**
1. Open Task Scheduler
2. Create Task
3. Trigger: Maandag 10:00
4. Action: Run `post-weekly.bat`

### Optie 2: Vercel Cron (deploy naar cloud)
Deploy je Agent naar Vercel voor volledig automatisch posten.

**Zie:** `Agent/seniorease-content-agent/README.md` voor Vercel setup

---

## 📊 Resultaten Meten

### Na 1 week:
- Welke post had meeste bereik?
- Welke tijd werkt best?
- Hoeveel website clicks?

### Na 1 maand:
- Groei in Page Likes?
- Engagement trend?
- Beste screenshot?

**Pas je strategie aan op basis van data! 📈**

---

## ✅ Quick Reference

### Eerste keer setup
```bash
# 1. Get token
start https://developers.facebook.com/tools/explorer/

# 2. Setup .env
cd Agent\seniorease-content-agent
Copy-Item ENV-TEMPLATE.txt .env
notepad .env

# 3. Test
node post-screenshots.js --dry-run 1

# 4. Post!
node post-screenshots.js 1
```

### Dagelijks gebruik
```bash
cd Agent\seniorease-content-agent

# Zie opties
node post-screenshots.js

# Post één
node post-screenshots.js [nummer]
```

---

## 📞 Hulp Nodig?

**Documentatie:**
- Token problemen: `FACEBOOK-PAGE-TOKEN-FIX.md`
- Complete guide: `FACEBOOK-POSTING-COMPLETE-GUIDE.md`
- Screenshot strategie: `FACEBOOK-SCREENSHOTS-STRATEGIE.md`

**Test scripts:**
- Test Facebook connectie: `node test-facebook.js`
- Vind page ID: `node get-page-token.js`

---

**Succes met je Facebook posts! 🎉**

📱 Check je posts: https://www.facebook.com/senioreasenl


