import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/cv.pdf') {
    return NextResponse.redirect('/CV.pdf');
    // return NextResponse.rewrite(new URL('/CV.pdf', request.url));
  }
  if (pathname === '/portfolio.pdf') {
    return NextResponse.redirect('/Portfolio.pdf');
    // return NextResponse.rewrite(new URL('/Portfolio.pdf', request.url));
  }
  return NextResponse.next();
}
