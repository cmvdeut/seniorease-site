/**
 * Post to All Platforms
 * Automatische posting naar Facebook én YouTube
 * Wordt aangeroepen door Vercel cron job op Ma/Wo/Vr om 10:00
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from 'node-fetch';
import FormData from 'form-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import Facebook poster
import { FacebookPoster } from '../lib/facebook.js';

// Note: googleapis wordt dynamisch geïmporteerd in postVideoToYouTube functie

// Import YouTube workflow (we gebruiken de functies direct)
// Note: YouTube upload vereist een video bestand, niet een screenshot
// Voor nu doen we alleen Facebook screenshot posting
// YouTube kan later worden toegevoegd als er video's beschikbaar zijn

/**
 * Post screenshot to Facebook
 */
async function postScreenshotToFacebook(imagePath, message) {
  const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  
  if (!pageAccessToken || !pageId) {
    throw new Error('Facebook credentials niet gevonden in environment variables');
  }
  
  const url = `https://graph.facebook.com/v18.0/${pageId}/photos`;
  
  const formData = new FormData();
  formData.append('source', fs.createReadStream(imagePath), {
    filename: path.basename(imagePath),
    contentType: 'image/png'
  });
  formData.append('message', message);
  formData.append('access_token', pageAccessToken);
  
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: formData.getHeaders()
  });
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(`Facebook API Error: ${data.error.message}`);
  }
  
  return data;
}

/**
 * Post video to YouTube via Zapier MCP (optioneel)
 * Veel makkelijker dan directe API!
 */
async function postVideoToYouTube(videoPath, metadata) {
  // Check of YouTube enabled is
  const youtubeEnabled = process.env.YOUTUBE_ENABLED === 'true';
  
  if (!youtubeEnabled) {
    console.log('ℹ️  YouTube posting is niet ingeschakeld (YOUTUBE_ENABLED=false)');
    return { enabled: false, message: 'YouTube posting is uitgeschakeld' };
  }

  // Check of we Zapier MCP gebruiken
  const useZapierMCP = process.env.YOUTUBE_USE_ZAPIER === 'true';
  
  if (useZapierMCP) {
    // Gebruik Zapier MCP voor YouTube (veel makkelijker!)
    try {
      console.log('📺 YouTube via Zapier MCP...');
      
      // Zapier MCP YouTube upload
      // Note: Dit vereist dat je Zapier MCP hebt geconfigureerd met YouTube
      // En dat je een video URL hebt (niet lokaal bestand)
      
      const zapierWebhookUrl = process.env.ZAPIER_YOUTUBE_WEBHOOK_URL;
      
      if (!zapierWebhookUrl) {
        console.log('ℹ️  Zapier webhook URL niet ingesteld voor YouTube');
        console.log('   Zet ZAPIER_YOUTUBE_WEBHOOK_URL in Vercel environment variables');
        return { enabled: true, message: 'Zapier webhook URL niet ingesteld' };
      }
      
      // Stuur video URL naar Zapier (video moet op cloud storage staan)
      const videoUrl = metadata.videoUrl || videoPath; // Kan URL zijn
      
      const zapierPayload = {
        video_url: videoUrl,
        title: metadata.title || 'SeniorEase Video',
        description: metadata.description || '',
        tags: metadata.tags || ['SeniorEase', 'Senioren', 'Nederland'],
        privacy: metadata.privacyStatus || 'unlisted',
        playlist_id: metadata.playlistId || null,
      };
      
      console.log('📤 Sturen naar Zapier webhook...');
      const response = await fetch(zapierWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zapierPayload)
      });
      
      const result = await response.json();
      
      if (result.success || result.video_id) {
        console.log('✅ YouTube video geüpload via Zapier!');
        console.log(`   Video ID: ${result.video_id || 'N/A'}`);
        return {
          success: true,
          videoId: result.video_id,
          videoUrl: result.video_url || `https://www.youtube.com/watch?v=${result.video_id}`,
          method: 'zapier'
        };
      } else {
        throw new Error(result.error || 'Zapier upload mislukt');
      }
      
    } catch (error) {
      console.error('❌ YouTube Zapier upload error:', error.message);
      return { success: false, error: error.message, method: 'zapier' };
    }
  } else {
    // Fallback: Directe YouTube API (complex)
    console.log('⚠️  Directe YouTube API upload vereist video bestand');
    console.log('   Overweeg Zapier MCP: zet YOUTUBE_USE_ZAPIER=true');
    return { enabled: true, message: 'Directe API upload vereist video bestand' };
  }
}

/**
 * Main handler
 */
