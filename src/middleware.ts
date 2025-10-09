// Importación de tipos y funciones de Next.js para manejo de middleware
import { NextRequest, NextResponse } from 'next/server'

// Función middleware que se ejecuta antes de cada request a las rutas especificadas
// Actúa como interceptor para validar, redirigir o bloquear requests según condiciones
export function middleware(request: NextRequest) {
  // Protección durante el proceso de build en producción
  // Evita errores de conexión a base de datos cuando no está disponible durante deploy
  if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
    const url = request.nextUrl.clone()
    // Si el request es a una API route, bloquear con error de servicio no disponible
    if (url.pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'API not available during build' }, { status: 503 })
    }
  }

  // Si no hay restricciones, permitir que el request continúe normalmente
  return NextResponse.next()
}

// Configuración que define en qué rutas se ejecuta este middleware
// Matcher especifica el patrón de rutas donde aplicar el middleware
export const config = {
  matcher: '/api/:path*',    // Solo se ejecuta en rutas que empiecen con /api/
}