import Anthropic from '@anthropic-ai/sdk';

export class ClaudeContentGenerator {
  constructor(apiKey) {
    this.client = new Anthropic({
      apiKey: apiKey || process.env.ANTHROPIC_API_KEY
    });
  }

  async generateSocialPost(topic, style, platform = 'facebook') {
    const prompt = this.buildPrompt(topic, style, platform);
    
    try {
      const message = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      const content = message.content[0].text;
      return this.parseResponse(content, platform);
      
    } catch (error) {
      console.error('Claude API Error:', error);
      throw error;
    }
  }

  buildPrompt(topic, style, platform) {
    const platformSpecs = {
      facebook: {
        maxLength: 500,
        tone: 'vriendelijk en toegankelijk',
        format: 'kort en scanbaar met emoji\'s'
      },
      youtube: {
        maxLength: 150,
        tone: 'uitnodigend en enthousiast',
        format: 'beschrijving voor video thumbnail'
      }
    };

    const specs = platformSpecs[platform];

    return `Je bent een content creator voor SeniorEase.nl, een platform dat senioren helpt met technologie.

ONDERWERP: ${topic}
STIJL: ${style}
PLATFORM: ${platform}

Schrijf een ${specs.tone} post in het Nederlands die:
- Maximaal ${specs.maxLength} woorden bevat
- ${specs.format}
- Praktisch en uitvoerbaar is
- Geen techno-jargon gebruikt
- Respectvol is naar senioren (geen betutteling)
- Eindigt met een vraag of call-to-action

${platform === 'facebook' ? 'Gebruik 2-3 relevante emoji\'s.' : 'Suggereer ook een pakkende titel.'}

Geef je antwoord in dit formaat:
TITEL: [korte titel]
TEKST: [de post tekst]
HASHTAGS: [3-5 relevante hashtags]
${platform === 'youtube' ? 'VIDEO_IDEE: [kort video concept]' : ''}`;
  }

  parseResponse(content, platform) {
    const lines = content.split('\n');
    const result = {
      title: '',
      text: '',
      hashtags: [],
      videoIdea: '',
      platform: platform,
      generatedAt: new Date().toISOString()
    };

    let currentSection = '';
    
    for (const line of lines) {
      if (line.startsWith('TITEL:')) {
        result.title = line.replace('TITEL:', '').trim();
        currentSection = 'title';
      } else if (line.startsWith('TEKST:')) {
        result.text = line.replace('TEKST:', '').trim();
        currentSection = 'text';
      } else if (line.startsWith('HASHTAGS:')) {
        const hashtagLine = line.replace('HASHTAGS:', '').trim();
        result.hashtags = hashtagLine.split(/[\s,]+/).filter(tag => tag.startsWith('#'));
        currentSection = 'hashtags';
      } else if (line.startsWith('VIDEO_IDEE:')) {
        result.videoIdea = line.replace('VIDEO_IDEE:', '').trim();
        currentSection = 'video';
      } else if (line.trim() && currentSection === 'text') {
        result.text += '\n' + line.trim();
      } else if (line.trim() && currentSection === 'video') {
        result.videoIdea += ' ' + line.trim();
      }
    }

    return result;
  }

  async generateMultiplePosts(count = 3) {
    const topics = await this.getRandomTopics(count);
    const posts = [];

    for (const { topic, style } of topics) {
      const post = await this.generateSocialPost(topic, style, 'facebook');
      posts.push(post);
      
      // Kleine pauze tussen API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return posts;
  }

  async getRandomTopics(count) {
    // Import topics from config
    const { default: config } = await import('../config/topics.json', {
      assert: { type: 'json' }
    });

    const allTopics = [];
    
    for (const theme of config.themes) {
      for (const topic of theme.topics) {
        allTopics.push({
          topic,
          category: theme.category
        });
      }
    }

    // Shuffle en selecteer random topics
    const shuffled = allTopics.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    // Koppel random style
    return selected.map(item => ({
      ...item,
      style: config.post_styles[Math.floor(Math.random() * config.post_styles.length)]
    }));
  }
}
