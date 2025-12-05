import 'dotenv/config';
import fetch from 'node-fetch';

async function findPageId() {
  console.log('🔍 Finding your Facebook Page ID...\n');

  if (!process.env.FACEBOOK_PAGE_ACCESS_TOKEN) {
    console.error('❌ FACEBOOK_PAGE_ACCESS_TOKEN not found in .env');
    process.exit(1);
  }

  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  try {
    // Methode 1: Via /me endpoint
    console.log('📡 Trying /me endpoint...');
    const meResponse = await fetch(`https://graph.facebook.com/v18.0/me?access_token=${token}`);
    const meData = await meResponse.json();

    if (meData.id && !meData.error) {
      console.log('✅ Found Page ID via /me:');
      console.log(`   Page ID: ${meData.id}`);
      console.log(`   Page Name: ${meData.name || 'N/A'}\n`);
      
      console.log('📝 Update your .env file:');
      console.log(`   FACEBOOK_PAGE_ID=${meData.id}\n`);
      return meData.id;
    }

    // Methode 2: Via /accounts endpoint (als je een user token hebt)
    console.log('📡 Trying /accounts endpoint...');
    const accountsResponse = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${token}`);
    const accountsData = await accountsResponse.json();

    if (accountsData.data && accountsData.data.length > 0) {
      console.log('✅ Found pages via /accounts:');
      accountsData.data.forEach((page, index) => {
        console.log(`\n   Page ${index + 1}:`);
        console.log(`   Name: ${page.name}`);
        console.log(`   Page ID: ${page.id}`);
        console.log(`   Access Token: ${page.access_token.substring(0, 20)}...`);
      });

      const firstPage = accountsData.data[0];
      console.log('\n📝 Update your .env file:');
      console.log(`   FACEBOOK_PAGE_ID=${firstPage.id}`);
      console.log(`   FACEBOOK_PAGE_ACCESS_TOKEN=${firstPage.access_token}\n`);
      
      console.log('⚠️  Note: Use the Page Access Token from above, not your user token!');
      return firstPage.id;
    }

    // Methode 3: Check current token info
    console.log('📡 Checking token info...');
    const debugResponse = await fetch(`https://graph.facebook.com/v18.0/debug_token?input_token=${token}&access_token=${token}`);
    const debugData = await debugResponse.json();

    if (debugData.data) {
      console.log('📊 Token Info:');
      console.log(`   Type: ${debugData.data.type}`);
      console.log(`   App ID: ${debugData.data.app_id}`);
      console.log(`   User ID: ${debugData.data.user_id}`);
      console.log(`   Scopes: ${debugData.data.scopes?.join(', ') || 'N/A'}\n`);

      if (debugData.data.type === 'PAGE') {
        console.log('✅ This is a Page Token!');
        console.log(`   Page ID: ${debugData.data.user_id}`);
        console.log('\n📝 Update your .env file:');
        console.log(`   FACEBOOK_PAGE_ID=${debugData.data.user_id}\n`);
        return debugData.data.user_id;
      }
    }

    // Als niets werkt
    if (meData.error) {
      console.error('❌ Error:', meData.error.message);
      console.error('\n💡 Possible solutions:');
      console.error('   1. Check if your token is valid');
      console.error('   2. Make sure you have a PAGE token, not a USER token');
      console.error('   3. Go to your Facebook page → About → Page ID (at the bottom)');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\n💡 Manual method:');
    console.error('   1. Go to your Facebook page');
    console.error('   2. Click "About"');
    console.error('   3. Scroll to bottom');
    console.error('   4. Find "Page ID"');
  }
}

findPageId();




