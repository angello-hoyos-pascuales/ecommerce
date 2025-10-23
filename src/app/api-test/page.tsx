'use client'

import React, { useState, useEffect } from 'react'

// Página de testing para verificar funcionalidad de APIs en desarrollo local
export default function ApiTestPage() {
  const [productos, setProductos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ambiente, setAmbiente] = useState('')

  // Detectar el ambiente actual
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        setAmbiente('🔨 Desarrollo Local')
      } else if (hostname.includes('github.io')) {
        setAmbiente('🌐 GitHub Pages')
      } else {
        setAmbiente('🌍 Otro Ambiente')
      }
    }
  }, [])

  // Función para probar la API de productos
  const probarAPI = async () => {
    setLoading(true)
    setError('')
    setProductos([])

    try {
      const response = await fetch('/api/products')
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setProductos(data)
      console.log('✅ API Response:', data)
    } catch (err: any) {
      console.error('❌ API Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header con información del ambiente */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">🧪 Testing de APIs</h1>
          <p className="text-lg">Ambiente actual: <span className="font-bold">{ambiente}</span></p>
          <p className="text-sm opacity-90">
            URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}
          </p>
        </div>

        {/* Información sobre APIs */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              ✅ Desarrollo Local (localhost)
            </h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• APIs funcionan completamente</li>
              <li>• Conexión a base de datos posible</li>
              <li>• Middleware activo</li>
              <li>• Hot reload automático</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              ⚠️ GitHub Pages (github.io)
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• APIs no disponibles (sitio estático)</li>
              <li>• Sin conexión a base de datos</li>
              <li>• Solo frontend funcional</li>
              <li>• Datos mock únicamente</li>
            </ul>
          </div>
        </div>

        {/* Botón de testing */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">🔍 Probar API de Productos</h2>
          <button
            onClick={probarAPI}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '🔄 Probando...' : '🚀 Probar GET /api/products'}
          </button>
        </div>

        {/* Resultados */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Error</h3>
            <p className="text-red-700 font-mono text-sm">{error}</p>
            <div className="mt-3 text-sm text-red-600">
              {ambiente.includes('GitHub Pages') ? (
                <p>✅ <strong>Esto es esperado en GitHub Pages</strong> - Las APIs no funcionan en hosting estático.</p>
              ) : (
                <p>🔧 Este error indica un problema en el servidor de desarrollo local.</p>
              )}
            </div>
          </div>
        )}

        {productos.length > 0 && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              ✅ API Funcionando - {productos.length} productos obtenidos
            </h3>
            <div className="grid gap-3">
              {productos.slice(0, 3).map((producto, index) => (
                <div key={index} className="bg-white p-3 rounded border">
                  <h4 className="font-semibold">{producto.name || `Producto ${index + 1}`}</h4>
                  <p className="text-sm text-gray-600">
                    ID: {producto._id || producto.id || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Precio: ${producto.price || 'N/A'}
                  </p>
                </div>
              ))}
              {productos.length > 3 && (
                <p className="text-sm text-gray-500">... y {productos.length - 3} productos más</p>
              )}
            </div>
          </div>
        )}

        {/* Instrucciones */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mt-6">
          <h3 className="text-lg font-semibold mb-3">📋 Instrucciones</h3>
          <div className="space-y-2 text-sm">
            <p><strong>En Desarrollo Local:</strong> Las APIs deberían funcionar y mostrar datos reales.</p>
            <p><strong>En GitHub Pages:</strong> Las APIs fallarán (esperado) porque es un sitio estático.</p>
            <p><strong>Carrito:</strong> Funciona en ambos entornos porque usa localStorage.</p>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div className="flex flex-wrap gap-4 mt-6">
          <a 
            href="/" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            🏠 Página Principal
          </a>
          <a 
            href="/products" 
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            🛍️ Productos
          </a>
          <a 
            href="/admin" 
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
          >
            🔧 Admin
          </a>
        </div>
      </div>
    </div>
  )
}