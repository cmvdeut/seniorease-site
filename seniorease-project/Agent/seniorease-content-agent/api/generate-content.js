import { ClaudeContentGenerator } from '../lib/claude.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const generator = new ClaudeContentGenerator();
    
    // Genereer 1 post (of meerdere via query parameter)
    const count = parseInt(req.query.count) || 1;
    
    let posts;
    if (count === 1) {
      const { topic, style, platform } = req.query;
      
      if (topic && style) {
        posts = [await generator.generateSocialPost(topic, style, platform || 'facebook')];
      } else {
        // Random topic
        posts = await generator.generateMultiplePosts(1);
      }
    } else {
      posts = await generator.generateMultiplePosts(count);
    }

    return res.status(200).json({
      success: true,
      posts: posts,
      generated_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Content Generation Error:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      hasApiKey: !!process.env.ANTHROPIC_API_KEY,
      apiKeyPrefix: process.env.ANTHROPIC_API_KEY?.substring(0, 10) || 'NOT_SET'
    });
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Connection error.',
      details: 'Controleer of ANTHROPIC_API_KEY correct is ingesteld',
      debug: process.env.NODE_ENV === 'development' ? {
        hasApiKey: !!process.env.ANTHROPIC_API_KEY,
        apiKeyPrefix: process.env.ANTHROPIC_API_KEY?.substring(0, 10) || 'NOT_SET'
      } : undefined
    });
  }
}

export const config = {
  runtime: 'nodejs'
};
