import 'dotenv/config';
import fetch from 'node-fetch';

const TOKEN = 

async function checkToken() {
  console.log('🔍 Token Type Controleren...\n');

  try {
    // Debug token
    console.log('📡 Token informatie ophalen...\n');
    const debugResponse = await fetch(
      `https://graph.facebook.com/v18.0/debug_token?input_token=${TOKEN}&access_token=${TOKEN}`
    );
    const debugData = await debugResponse.json();
    
    if (debugData.error) {
      console.error('❌ Token Error:', debugData.error.message);
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
    } else {
      console.log(`   Verloopt op: Nooit (long-lived token)`);
    }
    
    console.log(`   Permissions: ${tokenInfo.scopes?.join(', ') || 'N/A'}\n`);
    
    // Check wat voor token dit is
    if (tokenInfo.type === 'PAGE') {
      console.log('✅ Dit is een PAGE TOKEN!\n');
      
      // Haal pagina info op
      const pageResponse = await fetch(
        `https://graph.facebook.com/v18.0/me?access_token=${TOKEN}&fields=id,name`
      );
      const pageData = await pageResponse.json();
      
      if (pageData.error) {
        console.error('❌ Error bij ophalen pagina info:', pageData.error.message);
      } else {
        console.log('📄 Pagina Info:');
        console.log(`   Naam: ${pageData.name}`);
        console.log(`   Page ID: ${pageData.id}\n`);
        
        console.log('📋 Update je .env file met:');
        console.log(`\nFACEBOOK_PAGE_ACCESS_TOKEN=${TOKEN}`);
        console.log(`FACEBOOK_PAGE_ID=${pageData.id}\n`);
        
        // Test of we kunnen posten
        console.log('🧪 Test: Kan ik posten?');
        const testResponse = await fetch(
          `https://graph.facebook.com/v18.0/${pageData.id}?access_token=${TOKEN}&fields=id,name,perms`
        );
        const testData = await testResponse.json();
        
        if (testData.perms) {
          const canPost = testData.perms.includes('ADMINISTER') || testData.perms.includes('CREATE_CONTENT');
          console.log(`   Permissions: ${testData.perms.join(', ')}`);
          console.log(`   Kan posten: ${canPost ? '✅ Ja' : '❌ Nee'}\n`);
        }
      }
      
    } else if (tokenInfo.type === 'USER') {
      console.log('⚠️ Dit is een USER TOKEN, niet een PAGE TOKEN.\n');
      console.log('💡 We moeten een Page Token ophalen...\n');
      
      // Probeer pagina's op te halen
      const accountsResponse = await fetch(
        `https://graph.facebook.com/v18.0/me/accounts?access_token=${TOKEN}&fields=id,name,access_token`
      );
      const accountsData = await accountsResponse.json();
      
      if (accountsData.error) {
        console.error('❌ Error:', accountsData.error.message);
        console.error('\n💡 Mogelijke oplossingen:');
        console.error('  1. Token heeft niet de juiste permissions (pages_show_list nodig)');
        console.error('  2. Ga naar Graph API Explorer en genereer token met:');
        console.error('     - pages_show_list');
        console.error('     - pages_manage_posts');
      } else if (accountsData.data && accountsData.data.length > 0) {
        console.log('✅ Pagina\'s gevonden:\n');
        accountsData.data.forEach((page, index) => {
          console.log(`${index + 1}. ${page.name}`);
          console.log(`   Page ID: ${page.id}`);
          console.log(`   Page Token: ${page.access_token.substring(0, 30)}...\n`);
        });
        
        const seniorEasePage = accountsData.data.find(page => 
          page.name.toLowerCase().includes('seniorease') || 
          page.id === '898268823367107'
        );
        
        if (seniorEasePage) {
          console.log('🎯 SeniorEase pagina gevonden!\n');
          console.log('📋 Update je .env file met:');
          console.log(`\nFACEBOOK_PAGE_ACCESS_TOKEN=${seniorEasePage.access_token}`);
          console.log(`FACEBOOK_PAGE_ID=${seniorEasePage.id}\n`);
        }
      }
    } else {
      console.log(`⚠️ Onbekend token type: ${tokenInfo.type}\n`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nStack:', error.stack);
    process.exit(1);
  }
}

checkToken();





