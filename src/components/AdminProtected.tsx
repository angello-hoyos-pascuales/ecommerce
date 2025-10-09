'use client'

// Importaciones necesarias para el componente
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'  // Hook personalizado para autenticación
import { useRouter } from 'next/navigation'     // Hook de Next.js para navegación

// Interfaz que define las props que recibe el componente
interface AdminProtectedProps {
  children: React.ReactNode  // Contenido que se renderizará si el usuario tiene permisos
  fallback?: React.ReactNode // Componente opcional a mostrar si no tiene permisos
}

// Componente de protección para rutas administrativas - valida que el usuario tenga permisos de administrador
export default function AdminProtected({ children, fallback }: AdminProtectedProps) {
  // Obtiene el estado de autenticación del usuario y función para verificar si es admin
  const { user, isLoading, isAdmin } = useAuth()
  // Hook para navegación programática entre rutas
  const router = useRouter()
  // Estado local para controlar si aún se están verificando los permisos
  const [isChecking, setIsChecking] = useState(true)

  // Efecto que se ejecuta cuando cambian las dependencias de autenticación
  useEffect(() => {
    // Solo ejecuta las validaciones cuando ya no está cargando la información del usuario
    if (!isLoading) {
      // Si no hay usuario autenticado, redirige al login
      if (!user) {
        router.push('/login')
        return
      }
      
      // Si el usuario no tiene permisos de administrador, redirige al inicio
      if (!isAdmin()) {
        router.push('/')
        return
      }
      
      // Si pasa todas las validaciones, marca que ya terminó de verificar
      setIsChecking(false)
    }
  }, [user, isLoading, isAdmin, router])

  // Muestra pantalla de carga mientras verifica la autenticación y permisos
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    )
  }

  // Si no hay usuario o no es admin, muestra pantalla de acceso denegado
  if (!user || !isAdmin()) {
    // Permite usar un componente personalizado de fallback o usa el por defecto
    return fallback || (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h2>
          <p className="text-gray-600 mb-4">No tienes permisos para acceder a esta página</p>
          <button
            onClick={() => router.push('/')}
            className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  // Si pasa todas las validaciones, renderiza el contenido protegido (children)
  return <>{children}</>
}