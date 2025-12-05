import 'dotenv/config';
import fetch from 'node-fetch';
import { ClaudeContentGenerator } from './lib/claude.js';

async function testZapier() {
  console.log('🧪 Testing Zapier Integration...\n');

  // Check environment variables
  const zapierUrl = process.env.ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/25462834/uzfjd74/';
  
  if (!zapierUrl) {
    console.error('❌ ZAPIER_WEBHOOK_URL not found in .env');
    process.exit(1);
  }

  console.log('✅ Zapier webhook URL found');
  console.log(`   URL: ${zapierUrl.substring(0, 50)}...\n`);

  try {
    // 1. Genereer test content
    console.log('📝 Generating test content...');
    const generator = new ClaudeContentGenerator();
    const posts = await generator.generateMultiplePosts(1);
    const post = posts[0];

    console.log(`✅ Content generated: ${post.title}\n`);

    // 2. Format voor Facebook
    const facebookMessage = `${post.title}\n\n${post.text}\n\n${post.hashtags.join(' ')}`;

    console.log('📤 Sending to Zapier...');
    console.log(`   Message preview: ${facebookMessage.substring(0, 100)}...\n`);

    // 3. Stuur naar Zapier
    const response = await fetch(zapierUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: facebookMessage,
        title: post.title,
        text: post.text,
        hashtags: post.hashtags,
        category: post.category,
        generated_at: post.generatedAt
      })
    });

    const result = await response.json();

    console.log('✅ SUCCESS! Sent to Zapier');
    console.log('📊 Zapier Response:', JSON.stringify(result, null, 2));
    console.log('\n🎉 Check je Zapier dashboard en Facebook pagina!');
    console.log('   - Zapier zou een nieuwe task moeten hebben');
    console.log('   - Facebook zou een nieuwe post moeten hebben\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    
    if (error.message.includes('fetch')) {
      console.error('\n💡 Mogelijke oplossingen:');
      console.error('   1. Check of je internet verbinding hebt');
      console.error('   2. Check of de Zapier webhook URL correct is');
      console.error('   3. Check of je Zap actief is in Zapier');
    }

    process.exit(1);
  }
}

testZapier();



