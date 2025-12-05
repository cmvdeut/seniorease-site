import 'dotenv/config';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USER_TOKEN = 'EAAb0NgbtBVsBQAj7oPtd02sTDg2UvZAHq8fH6XRPkOVT85MNOHT24zT51LnBwVbFviZCZAYAP9OpEcm9CYTfaZCCyW1BxsjvWxHJOGKVUfD0MZAY3R8VKqNF9NZA4vGMiHATcItkDDAuubd2y6kmBJSzFxmHBpRN0IuSmCbylIfZB0he2UODfGf0cyjTgZDZD';

async function getPageToken() {
  console.log('🔑 Page Token Ophalen van Long-Lived User Token...\n');

  try {
    console.log('📡 Ophalen van pagina\'s...\n');
    
    // Haal alle pagina's op waar je admin van bent
    const response = await fetch(
      `https://graph.facebook.com/v18.0/me/accounts?access_token=${USER_TOKEN}&fields=id,name,access_token,category`
    );
    
    const data = await response.json();
    
    if (data.error) {
      console.error('❌ Error:', data.error.message);
      console.error('\n💡 Mogelijke oorzaken:');
      console.error('  - Token heeft niet de juiste permissions');
      console.error('  - Token is verlopen');
      console.error('  - Je bent geen admin van een pagina');
      process.exit(1);
    }
    
    if (!data.data || data.data.length === 0) {
      console.error('❌ Geen pagina\'s gevonden waar je admin van bent.');
      console.error('\n💡 Oplossingen:');
      console.error('  1. Zorg dat je admin bent van je Facebook pagina');
      console.error('  2. Check of de token pages_show_list permission heeft');
      process.exit(1);
    }
    
    console.log('✅ Gevonden pagina\'s:\n');
    
    data.data.forEach((page, index) => {
      console.log(`${index + 1}. ${page.name}`);
      console.log(`   Page ID: ${page.id}`);
      console.log(`   Category: ${page.category || 'N/A'}`);
      console.log(`   Page Token: ${page.access_token.substring(0, 30)}...\n`);
    });
    
    // Zoek SeniorEase pagina
    const targetPageId = '898268823367107';
    const seniorEasePage = data.data.find(page => 
      page.id === targetPageId ||
      page.name.toLowerCase().includes('seniorease')
    );
    
    if (!seniorEasePage) {
      console.log('⚠️  SeniorEase pagina niet automatisch gevonden.');
      console.log('📋 Gebruik de eerste pagina:\n');
      
      const firstPage = data.data[0];
      console.log(`FACEBOOK_PAGE_ACCESS_TOKEN=${firstPage.access_token}`);
      console.log(`FACEBOOK_PAGE_ID=${firstPage.id}\n`);
      
      // Update .env
      updateEnvFile(firstPage.access_token, firstPage.id);
      
    } else {
      console.log('🎯 SeniorEase pagina gevonden!\n');
      
      // Check token expiry
      console.log('🔍 Page Token informatie ophalen...\n');
      const tokenInfoResponse = await fetch(
        `https://graph.facebook.com/v18.0/debug_token?input_token=${seniorEasePage.access_token}&access_token=${USER_TOKEN}`
      );
      const tokenInfoData = await tokenInfoResponse.json();
      
      if (tokenInfoData.data) {
        const pageTokenInfo = tokenInfoData.data;
        console.log('📊 Page Token Details:');
        console.log(`   Type: ${pageTokenInfo.type}`);
        console.log(`   Is Valid: ${pageTokenInfo.is_valid ? '✅ Ja' : '❌ Nee'}`);
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
      
      // Update .env
      updateEnvFile(seniorEasePage.access_token, seniorEasePage.id);
      
      // Test de token
      console.log('🧪 Testing Page Token met een test post...\n');
      
      const testResponse = await fetch(
        `https://graph.facebook.com/v18.0/${seniorEasePage.id}/feed`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: '✅ Long-lived Page Token test - Token werkt perfect!',
            access_token: seniorEasePage.access_token
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
    
    console.log('✅ Klaar! Je long-lived Page Token is geïnstalleerd.\n');
    console.log('💡 Volgende stappen:');
    console.log('   1. Test lokaal: node test-facebook.js');
    console.log('   2. Update Vercel environment variables');
    console.log('   3. Deploy naar Vercel voor automatisch posten\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nStack:', error.stack);
    process.exit(1);
  }
}

function updateEnvFile(pageToken, pageId) {
  const envPath = path.join(__dirname, '.env');
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Update token
  if (envContent.includes('FACEBOOK_PAGE_ACCESS_TOKEN=')) {
    envContent = envContent.replace(
      /FACEBOOK_PAGE_ACCESS_TOKEN=.*/,
      `FACEBOOK_PAGE_ACCESS_TOKEN=${pageToken}`
    );
  } else {
    envContent += `\nFACEBOOK_PAGE_ACCESS_TOKEN=${pageToken}\n`;
  }
  
  // Update page ID
  if (envContent.includes('FACEBOOK_PAGE_ID=')) {
    envContent = envContent.replace(
      /FACEBOOK_PAGE_ID=.*/,
      `FACEBOOK_PAGE_ID=${pageId}`
    );
  } else {
    envContent += `FACEBOOK_PAGE_ID=${pageId}\n`;
  }
  
  // Schrijf .env file
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file bijgewerkt!\n');
  
  console.log('📋 Nieuwe waarden:');
  console.log(`FACEBOOK_PAGE_ACCESS_TOKEN=${pageToken}`);
  console.log(`FACEBOOK_PAGE_ID=${pageId}\n`);
}

getPageToken();



