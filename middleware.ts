import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip auth if disabled
  if (process.env.AUTH_DISABLED === 'true') {
    return NextResponse.next();
  }

  // Skip auth for static public files
  if (request.nextUrl.pathname.startsWith('/_next/') ||
      request.nextUrl.pathname.startsWith('/favicon') ||
      request.nextUrl.pathname.match(/\.(png|jpg|svg|ico)$/)) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="OpenClaw Bot Dashboard"' },
    });
  }

  const expected = Buffer.from(
    `${process.env.AUTH_USERNAME}:${process.env.AUTH_PASSWORD}`
  ).toString('base64');

  if (authHeader !== `Basic ${expected}`) {
    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="OpenClaw Bot Dashboard"' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};