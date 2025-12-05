# SeniorEase Content Agent - Vercel Deployment (PowerShell)
# Voor Windows gebruikers

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "SeniorEase Content Agent - Vercel Deployment" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Check if vercel CLI is available
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm i -g vercel
}

# Step 1: Check login status
Write-Host "Step 1: Checking Vercel login status..." -ForegroundColor Green
$loginCheck = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Niet ingelogd. Logging in..." -ForegroundColor Yellow
    Write-Host "Je browser opent zo voor login..." -ForegroundColor Gray
    vercel login
} else {
    Write-Host "Al ingelogd als: $loginCheck" -ForegroundColor Green
}

# Step 2: Link Project (moet eerst gebeuren voor env vars)
Write-Host ""
Write-Host "Step 2: Link Project" -ForegroundColor Green
$linkCheck = Test-Path .vercel
if (-not $linkCheck) {
    Write-Host "Project wordt gelinkt..." -ForegroundColor Yellow
    vercel link --yes
} else {
    Write-Host "Project is al gelinkt" -ForegroundColor Green
}

# Step 3: Environment Variables
Write-Host ""
Write-Host "Step 3: Environment Variables" -ForegroundColor Green
Write-Host "Plak je ANTHROPIC_API_KEY als gevraagd..." -ForegroundColor Gray
vercel env add ANTHROPIC_API_KEY production

Write-Host ""
Write-Host "Plak je FACEBOOK_PAGE_ACCESS_TOKEN als gevraagd..." -ForegroundColor Gray
vercel env add FACEBOOK_PAGE_ACCESS_TOKEN production

Write-Host ""
Write-Host "Plak je FACEBOOK_PAGE_ID als gevraagd..." -ForegroundColor Gray
vercel env add FACEBOOK_PAGE_ID production

# Step 4: Deploy
Write-Host ""
Write-Host "Step 4: Deploy!" -ForegroundColor Green
vercel --prod

Write-Host ""
Write-Host "Deployment compleet!" -ForegroundColor Green
Write-Host "Check je Vercel dashboard voor de URL" -ForegroundColor Cyan
