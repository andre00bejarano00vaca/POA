import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  // Redirigir raíz a /login
  // if (!(cookieStore.get("user") && cookieStore.get("password"))) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
}

export const config = {
  matcher: ['/'],
};