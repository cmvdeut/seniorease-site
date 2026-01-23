# 🚀 Script: Nieuw Android Project Maken

## 📋 Wat doet dit script?

Dit script kopieert automatisch je huidige Android project en past alle package names aan voor het nieuwe project voor seniorease.eu.

## ✅ Wat wordt aangepast:

1. ✅ Project gekopieerd naar nieuwe locatie
2. ✅ Package name in `build.gradle.kts` aangepast
3. ✅ Alle Kotlin package declarations aangepast
4. ✅ Folder structuur aangepast (`com/maureen/biblitoheek` → `com/seniorease/library`)
5. ✅ Alle imports aangepast
6. ✅ AndroidManifest.xml aangepast (als aanwezig)
7. ✅ App naam aangepast in `strings.xml`
8. ✅ Android Studio configuratie aangepast
9. ✅ Build folders opgeschoond

## 🎯 Gebruik

### Optie 1: Standaard instellingen gebruiken
```powershell
cd D:\MAUREEN\DEV\Seniorease\seniorease-project\scripts
.\create-new-android-project.ps1
```

### Optie 2: Aangepaste paden gebruiken
```powershell
.\create-new-android-project.ps1 `
    -SourcePath "D:\MAUREEN\DEV\Biblitoheek" `
    -DestinationPath "D:\MAUREEN\DEV\SeniorEase-Library" `
    -OldPackage "com.maureen.biblitoheek" `
    -NewPackage "com.seniorease.library" `
    -OldAppName "SeniorEasy Bieb" `
    -NewAppName "SeniorEase Library"
```

## ⚙️ Standaard instellingen

- **Source:** `D:\MAUREEN\DEV\Biblitoheek`
- **Destination:** `D:\MAUREEN\DEV\SeniorEase-Library`
- **Oude package:** `com.maureen.biblitoheek`
- **Nieuwe package:** `com.seniorease.library`
- **Oude app naam:** `SeniorEasy Bieb`
- **Nieuwe app naam:** `SeniorEase Library`

## 📝 Na het script

### 1. Open in Android Studio
```
File > Open > D:\MAUREEN\DEV\SeniorEase-Library
```

### 2. Sync Gradle
```
File > Sync Project with Gradle Files
```

### 3. Build APK
```powershell
cd D:\MAUREEN\DEV\SeniorEase-Library
.\gradlew.bat assembleFullRelease
.\gradlew.bat assembleDemoRelease
```

### 4. Test
- Installeer beide apps op hetzelfde Android apparaat
- Controleer dat ze naast elkaar kunnen bestaan
- Controleer dat beide apps werken

## ⚠️ Belangrijk

- Het script vraagt bevestiging als de doel folder al bestaat
- Maak een backup van je huidige project (optioneel, maar aanbevolen)
- Test het nieuwe project grondig voordat je APK's uploadt

## 🔍 Verificatie

Na het script, controleer:

1. ✅ Nieuwe folder bestaat: `D:\MAUREEN\DEV\SeniorEase-Library`
2. ✅ Package name in `build.gradle.kts` is `com.seniorease.library`
3. ✅ Folder structuur: `app/src/main/java/com/seniorease/library/`
4. ✅ Alle `.kt` bestanden hebben `package com.seniorease.library`
5. ✅ App naam in `strings.xml` is `SeniorEase Library`

## 🐛 Problemen?

Als er problemen zijn:

1. Controleer of alle paden correct zijn
2. Zorg dat je PowerShell rechten hebt om folders te kopiëren
3. Controleer of de source folder bestaat
4. Kijk naar de error messages in de console

## 📞 Hulp nodig?

Als het script niet werkt, kun je handmatig de stappen volgen uit `NIEUW-ANDROID-PROJECT-ADVIES.md`
