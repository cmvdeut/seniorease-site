# 🚀 Quick Start - Facebook Screenshots Posten

## ✅ Setup Compleet!

Je bent helemaal klaar om screenshots te posten naar je Facebook pagina **senioreasenl**!

---

## 📅 Posting Schema

### ✅ Post 1 - GEPOST! (${new Date().toLocaleDateString('nl-NL')})
- Screenshot 1: Bibliotheek Hoofdscherm
- Status: Live op Facebook! 🎉

### ⏳ Post 2 - Donderdag 27 november
```powershell
cd Agent\seniorease-content-agent
node post-screenshots.js 2
```

### ⏳ Post 3 - Maandag 1 december  
```powershell
node post-screenshots.js 3
```

### ⏳ Post 4 - Donderdag 4 december
```powershell
node post-screenshots.js 4
```

### ⏳ Post 5 - Maandag 8 december
```powershell
node post-screenshots.js 5
```

---

## 🎯 Makkelijke Commands

### Check wanneer je moet posten:
```powershell
cd Agent\seniorease-content-agent
node reminder.js

# Of korter:
npm run reminder
```

### Test voordat je post (dry-run):
```powershell
node post-screenshots.js --dry-run 2
```

### Post een screenshot:
```powershell
node post-screenshots.js 2
```

### Zie alle opties:
```powershell
node post-screenshots.js
```

---

## ⏰ Reminder Instellen (Windows)

### Optie 1: Outlook/Calendar Reminder
Zet reminders in je agenda voor:
- 📅 **Do 27 nov** om 09:30 - "Facebook Post 2"
- 📅 **Ma 1 dec** om 09:30 - "Facebook Post 3"
- 📅 **Do 4 dec** om 09:30 - "Facebook Post 4"  
- 📅 **Ma 8 dec** om 09:30 - "Facebook Post 5"

### Optie 2: Windows Taakplanner
1. Open Task Scheduler
2. Create Task
3. Trigger: Bijv. Donderdag 09:30
4. Action: Run PowerShell script:
```powershell
cd D:\MAUREEN\DEV\Seniorease\seniorease-project\Agent\seniorease-content-agent
node reminder.js
```

---

## 📊 Na Elke Post

1. Check je Facebook pagina: https://www.facebook.com/senioreasenl
2. Reageer op comments binnen 1 uur
3. Check engagement na 24 uur (Insights)
4. Markeer als gepost in je notities

---

## 💡 Best Practices

### Beste tijden om te posten:
- 🌅 **Ochtend:** 09:00 - 11:00 uur (beste!)
- ☕ **Middag:** 14:00 - 16:00 uur
- 🌆 **Avond:** 19:00 - 21:00 uur

### Beste dagen:
- ✅ Maandag, Dinsdag, Woensdag, Donderdag
- ⚠️ Vrijdag (oké maar minder)
- ❌ Weekend (minste bereik voor senioren)

### Engagement tips:
- Reageer snel op comments
- Stel vragen in de comments
- Pin belangrijke comments
- Share naar je profiel voor extra bereik

---

## 🔧 Troubleshooting

### "Token expired" error?
```powershell
# Verkrijg nieuwe token:
# 1. Ga naar: https://developers.facebook.com/tools/explorer/
# 2. Generate nieuwe token
# 3. Update .env file
notepad .env
```

### Screenshot niet gevonden?
Check of alle screenshots in de juiste folder staan:
```
D:\MAUREEN\DEV\Seniorease\seniorease-project\screenshots\
```

### Connectie testen:
```powershell
node test-facebook.js
```

---

## 📁 Belangrijke Bestanden

- **reminder.js** - Wanneer moet ik posten?
- **post-screenshots.js** - Post een screenshot
- **test-facebook.js** - Test de connectie
- **.env** - Je credentials (privé!)
- **POSTING-SCHEMA.md** - Volledige planning
- **FACEBOOK-SCREENSHOTS-STRATEGIE.md** - Complete strategie

---

## 🎉 Succes!

Je eerste post staat al live! De rest volgt volgens planning. 

**Check je posts:**
https://www.facebook.com/senioreasenl

**Vragen?** Open één van de guides in de Agent folder!

---

_Setup compleet op: ${new Date().toLocaleDateString('nl-NL')}_


