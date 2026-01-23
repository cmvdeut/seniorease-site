# Script om nieuw Android project te maken voor seniorease.eu
# Dit script kopieert het huidige project en past de package name aan

param(
    [string]$SourcePath = "D:\MAUREEN\DEV\Biblitoheek",
    [string]$DestinationPath = "D:\MAUREEN\DEV\SeniorEase-Library",
    [string]$OldPackage = "com.maureen.biblitoheek",
    [string]$NewPackage = "com.seniorease.library",
    [string]$OldAppName = "SeniorEasy Bieb",
    [string]$NewAppName = "SeniorEase Library"
)

Write-Host "Nieuw Android Project Maken" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Bron: $SourcePath" -ForegroundColor Yellow
Write-Host "Doel: $DestinationPath" -ForegroundColor Yellow
Write-Host "Oude package: $OldPackage" -ForegroundColor Yellow
Write-Host "Nieuwe package: $NewPackage" -ForegroundColor Green
Write-Host ""

# Check of source bestaat
if (-not (Test-Path $SourcePath)) {
    Write-Host "FOUT: Bron project bestaat niet: $SourcePath" -ForegroundColor Red
    exit 1
}

# Check of destination al bestaat
if (Test-Path $DestinationPath) {
    $response = Read-Host "Doel folder bestaat al. Overschrijven? (j/n)"
    if ($response -ne "j" -and $response -ne "J") {
        Write-Host "Geannuleerd." -ForegroundColor Red
        exit 1
    }
    Write-Host "Verwijderen oude folder..." -ForegroundColor Yellow
    Remove-Item $DestinationPath -Recurse -Force
}

# Stap 1: Kopieer project
Write-Host ""
Write-Host "Stap 1: Project kopieren..." -ForegroundColor Cyan
Copy-Item $SourcePath -Destination $DestinationPath -Recurse -Force
Write-Host "OK: Project gekopieerd" -ForegroundColor Green

# Stap 2: Verwijder build folders (niet nodig in nieuwe project)
Write-Host ""
Write-Host "Stap 2: Opschonen build folders..." -ForegroundColor Cyan
$buildFolders = @(
    "$DestinationPath\app\build",
    "$DestinationPath\build",
    "$DestinationPath\.gradle",
    "$DestinationPath\app\.cxx"
)
foreach ($folder in $buildFolders) {
    if (Test-Path $folder) {
        Remove-Item $folder -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  Verwijderd: $folder" -ForegroundColor Gray
    }
}

# Stap 3: Pas build.gradle.kts aan
Write-Host ""
Write-Host "Stap 3: Package name aanpassen in build.gradle.kts..." -ForegroundColor Cyan
$buildGradlePath = "$DestinationPath\app\build.gradle.kts"
if (Test-Path $buildGradlePath) {
    $content = Get-Content $buildGradlePath -Raw
    $content = $content -replace "namespace = `"$OldPackage`"", "namespace = `"$NewPackage`""
    $content = $content -replace "applicationId = `"$OldPackage`"", "applicationId = `"$NewPackage`""
    Set-Content $buildGradlePath -Value $content -NoNewline
    Write-Host "OK: build.gradle.kts aangepast" -ForegroundColor Green
} else {
    Write-Host "WAARSCHUWING: build.gradle.kts niet gevonden" -ForegroundColor Yellow
}

# Stap 4: Verplaats Java/Kotlin source folders
Write-Host ""
Write-Host "Stap 4: Folder structuur aanpassen..." -ForegroundColor Cyan
$oldJavaPath = "$DestinationPath\app\src\main\java\$($OldPackage.Replace('.', '\'))"
$newJavaPath = "$DestinationPath\app\src\main\java\$($NewPackage.Replace('.', '\'))"

if (Test-Path $oldJavaPath) {
    # Maak nieuwe folder structuur
    $newPathParts = $NewPackage.Split('.')
    $currentPath = "$DestinationPath\app\src\main\java"
    foreach ($part in $newPathParts) {
        $currentPath = Join-Path $currentPath $part
        if (-not (Test-Path $currentPath)) {
            New-Item -ItemType Directory -Path $currentPath -Force | Out-Null
        }
    }
    
    # Kopieer bestanden
    Copy-Item "$oldJavaPath\*" -Destination $newJavaPath -Recurse -Force
    Write-Host "OK: Bestanden gekopieerd naar nieuwe package folder" -ForegroundColor Green
    
    # Verwijder oude folder
    Remove-Item $oldJavaPath -Recurse -Force
    Write-Host "OK: Oude package folder verwijderd" -ForegroundColor Green
} else {
    Write-Host "WAARSCHUWING: Java source folder niet gevonden: $oldJavaPath" -ForegroundColor Yellow
}

