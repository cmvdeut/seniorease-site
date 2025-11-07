# 🚀 SeniorEase Content Agent - Handmatige Setup

Als de zip niet werkt, volg dan deze stappen om het project handmatig op te zetten.

## STAP 1: Maak de basis folder structuur

```bash
mkdir seniorease-content-agent
cd seniorease-content-agent
mkdir -p api lib config content
```

## STAP 2: Initialiseer NPM

```bash
npm init -y
npm install @anthropic-ai/sdk@^0.30.0 node-fetch@^3.3.2 dotenv@^16.4.5
```

## STAP 3: Maak de bestanden aan

Ik geef je nu alle bestanden die je moet maken. Copy-paste de inhoud:

### 📄 `package.json`

Vervang de inhoud met:

```json
{
  "name": "seniorease-content-agent",
  "version": "1.0.0",
  "description": "Automated content generator for SeniorEase social media",
  "type": "module",
  "scripts": {
    "dev": "vercel dev",
    "test-generate": "node test-generate.js"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.30.0",
    "node-fetch": "^3.3.2",
    "dotenv": "^16.4.5"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 📄 `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/schedule-posts",
      "schedule": "0 10 * * 1,3,5"
    }
  ],
  "env": {
    "ANTHROPIC_API_KEY": "@anthropic_api_key",
    "FACEBOOK_PAGE_ACCESS_TOKEN": "@facebook_page_access_token",
    "FACEBOOK_PAGE_ID": "@facebook_page_id"
  }
}
```

### 📄 `.env`

```bash
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
FACEBOOK_PAGE_ACCESS_TOKEN=EAAxxxxx
FACEBOOK_PAGE_ID=123456789
CRON_SECRET=jouw-random-secret-hier
```

### 📄 `.gitignore`

```
node_modules/
.env
.env.local
.vercel
*.log
.DS_Store
dist/
build/
.cache/
```

## STAP 4: Config bestand

### 📄 `config/topics.json`

Zie de volgende pagina voor de volledige topics configuratie...

---

## Alternatief: GitHub Clone

Of wacht tot ik de code op GitHub zet, dan kun je gewoon clonen:

```bash
git clone https://github.com/jouw-username/seniorease-content-agent
cd seniorease-content-agent
npm install
```

---

## Test het!

Na setup:

```bash
# Vul eerst je .env in met je Claude API key!

npm run test-generate
```

Je zou nu 3 sample posts moeten zien! ✅
