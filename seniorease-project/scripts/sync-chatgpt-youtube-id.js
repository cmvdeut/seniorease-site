#!/usr/bin/env node
/**
 * Haal YouTube-video-ID op via Blotato en werk lib/youtube-videos.ts bij.
 *
 * Gebruik:
 *   node scripts/sync-chatgpt-youtube-id.js
 *   node scripts/sync-chatgpt-youtube-id.js --video-id=abc123
 *   node scripts/sync-chatgpt-youtube-id.js --wait --until=2026-06-19T09:05:00+02:00
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const POST_SUBMISSION_ID = 'aa8bd088-a692-459c-a84a-5ca0c0304e4f';
const YOUTUBE_VIDEOS_PATH = path.join(__dirname, '..', 'lib', 'youtube-videos.ts');
const MCP_CONFIG_PATH = path.join(__dirname, '..', 'mcp-config.json');
const BLOTATO_API = 'https://backend.blotato.com/v2';

function loadApiKey() {
  if (process.env.BLOTATO_API_KEY) return process.env.BLOTATO_API_KEY;
  if (fs.existsSync(MCP_CONFIG_PATH)) {
    const config = JSON.parse(fs.readFileSync(MCP_CONFIG_PATH, 'utf8'));
    const key = config?.mcpServers?.blotato?.headers?.['blotato-api-key'];
    if (key) return key;
  }
  throw new Error('Geen Blotato API key gevonden (BLOTATO_API_KEY of mcp-config.json).');
}

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    videoId: args.find((a) => a.startsWith('--video-id='))?.split('=')[1],
    wait: args.includes('--wait'),
    until: args.find((a) => a.startsWith('--until='))?.split('=')[1],
    pollMs: Number(args.find((a) => a.startsWith('--poll-ms='))?.split('=')[1] || 30000),
  };
}

function extractYouTubeId(url) {
  if (!url) return null;
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];
  return null;
}

async function getPostStatus(apiKey) {
  const response = await fetch(`${BLOTATO_API}/posts/${POST_SUBMISSION_ID}`, {
    headers: { 'blotato-api-key': apiKey },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Blotato API ${response.status}: ${body}`);
  }
  return response.json();
}

function updateYoutubeVideosFile(videoId) {
  const content = fs.readFileSync(YOUTUBE_VIDEOS_PATH, 'utf8');
  const updated = content.replace(
    /chatgptSenioren:\s*""/,
    `chatgptSenioren: "${videoId}"`
  );
  if (updated === content) {
    throw new Error('Kon chatgptSenioren niet bijwerken in lib/youtube-videos.ts');
  }
  fs.writeFileSync(YOUTUBE_VIDEOS_PATH, updated, 'utf8');
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitUntil(untilIso) {
  const target = new Date(untilIso).getTime();
  const now = Date.now();
  if (target > now) {
    const mins = Math.round((target - now) / 60000);
    console.log(`Wachten tot ${untilIso} (nog ~${mins} min)...`);
    await sleep(target - now);
  }
}

async function pollForPublished(apiKey, pollMs) {
  while (true) {
    const status = await getPostStatus(apiKey);
    console.log(`Status: ${status.status}${status.scheduledTime ? ` (gepland ${status.scheduledTime})` : ''}`);

    if (status.status === 'published' && status.publicUrl) {
      return status.publicUrl;
    }
    if (status.status === 'failed') {
      throw new Error(`Publicatie mislukt: ${status.errorMessage || 'onbekende fout'}`);
    }

    await sleep(pollMs);
  }
}

async function main() {
  const { videoId, wait, until, pollMs } = parseArgs();

  if (videoId) {
    console.log(`Video-ID handmatig: ${videoId}`);
    updateYoutubeVideosFile(videoId);
    console.log('lib/youtube-videos.ts bijgewerkt.');
    return;
  }

  const apiKey = loadApiKey();

  if (wait && until) {
    await waitUntil(until);
  }

  console.log(`Polling Blotato post ${POST_SUBMISSION_ID}...`);
  const publicUrl = await pollForPublished(apiKey, pollMs);
  const ytId = extractYouTubeId(publicUrl);

  if (!ytId) {
    throw new Error(`Geen YouTube-ID gevonden in URL: ${publicUrl}`);
  }

  console.log(`YouTube live: ${publicUrl}`);
  console.log(`Video-ID: ${ytId}`);
  updateYoutubeVideosFile(ytId);
  console.log('lib/youtube-videos.ts bijgewerkt.');
}

main().catch((error) => {
  console.error('Fout:', error.message);
  process.exit(1);
});
