# 🔧 Facebook Page Token Fix

## ❌ Probleem
Je gebruikt waarschijnlijk een **User Token** in plaats van een **Page Token**.

**Verschil:**
- **User Token:** Kan alleen naar je persoonlijke account posten
- **Page Token:** Kan naar je Facebook pagina posten ✅

---

## ✅ Oplossing: Haal Page Token Op

### Stap 1: Ga naar Graph API Explorer

1. Ga naar: **[https://developers.facebook.com/tools/explorer/](https://developers.facebook.com/tools/explorer/)**
2. Log in met je Facebook account

### Stap 2: Selecteer Je Pagina

1. Klik op **"Meta App"** dropdown (bovenaan links)
2. Selecteer je **SeniorEase pagina** (niet je persoonlijke account!)
3. Als je pagina niet ziet:
   - Klik op **"Get Token"** → **"Get Page Access Token"**
   - Selecteer je SeniorEase pagina

### Stap 3: Genereer Page Token

1. Klik op **"Generate Access Token"**
2. **Belangrijk:** Kies deze permissions:
   - ✅ `pages_manage_posts` (om posts te maken)
   - ✅ `pages_read_engagement` (om engagement te lezen)
3. Klik **"Generate Access Token"**
4. **Kopieer de token** (begint met `EAA...`)

**⚠️ Dit is een Page Token - deze is anders dan je User Token!**

### Stap 4: Vind Page ID

1. In Graph API Explorer, met je pagina geselecteerd
2. In het query veld, typ: `/me`
3. Klik **"Submit"**
4. Je ziet:
   ```json
   {
     "id": "123456789012345",
     "name": "SeniorEase"
   }
   ```
5. **Kopieer de `id`** - dit is je Page ID!

### Stap 5: Update .env File

Open `.env` in `Agent/seniorease-content-agent/` en update:

```
FACEBOOK_PAGE_ACCESS_TOKEN=EAAxxxxx-jouw-page-token-hier
FACEBOOK_PAGE_ID=123456789012345
```

**Vervang:**
- `EAAxxxxx-jouw-page-token-hier` → Je **Page Token** (van Stap 3)
- `123456789012345` → Je **Page ID** (van Stap 4)

### Stap 6: Test Opnieuw

```bash
cd Agent\seniorease-content-agent
npm run test-facebook
```

**Als het werkt:** Je ziet een test post op je SeniorEase Facebook pagina! ✅

---

## 🔍 Check: Welk Token Gebruik Je?

### User Token:
- Naam: "Maureen van Deutekom" (je persoonlijke naam)
- Kan alleen naar persoonlijk account posten
- ❌ Werkt niet voor pagina posting

### Page Token:
- Naam: "SeniorEase" (je pagina naam)
- Kan naar pagina posten
- ✅ Werkt voor automatische posting

---

## 💡 Tips

- **Page Token** is specifiek voor je pagina
- **User Token** is voor je persoonlijke account
- Gebruik altijd **Page Token** voor automatische posting
- Page Token kan worden verlengd naar 60 dagen (zie FACEBOOK-AUTO-POSTING-SETUP.md)

---

**Update je .env met Page Token en Page ID, dan testen we opnieuw!** 🔧




