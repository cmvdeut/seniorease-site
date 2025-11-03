# Script om APK informatie te controleren
# Gebruik: .\check-apk-info.ps1

$apkPath = "public\Seniorease-Bibliotheek.apk"

if (-not (Test-Path $apkPath)) {
    Write-Host "[ERROR] APK bestand niet gevonden: $apkPath" -ForegroundColor Red
    Write-Host ""
    Write-Host "Oplossing:" -ForegroundColor Yellow
    Write-Host "  1. Exporteer APK uit Android Studio (Build -> Generate Signed Bundle / APK)"
    Write-Host "  2. Hernoem naar: Seniorease-Bibliotheek.apk"
    Write-Host "  3. Plaats in: public/Seniorease-Bibliotheek.apk"
    exit 1
}

$fileInfo = Get-Item $apkPath
$fileSizeMB = [math]::Round($fileInfo.Length / 1MB, 2)

Write-Host "[INFO] APK Bestand Details:" -ForegroundColor Cyan
Write-Host "  Locatie: $apkPath" -ForegroundColor Gray
Write-Host "  Grootte: $fileSizeMB MB ($($fileInfo.Length) bytes)" -ForegroundColor Gray
Write-Host "  Laatste wijziging: $($fileInfo.LastWriteTime)" -ForegroundColor Gray
Write-Host ""

# Check of aapt/aapt2 beschikbaar is om APK info te lezen
$aapt = $null

# Probeer aapt2 te vinden (vanuit Android SDK)
$androidHome = $env:ANDROID_HOME
if ($androidHome) {
    $aapt2Path = Join-Path $androidHome "build-tools\*\aapt2.exe"
    $aapt2Files = Get-ChildItem -Path $aapt2Path -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending
    if ($aapt2Files) {
        $aapt = $aapt2Files[0].FullName
        Write-Host "[INFO] Gevonden aapt2: $aapt" -ForegroundColor Green
    }
}

if (-not $aapt) {
    # Probeer aapt (ouder)
    if ($androidHome) {
        $aaptPath = Join-Path $androidHome "build-tools\*\aapt.exe"
        $aaptFiles = Get-ChildItem -Path $aaptPath -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending
        if ($aaptFiles) {
            $aapt = $aaptFiles[0].FullName
            Write-Host "[INFO] Gevonden aapt: $aapt" -ForegroundColor Green
        }
    }
}

if ($aapt) {
    Write-Host ""
    Write-Host "[INFO] APK Package Informatie:" -ForegroundColor Cyan
    try {
        $info = & $aapt dump badging $apkPath 2>&1
        if ($LASTEXITCODE -eq 0) {
            $packageName = ($info | Select-String "package: name='([^']+)'").Matches.Groups[1].Value
            $versionName = ($info | Select-String "versionName='([^']+)'").Matches.Groups[1].Value
            $versionCode = ($info | Select-String "versionCode='([^']+)'").Matches.Groups[1].Value
            $applicationLabel = ($info | Select-String "application-label:'([^']+)'").Matches.Groups[1].Value
            
            Write-Host "  Package Name: $packageName" -ForegroundColor White
            Write-Host "  App Naam: $applicationLabel" -ForegroundColor White
            Write-Host "  Versie: $versionName (code: $versionCode)" -ForegroundColor White
            Write-Host ""
            Write-Host "[OK] APK bestand lijkt geldig!" -ForegroundColor Green
        } else {
            Write-Host "[WARNING] Kon APK info niet uitlezen (mogelijk corrupt bestand?)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "[WARNING] Kon APK info niet uitlezen: $_" -ForegroundColor Yellow
    }
} else {
    Write-Host "[INFO] Android SDK tools niet gevonden - kan APK details niet tonen" -ForegroundColor Yellow
    Write-Host "  Tip: Installeer Android SDK of zet ANDROID_HOME environment variable" -ForegroundColor Gray
    Write-Host ""
    Write-Host "[INFO] Controleer handmatig:" -ForegroundColor Cyan
    Write-Host "  1. Open APK in Android Studio (Build -> Analyze APK)" -ForegroundColor White
    Write-Host "  2. Of gebruik: aapt dump badging public/Seniorease-Bibliotheek.apk" -ForegroundColor White
}

Write-Host ""
Write-Host "=== Belangrijke vragen ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Is dit het juiste APK bestand?" -ForegroundColor Yellow
Write-Host "  - Heeft u het APK uit Android Studio geëxporteerd?" -ForegroundColor White
Write-Host "  - Is het de nieuwste versie?" -ForegroundColor White
Write-Host "  - Is het bestand recent genoeg? (Zie Laatste wijziging hierboven)" -ForegroundColor White
Write-Host ""
Write-Host "Als dit NIET het juiste bestand is:" -ForegroundColor Red
Write-Host "  1. Exporteer de APK opnieuw uit Android Studio" -ForegroundColor White
Write-Host "  2. Hernoem naar: Seniorease-Bibliotheek.apk" -ForegroundColor White
Write-Host "  3. Vervang het bestand in: public/Seniorease-Bibliotheek.apk" -ForegroundColor White
Write-Host "  4. Commit en push naar GitHub" -ForegroundColor White

