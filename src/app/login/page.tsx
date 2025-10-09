'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Componente principal de página de inicio de sesión con funcionalidad completa
// Maneja autenticación, validación, redirección y diferentes tipos de usuario
export default function LoginPage() {
  // Estados locales para manejar el formulario de login y su comportamiento
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Accede a funcionalidades de autenticación desde el contexto global
  const { login, isLoading, user } = useAuth()
  // Hook para navegación programática entre páginas
  const router = useRouter()

  // Efecto para evitar problemas de hidratación en el renderizado del lado servidor
  useEffect(() => {
    setMounted(true)
  }, [])

  // Efecto que redirige automáticamente usuarios ya autenticados
  useEffect(() => {
    if (mounted && user) {
      router.push('/')
    }
  }, [mounted, user, router])

  // Función principal que maneja el envío del formulario de login
  // Incluye validación, autenticación y redirección según tipo de usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validación básica de campos requeridos
    if (!email || !password) {
      setError('Por favor ingresa email y contraseña')
      return
    }

    try {
      // Intenta autenticar con las credenciales proporcionadas
      const success = await login(email, password)
      
      if (success) {
        // Sistema de redirección inteligente basado en el tipo de usuario
        // Administradores y gerentes van al panel de admin, usuarios regulares al home
        if (email.includes('admin') || email.includes('gerente')) {
          router.push('/admin')
        } else {
          router.push('/')
        }
      } else {
        setError('Email o contraseña incorrectos')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Error al iniciar sesión. Intenta de nuevo.')
    }
  }

  // Renderiza pantalla de carga mientras se inicializa el componente
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // Muestra pantalla de redirección para usuarios ya autenticados
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-600 font-semibold">Redirigiendo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Encabezado con branding y título de la página */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-primary-600 mb-2">
              Llamativo.co 🇨🇴
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-gray-600">
            Accede a tu cuenta de administrador
          </p>
        </div>

        {/* Formulario principal de autenticación con validación y manejo de errores */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Componente de alerta para mostrar errores de autenticación */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Campo de entrada para email con validación de formato */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="tu@email.com"
                required
              />
            </div>

            {/* Campo de contraseña con funcionalidad de mostrar/ocultar */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                {/* Botón toggle para visibilidad de contraseña con iconos dinámicos */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Botón de envío con estados de carga y disabled durante procesamiento */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {/* Renderizado condicional de contenido del botón según estado de carga */}
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Sección de credenciales de prueba para facilitar testing y demo */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Credenciales de prueba:</h3>
            <div className="space-y-2 text-sm">
              {/* Tarjetas con diferentes tipos de usuarios para testing */}
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-gray-900">👨‍💼 Administrador Principal</p>
                <p className="text-gray-600">Email: admin@llamativo.co</p>
                <p className="text-gray-600">Contraseña: admin123</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-gray-900">👩‍💼 Gerente de Tienda</p>
                <p className="text-gray-600">Email: gerente@llamativo.co</p>
                <p className="text-gray-600">Contraseña: gerente123</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-gray-900">👤 Usuario Regular</p>
                <p className="text-gray-600">Email: usuario@test.com</p>
                <p className="text-gray-600">Contraseña: user123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pie de página con enlace de navegación de regreso */}
        <div className="text-center">
          <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm">
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  )
}