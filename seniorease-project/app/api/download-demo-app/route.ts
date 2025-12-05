import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    // Demo APK download - geen licentie vereist
    // Probeer eerst via public folder (directe link)
    // Als dat niet werkt, redirect naar directe public URL
    
    const apkPath = join(process.cwd(), 'public', 'Seniorease-Bibliotheek-Demo.apk');
    
    // Check of het een Android apparaat is
    const userAgent = request.headers.get('user-agent') || '';
    const isAndroid = /Android/i.test(userAgent);
    
    try {
      // Probeer bestand te lezen
      const fileBuffer = await readFile(apkPath);
      const fileStats = await stat(apkPath);
      
      // Voor Android: gebruik inline zodat browser het kan openen
      // Voor andere: gebruik attachment voor download
      const contentDisposition = isAndroid
        ? 'inline; filename="Seniorease-Bibliotheek-Demo.apk"'
        : 'attachment; filename="Seniorease-Bibliotheek-Demo.apk"';
      
      // Log voor debugging
      console.log(`[Demo APK] Serving: ${apkPath}`);
      console.log(`[Demo APK] File size: ${fileBuffer.length} bytes`);
      console.log(`[Demo APK] Is Android: ${isAndroid}`);
      
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
    } catch (fileError: any) {
      // Bestand niet gevonden - redirect naar directe public URL
      console.error('[Demo APK] File not found at:', apkPath);
      console.error('[Demo APK] Error:', fileError?.message);
      
      // Redirect naar directe public folder link
      const origin = request.headers.get('origin') || request.headers.get('host') || 'https://seniorease.nl';
      const baseUrl = origin.startsWith('http') ? origin : `https://${origin}`;
      const publicUrl = `${baseUrl}/Seniorease-Bibliotheek-Demo.apk`;
      
      console.log('[Demo APK] Redirecting to:', publicUrl);
      
      return NextResponse.redirect(publicUrl, { status: 302 });
    }
  } catch (error: any) {
    console.error('[Demo APK] Server error:', error);
    
    // Laatste redmiddel: redirect naar public folder
    const origin = request.headers.get('origin') || request.headers.get('host') || 'https://seniorease.nl';
    const baseUrl = origin.startsWith('http') ? origin : `https://${origin}`;
    const publicUrl = `${baseUrl}/Seniorease-Bibliotheek-Demo.apk`;
    
    return NextResponse.redirect(publicUrl, { status: 302 });
  }
}

