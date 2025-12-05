// Status check endpoint - controleert of alles correct is geconfigureerd
export default async function handler(req, res) {
  const status = {
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || 'development',
    checks: {
      anthropic_api_key: !!process.env.ANTHROPIC_API_KEY,
      facebook_token: !!process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
      facebook_page_id: !!process.env.FACEBOOK_PAGE_ID,
    },
    api_key_prefix: process.env.ANTHROPIC_API_KEY 
      ? process.env.ANTHROPIC_API_KEY.substring(0, 15) + '...' 
      : 'NOT_SET',
    errors: []
  };

  // Check ANTHROPIC_API_KEY
  if (!process.env.ANTHROPIC_API_KEY) {
    status.errors.push('ANTHROPIC_API_KEY is niet ingesteld');
  } else {
    const key = process.env.ANTHROPIC_API_KEY.trim();
    if (!key.startsWith('sk-ant-api03-')) {
      status.errors.push('ANTHROPIC_API_KEY heeft ongeldig formaat');
    }
  }

  // Check Facebook credentials
  if (!process.env.FACEBOOK_PAGE_ACCESS_TOKEN) {
    status.errors.push('FACEBOOK_PAGE_ACCESS_TOKEN is niet ingesteld');
  }
  
  if (!process.env.FACEBOOK_PAGE_ID) {
    status.errors.push('FACEBOOK_PAGE_ID is niet ingesteld');
  }

  // Test Claude API connection (optioneel, alleen als API key aanwezig is)
  if (process.env.ANTHROPIC_API_KEY && req.query.test === 'true') {
    try {
      const Anthropic = (await import('@anthropic-ai/sdk')).default;
      const client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY.trim()
      });
      
      // Quick test call
      await client.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [{
          role: 'user',
          content: 'Say "test"'
        }]
      });
      
      status.claude_test = 'success';
    } catch (error) {
      status.claude_test = 'failed';
      status.claude_error = error.message;
      status.errors.push(`Claude API test failed: ${error.message}`);
    }
  }

  const hasErrors = status.errors.length > 0;
  
  return res.status(hasErrors ? 500 : 200).json({
    success: !hasErrors,
    ...status
  });
}

export const config = {
  runtime: 'nodejs'
};




