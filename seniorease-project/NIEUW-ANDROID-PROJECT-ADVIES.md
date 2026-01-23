# 🎯 Advies: Nieuw Android Project voor seniorease.eu

## ✅ **JA, start een nieuw project - Dit is veiliger!**

## 🔴 Waarom een nieuw project?

### 1. **Package Name Conflict**
**Huidige package name:** `com.maureen.biblitoheek`

**Probleem:**
- Als beide APK's dezelfde package name hebben, kunnen ze **NIET** naast elkaar geïnstalleerd worden
- Android ziet ze als dezelfde app
- Installatie van de nieuwe app zou de oude app **vervangen**

**Oplossing:**
- Nieuw project met package name: `com.seniorease.library` (of `com.seniorease.mijnbibliotheek`)
- Beide apps kunnen dan naast elkaar bestaan

### 2. **Volledige Scheiding**
- ✅ Geen risico op verkeerde APK uploaden
- ✅ Geen risico op code wijzigingen die beide apps beïnvloeden
- ✅ Duidelijke scheiding: seniorease.nl vs seniorease.eu
- ✅ Makkelijker om onafhankelijk te updaten

### 3. **Onderhoud**
- ✅ Elke website heeft zijn eigen app project
- ✅ Geen verwarring over welke code voor welke website is
- ✅ Duidelijke folder structuur

## 📁 Aanbevolen Structuur

```
D:\MAUREEN\DEV\
├── Biblitoheek\              ← Huidige project (seniorease.nl)
│   └── app\build.gradle.kts (package: com.maureen.biblitoheek)
│
└── SeniorEase-Library\       ← NIEUW project (seniorease.eu)
    └── app\build.gradle.kts (package: com.seniorease.library)
```

## 🔨 Stappenplan: Nieuw Project

### Stap 1: Kopieer het huidige project
```powershell
# Kopieer het hele project
Copy-Item "D:\MAUREEN\DEV\Biblitoheek" -Destination "D:\MAUREEN\DEV\SeniorEase-Library" -Recurse
```

### Stap 2: Pas package name aan

**Bestand:** `app/build.gradle.kts`
```kotlin
android {
    namespace = "com.seniorease.library"  // NIEUW
    
    defaultConfig {
        applicationId = "com.seniorease.library"  // NIEUW
        // ... rest blijft hetzelfde
    }
}
```

### Stap 3: Pas Kotlin package declarations aan

**Zoek en vervang in alle `.kt` bestanden:**
```kotlin
// Oud:
package com.maureen.biblitoheek

// Nieuw:
package com.seniorease.library
```

**Bestanden die aangepast moeten worden:**
- `app/src/main/java/com/maureen/biblitoheek/` → `app/src/main/java/com/seniorease/library/`
- Alle imports in alle bestanden

### Stap 4: Pas AndroidManifest.xml aan (als die bestaat)
```xml
<!-- Oud -->
<manifest package="com.maureen.biblitoheek">

<!-- Nieuw -->
<manifest package="com.seniorease.library">
```

### Stap 5: Pas app naam aan (optioneel)

**Bestand:** `app/src/main/res/values/strings.xml`
```xml
<!-- Oud -->
<string name="app_name">SeniorEasy Bieb</string>

<!-- Nieuw -->
<string name="app_name">SeniorEase Library</string>
```

### Stap 6: Build nieuwe APK
```powershell
cd D:\MAUREEN\DEV\SeniorEase-Library
.\gradlew.bat assembleFullRelease
.\gradlew.bat assembleDemoRelease
```

### Stap 7: Hernoem APK's
```powershell
Copy-Item "app\build\outputs\apk\full\release\app-full-release.apk" -Destination "SeniorEase-Library.apk"
Copy-Item "app\build\outputs\apk\demo\release\app-demo-release.apk" -Destination "SeniorEase-Library-Demo.apk"
```

## ⚠️ Belangrijke Punten

### Package Name Regels:
- Moet uniek zijn (anders conflict)
- Moet lowercase zijn
- Gebruik reverse domain notation: `com.seniorease.library`
- Kan niet hetzelfde zijn als bestaande app

### App Naam:
- Kan hetzelfde zijn (geen probleem)
- Alleen package name moet verschillen

### Database:
- Beide apps hebben hun eigen database
- Geen data sharing tussen apps
- Dit is **goed** - volledige scheiding

## ✅ Voordelen Nieuw Project

1. **Geen conflicten:** Beide apps kunnen naast elkaar bestaan
2. **Veiligheid:** Geen risico op verkeerde APK uploaden
3. **Onderhoud:** Duidelijke scheiding tussen websites
4. **Updates:** Onafhankelijk updaten van beide apps
5. **Testing:** Test nieuwe app zonder oude app te beïnvloeden

## 📋 Checklist Nieuw Project

- [ ] Project gekopieerd naar nieuwe locatie
- [ ] Package name aangepast in `build.gradle.kts`
- [ ] Alle Kotlin package declarations aangepast
- [ ] Folder structuur aangepast (`com/maureen/biblitoheek` → `com/seniorease/library`)
- [ ] AndroidManifest.xml aangepast (als aanwezig)
- [ ] App naam aangepast (optioneel)
- [ ] Project opgeschoond (oude build files verwijderen)
- [ ] APK gebouwd en getest
- [ ] APK geïnstalleerd op test apparaat (naast oude app)
- [ ] Beide apps werken naast elkaar

## 🎯 Conclusie

**Start een nieuw project!** Het is veiliger, duidelijker en voorkomt problemen met package name conflicten.

**Tijdsinvestering:** ~30-60 minuten om alles aan te passen
**Voordeel:** Volledige scheiding, geen risico's, makkelijker onderhoud
