// Datos mock para GitHub Pages (sin API routes)
export const mockProducts = [
  {
    _id: '1',
    name: 'Vestido Veraniego',
    price: 124900,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&crop=top',
    category: 'vestidos',
    description: 'Hermoso vestido perfecto para el verano colombiano',
    variants: {
      colors: ['Azul', 'Rosa', 'Blanco'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    stock: 25,
    featured: true,
    badge: 'Nuevo'
  },
  {
    _id: '2',
    name: 'Camisa Guayabera',
    price: 89900,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop&crop=top',
    category: 'camisas',
    description: 'Elegante camisa guayabera tradicional colombiana',
    variants: {
      colors: ['Blanco', 'Azul Claro', 'Beige'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    stock: 15,
    featured: true,
    badge: 'Bestseller'
  },
  {
    _id: '3',
    name: 'Jeans Premium',
    price: 156000,
    image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400&h=600&fit=crop&crop=top',
    category: 'jeans',
    description: 'Jeans de alta calidad con corte colombiano',
    variants: {
      colors: ['Azul Oscuro', 'Azul Claro', 'Negro'],
      sizes: ['28', '30', '32', '34', '36', '38']
    },
    stock: 30,
    featured: true,
    badge: '30% Off'
  },
  {
    _id: '4',
    name: 'Zapatos Casuales',
    price: 199900,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop&crop=center',
    category: 'zapatos',
    description: 'Zapatos casuales cómodos para uso diario',
    variants: {
      colors: ['Negro', 'Café', 'Blanco'],
      sizes: ['37', '38', '39', '40', '41', '42', '43']
    },
    stock: 20,
    featured: true,
    badge: 'Trending'
  },
  {
    _id: '5',
    name: 'Blusa Elegante',
    price: 79900,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&crop=top',
    category: 'blusas',
    description: 'Blusa elegante para ocasiones especiales',
    variants: {
      colors: ['Negro', 'Blanco', 'Rosa', 'Azul'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    stock: 18,
    featured: false,
    badge: null
  },
  {
    _id: '6',
    name: 'Pantalón Formal',
    price: 139900,
    image: 'https://images.unsplash.com/photo-1506629905332-b2f0881b1eb1?w=400&h=600&fit=crop&crop=top',
    category: 'pantalones',
    description: 'Pantalón formal para ambiente de trabajo',
    variants: {
      colors: ['Negro', 'Gris', 'Azul Marino'],
      sizes: ['28', '30', '32', '34', '36', '38', '40']
    },
    stock: 12,
    featured: false,
    badge: null
  }
]

export const mockCategories = [
  { id: 'vestidos', name: 'Vestidos', count: 45 },
  { id: 'camisas', name: 'Camisas', count: 32 },
  { id: 'jeans', name: 'Jeans', count: 28 },
  { id: 'zapatos', name: 'Zapatos', count: 56 },
  { id: 'blusas', name: 'Blusas', count: 38 },
  { id: 'pantalones', name: 'Pantalones', count: 24 }
]

// Función para simular API calls
export const fetchProducts = async (featured = false) => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 500))
  
  if (featured) {
    return mockProducts.filter(product => product.featured)
  }
  return mockProducts
}

export const fetchProductById = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockProducts.find(product => product._id === id) || null
}

export const fetchCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockCategories
}