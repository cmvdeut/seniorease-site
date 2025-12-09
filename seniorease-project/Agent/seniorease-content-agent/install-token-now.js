import 'dotenv/config';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NEW_TOKEN = 

async function installToken() {
  console.log('🔑 Long-Lived Facebook Token Installeren...\n');

  try {
    console.log('📡 Token informatie ophalen...\n');
    
    // Debug token
    const debugResponse = await fetch(
      `https://graph.facebook.com/v18.0/debug_token?input_token=${NEW_TOKEN}&access_token=${NEW_TOKEN}`
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
      
      if (daysLeft > 50) {
        console.log('\n✅ Token is long-lived! (meer dan 50 dagen)');
      }
    } else {
      console.log(`   Verloopt op: Nooit (permanent long-lived!)`);
      console.log('\n✅ Token is permanent long-lived!');
    }
    
    console.log(`   Permissions: ${tokenInfo.scopes?.join(', ') || 'N/A'}\n`);
    
    // Haal pagina info op
    if (tokenInfo.type === 'PAGE') {
      const pageResponse = await fetch(
        `https://graph.facebook.com/v18.0/me?access_token=${NEW_TOKEN}&fields=id,name`
      );
      const pageData = await pageResponse.json();
      
      if (pageData.error) {
        console.error('❌ Error bij ophalen pagina info:', pageData.error.message);
        process.exit(1);
      }
      
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
          `FACEBOOK_PAGE_ACCESS_TOKEN=${NEW_TOKEN}`
        );
      } else {
        envContent += `\nFACEBOOK_PAGE_ACCESS_TOKEN=${NEW_TOKEN}\n`;
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
      console.log(`FACEBOOK_PAGE_ACCESS_TOKEN=${NEW_TOKEN}`);
      console.log(`FACEBOOK_PAGE_ID=${pageData.id}\n`);
      
      // Test de token
      console.log('🧪 Testing token met een test post...\n');
      
      const testResponse = await fetch(
        `https://graph.facebook.com/v18.0/${pageData.id}/feed`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: '✅ Long-lived token test - Token werkt perfect!',
            access_token: NEW_TOKEN
          })
        }
      );
      
      const testData = await testResponse.json();
      
      if (testData.error) {
        console.error('❌ Test gefaald:', testData.error.message);
        console.error('   Code:', testData.error.code);
        console.error('   Type:', testData.error.type);
      } else {
        console.log('✅ Test succesvol!');
        console.log(`   Post ID: ${testData.id}`);
        console.log(`   Link: https://www.facebook.com/${testData.id}\n`);
        console.log('🎉 Check je Facebook pagina - je zou een test post moeten zien!\n');
      }
      
      console.log('✅ Klaar! Je long-lived token is geïnstalleerd.\n');
      console.log('💡 Volgende stappen:');
      console.log('   1. Test lokaal: node test-facebook.js');
      console.log('   2. Update Vercel environment variables (zie hieronder)');
      console.log('   3. Deploy naar Vercel voor automatisch posten\n');
      
      console.log('📋 Vercel Commands:');
      console.log('\n1. Verwijder oude token:');
      console.log(`   vercel env rm FACEBOOK_PAGE_ACCESS_TOKEN production --yes`);
      console.log('\n2. Voeg nieuwe token toe:');
      console.log(`   echo "${NEW_TOKEN}" | vercel env add FACEBOOK_PAGE_ACCESS_TOKEN production`);
      console.log('\n3. Update Page ID:');
      console.log(`   echo "${pageData.id}" | vercel env add FACEBOOK_PAGE_ID production`);
      console.log('\n4. Deploy:');
      console.log(`   vercel --prod\n`);
      
    } else {
      console.error('❌ Dit is geen Page Token. Je hebt een Page Access Token nodig.');
      console.error(`   Token type: ${tokenInfo.type}`);
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nStack:', error.stack);
    process.exit(1);
  }
}

installToken();






