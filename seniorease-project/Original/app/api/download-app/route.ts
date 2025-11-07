import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    // Note: Licentie wordt client-side gecheckt voordat gebruiker naar deze URL gaat
    // In productie zou je hier server-side licentie verificatie kunnen toevoegen
    // Voor nu: client-side check + redirect naar betalen pagina als geen licentie
    
    // Lees APK bestand (als die bestaat)
    const apkPath = join(process.cwd(), 'public', 'Seniorease-Bibliotheek.apk');
    
    // Check of het een Android apparaat is
    const userAgent = request.headers.get('user-agent') || '';
    const isAndroid = /Android/i.test(userAgent);
    
    try {
      const fileBuffer = await readFile(apkPath);
      const fileStats = await stat(apkPath);
      
      // Voor Android: gebruik inline zodat browser het kan openen
      // Voor andere: gebruik attachment voor download
      const contentDisposition = isAndroid
        ? 'inline; filename="Seniorease-Bibliotheek.apk"'
        : 'attachment; filename="Seniorease-Bibliotheek.apk"';
      
      // Log voor debugging (alleen in development)
      if (process.env.NODE_ENV === 'development') {
        console.log(`Serving APK: ${apkPath}`);
        console.log(`File size: ${fileBuffer.length} bytes`);
        console.log(`Last modified: ${fileStats.mtime}`);
      }
      
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/vnd.android.package-archive',
          'Content-Disposition': contentDisposition,
          'Content-Length': fileBuffer.length.toString(),
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    } catch (fileError) {
      // APK bestand bestaat nog niet
      return new NextResponse(
        JSON.stringify({ 
          error: 'APK bestand nog niet beschikbaar. Upload het bestand naar public/Seniorease-Bibliotheek.apk' 
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error: any) {
    console.error('Error serving APK:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Kon app niet downloaden' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

