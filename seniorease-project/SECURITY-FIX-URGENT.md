# 🚨 URGENT: Security Fix - Exposed Secrets

## ⚠️ Probleem

Er zijn API tokens en secrets hardcoded in de code die nu publiek op GitHub staan. Dit is een **kritiek beveiligingsprobleem**.

## 🔍 Gedetecteerde Secrets

1. **Vercel API Token** - `[TOKEN_REMOVED_FOR_SECURITY]`
   - Locatie: `scripts/vercel-helper.js`, `scripts/test-vercel-api.js`
   - Status: ✅ **GEFIXT** - Verwijderd uit code
   - ⚠️ **De oude token moet worden geroteerd** - zie instructies hieronder

2. **Facebook Page Access Token** - Mogelijk in Agent folder
3. **Claude API Key** - Mogelijk in Agent folder  
4. **Zapier Webhook URL** - Mogelijk in Agent folder
5. **JSON Web Token** - In `client/src/supabaseClient.js`

## ✅ Wat is al gefixt

- ✅ Hardcoded Vercel token verwijderd uit `scripts/vercel-helper.js`
- ✅ Hardcoded Vercel token verwijderd uit `scripts/test-vercel-api.js`
- ✅ Code aangepast om environment variables te gebruiken

## 🔒 Wat je NU moet doen

### 1. ROTEER ALLE TOKENS (URGENT!)

Omdat de tokens al publiek zijn, moet je ze **allemaal roteren**:

#### A. Vercel API Token
1. Ga naar: https://vercel.com/account/tokens
2. **Verwijder de oude token** (die al publiek was)
3. Maak een nieuwe token aan
4. Update lokaal: `$env:VERCEL_TOKEN="nieuwe-token"`
5. Of voeg toe aan `.env.local` (staat in `.gitignore`)

#### B. Facebook Page Access Token
1. Ga naar: https://developers.facebook.com/tools/explorer/
2. Genereer een nieuwe Page Access Token
3. Update in `.env` bestand (lokaal, niet in git!)

#### C. Claude API Key
1. Ga naar: https://console.anthropic.com/
2. Verwijder de oude key
3. Maak een nieuwe key aan
4. Update in `.env` bestand

#### D. Zapier Webhook
1. Ga naar je Zapier account
2. Maak een nieuwe webhook URL
3. Update in `.env` bestand

### 2. Verwijder secrets uit git history (Optioneel maar aanbevolen)

Als je de secrets volledig uit de git history wilt verwijderen:

```powershell
# Let op: Dit is gevaarlijk en kan problemen veroorzaken
# Alleen doen als je weet wat je doet!

# Gebruik BFG Repo-Cleaner of git filter-branch
# Zie: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
```

### 3. Zorg dat .env bestanden in .gitignore staan

Controleer of `.gitignore` deze bevat:
```
.env
.env.local
.env*.local
```

### 4. Commit de fixes

```powershell
git add scripts/vercel-helper.js scripts/test-vercel-api.js
git commit -m "SECURITY: Remove hardcoded API tokens"
git push origin main
```

## 📋 Checklist

- [ ] Vercel token geroteerd
- [ ] Facebook token geroteerd (als gebruikt)
- [ ] Claude API key geroteerd (als gebruikt)
- [ ] Zapier webhook geroteerd (als gebruikt)
- [ ] Alle secrets verwijderd uit code
- [ ] .env bestanden staan in .gitignore
- [ ] Fixes gecommit en gepusht

## 🛡️ Voorkomen in de toekomst

1. **NOOIT** secrets hardcoden in code
2. **ALTIJD** environment variables gebruiken
3. Gebruik `.env` bestanden (staan in .gitignore)
4. Voor productie: gebruik Vercel Environment Variables
5. Overweeg tools zoals:
   - GitHub Secrets (voor CI/CD)
   - Vercel Environment Variables
   - 1Password Secrets Automation

## 📚 Meer informatie

- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Vercel: Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
