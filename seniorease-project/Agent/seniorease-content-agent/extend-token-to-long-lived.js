#!/usr/bin/env node

/**
 * Extend Facebook Token to Long-Lived
 * ====================================
 * 
 * Dit script verlengt een Page Token naar een long-lived token.
 * 
 * Voor een Page Token:
 * 1. We hebben een User Token nodig (of maken er een)
 * 2. Met die User Token halen we een Page Token op via /me/accounts
 * 3. Page Tokens die gemaakt zijn met een long-lived User Token zijn automatisch long-lived
 */

import 'dotenv/config';
import fetch from 'node-fetch';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

async function extendToken() {
  console.log('🔑 Facebook Token Verlengen naar Long-Lived\n');
  console.log('='.repeat(60));
  console.log('');

  // Stap 1: Check huidige token
  const currentToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  if (!currentToken) {
    console.error('❌ FACEBOOK_PAGE_ACCESS_TOKEN niet gevonden in .env');
    process.exit(1);
  }

  console.log('📊 Huidige Token Info:\n');
  
  try {
    // Debug huidige token
    const debugResponse = await fetch(
      `https://graph.facebook.com/v18.0/debug_token?input_token=${currentToken}&access_token=${currentToken}`
    );
    const debugData = await debugResponse.json();
    
    if (debugData.error) {
      console.error('❌ Token Error:', debugData.error.message);
      process.exit(1);
    }
    
    const tokenInfo = debugData.data;
    console.log(`   Type: ${tokenInfo.type}`);
    console.log(`   Is Valid: ${tokenInfo.is_valid ? '✅ Ja' : '❌ Nee'}`);
    
    if (tokenInfo.expires_at) {
      const expiryDate = new Date(tokenInfo.expires_at * 1000);
      const now = new Date();
      const daysLeft = Math.floor((tokenInfo.expires_at * 1000 - now.getTime()) / (1000 * 60 * 60 * 24));
      console.log(`   Verloopt op: ${expiryDate.toLocaleString('nl-NL')}`);
      console.log(`   Dagen over: ${daysLeft}`);
      
      if (daysLeft > 50) {
        console.log('\n✅ Token is al long-lived (meer dan 50 dagen)!');
        rl.close();
        return;
      }
    } else {
      console.log(`   Verloopt op: Nooit (al long-lived)`);
      console.log('\n✅ Token is al long-lived!');
      rl.close();
      return;
    }
    
    console.log(`   App ID: ${tokenInfo.app_id}\n`);
    
    // Stap 2: Vraag App ID en Secret
    console.log('📋 We hebben App ID en App Secret nodig om een long-lived token te maken.\n');
    console.log('💡 Je kunt deze vinden in:');
    console.log('   https://developers.facebook.com/apps/');
    console.log('   → Selecteer je app');
    console.log('   → Settings → Basic\n');
    
    const appId = await question('App ID: ');
    const appSecret = await question('App Secret: ');
    
    if (!appId || !appSecret) {
      console.error('❌ App ID en App Secret zijn verplicht');
      rl.close();
      process.exit(1);
    }
    
    console.log('\n📡 Stap 1: Long-lived User Token maken...\n');
    
    // Voor een Page Token moeten we eerst een User Token hebben
    // We proberen een User Token te krijgen via de app
    console.log('⚠️  Voor een long-lived Page Token hebben we een User Token nodig.');
    console.log('💡 Optie 1: Haal een User Token op via Graph API Explorer');
    console.log('   → https://developers.facebook.com/tools/explorer/');
    console.log('   → Klik "Get Token" → "Get User Access Token"');
    console.log('   → Selecteer permissions: pages_show_list, pages_manage_posts');
    console.log('   → Kopieer de token\n');
    
    const userToken = await question('Plak je User Access Token (of druk Enter om te stoppen): ');
    
    if (!userToken || userToken.trim() === '') {
      console.log('\n❌ Geannuleerd. Je kunt dit later opnieuw proberen.');
      rl.close();
      process.exit(0);
    }
    
    // Verleng User Token naar long-lived
    console.log('\n📡 Stap 2: User Token verlengen naar long-lived...\n');
    
    const extendUserTokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${userToken}`;
    
    const extendResponse = await fetch(extendUserTokenUrl);
    const extendData = await extendResponse.json();
    
    if (extendData.error) {
      console.error('❌ Error bij verlengen User Token:', extendData.error.message);
      console.error('\n💡 Mogelijke oorzaken:');
      console.error('   - App ID of Secret is incorrect');
      console.error('   - User Token is niet geldig');
      console.error('   - User Token heeft niet de juiste permissions');
      rl.close();
      process.exit(1);
    }
    
    const longLivedUserToken = extendData.access_token;
    const expiresIn = extendData.expires_in;
    const expiresInDays = Math.floor(expiresIn / (60 * 60 * 24));
    
    console.log('✅ User Token verlengd!');
    console.log(`   Verloopt over: ${expiresInDays} dagen\n`);
    
    // Stap 3: Haal Page Token op met long-lived User Token
    console.log('📡 Stap 3: Long-lived Page Token ophalen...\n');
    
    const accountsResponse = await fetch(
      `https://graph.facebook.com/v18.0/me/accounts?access_token=${longLivedUserToken}&fields=id,name,access_token`
    );
    const accountsData = await accountsResponse.json();
    
    if (accountsData.error) {
      console.error('❌ Error bij ophalen pagina\'s:', accountsData.error.message);
      rl.close();
      process.exit(1);
    }
    
    if (!accountsData.data || accountsData.data.length === 0) {
      console.error('❌ Geen pagina\'s gevonden');
      rl.close();
      process.exit(1);
    }
    
    console.log('✅ Pagina\'s gevonden:\n');
    accountsData.data.forEach((page, index) => {
      console.log(`${index + 1}. ${page.name} (ID: ${page.id})`);
    });
    
    // Zoek SeniorEase pagina
    const targetPageId = pageId || '898268823367107';
    const seniorEasePage = accountsData.data.find(page => 
      page.id === targetPageId ||
      page.name.toLowerCase().includes('seniorease')
    );
    
    if (!seniorEasePage) {
      console.log('\n⚠️  SeniorEase pagina niet gevonden. Gebruik de eerste pagina.');
      const selectedPage = accountsData.data[0];
      console.log(`\n📋 Update je .env file met:`);
      console.log(`\nFACEBOOK_PAGE_ACCESS_TOKEN=${selectedPage.access_token}`);
      console.log(`FACEBOOK_PAGE_ID=${selectedPage.id}\n`);
    } else {
      console.log(`\n🎯 SeniorEase pagina gevonden: ${seniorEasePage.name}\n`);
      
      // Check of deze Page Token long-lived is
      const pageTokenDebugResponse = await fetch(
        `https://graph.facebook.com/v18.0/debug_token?input_token=${seniorEasePage.access_token}&access_token=${longLivedUserToken}`
      );
      const pageTokenDebugData = await pageTokenDebugResponse.json();
      
      if (pageTokenDebugData.data) {
        const pageTokenInfo = pageTokenDebugData.data;
        console.log('📊 Nieuwe Page Token Info:');
        console.log(`   Type: ${pageTokenInfo.type}`);
        if (pageTokenInfo.expires_at) {
          const expiryDate = new Date(pageTokenInfo.expires_at * 1000);
          const now = new Date();
          const daysLeft = Math.floor((pageTokenInfo.expires_at * 1000 - now.getTime()) / (1000 * 60 * 60 * 24));
          console.log(`   Verloopt op: ${expiryDate.toLocaleString('nl-NL')}`);
          console.log(`   Dagen over: ${daysLeft}`);
        } else {
          console.log(`   Verloopt op: Nooit (long-lived!)`);
        }
        console.log(`   Permissions: ${pageTokenInfo.scopes?.join(', ') || 'N/A'}\n`);
      }
      
      console.log('📋 Update je .env file met:');
      console.log(`\nFACEBOOK_PAGE_ACCESS_TOKEN=${seniorEasePage.access_token}`);
      console.log(`FACEBOOK_PAGE_ID=${seniorEasePage.id}\n`);
      
      // Update .env automatisch?
      const autoUpdate = await question('Wil je de .env file automatisch updaten? (j/n): ');
      
      if (autoUpdate.toLowerCase() === 'j' || autoUpdate.toLowerCase() === 'y') {
        const fs = await import('fs');
        const path = await import('path');
        const { fileURLToPath } = await import('url');
        
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const envPath = path.join(__dirname, '.env');
        
        let envContent = '';
        if (fs.existsSync(envPath)) {
          envContent = fs.readFileSync(envPath, 'utf8');
        }
        
        // Update token
        if (envContent.includes('FACEBOOK_PAGE_ACCESS_TOKEN=')) {
          envContent = envContent.replace(
            /FACEBOOK_PAGE_ACCESS_TOKEN=.*/,
            `FACEBOOK_PAGE_ACCESS_TOKEN=${seniorEasePage.access_token}`
          );
        } else {
          envContent += `\nFACEBOOK_PAGE_ACCESS_TOKEN=${seniorEasePage.access_token}\n`;
        }
        
        // Update page ID
        if (envContent.includes('FACEBOOK_PAGE_ID=')) {
          envContent = envContent.replace(
            /FACEBOOK_PAGE_ID=.*/,
            `FACEBOOK_PAGE_ID=${seniorEasePage.id}`
          );
        } else {
          envContent += `FACEBOOK_PAGE_ID=${seniorEasePage.id}\n`;
        }
        
        fs.writeFileSync(envPath, envContent);
        console.log('\n✅ .env file bijgewerkt!\n');
      }
    }
    
    console.log('✅ Klaar! Je hebt nu een long-lived Page Token!');
    console.log('\n💡 Test de nieuwe token:');
    console.log('   node test-facebook.js\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nStack:', error.stack);
  } finally {
    rl.close();
  }
}

extendToken();





