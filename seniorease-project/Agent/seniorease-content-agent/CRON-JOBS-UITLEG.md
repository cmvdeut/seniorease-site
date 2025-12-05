# 📅 Vercel Cron Jobs - Uitleg

## Waar draait de automatische posting?

De automatische posting draait **volledig in de cloud** op **Vercel's servers**. Je hoeft niets lokaal te draaien!

## 🕐 Wanneer draait het?

**Schema:** Maandag, Woensdag, Vrijdag om **10:00** (Nederlandse tijd)

Dit is geconfigureerd in `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/schedule-posts",
      "schedule": "0 10 * * 1,3,5"
    }
  ]
}
```

### Schedule uitleg:
```
"0 10 * * 1,3,5"
 │  │  │ │ │
 │  │  │ │ └─ Dag van de week (1=Maandag, 3=Woensdag, 5=Vrijdag)
 │  │  │ └─── Maand (* = elke maand)
 │  │  └───── Dag van de maand (* = elke dag)
 │  └──────── Uur (10 = 10:00)
 └─────────── Minuut (0 = op het hele uur)
```

## 🔄 Wat gebeurt er bij elke run?

1. **Vercel roept automatisch aan:**
   ```
   GET https://seniorease-content-agent.vercel.app/api/schedule-posts
   ```

2. **De endpoint doet:**
   - Genereert 1 nieuwe post met Claude AI
   - Post de content naar Facebook
   - Logt het resultaat

3. **Resultaat:**
   - Succes: Post staat op Facebook
   - Fout: Wordt gelogd in Vercel logs

## 📊 Waar kun je het monitoren?

### 1. Vercel Dashboard
- Ga naar: https://vercel.com/cmvdeut-gmailcoms-projects/seniorease-content-agent
- Klik op **"Cron Jobs"** tab
- Zie je:
  - ✅ Laatste run status
  - 📅 Volgende run tijd
  - 📝 Logs van elke run

### 2. Via Vercel CLI
```bash
vercel logs seniorease-content-agent.vercel.app
```

### 3. Handmatig testen
```bash
# Test de endpoint handmatig
curl https://seniorease-content-agent.vercel.app/api/schedule-posts
```

## ⚙️ Aanpassen van het schema

### Elke dag om 10:00
```json
"schedule": "0 10 * * *"
```

### Elke werkdag om 14:00
```json
"schedule": "0 14 * * 1-5"
```

### 2x per week (maandag en donderdag)
```json
"schedule": "0 10 * * 1,4"
```

**Na wijziging:** Push naar GitHub of deploy met `vercel --prod`

## 🔍 Troubleshooting

### Cron jobs draaien niet?
1. Check of je Vercel Pro account hebt (gratis crons zijn beschikbaar)
2. Check de Cron Jobs tab in Vercel dashboard
3. Check de logs: `vercel logs`

### Posts komen niet op Facebook?
- Check of `FACEBOOK_PAGE_ACCESS_TOKEN` correct is
- Test de token: `node check-token.js`
- Check Vercel logs voor errors

### Content wordt niet gegenereerd?
- Check of `ANTHROPIC_API_KEY` correct is
- Test lokaal: `npm run test-generate`
- Check Vercel logs

## 📝 Belangrijk

- ✅ Cron jobs draaien automatisch, je hoeft niets te doen
- ✅ Ze draaien op Vercel's servers (niet lokaal)
- ✅ Ze werken alleen als je project deployed is op Vercel
- ✅ Elke run wordt gelogd in Vercel dashboard

## 🎯 Volgende run

De volgende automatische post zal zijn:
- **Datum:** Volgende maandag/woensdag/vrijdag
- **Tijd:** 10:00 Nederlandse tijd
- **Endpoint:** `/api/schedule-posts`

Je kunt dit altijd handmatig triggeren door de endpoint aan te roepen!




