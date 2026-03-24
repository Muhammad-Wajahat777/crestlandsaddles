'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type CartItem = {
  id: number | string;
  name: string;
  price: string;
  quantity: number;
  category: string;
  type: string;
  accent: string;
  image?: string;
}

type CartContextType = {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('saddlery-cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse cart JSON')
      }
    }
  }, [])

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('saddlery-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product: any) => {
    setItems(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number | string) => {
    setItems(prev => prev.filter(p => p.id !== id))
  }

  const updateQuantity = (id: number | string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(p => p.id === id ? { ...p, quantity } : p))
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  // Calculate total (assuming prices are like "From $1,200")
  const cartTotal = items.reduce((sum, item) => {
    const numericStr = item.price.replace(/[^0-9.]/g, '')
    const price = parseFloat(numericStr) || 0
    return sum + price * item.quantity
  }, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
