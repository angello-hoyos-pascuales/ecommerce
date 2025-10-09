// Importación de Zustand para manejo de estado global
import { create } from 'zustand'

// Interface que define la estructura de un usuario en el sistema
interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'customer' | 'admin'  // Roles para control de acceso
}

// Interface que define el estado y acciones del store de autenticación
// Incluye el estado del usuario, loading states y métodos para manipular el estado
interface AuthStore {
  user: User | null                          // Usuario actual o null si no está autenticado
  isLoading: boolean                         // Estado de carga para operaciones asíncronas
  setUser: (user: User | null) => void      // Función para establecer el usuario actual
  setLoading: (loading: boolean) => void     // Función para controlar estados de carga
  logout: () => void                         // Función para cerrar sesión del usuario
}

// Store de autenticación global usando Zustand para gestión de estado
// Proporciona un estado centralizado para el usuario autenticado y estados de carga
export const useAuthStore = create<AuthStore>((set) => ({
  // Estado inicial: usuario no autenticado y en estado de carga
  user: null,
  isLoading: true,

  // Función para establecer o actualizar el usuario actual
  // Se usa después de login exitoso o al restaurar sesión
  setUser: (user) => set({ user }),
  
  // Función para controlar el estado de carga durante operaciones asíncronas
  // Útil para mostrar spinners o estados de loading en la UI
  setLoading: (isLoading) => set({ isLoading }),

  // Función para cerrar sesión del usuario actual
  // Limpia el estado del usuario y puede extenderse para limpiar tokens, localStorage, etc.
  logout: () => {
    set({ user: null })
    // Aquí puedes agregar lógica adicional para limpiar tokens, etc.
  },
}))