'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Página de confirmación exitosa de compra: muestra confirmación y próximos pasos tras el checkout
export default function CheckoutSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Icono visual de confirmación exitosa con diseño centrado */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Pedido Confirmado!
          </h1>
          
          {/* Mensaje de confirmación explicando el proceso completado */}
          <p className="text-gray-600 mb-6">
            Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación 
            con los detalles de tu compra y el seguimiento del envío.
          </p>

          {/* Panel informativo con número de pedido y tiempo estimado de entrega */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-left">
                {/* Generación de número de pedido único para seguimiento */}
                <p className="text-sm font-medium text-green-800">
                  Número de pedido: #LL-{Math.floor(Math.random() * 100000)}
                </p>
                <p className="text-xs text-green-600">
                  Tiempo estimado de entrega: 3-5 días hábiles
                </p>
              </div>
            </div>
          </div>

          {/* Botones de navegación post-compra para continuar la experiencia del usuario */}
          <div className="space-y-3">
            {/* Botón principal para continuar comprando */}
            <Link 
              href="/products" 
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors block"
            >
              Seguir Comprando
            </Link>
            
            {/* Enlace a historial de pedidos para seguimiento y gestión */}
            <Link 
              href="/profile/orders" 
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors block"
            >
              Ver Mis Pedidos
            </Link>
            
            {/* Enlace de regreso al inicio para explorar más contenido */}
            <Link 
              href="/" 
              className="w-full text-primary-600 py-2 px-4 rounded-lg font-medium hover:bg-primary-50 transition-colors block"
            >
              Volver al Inicio
            </Link>
          </div>

          {/* Sección informativa sobre los próximos pasos del proceso de entrega */}
          <div className="mt-8 pt-6 border-t text-left">
            <h3 className="font-semibold text-gray-900 mb-3">¿Qué sigue?</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              {/* Timeline del proceso post-compra con indicadores visuales */}
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Recibirás un email de confirmación en los próximos 5 minutos
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Tu pedido será procesado y enviado en 24-48 horas
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Podrás hacer seguimiento desde tu perfil de usuario
              </li>
            </ul>
          </div>

          {/* Información de contacto para soporte al cliente post-venta */}
          <div className="mt-6 pt-4 border-t">
            <p className="text-xs text-gray-500">
              ¿Necesitas ayuda? Contáctanos en{' '}
              <a href="mailto:soporte@llamativo.co" className="text-primary-600 hover:underline">
                soporte@llamativo.co
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}