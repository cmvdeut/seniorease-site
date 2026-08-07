# 🏗️ SeniorEase Architectuur

## 📊 Systeem Overzicht

```
┌─────────────────────────────────────────────────────────┐
│                    seniorease.nl                         │
│                  (Vercel Hosting)                        │
└─────────────────────────────────────────────────────────┘
                          ↑
                          │ Auto-deploy bij push
                          │
┌─────────────────────────────────────────────────────────┐
│                  GitHub Repository                       │
│                  (Version Control)                       │
└─────────────────────────────────────────────────────────┘
                          ↑
                          │ Git push
                          │
┌─────────────────────────────────────────────────────────┐
│                  Lokale Development                      │
│                  (Cursor + MCP)                          │
│                                                          │
│  ┌────────────┐    ┌──────────────┐    ┌────────────┐  │
│  │   Claude   │───→│     MCP      │───→│  Git Push  │  │
│  │  (Agent)   │    │ (Protocol)   │    │  Automatic │  │
│  └────────────┘    └──────────────┘    └────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Tech Stack

```
Frontend Layer:
├── Next.js 14 (React Framework)
│   ├── App Router (moderne routing)
│   ├── Server Components
│   └── Client Components (voor interactiviteit)
│
├── TypeScript (type safety)
│
└── Tailwind CSS
    └── Custom senior-friendly utilities

Build & Deploy:
├── npm (package manager)
├── Git (version control)
├── GitHub (code hosting)
└── Vercel
    ├── Automatic deployments
    ├── CDN distribution
    └── SSL certificates

Development:
├── Cursor IDE
├── Claude MCP Agent
└── Local dev server
```

## 📱 App Structuur

```
SeniorEase Website
│
├── Homepage (/)
│   ├── Hero sectie
│   ├── App overzicht
│   │   ├── 🕐 Grote Klok (actief)
│   │   └── ⏰ Herinnering (toekomstig)
│   ├── Over sectie
│   └── Footer
│
└── Apps
    └── Grote Klok (/klok)
        ├── Real-time klok (HH:MM:SS)
        ├── Volledige datum
        ├── Terug knop
        └── Fullscreen tip
```

## 🎨 Design System

```
Kleuren:
├── Primary: Blue (#2563EB)
├── Background: White / Gradient
├── Text: Dark Gray (#1a1a1a)
└── Accent: Light Blue (#EFF6FF)

Typography (Senior-Friendly):
├── senior-xs:   18px
├── senior-sm:   20px
├── senior-base: 24px  ← Minimum voor body text
├── senior-lg:   32px
├── senior-xl:   40px
├── senior-2xl:  48px
└── senior-3xl:  64px

Spacing & Touch Targets:
├── Minimum button: 48x48px
├── Generous padding: 16-24px
└── Clear visual hierarchy
```

## 🔄 Workflow

```
1. Ontwikkel lokaal
   └─→ npm run dev (localhost:3000)

2. Test & itereer
   └─→ Claude + MCP voor snelle aanpassingen

3. Commit changes
   └─→ git commit -m "Feature X"

4. Push naar GitHub
   └─→ git push origin main

5. Auto-deploy
   └─→ Vercel detecteert push
   └─→ Build & deploy automatisch
   └─→ Live op seniorease.nl binnen 2-3 min
```

## 🚀 MCP Agent Workflow

```
Jij (in Cursor):
"Claude, voeg een medicijn-herinnering app toe"
         │
         ↓
┌─────────────────────────────────────┐
│  Claude analyseert request           │
│  - Begrijpt feature                  │
│  - Plant architectuur                │
│  - Genereert code                    │
└─────────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  MCP Filesystem                      │
│  - Creëert nieuwe files              │
│  - Update bestaande code             │
│  - Voegt dependencies toe            │
└─────────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  MCP GitHub                          │
│  - git add .                         │
│  - git commit -m "Added reminders"   │
│  - git push origin main              │
└─────────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  Vercel Auto-Deploy                  │
│  - Detecteert nieuwe commit          │
│  - Triggers build                    │
│  - Deploys naar productie            │
└─────────────────────────────────────┘
         │
         ↓
   ✅ Live op seniorease.nl
```

## 📈 Uitbreiding Roadmap

```
FASE 1: Foundation (NU) ✅
├── Homepage
├── Grote Klok app
├── Basis styling
└── Deployment setup

FASE 2: Core Apps (Week 2-4)
├── Medicijn-herinnering
├── Eenvoudige agenda
├── Contact lijst
└── Nieuws reader

FASE 3: Enhanced UX (Week 5-8)
├── PWA support (installeerbaar)
├── Offline functionaliteit
├── Dark mode
├── Font size selector
└── Spraak functionaliteit

FASE 4: Desktop Apps (Week 9-12)
├── Electron wrapper
├── Auto-updates
├── Systeem integratie
└── Installers (Windows/Mac)

FASE 5: Community (Week 13+)
├── User accounts
├── Gedeelde agenda's
├── Forum
└── Video tutorials
```

## 🔒 Beveiliging & Privacy

```
✅ HTTPS (SSL via Vercel)
✅ Geen tracking cookies
✅ Privacy-first design
✅ Lokale data storage (PWA)
✅ Geen third-party analytics (standaard)
```

## ⚡ Performance

```
Target Metrics:
├── First Contentful Paint: < 1.5s
├── Time to Interactive: < 3s
├── Lighthouse Score: > 90
└── Cumulative Layout Shift: < 0.1

Optimalisaties:
├── Next.js automatic code splitting
├── Image optimization
├── CSS minification
└── CDN via Vercel
```

---

## 🎯 Waarom deze architectuur?

**Next.js 14**
→ Modern, snel, SEO-friendly, server components

**TypeScript**
→ Catch bugs vroeg, betere IDE support

**Tailwind CSS**
→ Snelle styling, geen CSS conflicts, responsive

**Vercel**
→ Hosting, auto-deploys, CDN, SSL

**MCP + Claude**
→ AI-powered development, snellere iteratie

**Git + GitHub**
→ Version control, samenwerking, backup

---

**Deze architectuur is gebouwd voor:**
✅ Snelheid (development & runtime)
✅ Schaalbaarheid (meer apps toevoegen)
✅ Onderhoudbaarheid (clean code)
✅ Toegankelijkheid (senior-friendly)
✅ Kosten-efficiency (gratis tiers)
