/**
 * AI Article Generator voor SeniorEase Digitale Hulp
 * Genereert uitlegartikelen in de vaste structuur: intro, probleem, stappen, tips, samenvatting, gerelateerde links.
 */
import Anthropic from '@anthropic-ai/sdk';

export class ArticleGenerator {
  constructor(apiKey) {
    const key = (apiKey || process.env.ANTHROPIC_API_KEY)?.trim();
    if (!key) {
      throw new Error('ANTHROPIC_API_KEY is niet ingesteld. Zet deze in .env of geef door.');
    }
    this.client = new Anthropic({ apiKey: key });
  }

  buildArticlePrompt(topic) {
    return `Je bent een content-schrijver voor SeniorEase.nl, een website die senioren helpt met technologie in simpele taal.

OPDRACHT: Schrijf een volledig uitlegartikel voor het onderwerp: "${topic}"

EISEN:
- Doelgroep: senioren, geen technische voorkennis
- Taal: Nederlands, eenvoudig, korte zinnen
- Geen jargon; uitleg alsof je het aan iemand vertelt
- Structuur exact volgen (zie hieronder)

STRUCTUUR – geef je antwoord in dit exacte formaat (kopiëer de labels, vul in):

SLUG: [kleine letters, streepjes, bijv. whatsapp-groep-aanmaken]
TITLE: [Artikel titel, bijv. "WhatsApp groep aanmaken"]
DESCRIPTION: [1-2 zinnen voor zoekmachines, max 160 tekens]
KEYWORDS: [woord1, woord2, woord3] (3-5 zoekwoorden, komma gescheiden)

INTRO:
[2-4 zinnen die het onderwerp introduceren en waarom het handig is.]

H2_PROBLEEM: [Korte H2 titel, bijv. "Waarom een groep aanmaken?"]
[1-3 alinea's: waarom mensen dit zoeken / welk probleem lost het op.]

H2_STAPPEN: [Korte H2 titel, bijv. "Stap voor stap"]
[Genummerde stappen, elk stap 1-2 zinnen. Gebruik "Stap 1:", "Stap 2:", etc.]

H2_TIPS: [Korte H2 titel, bijv. "Tips"]
[3-5 korte tips, bullets of genummerd.]

H2_SAMENVATTING: [Korte H2 titel]
[2-4 zinnen samenvatting van het belangrijkste.]

RELATED_SLUGS: [slug1, slug2, slug3] (3-5 bestaande onderwerpen uit: whatsapp-uitleg-beginners, whatsapp-fotos-opslaan, wifi-werkt-niet-oplossen, e-mail-openen, veilig-wachtwoord-maken, smartphone, digitale-hulp/smartphone, digitale-hulp/veilig-internet – alleen slugs, komma gescheiden)`;
  }

  parseArticleResponse(text) {
    const result = {
      slug: '',
      title: '',
      description: '',
      keywords: [],
      intro: '',
      problemTitle: '',
      problem: '',
      stepsTitle: '',
      steps: '',
      tipsTitle: '',
      tips: '',
      summaryTitle: '',
      summary: '',
      relatedSlugs: []
    };

    const sections = [
      'SLUG', 'TITLE', 'DESCRIPTION', 'KEYWORDS',
      'INTRO', 'H2_PROBLEEM', 'H2_STAPPEN', 'H2_TIPS', 'H2_SAMENVATTING', 'RELATED_SLUGS'
    ];
    let current = null;
    let buffer = [];

    const flush = () => {
      if (!current) return;
      const raw = buffer.join('\n').trim();
      if (current === 'SLUG') result.slug = raw;
      else if (current === 'TITLE') result.title = raw;
      else if (current === 'DESCRIPTION') result.description = raw;
      else if (current === 'KEYWORDS') {
        result.keywords = raw.split(/[,;]/).map(s => s.trim()).filter(Boolean);
      } else if (current === 'INTRO') result.intro = raw;
      else if (current === 'H2_PROBLEEM') {
        const lines = raw.split('\n');
        result.problemTitle = lines[0] || '';
        result.problem = lines.slice(1).join('\n').trim();
      } else if (current === 'H2_STAPPEN') {
        const lines = raw.split('\n');
        result.stepsTitle = lines[0] || '';
        result.steps = lines.slice(1).join('\n').trim();
      } else if (current === 'H2_TIPS') {
        const lines = raw.split('\n');
        result.tipsTitle = lines[0] || '';
        result.tips = lines.slice(1).join('\n').trim();
      } else if (current === 'H2_SAMENVATTING') {
        const lines = raw.split('\n');
        result.summaryTitle = lines[0] || '';
        result.summary = lines.slice(1).join('\n').trim();
      } else if (current === 'RELATED_SLUGS') {
        result.relatedSlugs = raw.split(/[,;]/).map(s => s.trim()).filter(Boolean);
      }
      buffer = [];
    };

    for (const line of text.split('\n')) {
      const matched = sections.find(s => line.startsWith(s + ':'));
      if (matched) {
        flush();
        current = matched;
        const rest = line.replace(matched + ':', '').trim();
        if (rest) buffer.push(rest);
      } else if (current) {
        buffer.push(line);
      }
    }
    flush();

    return result;
  }

  async generateArticle(topic) {
    const prompt = this.buildArticlePrompt(topic);
    const message = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    });
    const text = message.content[0].text;
    return this.parseArticleResponse(text);
  }
}
