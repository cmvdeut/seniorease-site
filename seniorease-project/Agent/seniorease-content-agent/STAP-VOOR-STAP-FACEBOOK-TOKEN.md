# 🔑 Stap-voor-Stap: Nieuwe Facebook Page Token Ophalen

## 📋 Overzicht
Je huidige Facebook token is gekoppeld aan een app die niet meer bestaat. We gaan nu een **nieuwe Facebook App** maken en een **nieuwe Page Token** ophalen.

**Tijd:** ~10-15 minuten  
**Moeilijkheid:** Makkelijk (ik begeleid je stap voor stap)

---

## ✅ STAP 1: Maak een Nieuwe Facebook App

### 1.1 Ga naar Facebook Developers
1. Open je browser
2. Ga naar: **[https://developers.facebook.com/apps/](https://developers.facebook.com/apps/)**
3. Log in met je Facebook account (het account dat beheerder is van je SeniorEase pagina)

### 1.2 Maak Nieuwe App
1. Klik op de groene knop **"Create App"** (rechtsboven)
2. Je ziet een scherm met app types:
   - **Kies:** "Business" (of "Other" als Business niet zichtbaar is)
   - Klik **"Next"**

### 1.3 Vul App Details In
1. **App Name:** `SeniorEase Content Agent`
2. **App Contact Email:** `info@seniorease.nl` (of je eigen email)
3. **Business Account:** (optioneel, laat leeg als je die niet hebt)
4. Klik **"Create App"**

### 1.4 Voltooi Setup
- Je ziet mogelijk een captcha of verificatie
- Volg de instructies op het scherm
- Klik **"Continue"** of **"Skip"** als je dat kunt

**✅ Checkpoint:** Je ziet nu het dashboard van je nieuwe app!

---

## ✅ STAP 2: Voeg Facebook Login Product Toe

### 2.1 Ga naar Products
1. In je app dashboard, zie je een menu aan de linkerkant
2. Scroll naar beneden naar **"Products"**
3. Klik op **"Add Product"** (of zoek naar "Facebook Login")

### 2.2 Voeg Facebook Login Toe
1. Zoek **"Facebook Login"** in de lijst
2. Klik op **"Set Up"** (of het + icoon)

### 2.3 Configureer Facebook Login
1. Je ziet een scherm met platform opties:
   - **Kies:** "Web" (niet iOS of Android)
   - Klik **"Next"**

2. **Site URL:**
   - Vul in: `https://seniorease.nl` (of `http://localhost` voor testen)
   - Klik **"Save"**

**✅ Checkpoint:** Facebook Login is nu toegevoegd aan je app!

---

## ✅ STAP 3: Haal Page Access Token Op

### 3.1 Ga naar Graph API Explorer
1. Open een **nieuw tabblad** in je browser
2. Ga naar: **[https://developers.facebook.com/tools/explorer/](https://developers.facebook.com/tools/explorer/)**
3. Je ziet de Graph API Explorer interface

### 3.2 Selecteer Je App
1. **Bovenaan links** zie je een dropdown met "Meta App"
2. Klik op de dropdown
3. **Selecteer je nieuwe app:** `SeniorEase Content Agent` (of de naam die je hebt gekozen)

### 3.3 Haal Page Token Op
1. Klik op **"Get Token"** (rechtsboven, naast het token veld)
2. Kies **"Get Page Access Token"** uit het dropdown menu
3. Je ziet een lijst met pagina's waar je admin bent:
   - **Zoek en selecteer:** `SeniorEase` (je Facebook pagina)
   - Als je pagina niet ziet: Check of je admin rechten hebt op de pagina

### 3.4 Selecteer Permissions
1. Je ziet een scherm met permissions
2. **Vink aan:**
   - ✅ `pages_manage_posts` (VERPLICHT - om posts te maken)
   - ✅ `pages_read_engagement` (Aanbevolen - om engagement te lezen)
3. Klik **"Generate Access Token"**

### 3.5 Kopieer de Token
1. Je ziet nu een token in het veld (begint met `EAA...`)
2. **Klik op het token veld** om het te selecteren
3. **Kopieer de hele token** (Ctrl+C of rechtsklik → Copy)
4. **BELANGRIJK:** Bewaar deze token ergens tijdelijk (notepad, etc.)

**✅ Checkpoint:** Je hebt nu een Page Access Token gekopieerd!

---

## ✅ STAP 4: Vind Je Page ID

### 4.1 Test de Token
1. In Graph API Explorer, met je pagina geselecteerd
2. In het **query veld** (bovenaan), typ: `/me`
3. Klik **"Submit"** (of druk Enter)

### 4.2 Bekijk Resultaat
Je ziet nu iets als:
```json
{
  "id": "10238480083518377",
  "name": "SeniorEase"
}
```

### 4.3 Kopieer Page ID
1. **Kopieer de `id`** (het lange nummer)
2. **Bewaar deze ook tijdelijk**

**✅ Checkpoint:** Je hebt nu zowel de Token als de Page ID!

---

## ✅ STAP 5: Update Je .env Bestand

### 5.1 Open .env Bestand
1. Ga naar: `Agent/seniorease-content-agent/`
2. Open het bestand `.env` in een teksteditor (Notepad, VS Code, etc.)

### 5.2 Update de Variabelen
Zoek deze regels en vervang ze:

```env
# Vervang deze regel:
FACEBOOK_PAGE_ACCESS_TOKEN=EAAatNZAjWjasBPwakPv...
# Met je nieuwe token:
FACEBOOK_PAGE_ACCESS_TOKEN=EAAxxxxx-jouw-nieuwe-token-hier

# Vervang deze regel (als nodig):
FACEBOOK_PAGE_ID=10238480083518377
# Met je Page ID (als die anders is):
FACEBOOK_PAGE_ID=10238480083518377
```

**⚠️ Belangrijk:**
- Plak de **hele token** (kan lang zijn)
- Zorg dat er geen spaties voor of na de `=` staan
- Sla het bestand op (Ctrl+S)

**✅ Checkpoint:** Je `.env` is geüpdatet!

---

## ✅ STAP 6: Test de Nieuwe Token

### 6.1 Test Token Permissions
Open PowerShell en voer uit:

```powershell
cd Agent\seniorease-content-agent
npm run check-token
```

**Verwacht resultaat:**
- ✅ "This is a PAGE token!"
- ✅ "pages_manage_posts: ✅"
- ✅ "pages_read_engagement: ✅"

### 6.2 Test Facebook Posting
```powershell
npm run test-facebook
```

**Verwacht resultaat:**
- ✅ "SUCCESS! Post gepubliceerd!"
- ✅ Geen errors

**✅ Checkpoint:** Als beide tests slagen, werkt alles!

---

## 🎉 Klaar!

Als alles werkt:
1. ✅ Je hebt een nieuwe Facebook App
2. ✅ Je hebt een nieuwe Page Token
3. ✅ Je kunt nu posts maken naar je Facebook pagina

---

## 🐛 Troubleshooting

### Probleem: "App not found"
**Oplossing:** Check of je de juiste app hebt geselecteerd in Graph API Explorer

### Probleem: "Page not in list"
**Oplossing:** 
- Check of je admin rechten hebt op de SeniorEase pagina
- Ga naar je Facebook pagina → Settings → Page Roles → Check of je admin bent

### Probleem: "Invalid token"
**Oplossing:**
- Check of je de hele token hebt gekopieerd (kan lang zijn)
- Check of er geen spaties in de token staan in `.env`
- Haal een nieuwe token op als deze niet werkt

### Probleem: "Missing permissions"
**Oplossing:**
- Ga terug naar Graph API Explorer
- Klik "Get Token" → "Get Page Access Token" opnieuw
- Zorg dat `pages_manage_posts` is aangevinkt

---

## 📞 Hulp Nodig?

Als je ergens vastloopt:
1. Check de error message
2. Kijk in `TEST-RESULTATEN.md` voor veelvoorkomende problemen
3. Probeer de stap opnieuw

**Veel succes! 🚀**



