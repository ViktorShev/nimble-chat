import type { MiddlewareConfig, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const publicPaths = ['/', '/signup']

  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  const token = req.cookies.get('jwt')?.value

  if (!token) {
    const url = new URL('/', req.url)

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
