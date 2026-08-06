# Afvinken install-UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make installing Afvinken on the phone as few steps as possible (one tap on Android; three clear Safari steps on iPhone).

**Architecture:** Dedicated `manifest-afvinken.json` so the home-screen icon opens `/afvinken` as “Afvinken”. Rewrite `AddToHomeScreen` for device-aware UI. Place install band at the top of `/afvinken`; remove the long bottom instruction block.

**Tech Stack:** Next.js App Router metadata, Web App Manifest, `beforeinstallprompt`, React client component

## Global Constraints

- Copy from spec verbatim (band title, button, iPhone steps).
- No Play Store / App Store / QR.
- Prefer existing icons (`/icon-192.png`, `/icon-512.png`).
- SeniorEase visual tokens (navy/gold/cream) where touching styles.
- Do not commit unless the user asks.

---

## File map

| File | Responsibility |
|------|----------------|
| `public/manifest-afvinken.json` | PWA manifest: name Afvinken, start_url `/afvinken` |
| `app/afvinken/layout.tsx` | Override metadata manifest + appleWebApp title |
| `app/components/AddToHomeScreen.tsx` | Device-aware install UI |
| `app/afvinken/page.tsx` | Install band top; remove bottom green block |
| `app/layout.tsx` | Remove duplicate hardcoded manifest link (use metadata only) so page override works |

---

### Task 1: Manifest + layout override

**Files:**
- Create: `public/manifest-afvinken.json`
- Modify: `app/afvinken/layout.tsx`
- Modify: `app/layout.tsx` (remove hardcoded `<link rel="manifest">` so child metadata wins)

- [x] Create manifest with name/short_name `Afvinken`, `start_url` `/afvinken`, `scope` `/afvinken`, `display` `standalone`, theme colors matching site, icons 192/512
- [x] In afvinken layout: set `manifest: '/manifest-afvinken.json'` and `appleWebApp.title: 'Afvinken'`
- [x] Remove duplicate `<link rel="manifest" href="/manifest.json" />` from root layout head (keep metadata.manifest)
- [x] Verify `/manifest-afvinken.json` loads in browser

---

### Task 2: Rewrite AddToHomeScreen

**Files:**
- Modify: `app/components/AddToHomeScreen.tsx`

- [x] Detect: standalone, iOS, iOS Safari vs other, coarse mobile vs desktop
- [x] Branches per spec table (standalone / Android prompt / Android fallback / iOS Safari steps / iOS other + copy link / desktop tip)
- [x] Style: large touch targets, navy/gold/cream, no emoji overload
- [x] Keep optional `label` prop for button text (default “Zet op beginscherm”)

---

### Task 3: Wire Afvinken page

**Files:**
- Modify: `app/afvinken/page.tsx`

- [x] Add install band under header with title + supporting sentence + `<AddToHomeScreen />`
- [x] Delete bottom “Op telefoon zetten” green block (two columns)
- [x] Spot-check page still works for lists

---

### Task 4: Manual verify

- [x] Desktop: tip visible, no fake install button
- [x] DevTools device mode: iOS Safari path shows 3 steps; Chrome-iOS path shows Safari + copy
- [x] Confirm page HTML includes `manifest-afvinken.json` on `/afvinken`
