# 🔧 Facebook Page ID Fix

## ❌ Probleem
Error: `The global id 61583148466074 is not allowed for this call`

Dit betekent dat je een **verkeerde Page ID** gebruikt.

---

## ✅ Oplossing: Vind de Juiste Page ID

### Methode 1: Via Facebook Pagina (Eenvoudigst)

1. Ga naar je **SeniorEase Facebook pagina**
2. Klik op **"About"** (of "Over")
3. Scroll helemaal naar beneden
4. Je ziet **"Page ID"** - dit is een **lange nummer** (bijv. `123456789012345`)

**⚠️ Belangrijk:** Gebruik de **Page ID**, niet de "Global ID"!

### Methode 2: Via Graph API Explorer

1. Ga naar: **[https://developers.facebook.com/tools/explorer/](https://developers.facebook.com/tools/explorer/)**
2. Selecteer je **SeniorEase pagina** in de dropdown
3. In het query veld, typ: `/me`
4. Klik **"Submit"**
5. Je ziet je Page ID in de response (bijv. `"id": "123456789012345"`)

### Methode 3: Via Facebook Graph API

1. Ga naar: `https://graph.facebook.com/v18.0/me?access_token=JOUW_TOKEN`
2. Vervang `JOUW_TOKEN` met je Facebook Page Access Token
3. Je ziet je Page ID in de response

---

## 🔍 Check: Welke ID Gebruik Je Nu?

Je gebruikt nu: `61583148466074`

**Dit is waarschijnlijk:**
- ❌ Een "Global ID" (niet correct)
- ❌ Een App ID (niet correct)
- ❌ Een User ID (niet correct)

**Je hebt nodig:**
- ✅ Een **Page ID** (lange nummer, meestal 15-17 cijfers)

---

## ✅ Stap: Update .env File

1. Vind de **juiste Page ID** (zie hierboven)
2. Open `.env` file in `Agent/seniorease-content-agent/`
3. Update:
   ```
   FACEBOOK_PAGE_ID=123456789012345
   ```
   (Vervang met je echte Page ID)

4. Sla op

---

## 🧪 Test Opnieuw

Na het updaten van de Page ID:

```bash
cd Agent/seniorease-content-agent
npm run test-facebook
```

**Als het werkt:** Je ziet een test post op je Facebook pagina! ✅

---

## 💡 Tips

- **Page ID** is meestal 15-17 cijfers lang
- **Global ID** begint vaak met `615...` (dit is NIET de Page ID!)
- **Page ID** vind je altijd in je pagina → About → onderaan

---

**Vind je Page ID en update je .env file, dan testen we opnieuw!** 🔧




