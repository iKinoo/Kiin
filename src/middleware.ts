import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // 1. Obtener la cookie de sesión
  const cookie = request.cookies.get('kiin_session');
  
  // Rutas que queremos proteger (puedes agregar más)
  // Si no hay cookie, redirigir al login
  if (!cookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // 2. Verificar que el token sea válido y original
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(cookie.value, secret);

    // 3. (Opcional) Verificar roles
    // Si intentan entrar a /admin y no son admin, mandarlos fuera
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (payload.rol !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url)); // O a una página de "No autorizado"
        }
    }

    // Si todo está bien, dejar pasar
    return NextResponse.next();

  } catch (error) {
    // Si el token es falso, expiró o está corrupto -> Login
    console.error('Error verificando sesión:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configuración: ¿En qué rutas se ejecuta este middleware?
export const config = {
  matcher: [
    '/admin/:path*',      // Protege todo lo que esté en /admin
    '/perfil/:path*',     // Protege el perfil
    '/generador/:path*',  // Protege el generador de horarios
    // NO protejas '/login' ni '/' pública
  ],
};