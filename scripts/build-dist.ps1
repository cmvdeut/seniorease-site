Param()

$ErrorActionPreference = 'Stop'

function Ensure-Directory($path) {
    if (-not (Test-Path -LiteralPath $path)) {
        New-Item -ItemType Directory -Path $path | Out-Null
    }
}

# Root of the project is the script's parent directory's parent
$Root = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
Set-Location $Root

$dist = Join-Path $Root 'dist'

# Clean dist
if (Test-Path -LiteralPath $dist) {
    Remove-Item -LiteralPath $dist -Recurse -Force -ErrorAction SilentlyContinue
}

Ensure-Directory $dist

Write-Host 'Building minimal dist/ for Netlify…'

# Copy single files if they exist
$singleFiles = @('index.html', 'manifest.webmanifest', 'sw.js', 'privacy.html', 'hulp.html')
foreach ($f in $singleFiles) {
    if (Test-Path -LiteralPath (Join-Path $Root $f)) {
        Copy-Item -LiteralPath (Join-Path $Root $f) -Destination $dist -Force
        Write-Host "  ✓ $f"
    }
}

# Copy needed directories if they exist
$dirs = @('icons', 'screenshots', 'demo', 'senioreasebieb')
foreach ($d in $dirs) {
    $src = Join-Path $Root $d
    if (Test-Path -LiteralPath $src) {
        Copy-Item -LiteralPath $src -Destination (Join-Path $dist $d) -Recurse -Force
        Write-Host "  ✓ $d/"
    }
}

Write-Host "Done. Output: $dist"

# Also emit a _redirects file so that manual/CLI deploys honor SPA & folder passthroughs
$redirects = @(
    "/demo/* /demo/:splat 200",
    "/senioreasebieb/* /senioreasebieb/:splat 200",
    "/senioreasebieb /senioreasebieb/ 301",
    "/* /index.html 200"
)
$redirectsPath = Join-Path $dist "_redirects"
$redirects -join "`n" | Out-File -FilePath $redirectsPath -Encoding UTF8 -Force
Write-Host "_redirects written"

