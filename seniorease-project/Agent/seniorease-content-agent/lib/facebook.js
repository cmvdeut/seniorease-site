export class FacebookPoster {
  constructor(pageAccessToken, pageId) {
    this.pageAccessToken = pageAccessToken || process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    this.pageId = pageId || process.env.FACEBOOK_PAGE_ID;
    this.baseUrl = 'https://graph.facebook.com/v18.0';
  }

  async postText(message, hashtags = []) {
    const fullMessage = this.formatMessage(message, hashtags);
    
    const url = `${this.baseUrl}/${this.pageId}/feed`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: fullMessage,
          access_token: this.pageAccessToken
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(`Facebook API Error: ${data.error.message}`);
      }

      return {
        success: true,
        postId: data.id,
        message: 'Post succesvol geplaatst op Facebook'
      };
      
    } catch (error) {
      console.error('Facebook Post Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async postWithImage(message, imageUrl, hashtags = []) {
    const fullMessage = this.formatMessage(message, hashtags);
    
    const url = `${this.baseUrl}/${this.pageId}/photos`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: imageUrl,
          caption: fullMessage,
          access_token: this.pageAccessToken
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(`Facebook API Error: ${data.error.message}`);
      }

      return {
        success: true,
        postId: data.id,
        message: 'Post met afbeelding succesvol geplaatst op Facebook'
      };
      
    } catch (error) {
      console.error('Facebook Post Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  formatMessage(message, hashtags) {
    let formatted = message.trim();
    
    if (hashtags && hashtags.length > 0) {
      const hashtagString = hashtags
        .map(tag => tag.startsWith('#') ? tag : `#${tag}`)
        .join(' ');
      formatted += `\n\n${hashtagString}`;
    }

    return formatted;
  }

  async testConnection() {
    const url = `${this.baseUrl}/${this.pageId}?fields=name,id&access_token=${this.pageAccessToken}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error) {
        return {
          success: false,
          error: data.error.message
        };
      }

      return {
        success: true,
        pageName: data.name,
        pageId: data.id
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}
