# 🔍 Vercel Projecten Uitleg

**Je hebt 2 Vercel projecten:**
1. `seniorease-project` 
2. `seniorease-site`

---

## ❓ Wat is het Verschil?

**Mogelijke situaties:**

### Situatie A: Twee Aparte Projecten
- `seniorease-project`: Oud project (mogelijk test/staging)
- `seniorease-site`: Hoofdproject (productie) ✅

### Situatie B: Dubbele Deployment
- Beide projecten zijn gekoppeld aan dezelfde GitHub repo
- Beide deployen automatisch
- Dit kan verwarring veroorzaken

---

## ✅ Welke Moet Je Gebruiken?

**Check in Vercel Dashboard:**

1. **Ga naar beide projecten:**
   - `seniorease-project`
   - `seniorease-site`

2. **Check per project:**
   - **GitHub Repository:** Welke repo is gekoppeld?
   - **Domain:** Welke domain is gekoppeld?
   - **Laatste deployment:** Wanneer?
   - **Status:** Welke is "Production Current"?

3. **Check domains:**
   - `seniorease-project.vercel.app` → Welk project?
   - `seniorease-site.vercel.app` → Welk project?
   - `www.seniorease.nl` → Welk project?

---

## 🎯 Aanbeveling

**Gebruik `seniorease-site` als hoofdproject:**
- ✅ Dit is gekoppeld aan `cmvdeut/seniorease-site` op GitHub
- ✅ Dit is waar we alle fixes hebben gepusht
- ✅ Dit zou de productie site moeten zijn

**`seniorease-project` kan:**
- Oud/test project zijn
- Of een duplicate zijn die verwijderd kan worden

---

## 🔧 Actie Items

**Optie 1: Check Welke Actief Is**
1. Vercel Dashboard → `seniorease-site`
2. Check Settings → Domains
3. Welke domain is gekoppeld? (`www.seniorease.nl`?)

**Optie 2: Verwijder Duplicate (Als Nodig)**
1. Als `seniorease-project` niet gebruikt wordt
2. Vercel Dashboard → `seniorease-project` → Settings
3. Scroll naar beneden → "Delete Project"

**Optie 3: Merge Projecten (Als Nodig)**
1. Als beide projecten nodig zijn
2. Kies één als "production"
3. Zet de andere op "preview" of verwijder

---

## 📋 Checklist

- [ ] Check welke project `www.seniorease.nl` gebruikt
- [ ] Check welke project de meeste deployments heeft
- [ ] Check welke project gekoppeld is aan `cmvdeut/seniorease-site`
- [ ] Besluit welke project je wilt behouden

---

**Laat me weten wat je ziet in beide projecten!** 🔍


