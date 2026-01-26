/**
 * Post Foto Archief Tool naar Facebook en YouTube
 * Eenmalige post voor de nieuwe Foto Archief tool
 */

import { FacebookPoster } from './lib/facebook.js';
import dotenv from 'dotenv';

// Load environment variables (probeer eerst .env.local, dan .env)
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const FACEBOOK_MESSAGE = `📷 NIEUW: Foto Archief Tool!

Identificeer personen op oude familiefoto's met onze nieuwe tool!

✨ Wat kun je ermee?
• Upload een oude familiefoto
• Plaats nummers op personen
• Voeg namen toe aan de nummers
• Exporteer de foto met legenda

Perfect voor stamboom makers! 🌳

Probeer het nu: https://seniorease.nl/foto-archief

#SeniorEase #FotoArchief #Stamboom #Familiefotos #Senioren #Nederland`;

const YOUTUBE_DESCRIPTION = `📷 NIEUW: Foto Archief Tool op SeniorEase!

Identificeer personen op oude familiefoto's met onze nieuwe tool. Perfect voor stamboom makers!

✨ Functies:
• Upload oude familiefoto's
• Plaats genummerde markers op personen
• Voeg namen toe aan de nummers
• Exporteer de foto met legenda

Probeer het nu: https://seniorease.nl/foto-archief

#SeniorEase #FotoArchief #Stamboom #Familiefotos #Senioren`;

async function postToFacebook() {
  console.log('📘 Facebook Posting...\n');
  
  try {
    const poster = new FacebookPoster();
    
    const result = await poster.postText(FACEBOOK_MESSAGE, [
      'SeniorEase',
      'FotoArchief',
      'Stamboom',
      'Familiefotos',
      'Senioren',
      'Nederland'
    ]);
    
    if (result.success) {
      console.log('✅ Facebook post succesvol!');
      console.log(`   Post ID: ${result.postId}`);
      console.log(`   Link: https://www.facebook.com/${result.postId}\n`);
      return result;
    } else {
      console.error('❌ Facebook post mislukt:', result.error);
      return result;
    }
  } catch (error) {
    console.error('❌ Facebook error:', error.message);
    return { success: false, error: error.message };
  }
}

async function postToYouTube() {
  console.log('📺 YouTube Posting...\n');
  
  // Check of YouTube enabled is
  const youtubeEnabled = process.env.YOUTUBE_ENABLED === 'true';
  
  if (!youtubeEnabled) {
    console.log('ℹ️  YouTube posting is uitgeschakeld');
    console.log('   Zet YOUTUBE_ENABLED=true in .env.local om in te schakelen\n');
    return { enabled: false, message: 'YouTube posting is uitgeschakeld' };
  }
  
  // Check of Zapier MCP gebruikt wordt
  const useZapier = process.env.YOUTUBE_USE_ZAPIER === 'true';
  
  if (useZapier) {
    console.log('📺 YouTube via Zapier MCP...\n');
    
    const zapierWebhookUrl = process.env.ZAPIER_YOUTUBE_WEBHOOK_URL;
    
    if (!zapierWebhookUrl) {
      console.log('ℹ️  Zapier webhook URL niet ingesteld');
      console.log('   Zet ZAPIER_YOUTUBE_WEBHOOK_URL in .env.local\n');
      return { enabled: true, message: 'Zapier webhook URL niet ingesteld' };
    }
    
    // Voor YouTube community post (geen video nodig)
    const zapierPayload = {
      title: '📷 NIEUW: Foto Archief Tool!',
      description: YOUTUBE_DESCRIPTION,
      type: 'community_post', // Community post in plaats van video
      link: 'https://seniorease.nl/foto-archief'
    };
    
    try {
      const response = await fetch(zapierWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zapierPayload)
      });
      
      const result = await response.json();
      
      if (result.success || result.post_id) {
        console.log('✅ YouTube community post geplaatst via Zapier!');
        console.log(`   Post ID: ${result.post_id || 'N/A'}\n`);
        return {
          success: true,
          postId: result.post_id,
          method: 'zapier'
        };
      } else {
        throw new Error(result.error || 'Zapier post mislukt');
      }
    } catch (error) {
      console.error('❌ YouTube Zapier error:', error.message);
      return { success: false, error: error.message, method: 'zapier' };
    }
  } else {
    console.log('⚠️  Directe YouTube API vereist video bestand');
    console.log('   Aanbeveling: Gebruik Zapier MCP (zet YOUTUBE_USE_ZAPIER=true)\n');
    return { enabled: true, message: 'Directe API vereist video bestand' };
  }
}

async function main() {
  console.log('🚀 Foto Archief Tool - Social Media Posting\n');
  console.log('=' .repeat(50));
  console.log('');
  
  const results = {
    facebook: null,
    youtube: null,
    timestamp: new Date().toISOString()
  };
  
  // Facebook posting
  results.facebook = await postToFacebook();
  
  // YouTube posting
  results.youtube = await postToYouTube();
  
  // Summary
  console.log('📊 Resultaat:');
  console.log(`   Facebook: ${results.facebook?.success ? '✅' : '❌'}`);
  console.log(`   YouTube: ${results.youtube?.enabled === false ? '⏭️' : results.youtube?.success ? '✅' : '❌'}`);
  console.log('');
  
  if (results.facebook?.success) {
    console.log('🎉 Facebook post is live!');
  }
  
  if (results.youtube?.success) {
    console.log('🎉 YouTube post is live!');
  }
  
  return results;
}

// Run
main().catch(console.error);
