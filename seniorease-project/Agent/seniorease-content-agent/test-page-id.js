import fetch from 'node-fetch';

const pageId = '61583187913768';

async function testPageId() {
  console.log('🔍 Testing Facebook Page ID...\n');
  console.log(`Page ID: ${pageId}\n`);

  try {
    // Test 1: Check if it's a page
    console.log('📡 Checking page info...');
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}?fields=id,name,category&access_token=public`
    );
    
    const data = await response.json();
    
    if (data.error) {
      console.log('❌ Error:', data.error.message);
      console.log('\n💡 Dit kan betekenen:');
      console.log('   - Het is een persoonlijk profiel (geen pagina)');
      console.log('   - De ID is niet publiek toegankelijk');
      console.log('   - We hebben een access token nodig\n');
    } else {
      console.log('✅ Page gevonden!');
      console.log(`   Naam: ${data.name}`);
      console.log(`   ID: ${data.id}`);
      console.log(`   Categorie: ${data.category || 'N/A'}\n`);
    }

    // Test 2: Check URL format
    console.log('📋 URL formats:');
    console.log(`   Profile URL: https://www.facebook.com/profile.php?id=${pageId}`);
    console.log(`   Page URL (mogelijk): https://www.facebook.com/${pageId}`);
    console.log(`   Graph API: https://graph.facebook.com/v18.0/${pageId}\n`);

    console.log('💡 Voor Zapier:');
    console.log('   - Gebruik de Page ID: ' + pageId);
    console.log('   - Of probeer de naam van de pagina in Zapier\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testPageId();



