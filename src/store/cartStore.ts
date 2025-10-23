// Importación de Zustand para manejo de estado global y middleware de persistencia
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Interface que define la estructura de un item individual en el carrito
// Incluye toda la información necesaria para mostrar y procesar el producto
interface CartItem {
  productId: string        // ID único del producto para referencias
  name: string            // Nombre del producto para display
  price: number           // Precio unitario en la moneda local
  quantity: number        // Cantidad seleccionada por el usuario
  image: string          // URL de imagen para preview en carrito
  variant: {             // Variante específica seleccionada
    color: string
    size: string
  }
}

// Interface que define el estado completo del carrito y todas sus acciones
// Incluye los items, totales calculados y métodos para manipular el carrito
interface CartStore {
  items: CartItem[]       // Array de todos los productos en el carrito
  total: number          // Total monetario de todos los items
  itemCount: number      // Cantidad total de items (suma de quantities)
  addItem: (item: CartItem) => void                    // Agregar producto al carrito
  removeItem: (productId: string, variant: { color: string; size: string }) => void  // Eliminar item específico
  updateQuantity: (productId: string, variant: { color: string; size: string }, quantity: number) => void  // Actualizar cantidad
  clearCart: () => void                                // Vaciar carrito completamente
  calculateTotals: () => void                          // Recalcular totales automáticamente
}

// Store global del carrito con persistencia automática en localStorage
// Utiliza Zustand para estado global y middleware persist para mantener datos entre sesiones
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Estado inicial del carrito vacío
      items: [],
      total: 0,
      itemCount: 0,

      // Función para agregar productos al carrito con lógica de combinación inteligente
      // Si el mismo producto con la misma variante ya existe, incrementa la cantidad
      addItem: (newItem) => {
        const { items } = get()
        // Buscar si ya existe el mismo producto con la misma variante
        const existingItemIndex = items.findIndex(
          (item) =>
            item.productId === newItem.productId &&
            item.variant.color === newItem.variant.color &&
            item.variant.size === newItem.variant.size
        )

        if (existingItemIndex > -1) {
          // Si existe, actualizar cantidad del item existente
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += newItem.quantity
          set({ items: updatedItems })
        } else {
          // Si no existe, agregar como nuevo item al carrito
          set({ items: [...items, newItem] })
        }
        
        // Recalcular totales después de agregar
        get().calculateTotals()
      },

      // Función para eliminar completamente un item específico del carrito
      // Identifica el item por productId y variante exacta (color + talla)
      removeItem: (productId, variant) => {
        const { items } = get()
        // Filtrar para remover el item que coincida exactamente
        const updatedItems = items.filter(
          (item) =>
            !(item.productId === productId &&
              item.variant.color === variant.color &&
              item.variant.size === variant.size)
        )
        set({ items: updatedItems })
        // Recalcular totales después de eliminar
        get().calculateTotals()
      },

      // Función para actualizar la cantidad de un item específico en el carrito
      // Si la cantidad es 0 o menor, elimina el item completamente
      updateQuantity: (productId, variant, quantity) => {
        const { items } = get()
        if (quantity <= 0) {
          // Si cantidad es 0 o negativa, eliminar el item
          get().removeItem(productId, variant)
          return
        }

        // Actualizar cantidad del item que coincida con productId y variante
        const updatedItems = items.map((item) =>
          item.productId === productId &&
          item.variant.color === variant.color &&
          item.variant.size === variant.size
            ? { ...item, quantity }  // Crear nuevo objeto con cantidad actualizada
            : item                   // Mantener item sin cambios
        )
        set({ items: updatedItems })
        // Recalcular totales después de actualizar
        get().calculateTotals()
      },

      // Función para vaciar completamente el carrito
      // Útil para después de completar una compra o reset manual
      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 })
      },

      // Función utilitaria para recalcular automáticamente todos los totales
      // Se ejecuta después de cada operación que modifica el carrito
      calculateTotals: () => {
        const { items } = get()
        // Calcular total monetario: suma de (precio × cantidad) para cada item
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        // Calcular cantidad total de items: suma de todas las quantities
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
        set({ total, itemCount })
      },
    }),
    {
      // Configuración del middleware de persistencia
      name: 'cart-storage',    // Nombre de la key en localStorage
      version: 2,              // Incrementada para forzar limpieza de datos incompatibles
      
      // Función de migración para manejar cambios en la estructura del store
      migrate: (persistedState: any, version: number) => {
        // Si la versión es anterior a 2, limpiar datos y empezar de nuevo
        if (version < 2) {
          console.log('Migrando carrito a versión 2, limpiando datos anteriores...')
          return {
            items: [],
            total: 0,
            itemCount: 0,
          }
        }
        
        // Si no hay estado persistido, retornar estado inicial
        if (!persistedState) {
          return {
            items: [],
            total: 0,
            itemCount: 0,
          }
        }
        
        // Validar que el estado persistido tenga la estructura correcta
        if (persistedState && typeof persistedState === 'object') {
          // Asegurar que items es un array válido
          const items = Array.isArray(persistedState.items) ? persistedState.items : []
          
          // Validar cada item del carrito
          const validItems = items.filter((item: any) => 
            item && 
            typeof item.productId === 'string' &&
            typeof item.name === 'string' &&
            typeof item.price === 'number' &&
            typeof item.quantity === 'number' &&
            typeof item.image === 'string' &&
            item.variant &&
            typeof item.variant.color === 'string' &&
            typeof item.variant.size === 'string'
          )
          
          // Recalcular totales basados en items válidos
          const total = validItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
          const itemCount = validItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
          
          return {
            items: validItems,
            total,
            itemCount,
          }
        }
        
        // Si el estado no es válido, retornar estado inicial
        return {
          items: [],
          total: 0,
          itemCount: 0,
        }
      },
      
      // Función de serialización personalizada para asegurar datos válidos
      serialize: (state) => JSON.stringify(state),
      
      // Función de deserialización personalizada con validación
      deserialize: (str) => {
        try {
          return JSON.parse(str)
        } catch {
          // Si hay error al parsear, retornar estado inicial
          return {
            items: [],
            total: 0,
            itemCount: 0,
          }
        }
      },
    }
  )
)

// Función utilitaria para limpiar el localStorage en caso de problemas
export const clearCartStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cart-storage')
  }
}
