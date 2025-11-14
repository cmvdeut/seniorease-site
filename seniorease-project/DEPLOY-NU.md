# 🚀 Deploy Nu - Stap voor Stap

## ✅ Stap 1: Code is Gepusht
- ✅ Code is naar GitHub gepusht: `cmvdeut/seniorease-site`
- ✅ Puzzel pagina is aanwezig en werkt lokaal
- ✅ Build werkt zonder errors

---

## 🔍 Stap 2: Check Vercel Auto-Deploy

### Als Vercel al gekoppeld is:
1. Ga naar: **[https://vercel.com/dashboard](https://vercel.com/dashboard)**
2. Zoek je project (waarschijnlijk `seniorease-site`)
3. Check of er een **nieuwe deployment** bezig is
4. Wacht tot deployment klaar is (meestal 1-2 minuten)

### Als Vercel NIET gekoppeld is:
Volg deze stappen:

#### 2.1 Nieuwe Project in Vercel
1. Ga naar: **[https://vercel.com/new](https://vercel.com/new)**
2. Klik op **"Import Git Repository"**
3. Selecteer: **`cmvdeut/seniorease-site`**
4. Klik **"Import"**

#### 2.2 Configureer Project
Vercel detecteert automatisch Next.js, maar check deze instellingen:

- **Framework Preset**: Next.js ✅
- **Root Directory**: `./` (of leeg laten)
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅
- **Install Command**: `npm install` ✅

#### 2.3 Environment Variables (als nodig)
Als je Stripe keys nodig hebt:
- Ga naar **Settings** → **Environment Variables**
- Voeg toe:
  - `STRIPE_SECRET_KEY` (als je die gebruikt)
  - Andere variabelen die je nodig hebt

#### 2.4 Deploy!
1. Klik **"Deploy"**
2. Wacht tot deployment klaar is
3. Je krijgt een URL: `seniorease-site-xxxxx.vercel.app`

---

## 🌐 Stap 3: Koppel seniorease.nl Domain

### 3.1 Domain Toevoegen in Vercel
1. In Vercel project → **Settings** → **Domains**
2. Klik **"Add Domain"**
3. Voer in: `seniorease.nl`
4. Klik **"Add"**

### 3.2 DNS Records Configureren
Vercel toont nu DNS records die je nodig hebt:

**Voor root domain (`seniorease.nl`):**
- Type: **A** of **CNAME**
- Name: `@` (of leeg)
- Value: [IP of CNAME van Vercel]

**Voor www (`www.seniorease.nl`):**
- Type: **CNAME**
- Name: `www`
- Value: [CNAME van Vercel, bijv. `cname.vercel-dns.com`]

### 3.3 DNS Configureren bij Provider
Waar heb je `seniorease.nl` geregistreerd?

#### Strato.nl:
1. Log in bij [Strato.nl](https://www.strato.nl)
2. Ga naar **Domainbeheer** → **DNS beheer**
3. Voeg de records toe die Vercel geeft
4. Sla op

#### Andere Provider:
- Zie: `STRATO-DNS-SETUP.md` of `VERCEL-DOMEIN-STAP-VOOR-STAP.md`

### 3.4 Wacht op DNS Propagatie
- **Minimaal**: 5-10 minuten
- **Meestal**: 30 minuten - 2 uur
- **Maximaal**: 48 uur

Check status in Vercel → Settings → Domains:
- 🟢 **Valid** = Klaar!
- 🟡 **Pending** = Nog bezig
- 🔴 **Invalid** = Check DNS records

---

## ✅ Stap 4: Test Alles

### Test op Vercel URL (tijdelijk):
1. Ga naar: `https://seniorease-site-xxxxx.vercel.app`
2. Test alle tools:
   - ✅ Homepage
   - ✅ Rekenmachine: `/rekenmachine`
   - ✅ Afvinken: `/afvinken`
   - ✅ Kalender: `/kalender`
   - ✅ Klok: `/klok`
   - ✅ **Puzzels: `/puzzels`** ← **BELANGRIJK!**
   - ✅ Bibliotheek: `/bibliotheek`
   - ✅ Tools: `/tools`

### Test op seniorease.nl (als DNS klaar is):
1. Ga naar: `https://seniorease.nl`
2. Test dezelfde pagina's
3. Check of alles werkt

---

## 🐛 Problemen Oplossen

### Probleem: Puzzel werkt niet
**Mogelijke oorzaken:**
1. **Code niet gedeployed** → Check Vercel deployment
2. **Browser cache** → Hard refresh (Ctrl+F5)
3. **JavaScript error** → Check browser console (F12)

**Oplossing:**
```bash
# Check of code op GitHub staat
git log --oneline -5

# Check Vercel deployment logs
# Ga naar Vercel → Project → Deployments → Klik op deployment → Logs
```

### Probleem: Vercel deployt niet automatisch
**Oplossing:**
1. Check Vercel → Settings → Git
2. Check of GitHub repository gekoppeld is
3. Check of **Auto-deploy** aan staat
4. Push opnieuw: `git push origin main`

### Probleem: Domain werkt niet
**Oplossing:**
1. Check DNS records (gebruik [dnschecker.org](https://dnschecker.org))
2. Check Vercel → Settings → Domains → Status
3. Wacht langer op DNS propagatie
4. Check of SSL certificaat actief is

---

## 📋 Deployment Checklist

- [ ] Code gepusht naar GitHub
- [ ] Vercel project gekoppeld aan GitHub
- [ ] Deployment succesvol in Vercel
- [ ] Domain `seniorease.nl` toegevoegd in Vercel
- [ ] DNS records geconfigureerd bij provider
- [ ] DNS status "Valid" in Vercel
- [ ] SSL certificaat actief (HTTPS werkt)
- [ ] Homepage werkt op `https://seniorease.nl`
- [ ] Alle tools werken (inclusief `/puzzels`)
- [ ] Betalen pagina werkt
- [ ] Bibliotheek werkt

---

## 🎯 Volgende Stappen

1. **Test alles** op live site
2. **Check puzzel pagina** specifiek: `https://seniorease.nl/puzzels`
3. **Monitor Vercel logs** voor errors
4. **Test op verschillende browsers** (Chrome, Firefox, Safari)

---

## 💡 Tips

- **Vercel auto-deploys** bij elke push naar `main` branch
- **Preview deployments** worden gemaakt voor pull requests
- **Rollback** is mogelijk via Vercel dashboard
- **Analytics** zijn beschikbaar in Vercel (betaalde plan)

---

**Klaar?** Test nu `https://seniorease.nl/puzzels` en laat weten of het werkt! 🚀

