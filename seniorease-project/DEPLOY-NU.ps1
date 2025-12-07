# Deploy script voor SeniorEase
# Voer dit uit in PowerShell: .\DEPLOY-NU.ps1

Write-Host "=== SeniorEase Deployment Script ===" -ForegroundColor Cyan
Write-Host ""

# Check of we in de juiste directory zijn
if (-not (Test-Path "app\page.tsx")) {
    Write-Host "Fout: Je moet dit script uitvoeren vanuit de project root directory!" -ForegroundColor Red
    exit 1
}

Write-Host "1. Git status controleren..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "2. Alle wijzigingen toevoegen..." -ForegroundColor Yellow
git add -A

Write-Host ""
Write-Host "3. Remote wijzigingen ophalen..." -ForegroundColor Yellow
git fetch origin

Write-Host ""
Write-Host "4. Merge met remote main branch..." -ForegroundColor Yellow
git pull origin main --no-edit

Write-Host ""
Write-Host "5. Committen (als er wijzigingen zijn)..." -ForegroundColor Yellow
git commit -m "Voeg drag-to-select, moeilijkheidsgraden en social media links toe" || Write-Host "Geen nieuwe wijzigingen om te committen" -ForegroundColor Gray

Write-Host ""
Write-Host "6. Pushen naar GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "=== Klaar! ===" -ForegroundColor Green
Write-Host "Vercel zal automatisch een nieuwe deployment starten." -ForegroundColor Green
