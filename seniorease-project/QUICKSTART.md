# 🚀 SeniorEase - Quick Start

## ⚡ In 5 minuten online!

### 1️⃣ Installeer packages
```bash
cd seniorease-project
npm install
```

### 2️⃣ Test lokaal
```bash
npm run dev
```
→ Open http://localhost:3000

### 3️⃣ Push naar GitHub
```bash
git init
git add .
git commit -m "🎉 Initial commit"
git branch -M main
git remote add origin https://github.com/JOUW_USERNAME/seniorease.git
git push -u origin main
```

### 4️⃣ Deploy op Netlify
1. https://app.netlify.com → "Add new site"
2. Kies je GitHub repo
3. Klik "Deploy"
4. Klaar! ✅

### 5️⃣ Koppel domein
Netlify → Site settings → Domain management → Add `seniorease.nl`

---

## 📁 Wat zit erin?

```
seniorease-project/
├── app/
│   ├── page.tsx           # 🏠 Homepage
│   ├── klok/page.tsx      # 🕐 Grote Klok app
│   ├── layout.tsx         # Layout wrapper
│   └── globals.css        # Styling
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind met senior-fonts
├── netlify.toml          # Auto-deploy config
├── README.md             # Project documentatie
└── SETUP.md              # Uitgebreide setup gids
```

## 🎨 Features

✅ **Homepage** - Modern, toegankelijk design  
✅ **Grote Klok** - Real-time tijd & datum  
✅ **Senior-Friendly** - Grote teksten (24px+)  
✅ **Responsive** - Werkt op alle devices  
✅ **TypeScript** - Type-safe code  
✅ **Tailwind CSS** - Snelle styling  
✅ **Netlify Ready** - 1-click deploy  

## 🤖 MCP in Cursor?

Lees **SETUP.md** sectie "MCP Setup in Cursor" voor:
- GitHub token aanmaken
- Cursor configureren
- Claude als agent inzetten

Dan kan ik direct:
- Code schrijven én pushen
- Features toevoegen
- Bugs fixen
- Deployen

## 🆘 Problemen?

**"npm not found"**  
→ Installeer Node.js: https://nodejs.org

**"Port 3000 in use"**  
→ `npx kill-port 3000`

**Git issues**  
→ Zie SETUP.md "Problemen oplossen"

## 🎯 Volgende features?

Vraag Claude:
- "Voeg medicijn-herinnering toe"
- "Maak een agenda app"
- "Dark mode toevoegen"
- "Groter lettertype optie"
- "Contact lijst met foto's"

---

**🎉 Succes met je SeniorEase project!**

Voor gedetailleerde instructies → zie **SETUP.md**
