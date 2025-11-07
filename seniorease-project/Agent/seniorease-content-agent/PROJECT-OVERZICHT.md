# 📦 SeniorEase Content Agent - Complete Overzicht

## 🎯 Wat doet dit project?

Een **volledig geautomatiseerde AI content generator** die:
- ✅ 3x per week (ma/wo/vr) automatisch posts genereert
- ✅ Content schrijft in het Nederlands met Claude AI
- ✅ Direct post naar Facebook (later: YouTube)
- ✅ Draait op Vercel met cron jobs
- ✅ 50+ tech tips specifiek voor senioren

---

## 📁 Project Structuur

```
seniorease-content-agent/
│
├── 📄 README.md                    # Volledige documentatie & setup
├── 📄 package.json                 # NPM dependencies
├── 📄 vercel.json                  # Vercel config + cron jobs
├── 📄 .env.example                 # Environment variables template
├── 📄 .gitignore                   # Git ignore rules
├── 📄 test-generate.js             # Test script (lokaal)
│
├── 📂 api/                         # Vercel Serverless Functions
│   ├── generate-content.js        # Content generator endpoint
│   └── schedule-posts.js          # Cron job handler (auto-post)
│
├── 📂 lib/                         # Core libraries
│   ├── claude.js                  # Claude AI wrapper
│   └── facebook.js                # Facebook API wrapper
│
└── 📂 config/                      # Configuratie
    └── topics.json                # 50+ content onderwerpen
```

---

## 🔧 Wat zit er in elk bestand?

### **📄 package.json**
- NPM configuratie
- Dependencies: Claude SDK, node-fetch, dotenv
- Scripts: `test-generate`, `dev`

### **📄 vercel.json**
- Cron job definitie: maandag/woensdag/vrijdag 10:00
- Environment variables configuratie
- API routes setup

### **📄 .env.example**
- Template voor API keys
- Facebook credentials
- Cron secrets

### **📂 api/generate-content.js**
- **Endpoint:** `/api/generate-content`
- Genereert content via Claude API
- Query params: `?count=3` voor meerdere posts
- Returns: JSON met gegenereerde posts

### **📂 api/schedule-posts.js**
- **Endpoint:** `/api/schedule-posts`
- Draait automatisch via Vercel cron
- Flow:
  1. Genereer content met Claude
  2. Post naar Facebook
  3. Log resultaat
- Beveiligd met CRON_SECRET

### **📂 lib/claude.js**
- `ClaudeContentGenerator` class
- Methodes:
  - `generateSocialPost()` - Genereer 1 post
  - `generateMultiplePosts()` - Genereer meerdere
  - `getRandomTopics()` - Kies random onderwerp
- Gebruikt config/topics.json voor variatie

### **📂 lib/facebook.js**
- `FacebookPoster` class
- Methodes:
  - `postText()` - Post tekst
  - `postWithImage()` - Post met foto
  - `testConnection()` - Verifieer credentials
- Gebruikt Facebook Graph API v18.0

### **📂 config/topics.json**
- 5 categorieën:
  - smartphone_basics (10 topics)
  - tablet_tips (5 topics)
  - internet_safety (5 topics)
  - practical_apps (5 topics)
  - seniorease_features (5 topics)
- 5 post stijlen:
  - tip_van_de_dag
  - stap_voor_stap_uitleg
  - veelgemaakte_fout
  - vraag_en_antwoord
  - wist_je_dat

### **📄 test-generate.js**
- Lokaal test script
- Genereert 3 sample posts
- Toont output in terminal
- Run met: `npm run test-generate`

---

## 🔑 Required API Keys

### 1. Claude API Key
- **Waar:** https://console.anthropic.com/
- **Type:** `sk-ant-api03-xxxxx`
- **Kosten:** ~€15-30/maand (pay-as-you-go)
- **Let op:** Apart van Claude Plus account!

### 2. Facebook Page Access Token
- **Waar:** https://developers.facebook.com/tools/explorer/
- **Type:** Long-lived token (60 dagen of permanent)
- **Permissions:** `pages_manage_posts`, `pages_read_engagement`
- **Kosten:** Gratis

### 3. Facebook Page ID
- **Waar:** Facebook pagina → About → onderaan
- **Type:** Numeriek (bijv. `123456789`)

---

## ⚙️ Hoe het werkt

### **Flow 1: Automatische Posts (3x per week)**

