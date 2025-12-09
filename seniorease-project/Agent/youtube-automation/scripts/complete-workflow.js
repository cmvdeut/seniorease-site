/**
 * Complete YouTube Workflow
 * Volledige automatische workflow: Upload → Metadata → Playlist
 * 
 * Gebruik: npm run complete-workflow -- --video=path/to/video.mp4 --title="Titel" --playlist="Playlist Naam"
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
 * Get playlist ID by name
 */
async function getPlaylistIdByName(youtube, playlistName) {
  try {
    const response = await youtube.playlists.list({
      part: ['snippet'],
      mine: true,
      maxResults: 50,
    });

    const playlist = response.data.items.find(
      item => item.snippet.title === playlistName
    );

    return playlist ? playlist.id : null;
  } catch (error) {
    console.error('❌ Fout bij zoeken playlist:', error.message);
    return null;
  }
}

/**
 * Complete workflow
 */
async function completeWorkflow(youtube, config) {
  console.log('🚀 Complete YouTube Workflow - SeniorEase\n');
  console.log('Dit script doet:');
  console.log('  1. Video uploaden');
  console.log('  2. Metadata bijwerken');
  console.log('  3. Toevoegen aan playlist\n');

  let videoId = null;

  try {
    // STAP 1: Upload video
    if (config.videoPath) {
      console.log('📤 STAP 1: Video uploaden...\n');
      
      const videoResource = {
        snippet: {
          title: config.title || 'Untitled Video',
          description: config.description || '',
          tags: config.tags || [],
          categoryId: config.categoryId || '27',
        },
        status: {
          privacyStatus: config.privacyStatus || 'private',
        },
      };

      const media = {
        body: fs.createReadStream(config.videoPath),
      };

      console.log('⏳ Uploaden... (dit kan even duren)\n');

      const uploadResponse = await youtube.videos.insert({
        part: ['snippet', 'status'],
        requestBody: videoResource,
        media: media,
      });

      videoId = uploadResponse.data.id;
      console.log(`✅ Video geüpload! ID: ${videoId}\n`);
    } else if (config.videoId) {
      videoId = config.videoId;
      console.log(`✅ Gebruik bestaande video: ${videoId}\n`);
    } else {
      throw new Error('Video pad of ID is verplicht!');
    }

    // STAP 2: Update metadata (als opgegeven en niet al ingesteld tijdens upload)
    if (config.updateMetadata && !config.videoPath) {
      console.log('📝 STAP 2: Metadata bijwerken...\n');
      
      // Haal huidige video op
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
      if (config.title) snippet.title = config.title;
      if (config.description) snippet.description = config.description;
      if (config.tags) snippet.tags = config.tags;
      if (config.categoryId) snippet.categoryId = config.categoryId;
      if (config.privacyStatus) status.privacyStatus = config.privacyStatus;

      await youtube.videos.update({
        part: ['snippet', 'status'],
        requestBody: {
          id: videoId,
          snippet: snippet,
          status: status,
        },
      });

      console.log(`✅ Metadata bijgewerkt!\n`);
    } else if (config.videoPath) {
      console.log('ℹ️  Metadata al ingesteld tijdens upload.\n');
    }

    // STAP 3: Toevoegen aan playlist
    if (config.playlistName || config.playlistId) {
      console.log('📚 STAP 3: Toevoegen aan playlist...\n');
      
      let playlistId = config.playlistId;
      
      if (config.playlistName && !playlistId) {
        playlistId = await getPlaylistIdByName(youtube, config.playlistName);
        if (!playlistId) {
          console.error(`❌ Playlist "${config.playlistName}" niet gevonden!`);
          return;
        }
      }

      if (playlistId) {
        await youtube.playlistItems.insert({
          part: ['snippet'],
          requestBody: {
            snippet: {
              playlistId: playlistId,
              resourceId: {
                kind: 'youtube#video',
                videoId: videoId,
              },
            },
          },
        });

        console.log(`✅ Video toegevoegd aan playlist!\n`);
      }
    }

    console.log('✅ Workflow voltooid!');
    console.log(`📺 Video URL: https://www.youtube.com/watch?v=${videoId}\n`);

    return { videoId, success: true };

  } catch (error) {
    console.error('❌ Fout in workflow:', error.message);
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
  const args = parseArgs();

  // Parse config
  const config = {
    videoPath: args.video || args.videopath,
    videoId: args.videoid || args['video-id'],
    title: args.title,
    description: args.description,
    tags: args.tags ? args.tags.split(',').map(t => t.trim()) : [],
    playlistName: args.playlist || args.playlistname || args['playlist-name'],
    playlistId: args.playlistid || args['playlist-id'],
    privacyStatus: args.privacy || 'private',
    categoryId: args.category || '27',
    updateMetadata: args.updatemetadata !== false,
  };

  // Als video path niet via args, vraag interactief
  if (!config.videoPath && !config.videoId) {
    config.videoPath = await question('📁 Video bestand pad (Enter om over te slaan): ');
  }

  if (config.videoPath) {
    config.videoPath = config.videoPath.replace(/^["']|["']$/g, '');
    
    if (!fs.existsSync(config.videoPath)) {
      console.error(`❌ Video bestand niet gevonden: ${config.videoPath}`);
      process.exit(1);
    }
  }

  if (!config.title) {
    config.title = await question('📝 Titel: ');
    if (!config.title) {
      console.error('❌ Titel is verplicht!');
      process.exit(1);
    }
  }

  if (!config.description) {
    config.description = await question('📄 Beschrijving (Enter om over te slaan): ');
  }

  if (config.tags.length === 0) {
    const tags = await question('🏷️  Tags (komma gescheiden, Enter om over te slaan): ');
    if (tags) config.tags = tags.split(',').map(t => t.trim());
  }

  if (!config.playlistName && !config.playlistId) {
    config.playlistName = await question('📚 Playlist naam (Enter om over te slaan): ');
  }

  try {
    const youtube = await getYouTubeClient();
    await completeWorkflow(youtube, config);

  } catch (error) {
    console.error('❌ Fout:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run
main();


