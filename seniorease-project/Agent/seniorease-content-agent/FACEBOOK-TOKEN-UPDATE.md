# 🔑 Facebook Page Token Update - Stap voor Stap

## ⚠️ Belangrijk: Je hebt nu een User Token, maar je hebt een **Page Token** nodig!

## 📋 Stappen om een Page Access Token te krijgen:

### Stap 1: Selecteer je Facebook Pagina
1. In de "User or Page" dropdown, verander van **"User Token"** naar je **Facebook Pagina** (bijv. "SeniorEase")
2. Als je pagina niet in de lijst staat, zorg er dan voor dat je admin rechten hebt op de pagina

### Stap 2: Controleer Permissions
Zorg dat deze permissions zijn aangevinkt:
- ✅ `pages_manage_posts` (verplicht voor posten)
- ✅ `pages_read_engagement` (optioneel, voor analytics)
- ✅ `pages_show_list` (om pagina's te zien)
- ✅ `pages_manage_metadata` (voor metadata)

### Stap 3: Genereer de Token
1. Klik op **"Generate Access Token"**
2. Kopieer de nieuwe token (begint met `EAA...`)
3. **BELANGRIJK:** Deze token is een **korte-termijn token** (verloopt na ~60 dagen)

### Stap 4: Verleng de Token (voor permanent gebruik)
De token die je krijgt is kortlopend. Om deze permanent te maken:

1. Ga naar: https://developers.facebook.com/tools/debug/accesstoken/
2. Plak je nieuwe token
3. Klik op "Extend Access Token" of gebruik de exchange API

**Of gebruik deze API call:**
```bash
curl "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_TOKEN"
```

### Stap 5: Update in Vercel
Zodra je de nieuwe (lange-termijn) token hebt:

```powershell
# In de seniorease-content-agent folder:
cd Agent/seniorease-content-agent

# Verwijder oude token
vercel env rm FACEBOOK_PAGE_ACCESS_TOKEN production --yes

# Voeg nieuwe token toe
echo "JE_NIEUWE_PAGE_TOKEN_HIER" | vercel env add FACEBOOK_PAGE_ACCESS_TOKEN production

# Deploy opnieuw
vercel --prod
```

## ✅ Test de nieuwe token

```bash
# Test lokaal
node check-token.js

# Of test via de API
curl https://seniorease-content-agent.vercel.app/api/schedule-posts
```

## 🔍 Troubleshooting

**"Application has been deleted"**
- Je oude token is ongeldig
- Genereer een nieuwe Page Token (niet User Token!)

**"Insufficient permissions"**
- Zorg dat `pages_manage_posts` is aangevinkt
- Verifieer dat je admin bent van de pagina

**Token verloopt snel**
- Gebruik de token exchange om een lange-termijn token te krijgen
- Lange-termijn tokens verlopen niet (tenzij je ze handmatig verwijdert)

## 📝 Belangrijk verschil:

- ❌ **User Token:** Voor persoonlijke accounts, kan niet naar pagina's posten
- ✅ **Page Token:** Voor Facebook pagina's, kan naar pagina's posten

Je hebt een **Page Token** nodig!