```
Vercel Cron (ma/wo/vr 10:00)
    ↓
schedule-posts.js
    ↓
claude.js → Claude API
    ↓ (genereert content)
facebook.js → Facebook API
    ↓ (post content)
Log resultaat
```

### **Flow 2: Handmatig testen**

```
npm run test-generate
    ↓
test-generate.js
    ↓
claude.js → Claude API
    ↓
Console output (geen posting)
```

### **Flow 3: Via API endpoint**

```
GET /api/generate-content?count=3
    ↓
generate-content.js
    ↓
claude.js → Claude API
    ↓
Return JSON response
```

---

## 🚀 Deployment Flow

```
Lokale code
    ↓
Git push naar GitHub
    ↓
Vercel auto-deploy
    ↓
Live op Vercel
    ↓
Cron jobs actief
```

---

## 📊 Content Generatie Logic

1. **Topic Selectie:**
   - Random topic uit config/topics.json
   - Vermijd herhaling via logging

2. **AI Prompt:**
   - Onderwerp + stijl + platform specs
   - Max 500 woorden voor Facebook
   - Vriendelijke tone, geen jargon
   - Met emoji's en hashtags

3. **Output Parsing:**
   ```
   TITEL: [titel]
   TEKST: [content]
   HASHTAGS: #tag1 #tag2 #tag3
   ```

4. **Facebook Posting:**
   - Format: titel + tekst + hashtags
   - Via Graph API POST
   - Log result

---

## 🔐 Security

### ✅ Veilig
- `.env` in .gitignore
- Environment vars in Vercel
- CRON_SECRET voor cron jobs
- Private GitHub repo

### ❌ Nooit doen
- API keys in code committen
- .env naar GitHub pushen
- Public repo maken met secrets

---

## 📈 Monitoring & Logs

### Vercel Logs
```bash
vercel logs jouw-project-naam
```

### Cron Status
Vercel Dashboard → Project → Cron Jobs

### Manual Testing
```bash
# Test content generatie
curl https://jouw-project.vercel.app/api/generate-content

# Test posting
curl -X POST https://jouw-project.vercel.app/api/schedule-posts
```

---

## 🎨 Customization

### Meer/minder posts per week
**vercel.json:**
```json
"schedule": "0 10 * * 1,3,5"  // Ma, Wo, Vr
           ↓
"schedule": "0 10 * * *"       // Elke dag
           ↓
"schedule": "0 10 * * 1"       // Alleen maandag
```

### Andere post tijden
```json
"schedule": "0 10 * * 1,3,5"   // 10:00
           ↓
"schedule": "0 14 * * 1,3,5"   // 14:00
           ↓
"schedule": "30 9 * * 1,3,5"   // 09:30
```

### Nieuwe topics toevoegen
**config/topics.json:**
```json
{
  "category": "nieuwe_categorie",
  "topics": [
    "Nieuw onderwerp 1",
    "Nieuw onderwerp 2"
  ]
}
```

---

## 🔄 Updates & Maintenance

### Code wijzigen
```bash
# Lokaal aanpassen
# Test lokaal
npm run test-generate

# Push naar GitHub
git add .
git commit -m "Update topics"
git push

# Vercel deploy automatisch!
```

### API Keys verversen
Vercel Dashboard → Project → Settings → Environment Variables

---

## 💡 Future Enhancements

- [ ] YouTube video upload integratie
- [ ] Image generatie (DALL-E / Midjourney)
- [ ] Analytics dashboard
- [ ] A/B testing van post tijden
- [ ] Multi-language support
- [ ] Instagram integratie
- [ ] Content calendar UI

---

## ❓ Troubleshooting

### Content wordt niet gegenereerd
- Check ANTHROPIC_API_KEY in Vercel
- Check Vercel logs: `vercel logs`
- Test lokaal: `npm run test-generate`

### Posts komen niet op Facebook
- Verifieer token: https://developers.facebook.com/tools/debug/accesstoken/
- Check permissions: `pages_manage_posts`
- Test FB connection met test-facebook.js

### Cron jobs draaien niet
- Vercel Pro account nodig (gratis crons)
- Check Cron Jobs tab in Vercel dashboard
- CRON_SECRET correct ingesteld?

---

🎉 **Je bent klaar om te beginnen!**

Download de ZIP, volg de setup instructies in README.md, en laat me weten als je vastloopt!
