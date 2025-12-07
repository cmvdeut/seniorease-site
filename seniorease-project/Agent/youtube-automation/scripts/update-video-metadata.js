/**
 * Update YouTube Video Metadata
 * Werkt video titel, beschrijving, tags en categorie bij
 */

import { getYouTubeClient } from './auth-helper.js';
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
      const key = args[i].substring(2);
      const value = args[i + 1] || true;
      result[key] = value;
      i++;
    }
  }
  
  return result;
}

/**
 * Update video metadata
 */
async function updateVideoMetadata(youtube, videoId, metadata) {
  try {
    // Haal eerst huidige video data op
    const currentVideo = await youtube.videos.list({
      part: ['snippet', 'status'],
      id: [videoId],
    });

    if (!currentVideo.data.items || currentVideo.data.items.length === 0) {
      throw new Error(`Video met ID ${videoId} niet gevonden`);
    }

    const video = currentVideo.data.items[0];
    const snippet = video.snippet;
    const status = video.status;

    // Update metadata
    if (metadata.title) snippet.title = metadata.title;
    if (metadata.description) snippet.description = metadata.description;
    if (metadata.tags) snippet.tags = metadata.tags;
    if (metadata.categoryId) snippet.categoryId = metadata.categoryId;
    if (metadata.defaultLanguage) snippet.defaultLanguage = metadata.defaultLanguage;
    if (metadata.defaultAudioLanguage) snippet.defaultAudioLanguage = metadata.defaultAudioLanguage;

    // Update privacy status als opgegeven
    if (metadata.privacyStatus) {
      status.privacyStatus = metadata.privacyStatus;
    }

    // Update video
    const response = await youtube.videos.update({
      part: ['snippet', 'status'],
      requestBody: {
        id: videoId,
        snippet: snippet,
        status: status,
      },
    });

    console.log(`✅ Video metadata bijgewerkt!`);
    console.log(`   Video ID: ${videoId}`);
    console.log(`   Titel: ${response.data.snippet.title}`);
    console.log(`   URL: https://www.youtube.com/watch?v=${videoId}\n`);

    return response.data;
  } catch (error) {
    console.error(`❌ Fout bij bijwerken video:`, error.message);
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
  console.log('📝 YouTube Video Metadata Updater - SeniorEase\n');

  const args = parseArgs();
  let videoId = args['video-id'] || args.videoId;

  // Als video ID niet via args, vraag interactief
  if (!videoId) {
    videoId = await question('📹 Video ID (bijv. dQw4w9WgXcQ): ');
  }

  if (!videoId) {
    console.error('❌ Video ID is verplicht!');
    process.exit(1);
  }

  try {
    const youtube = await getYouTubeClient();

    // Vraag metadata (of gebruik args)
    const metadata = {};

    if (args.title) {
      metadata.title = args.title;
    } else {
      const updateTitle = await question('✏️  Nieuwe titel (Enter om over te slaan): ');
      if (updateTitle) metadata.title = updateTitle;
    }

    if (args.description) {
      metadata.description = args.description;
    } else {
      const updateDesc = await question('📄 Nieuwe beschrijving (Enter om over te slaan): ');
      if (updateDesc) metadata.description = updateDesc;
    }

    if (args.tags) {
      metadata.tags = args.tags.split(',').map(t => t.trim());
    } else {
      const updateTags = await question('🏷️  Tags (komma gescheiden, Enter om over te slaan): ');
      if (updateTags) metadata.tags = updateTags.split(',').map(t => t.trim());
    }

    if (args.category) {
      metadata.categoryId = args.category;
    } else {
      const updateCategory = await question('📂 Categorie ID (Enter om over te slaan): ');
      if (updateCategory) metadata.categoryId = updateCategory;
    }

    if (args.privacy) {
      metadata.privacyStatus = args.privacy;
    }

    // Update video
    await updateVideoMetadata(youtube, videoId, metadata);

    console.log('✅ Klaar!\n');

  } catch (error) {
    console.error('❌ Fout:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run
main();