export default async function handler(req, res) {
  // Verifieer dat dit een cron job is
  const authHeader = req.headers.authorization;
  
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    if (req.query.manual !== process.env.MANUAL_TRIGGER_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const results = {
    facebook: null,
    youtube: null,
    timestamp: new Date().toISOString()
  };

  try {
    console.log('🚀 Automated Multi-Platform Poster - Starting...');
    console.log('   Platforms: Facebook + YouTube\n');

    // ============================================
    // FACEBOOK POSTING (Screenshot)
    // ============================================
    try {
      console.log('📘 STAP 1: Facebook Posting...\n');
      
      // Voor nu gebruiken we dezelfde screenshot posting logica
      // In de toekomst kunnen we dit uitbreiden met content generatie
      
      const facebookPoster = new FacebookPoster();
      
      // Genereer een eenvoudige post (of gebruik bestaande screenshot logica)
      const facebookMessage = `📚 SeniorEase Bibliotheek App

Organiseer je boekcollectie eenvoudig!

✅ Barcode scannen
✅ Zoekfunctie
✅ Overzichtelijk beheer

Download nu: https://seniorease.nl

#SeniorEase #Bibliotheek #Boeken #Senioren #Nederland`;

      // Post text naar Facebook (zonder screenshot voor nu)
      const facebookResult = await facebookPoster.postText(facebookMessage, [
        'SeniorEase',
        'Bibliotheek',
        'Boeken',
        'Senioren',
        'Nederland'
      ]);

      if (facebookResult.success) {
        results.facebook = {
          success: true,
          postId: facebookResult.postId,
          message: 'Facebook post succesvol geplaatst'
        };
        console.log('✅ Facebook: Post geplaatst!');
        console.log(`   Post ID: ${facebookResult.postId}\n`);
      } else {
        results.facebook = {
          success: false,
          error: facebookResult.error
        };
        console.error('❌ Facebook: Post mislukt:', facebookResult.error);
      }
    } catch (error) {
      console.error('❌ Facebook posting error:', error.message);
      results.facebook = {
        success: false,
        error: error.message
      };
    }

    // ============================================
    // YOUTUBE POSTING (Video)
    // ============================================
    try {
      console.log('📺 STAP 2: YouTube Posting...\n');
      
      // Check of YouTube enabled is
      const youtubeEnabled = process.env.YOUTUBE_ENABLED === 'true';
      
      if (!youtubeEnabled) {
        console.log('ℹ️  YouTube posting is uitgeschakeld');
        console.log('   Zet YOUTUBE_ENABLED=true in Vercel environment variables om in te schakelen\n');
        results.youtube = {
          success: false,
          message: 'YouTube posting is uitgeschakeld',
          enabled: false
        };
      } else {
        // Check of we Zapier MCP gebruiken (aanbevolen!)
        const useZapier = process.env.YOUTUBE_USE_ZAPIER === 'true';
        
        if (useZapier) {
          // YouTube via Zapier MCP (veel makkelijker!)
          console.log('📺 YouTube via Zapier MCP (aanbevolen methode)\n');
          
          // Video URL (moet op cloud storage staan, bijv. Google Drive, Dropbox, etc.)
          const videoUrl = process.env.YOUTUBE_VIDEO_URL;
          
          if (!videoUrl) {
            console.log('ℹ️  Geen video URL ingesteld (YOUTUBE_VIDEO_URL)');
            console.log('   Upload video naar Google Drive/Dropbox en zet de share URL hier\n');
            results.youtube = {
              success: false,
              message: 'Geen video URL ingesteld',
              enabled: true,
              tip: 'Upload video naar cloud storage en zet YOUTUBE_VIDEO_URL'
            };
          } else {
            // YouTube metadata
            const youtubeMetadata = {
              videoUrl: videoUrl, // URL naar video op cloud storage
              title: process.env.YOUTUBE_TITLE || 'SeniorEase Video',
              description: process.env.YOUTUBE_DESCRIPTION || 'SeniorEase video content',
              tags: process.env.YOUTUBE_TAGS ? process.env.YOUTUBE_TAGS.split(',') : ['SeniorEase', 'Senioren', 'Nederland'],
              privacyStatus: process.env.YOUTUBE_PRIVACY || 'unlisted',
              categoryId: process.env.YOUTUBE_CATEGORY || '27',
              playlistId: process.env.YOUTUBE_PLAYLIST_ID || null
            };
            
            // Upload via Zapier
            const youtubeResult = await postVideoToYouTube(null, youtubeMetadata);
            results.youtube = youtubeResult;
            
            if (youtubeResult.success) {
              console.log('✅ YouTube: Video geüpload via Zapier!');
              console.log(`   Video ID: ${youtubeResult.videoId}\n`);
            } else {
              console.error('❌ YouTube: Upload mislukt:', youtubeResult.error || youtubeResult.message);
            }
          }
        } else {
          // Directe API (complex, vereist video bestand)
          console.log('⚠️  Directe YouTube API vereist video bestand');
          console.log('   Aanbeveling: Gebruik Zapier MCP (zet YOUTUBE_USE_ZAPIER=true)\n');
          results.youtube = {
            success: false,
            message: 'Directe API vereist video bestand - gebruik Zapier MCP',
            enabled: true,
            tip: 'Zet YOUTUBE_USE_ZAPIER=true voor makkelijkere setup'
          };
        }
      }
    } catch (error) {
      console.error('❌ YouTube posting error:', error.message);
      results.youtube = {
        success: false,
        error: error.message
      };
    }

    // ============================================
    // RESULT
    // ============================================
    const allSuccess = results.facebook?.success;
    const hasErrors = results.facebook?.error || results.youtube?.error;

    console.log('📊 Resultaat:');
    console.log(`   Facebook: ${results.facebook?.success ? '✅' : '❌'}`);
    console.log(`   YouTube: ${results.youtube?.enabled === false ? '⏭️' : results.youtube?.success ? '✅' : '❌'}`);
    console.log('');

    return res.status(allSuccess ? 200 : 500).json({
      success: allSuccess,
      message: 'Multi-platform posting voltooid',
      results: results,
      schedule: 'Ma/Wo/Vr om 10:00 uur'
    });

  } catch (error) {
    console.error('❌ Multi-Platform Post Error:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message,
      results: results,
      tip: 'Check environment variables en logs voor details'
    });
  }
}

export const config = {
  runtime: 'nodejs',
  maxDuration: 300 // 5 minuten voor video uploads
};


