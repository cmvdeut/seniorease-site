# Script om te controleren of APK bestand goed ondertekend is
# Gebruik: .\check-apk-signature.ps1

$apkPath = "public\Seniorease-Bibliotheek.apk"

if (-not (Test-Path $apkPath)) {
    Write-Host "[ERROR] APK bestand niet gevonden: $apkPath" -ForegroundColor Red
    exit 1
}

Write-Host "[INFO] Controleren of APK ondertekend is..." -ForegroundColor Yellow
Write-Host "Bestand: $apkPath"
Write-Host ""

# Probeer jarsigner te vinden
$jarsigner = $null

# Check JAVA_HOME eerst
if ($env:JAVA_HOME) {
    $jarsigner = Join-Path $env:JAVA_HOME "bin\jarsigner.exe"
    if (-not (Test-Path $jarsigner)) {
        $jarsigner = $null
    }
}

# Als niet gevonden, probeer via Get-Command
if (-not $jarsigner) {
    $jarsignerCmd = Get-Command jarsigner -ErrorAction SilentlyContinue
    if ($jarsignerCmd) {
        $jarsigner = $jarsignerCmd.Path
    }
}

if (-not $jarsigner) {
    Write-Host "[ERROR] jarsigner niet gevonden. Zorg dat Java JDK geinstalleerd is." -ForegroundColor Red
    Write-Host "   Download Java JDK: https://adoptium.net/" -ForegroundColor Yellow
    exit 1
}

Write-Host "Gebruik jarsigner: $jarsigner"
Write-Host ""

# Controleer APK
$result = & $jarsigner -verify -verbose -certs $apkPath 2>&1
$exitCode = $LASTEXITCODE

if ($exitCode -eq 0) {
    Write-Host "[OK] APK is GOED ONDERTEKEN!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Details:" -ForegroundColor Cyan
    $result | Where-Object { $_ -match "verified" -or $_ -match "CN=" } | ForEach-Object {
        Write-Host "  $_" -ForegroundColor Gray
    }
} else {
    Write-Host "[ERROR] APK is NIET ONDERTEKEN!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Foutmelding:" -ForegroundColor Yellow
    $result | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
    Write-Host ""
    Write-Host "Oplossing:" -ForegroundColor Yellow
    Write-Host "   1. Open Android Studio" -ForegroundColor White
    Write-Host "   2. Ga naar: Build -> Generate Signed Bundle / APK" -ForegroundColor White
    Write-Host "   3. Kies APK en selecteer een signing key" -ForegroundColor White
    Write-Host "   4. Zie APK-UPLOAD-INSTRUCTIES.md voor gedetailleerde stappen" -ForegroundColor White
    exit 1
}
