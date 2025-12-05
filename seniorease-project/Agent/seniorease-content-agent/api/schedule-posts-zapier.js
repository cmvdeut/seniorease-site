import { ClaudeContentGenerator } from '../lib/claude.js';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Verifieer dat dit een cron job is
  const authHeader = req.headers.authorization;
  
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Starting scheduled content generation and posting via Zapier...');

    // 1. Genereer content
    const generator = new ClaudeContentGenerator();
    const posts = await generator.generateMultiplePosts(1); // 1 post per run
    const post = posts[0];

    console.log('Content generated:', post.title);

    // 2. Format content voor Facebook
    const facebookMessage = `${post.title}\n\n${post.text}\n\n${post.hashtags.join(' ')}`;

    // 3. Stuur naar Zapier Webhook
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    
    if (!zapierWebhookUrl) {
      console.error('ZAPIER_WEBHOOK_URL is niet ingesteld');
      return res.status(500).json({
        success: false,
        error: 'Zapier webhook URL niet geconfigureerd',
        post: post // Return de post zodat je hem handmatig kunt posten
      });
    }

    const zapierResponse = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: facebookMessage,
        title: post.title,
        text: post.text,
        hashtags: post.hashtags,
        category: post.category,
        generated_at: post.generatedAt
      })
    });

    const zapierResult = await zapierResponse.json();

    // 4. Log resultaat
    await logPost({
      ...post,
      zapierResult: zapierResult,
      postedAt: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      message: 'Content gegenereerd en naar Zapier gestuurd',
      post: post,
      zapier: zapierResult
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
}

export const config = {
  runtime: 'nodejs',
  maxDuration: 60 // 60 seconden max
};



