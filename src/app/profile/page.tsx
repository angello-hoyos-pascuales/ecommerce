'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

// Componente de página protegida para gestionar el perfil del usuario autenticado
// Incluye formulario editable, navegación lateral y estadísticas de cuenta
// Implementa protección de ruta y redirección automática para usuarios no autenticados
export default function ProfilePage() {
  // Obtiene datos del usuario y función de logout del contexto de autenticación
  const { user, logout } = useAuth()
  const router = useRouter()
  
  // Estado para controlar el modo de edición del formulario
  const [isEditing, setIsEditing] = useState(false)
  
  // Estado del formulario con datos del usuario y información adicional
  // Inicializa con datos del usuario actual o valores por defecto
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+57 300 123 4567',
    address: 'Calle 123 #45-67, Bogotá, Colombia',
    city: 'Bogotá',
    department: 'Cundinamarca'
  })

  // Efecto para proteger la ruta y redirigir usuarios no autenticados
  // Se ejecuta cada vez que cambia el estado del usuario o el router
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // Función para manejar el envío del formulario de actualización de perfil
  // Simula actualización de datos y sale del modo edición
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se actualizaría la información del usuario
    setIsEditing(false)
    alert('Información actualizada correctamente')
  }

  // Función para cerrar sesión y redirigir al inicio
  // Utiliza la función logout del contexto y navega a la homepage
  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Pantalla de carga mientras se verifica la autenticación del usuario
  // Muestra spinner y mensaje informativo durante la verificación
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  return (
    // Contenedor principal con fondo gris y padding responsivo
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Wrapper centrado con ancho máximo para mejorar legibilidad */}
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header de la página con título y descripción */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-gray-600">Gestiona tu información personal y preferencias</p>
        </div>

        {/* Layout principal con grid responsivo: sidebar + contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar de navegación y información del usuario */}
          <div className="lg:col-span-1">
            {/* Card del perfil con avatar, datos básicos y navegación */}
            <div className="bg-white rounded-lg shadow p-6">
              {/* Sección del avatar y datos básicos del usuario */}
              <div className="text-center mb-6">
                {/* Avatar circular con inicial del nombre */}
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                {/* Badge de administrador condicional */}
                {user.role === 'admin' && (
                  <span className="inline-block mt-2 px-3 py-1 bg-primary-100 text-primary-600 text-sm rounded-full">
                    Administrador
                  </span>
                )}
              </div>

              {/* Menú de navegación lateral con opciones del perfil */}
              <nav className="space-y-2">
                <button className="w-full text-left px-4 py-2 bg-primary-50 text-primary-600 rounded-lg font-medium">
                  👤 Información Personal
                </button>
                <button 
                  onClick={() => router.push('/orders')}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  📦 Mis Pedidos
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  💳 Métodos de Pago
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  📍 Direcciones
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  🔔 Notificaciones
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  🚪 Cerrar Sesión
                </button>
              </nav>
            </div>
          </div>

          {/* Contenido principal: formulario de información personal */}
          <div className="lg:col-span-2">
            {/* Card principal del formulario con header y toggle de edición */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-medium text-gray-900">Información Personal</h2>
                  {/* Botón para alternar entre modo vista y edición */}
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors"
                  >
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </button>
                </div>
              </div>

              {/* Formulario de datos personales con campos habilitados/deshabilitados según modo */}
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  {/* Grid responsivo de campos del formulario */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campo de nombre completo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
                      />
                    </div>

                    {/* Campo de email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
                      />
                    </div>

                    {/* Campo de teléfono */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
                      />
                    </div>

                    {/* Campo de ciudad */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
                      />
                    </div>

                    {/* Campo de dirección que ocupa 2 columnas */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
                      />
                    </div>

                    {/* Select de departamento con opciones predefinidas */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Departamento
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
                      >
                        <option value="Cundinamarca">Cundinamarca</option>
                        <option value="Antioquia">Antioquia</option>
                        <option value="Valle del Cauca">Valle del Cauca</option>
                        <option value="Atlántico">Atlántico</option>
                        <option value="Santander">Santander</option>
                      </select>
                    </div>
                  </div>

                  {/* Botones de acción que solo aparecen en modo edición */}
                  {isEditing && (
                    <div className="mt-6 flex gap-4">
                      <button
                        type="submit"
                        className="bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700 transition-colors"
                      >
                        Guardar Cambios
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Sección de estadísticas de la cuenta del usuario */}
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Estadísticas de la Cuenta</h3>
              {/* Grid de métricas con datos simulados del usuario */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary-600">12</p>
                  <p className="text-sm text-gray-600">Pedidos Realizados</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">$1.456.780</p>
                  <p className="text-sm text-gray-600">Total Gastado</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">5</p>
                  <p className="text-sm text-gray-600">Productos Favoritos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}