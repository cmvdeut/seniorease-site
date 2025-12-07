# DNS Snel Check Script voor seniorease.nl
# Voer uit in PowerShell: .\DNS-SNEL-CHECK.ps1

Write-Host "🔍 DNS Check voor seniorease.nl" -ForegroundColor Cyan
Write-Host ""

# Check www.seniorease.nl
Write-Host "📋 Check www.seniorease.nl:" -ForegroundColor Yellow
try {
    $wwwResult = Resolve-DnsName www.seniorease.nl -Type A -ErrorAction Stop
    foreach ($record in $wwwResult) {
        Write-Host "  ✅ A Record: $($record.IPAddress)" -ForegroundColor Green
    }
} catch {
    Write-Host "  ❌ Kan DNS niet resolven: $_" -ForegroundColor Red
}

Write-Host ""

# Check seniorease.nl (root)
Write-Host "📋 Check seniorease.nl (root):" -ForegroundColor Yellow
try {
    $rootResult = Resolve-DnsName seniorease.nl -Type A -ErrorAction Stop
    foreach ($record in $rootResult) {
        Write-Host "  ✅ A Record: $($record.IPAddress)" -ForegroundColor Green
    }
} catch {
    Write-Host "  ❌ Kan DNS niet resolven: $_" -ForegroundColor Red
}

Write-Host ""

# Check CNAME voor www
Write-Host "📋 Check CNAME voor www:" -ForegroundColor Yellow
try {
    $cnameResult = Resolve-DnsName www.seniorease.nl -Type CNAME -ErrorAction Stop
    foreach ($record in $cnameResult) {
        Write-Host "  ✅ CNAME: $($record.NameHost)" -ForegroundColor Green
    }
} catch {
    Write-Host "  ℹ️  Geen CNAME record (A record gebruikt)" -ForegroundColor Gray
}

Write-Host ""

# Vercel IP ranges (bekende ranges)
$vercelIPs = @(
    "76.76.21.21",
    "76.76.21.22",
    "76.76.21.23"
)

Write-Host "💡 Vercel IP Ranges (voorbeelden):" -ForegroundColor Cyan
Write-Host "   Meestal beginnen met: 76.76.x.x of 216.198.x.x" -ForegroundColor Gray
Write-Host ""

# Check of IP naar Vercel wijst
Write-Host "🔍 Analyse:" -ForegroundColor Yellow
if ($wwwResult) {
    $ip = $wwwResult[0].IPAddress
    $isVercel = $ip -like "76.76.*" -or $ip -like "216.198.*"
    
    if ($isVercel) {
        Write-Host "  ✅ DNS wijst naar Vercel IP: $ip" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  DNS wijst naar: $ip" -ForegroundColor Yellow
        Write-Host "     (Controleer of dit Vercel IP is in Vercel dashboard)" -ForegroundColor Gray
    }
} else {
    Write-Host "  ❌ Kan DNS niet checken" -ForegroundColor Red
}

Write-Host ""
Write-Host "📝 Volgende stappen:" -ForegroundColor Cyan
Write-Host "   1. Check Vercel Dashboard → Settings → Domains" -ForegroundColor White
Write-Host "   2. Vergelijk IP adres met Vercel DNS records" -ForegroundColor White
Write-Host "   3. Als IP niet klopt, update DNS bij Strato" -ForegroundColor White
