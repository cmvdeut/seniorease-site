# 🔑 Facebook Token Helper - Wat Heb Je Nu?

## ❓ Wat Je Hebt Gegeven

```
1354846369665487|f0TiCMTGpgrsE9A0V_9i6aRTYFc
```

**Dit is:**
- `1354846369665487` = **App ID** (niet een token!)
- `f0TiCMTGpgrsE9A0V_9i6aRTYFc` = **App Secret** (niet een token!)

**Dit is NIET een Access Token!** ❌

---

## ✅ Wat Je Nodig Hebt

Je hebt een **Page Access Token** nodig die er zo uitziet:
```
EAAatNZAjWjasBPwakPv... (lange string, begint met EAA)
```

---

## 🔧 Stap voor Stap: Haal Page Access Token Op

### Stap 1: Ga naar Graph API Explorer

1. Ga naar: **[https://developers.facebook.com/tools/explorer/](https://developers.facebook.com/tools/explorer/)**
2. Log in met je Facebook account

### Stap 2: Selecteer Je App

1. Klik op **"Meta App"** dropdown (bovenaan links)
2. Selecteer je app (waarschijnlijk met App ID: `1354846369665487`)
3. Of maak een nieuwe app aan als die er nog niet is

### Stap 3: Selecteer Je Pagina

1. Klik op **"Get Token"** dropdown (naast Meta App)
2. Kies **"Get Page Access Token"**
3. Selecteer je **SeniorEase pagina** (niet je persoonlijke account!)
4. Kies permissions:
   - ✅ `pages_manage_posts`
   - ✅ `pages_read_engagement`
5. Klik **"Generate Access Token"**

### Stap 4: Kopieer de Token

Je ziet nu een token die er zo uitziet:
```
EAAatNZAjWjasBPwakPv... (lange string)
```

**Dit is je Page Access Token!** ✅

**Kopieer deze volledige token** (kan 200+ karakters lang zijn)

---

## 📝 Stap 5: Update .env File

Open `.env` in `Agent/seniorease-content-agent/` en update:

```
FACEBOOK_PAGE_ACCESS_TOKEN=EAAatNZAjWjasBPwakPv...jouw-volledige-token-hier
```

**Vervang met de volledige token die je hebt gekopieerd!**

---

## 🧪 Stap 6: Test Token

Na het updaten:

```bash
cd Agent\seniorease-content-agent
npm run check-token
```

**Je zou moeten zien:**
- ✅ Type: PAGE (niet USER!)
- ✅ Permissions: pages_manage_posts, pages_read_engagement

**Als dat klopt, test dan:**
```bash
npm run test-facebook
```

---

## 🔍 Verschil Tussen Tokens

### App ID + App Secret:
```
1354846369665487|f0TiCMTGpgrsE9A0V_9i6aRTYFc
```
- ❌ Dit is NIET een Access Token
- ✅ Dit is voor app configuratie
- ❌ Kan niet gebruikt worden om te posten

### Page Access Token:
```
EAAatNZAjWjasBPwakPv... (lange string)
```
- ✅ Dit IS een Access Token
- ✅ Kan gebruikt worden om te posten
- ✅ Begint altijd met `EAA`

---

## 💡 Tips

- **Access Token** is lang (200+ karakters)
- **Access Token** begint altijd met `EAA`
- **Access Token** is specifiek voor je pagina
- Kopieer de **volledige** token (niet alleen het begin)

---

**Haal nu een Page Access Token op via Graph API Explorer en update je .env file!** 🔧




