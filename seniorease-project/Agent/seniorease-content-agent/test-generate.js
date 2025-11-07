import 'dotenv/config';
import { ClaudeContentGenerator } from './lib/claude.js';

async function test() {
  console.log('🚀 Testing SeniorEase Content Generator\n');

  try {
    const generator = new ClaudeContentGenerator();
    
    console.log('Generating 3 sample posts...\n');
    const posts = await generator.generateMultiplePosts(3);

    posts.forEach((post, index) => {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`POST ${index + 1}`);
      console.log('='.repeat(60));
      console.log(`📌 TITEL: ${post.title}`);
      console.log(`📝 CATEGORIE: ${post.category || 'N/A'}`);
      console.log(`\n${post.text}`);
      console.log(`\n🏷️  HASHTAGS: ${post.hashtags.join(' ')}`);
      console.log(`\n⏰ Gegenereerd: ${new Date(post.generatedAt).toLocaleString('nl-NL')}`);
    });

    console.log(`\n\n✅ Success! ${posts.length} posts gegenereerd`);
    console.log('\n💡 Tip: Check de output en pas config/topics.json aan als gewenst\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('API key')) {
      console.log('\n⚠️  ANTHROPIC_API_KEY niet gevonden!');
      console.log('Maak een .env file met:');
      console.log('ANTHROPIC_API_KEY=jouw-api-key-hier\n');
    }
  }
}

test();
