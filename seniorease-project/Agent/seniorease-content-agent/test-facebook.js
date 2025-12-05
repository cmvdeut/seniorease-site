import { FacebookPoster } from './lib/facebook.js';
import 'dotenv/config';

async function testFacebook() {
  console.log('🧪 Testing Facebook Connection...\n');

  // Check environment variables
  if (!process.env.FACEBOOK_PAGE_ACCESS_TOKEN) {
    console.error('❌ FACEBOOK_PAGE_ACCESS_TOKEN not found in .env');
    process.exit(1);
  }

  if (!process.env.FACEBOOK_PAGE_ID) {
    console.error('❌ FACEBOOK_PAGE_ID not found in .env');
    process.exit(1);
  }

  console.log('✅ Environment variables found');
  console.log(`   Page ID: ${process.env.FACEBOOK_PAGE_ID}`);
  console.log(`   Token: ${process.env.FACEBOOK_PAGE_ACCESS_TOKEN.substring(0, 20)}...\n`);

  try {
    // Test connection
    const fb = new FacebookPoster();
    console.log('📡 Testing Facebook connection...');
    
    const testMessage = `🧪 Test post van SeniorEase Content Agent!

Dit is een test om te zien of automatische posting werkt.

Als je dit ziet, werkt alles perfect! ✅

#SeniorEase #Test`;

    console.log('\n📝 Posting test message...');
    const result = await fb.postText(testMessage, ['#SeniorEase', '#Test', '#Automatisch']);

    console.log('\n✅ SUCCESS! Post gepubliceerd!');
    console.log('📊 Result:', JSON.stringify(result, null, 2));
    console.log('\n🎉 Check je Facebook pagina - je zou de test post moeten zien!');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    
    if (error.message.includes('Invalid OAuth')) {
      console.error('\n💡 Mogelijke oplossingen:');
      console.error('   1. Check of je token nog geldig is');
      console.error('   2. Verleng je token: https://developers.facebook.com/tools/debug/accesstoken/');
      console.error('   3. Check of token permissions correct zijn (pages_manage_posts)');
    }
    
    if (error.message.includes('Page ID')) {
      console.error('\n💡 Mogelijke oplossingen:');
      console.error('   1. Check of Page ID correct is');
      console.error('   2. Ga naar je Facebook pagina → About → Page ID');
    }

    process.exit(1);
  }
}

testFacebook();




