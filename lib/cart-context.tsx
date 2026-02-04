'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem, Product } from './products'

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Product, quantity: number, size?: string, color?: string) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cilory-cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load cart:', e)
      }
    }
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cilory-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product, quantity: number, size?: string, color?: string) => {
    setItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color,
      )

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }]
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item)).filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
