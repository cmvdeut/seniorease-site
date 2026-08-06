import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BLOCKED_TEST_PATHS = ['/test-demo', '/test-licentie', '/test-stripe'] as const;

function isBlockedTestPath(pathname: string) {
  return BLOCKED_TEST_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

/** Alleen in `next dev` open; op productie (Vercel / next start) dicht. */
function shouldBlockTestPages() {
  return process.env.NODE_ENV === 'production';
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const url = request.nextUrl.clone();

  // Redirect non-www to www for consistent canonical URLs
  if (host === 'seniorease.nl') {
    url.host = 'www.seniorease.nl';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Interne testpagina’s niet publiek op live
  if (isBlockedTestPath(url.pathname) && shouldBlockTestPages()) {
    url.pathname = '/__niet-beschikbaar';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|html|json|js|css)$).*)',
  ],
};
