# 🔍 Facebook Token Probleem - Wat Er Gebeurt

**Datum:** 22 November 2025

---

## ❌ Het Probleem

Je hebt een **User Access Token** in plaats van een **Page Access Token**.

### Wat ik vond:

```
Token Type:     User Token (voor persoonlijk profiel)
Account:        Maureen van Deutekom
Profile ID:     10238586466457884
Doel:           SeniorEase pagina (ID: 117953082079657)
```

**Resultaat:** ❌ Kan niet naar SeniorEase pagina posten

---

## 📚 Verschil: User Token vs Page Token

### User Token (wat je nu hebt):
```
✓ Account:  Maureen van Deutekom (persoonlijk)
✓ ID:       10238586466457884
✗ Kan:      Niet naar pagina's posten via API
✗ Gebruik:  Persoonlijke data, niet voor pagina management
```

### Page Token (wat je nodig hebt):
```
✓ Pagina:   SeniorEase
✓ ID:       117953082079657
✓ Kan:      Posts maken naar de pagina
✓ Gebruik:  Automatische posting, pagina management
```

---

## ✅ OPLOSSING: Verkrijg Page Access Token

### Stap 1: Open Graph API Explorer

**URL:** https://developers.facebook.com/tools/explorer/

(Zou al open moeten zijn!)

### Stap 2: Belangrijk - Selecteer de JUISTE token type

**❌ NIET klikken:** "Generate Access Token" (dit geeft User Token)

**✅ WEL klikken:** Eerst het dropdown menu gebruiken!

### Stap 3: Selecteer Je Pagina (Cruciaal!)

1. **Bovenaan LINKS** zie je een dropdown
2. Staat er nu "Maureen van Deutekom" of "User Token"
3. **Klik op dit dropdown**
4. **Selecteer "SeniorEase"** uit de lijst

![Zo zou het eruit moeten zien]
```
┌──────────────────────────┐
│ Select Account/Page      │
├──────────────────────────┤
│ ○ Maureen van Deutekom   │ ← ❌ Dit NIET!
│ ● SeniorEase            │ ← ✅ Dit WEL!
└──────────────────────────┘
```

### Stap 4: Nu Token Genereren

**NA het selecteren van SeniorEase:**

1. Klik **"Generate Access Token"**
2. Of klik **"Get Token"** → **"Get Page Access Token"**
3. **Bevestig permissions:**
   - ✅ pages_manage_posts
   - ✅ pages_read_engagement
   - ✅ pages_show_list
4. Klik **"Generate"** of **"Continue"**

### Stap 5: Verifieer Dat Het Klopt

**Check deze dingen:**

1. In Graph API Explorer, query veld typ: `/me`
2. Klik **"Submit"**
3. **Verwacht resultaat:**
   ```json
   {
     "name": "SeniorEase",        ← ✅ NIET "Maureen van Deutekom"!
     "id": "117953082079657"
   }
   ```

**Als je "Maureen van Deutekom" ziet → Ga terug naar Stap 3!**

### Stap 6: Copy De Token

Als `/me` "SeniorEase" toont:

1. **Copy de Access Token** (bovenaan in het tekstveld)
2. De token begint met `EAAG...` of `EAAb...`
3. **Deze is anders dan je huidige token!**

---

## 🔧 Zodra Je De Juiste Token Hebt

### Update Je ENV-TEMPLATE.txt

Vervang de oude token met de nieuwe **Page Token**:

```
FACEBOOK_PAGE_ACCESS_TOKEN=NIEUWE-PAGE-TOKEN-HIER
FACEBOOK_PAGE_ID=117953082079657
```

### Dan Test Ik Het Opnieuw

Laat me weten als je de nieuwe token hebt, dan:
1. Update ik de .env file
2. Testen we opnieuw
3. En dan zou het moeten werken! ✅

---

## 💡 Waarom Dit Gebeurt

**Facebook heeft 2 soorten tokens:**

1. **User Token** (voor persoonlijk gebruik)
   - Kan je eigen profiel data lezen
   - Kan NIET automatisch naar pagina's posten
   - Dit is wat je per ongeluk hebt gekregen

2. **Page Token** (voor pagina management)
   - Specifiek voor één pagina
   - Kan automatisch posts maken
   - Dit is wat je nodig hebt voor SeniorEase

**Het probleem:** De standaard "Generate Access Token" knop in Graph API Explorer geeft een User Token. Je moet expliciet een Page selecteren én dan pas token genereren.

---

## 📋 Quick Checklist

Voordat je een token copy:

- [ ] Is "SeniorEase" geselecteerd in het dropdown (links boven)?
- [ ] Staat er "SeniorEase" in de titel van Graph API Explorer?
- [ ] Geeft `/me` query "SeniorEase" terug (niet "Maureen van Deutekom")?
- [ ] Zijn permissions pages_manage_posts en pages_read_engagement gegeven?

**Als alle 4 ✅ → Dan is het de juiste Page Token!**

---

## 🎯 Alternatief: Gebruik Het Helper Script

Je hebt ook een script dat dit automatisch kan doen:

```bash
cd Agent\seniorease-content-agent
node get-page-token.js
```

Dit script:
1. Vraagt om een tijdelijke User Token
2. Haalt automatisch alle pagina tokens op
3. Toont SeniorEase page token

**Maar:** Je moet wel eerst een tijdelijke User Token verkrijgen via Graph API Explorer.

---

## 📞 Hulp

**Als het nog niet lukt:**

1. Check of je Admin of Editor bent van SeniorEase pagina:
   - Ga naar: https://www.facebook.com/SeniorEase/settings
   - Klik "Page Roles"
   - Je moet Admin of Editor zijn

2. Check Facebook Business Integrations:
   - Ga naar: https://www.facebook.com/settings?tab=business_tools
   - Zie je "Graph API Explorer" in de lijst?
   - Heeft het toegang tot SeniorEase?

---

## ✅ Success Ziet Er Zo Uit

**Na de juiste token:**

```bash
npm run test-facebook
```

**Verwacht:**
```
✅ Environment variables found
   Page ID: 117953082079657
   Token: EAAGxxxxx...

📡 Testing Facebook connection...
✅ Connection successful!
   Page Name: SeniorEase  ← ✅ NIET "Maureen van Deutekom"!

📝 Posting test message...
✅ SUCCESS! Post gepubliceerd!
Post ID: 117953082079657_xxxxxxxxxxxxx

🎉 Check je Facebook pagina - je zou de test post moeten zien!
```

Dan check je: https://www.facebook.com/SeniorEase

En je zou een test post moeten zien! 🎉

---

**Status:** ⏳ Wachtend op Page Token voor SeniorEase  
**Volgende Stap:** Token verkrijgen via Graph API Explorer  
**Document:** Deze uitleg

🔑 **Zodra je de juiste Page Token hebt, werkt alles!**



