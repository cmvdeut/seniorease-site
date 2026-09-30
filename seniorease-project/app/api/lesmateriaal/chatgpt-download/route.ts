import { NextRequest, NextResponse } from 'next/server';
import { createReadStream, statSync } from 'fs';
import { Readable } from 'stream';
import { resolveAssetAbsolutePath, verifyDownloadToken } from '@/lib/lesmateriaal-fulfillment';
import {
  chatgptDownloadFilename,
  findChatgptAssetByFileId,
} from '@/lib/chatgpt-fulfillment';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Apart van /api/lesmateriaal/download zodat A–H-PDF’s en ChatGPT-ZIP’s
 * niet in dezelfde Vercel serverless bundle zitten (250MB-limiet).
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Token ontbreekt' }, { status: 400 });
  }

  let verified;
  try {
    verified = verifyDownloadToken(token);
  } catch (err) {
    console.error('ChatGPT download token verify config error:', err);
    return NextResponse.json(
      { error: 'Download tijdelijk niet beschikbaar' },
      { status: 503 },
    );
  }

  if (!verified) {
    return NextResponse.json(
      {
        error:
          'Deze downloadlink is ongeldig of verlopen. Controleer uw e-mail of neem contact op via info@seniorease.nl.',
      },
      { status: 403 },
    );
  }

  const asset = findChatgptAssetByFileId(verified.fileId);
  if (!asset) {
    return NextResponse.json({ error: 'Bestand onbekend' }, { status: 404 });
  }

  const abs = resolveAssetAbsolutePath(asset);
  if (!abs) {
    console.error('ChatGPT download file missing:', asset.relativePath);
    return NextResponse.json(
      {
        error:
          'Dit bestand is nog niet beschikbaar. Neem contact op via info@seniorease.nl — we helpen u zo snel mogelijk.',
      },
      { status: 404 },
    );
  }

  const downloadName =
    chatgptDownloadFilename(asset.fileId) ||
    asset.relativePath.split('/').pop() ||
    'SeniorEase-ChatGPT-download.zip';

  const stat = statSync(abs);
  const stream = createReadStream(abs);
  const webStream = Readable.toWeb(stream) as unknown as ReadableStream;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Length': String(stat.size),
      'Content-Disposition': `attachment; filename="${downloadName}"`,
      'Cache-Control': 'no-store',
    },
  });
}
