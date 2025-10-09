'use client'

// Importaciones necesarias para el componente
import React, { useState, useEffect } from 'react'
import Link from 'next/link'          // Componente de navegación de Next.js
import { useCartStore } from '@/store/cartStore'  // Hook del store de carrito con Zustand

// Componente de carrito flotante para dispositivos móviles
const FloatingCart: React.FC = () => {
  // Obtiene el número de items y total del carrito desde el store
  const { itemCount, total } = useCartStore()
  // Estado para controlar si el carrito flotante es visible
  const [isVisible, setIsVisible] = useState(false)
  // Estado para controlar las animaciones de entrada del carrito
  const [animate, setAnimate] = useState(false)

  // Efecto que controla la visibilidad y animación del carrito flotante
  useEffect(() => {
    // Si hay productos en el carrito, muestra el botón flotante
    if (itemCount > 0) {
      setIsVisible(true)  // Hace visible el carrito
      setAnimate(true)    // Activa la animación de entrada
      // Desactiva la animación después de 500ms para evitar animación continua
      const timer = setTimeout(() => setAnimate(false), 500)
      return () => clearTimeout(timer)  // Limpia el timer al desmontar
    } else {
      // Si no hay productos, oculta el carrito flotante
      setIsVisible(false)
    }
  }, [itemCount])  // Se ejecuta cada vez que cambia el número de items

  // Si no es visible, no renderiza nada (early return)
  if (!isVisible) return null

  return (
    <>
      {/* Contenedor principal del carrito flotante - solo visible en móviles */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        {/* Link que envuelve todo el botón para navegación al carrito */}
        <Link 
          href="/cart"
          className={`group flex items-center justify-between w-full bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 active:scale-95 ${
            animate ? 'animate-bounce' : ''  // Aplica animación bounce cuando se agrega producto
          }`}
        >
          {/* Efecto de brillo que aparece al hacer hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400 to-secondary-500 opacity-0 group-hover:opacity-50 blur-lg transition-all duration-300 -z-10"></div>
          
          {/* Sección izquierda: icono del carrito y texto descriptivo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              {/* Contenedor del icono del carrito con efectos visuales */}
              <div className="relative p-2 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
              </div>
              
              {/* Badge con contador de productos - se muestra solo si hay items */}
              {itemCount > 0 && (
                <div className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-xs rounded-full flex items-center justify-center font-black shadow-lg">
                  <span className={`${animate ? 'animate-pulse' : ''}`}>{itemCount}</span>
                </div>
              )}
            </div>
            
            {/* Texto descriptivo con contador y call-to-action */}
            <div className="flex flex-col">
              <span className="text-sm font-bold">
                {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
              </span>
              <span className="text-xs opacity-90 font-medium">Ir al carrito</span>
            </div>
          </div>
          
          {/* Sección derecha: total de la compra y flecha de navegación */}
          <div className="flex items-center space-x-3">
            {/* Precio total del carrito */}
            <div className="text-right">
              <div className="font-black text-lg">
                ${total.toLocaleString()}  {/* Formatea el número con separadores de miles */}
              </div>
              <div className="text-xs opacity-90 font-medium">COP</div>
            </div>
            
            {/* Flecha animada que indica navegación */}
            <div className="p-1 rounded-full bg-white/20 group-hover:bg-white/30 transition-all duration-300">
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          {/* Borde animado que aparece al hacer hover */}
          <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400/50 opacity-0 group-hover:opacity-100 animate-pulse"></div>
        </Link>
      </div>

      {/* Espaciador que evita que el contenido de la página se superponga con el carrito flotante */}
      <div className="h-20 md:hidden"></div>
    </>
  )
}

// Exporta el componente para uso en otras partes de la aplicación
export default FloatingCart