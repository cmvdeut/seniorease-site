#!/usr/bin/env node

/**
 * Setup & Post First Screenshot
 * ==============================
 * 
 * Configureert de .env en post de eerste screenshot
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n🔧 SeniorEase Facebook Setup\n');
console.log('============================\n');

// De credentials
const FACEBOOK_PAGE_ACCESS_TOKEN = 
const FACEBOOK_PAGE_ID = 

// Create .env file
const envContent = `# Facebook Credentials - Auto-generated
FACEBOOK_PAGE_ACCESS_TOKEN=${FACEBOOK_PAGE_ACCESS_TOKEN}
FACEBOOK_PAGE_ID=${FACEBOOK_PAGE_ID}

# Optioneel (voor content generatie)
ANTHROPIC_API_KEY=

# Gegenereerd op: ${new Date().toISOString()}
`;

const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envContent, 'utf8');
  console.log('✅ .env file aangemaakt!\n');
  
  console.log('📋 Configuratie:');
  console.log(`   Page ID: ${FACEBOOK_PAGE_ID}`);
  console.log(`   Token: ${FACEBOOK_PAGE_ACCESS_TOKEN.substring(0, 20)}...`);
  console.log('');
  
  console.log('🎯 Volgende stappen:\n');
  console.log('   1. Test de connectie:');
  console.log('      node test-facebook.js\n');
  console.log('   2. Post de eerste screenshot:');
  console.log('      node post-screenshots.js 1\n');
  console.log('   3. Bekijk alle opties:');
  console.log('      node post-screenshots.js\n');
  
  console.log('✅ Setup compleet! Je kunt nu screenshots posten.\n');
  
} catch (error) {
  console.error('❌ Fout bij aanmaken .env:', error.message);
  process.exit(1);
}

