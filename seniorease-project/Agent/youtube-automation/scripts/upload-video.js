/**
 * Upload Video to YouTube
 * Upload een video bestand naar YouTube met metadata
 * 
 * ⚠️ LET OP: Video upload via API is complex en heeft beperkingen
 * Voor grote bestanden (>100MB) is handmatige upload aanbevolen
 */

import { getYouTubeClient } from './auth-helper.js';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt) => new Promise((resolve) => {
  rl.question(prompt, resolve);
});

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2).replace(/-/g, '');
      const value = args[i + 1] || true;
      result[key] = value;
      i++;
    }
  }
  
  return result;
}

/**
 * Upload video to YouTube
 */
export async function uploadVideo(youtube, videoPath, metadata) {
  try {
    // Check of bestand bestaat
    if (!fs.existsSync(videoPath)) {
      throw new Error(`Video bestand niet gevonden: ${videoPath}`);
    }

    const fileSize = fs.statSync(videoPath).size;
    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);

    console.log(`📤 Video uploaden...`);
    console.log(`   Bestand: ${path.basename(videoPath)}`);
    console.log(`   Grootte: ${fileSizeMB} MB\n`);

    // Voor grote bestanden (>100MB), waarschuw gebruiker
    if (fileSize > 100 * 1024 * 1024) {
      console.log('⚠️  WAARSCHUWING: Bestand is groter dan 100MB.');
      console.log('   Video upload via API kan lang duren of falen.');
      console.log('   Overweeg handmatige upload via YouTube Studio.\n');
      
      const continueUpload = await question('Doorgaan met upload? (y/n): ');
      if (continueUpload.toLowerCase() !== 'y') {
        console.log('Upload geannuleerd.');
        return null;
      }
    }

    // Prepare video resource
    const videoResource = {
      snippet: {
        title: metadata.title || 'Untitled Video',
        description: metadata.description || '',
        tags: metadata.tags || [],
        categoryId: metadata.categoryId || '27', // Education
        defaultLanguage: metadata.defaultLanguage || 'nl',
        defaultAudioLanguage: metadata.defaultAudioLanguage || 'nl',
      },
      status: {
        privacyStatus: metadata.privacyStatus || 'private', // Start als private voor veiligheid
        selfDeclaredMadeForKids: false,
      },
    };

    // Upload video
    // Note: googleapis library ondersteunt resumable uploads voor grote bestanden
    const media = {
      body: fs.createReadStream(videoPath),
    };

    console.log('⏳ Uploaden... (dit kan even duren)\n');

    const response = await youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: videoResource,
      media: media,
    });

    const videoId = response.data.id;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    console.log('✅ Video succesvol geüpload!');
    console.log(`   Video ID: ${videoId}`);
    console.log(`   Titel: ${response.data.snippet.title}`);
    console.log(`   URL: ${videoUrl}`);
    console.log(`   Privacy: ${response.data.status.privacyStatus}\n`);

    // Als privacyStatus 'private' is, vraag of gebruiker het publiek wil maken
    if (response.data.status.privacyStatus === 'private') {
      console.log('💡 Video is nu PRIVATE. Je kunt het later publiceren via YouTube Studio.');
      console.log(`   Of gebruik: npm run update-video -- --video-id=${videoId} --privacy=public\n`);
    }

    return {
      videoId,
      videoUrl,
      title: response.data.snippet.title,
      privacyStatus: response.data.status.privacyStatus,
    };

  } catch (error) {
    console.error('❌ Fout bij uploaden video:', error.message);
    if (error.response) {
      console.error('   Details:', JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
}

/**
 * Hoofdfunctie
 */
async function main() {
  console.log('📤 YouTube Video Uploader - SeniorEase\n');
  console.log('⚠️  LET OP: Voor grote bestanden (>100MB) is handmatige upload aanbevolen.\n');

  const args = parseArgs();
  let videoPath = args.videopath || args.video;

  // Als video path niet via args, vraag interactief
  if (!videoPath) {
    videoPath = await question('📁 Video bestand pad (bijv. C:\\Users\\...\\video.mp4): ');
  }

  if (!videoPath) {
    console.error('❌ Video bestand pad is verplicht!');
    process.exit(1);
  }

  // Normalize path (handle quotes)
  videoPath = videoPath.replace(/^["']|["']$/g, '');

  try {
    const youtube = await getYouTubeClient();

    // Vraag metadata
    const metadata = {};

    if (args.title) {
      metadata.title = args.title;
    } else {
      metadata.title = await question('📝 Titel: ');
      if (!metadata.title) {
        console.error('❌ Titel is verplicht!');
        process.exit(1);
      }
    }

    if (args.description) {
      metadata.description = args.description;
    } else {
      const desc = await question('📄 Beschrijving (Enter om over te slaan): ');
      if (desc) metadata.description = desc;
    }

    if (args.tags) {
      metadata.tags = args.tags.split(',').map(t => t.trim());
    } else {
      const tags = await question('🏷️  Tags (komma gescheiden, Enter om over te slaan): ');
      if (tags) metadata.tags = tags.split(',').map(t => t.trim());
    }

    if (args.privacy) {
      metadata.privacyStatus = args.privacy;
    } else {
      const privacy = await question('🔒 Privacy (public/unlisted/private, default: private): ');
      metadata.privacyStatus = privacy || 'private';
    }

    if (args.category) {
      metadata.categoryId = args.category;
    }

    // Upload video
    const result = await uploadVideo(youtube, videoPath, metadata);

    if (result) {
      console.log('✅ Upload voltooid!\n');
      console.log(`📺 Bekijk video: ${result.videoUrl}\n`);
    }

  } catch (error) {
    console.error('❌ Fout:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run
main();