# Stap 5: Pas alle Kotlin bestanden aan
Write-Host ""
Write-Host "Stap 5: Package declarations aanpassen in Kotlin bestanden..." -ForegroundColor Cyan
$kotlinFiles = Get-ChildItem -Path "$DestinationPath\app\src" -Filter "*.kt" -Recurse -File
$fileCount = 0
foreach ($file in $kotlinFiles) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Pas package declaration aan
    $content = $content -replace "package $OldPackage", "package $NewPackage"
    
    # Pas imports aan
    $content = $content -replace "import $OldPackage", "import $NewPackage"
    
    if ($content -ne $originalContent) {
        Set-Content $file.FullName -Value $content -NoNewline
        $fileCount++
        Write-Host "  Aangepast: $($file.Name)" -ForegroundColor Gray
    }
}
Write-Host "OK: $fileCount Kotlin bestanden aangepast" -ForegroundColor Green

# Stap 6: Pas AndroidManifest.xml aan (als die bestaat)
Write-Host ""
Write-Host "Stap 6: AndroidManifest.xml aanpassen..." -ForegroundColor Cyan
$manifestFiles = Get-ChildItem -Path "$DestinationPath\app\src" -Filter "AndroidManifest.xml" -Recurse -File
foreach ($manifest in $manifestFiles) {
    $content = Get-Content $manifest.FullName -Raw
    $content = $content -replace "package=`"$OldPackage`"", "package=`"$NewPackage`""
    $content = $content -replace "android:name=`"$OldPackage", "android:name=`"$NewPackage"
    Set-Content $manifest.FullName -Value $content -NoNewline
    Write-Host "  Aangepast: $($manifest.FullName)" -ForegroundColor Gray
}
if ($manifestFiles.Count -eq 0) {
    Write-Host "INFO: AndroidManifest.xml niet gevonden (waarschijnlijk in build.gradle.kts)" -ForegroundColor Gray
} else {
    Write-Host "OK: AndroidManifest.xml bestanden aangepast" -ForegroundColor Green
}

# Stap 7: Pas strings.xml aan (app naam)
Write-Host ""
Write-Host "Stap 7: App naam aanpassen in strings.xml..." -ForegroundColor Cyan
$stringsFiles = Get-ChildItem -Path "$DestinationPath\app\src\main\res" -Filter "strings.xml" -Recurse -File
foreach ($stringsFile in $stringsFiles) {
    $content = Get-Content $stringsFile.FullName -Raw
    $content = $content -replace "<string name=`"app_name`">$OldAppName</string>", "<string name=`"app_name`">$NewAppName</string>"
    Set-Content $stringsFile.FullName -Value $content -NoNewline
    Write-Host "  Aangepast: $($stringsFile.FullName)" -ForegroundColor Gray
}
if ($stringsFiles.Count -gt 0) {
    Write-Host "OK: App naam aangepast in strings.xml" -ForegroundColor Green
} else {
    Write-Host "WAARSCHUWING: strings.xml niet gevonden" -ForegroundColor Yellow
}

# Stap 8: Pas .idea folder aan (Android Studio configuratie)
Write-Host ""
Write-Host "Stap 8: Android Studio configuratie aanpassen..." -ForegroundColor Cyan
$ideaPath = "$DestinationPath\.idea"
if (Test-Path $ideaPath) {
    # Pas .idea/misc.xml aan (als die bestaat)
    $miscXml = "$ideaPath\misc.xml"
    if (Test-Path $miscXml) {
        $content = Get-Content $miscXml -Raw
        $content = $content -replace $OldPackage, $NewPackage
        Set-Content $miscXml -Value $content -NoNewline
        Write-Host "  misc.xml aangepast" -ForegroundColor Gray
    }
    Write-Host "OK: Android Studio configuratie aangepast" -ForegroundColor Green
}

# Samenvatting
Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "KLAAR!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Nieuw project locatie: $DestinationPath" -ForegroundColor Green
Write-Host "Nieuwe package name: $NewPackage" -ForegroundColor Green
Write-Host ""
Write-Host "Volgende stappen:" -ForegroundColor Yellow
Write-Host "1. Open het nieuwe project in Android Studio: $DestinationPath" -ForegroundColor White
Write-Host "2. Sync Gradle (File > Sync Project with Gradle Files)" -ForegroundColor White
Write-Host "3. Build de APK: .\gradlew.bat assembleFullRelease" -ForegroundColor White
Write-Host "4. Test dat beide apps naast elkaar kunnen bestaan" -ForegroundColor White
Write-Host ""
