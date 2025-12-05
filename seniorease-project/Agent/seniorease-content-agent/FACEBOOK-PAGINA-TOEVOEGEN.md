# 📘 Facebook Pagina Toevoegen aan Meta App

## ❌ Probleem: Pagina staat niet in dropdown

Als je Facebook pagina niet in de "User or Page" dropdown staat, betekent dit dat:
- De pagina niet is gekoppeld aan je Meta App, OF
- Je hebt geen admin rechten op de pagina

## ✅ Oplossing: Pagina Koppelen aan Meta App

### Methode 1: Via Facebook Business Manager (Aanbevolen)

1. **Ga naar Facebook Business Manager:**
   - https://business.facebook.com/
   - Log in met je Facebook account

2. **Voeg je pagina toe:**
   - Klik op "Business Settings" (links in menu)
   - Ga naar "Accounts" → "Pages"
   - Klik "Add" → "Add a Page"
   - Selecteer je SeniorEase pagina
   - Geef jezelf admin rechten

3. **Koppel pagina aan Meta App:**
   - Ga naar "Business Settings" → "Accounts" → "Apps"
   - Selecteer je "SeniorEase Agent" app
   - Klik "Add Assets" → "Pages"
   - Selecteer je SeniorEase pagina
   - Klik "Add"

4. **Terug naar Graph API Explorer:**
   - Ga naar: https://developers.facebook.com/tools/explorer/
   - Refresh de pagina
   - Je pagina zou nu in de dropdown moeten staan!

### Methode 2: Via Meta App Settings

1. **Ga naar Meta App Dashboard:**
   - https://developers.facebook.com/apps/
   - Selecteer je "SeniorEase Agent" app

2. **Voeg pagina toe:**
   - Ga naar "Settings" → "Basic"
   - Scroll naar "Add a Page"
   - Klik "Add Page"
   - Selecteer je SeniorEase pagina
   - Klik "Save Changes"

3. **Geef permissions:**
   - Ga naar "Roles" → "Roles"
   - Zorg dat je "Admin" of "Developer" rol hebt
   - Voeg jezelf toe als "Admin" als je dat nog niet bent

### Methode 3: Direct via Graph API (Geavanceerd)

Als de bovenstaande methodes niet werken, kun je een Page Token direct via de API krijgen:

1. **Eerst: Get User Access Token met pagina permissions**
   - In Graph API Explorer
   - Selecteer "User Token"
   - Voeg permissions toe: `pages_show_list`, `pages_manage_posts`
   - Genereer token

2. **Get Page List:**
   ```
   GET /me/accounts?access_token=YOUR_USER_TOKEN
   ```
   Dit geeft je een lijst van alle pagina's waar je admin bent

3. **Get Page Token:**
   - Zoek je SeniorEase pagina in de lijst
   - Gebruik de `access_token` uit die pagina entry
   - Dit is je Page Access Token!

## 🔍 Check: Ben je Admin van de Pagina?

1. Ga naar je Facebook pagina: https://www.facebook.com/jouw-pagina-naam
2. Klik op "Settings" (links in menu)
3. Ga naar "Page Roles"
4. Check of je naam staat met rol "Admin"

**Als je geen admin bent:**
- Vraag de huidige admin om je admin rechten te geven
- Of maak een nieuwe pagina aan waar je wel admin van bent

## 📝 Alternatief: Nieuwe Pagina Maken

Als je geen toegang hebt tot de bestaande pagina:

1. Maak een nieuwe Facebook pagina aan
2. Geef jezelf admin rechten
3. Koppel deze aan je Meta App
4. Gebruik deze voor automatische posting

## ✅ Na het koppelen:

1. Ga terug naar Graph API Explorer
2. Refresh de pagina
3. Selecteer je pagina in de "User or Page" dropdown
4. Genereer Page Token
5. Update in Vercel

## 🆘 Nog steeds niet zichtbaar?

**Check deze dingen:**
- ✅ Ben je ingelogd met het juiste Facebook account?
- ✅ Heb je admin rechten op de pagina?
- ✅ Is de pagina niet gearchiveerd of verwijderd?
- ✅ Is de Meta App niet in "Development Mode" (dan werkt het alleen voor admins)?

**Als niets werkt:**
- Maak een nieuwe Meta App aan
- Koppel je pagina direct aan de nieuwe app
- Gebruik deze app voor automatische posting




