'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { supabase } from '@/lib/supabase/client'
import type { OrderSummary } from '@/lib/types'
import { Button } from '@/components/ui/button'

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export default function AccountPage() {
  const { user, signIn, signUp, signOut, loading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [orders, setOrders] = useState<OrderSummary[]>([])
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const loadAccountData = async () => {
      if (!user) {
        setOrders([])
        setIsAdmin(false)
        return
      }

      const [{ data: orderData }, { data: profile }] = await Promise.all([
        supabase
          .from('orders')
          .select('id, status, total_amount, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase.from('profiles').select('is_admin').eq('id', user.id).maybeSingle(),
      ])

      setOrders((orderData ?? []) as OrderSummary[])
      setIsAdmin(Boolean(profile?.is_admin))
    }

    void loadAccountData()
  }, [user])

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    const result = await signIn(email, password)
    setMessage(result.error ?? 'Signed in successfully.')
  }

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    const result = await signUp(email, password)
    setMessage(result.error ?? 'Account created. Check your email if confirmation is enabled.')
  }

  return (
    <div className="min-h-screen bg-[#F7F1EA] text-[#1F1610] pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        <section className="lg:col-span-2 bg-white rounded-3xl border border-[#E4D4C1] p-8">
          <h1 className="text-3xl font-light mb-2">Account</h1>
          <p className="text-[#6F5A45] mb-6">Sign in to save carts and manage orders.</p>

          {loading && <p className="text-[#6F5A45]">Loading session...</p>}

          {!user && !loading && (
            <form className="space-y-4" onSubmit={handleSignIn}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#D4C1AB] bg-white py-3 px-4 outline-none focus:ring-2 focus:ring-[#C8935A]/30"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#D4C1AB] bg-white py-3 px-4 outline-none focus:ring-2 focus:ring-[#C8935A]/30"
                required
              />
              <div className="flex gap-3">
                <Button type="submit" className="flex-1 bg-[#1A120C] hover:bg-[#2A1D14] text-white rounded-full">Sign In</Button>
                <Button type="button" onClick={handleSignUp} className="flex-1 bg-[#C8935A] hover:bg-[#A87844] text-[#0D0906] rounded-full">Sign Up</Button>
              </div>
            </form>
          )}

          {user && (
            <div className="space-y-4">
              <p className="text-sm text-[#6F5A45]">Signed in as</p>
              <p className="font-medium break-all">{user.email}</p>
              <Button onClick={() => void signOut()} className="w-full bg-[#1A120C] hover:bg-[#2A1D14] text-white rounded-full">Sign Out</Button>

              {isAdmin && (
                <Link href="/admin/products" className="block text-center w-full border border-[#D4C1AB] rounded-full py-2.5 hover:bg-[#EFE4D7] transition-colors">
                  Open Admin Product Panel
                </Link>
              )}
            </div>
          )}

          {message && <p className="mt-4 text-sm text-[#6F5A45]">{message}</p>}
        </section>

        <section className="lg:col-span-3 bg-white rounded-3xl border border-[#E4D4C1] p-8">
          <h2 className="text-2xl font-light mb-2">Order History</h2>
          <p className="text-[#6F5A45] mb-6">All your confirmed orders are stored in Supabase.</p>

          {!user && <p className="text-[#6F5A45]">Sign in to view your order history.</p>}

          {user && orders.length === 0 && <p className="text-[#6F5A45]">No orders yet.</p>}

          {orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-[#E4D4C1] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="font-medium">Order {order.id.slice(0, 8)}</p>
                    <p className="text-sm text-[#6F5A45]">{new Date(order.created_at).toLocaleString()}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-semibold">{money.format(order.total_amount)}</p>
                    <p className="text-sm text-[#6F5A45] capitalize">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
