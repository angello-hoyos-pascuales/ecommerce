import React from 'react'
import ProductDetail from './ProductDetail'

// Define la interfaz para las propiedades de la página de producto dinámico
// Utiliza el nuevo sistema de parámetros de Next.js 15 con Promise para rutas dinámicas
interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

// Componente de página principal para mostrar detalles de productos individuales
// Maneja rutas dinámicas del tipo /products/[id] donde [id] es el identificador del producto
// Actúa como wrapper que extrae el ID de los parámetros y lo pasa al componente de detalle
export default async function ProductPage({ params }: ProductPageProps) {
  // Resuelve la Promise de parámetros para obtener el ID del producto de la URL
  // Necesario en Next.js 15+ donde params es asíncrono por optimizaciones de rendimiento
  const resolvedParams = await params
  
  // Renderiza el componente ProductDetail pasando el ID extraído de la URL
  // Separa la lógica de enrutamiento de la lógica de presentación del producto
  return <ProductDetail productId={resolvedParams.id} />
}