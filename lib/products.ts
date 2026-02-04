export type Product = {
  id: string
  name: string
  category: 'men' | 'women' | 'kids' | 'kurtis' | 't-shirts'
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  description: string
  rating: number
  reviews: number
  sizes?: string[]
  colors?: { name: string; code: string }[]
  inStock: boolean
}

export type CartItem = Product & {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export type FilterOptions = {
  category?: string
  priceRange?: [number, number]
  sizes?: string[]
  colors?: string[]
  rating?: number
  inStock?: boolean
  sortBy?: 'newest' | 'price-low' | 'price-high' | 'rating'
}

const products: Product[] = [
  // Men's Products
  {
    id: 'm1',
    name: 'Classic Black Winter Coat',
    category: 'men',
    price: 4999,
    originalPrice: 6999,
    image: 'https://images.unsplash.com/photo-1539533057440-7c8e64b53a50?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1539533057440-7c8e64b53a50?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
    ],
    description: 'Premium wool blend winter coat with thermal lining',
    rating: 4.5,
    reviews: 128,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Navy', code: '#001f3f' },
      { name: 'Brown', code: '#8B4513' },
    ],
    inStock: true,
  },
  {
    id: 'm2',
    name: 'Designer Formal Shirt',
    category: 'men',
    price: 1999,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1596362051904-9f5f6e8b5ec5?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596362051904-9f5f6e8b5ec5?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1599069270323-7dd336ce3e0c?w=500&h=500&fit=crop',
    ],
    description: 'Elegant cotton formal shirt for office and occasions',
    rating: 4.3,
    reviews: 95,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Blue', code: '#0066CC' },
      { name: 'Pink', code: '#FF69B4' },
    ],
    inStock: true,
  },
  {
    id: 'm3',
    name: 'Casual Denim Jeans',
    category: 'men',
    price: 1499,
    originalPrice: 2299,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1548883416-7eac6d953744?w=500&h=500&fit=crop',
    ],
    description: 'Comfortable and stylish denim jeans for everyday wear',
    rating: 4.6,
    reviews: 312,
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: [
      { name: 'Light Blue', code: '#87CEEB' },
      { name: 'Dark Blue', code: '#00008B' },
      { name: 'Black', code: '#000000' },
    ],
    inStock: true,
  },

  // Women's Products
  {
    id: 'w1',
    name: 'Elegant Saree Collection',
    category: 'women',
    price: 3499,
    originalPrice: 5499,
    image: 'https://images.unsplash.com/photo-1565073120788-3ad0d07e8d3e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1565073120788-3ad0d07e8d3e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1609921212029-52aab299a238?w=500&h=500&fit=crop',
    ],
    description: 'Beautiful hand-woven saree with traditional embroidery',
    rating: 4.7,
    reviews: 203,
    sizes: ['One Size'],
    colors: [
      { name: 'Red', code: '#FF0000' },
      { name: 'Green', code: '#008000' },
      { name: 'Blue', code: '#0000FF' },
    ],
    inStock: true,
  },
  {
    id: 'w2',
    name: 'Winter Wool Sweater',
    category: 'women',
    price: 2299,
    originalPrice: 3499,
    image: 'https://images.unsplash.com/photo-1556821552-9f63ba9f2c55?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556821552-9f63ba9f2c55?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    ],
    description: 'Cozy wool sweater perfect for winter season',
    rating: 4.4,
    reviews: 156,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', code: '#FFFDD0' },
      { name: 'Gray', code: '#808080' },
      { name: 'Maroon', code: '#800000' },
    ],
    inStock: true,
  },
  {
    id: 'w3',
    name: 'Designer Kurta',
    category: 'women',
    price: 1799,
    originalPrice: 2899,
    image: 'https://images.unsplash.com/photo-1609921212029-52aab299a238?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1609921212029-52aab299a238?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1565073120788-3ad0d07e8d3e?w=500&h=500&fit=crop',
    ],
    description: 'Traditional kurta with modern design elements',
    rating: 4.5,
    reviews: 234,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Turquoise', code: '#40E0D0' },
      { name: 'Pink', code: '#FFC0CB' },
      { name: 'Mustard', code: '#FFDB58' },
    ],
    inStock: true,
  },

  // Kurtis Products
  {
    id: 'k1',
    name: 'Ethnic Embroidered Kurti',
    category: 'kurtis',
    price: 1299,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1609921212029-52aab299a238?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1609921212029-52aab299a238?w=500&h=500&fit=crop',
    ],
    description: 'Beautiful ethnic kurti with intricate embroidery',
    rating: 4.6,
    reviews: 189,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Red', code: '#FF0000' },
      { name: 'Green', code: '#008000' },
      { name: 'Blue', code: '#0000FF' },
    ],
    inStock: true,
  },
  {
    id: 'k2',
    name: 'Cotton Casual Kurti',
    category: 'kurtis',
    price: 899,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1565073120788-3ad0d07e8d3e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1565073120788-3ad0d07e8d3e?w=500&h=500&fit=crop',
    ],
    description: 'Comfortable cotton kurti for everyday wear',
    rating: 4.4,
    reviews: 267,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige', code: '#F5F5DC' },
      { name: 'Peach', code: '#FFDAB9' },
      { name: 'Mint', code: '#98FF98' },
    ],
    inStock: true,
  },

  // T-Shirts Products
  {
    id: 't1',
    name: 'Classic Cotton T-Shirt',
    category: 't-shirts',
    price: 499,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    ],
    description: 'Basic cotton t-shirt perfect for casual wear',
    rating: 4.3,
    reviews: 543,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Black', code: '#000000' },
      { name: 'Navy', code: '#001f3f' },
      { name: 'Gray', code: '#808080' },
    ],
    inStock: true,
  },
  {
    id: 't2',
    name: 'Graphic Print T-Shirt',
    category: 't-shirts',
    price: 699,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1532042512501-a34edf4eacf0?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1532042512501-a34edf4eacf0?w=500&h=500&fit=crop',
    ],
    description: 'Trendy graphic print t-shirt for style enthusiasts',
    rating: 4.5,
    reviews: 398,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'White', code: '#FFFFFF' },
      { name: 'Navy', code: '#001f3f' },
    ],
    inStock: true,
  },
  {
    id: 't3',
    name: 'Premium Fit T-Shirt',
    category: 't-shirts',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
    ],
    description: 'Premium quality fitted t-shirt with superior comfort',
    rating: 4.6,
    reviews: 276,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Olive', code: '#808000' },
      { name: 'Charcoal', code: '#36454F' },
      { name: 'Burgundy', code: '#800020' },
    ],
    inStock: true,
  },

  // Kids Products
  {
    id: 'c1',
    name: 'Colorful Kids Winter Jacket',
    category: 'kids',
    price: 1299,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1519238263413-b37319884333?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519238263413-b37319884333?w=500&h=500&fit=crop',
    ],
    description: 'Warm and colorful winter jacket for kids',
    rating: 4.4,
    reviews: 145,
    sizes: ['2Y', '3Y', '4Y', '5Y', '6Y', '7Y', '8Y'],
    colors: [
      { name: 'Red', code: '#FF0000' },
      { name: 'Blue', code: '#0000FF' },
      { name: 'Yellow', code: '#FFFF00' },
    ],
    inStock: true,
  },
  {
    id: 'c2',
    name: 'Casual Kids T-Shirt',
    category: 'kids',
    price: 499,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1503919545889-48854d7ee213?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1503919545889-48854d7ee213?w=500&h=500&fit=crop',
    ],
    description: 'Fun and comfortable t-shirt for kids',
    rating: 4.5,
    reviews: 198,
    sizes: ['2Y', '3Y', '4Y', '5Y', '6Y', '7Y', '8Y'],
    colors: [
      { name: 'Pink', code: '#FFC0CB' },
      { name: 'Blue', code: '#0000FF' },
      { name: 'Green', code: '#008000' },
    ],
    inStock: true,
  },
]

export function getProducts(filters?: FilterOptions): Product[] {
  let result = [...products]

  if (filters?.category) {
    result = result.filter((p) => p.category === filters.category)
  }

  if (filters?.priceRange) {
    const [min, max] = filters.priceRange
    result = result.filter((p) => p.price >= min && p.price <= max)
  }

  if (filters?.inStock !== undefined) {
    result = result.filter((p) => p.inStock === filters.inStock)
  }

  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
      default:
        break
    }
  }

  return result
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.includes(lowerQuery),
  )
}
