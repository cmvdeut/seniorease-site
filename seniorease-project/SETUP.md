# 🚀 SeniorEase Setup Gids

## ✅ Wat is er al klaar?

Je hebt nu een complete Next.js applicatie met:
- ✅ Homepage met moderne design
- ✅ "Grote Klok" web-app (real-time tijd & datum)
- ✅ Senior-friendly styling (grote teksten, knoppen)
- ✅ TypeScript + Tailwind CSS
- ✅ Netlify configuratie
- ✅ MCP configuratie voor Cursor

## 📋 Volgende Stappen

### STAP 1: Kopieer het project naar je lokale machine

1. Download alle bestanden van dit project
2. Plaats ze in een nieuwe folder op je computer, bijvoorbeeld:
   - Windows: `C:\Projects\seniorease`
   - Mac: `~/Projects/seniorease`

### STAP 2: Installeer dependencies

Open een terminal in de project folder en voer uit:

```bash
npm install
```

Dit installeert alle benodigde packages (kan 1-2 minuten duren).

### STAP 3: Test lokaal

Start de development server:

```bash
npm run dev
```

Open je browser op: http://localhost:3000

Je zou nu de SeniorEase homepage moeten zien! 🎉

### STAP 4: GitHub Repository Aanmaken

1. Ga naar https://github.com/new
2. Maak een nieuwe repository:
   - Naam: `seniorease`
   - Beschrijving: "Digitaal gemak voor senioren"
   - Public of Private (jouw keuze)
   - **NIET** initialiseren met README (die hebben we al!)

3. In je terminal (in de project folder):

```bash
git init
git add .
git commit -m "🎉 Initial commit: SeniorEase basis setup"
git branch -M main
git remote add origin https://github.com/JOUW_GEBRUIKERSNAAM/seniorease.git
git push -u origin main
```

Vervang `JOUW_GEBRUIKERSNAAM` met je GitHub username!

### STAP 5: Netlify Koppelen

1. Ga naar https://app.netlify.com
2. Klik "Add new site" > "Import an existing project"
3. Kies "GitHub" en autoriseer Netlify
4. Selecteer je `seniorease` repository
5. Build settings zijn automatisch correct (staat al in `netlify.toml`)
6. Klik "Deploy site"

⏱️ Eerste deploy duurt 2-3 minuten.

### STAP 6: Custom Domain Koppelen

1. In Netlify, ga naar: Site settings > Domain management
2. Klik "Add custom domain"
3. Voer in: `seniorease.nl`
4. Netlify geeft je DNS records

5. Ga naar je domain provider (waar je seniorease.nl hebt gekocht)
6. Voeg deze DNS records toe:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: [jouw-site].netlify.app
   ```

⏱️ DNS propagatie: 5 minuten - 24 uur (meestal binnen 1 uur)

### STAP 7: SSL Certificaat

Netlify activeert automatisch HTTPS voor je domein (gratis!).
Check na 10-15 minuten of https://seniorease.nl werkt.

## 🤖 MCP Setup in Cursor

### Voor Windows:

1. Open: `%APPDATA%\Cursor\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`

2. Voeg dit toe:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "github_pat_JOUW_TOKEN_HIER"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Projects\\seniorease"
      ]
    }
  }
}
```

### Voor Mac:

1. Open: `~/Library/Application Support/Cursor/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

2. Voeg dit toe:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "github_pat_JOUW_TOKEN_HIER"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/JOUW_GEBRUIKERSNAAM/Projects/seniorease"
      ]
    }
  }
}
```

### GitHub Token Aanmaken:

1. Ga naar: https://github.com/settings/tokens
2. Klik "Generate new token" > "Generate new token (classic)"
3. Geef een naam: "Cursor MCP Access"
4. Selecteer scopes:
   - ✅ repo (alle repo rechten)
   - ✅ workflow
5. Klik "Generate token"
6. **KOPIEER DE TOKEN DIRECT** (je ziet hem maar 1 keer!)
7. Plak in je MCP configuratie

### Cursor Herstarten:

Herstart Cursor volledig om MCP te activeren.

## 🎯 Wat kun je nu met MCP?

Met MCP actief kan ik (Claude) als je agent:

1. **Code direct pushen naar GitHub**
   ```
   "Claude, push deze wijzigingen naar GitHub met message 'Feature X toegevoegd'"
   ```

2. **Bestanden direct bewerken**
   ```
   "Claude, maak de klok blauw in plaats van groen"
   ```

3. **Features toevoegen**
   ```
   "Claude, voeg een medicijn-herinnering app toe"
   ```

4. **Deployment triggeren**
   ```
   "Claude, deploy de laatste versie naar productie"
   ```

## 🐛 Problemen oplossen

### "npm: command not found"
- Installeer Node.js: https://nodejs.org (LTS versie)

### "Port 3000 already in use"
```bash
# Kill het proces op port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PROCESS_ID] /F

# Mac/Linux:
lsof -ti:3000 | xargs kill
```

### Git push fails
```bash
# Als je eerst moet authenticeren:
git config --global user.name "Jouw Naam"
git config --global user.email "jouw@email.com"
```

### Netlify build fails
- Check of `package.json` correct is
- Check Node version (zou 20 moeten zijn)
- Check build logs in Netlify dashboard

## 📞 Hulp nodig?

Vraag gewoon aan Claude (mij!) in Cursor:
- "Claude, waarom werkt X niet?"
- "Claude, hoe voeg ik Y toe?"
- "Claude, debug deze error"

## 🎉 Success Checklist

- [ ] `npm run dev` werkt lokaal
- [ ] Code gepusht naar GitHub
- [ ] Site deployed op Netlify
- [ ] Custom domain werkt (seniorease.nl)
- [ ] HTTPS actief
- [ ] MCP configured in Cursor
- [ ] Claude kan direct code wijzigen

---

**Je bent nu klaar om te bouwen! 🚀**

Volgende features die we kunnen toevoegen:
1. Medicijn-herinnering app
2. Eenvoudige agenda
3. Contact lijst met grote foto's
4. Nieuws reader
5. PWA support (installeerbaar als app)
6. Dark mode toggle
7. Font size selector

Vraag gewoon wat je wilt en ik help je!
