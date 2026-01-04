# ✅ Vercel Projecten Setup - Preview & Production

**Huidige situatie:**
- ✅ `seniorease-site` → **Production** (www.seniorease.nl)
- ✅ `seniorease-project` → **Preview** (seniorease-project.vercel.app)

---

## 🎯 Hoe Het Werkt

### Production Project: `seniorease-site`
- **Domain:** `www.seniorease.nl` ✅
- **GitHub:** `cmvdeut/seniorease-site`
- **Gebruik:** Live productie site
- **Auto-deploy:** Ja, op elke push naar `main`

### Preview Project: `seniorease-project`
- **Domain:** `seniorease-project.vercel.app`
- **GitHub:** `cmvdeut/seniorease-site` (zelfde repo)
- **Gebruik:** Test/preview voordat je naar productie gaat
- **Auto-deploy:** Ja, op elke push naar `main`

---

## 📋 Best Practices

### Voor Production (`seniorease-site`):
1. **Check altijd eerst op preview:**
   - Test nieuwe features op `seniorease-project.vercel.app`
   - Als alles werkt, dan is het automatisch ook op productie

2. **Deployments:**
   - Beide projecten deployen automatisch van dezelfde repo
   - Als je pusht naar GitHub, deployen beide
   - Check altijd eerst preview voordat je productie checkt

### Voor Preview (`seniorease-project`):
1. **Test nieuwe features hier eerst:**
   - Test contact formulier
   - Test nieuwe pagina's
   - Test security fixes

2. **Als preview werkt:**
   - Dan werkt productie ook (zelfde code)
   - Check productie om te bevestigen

---

## 🔍 Verificatie Workflow

**Bij elke nieuwe deployment:**

1. **Check Preview:**
   - Ga naar: `https://seniorease-project.vercel.app`
   - Test nieuwe features
   - Check of alles werkt

2. **Check Production:**
   - Ga naar: `https://www.seniorease.nl`
   - Bevestig dat hetzelfde werkt
   - Check of domain correct is

---

## ⚠️ Belangrijk

**Beide projecten deployen automatisch:**
- Als je pusht naar GitHub → beide deployen
- Dit is normaal en handig voor testing
- Preview geeft je een veilige plek om te testen

**Als je alleen productie wilt deployen:**
- Je kunt `seniorease-project` pauseren (Settings → Git → Disconnect)
- Maar preview is handig om te behouden!

---

## ✅ Voordelen van Deze Setup

1. **Veilig testen:**
   - Test op preview voordat productie live gaat
   - Zelfde code, andere URL

2. **Snelle verificatie:**
   - Check preview → werkt het?
   - Check productie → zelfde resultaat

3. **Geen risico:**
   - Als preview werkt, werkt productie ook
   - Geen verrassingen op live site

---

## 📋 Checklist

- [x] `seniorease-site` = Production (www.seniorease.nl)
- [x] `seniorease-project` = Preview (seniorease-project.vercel.app)
- [x] Beide gekoppeld aan `cmvdeut/seniorease-site`
- [x] Auto-deploy actief op beide

---

**Perfecte setup! Je hebt nu een veilige preview omgeving!** 🎉






