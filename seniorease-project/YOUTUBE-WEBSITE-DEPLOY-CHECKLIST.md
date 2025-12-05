# ✅ YouTube Website Wijzigingen - Deploy Checklist
## SeniorEase.nl

---

## 📋 Wijzigingen Gemaakt

### **Homepage (`app/page.tsx`):**
- [x] YouTube sectie toegevoegd (prominente sectie)
- [x] YouTube link in footer toegevoegd
- [x] Tekst: "Eerste video's zijn nu beschikbaar"
- [x] YouTube URL variabele: `YOUTUBE_CHANNEL_URL`

---

## 🚀 Deployment Opties

### **Optie 1: Automatisch (Als Vercel gekoppeld is)**

Als je Vercel al gekoppeld hebt aan GitHub:
1. **Commit en push wijzigingen:**
   ```bash
   git add app/page.tsx
   git commit -m "Add YouTube video section to homepage and footer"
   git push
   ```

2. **Vercel deployt automatisch:**
   - Wacht 1-2 minuten
   - Check Vercel dashboard
   - Nieuwe deployment verschijnt automatisch

---

### **Optie 2: Handmatig Deployen**

Als Vercel NIET automatisch deployt:

1. **Ga naar Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Zoek je project: `seniorease-site` (of jouw project naam)

2. **Trigger nieuwe deployment:**
   - Klik op project
   - Klik "Deployments" tab
   - Klik "Redeploy" op laatste deployment
   - Of: Push naar GitHub (als gekoppeld)

---

## ✅ Pre-Deploy Checklist

- [x] YouTube sectie toegevoegd aan homepage
- [x] YouTube link toegevoegd aan footer
- [x] Tekst aangepast ("video's zijn beschikbaar")
- [ ] YouTube URL gecontroleerd (klopt `@SeniorEaseNL`?)
- [ ] Lokaal getest (localhost:3001)
- [ ] Geen linter errors

---

## 🔍 Test Na Deployment

Na deployment, test op seniorease.nl:

1. **Homepage:**
   - [ ] YouTube sectie zichtbaar (tussen tools en features)
   - [ ] "Bekijk op YouTube" knop werkt
   - [ ] Link gaat naar juiste YouTube kanaal

2. **Footer:**
   - [ ] "Video's" kolom zichtbaar
   - [ ] "Bekijk op YouTube" link werkt
   - [ ] Tekst: "Instructievideo's beschikbaar"

---

## 🆘 Problemen?

### **YouTube link werkt niet:**
- Check of `@SeniorEaseNL` klopt
- Of gebruik: `https://www.youtube.com/channel/YOUR_CHANNEL_ID`
- Pas aan in `app/page.tsx` regel 6

### **Sectie niet zichtbaar:**
- Hard refresh: `Ctrl + Shift + R`
- Check of deployment klaar is
- Check browser console voor errors

---

## 📝 YouTube URL Aanpassen

Als je YouTube URL anders is, pas aan in `app/page.tsx`:

```typescript
// Regel 6
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@SeniorEaseNL';
```

**Mogelijke URLs:**
- `https://www.youtube.com/@SeniorEaseNL` (custom URL, na 100 abonnees)
- `https://www.youtube.com/channel/UCxxxxx` (channel ID)
- `https://www.youtube.com/c/SenioreaseNL` (alternatief)

---

**Klaar om te deployen!** 🚀

---

**Laatste update:** 23 november 2025  
**Status:** Klaar voor Deployment


