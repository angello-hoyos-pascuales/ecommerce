// Directiva de React para habilitar componentes del lado cliente
'use client'

// Importación de React con hooks necesarios para el estado local
import React, { useState } from 'react'

// Definición de interfaces TypeScript para tipado estricto

// Interface para una variante específica de producto (combinación color + talla)
interface ProductVariant {
  color: string
  size: string
  stock: number
  image?: string
}

// Interface para la configuración de colores disponibles
interface Color {
  name: string
  value: string    // Código hexadecimal del color para renderizado visual
  available: boolean
}

// Interface para la configuración de tallas disponibles
interface Size {
  name: string
  available: boolean
}

// Interface principal que define todas las props que recibe el componente
interface ProductVariantSelectorProps {
  colors: Color[]
  sizes: Size[]
  selectedColor: string     // Color actualmente seleccionado
  selectedSize: string      // Talla actualmente seleccionada
  onColorChange: (color: string) => void    // Callback cuando cambia el color
  onSizeChange: (size: string) => void      // Callback cuando cambia la talla
  variants?: ProductVariant[]               // Array opcional de variantes con stock
  className?: string                        // Clases CSS adicionales opcionales
}

// Componente principal para selección de variantes de producto (color y talla)
// Maneja la lógica de disponibilidad, stock y visualización de opciones
export default function ProductVariantSelector({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
  variants,
  className = ''
}: ProductVariantSelectorProps) {
  
  // Función utilitaria para obtener el stock de una combinación específica
  // Busca en el array de variantes o retorna un valor por defecto
  const getStockForVariant = (color: string, size: string): number => {
    if (!variants) return 10 // Stock por defecto si no hay variantes definidas
    const variant = variants.find(v => v.color === color && v.size === size)
    return variant?.stock || 0
  }

  // Función para verificar si una combinación específica tiene stock disponible
  // Retorna true si hay al menos 1 unidad en stock
  const isVariantAvailable = (color: string, size: string): boolean => {
    return getStockForVariant(color, size) > 0
  }

  // Función para verificar disponibilidad global de una talla
  // Una talla está disponible si existe stock en al menos un color
  const getSizeAvailability = (sizeName: string): boolean => {
    // Verificar si hay stock para cualquier color en esta talla
    return colors.some(color => 
      color.available && isVariantAvailable(color.name, sizeName)
    )
  }

  // Función para verificar disponibilidad global de un color
  // Un color está disponible si existe stock en al menos una talla
  const getColorAvailability = (colorName: string): boolean => {
    // Verificar si hay stock para cualquier talla en este color
    return sizes.some(size => 
      size.available && isVariantAvailable(colorName, size.name)
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Sección de selección de colores - Interfaz visual circular para cada color */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          Color: <span className="font-normal text-primary-600">{selectedColor}</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            // Cálculo de estados para cada color individual
            const isColorAvailable = getColorAvailability(color.name)
            const isSelected = selectedColor === color.name
            
            return (
              <button
                key={color.name}
                onClick={() => isColorAvailable && onColorChange(color.name)}
                disabled={!isColorAvailable}
                className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                  isSelected 
                    ? 'border-primary-600 scale-110 shadow-lg' 
                    : isColorAvailable 
                    ? 'border-gray-300 hover:border-primary-400 hover:scale-105' 
                    : 'border-gray-200'
                } ${!isColorAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                style={{ backgroundColor: color.value }}
                title={`${color.name}${!isColorAvailable ? ' - No disponible' : ''}`}
              >
                {/* Indicador visual de selección - checkmark blanco */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-4 h-4 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                {/* Indicador visual de no disponibilidad - X gris sobre el color */}
                {!isColorAvailable && (
                  <div className="absolute inset-0 rounded-full bg-gray-500 bg-opacity-30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>
        
        {/* Lista textual de colores disponibles para referencia del usuario */}
        <div className="mt-2 text-sm text-gray-500">
          Disponible en: {colors.filter(c => getColorAvailability(c.name)).map(c => c.name).join(', ')}
        </div>
      </div>

      {/* Sección de selección de tallas - Grid de botones rectangulares */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          Talla: <span className="font-normal text-primary-600">{selectedSize}</span>
        </h3>
        <div className="grid grid-cols-6 gap-2">
          {sizes.map((size) => {
            // Cálculo de estados y stock para cada talla individual
            const isSizeAvailable = getSizeAvailability(size.name)
            const isSelected = selectedSize === size.name
            const stock = getStockForVariant(selectedColor, size.name)
            
            return (
              <button
                key={size.name}
                onClick={() => isSizeAvailable && onSizeChange(size.name)}
                disabled={!isSizeAvailable}
                className={`relative py-3 px-2 border rounded-md text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border-primary-600 bg-primary-600 text-white shadow-md'
                    : isSizeAvailable
                    ? 'border-gray-300 text-gray-700 hover:border-primary-400 hover:bg-primary-50'
                    : 'border-gray-200 text-gray-400 cursor-not-allowed line-through bg-gray-50'
                }`}
                title={`Talla ${size.name}${!isSizeAvailable ? ' - No disponible' : stock < 5 ? ` - Solo ${stock} disponibles` : ''}`}
              >
                {size.name}
                
                {/* Indicador de alerta por poco stock - punto naranja */}
                {isSizeAvailable && stock < 5 && stock > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">!</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
        
        {/* Panel informativo de stock para la selección actual */}
        <div className="mt-2 flex items-center gap-4 text-sm">
          <span className="text-gray-600">
            Stock disponible: 
            <span className={`ml-1 font-medium ${
              getStockForVariant(selectedColor, selectedSize) < 5 ? 'text-orange-600' : 'text-green-600'
            }`}>
              {getStockForVariant(selectedColor, selectedSize)} unidades
            </span>
          </span>
          
          {/* Mensaje de urgencia cuando quedan pocas unidades */}
          {getStockForVariant(selectedColor, selectedSize) < 5 && getStockForVariant(selectedColor, selectedSize) > 0 && (
            <span className="text-orange-600 font-medium">¡Últimas unidades!</span>
          )}
        </div>
        
        {/* Enlace a la guía de tallas - funcionalidad futura */}
        <button className="mt-3 text-sm text-primary-600 hover:text-primary-700 underline">
          📏 Guía de tallas
        </button>
      </div>

      {/* Panel de resumen - Muestra la selección actual del usuario */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Selección actual:</h4>
        <div className="space-y-1 text-sm text-gray-600">
          {/* Fila del color con muestra visual */}
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full border border-gray-300" 
              style={{ backgroundColor: colors.find(c => c.name === selectedColor)?.value }}
            />
            <span>Color: {selectedColor}</span>
          </div>
          {/* Información de la talla seleccionada */}
          <div>Talla: {selectedSize}</div>
          {/* Stock específico para esta combinación */}
          <div className="font-medium text-gray-900">
            Stock: {getStockForVariant(selectedColor, selectedSize)} unidades
          </div>
        </div>
      </div>
    </div>
  )
}