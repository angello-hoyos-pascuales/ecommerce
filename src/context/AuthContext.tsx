// Directiva para habilitar componentes del lado cliente
'use client'

// Importación de React con hooks necesarios para Context API
import React, { createContext, useContext, useState, useEffect } from 'react'

// Interface que define la estructura de un usuario en el sistema
interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'  // Roles específicos para control de acceso
}

// Interface que define todos los métodos y propiedades del contexto de autenticación
interface AuthContextType {
  user: User | null                                              // Usuario actual o null si no está autenticado
  isLoading: boolean                                             // Estado de carga durante operaciones de auth
  login: (email: string, password: string) => Promise<boolean>   // Función asíncrona de login
  logout: () => void                                             // Función para cerrar sesión
  isAdmin: () => boolean                                         // Función para verificar permisos de administrador
}

// Creación del contexto React para compartir estado de autenticación globalmente
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Componente proveedor que envuelve la aplicación para proporcionar contexto de autenticación
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Estados locales para manejar usuario actual y estados de carga
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Base de datos simulada de usuarios para desarrollo y demo
  // En producción esto sería reemplazado por API calls a base de datos real
  const users = [
    {
      id: 'admin-1',
      email: 'admin@llamativo.co',
      password: 'admin123',
      name: 'Administrador Llamativo',
      role: 'admin' as const
    },
    {
      id: 'admin-2', 
      email: 'gerente@llamativo.co',
      password: 'gerente123',
      name: 'Gerente de Tienda',
      role: 'admin' as const
    },
    {
      id: 'user-1',
      email: 'usuario@test.com',
      password: 'user123',
      name: 'Usuario Prueba',
      role: 'user' as const
    }
  ]

  // Hook de efecto para restaurar sesión persistida al cargar la aplicación
  useEffect(() => {
    // Verificación de seguridad SSR - solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('llamativo-user')
      if (savedUser) {
        try {
          // Intentar restaurar datos de usuario desde localStorage
          const userData = JSON.parse(savedUser)
          setUser(userData)
        } catch (error) {
          // Limpiar datos corruptos si el JSON no es válido
          console.error('Error parsing saved user:', error)
          localStorage.removeItem('llamativo-user')
        }
      }
    }
    // Finalizar estado de carga inicial
    setIsLoading(false)
  }, [])

  // Función asíncrona para autenticar usuarios con email y contraseña
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulación de delay de red para experiencia realista
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Búsqueda de usuario en la base de datos simulada
      const foundUser = users.find(u => u.email === email && u.password === password)
      
      if (foundUser) {
        // Crear objeto de usuario sin información sensible (password)
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role
        }
        setUser(userData)
        
        // Persistir sesión en localStorage para mantener login entre recargas
        if (typeof window !== 'undefined') {
          localStorage.setItem('llamativo-user', JSON.stringify(userData))
        }
        
        setIsLoading(false)
        return true  // Login exitoso
      }
      
      setIsLoading(false)
      return false  // Credenciales incorrectas
    } catch (error) {
      // Manejo de errores durante el proceso de autenticación
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  // Función para cerrar sesión del usuario actual
  const logout = () => {
    setUser(null)  // Limpiar estado de usuario
    
    // Eliminar datos persistidos de localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('llamativo-user')
    }
  }

  // Función utilitaria para verificar si el usuario actual tiene permisos de administrador
  const isAdmin = () => {
    return user?.role === 'admin'
  }

  // Retorno del proveedor con todas las funciones y estados disponibles
  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para acceder al contexto de autenticación desde cualquier componente
export function useAuth() {
  const context = useContext(AuthContext)
  // Verificación de seguridad para asegurar que el hook se usa dentro del proveedor
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}