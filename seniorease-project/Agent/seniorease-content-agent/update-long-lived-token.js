#!/usr/bin/env node

/**
 * Update Long-Lived Facebook Token
 * =================================
 * 
 * Script om een long-lived token te installeren en te verifiëren
 */

import 'dotenv/config';
import fetch from 'node-fetch';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

async function updateToken() {
  console.log('🔑 Long-Lived Facebook Token Installeren\n');
  console.log('='.repeat(60));
  console.log('');

  // Vraag om de token
  const newToken = await question('Plak je long-lived Page Access Token: ');
  
  if (!newToken || !newToken.startsWith('EAA')) {
    console.error('\n❌ Ongeldige token. Token moet beginnen met EAA');
    rl.close();
    process.exit(1);
  }

  console.log('\n📡 Token informatie ophalen...\n');

  try {
    // Debug token
    const debugResponse = await fetch(
      `https://graph.facebook.com/v18.0/debug_token?input_token=${newToken}&access_token=${newToken}`
    );
    const debugData = await debugResponse.json();
    
    if (debugData.error) {
      console.error('❌ Token Error:', debugData.error.message);
      rl.close();
      process.exit(1);
    }
    
    const tokenInfo = debugData.data;
    console.log('📊 Token Details:');
    console.log(`   Type: ${tokenInfo.type}`);
    console.log(`   Is Valid: ${tokenInfo.is_valid ? '✅ Ja' : '❌ Nee'}`);
    console.log(`   App ID: ${tokenInfo.app_id}`);
    
    if (tokenInfo.expires_at) {
      const expiryDate = new Date(tokenInfo.expires_at * 1000);
      const now = new Date();
      const daysLeft = Math.floor((tokenInfo.expires_at * 1000 - now.getTime()) / (1000 * 60 * 60 * 24));
      console.log(`   Verloopt op: ${expiryDate.toLocaleString('nl-NL')}`);
      console.log(`   Dagen over: ${daysLeft}`);
      
      if (daysLeft > 50) {
        console.log('\n✅ Token is long-lived! (meer dan 50 dagen)');
      } else if (daysLeft > 0) {
        console.log(`\n⚠️  Token verloopt over ${daysLeft} dagen (niet echt long-lived)`);
      }
    } else {
      console.log(`   Verloopt op: Nooit (permanent long-lived!)`);
      console.log('\n✅ Token is permanent long-lived!');
    }
    
    console.log(`   Permissions: ${tokenInfo.scopes?.join(', ') || 'N/A'}\n`);
    
    // Haal pagina info op
    if (tokenInfo.type === 'PAGE') {
      const pageResponse = await fetch(
        `https://graph.facebook.com/v18.0/me?access_token=${newToken}&fields=id,name`
      );
      const pageData = await pageResponse.json();
      
      if (pageData.error) {
        console.error('❌ Error bij ophalen pagina info:', pageData.error.message);
      } else {
        console.log('📄 Pagina Info:');
        console.log(`   Naam: ${pageData.name}`);
        console.log(`   Page ID: ${pageData.id}\n`);
        
        // Update .env file
        const envPath = path.join(__dirname, '.env');
        let envContent = '';
        
        if (fs.existsSync(envPath)) {
          envContent = fs.readFileSync(envPath, 'utf8');
        }
        
        // Update token
        if (envContent.includes('FACEBOOK_PAGE_ACCESS_TOKEN=')) {
          envContent = envContent.replace(
            /FACEBOOK_PAGE_ACCESS_TOKEN=.*/,
            `FACEBOOK_PAGE_ACCESS_TOKEN=${newToken}`
          );
        } else {
          envContent += `\nFACEBOOK_PAGE_ACCESS_TOKEN=${newToken}\n`;
        }
        
        // Update page ID
        if (envContent.includes('FACEBOOK_PAGE_ID=')) {
          envContent = envContent.replace(
            /FACEBOOK_PAGE_ID=.*/,
            `FACEBOOK_PAGE_ID=${pageData.id}`
          );
        } else {
          envContent += `FACEBOOK_PAGE_ID=${pageData.id}\n`;
        }
        
        // Schrijf .env file
        fs.writeFileSync(envPath, envContent);
        console.log('✅ .env file bijgewerkt!\n');
        
        console.log('📋 Nieuwe waarden:');
        console.log(`FACEBOOK_PAGE_ACCESS_TOKEN=${newToken}`);
        console.log(`FACEBOOK_PAGE_ID=${pageData.id}\n`);
        
        // Vraag of we moeten testen
        const testNow = await question('Wil je de token nu testen? (j/n): ');
        
        if (testNow.toLowerCase() === 'j' || testNow.toLowerCase() === 'y') {
          console.log('\n🧪 Testing token...\n');
          
          const testResponse = await fetch(
            `https://graph.facebook.com/v18.0/${pageData.id}/feed`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: '🧪 Test: Long-lived token werkt!',
                access_token: newToken
              })
            }
          );
          
          const testData = await testResponse.json();
          
          if (testData.error) {
            console.error('❌ Test gefaald:', testData.error.message);
          } else {
            console.log('✅ Test succesvol!');
            console.log(`   Post ID: ${testData.id}`);
            console.log(`   Link: https://www.facebook.com/${testData.id}\n`);
            console.log('🎉 Check je Facebook pagina - je zou een test post moeten zien!\n');
          }
        }
        
        // Vraag of we naar Vercel moeten pushen
        const updateVercel = await question('\nWil je deze token ook toevoegen aan Vercel? (j/n): ');
        
        if (updateVercel.toLowerCase() === 'j' || updateVercel.toLowerCase() === 'y') {
          console.log('\n📋 Vercel Commands:');
          console.log('\n1. Verwijder oude token:');
          console.log(`   vercel env rm FACEBOOK_PAGE_ACCESS_TOKEN production --yes`);
          console.log('\n2. Voeg nieuwe token toe:');
          console.log(`   echo "${newToken}" | vercel env add FACEBOOK_PAGE_ACCESS_TOKEN production`);
          console.log('\n3. Update Page ID:');
          console.log(`   echo "${pageData.id}" | vercel env add FACEBOOK_PAGE_ID production`);
          console.log('\n4. Deploy:');
          console.log(`   vercel --prod\n`);
        }
        
        console.log('✅ Klaar! Je long-lived token is geïnstalleerd.\n');
        console.log('💡 Volgende stap:');
        console.log('   → Test lokaal: node test-facebook.js');
        console.log('   → Of deploy naar Vercel voor automatisch posten\n');
      }
    } else {
      console.error('❌ Dit is geen Page Token. Je hebt een Page Access Token nodig.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nStack:', error.stack);
  } finally {
    rl.close();
  }
}

updateToken();










