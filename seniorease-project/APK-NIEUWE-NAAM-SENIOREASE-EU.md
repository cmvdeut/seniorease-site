# 📱 Nieuwe APK maken voor seniorease.eu

## 🎯 Doel
Een nieuwe APK maken met een andere naam voor de nieuwe website **seniorease.eu**, zodat deze niet conflicteert met de bestaande APK's op seniorease.nl.

## 📋 Huidige situatie

### Bestaande APK's (seniorease.nl):
- **Demo:** `Seniorease-Bibliotheek-Demo.apk`
- **Volledig:** `Seniorease-Bibliotheek.apk`

### Nieuwe APK naam voor seniorease.eu:
**Aanbevolen naam:** `SeniorEase-Library.apk` (of `SeniorEase-MijnBibliotheek.apk`)

**Waarom deze naam?**
- Duidelijk onderscheid van oude naam
- Gebruikt "SeniorEase" (merknaam)
- Gebruikt "Library" (Engelse naam van de app)
- Kort en duidelijk

## 🔨 Stap 1: APK bouwen in Android Studio

### 1.1 Open Android Studio project
```
D:\MAUREEN\DEV\Biblitoheek
```

### 1.2 Verhoog versienummer (optioneel)
In `app/build.gradle.kts`:
```kotlin
versionCode = 10  // Verhoog van 9 naar 10
versionName = "1.0.5"  // Verhoog van 1.0.4 naar 1.0.5
```

### 1.3 Build de APK

**Voor FULL versie:**
```powershell
cd D:\MAUREEN\DEV\Biblitoheek
.\gradlew.bat assembleFullRelease
```

**Voor DEMO versie:**
```powershell
.\gradlew.bat assembleDemoRelease
```

### 1.4 Locatie van gebouwde APK
De APK wordt gebouwd in:
```
app/build/outputs/apk/full/release/app-full-release.apk
app/build/outputs/apk/demo/release/app-demo-release.apk
```

## 📦 Stap 2: APK hernoemen en kopiëren

### 2.1 Hernoem naar nieuwe naam

**Voor FULL versie:**
```powershell
# Kopieer en hernoem
Copy-Item "app\build\outputs\apk\full\release\app-full-release.apk" -Destination "SeniorEase-Library.apk"
```

**Voor DEMO versie:**
```powershell
Copy-Item "app\build\outputs\apk\demo\release\app-demo-release.apk" -Destination "SeniorEase-Library-Demo.apk"
```

### 2.2 Kopieer naar website project

**Naar seniorease-project public folder:**
```powershell
# Vanuit Biblitoheek folder
Copy-Item "SeniorEase-Library.apk" -Destination "D:\MAUREEN\DEV\Seniorease\seniorease-project\public\SeniorEase-Library.apk"
Copy-Item "SeniorEase-Library-Demo.apk" -Destination "D:\MAUREEN\DEV\Seniorease\seniorease-project\public\SeniorEase-Library-Demo.apk"
```

## 🌐 Stap 3: Download routes aanpassen

### 3.1 Nieuwe download routes maken (of bestaande aanpassen)

**Optie A: Nieuwe routes voor seniorease.eu**
Maak nieuwe routes specifiek voor seniorease.eu:
- `/api/download-library` → `SeniorEase-Library.apk`
- `/api/download-library-demo` → `SeniorEase-Library-Demo.apk`

**Optie B: Bestaande routes aanpassen**
Pas bestaande routes aan om beide APK's te ondersteunen (op basis van domain of config).

### 3.2 Aanbeveling: Nieuwe routes maken

**Bestand:** `app/api/download-library/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const apkPath = join(process.cwd(), 'public', 'SeniorEase-Library.apk');
    const userAgent = request.headers.get('user-agent') || '';
    const isAndroid = /Android/i.test(userAgent);
    
    try {
      const fileBuffer = await readFile(apkPath);
      const fileStats = await stat(apkPath);
      
      const contentDisposition = isAndroid
        ? 'inline; filename="SeniorEase-Library.apk"'
        : 'attachment; filename="SeniorEase-Library.apk"';
      
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/vnd.android.package-archive',
          'Content-Disposition': contentDisposition,
          'Content-Length': fileBuffer.length.toString(),
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    } catch (fileError) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'APK bestand nog niet beschikbaar. Upload het bestand naar public/SeniorEase-Library.apk' 
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error: any) {
    console.error('Error serving APK:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Kon app niet downloaden' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
```

**Bestand:** `app/api/download-library-demo/route.ts`
(Zelfde structuur, maar met `SeniorEase-Library-Demo.apk`)

## 🔗 Stap 4: Website aanpassen voor seniorease.eu

### 4.1 Download knoppen aanpassen

Update de download componenten om de nieuwe routes te gebruiken:
- `app/components/MobileDownload.tsx`
- `app/components/DemoDownload.tsx`
- `app/download/page.tsx`

**Voorbeeld update:**
```typescript
// Oud:
href="/api/download-app"

// Nieuw (voor seniorease.eu):
href="/api/download-library"
```

### 4.2 Domain-specifieke configuratie (optioneel)

Als je beide websites wilt ondersteunen, kun je een configuratie maken:

**Bestand:** `lib/config.ts` (nieuw)
```typescript
export const SITE_CONFIG = {
  domain: process.env.NEXT_PUBLIC_DOMAIN || 'seniorease.nl',
  apkNames: {
    full: process.env.NEXT_PUBLIC_DOMAIN === 'seniorease.eu' 
      ? 'SeniorEase-Library.apk' 
      : 'Seniorease-Bibliotheek.apk',
    demo: process.env.NEXT_PUBLIC_DOMAIN === 'seniorease.eu'
      ? 'SeniorEase-Library-Demo.apk'
      : 'Seniorease-Bibliotheek-Demo.apk'
  }
};
```

## ✅ Checklist

### APK Build:
- [ ] Versienummer verhoogd in `build.gradle.kts`
- [ ] APK gebouwd (full release)
- [ ] APK gebouwd (demo release)
- [ ] APK's hernoemd naar nieuwe namen
- [ ] APK's gekopieerd naar `public/` folder

### Website:
- [ ] Nieuwe download routes aangemaakt
- [ ] Download componenten aangepast
- [ ] Test download op seniorease.eu
- [ ] Test download op seniorease.nl (oude routes blijven werken)

### Verificatie:
- [ ] APK kan gedownload worden via nieuwe routes
- [ ] APK kan geïnstalleerd worden op Android
- [ ] App werkt correct na installatie
- [ ] Oude APK's blijven werken op seniorease.nl

## 🎯 Samenvatting

**Nieuwe APK namen:**
- Full: `SeniorEase-Library.apk`
- Demo: `SeniorEase-Library-Demo.apk`

**Nieuwe download routes:**
- Full: `/api/download-library`
- Demo: `/api/download-library-demo`

**Voordelen:**
- ✅ Geen conflict met bestaande APK's
- ✅ Duidelijke naamgeving
- ✅ Beide websites kunnen onafhankelijk werken
- ✅ Eenvoudig te onderhouden

## 📝 Notities

- De oude APK's blijven beschikbaar op seniorease.nl
- De nieuwe APK's zijn specifiek voor seniorease.eu
- Beide kunnen naast elkaar bestaan zonder problemen
- Gebruikers kunnen kiezen welke website/APK ze gebruiken
