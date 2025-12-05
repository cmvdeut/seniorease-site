#!/bin/bash

# SeniorEase Content Agent - Vercel Deployment (Bash)
# Voor Linux/Mac gebruikers

echo "🚀 SeniorEase Content Agent - Vercel Deployment"
echo "==============================================="
echo ""

# Check if vercel CLI is available
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
fi

# Step 1: Login
echo "🔐 Step 1: Login to Vercel"
echo "Je browser opent zo voor login..."
vercel login

# Step 2: Environment Variables
echo ""
echo "🔑 Step 2: Environment Variables"
echo "Plak je ANTHROPIC_API_KEY als gevraagd..."
vercel env add ANTHROPIC_API_KEY production

echo ""
echo "Plak je FACEBOOK_PAGE_ACCESS_TOKEN als gevraagd..."
vercel env add FACEBOOK_PAGE_ACCESS_TOKEN production

echo ""
echo "Plak je FACEBOOK_PAGE_ID als gevraagd..."
vercel env add FACEBOOK_PAGE_ID production

# Step 3: Link Project
echo ""
echo "🔗 Step 3: Link Project"
vercel link --yes

# Step 4: Deploy
echo ""
echo "🚀 Step 4: Deploy!"
vercel --prod

echo ""
echo "✅ Deployment compleet!"
echo "Check je Vercel dashboard voor de URL"




