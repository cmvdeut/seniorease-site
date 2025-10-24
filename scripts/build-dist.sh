#!/bin/bash
set -e

# Root of the project
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

DIST="$ROOT/dist"

# Clean dist
if [ -d "$DIST" ]; then
    rm -rf "$DIST"
fi

mkdir -p "$DIST"

echo "Building minimal dist/ for Netlify…"

# Copy single files if they exist
SINGLE_FILES=("index.html" "manifest.webmanifest" "sw.js" "privacy.html" "hulp.html")
for file in "${SINGLE_FILES[@]}"; do
    if [ -f "$ROOT/$file" ]; then
        cp "$ROOT/$file" "$DIST/"
        echo "  ✓ $file"
    fi
done

# Copy needed directories if they exist
DIRS=("icons" "screenshots" "demo" "senioreasebieb")
for dir in "${DIRS[@]}"; do
    if [ -d "$ROOT/$dir" ]; then
        cp -r "$ROOT/$dir" "$DIST/"
        echo "  ✓ $dir/"
    fi
done

echo "Done. Output: $DIST"

# Create _redirects file for Netlify
cat > "$DIST/_redirects" << EOF
/demo/* /demo/:splat 200
/senioreasebieb/* /senioreasebieb/:splat 200
/senioreasebieb /senioreasebieb/ 301
/* /index.html 200
EOF

echo "_redirects written"

