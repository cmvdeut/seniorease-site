/**
 * Zet de WhatsApp playlist in de juiste volgorde.
 * Gebruik: node scripts/reorder-whatsapp-playlist.js
 */

import 'dotenv/config';
import { getYouTubeClient } from './auth-helper.js';

const PLAYLIST_TITLE = '📱 WhatsApp Uitleg voor Beginners';

// Gewenste volgorde op basis van titelfragment
const DESIRED_ORDER = [
  'Wat is WhatsApp',
  'berichten versturen',
  "foto's versturen",
  'Bellen met WhatsApp',
  'Veilig WhatsApp',
];

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

async function setPosition(youtube, item, position) {
  await youtube.playlistItems.update({
    part: ['snippet'],
    requestBody: {
      id: item.id,
      snippet: {
        playlistId: item.snippet.playlistId,
        resourceId: item.snippet.resourceId,
        position,
      },
    },
  });
}

async function main() {
  console.log('🔀 WhatsApp playlist herordenen...\n');

  const youtube = await getYouTubeClient();

  const playlistId = await getPlaylistId(youtube, PLAYLIST_TITLE);
  if (!playlistId) {
    console.error(`❌ Playlist "${PLAYLIST_TITLE}" niet gevonden.`);
    process.exit(1);
  }

  const items = await getPlaylistItems(youtube, playlistId);
  console.log(`📋 ${items.length} video's gevonden in playlist:\n`);
  items.forEach(i => console.log(`   - ${i.snippet.title}`));

  // Sorteer op basis van DESIRED_ORDER
  const sorted = [...items].sort((a, b) => {
    const titleA = a.snippet.title.toLowerCase();
    const titleB = b.snippet.title.toLowerCase();
    const posA = DESIRED_ORDER.findIndex(k => titleA.includes(k.toLowerCase()));
    const posB = DESIRED_ORDER.findIndex(k => titleB.includes(k.toLowerCase()));
    return (posA === -1 ? 99 : posA) - (posB === -1 ? 99 : posB);
  });

  console.log('\n✅ Nieuwe volgorde:');
  sorted.forEach((i, idx) => console.log(`   ${idx + 1}. ${i.snippet.title}`));

  // Update posities
  console.log('\n⬆️  Volgorde instellen...');
  for (let i = 0; i < sorted.length; i++) {
    await setPosition(youtube, sorted[i], i);
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n🎉 Klaar! Playlist staat nu in de juiste volgorde.');
}

main().catch(err => {
  console.error('❌ Fout:', err.message);
  process.exit(1);
});
