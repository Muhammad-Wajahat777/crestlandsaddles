'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { CartItem, Product } from '@/lib/types'
import { useAuth } from '@/components/AuthProvider'

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
  const { user } = useAuth()
  const localStorageKey = 'saddlery-cart-v2'
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
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(items))
  }, [items, localStorageKey])

  const getOrCreateCartId = useCallback(async (userId: string): Promise<string | null> => {
    const existing = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle()

    if (existing.data?.id) return existing.data.id

    const inserted = await supabase
      .from('carts')
      .insert({ user_id: userId })
      .select('id')
      .single()

    if (inserted.error) return null
    return inserted.data.id
  }, [])

  const loadRemoteCart = useCallback(async (userId: string) => {
    const cartId = await getOrCreateCartId(userId)
    if (!cartId) return

    const { data, error } = await supabase
      .from('cart_items')
      .select('quantity, products(*)')
      .eq('cart_id', cartId)

    if (error || !data) return

    const mapped: CartItem[] = (data as unknown as Array<{ quantity: number; products: Product | null }>)
      .filter((row): row is { quantity: number; products: Product } => row.products !== null)
      .map((row) => ({
        id: row.products.id,
        quantity: row.quantity,
        product: row.products,
      }))

    setItems(mapped)
  }, [getOrCreateCartId])

  const syncLocalToRemote = useCallback(async (userId: string, localItems: CartItem[]) => {
    if (!localItems.length) return
    const cartId = await getOrCreateCartId(userId)
    if (!cartId) return

    for (const item of localItems) {
      await supabase
        .from('cart_items')
        .upsert(
          { cart_id: cartId, product_id: item.product.id, quantity: item.quantity },
          { onConflict: 'cart_id,product_id' }
        )
    }
  }, [getOrCreateCartId])

  useEffect(() => {
    const sync = async () => {
      if (!user) return

      setSyncing(true)
      const localItems = JSON.parse(localStorage.getItem(localStorageKey) || '[]') as CartItem[]
      await syncLocalToRemote(user.id, localItems)
      await loadRemoteCart(user.id)
      localStorage.removeItem(localStorageKey)
      setSyncing(false)
    }

    void sync()
  }, [loadRemoteCart, localStorageKey, syncLocalToRemote, user])

  const addToCart = async (product: Product) => {
    if (product.stock_quantity <= 0) return

    const nextItems = [...items]
    const idx = nextItems.findIndex((item) => item.id === product.id)
    if (idx >= 0) {
      const nextQty = nextItems[idx].quantity + 1
      if (nextQty > product.stock_quantity) return
      nextItems[idx] = { ...nextItems[idx], quantity: nextQty }
    } else {
      nextItems.push({ id: product.id, quantity: 1, product })
    }
    setItems(nextItems)

    if (!user) return

    const cartId = await getOrCreateCartId(user.id)
    if (!cartId) return

    const existing = nextItems.find((item) => item.id === product.id)
    await supabase
      .from('cart_items')
      .upsert(
        { cart_id: cartId, product_id: product.id, quantity: existing?.quantity ?? 1 },
        { onConflict: 'cart_id,product_id' }
      )
  }

  const removeFromCart = async (productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId))
    if (!user) return

    const cartId = await getOrCreateCartId(user.id)
    if (!cartId) return
    await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId)
      .eq('product_id', productId)
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return

    setItems(prev => {
      const current = prev.find((p) => p.id === productId)
      if (!current) return prev
      if (quantity > current.product.stock_quantity) {
        return prev
      }
      return prev.map((p) => (p.id === productId ? { ...p, quantity } : p))
    })

    if (!user) return
    const cartId = await getOrCreateCartId(user.id)
    if (!cartId) return
    await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('cart_id', cartId)
      .eq('product_id', productId)
  }

  const checkout = async (): Promise<{ orderId: string | null; error: string | null }> => {
    if (!user) {
      return { orderId: null, error: 'Please sign in before checkout.' }
    }

    const { data, error } = await supabase.rpc('create_order_from_cart', { p_user_id: user.id })
    if (error) {
      return { orderId: null, error: error.message }
    }

    setItems([])
    return { orderId: data as string, error: null }
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, checkout, cartCount, cartTotal, syncing }}
    >
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
