import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    
    // In a real app, you would sign/verify this token. 
    // For this simple implementation, we just check if it exists & equals the password hash or simple secret.
    if (adminToken !== 'auth_cesar_2001') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
