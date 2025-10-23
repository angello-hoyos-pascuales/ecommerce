// Importación de tipos y funciones de Next.js para manejo de middleware
import { NextRequest, NextResponse } from 'next/server'

// Función middleware simplificada que solo funciona en desarrollo
// Se deshabilita automáticamente para static export en producción
export function middleware(request: NextRequest) {
  // Solo ejecutar middleware en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.next()
  }

  // En desarrollo, verificar rutas de API
  const url = request.nextUrl.clone()
  if (url.pathname.startsWith('/api/')) {
    // En desarrollo, permitir todas las API routes
    return NextResponse.next()
  }

  // Para todas las demás rutas, continuar normalmente
  return NextResponse.next()
}

// Configuración condicional del middleware
// Solo activo en desarrollo para evitar conflictos con static export
export const config = {
  matcher: process.env.NODE_ENV === 'development' ? '/api/:path*' : [],
}