'use client'

// Importaciones necesarias para el componente Header
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'                    // Navegación SPA de Next.js
import { useCartStore } from '@/store/cartStore'  // Store de carrito con Zustand
import { useAuth } from '@/context/AuthContext'   // Context de autenticación

// Componente Header memoizado para optimizar re-renders
const Header: React.FC = React.memo(() => {
  // Estados obtenidos de stores externos
  const { itemCount } = useCartStore()                           // Número de items en el carrito
  const { user, logout, isAdmin, isLoading } = useAuth()        // Estados de autenticación
  
  // Estados locales para controlar la interfaz
  const [showUserMenu, setShowUserMenu] = useState(false)       // Controla dropdown del usuario
  const [showMobileMenu, setShowMobileMenu] = useState(false)   // Controla menú móvil
  const [isScrolled, setIsScrolled] = useState(false)           // Detecta scroll para efectos visuales

  // Optimiza el scroll listener con throttling para mejor performance
  useEffect(() => {
    let ticking = false
    
    // Función que detecta el scroll y actualiza el estado con throttling
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Cambia el estilo del header basado en la posición del scroll
          setIsScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    
    // Agrega listener con passive:true para mejor performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Cleanup function para remover el listener
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Función memoizada para manejar logout de forma eficiente
  const handleLogout = useCallback(() => {
    logout()                    // Ejecuta logout desde el context de autenticación
    setShowUserMenu(false)      // Cierra el menú de usuario después del logout
  }, [logout])

  // Memoiza las clases CSS del header para evitar recálculos innecesarios
  const headerClasses = useMemo(() => 
    `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50'  // Estado con scroll
        : 'bg-white/90 backdrop-blur-md shadow-lg'                              // Estado inicial
    }`,
    [isScrolled]  // Solo recalcula cuando cambia el estado de scroll
  )

  return (
    <header className={headerClasses}>
      {/* Línea decorativa superior con gradiente */}
      <div className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600"></div>
      
      {/* Contenedor principal responsive */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo animado con efectos hover */}
          <Link href="/" className="group relative flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="relative">
                {/* Icono del logo con rotación en hover */}
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                {/* Punto decorativo animado */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              {/* Texto del logo con gradiente */}
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Llamativo
                </span>
                <span className="text-xs font-medium text-gray-500 -mt-1">.co</span>
              </div>
            </div>
          </Link>
          
          {/* Menú de navegación principal - solo visible en pantallas grandes */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Enlaces de navegación con efectos hover y línea animada */}
            <Link href="/productos" className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary-50">
              <span className="text-gray-700 group-hover:text-primary-600 font-medium">Productos</span>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </Link>
            
            <Link href="/categories" className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary-50">
              <span className="text-gray-700 group-hover:text-primary-600 font-medium">Categorías</span>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </Link>
            
            <Link href="/about" className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary-50">
              <span className="text-gray-700 group-hover:text-primary-600 font-medium">Nosotros</span>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </Link>
            
            {/* Enlace de testing de APIs - visible en desarrollo */}
            {process.env.NODE_ENV === 'development' && (
              <Link href="/api-test" className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-yellow-50">
                <span className="text-gray-700 group-hover:text-yellow-600 font-medium flex items-center space-x-1">
                  <span>🧪</span>
                  <span>API Test</span>
                </span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </Link>
            )}
            
            {/* Enlace especial de administración - solo visible para admins */}
            {isAdmin() && (
              <Link href="/admin" className="group relative px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                <span className="flex items-center space-x-2">
                  <span className="text-lg">⚡</span>
                  <span>Admin</span>
                </span>
              </Link>
            )}
          </nav>
          
          {/* Sección derecha - Botones de acción y autenticación */}
          <div className="flex items-center space-x-3">
            {/* Botón de búsqueda - solo visible en desktop */}
            <button className="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Botón del carrito con contador - solo visible en desktop */}
            <Link href="/cart" className="hidden md:block relative p-2 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
              {/* Badge con número de items - aparece solo si hay productos en el carrito */}
              {itemCount > 0 && (
                <div className="absolute -top-1 -right-1 min-w-[18px] h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </div>
              )}
            </Link>

            {/* Sección de autenticación del usuario */}
            {/* Estado de carga - muestra skeleton mientras verifica la autenticación */}
            {isLoading ? (
              <div className="p-2 bg-gray-200 rounded-lg animate-pulse">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
              </div>
            ) : user ? (
              // Usuario autenticado - menú dropdown con perfil completo
              <div className="relative">
                {/* Botón del perfil de usuario con avatar y información */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="group flex items-center space-x-3 px-3 py-2 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 transition-all duration-300 transform hover:scale-105"
                >
                  {/* Avatar del usuario con indicador de estado */}
                  <div className="relative">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center ring-2 ring-white shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {/* Indicador verde de "usuario activo" */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white"></div>
                  </div>
                  {/* Información del usuario - solo visible en desktop */}
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-900">{user.name.split(' ')[0]}</span>
                    {/* Badge especial para administradores */}
                    {isAdmin() && (
                      <span className="text-xs text-primary-600 font-medium">Admin</span>
                    )}
                  </div>
                  {/* Icono de flecha indicando dropdown */}
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Menú dropdown del usuario - aparece cuando se hace clic en el avatar */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl py-2 z-50 border border-gray-100 backdrop-blur-lg">
                    {/* Cabecera del menú con información completa del usuario */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        {/* Avatar más grande para el menú */}
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        {/* Información detallada del usuario */}
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          {/* Badge especial para administradores en el menú */}
                          {isAdmin() && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs rounded-full">
                              Administrador
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Opciones del menú - enlaces y acciones disponibles */}
                    <div className="py-2">
                      {/* Opción especial de administración - solo para admins */}
                      {isAdmin() && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <span className="text-lg">⚡</span>
                          <span className="font-medium">Panel de Admin</span>
                        </Link>
                      )}
                      
                      {/* Separador visual antes del logout */}
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        {/* Botón de cerrar sesión - acción destructiva con estilo diferenciado */}
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          <span className="text-lg">🚪</span>
                          <span className="font-medium">Cerrar Sesión</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Usuario no autenticado - botón para iniciar sesión
              <Link 
                href="/login" 
                className="hidden md:block p-2 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                title="Iniciar Sesión"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}

            {/* Botón del menú móvil - solo visible en pantallas pequeñas */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil - aparece como overlay completo en pantallas pequeñas */}
        {showMobileMenu && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-xl">
            <div className="px-4 py-6 space-y-4">
              {/* Enlaces de navegación principales para móvil */}
              <Link 
                href="/productos" 
                className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-all duration-200"
                onClick={() => setShowMobileMenu(false)}
              >
                🛍️ Productos
              </Link>
              <Link 
                href="/categories" 
                className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-all duration-200"
                onClick={() => setShowMobileMenu(false)}
              >
                📂 Categorías
              </Link>
              <Link 
                href="/about" 
                className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-all duration-200"
                onClick={() => setShowMobileMenu(false)}
              >
                ℹ️ Nosotros
              </Link>
              
              {/* Botón de login para móvil - solo si no está autenticado */}
              {!user && (
                <Link 
                  href="/login" 
                  className="flex items-center justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-medium shadow-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Iniciar Sesión
                </Link>
              )}
              
              {/* Enlace especial de admin para móvil - solo visible para administradores */}
              {isAdmin() && (
                <Link 
                  href="/admin" 
                  className="block py-3 px-4 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-medium"
                  onClick={() => setShowMobileMenu(false)}
                >
                  ⚡ Panel de Admin
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
})

// Asignación del nombre para debugging en React DevTools
Header.displayName = 'Header'

// Exportación por defecto del componente Header memoizado
export default Header