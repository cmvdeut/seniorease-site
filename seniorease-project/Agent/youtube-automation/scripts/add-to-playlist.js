/**
 * Add Video to Playlist
 * Voegt een video toe aan een YouTube playlist
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
 * List all playlists
 */
async function listPlaylists(youtube) {
  try {
    const response = await youtube.playlists.list({
      part: ['snippet'],
      mine: true,
      maxResults: 50,
    });

    return response.data.items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
    }));
  } catch (error) {
    console.error('❌ Fout bij ophalen playlists:', error.message);
    throw error;
  }
}

/**
 * Add video to playlist
 */
async function addVideoToPlaylist(youtube, videoId, playlistId) {
  try {
    const response = await youtube.playlistItems.insert({
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

    console.log(`✅ Video toegevoegd aan playlist!`);
    console.log(`   Video ID: ${videoId}`);
    console.log(`   Playlist ID: ${playlistId}`);
    console.log(`   Item ID: ${response.data.id}\n`);

    return response.data;
  } catch (error) {
    if (error.response && error.response.data.error.message.includes('already exists')) {
      console.log(`ℹ️  Video staat al in deze playlist.\n`);
      return null;
    }
    console.error(`❌ Fout bij toevoegen aan playlist:`, error.message);
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
  console.log('📚 Video toevoegen aan Playlist - SeniorEase\n');

  const args = parseArgs();
  let videoId = args.videoid || args['video-id'];
  let playlistId = args.playlistid || args['playlist-id'];
  let playlistName = args.playlistname || args['playlist-name'];

  try {
    const youtube = await getYouTubeClient();

    // Als video ID niet via args, vraag interactief
    if (!videoId) {
      videoId = await question('📹 Video ID (bijv. dQw4w9WgXcQ): ');
    }

    if (!videoId) {
      console.error('❌ Video ID is verplicht!');
      process.exit(1);
    }

    // Als playlist ID/naam niet via args, vraag interactief
    if (!playlistId && !playlistName) {
      // Toon beschikbare playlists
      console.log('📋 Beschikbare playlists:\n');
      const playlists = await listPlaylists(youtube);
      
      playlists.forEach((playlist, index) => {
        console.log(`${index + 1}. ${playlist.title}`);
        console.log(`   ID: ${playlist.id}\n`);
      });

      const choice = await question('Kies playlist nummer of geef playlist naam/ID: ');
      
      // Check of het een nummer is
      const playlistIndex = parseInt(choice) - 1;
      if (!isNaN(playlistIndex) && playlists[playlistIndex]) {
        playlistId = playlists[playlistIndex].id;
      } else {
        // Probeer als naam of ID
        playlistName = choice;
      }
    }

    // Als alleen naam gegeven, zoek ID
    if (playlistName && !playlistId) {
      console.log(`🔍 Zoeken naar playlist: ${playlistName}...\n`);
      playlistId = await getPlaylistIdByName(youtube, playlistName);
      
      if (!playlistId) {
        console.error(`❌ Playlist "${playlistName}" niet gevonden!`);
        process.exit(1);
      }
    }

    if (!playlistId) {
      console.error('❌ Playlist ID is verplicht!');
      process.exit(1);
    }

    // Voeg video toe aan playlist
    await addVideoToPlaylist(youtube, videoId, playlistId);

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


