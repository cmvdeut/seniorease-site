/**
 * State Manager voor Screenshot Posting
 * ======================================
 * 
 * Houdt bij welke screenshot als volgende gepost moet worden.
 * Gebruikt Vercel KV (als beschikbaar) of fallback naar env variables.
 */

export class StateManager {
  constructor() {
    this.posts = [
      { id: 1, posted: true, postedAt: new Date().toISOString() },  // Al gepost
      { id: 2, posted: false },
      { id: 3, posted: false },
      { id: 4, posted: false },
      { id: 5, posted: false }
    ];
  }

  async getNextPostIndex() {
    // Probeer uit KV store te halen (als je Vercel KV hebt)
    if (process.env.KV_REST_API_URL) {
      try {
        const kv = await import('@vercel/kv');
        const currentIndex = await kv.get('current_post_index');
        return currentIndex || 1; // Start bij post 2 (index 1)
      } catch (error) {
        console.log('KV not available, using env variable');
      }
    }
    
    // Fallback: gebruik env variable
    return parseInt(process.env.CURRENT_POST_INDEX || '1');
  }

  async setNextPostIndex(index) {
    // Probeer in KV store op te slaan
    if (process.env.KV_REST_API_URL) {
      try {
        const kv = await import('@vercel/kv');
        await kv.set('current_post_index', index);
        console.log(`✅ State saved to KV: next index = ${index}`);
        return true;
      } catch (error) {
        console.log('KV not available for saving');
      }
    }
    
    // Fallback: log naar console (je moet handmatig env variable updaten)
    console.log(`⚠️  Update CURRENT_POST_INDEX env variable to: ${index}`);
    return false;
  }

  async markAsPosted(postId) {
    const timestamp = new Date().toISOString();
    
    // Sla op in KV als beschikbaar
    if (process.env.KV_REST_API_URL) {
      try {
        const kv = await import('@vercel/kv');
        await kv.set(`post_${postId}_posted`, timestamp);
        console.log(`✅ Post ${postId} marked as posted in KV`);
      } catch (error) {
        console.log('KV not available for logging');
      }
    }
    
    // Log ook naar console
    console.log(`📊 Post ${postId} marked as posted at ${timestamp}`);
  }

  async getPostHistory() {
    const history = [];
    
    if (process.env.KV_REST_API_URL) {
      try {
        const kv = await import('@vercel/kv');
        
        for (let i = 1; i <= 5; i++) {
          const postedAt = await kv.get(`post_${i}_posted`);
          history.push({
            postId: i,
            posted: !!postedAt,
            postedAt: postedAt || null
          });
        }
        
        return history;
      } catch (error) {
        console.log('KV not available for history');
      }
    }
    
    // Fallback: return basic state
    return this.posts;
  }

  async reset() {
    // Reset naar begin (post 2, want 1 is intro)
    await this.setNextPostIndex(1);
    console.log('🔄 State reset to beginning');
  }
}


