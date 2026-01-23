# 🌐 Advies: Nieuw Website Project voor seniorease.eu

## ✅ **JA, start ook een apart website project - Dit is veiliger!**

## 🎯 Waarom een apart project?

### 1. **Volledige Scheiding**
- ✅ Geen risico op verkeerde deployment
- ✅ Geen risico op code wijzigingen die beide websites beïnvloeden
- ✅ Duidelijke scheiding: seniorease.nl vs seniorease.eu
- ✅ Makkelijker om onafhankelijk te updaten

### 2. **APK Management**
- ✅ Elke website heeft zijn eigen APK namen
- ✅ Geen verwarring over welke APK voor welke website is
- ✅ Makkelijker om verschillende versies te beheren

### 3. **Deployment**
- ✅ Elke website heeft zijn eigen Vercel project
- ✅ Onafhankelijke deployments
- ✅ Geen risico op verkeerde deployment naar verkeerde website

## 📁 Aanbevolen Structuur

```
D:\MAUREEN\DEV\Seniorease\
├── seniorease-project\          ← Huidige project (seniorease.nl)
│   ├── public\
│   │   ├── Seniorease-Bibliotheek.apk
│   │   └── Seniorease-Bibliotheek-Demo.apk
│   └── app\api\download-app\
│
└── seniorease-eu-project\       ← NIEUW project (seniorease.eu)
    ├── public\
    │   ├── SeniorEase-Library.apk
    │   └── SeniorEase-Library-Demo.apk
    └── app\api\download-library\
```

## 🔨 Stappenplan: Nieuw Website Project

### Stap 1: Kopieer het huidige project
```powershell
# Kopieer het hele project
Copy-Item "D:\MAUREEN\DEV\Seniorease\seniorease-project" -Destination "D:\MAUREEN\DEV\Seniorease\seniorease-eu-project" -Recurse
```

### Stap 2: Pas APK namen aan

**Bestand:** `app/api/download-library/route.ts` (nieuw)
```typescript
const apkPath = join(process.cwd(), 'public', 'SeniorEase-Library.apk');
```

**Bestand:** `app/api/download-library-demo/route.ts` (nieuw)
```typescript
const apkPath = join(process.cwd(), 'public', 'SeniorEase-Library-Demo.apk');
```

### Stap 3: Pas componenten aan

**Bestand:** `app/components/DemoDownload.tsx`
```typescript
// Oud:
const [demoUrl, setDemoUrl] = useState<string>('https://seniorease.nl/Seniorease-Bibliotheek-Demo.apk');

// Nieuw:
const [demoUrl, setDemoUrl] = useState<string>('https://seniorease.eu/SeniorEase-Library-Demo.apk');
```

**Bestand:** `app/components/MobileDownload.tsx`
```typescript
// Pas alle links aan naar nieuwe APK namen
```

### Stap 4: Pas package.json aan (optioneel)

**Bestand:** `package.json`
```json
{
  "name": "seniorease-eu",
  "description": "SeniorEase Library - seniorease.eu"
}
```

### Stap 5: Verwijder oude APK's

```powershell
# Verwijder oude APK's uit public folder
Remove-Item "D:\MAUREEN\DEV\Seniorease\seniorease-eu-project\public\Seniorease-Bibliotheek.apk" -ErrorAction SilentlyContinue
Remove-Item "D:\MAUREEN\DEV\Seniorease\seniorease-eu-project\public\Seniorease-Bibliotheek-Demo.apk" -ErrorAction SilentlyContinue
```

### Stap 6: Voeg nieuwe APK's toe

```powershell
# Kopieer nieuwe APK's (na build van Android project)
Copy-Item "D:\MAUREEN\DEV\SeniorEase-Library\SeniorEase-Library.apk" -Destination "D:\MAUREEN\DEV\Seniorease\seniorease-eu-project\public\SeniorEase-Library.apk"
Copy-Item "D:\MAUREEN\DEV\SeniorEase-Library\SeniorEase-Library-Demo.apk" -Destination "D:\MAUREEN\DEV\Seniorease\seniorease-eu-project\public\SeniorEase-Library-Demo.apk"
```

### Stap 7: Pas Vercel configuratie aan

**Bestand:** `vercel.json` (als die bestaat)
```json
{
  "name": "seniorease-eu",
  "domains": ["seniorease.eu", "www.seniorease.eu"]
}
```

## 🔄 Alternatief: Zelfde Project met Configuratie

Als je **niet** een volledig apart project wilt, kun je ook een configuratie systeem maken:

### Optie B: Environment Variables

**Bestand:** `.env.local` (seniorease.eu)
```env
NEXT_PUBLIC_DOMAIN=seniorease.eu
NEXT_PUBLIC_APK_FULL=SeniorEase-Library.apk
NEXT_PUBLIC_APK_DEMO=SeniorEase-Library-Demo.apk
```

**Bestand:** `lib/config.ts` (nieuw)
```typescript
export const SITE_CONFIG = {
  domain: process.env.NEXT_PUBLIC_DOMAIN || 'seniorease.nl',
  apkNames: {
    full: process.env.NEXT_PUBLIC_APK_FULL || 'Seniorease-Bibliotheek.apk',
    demo: process.env.NEXT_PUBLIC_APK_DEMO || 'Seniorease-Bibliotheek-Demo.apk'
  }
};
```

**Voordeel:** Eén codebase, verschillende configuraties
**Nadeel:** Meer complexiteit, risico op verwarring

## ✅ Aanbeveling: Apart Project

**Ik raad aan om een apart project te maken** omdat:

1. **Volledige scheiding** - Geen risico op verwarring
2. **Eenvoudiger** - Elke website is duidelijk gescheiden
3. **Veiliger** - Geen risico op verkeerde deployment
4. **Onderhoud** - Makkelijker om te begrijpen wat voor welke website is

## 📋 Checklist Nieuw Website Project

- [ ] Project gekopieerd naar nieuwe locatie
- [ ] Nieuwe download routes aangemaakt (`/api/download-library`)
- [ ] Componenten aangepast (DemoDownload, MobileDownload)
- [ ] Oude APK's verwijderd
- [ ] Nieuwe APK's toegevoegd
- [ ] Vercel project aangemaakt voor seniorease.eu
- [ ] Domain gekoppeld aan nieuw Vercel project
- [ ] Test deployment
- [ ] Test download functionaliteit

## 🎯 Conclusie

**Start een apart website project!** Het is veiliger, duidelijker en voorkomt problemen.

**Tijdsinvestering:** ~15-30 minuten om alles aan te passen
**Voordeel:** Volledige scheiding, geen risico's, makkelijker onderhoud

## 📝 Volgende Stappen

1. ✅ Nieuw Android project maken (script al klaar)
2. ✅ Nieuw website project maken (dit document)
3. ✅ Beide projecten testen
4. ✅ Deploy naar Vercel
