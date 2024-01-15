import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.toLowerCase().includes('cv')) {
    // return NextResponse.redirect('/CV.pdf');
    return NextResponse.rewrite(new URL('/CV.pdf', request.url));
  }
  if (pathname.toLowerCase().includes('portfolio')) {
    // return NextResponse.redirect('/Portfolio.pdf');
    return NextResponse.rewrite(new URL('/Portfolio.pdf', request.url));
  }
  return NextResponse.next();
}
