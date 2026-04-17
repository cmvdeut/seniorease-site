API key Claude
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

TEST KEY:
curl https://api.anthropic.com/v1/messages \
        --header "x-api-key: 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" \
        --header "anthropic-version: 2023-06-01" \
        --header "content-type: application/json" \
        --data \
    '{
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 1024,
        "messages": [
            {"role": "user", "content": "Hello, world"}
        ]
    }'
--------------------------------------------------------------------------

   "id": "10238480083518377",
   "name": "Maureen van Deutekom"


Facebook token:
ID https://www.facebook.com/people/SeniorEase/61583148466074/

-------------------------------
SeniorEase ( https://facebook.com/61583148466074)
ID : 852901977906758



SeniorEase Agent
User Token	
EAAatNZAjWjasBP216g8WNBN72fDGCJuwy4XPZB5K1qjktAnBROiYeux5jD9p9ZBO74pjSZCSdX4SKhTXvMkyhoEcKvNeSLZCAH4moeJcwYCSYTWy3iVF3mzezw5BAjZA6dRQZAICEjISBuxrTqEAyD7CTh3v67N2T0xZBXi5O3OEomi7WhfpePQmPOrxFckZD
--------------------------------------
App Token	
1879295569333675|NhSDB849XkJXr85qTRw2_cNmtzg
-----------------------------------------------------------------------------------



# 🚀 SeniorEase Content Agent - GitHub Push Instructies

## ✅ JE HEBT 2 OPTIES:

---

## **OPTIE A: Via Terminal (snelst)**

### Stap 1: Download en unzip het project
Download `seniorease-content-agent.zip` en pak uit.

### Stap 2: GitHub Repository maken
1. Ga naar https://github.com/new
2. Repository naam: `seniorease-content-agent`
3. **Private** aanvinken (bevat API configuratie!)
4. **NIET** initialiseren met README
5. Klik **Create repository**

### Stap 3: Kopieer je repository URL
Je ziet nu een scherm met instructies. Kopieer de URL die begint met:
```
https://github.com/jouw-username/seniorease-content-agent.git
```

### Stap 4: Push naar GitHub
Open terminal in de uitgepakte folder en voer uit:

```bash
cd seniorease-content-agent

# Link naar je GitHub repo (vervang met JOUW URL!)
git remote add origin https://github.com/jouw-username/seniorease-content-agent.git

# Push!
git push -u origin main
```

**Klaar!** 🎉 Je code staat nu op GitHub.

---

## **OPTIE B: Via GitHub Desktop (visueel)**

### Stap 1: Download GitHub Desktop
https://desktop.github.com/

### Stap 2: Maak GitHub repo (zie Optie A, Stap 2)

### Stap 3: In GitHub Desktop
1. File → Add Local Repository
2. Kies de `seniorease-content-agent` folder
3. Klik "Publish repository"
4. Kies je account
5. **Private** aanvinken
6. Klik "Publish repository"

**Klaar!** 🎉

---

## 📝 NA HET PUSHEN:

### Vercel Connecten (voor automatische deployment)

1. Ga naar https://vercel.com/
2. Klik "Add New" → "Project"
3. Import je GitHub repo `seniorease-content-agent`
4. Environment Variables toevoegen:
   ```
   ANTHROPIC_API_KEY = sk-ant-api03-xxxxx
   FACEBOOK_PAGE_ACCESS_TOKEN = EAAxxxxx
   FACEBOOK_PAGE_ID = 123456789
   ```
5. Klik "Deploy"

**Nu draait je agent live!** 🚀

Elke keer dat je naar GitHub pusht, deploy Vercel automatisch de nieuwe versie.

---

## 🔒 BELANGRIJK: Security

Je `.env` file wordt **NIET** naar GitHub gepusht (staat in .gitignore).

Bewaar je API keys:
- ✅ Lokaal in `.env`
- ✅ In Vercel Environment Variables
- ❌ NOOIT in GitHub code!

---

## 🎯 VOLGENDE STAP: TESTEN

Na GitHub push en Vercel deploy:

```bash
# Test content generatie
curl https://jouw-project.vercel.app/api/generate-content

# Trigger manual post
curl https://jouw-project.vercel.app/api/schedule-posts
```

---

## ❓ Problemen?

**"Permission denied"**
- Check of je ingelogd bent: `git config --global user.name`
- GitHub wachtwoord of Personal Access Token nodig

**"Repository not found"**
- Check of de URL correct is
- Check of je toegang hebt tot de repo

**Vercel deployment fails**
- Check of alle Environment Variables zijn ingevuld
- Check Vercel logs voor specifieke errors

---

Succes! Laat me weten als je vast loopt. 😊
