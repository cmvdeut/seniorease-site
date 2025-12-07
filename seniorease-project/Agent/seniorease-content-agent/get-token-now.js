import 'dotenv/config';
import fetch from 'node-fetch';

const USER_TOKEN = 'EAAb0NgbtBVsBQD7SeUCncO889xf1KgZBxsXZAQhvMDZBuoh2xrxvEb874GCd0z3VtQ4za9pNj4gT9zD3KZCZCC7xdU2hon3vh6ZBdW9x5BAeij9dWkZBdJSjbev5F9cBlQptZAwC1WP8g0RZABOTyUWfFZCBH0gnMst5d1qXIhI7TqcxZCZAyAPRIVhrCpZAcv894Cith4RHMnTAvyLYUcDq2ZA21Tm0LrZBYvlWFH7ZCZCjg';

async function getPageToken() {
  console.log('🔑 Facebook Page Token Ophalen...\n');

  try {
    console.log('📡 Ophalen van je pagina\'s...\n');
    
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
      console.error('\n📋 Error details:', JSON.stringify(data.error, null, 2));
      process.exit(1);
    }
    
    if (!data.data || data.data.length === 0) {
      console.error('❌ Geen pagina\'s gevonden waar je admin van bent.');
      console.error('\n💡 Oplossingen:');
      console.error('  1. Zorg dat je admin bent van je Facebook pagina');
      console.error('  2. Gebruik een User Token met pages_show_list permission');
      console.error('  3. Ga naar Graph API Explorer en genereer een nieuwe token met:');
      console.error('     - pages_show_list');
      console.error('     - pages_manage_posts');
      process.exit(1);
    }
    
    console.log('✅ Gevonden pagina\'s:\n');
    
    data.data.forEach((page, index) => {
      console.log(`${index + 1}. ${page.name}`);
      console.log(`   Page ID: ${page.id}`);
      console.log(`   Category: ${page.category || 'N/A'}`);
      console.log(`   Page Token: ${page.access_token.substring(0, 30)}...`);
      console.log(`   Full Token: ${page.access_token}\n`);
    });
    
    // Zoek SeniorEase pagina
    const seniorEasePage = data.data.find(page => 
      page.name.toLowerCase().includes('seniorease') || 
      page.id === '898268823367107'
    );
    
    if (seniorEasePage) {
      console.log('🎯 SeniorEase pagina gevonden!\n');
      console.log('📋 Update je .env file met:');
      console.log(`\nFACEBOOK_PAGE_ACCESS_TOKEN=${seniorEasePage.access_token}`);
      console.log(`FACEBOOK_PAGE_ID=${seniorEasePage.id}\n`);
      
      // Check token expiry
      console.log('🔍 Token informatie ophalen...\n');
      const tokenInfo = await fetch(
        `https://graph.facebook.com/v18.0/debug_token?input_token=${seniorEasePage.access_token}&access_token=${USER_TOKEN}`
      );
      const tokenData = await tokenInfo.json();
      
      if (tokenData.data) {
        console.log('📊 Token Details:');
        console.log(`   Type: ${tokenData.data.type}`);
        console.log(`   Is Valid: ${tokenData.data.is_valid ? '✅ Ja' : '❌ Nee'}`);
        if (tokenData.data.expires_at) {
          const expiryDate = new Date(tokenData.data.expires_at * 1000);
          console.log(`   Verloopt op: ${expiryDate.toLocaleString('nl-NL')}`);
        } else {
          console.log(`   Verloopt op: Nooit (long-lived token)`);
        }
        console.log(`   Permissions: ${tokenData.data.scopes?.join(', ') || 'N/A'}\n`);
      }
      
    } else {
      console.log('⚠️ SeniorEase pagina niet automatisch gevonden.');
      console.log('📋 Gebruik de eerste pagina of selecteer handmatig:\n');
      
      const firstPage = data.data[0];
      console.log(`FACEBOOK_PAGE_ACCESS_TOKEN=${firstPage.access_token}`);
      console.log(`FACEBOOK_PAGE_ID=${firstPage.id}\n`);
    }
    
    console.log('✅ Klaar! Je Page Token is opgehaald.\n');
    console.log('💡 Volgende stap:');
    console.log('   1. Kopieer de FACEBOOK_PAGE_ACCESS_TOKEN en FACEBOOK_PAGE_ID');
    console.log('   2. Plak ze in je .env bestand');
    console.log('   3. Test met: npm run test-facebook\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nStack:', error.stack);
    process.exit(1);
  }
}

getPageToken();





