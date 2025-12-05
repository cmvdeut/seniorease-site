# ✅ Checklist: Wat Ontbreekt Er Nog?

## 📋 Environment Variables Checklist

Controleer of je `.env` bestand deze variabelen bevat:

### ✅ Verplicht (voor lokaal testen):
- [ ] `ANTHROPIC_API_KEY` - Claude API key (begint met `sk-ant-api03-`)
- [ ] `FACEBOOK_PAGE_ACCESS_TOKEN` - Facebook Page Token (begint met `EAA...`)
- [ ] `FACEBOOK_PAGE_ID` - Facebook Page ID (numeriek, bijv. `123456789`)

### ⚠️ Optioneel (voor Vercel deployment):
- [ ] `CRON_SECRET` - Secret voor cron job beveiliging (willekeurige string)

---

## 🔍 Hoe Te Controleren

### 1. Check of .env bestaat:
```powershell
cd Agent/seniorease-content-agent
Test-Path .env
```

### 2. Test Environment Variables:
```powershell
npm run test-facebook
```

Dit zal je vertellen welke variabelen ontbreken.

### 3. Check Token Type:
```powershell
npm run check-token
```

Dit controleert of je een **Page Token** hebt (niet User Token).

### 4. Check Status Endpoint (na deployment):
```bash
curl https://jouw-project.vercel.app/api/status
```

---

## 📝 .env Template

Je `.env` bestand zou er zo uit moeten zien:

```env
# Claude API Key (verkrijg via https://console.anthropic.com/)
ANTHROPIC_API_KEY=sk-ant-api03-jouw-key-hier

# Facebook Page Access Token (verkrijg via https://developers.facebook.com/tools/explorer/)
# BELANGRIJK: Dit moet een PAGE token zijn, niet een USER token!
FACEBOOK_PAGE_ACCESS_TOKEN=EAAxxxxx-jouw-page-token-hier

# Facebook Page ID (vind via Graph API Explorer of je pagina → About)
FACEBOOK_PAGE_ID=123456789012345

# Cron Secret (optioneel, voor beveiliging)
CRON_SECRET=een-random-secret-hier
```

---

## 🚨 Veelvoorkomende Problemen

### ❌ "ANTHROPIC_API_KEY is niet ingesteld"
**Oplossing:**
1. Maak account op https://console.anthropic.com/
2. Maak API key aan
3. Voeg toe aan `.env`

### ❌ "FACEBOOK_PAGE_ACCESS_TOKEN not found"
**Oplossing:**
1. Ga naar https://developers.facebook.com/tools/explorer/
2. Selecteer je **SeniorEase pagina** (niet persoonlijk account!)
3. Genereer Page Token met permissions: `pages_manage_posts`, `pages_read_engagement`
4. Voeg toe aan `.env`

### ❌ "This is NOT a PAGE token!"
**Oplossing:**
- Je hebt een User Token in plaats van Page Token
- Volg instructies in `FACEBOOK-PAGE-TOKEN-FIX.md`

### ❌ "Page ID mismatch"
**Oplossing:**
- Run `npm run check-token` om de juiste Page ID te zien
- Update `FACEBOOK_PAGE_ID` in `.env`

---

## ✅ Test Stappen

1. **Test Content Generatie:**
   ```powershell
   npm run test-generate
   ```

2. **Test Facebook Posting:**
   ```powershell
   npm run test-facebook
   ```

3. **Check Token:**
   ```powershell
   npm run check-token
   ```

4. **Vind Page ID:**
   ```powershell
   npm run find-page-id
   ```

---

## 📦 Bestanden Checklist

- [x] `.env` - Bestaat (maar check of alle variabelen erin staan)
- [x] `.env.example` - Bestaat (template voor anderen)
- [x] `.gitignore` - Bestaat (zorgt dat .env niet naar GitHub gaat)
- [x] `package.json` - Bestaat
- [x] `vercel.json` - Bestaat
- [x] `lib/facebook.js` - Bestaat
- [x] `lib/claude.js` - Bestaat
- [x] `config/topics.json` - Bestaat
- [x] `test-facebook.js` - Bestaat
- [x] `test-generate.js` - Bestaat
- [x] `api/schedule-posts.js` - Bestaat
- [x] `api/status.js` - Bestaat

---

## 🎯 Volgende Stappen

1. ✅ Check of alle environment variables in `.env` staan
2. ✅ Test lokaal met `npm run test-facebook`
3. ✅ Als lokaal werkt: deploy naar Vercel
4. ✅ Configureer environment variables in Vercel
5. ✅ Test cron job handmatig
6. ✅ Monitor eerste automatische posts

---

**Laatste update:** Check deze checklist regelmatig om te zien wat er nog ontbreekt!



