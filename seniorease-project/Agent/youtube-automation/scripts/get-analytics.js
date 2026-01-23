/**
 * Get YouTube Channel Analytics
 * Haalt statistieken op van je YouTube kanaal
 */

import { getYouTubeClient } from './auth-helper.js';

/**
 * Get channel statistics
 */
async function getChannelStats(youtube) {
  try {
    const response = await youtube.channels.list({
      part: ['statistics', 'snippet', 'contentDetails'],
      mine: true,
    });

    if (!response.data.items || response.data.items.length === 0) {
      throw new Error('Geen kanaal gevonden');
    }

    const channel = response.data.items[0];
    const stats = channel.statistics;
    const snippet = channel.snippet;

    return {
      channel: {
        title: snippet.title,
        description: snippet.description,
        customUrl: snippet.customUrl,
        publishedAt: snippet.publishedAt,
      },
      statistics: {
        viewCount: parseInt(stats.viewCount) || 0,
        subscriberCount: parseInt(stats.subscriberCount) || 0,
        videoCount: parseInt(stats.videoCount) || 0,
        hiddenSubscriberCount: stats.hiddenSubscriberCount,
      },
    };
  } catch (error) {
    console.error('❌ Fout bij ophalen kanaal statistieken:', error.message);
    throw error;
  }
}

/**
 * Get video statistics
 */
async function getVideoStats(youtube, videoId) {
  try {
    const response = await youtube.videos.list({
      part: ['statistics', 'snippet', 'contentDetails'],
      id: [videoId],
    });

    if (!response.data.items || response.data.items.length === 0) {
      throw new Error(`Video met ID ${videoId} niet gevonden`);
    }

    const video = response.data.items[0];
    const stats = video.statistics;
    const snippet = video.snippet;
    const details = video.contentDetails;

    return {
      video: {
        title: snippet.title,
        description: snippet.description,
        publishedAt: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        tags: snippet.tags || [],
        categoryId: snippet.categoryId,
        defaultLanguage: snippet.defaultLanguage,
      },
      statistics: {
        viewCount: parseInt(stats.viewCount) || 0,
        likeCount: parseInt(stats.likeCount) || 0,
        commentCount: parseInt(stats.commentCount) || 0,
        favoriteCount: parseInt(stats.favoriteCount) || 0,
      },
      details: {
        duration: details.duration,
        definition: details.definition,
        caption: details.caption,
      },
    };
  } catch (error) {
    console.error('❌ Fout bij ophalen video statistieken:', error.message);
    throw error;
  }
}

/**
 * Get all videos from channel
 */
async function getAllVideos(youtube, maxResults = 50) {
  try {
    const response = await youtube.search.list({
      part: ['snippet'],
      forMine: true,
      type: 'video',
      maxResults: maxResults,
      order: 'date',
    });

    return response.data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails,
    }));
  } catch (error) {
    console.error('❌ Fout bij ophalen video lijst:', error.message);
    throw error;
  }
}

/**
 * Format number with thousand separator
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Format duration (PT4M13S -> 4:13)
 */
function formatDuration(duration) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return duration;
  
  const hours = match[1] || 0;
  const minutes = match[2] || 0;
  const seconds = match[3] || 0;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Hoofdfunctie
 */
async function main() {
  console.log('📊 YouTube Analytics - SeniorEase\n');

  const args = process.argv.slice(2);
  const videoId = args.find(arg => arg.startsWith('--video-id='))?.split('=')[1] || 
                  args.find(arg => arg.startsWith('--videoId='))?.split('=')[1];

  try {
    const youtube = await getYouTubeClient();

    // Kanaal statistieken
    console.log('📺 Kanaal Statistieken:\n');
    const channelStats = await getChannelStats(youtube);
    
    console.log(`Kanaal: ${channelStats.channel.title}`);
    if (channelStats.channel.customUrl) {
      console.log(`URL: https://www.youtube.com/${channelStats.channel.customUrl}`);
    }
    console.log(`Aangemaakt: ${new Date(channelStats.channel.publishedAt).toLocaleDateString('nl-NL')}`);
    console.log(`\n📈 Statistieken:`);
    console.log(`   👀 Totaal views: ${formatNumber(channelStats.statistics.viewCount)}`);
    console.log(`   👥 Abonnees: ${formatNumber(channelStats.statistics.subscriberCount)}`);
    console.log(`   🎬 Video's: ${formatNumber(channelStats.statistics.videoCount)}`);
    console.log(`\n`);

    // Video statistieken (als video ID opgegeven)
    if (videoId) {
      console.log(`📹 Video Statistieken (${videoId}):\n`);
      const videoStats = await getVideoStats(youtube, videoId);
      
      console.log(`Titel: ${videoStats.video.title}`);
      console.log(`Gepubliceerd: ${new Date(videoStats.video.publishedAt).toLocaleDateString('nl-NL')}`);
      console.log(`Duur: ${formatDuration(videoStats.details.duration)}`);
      console.log(`\n📈 Statistieken:`);
      console.log(`   👀 Views: ${formatNumber(videoStats.statistics.viewCount)}`);
      console.log(`   👍 Likes: ${formatNumber(videoStats.statistics.likeCount)}`);
      console.log(`   💬 Comments: ${formatNumber(videoStats.statistics.commentCount)}`);
      console.log(`   ⭐ Favorieten: ${formatNumber(videoStats.statistics.favoriteCount)}`);
      console.log(`\n`);
    }

    // Laatste video's
    console.log('📋 Laatste Video\'s:\n');
    const videos = await getAllVideos(youtube, 10);
    
    videos.forEach((video, index) => {
      console.log(`${index + 1}. ${video.title}`);
      console.log(`   ID: ${video.videoId}`);
      console.log(`   Gepubliceerd: ${new Date(video.publishedAt).toLocaleDateString('nl-NL')}`);
      console.log(`   URL: https://www.youtube.com/watch?v=${video.videoId}`);
      console.log(``);
    });

    console.log('✅ Analytics opgehaald!\n');

  } catch (error) {
    console.error('❌ Fout:', error.message);
    if (error.response) {
      console.error('   Details:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

// Run
main();








