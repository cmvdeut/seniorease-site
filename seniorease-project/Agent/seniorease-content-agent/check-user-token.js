import fetch from 'node-fetch';

const userToken = process.argv[2];

if (!userToken) {
  console.error('❌ Geen token opgegeven.');
  process.exit(1);
}

async function checkToken() {
  console.log('🔍 Checking User Token...\n');
  
  try {
    // Check token info
    const debugResponse = await fetch(
      `https://graph.facebook.com/v18.0/debug_token?input_token=${userToken}&access_token=${userToken}`
    );
    const debugData = await debugResponse.json();
    
    if (debugData.error) {
      console.error('❌ Error:', debugData.error.message);
      process.exit(1);
    }
    
    if (debugData.data) {
      console.log('📊 Token Info:');
      console.log(`   Type: ${debugData.data.type}`);
      console.log(`   App ID: ${debugData.data.app_id}`);
      console.log(`   User ID: ${debugData.data.user_id}`);
      console.log(`   Expires: ${debugData.data.expires_at ? new Date(debugData.data.expires_at * 1000).toLocaleString() : 'Never'}`);
      console.log(`   Scopes: ${debugData.data.scopes?.join(', ') || 'N/A'}\n`);
      
      // Check permissions
      const hasPagesShowList = debugData.data.scopes?.includes('pages_show_list');
      const hasPagesManagePosts = debugData.data.scopes?.includes('pages_manage_posts');
      const hasPagesReadEngagement = debugData.data.scopes?.includes('pages_read_engagement');
      
      console.log('📋 Permissions:');
      console.log(`   pages_show_list: ${hasPagesShowList ? '✅' : '❌'}`);
      console.log(`   pages_manage_posts: ${hasPagesManagePosts ? '✅' : '❌'}`);
      console.log(`   pages_read_engagement: ${hasPagesReadEngagement ? '✅' : '❌'}\n`);
      
      if (!hasPagesShowList) {
        console.log('⚠️  Je mist de pages_show_list permission!');
        console.log('   Dit is nodig om je pagina\'s te zien.\n');
      }
      
      // Try to get pages
      console.log('📡 Proberen pagina\'s op te halen...\n');
      const pagesResponse = await fetch(
        `https://graph.facebook.com/v18.0/me/accounts?access_token=${userToken}`
      );
      const pagesData = await pagesResponse.json();
      
      if (pagesData.error) {
        console.error('❌ Error bij ophalen pagina\'s:', pagesData.error.message);
        console.error(`   Code: ${pagesData.error.code}`);
        console.error(`   Type: ${pagesData.error.type}\n`);
      } else if (pagesData.data && pagesData.data.length > 0) {
        console.log('✅ Pagina\'s gevonden:');
        pagesData.data.forEach((page, index) => {
          console.log(`   ${index + 1}. ${page.name} (ID: ${page.id})`);
        });
      } else {
        console.log('❌ Geen pagina\'s gevonden.');
        console.log('   Dit kan betekenen:');
        console.log('   - Je bent geen admin van een pagina');
        console.log('   - De token heeft niet de juiste permissions\n');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkToken();



