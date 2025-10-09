'use client'

// Importación de React para el componente
import React from 'react'

// Interfaz que define las props que recibe el componente modal
interface DeleteConfirmModalProps {
  isOpen: boolean        // Controla si el modal está visible o no
  onClose: () => void    // Función que se ejecuta al cancelar o cerrar el modal
  onConfirm: () => void  // Función que se ejecuta al confirmar la eliminación
  productName: string    // Nombre del producto que se va a eliminar
  isDeleting: boolean    // Estado que indica si se está procesando la eliminación
}

// Componente modal para confirmar la eliminación de productos
export default function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  productName, 
  isDeleting 
}: DeleteConfirmModalProps) {
  // Si el modal no está abierto, no renderiza nada (early return)
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center mb-4">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg 
              className="h-6 w-6 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
        </div>
        
        {/* Contenido principal del modal con título y mensaje de confirmación */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            ¿Eliminar Producto?
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            ¿Estás seguro de que quieres eliminar <strong>"{productName}"</strong>? 
            Esta acción no se puede deshacer.
          </p>
        </div>

        {/* Contenedor de botones de acción */}
        <div className="flex space-x-3">
          {/* Botón de cancelar - cierra el modal sin realizar acción */}
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          {/* Botón de confirmar eliminación - ejecuta la función onConfirm */}
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {/* Renderizado condicional: muestra spinner si está eliminando, texto normal si no */}
            {isDeleting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Eliminando...
              </>
            ) : (
              'Eliminar'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}