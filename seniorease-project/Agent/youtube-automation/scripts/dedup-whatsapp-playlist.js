/**
 * Verwijdert dubbele video's uit de WhatsApp playlist.
 * Gebruik: node scripts/dedup-whatsapp-playlist.js
 */

import 'dotenv/config';
import { getYouTubeClient } from './auth-helper.js';

const PLAYLIST_TITLE = '📱 WhatsApp Uitleg voor Beginners';

async function getPlaylistId(youtube, title) {
  const res = await youtube.playlists.list({ part: ['snippet'], mine: true, maxResults: 50 });
  return res.data.items.find(p => p.snippet.title === title)?.id ?? null;
}

async function getPlaylistItems(youtube, playlistId) {
  const res = await youtube.playlistItems.list({
    part: ['snippet'],
    playlistId,
    maxResults: 50,
  });
  return res.data.items;
}

async function main() {
  console.log('🧹 Dubbele video\'s verwijderen uit WhatsApp playlist...\n');

  const youtube = await getYouTubeClient();

  const playlistId = await getPlaylistId(youtube, PLAYLIST_TITLE);
  if (!playlistId) {
    console.error(`❌ Playlist "${PLAYLIST_TITLE}" niet gevonden.`);
    process.exit(1);
  }

  const items = await getPlaylistItems(youtube, playlistId);
  console.log(`📋 ${items.length} items gevonden.\n`);

  const seen = new Set();
  const toDelete = [];

  for (const item of items) {
    // Check op titel (voor het geval dezelfde video twee keer geüpload is met ander ID)
    const key = item.snippet.title.toLowerCase().trim();
    if (seen.has(key)) {
      toDelete.push(item);
      console.log(`🗑️  Dubbel: ${item.snippet.title}`);
    } else {
      seen.add(key);
    }
  }

  if (toDelete.length === 0) {
    console.log('✅ Geen dubbele video\'s gevonden.');
    return;
  }

  console.log(`\n⬇️  ${toDelete.length} dubbele item(s) verwijderen...`);
  for (const item of toDelete) {
    await youtube.playlistItems.delete({ id: item.id });
    console.log(`   ✅ Verwijderd: ${item.snippet.title}`);
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n🎉 Klaar! Geen dubbele video\'s meer in de playlist.');
}

main().catch(err => {
  console.error('❌ Fout:', err.message);
  process.exit(1);
});
