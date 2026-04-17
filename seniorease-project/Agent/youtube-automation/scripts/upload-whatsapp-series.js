/**
 * Upload WhatsApp Uitleg serie naar YouTube
 * Laadt alle 5 video's op en voegt ze toe aan de WhatsApp-playlist.
 *
 * Gebruik:
 *   node scripts/upload-whatsapp-series.js
 *   node scripts/upload-whatsapp-series.js --replace          (verwijdert oude versies eerst)
 *   node scripts/upload-whatsapp-series.js --privacy=public
 *
 * Vereist: video's zijn al gerenderd in video-generator/out/
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import { getYouTubeClient } from './auth-helper.js';

// ─── Configuratie ─────────────────────────────────────────────────────────────

const PRIVACY = process.argv.find(a => a.startsWith('--privacy='))?.split('=')[1] ?? 'private';
const REPLACE  = process.argv.includes('--replace');

const VIDEO_DIR = path.resolve('../../video-generator/out');

const PLAYLIST_TITLE = '📱 WhatsApp Uitleg voor Beginners';

const COMMON_TAGS = [
  'WhatsApp', 'WhatsApp uitleg', 'WhatsApp beginners', 'senioren',
  'SeniorEase', 'smartphone uitleg', 'digitale hulp', 'ouderen technologie'
];

const VIDEOS = [
  {
    file: 'whatsapp-intro.mp4',
    title: 'Wat is WhatsApp? | Uitleg voor beginners',
    description: `In deze video leggen we uit wat WhatsApp is en hoe u het kunt downloaden op uw smartphone.\n\nU leert:\n✅ Wat WhatsApp is\n✅ Waarom het gratis is\n✅ Hoe u het installeert\n✅ Wat u ermee kunt doen\n\n📱 Meer uitleg: https://www.seniorease.nl/digitale-hulp/whatsapp-uitleg-beginners`,
    tags: [...COMMON_TAGS, 'WhatsApp installeren', 'WhatsApp downloaden'],
  },
  {
    file: 'whatsapp-berichten.mp4',
    title: 'WhatsApp berichten versturen | Stap voor stap uitleg',
    description: `Leer hoe u een WhatsApp bericht verstuurt! Stap voor stap uitgelegd met animaties.\n\nU leert:\n✅ WhatsApp openen\n✅ Een gesprek kiezen\n✅ Tekst typen\n✅ Het bericht versturen\n✅ Wat de vinkjes betekenen\n\n📱 Meer uitleg: https://www.seniorease.nl/digitale-hulp/whatsapp-uitleg-beginners`,
    tags: [...COMMON_TAGS, 'WhatsApp bericht sturen', 'WhatsApp typen'],
  },
  {
    file: 'whatsapp-fotos.mp4',
    title: "WhatsApp foto's versturen | Stap voor stap uitleg",
    description: `Leer hoe u een foto verstuurt via WhatsApp! Eenvoudig uitgelegd met animaties.\n\nU leert:\n✅ Een gesprek openen\n✅ Het paperclip-icoontje gebruiken\n✅ Een foto kiezen uit uw galerij\n✅ De foto versturen\n\n📱 Meer uitleg: https://www.seniorease.nl/digitale-hulp/whatsapp-uitleg-beginners`,
    tags: [...COMMON_TAGS, "WhatsApp foto versturen", 'WhatsApp galerij'],
  },
  {
    file: 'whatsapp-bellen.mp4',
    title: 'Bellen met WhatsApp | Gratis bellen uitgelegd',
    description: `Leer hoe u gratis kunt bellen via WhatsApp! Met animaties uitgelegd.\n\nU leert:\n✅ Een gesprek openen\n✅ Kiezen tussen spraak- en videogesprek\n✅ Wat u ziet tijdens het bellen\n✅ Hoe u ophangt\n\n📱 Meer uitleg: https://www.seniorease.nl/digitale-hulp/whatsapp-uitleg-beginners`,
    tags: [...COMMON_TAGS, 'WhatsApp bellen', 'WhatsApp videobellen', 'gratis bellen'],
  },
  {
    file: 'whatsapp-veiligheid.mp4',
    title: 'Veilig WhatsApp gebruiken | Tips tegen oplichting',
    description: `Blijf veilig op WhatsApp! Leer hoe u oplichters herkent en uzelf beschermt.\n\nU leert:\n✅ Hoe u de afzender controleert\n✅ Wat u nooit moet delen\n✅ Hoe u verdachte links herkent\n✅ Wat te doen bij twijfel\n\n📱 Meer uitleg: https://www.seniorease.nl/digitale-hulp/whatsapp-uitleg-beginners`,
    tags: [...COMMON_TAGS, 'WhatsApp veiligheid', 'WhatsApp oplichting', 'online veiligheid senioren'],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getPlaylistId(youtube, title) {
  const res = await youtube.playlists.list({ part: ['snippet'], mine: true, maxResults: 50 });
  const found = res.data.items.find(p => p.snippet.title === title);
  return found?.id ?? null;
}

async function uploadVideo(youtube, videoPath, meta, privacy) {
  console.log(`\n⬆️  Uploaden: ${meta.title}`);
  const fileSize = fs.statSync(videoPath).size;
  const res = await youtube.videos.insert({
    part: ['snippet', 'status'],
    requestBody: {
      snippet: {
        title: meta.title,
        description: meta.description,
        tags: meta.tags,
        categoryId: '27', // Education
        defaultLanguage: 'nl',
        defaultAudioLanguage: 'nl',
      },
      status: { privacyStatus: privacy },
    },
    media: {
      body: fs.createReadStream(videoPath),
    },
  }, {
    onUploadProgress: (evt) => {
      const pct = Math.round((evt.bytesRead / fileSize) * 100);
      process.stdout.write(`\r   Voortgang: ${pct}%`);
    },
  });
  console.log(`\n   ✅ Geüpload — Video ID: ${res.data.id}`);
  return res.data.id;
}

async function addToPlaylist(youtube, videoId, playlistId) {
  await youtube.playlistItems.insert({
    part: ['snippet'],
    requestBody: {
      snippet: {
        playlistId,
        resourceId: { kind: 'youtube#video', videoId },
      },
    },
  });
  console.log(`   ✅ Toegevoegd aan playlist`);
}

// ─── Hoofdfunctie ─────────────────────────────────────────────────────────────

async function main() {
  console.log('📱 WhatsApp Uitleg serie uploaden naar YouTube');
  console.log(`   Privacy: ${PRIVACY}\n`);

  const youtube = await getYouTubeClient();

  // Zoek de WhatsApp playlist
  let playlistId = await getPlaylistId(youtube, PLAYLIST_TITLE);
  if (!playlistId) {
    console.error(`❌ Playlist "${PLAYLIST_TITLE}" niet gevonden.`);
    console.log('   Maak hem eerst aan met: npm run setup-playlists');
    process.exit(1);
  }
  console.log(`✅ Playlist gevonden: ${playlistId}\n`);

  // Verwijder bestaande WhatsApp-video's als --replace is opgegeven
  if (REPLACE) {
    console.log('🗑️  Bestaande WhatsApp video\'s verwijderen...');
    const channelVideos = await youtube.search.list({
      part: ['snippet'],
      forMine: true,
      type: ['video'],
      q: 'WhatsApp',
      maxResults: 20,
    });
    const toDelete = (channelVideos.data.items || []).filter(v =>
      v.snippet.title.toLowerCase().includes('whatsapp')
    );
    for (const v of toDelete) {
      await youtube.videos.delete({ id: v.id.videoId });
      console.log(`   ✅ Verwijderd: ${v.snippet.title}`);
      await new Promise(r => setTimeout(r, 500));
    }
    console.log(`   ${toDelete.length} video('s) verwijderd.\n`);
  }

  let uploaded = 0;
  let skipped = 0;

  for (const video of VIDEOS) {
    const videoPath = path.join(VIDEO_DIR, video.file);

    if (!fs.existsSync(videoPath)) {
      console.warn(`⚠️  Overgeslagen (niet gevonden): ${video.file}`);
      console.log(`   Render eerst met: npm run render:${video.file.replace('whatsapp-', '').replace('.mp4', '')} (in video-generator/)`);
      skipped++;
      continue;
    }

    try {
      const videoId = await uploadVideo(youtube, videoPath, video, PRIVACY);
      await addToPlaylist(youtube, videoId, playlistId);
      uploaded++;

      // Pauze tussen uploads om quota te sparen
      if (uploaded < VIDEOS.length - skipped) {
        console.log('   ⏳ Even wachten voor volgende upload...');
        await new Promise(r => setTimeout(r, 3000));
      }
    } catch (err) {
      console.error(`❌ Fout bij ${video.file}:`, err.message);
    }
  }

  console.log(`\n🎉 Klaar! ${uploaded} video's geüpload, ${skipped} overgeslagen.`);
  console.log(`📺 Playlist: https://www.youtube.com/playlist?list=${playlistId}`);
  if (PRIVACY !== 'public') {
    console.log(`\n💡 Tip: gebruik --privacy=public om de video's direct zichtbaar te maken.`);
  }
}

main().catch(err => {
  console.error('❌ Fout:', err.message);
  process.exit(1);
});
