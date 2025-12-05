import 'dotenv/config';

async function checkToken() {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  
  console.log('🔍 Checking token info...\n');
  
  // Check /me to see what this token represents
  try {
    const meResponse = await fetch(`https://graph.facebook.com/v18.0/me?access_token=${token}`);
    const meData = await meResponse.json();
    
    console.log('📋 Token is for:');
    console.log('   Name:', meData.name || 'Unknown');
    console.log('   ID:', meData.id || 'Unknown');
    console.log('   Error:', meData.error?.message || 'None');
    console.log('');
  } catch (error) {
    console.error('Error checking /me:', error.message);
  }
  
  // Check pages this token can access
  try {
    const pagesResponse = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${token}`);
    const pagesData = await pagesResponse.json();
    
    console.log('📄 Pages this token can access:');
    if (pagesData.data && pagesData.data.length > 0) {
      pagesData.data.forEach(page => {
        console.log(`   - ${page.name} (ID: ${page.id})`);
        console.log(`     Token: ${page.access_token.substring(0, 30)}...`);
      });
      console.log('');
      console.log('💡 Use one of these page tokens and IDs in your .env!');
    } else {
      console.log('   No pages found or error:', pagesData.error?.message || 'Unknown');
    }
  } catch (error) {
    console.error('Error checking pages:', error.message);
  }
  
  // Debug token to see permissions
  try {
    const debugResponse = await fetch(`https://graph.facebook.com/v18.0/debug_token?input_token=${token}&access_token=${token}`);
    const debugData = await debugResponse.json();
    
    console.log('\n🔐 Token permissions:');
    if (debugData.data?.scopes) {
      debugData.data.scopes.forEach(scope => {
        console.log(`   ✓ ${scope}`);
      });
    }
    console.log('\n📅 Token expires:', debugData.data?.expires_at ? new Date(debugData.data.expires_at * 1000).toLocaleString() : 'Never/Long-lived');
  } catch (error) {
    console.error('Error debugging token:', error.message);
  }
}

checkToken();



