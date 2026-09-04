import { NextRequest, NextResponse } from 'next/server';
import { createReadStream, statSync } from 'fs';
import { Readable, PassThrough } from 'stream';
import { ZipArchive } from 'archiver';
import {
  assetsForZipBundle,
  findAssetByFileId,
  isZipBundleFileId,
  resolveAssetAbsolutePath,
  verifyDownloadToken,
  zipDownloadFilename,
  zipEntryPathForAsset,
} from '@/lib/lesmateriaal-fulfillment';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function filenameForAsset(fileId: string): string {
  const safe = fileId.replace(/[^a-z0-9-]/gi, '') || 'download';
  return `SeniorEase-${safe}.pdf`;
}

function streamZipBundle(fileId: string): NextResponse | null {
  const assets = assetsForZipBundle(fileId);
  if (assets.length === 0) return null;

  const archive = new ZipArchive({ store: true });
  const pass = new PassThrough();
  archive.on('error', (err: Error) => {
    console.error('ZIP archive error:', err);
    pass.destroy(err);
  });
  archive.pipe(pass);

  let added = 0;
  for (const asset of assets) {
    const abs = resolveAssetAbsolutePath(asset);
    if (!abs) continue;
    archive.file(abs, { name: zipEntryPathForAsset(asset) });
    added += 1;
  }

  if (added === 0) {
    archive.abort();
    return null;
  }

  void archive.finalize();

  const webStream = Readable.toWeb(pass) as unknown as ReadableStream;
  const filename = zipDownloadFilename(fileId);

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Token ontbreekt' }, { status: 400 });
  }

  let verified;
  try {
    verified = verifyDownloadToken(token);
  } catch (err) {
    console.error('Download token verify config error:', err);
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

  if (isZipBundleFileId(verified.fileId)) {
    const zipResponse = streamZipBundle(verified.fileId);
    if (!zipResponse) {
      return NextResponse.json(
        {
          error:
            'Dit ZIP-bestand is nog niet beschikbaar. Neem contact op via info@seniorease.nl.',
        },
        { status: 404 },
      );
    }
    return zipResponse;
  }

  const asset = findAssetByFileId(verified.fileId);
  if (!asset) {
    return NextResponse.json({ error: 'Bestand onbekend' }, { status: 404 });
  }

  const abs = resolveAssetAbsolutePath(asset);
  if (!abs) {
    console.error('Download file missing:', asset.relativePath);
    return NextResponse.json(
      {
        error:
          'Dit bestand is nog niet beschikbaar. Neem contact op via info@seniorease.nl — we helpen u zo snel mogelijk.',
      },
      { status: 404 },
    );
  }

  const stat = statSync(abs);
  const stream = createReadStream(abs);
  const webStream = Readable.toWeb(stream) as unknown as ReadableStream;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': String(stat.size),
      'Content-Disposition': `attachment; filename="${filenameForAsset(asset.fileId)}"`,
      'Cache-Control': 'no-store',
    },
  });
}
