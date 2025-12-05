import 'dotenv/config';
import fetch from 'node-fetch';

async function checkToken() {
  console.log('🔍 Checking Facebook Token Permissions...\n');

  if (!process.env.FACEBOOK_PAGE_ACCESS_TOKEN) {
    console.error('❌ FACEBOOK_PAGE_ACCESS_TOKEN not found in .env');
    process.exit(1);
  }

  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  try {
    // Check token info
    console.log('📡 Checking token info...');
    const debugResponse = await fetch(`https://graph.facebook.com/v18.0/debug_token?input_token=${token}&access_token=${token}`);
    const debugData = await debugResponse.json();

    if (debugData.data) {
      console.log('📊 Token Info:');
      console.log(`   Type: ${debugData.data.type}`);
      console.log(`   App ID: ${debugData.data.app_id}`);
      console.log(`   User/Page ID: ${debugData.data.user_id}`);
      console.log(`   Expires: ${debugData.data.expires_at ? new Date(debugData.data.expires_at * 1000).toLocaleString() : 'Never'}`);
      console.log(`   Scopes: ${debugData.data.scopes?.join(', ') || 'N/A'}\n`);

      // Check if it's a page token
      if (debugData.data.type === 'PAGE') {
        console.log('✅ This is a PAGE token!');
        
        // Check permissions
        const hasManagePosts = debugData.data.scopes?.includes('pages_manage_posts');
        const hasReadEngagement = debugData.data.scopes?.includes('pages_read_engagement');
        
        console.log(`\n📋 Permissions:`);
        console.log(`   pages_manage_posts: ${hasManagePosts ? '✅' : '❌'}`);
        console.log(`   pages_read_engagement: ${hasReadEngagement ? '✅' : '❌'}`);

        if (!hasManagePosts || !hasReadEngagement) {
          console.log('\n❌ Missing required permissions!');
          console.log('\n💡 Solution:');
          console.log('   1. Go to: https://developers.facebook.com/tools/explorer/');
          console.log('   2. Select your SeniorEase PAGE (not personal account)');
          console.log('   3. Click "Generate Access Token"');
          console.log('   4. Make sure these permissions are selected:');
          console.log('      - pages_manage_posts');
          console.log('      - pages_read_engagement');
          console.log('   5. Copy the new token');
          console.log('   6. Update FACEBOOK_PAGE_ACCESS_TOKEN in .env');
        } else {
          console.log('\n✅ All required permissions are present!');
        }
      } else {
        console.log('❌ This is NOT a PAGE token!');
        console.log(`   Current type: ${debugData.data.type}`);
        console.log('\n💡 Solution:');
        console.log('   1. Go to: https://developers.facebook.com/tools/explorer/');
        console.log('   2. Click "Get Token" → "Get Page Access Token"');
        console.log('   3. Select your SeniorEase PAGE');
        console.log('   4. Choose permissions: pages_manage_posts, pages_read_engagement');
        console.log('   5. Copy the PAGE token (not user token)');
        console.log('   6. Update FACEBOOK_PAGE_ACCESS_TOKEN in .env');
      }

      // Check page info
      console.log('\n📡 Checking page info...');
      const pageResponse = await fetch(`https://graph.facebook.com/v18.0/me?fields=name,id&access_token=${token}`);
      const pageData = await pageResponse.json();

      if (pageData.id && !pageData.error) {
        console.log(`   Page Name: ${pageData.name}`);
        console.log(`   Page ID: ${pageData.id}`);
        
        if (pageData.id !== process.env.FACEBOOK_PAGE_ID) {
          console.log(`\n⚠️  Page ID mismatch!`);
          console.log(`   .env has: ${process.env.FACEBOOK_PAGE_ID}`);
          console.log(`   Token shows: ${pageData.id}`);
          console.log('\n💡 Update FACEBOOK_PAGE_ID in .env to:', pageData.id);
        }
      }

    } else if (debugData.error) {
      console.error('❌ Error:', debugData.error.message);
      console.error('\n💡 Your token might be invalid or expired.');
      console.error('   Get a new token: https://developers.facebook.com/tools/explorer/');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkToken();




