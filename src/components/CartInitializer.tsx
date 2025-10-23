'use client'

import { useEffect } from 'react'
import { clearCartStorage } from '@/store/cartStore'

// Componente para inicializar y limpiar el carrito en caso de errores de migración
// Se ejecuta al cargar la aplicación para asegurar que el store funcione correctamente
export default function CartInitializer() {
  useEffect(() => {
    // Función para detectar y limpiar datos corruptos del localStorage
    const initializeCart = () => {
      try {
        if (typeof window !== 'undefined') {
          // Intentar obtener los datos del carrito desde localStorage
          const storedData = localStorage.getItem('cart-storage')
          
          if (storedData) {
            try {
              // Intentar parsear los datos
              const parsedData = JSON.parse(storedData)
              
              // Verificar si es la versión anterior (versión 1 o indefinida)
              if (!parsedData.version || parsedData.version < 2) {
                console.log('Datos de carrito de versión anterior detectados, actualizando...')
                clearCartStorage()
                return
              }
              
              // Verificar si la estructura es válida
              if (!parsedData || !parsedData.state || !Array.isArray(parsedData.state.items)) {
                console.warn('Estructura de carrito inválida detectada, limpiando localStorage...')
                clearCartStorage()
                return
              }
              
              // Verificar que cada item tenga la estructura correcta
              const hasInvalidItems = parsedData.state.items.some((item: any) => 
                !item ||
                typeof item.productId !== 'string' ||
                typeof item.name !== 'string' ||
                typeof item.price !== 'number' ||
                typeof item.quantity !== 'number' ||
                typeof item.image !== 'string' ||
                !item.variant ||
                typeof item.variant.color !== 'string' ||
                typeof item.variant.size !== 'string'
              )
              
              if (hasInvalidItems) {
                console.warn('Items de carrito con estructura inválida detectados, limpiando localStorage...')
                clearCartStorage()
                return
              }
              
              console.log('Carrito inicializado correctamente con', parsedData.state.items.length, 'items')
            } catch (parseError) {
              console.error('Error al parsear datos de carrito:', parseError)
              clearCartStorage()
            }
          } else {
            console.log('No hay datos de carrito almacenados, iniciando con carrito vacío')
          }
        }
      } catch (error) {
        console.error('Error al inicializar carrito:', error)
        // En caso de cualquier error, limpiar localStorage
        clearCartStorage()
      }
    }

    // Ejecutar la inicialización después de que el componente se monte
    const timeoutId = setTimeout(initializeCart, 100)
    
    // Cleanup del timeout
    return () => clearTimeout(timeoutId)
  }, [])

  // Este componente no renderiza nada, solo se encarga de la inicialización
  return null
}