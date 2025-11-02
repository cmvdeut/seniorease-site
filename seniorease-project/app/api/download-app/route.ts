import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    // Note: Licentie wordt client-side gecheckt voordat gebruiker naar deze URL gaat
    // In productie zou je hier server-side licentie verificatie kunnen toevoegen
    // Voor nu: client-side check + redirect naar betalen pagina als geen licentie
    
    // Lees APK bestand (als die bestaat)
    const apkPath = join(process.cwd(), 'public', 'Seniorease-Bibliotheek.apk');
    
    try {
      const fileBuffer = await readFile(apkPath);
      
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/vnd.android.package-archive',
          'Content-Disposition': 'attachment; filename="Seniorease-Bibliotheek.apk"',
          'Content-Length': fileBuffer.length.toString(),
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

