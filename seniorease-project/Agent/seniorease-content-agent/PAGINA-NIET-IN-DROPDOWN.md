# 🔧 Pagina Staat Niet in Dropdown - Oplossing

## ❌ Probleem
Je Facebook pagina staat niet in de "User or Page" dropdown in Graph API Explorer.

## ✅ Oplossing: Gebruik het Script

Ik heb een script gemaakt dat automatisch je Page Token ophaalt, zelfs als de pagina niet in de dropdown staat!

### Stap 1: Haal een User Token op

1. Ga naar: https://developers.facebook.com/tools/explorer/
2. Selecteer je Meta App ("SeniorEase Agent")
3. Zorg dat "User Token" is geselecteerd
4. Voeg deze permissions toe:
   - ✅ `pages_show_list` (om pagina's te zien)
   - ✅ `pages_manage_posts` (om te kunnen posten)
5. Klik "Generate Access Token"
6. **Kopieer de User Token** (begint met `EAA...`)

### Stap 2: Run het Script

```bash
cd Agent/seniorease-content-agent
npm run get-page-token
```

Het script vraagt om:
1. Je User Token (plak de token die je net hebt gekopieerd)
2. Welke pagina je wilt gebruiken (als je meerdere hebt)

### Stap 3: Script doet automatisch:

✅ Haalt alle pagina's op waar je admin van bent  
✅ Toont een lijst van je pagina's  
✅ Haalt de Page Token op voor elke pagina  
✅ Geeft je de Page Token en Page ID  
✅ Kan automatisch toevoegen aan Vercel (optioneel)

### Stap 4: Update Vercel

Het script kan dit automatisch doen, of je doet het handmatig:

```powershell
# Verwijder oude token
vercel env rm FACEBOOK_PAGE_ACCESS_TOKEN production --yes

# Voeg nieuwe Page Token toe
echo "JE_PAGE_TOKEN_HIER" | vercel env add FACEBOOK_PAGE_ACCESS_TOKEN production

# Voeg Page ID toe (als die nog niet bestaat)
echo "JE_PAGE_ID_HIER" | vercel env add FACEBOOK_PAGE_ID production

# Deploy
vercel --prod
```

## 🔍 Alternatief: Handmatig via API

Als het script niet werkt, kun je het ook handmatig doen:

### 1. Haal pagina's op met User Token:

```bash
curl "https://graph.facebook.com/v18.0/me/accounts?access_token=JE_USER_TOKEN_HIER"
```

Dit geeft je een lijst zoals:
```json
{
  "data": [
    {
      "id": "10238480083518377",
      "name": "SeniorEase",
      "access_token": "EAA... (dit is je Page Token!)"
    }
  ]
}
```

### 2. Gebruik de `access_token` uit de lijst

Dit is je **Page Access Token**! Gebruik deze in plaats van je User Token.

## ✅ Test

Na het toevoegen:

```bash
npm run check-token
```

Je zou moeten zien:
- ✅ Type: PAGE (niet USER!)
- ✅ Permissions: pages_manage_posts, pages_read_engagement

## 🆘 Nog steeds problemen?

**Check:**
- ✅ Ben je admin van de pagina?
- ✅ Heeft je User Token de `pages_show_list` permission?
- ✅ Is je User Token niet verlopen?

**Als niets werkt:**
- Maak een nieuwe Facebook pagina aan
- Geef jezelf admin rechten
- Gebruik het script opnieuw




