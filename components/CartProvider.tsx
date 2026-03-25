'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CartItem, Product } from '@/lib/types'

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Product) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  checkout: () => Promise<{ orderId: string | null; error: string | null }>
  cartCount: number
  cartTotal: number
  syncing: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const localStorageKey = 'saddlery-cart-v3'
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = window.localStorage.getItem(localStorageKey)
    if (!saved) return []
    try {
      return JSON.parse(saved) as CartItem[]
    } catch {
      return []
    }
  })
  
  // No longer syncing with a theoretical remote user cart
  const syncing = false

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(localStorageKey, JSON.stringify(items))
    }
  }, [items, localStorageKey])

  const addToCart = async (product: Product) => {
    if (product.stock_quantity <= 0) return

    setItems((prevItems) => {
      const nextItems = [...prevItems]
      const idx = nextItems.findIndex((item) => item.id === product.id)
      if (idx >= 0) {
        const nextQty = nextItems[idx].quantity + 1
        if (nextQty > product.stock_quantity) return prevItems
        nextItems[idx] = { ...nextItems[idx], quantity: nextQty }
        return nextItems
      } else {
        return [...nextItems, { id: product.id, quantity: 1, product }]
      }
    })
  }

  const removeFromCart = async (productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId))
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return

    setItems((prev) => {
      const current = prev.find((p) => p.id === productId)
      if (!current) return prev
      if (quantity > current.product.stock_quantity) {
        return prev
      }
      return prev.map((p) => (p.id === productId ? { ...p, quantity } : p))
    })
  }

  const checkout = async (): Promise<{ orderId: string | null; error: string | null }> => {
    // Guest checkout logic
    // Normally you'd call a payment gateway or an API route here
    
    // Simulating a successful guest checkout for now
    setItems([])
    return { orderId: `GUEST-${Math.floor(Math.random() * 100000)}`, error: null }
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  )

  const contextValue = useMemo(() => ({
    items, addToCart, removeFromCart, updateQuantity, checkout, cartCount, cartTotal, syncing
  }), [items, cartCount, cartTotal, syncing])

  return (
    <CartContext.Provider value={contextValue}>
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
