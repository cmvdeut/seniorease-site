# 🔗 Zapier Setup - Stap voor Stap

## 🎯 Wat gaan we doen?
We gebruiken Zapier om automatisch posts naar Facebook te plaatsen. Dit is veel makkelijker dan Facebook API tokens!

**Voordelen:**
- ✅ Geen complexe Facebook API setup
- ✅ Je bent al ingelogd bij Zapier
- ✅ Makkelijker te onderhouden
- ✅ Betere error handling

---

## 📋 STAP 1: Maak Zapier Webhook

### 1.1 Ga naar Zapier
1. Open: https://zapier.com/
2. Log in met je account
3. Klik op **"Create Zap"** (rechtsboven)

### 1.2 Maak Webhook Trigger
1. Zoek naar **"Webhooks by Zapier"**
2. Kies **"Catch Hook"** (dit ontvangt data van onze app)
3. Klik **"Continue"**

### 1.3 Kopieer Webhook URL
1. Je ziet nu een webhook URL (bijv. `https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx`)
2. **Kopieer deze URL** - we hebben deze straks nodig!
3. Klik **"Continue"**
4. Klik **"Test trigger"** (optioneel, voor nu)

**✅ Checkpoint:** Je hebt nu een Zapier webhook URL!

---

## 📋 STAP 2: Voeg Facebook Action Toe

### 2.1 Voeg Facebook Action
1. Klik op **"+ Add step"** of **"Action"**
2. Zoek naar **"Facebook Pages"**
3. Kies **"Create Page Post"**
4. Klik **"Continue"**

### 2.2 Connect Facebook Account
1. Klik **"Sign in to Facebook Pages"**
2. Log in met je Facebook account (het account dat admin is van SeniorEase pagina)
3. Geef toestemming aan Zapier
4. Selecteer je **SeniorEase pagina**

### 2.3 Configureer Post
1. **Page:** Selecteer "SeniorEase" (je pagina)
2. **Message:** 
   - Klik op het veld
   - Kies **"message"** uit de dropdown (dit komt van de webhook)
   - Of gebruik: `{{message}}` (de volledige post tekst)
3. **Post Type:** Laat op "Text Post" (standaard)
4. Klik **"Continue"**

### 2.4 Test de Action
1. Klik **"Test action"**
2. Check je Facebook pagina - er zou een test post moeten verschijnen!

**✅ Checkpoint:** Facebook posting werkt via Zapier!

---

## 📋 STAP 3: Activeer de Zap

### 3.1 Geef je Zap een Naam
1. Klik op **"Zap name"** (bovenaan)
2. Vul in: `SeniorEase Auto Post`
3. Klik **"Save"**

### 3.2 Activeer de Zap
1. Zet de schakelaar **"ON"** (rechtsboven)
2. Je Zap is nu actief!

**✅ Checkpoint:** Zap is actief en wacht op webhooks!

---

## 📋 STAP 4: Update Je Code

### 4.1 Voeg Zapier Webhook URL Toe
1. Open je `.env` bestand in `Agent/seniorease-content-agent/`
2. Voeg toe:
   ```env
   ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx
   ```
3. Vervang `xxxxx` met je echte webhook URL (van Stap 1.3)
4. Sla op

### 4.2 Update schedule-posts.js
We hebben al een nieuwe versie gemaakt: `schedule-posts-zapier.js`

**Optie A: Vervang de oude versie**
- Rename `schedule-posts.js` naar `schedule-posts-old.js`
- Rename `schedule-posts-zapier.js` naar `schedule-posts.js`

**Optie B: Update vercel.json**
- Verander de cron path naar `/api/schedule-posts-zapier`

**Optie C: Update de bestaande schedule-posts.js**
- Ik kan de code voor je updaten

Welke optie wil je?

---

## 📋 STAP 5: Test Alles

### 5.1 Test Handmatig
```powershell
cd Agent\seniorease-content-agent
node -e "fetch('https://jouw-vercel-app.vercel.app/api/schedule-posts-zapier').then(r => r.json()).then(console.log)"
```

Of test via browser:
```
https://jouw-vercel-app.vercel.app/api/schedule-posts-zapier
```

### 5.2 Check Zapier
1. Ga naar je Zapier dashboard
2. Klik op je Zap: "SeniorEase Auto Post"
3. Check de **"Task History"** - je zou een nieuwe task moeten zien!

### 5.3 Check Facebook
- Ga naar je SeniorEase Facebook pagina
- Check of er een nieuwe post is!

**✅ Checkpoint:** Alles werkt!

---

## 🎯 Volgende Stappen

1. ✅ Zapier webhook gemaakt
2. ✅ Facebook action geconfigureerd
3. ✅ Zap geactiveerd
4. ✅ Code geüpdatet
5. ✅ Getest

**Nu draait alles automatisch via Vercel cron → Zapier → Facebook!** 🎉

---

## 🐛 Troubleshooting

### Probleem: "Zapier webhook ontvangt geen data"
**Oplossing:**
- Check of `ZAPIER_WEBHOOK_URL` correct is in `.env`
- Check of de URL begint met `https://hooks.zapier.com/`
- Test de webhook handmatig

### Probleem: "Facebook post verschijnt niet"
**Oplossing:**
- Check Zapier Task History voor errors
- Check of je Facebook account verbonden is
- Check of je admin bent van de pagina

### Probleem: "Cron job werkt niet"
**Oplossing:**
- Check Vercel logs
- Check of `CRON_SECRET` correct is ingesteld
- Test handmatig via browser

---

## 💡 Tips

- **Monitor Zapier:** Check regelmatig de Task History
- **Backup:** Bewaar de oude `schedule-posts.js` als backup
- **Test eerst:** Test altijd handmatig voordat je de cron activeert
- **Logs:** Check Vercel logs voor errors

---

**Veel succes! 🚀**



