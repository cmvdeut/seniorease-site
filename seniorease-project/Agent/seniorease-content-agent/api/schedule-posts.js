import { ClaudeContentGenerator } from '../lib/claude.js';
import { FacebookPoster } from '../lib/facebook.js';

export default async function handler(req, res) {
  // Verifieer dat dit een cron job is
  const authHeader = req.headers.authorization;
  
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Starting scheduled content generation and posting...');

    // 1. Genereer content
    const generator = new ClaudeContentGenerator();
    const posts = await generator.generateMultiplePosts(1); // 1 post per run
    const post = posts[0];

    console.log('Content generated:', post.title);

    // 2. Post naar Facebook
    const facebook = new FacebookPoster();
    const result = await facebook.postText(
      `${post.title}\n\n${post.text}`,
      post.hashtags
    );

    // 3. Log resultaat
    await logPost({
      ...post,
      facebookResult: result,
      postedAt: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      message: 'Content gegenereerd en gepost',
      post: post,
      facebook: result
    });

  } catch (error) {
    console.error('Scheduled Post Error:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

async function logPost(postData) {
  // In een productie omgeving zou je dit in een database opslaan
  // Voor nu loggen we het naar de console
  console.log('POST LOGGED:', JSON.stringify(postData, null, 2));
  
  // Je kunt dit later uitbreiden met:
  // - Database storage (Supabase, Vercel KV, etc.)
  // - File storage in GitHub via API
  // - Email notificatie
}

export const config = {
  runtime: 'nodejs',
  maxDuration: 60 // 60 seconden max
};
