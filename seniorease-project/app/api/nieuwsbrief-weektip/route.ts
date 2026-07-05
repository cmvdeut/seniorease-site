import { NextRequest, NextResponse } from 'next/server';
import { getBrevoApiKey, getBrevoListId } from '@/lib/brevo';
import {
  buildNieuwsbriefTipHtml,
  getIsoWeekId,
  getTipForDate,
  NIEUWSBRIEF_START_DATE,
  nieuwsbriefTips,
} from '@/lib/nieuwsbrief-tips';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return true;

  const auth = request.headers.get('authorization');
  return auth === `Bearer ${secret}`;
}

async function findCampaignByTag(apiKey: string, weekId: string): Promise<number | null> {
  const response = await fetch(
    `https://api.brevo.com/v3/emailCampaigns?type=classic&status=sent,draft,queued&limit=50&sort=desc`,
    {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'api-key': apiKey,
      },
    }
  );

  if (!response.ok) return null;

  const data = (await response.json()) as {
    campaigns?: Array<{ id: number; tag?: string; name?: string }>;
  };

  const match = data.campaigns?.find((campaign) => campaign.name?.includes(`Weektip ${weekId}`));

  return match?.id ?? null;
}

async function sendWeeklyTip(options: {
  apiKey: string;
  listId: number;
  date: Date;
  dryRun: boolean;
}): Promise<{
  weekId: string;
  tipSlug: string;
  campaignId?: number;
  skipped?: boolean;
  dryRun?: boolean;
}> {
  const { apiKey, listId, date, dryRun } = options;
  const weekId = getIsoWeekId(date);
  const tip = getTipForDate(date);
  const campaignName = `Weektip ${weekId} — ${tip.title}`;

  const existingId = await findCampaignByTag(apiKey, weekId);
  if (existingId) {
    return { weekId, tipSlug: tip.slug, campaignId: existingId, skipped: true };
  }

  if (dryRun) {
    return { weekId, tipSlug: tip.slug, dryRun: true };
  }

  const createResponse = await fetch('https://api.brevo.com/v3/emailCampaigns', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      name: campaignName,
      subject: tip.subject,
      previewText: tip.previewText,
      sender: { name: 'SeniorEase', email: 'support@seniorease.eu' },
      htmlContent: buildNieuwsbriefTipHtml(tip),
      recipients: { listIds: [listId] },
      utmCampaign: `weektip_${weekId.replace('-', '_')}`,
    }),
  });

  const createData = await createResponse.json().catch(() => null);

  if (!createResponse.ok) {
    throw new Error(
      `Brevo campagne aanmaken mislukt (${createResponse.status}): ${JSON.stringify(createData)}`
    );
  }

  const campaignId = (createData as { id?: number }).id;
  if (!campaignId) {
    throw new Error('Brevo campagne-ID ontbreekt in antwoord');
  }

  const sendResponse = await fetch(
    `https://api.brevo.com/v3/emailCampaigns/${campaignId}/sendNow`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'api-key': apiKey,
      },
    }
  );

  if (!sendResponse.ok) {
    const sendData = await sendResponse.json().catch(() => null);
    throw new Error(
      `Brevo campagne versturen mislukt (${sendResponse.status}): ${JSON.stringify(sendData)}`
    );
  }

  return { weekId, tipSlug: tip.slug, campaignId };
}

export async function GET(request: NextRequest) {
  const preview = request.nextUrl.searchParams.get('preview') === '1';

  if (!preview && !isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = getBrevoApiKey();
  const listId = getBrevoListId() ?? 7;
  const now = new Date();
  const tip = getTipForDate(now);
  const weekId = getIsoWeekId(now);

  if (preview) {
    return NextResponse.json({
      success: true,
      preview: true,
      weekId,
      startDate: NIEUWSBRIEF_START_DATE,
      tip: {
        slug: tip.slug,
        subject: tip.subject,
        title: tip.title,
        ctaUrl: tip.ctaUrl,
      },
      totalTips: nieuwsbriefTips.length,
      schedule: 'Elke maandag 09:00 (NL-tijd) via Vercel cron',
    });
  }

  try {
    const apiKeyRequired = apiKey;
    if (!apiKeyRequired) {
      return NextResponse.json(
        { success: false, error: 'BREVO_API_KEY ontbreekt' },
        { status: 503 }
      );
    }

    const result = await sendWeeklyTip({
      apiKey: apiKeyRequired,
      listId,
      date: now,
      dryRun: false,
    });

    return NextResponse.json({
      success: true,
      ...result,
      message: result.skipped
        ? 'Deze weektip was al verstuurd'
        : 'Weektip verstuurd naar nieuwsbrieflijst',
    });
  } catch (error) {
    console.error('Weektip versturen mislukt:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Weektip versturen mislukt',
      },
      { status: 502 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const dryRun = body?.dryRun === true;

  const apiKey = getBrevoApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: 'BREVO_API_KEY ontbreekt' },
      { status: 503 }
    );
  }

  const listId = getBrevoListId() ?? 7;
  const date = body?.date ? new Date(String(body.date)) : new Date();

  try {
    const result = await sendWeeklyTip({
      apiKey,
      listId,
      date,
      dryRun,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Weektip test mislukt:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Weektip test mislukt',
      },
      { status: 502 }
    );
  }
}
