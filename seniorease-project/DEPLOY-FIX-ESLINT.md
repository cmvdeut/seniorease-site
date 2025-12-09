# 🔧 ESLint Fix - Deployment Probleem Opgelost

**Probleem:** `Invalid project directory provided, no such directory: ...\lint`

**Oorzaak:** ESLint 9.x heeft een andere configuratie nodig dan ESLint 8.x

---

## ✅ Fix Toegepast

### 1. ESLint Configuratie Bestand
**Aangemaakt:** `.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}
```

### 2. ESLint Versie Downgrade
**Gewijzigd:** `package.json`
- ESLint: `^9.39.0` → `^8.57.0` (beter compatibel met Next.js 16)

---

## 🚀 Nu Deployen

### Stap 1: Installeer Dependencies

```bash
npm install
```

### Stap 2: Test Lokaal

```bash
npm run lint
npm run build
```

**Verwacht:**
- ✅ Lint werkt zonder errors
- ✅ Build werkt zonder errors

### Stap 3: Push naar GitHub

```bash
git add .
git commit -m "Fix: Add ESLint config and downgrade to ESLint 8 for Next.js compatibility"
git push origin main
```

### Stap 4: Vercel Deployt Automatisch

Als Vercel gekoppeld is aan GitHub:
- ✅ Vercel deployt automatisch binnen 1-2 minuten
- ✅ Check Vercel Dashboard voor status

---

## ✅ Verificatie

**Na deployment:**

1. **Test lint:**
   ```bash
   npm run lint
   ```
   **Verwacht:** Geen errors

2. **Test build:**
   ```bash
   npm run build
   ```
   **Verwacht:** "Compiled successfully"

3. **Test live site:**
   - 404 pagina: `/onbestaande-pagina`
   - Contact formulier: `/contact`
   - Bibliotheek: `/bibliotheek`

---

## 🎉 Klaar!

**ESLint probleem is opgelost!**

- ✅ ESLint configuratie toegevoegd
- ✅ ESLint versie gedowngraded naar 8.x
- ✅ Compatibel met Next.js 16

**Nu zou deployment moeten werken!** 🚀


