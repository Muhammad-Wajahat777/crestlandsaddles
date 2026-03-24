'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/components/AuthProvider'
import type { Product } from '@/lib/types'
import { Button } from '@/components/ui/button'

type ProductForm = {
  id?: string
  name: string
  description: string
  purpose: string
  size: string
  material: string
  image_url: string
  category: string
  price: string
  stock_quantity: string
  is_active: boolean
}

const emptyForm: ProductForm = {
  name: '',
  description: '',
  purpose: '',
  size: '',
  material: '',
  image_url: '',
  category: '',
  price: '',
  stock_quantity: '',
  is_active: true,
}

export default function AdminProductsPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<ProductForm>(emptyForm)
  const [message, setMessage] = useState<string | null>(null)

  const formTitle = useMemo(() => (form.id ? 'Edit Product' : 'Add Product'), [form.id])

  const loadProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts((data ?? []) as Product[])
  }

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setAllowed(false)
        setLoading(false)
        return
      }

      const { data } = await supabase.from('profiles').select('is_admin').eq('id', user.id).maybeSingle()
      const canManage = Boolean(data?.is_admin)
      setAllowed(canManage)

      if (canManage) {
        await loadProducts()
      }

      setLoading(false)
    }

    void checkAccess()
  }, [user])

  const resetForm = () => setForm(emptyForm)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const payload = {
      name: form.name,
      description: form.description,
      purpose: form.purpose,
      size: form.size,
      material: form.material,
      image_url: form.image_url,
      category: form.category,
      price: Number(form.price),
      stock_quantity: Number(form.stock_quantity),
      is_active: form.is_active,
    }

    if (form.id) {
      const { error } = await supabase.from('products').update(payload).eq('id', form.id)
      if (error) {
        setMessage(error.message)
        return
      }
      setMessage('Product updated.')
    } else {
      const { error } = await supabase.from('products').insert(payload)
      if (error) {
        setMessage(error.message)
        return
      }
      setMessage('Product created.')
    }

    resetForm()
    await loadProducts()
  }

  const onDelete = async (id: string) => {
    setMessage(null)
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      setMessage(error.message)
      return
    }
    setMessage('Product deleted.')
    await loadProducts()
  }

  const onEdit = (product: Product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      purpose: product.purpose,
      size: product.size,
      material: product.material,
      image_url: product.image_url,
      category: product.category,
      price: String(product.price),
      stock_quantity: String(product.stock_quantity),
      is_active: product.is_active,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return <div className="min-h-screen bg-[#F7F1EA] pt-32 px-6">Loading admin panel...</div>
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7F1EA] pt-32 px-6 text-center">
        <p className="mb-4">Sign in first.</p>
        <Link className="underline" href="/account">Go to account</Link>
      </div>
    )
  }

  if (!allowed) {
    return (
      <div className="min-h-screen bg-[#F7F1EA] pt-32 px-6 text-center">
        <p className="mb-4">Your account is not marked as admin.</p>
        <p>Set profiles.is_admin = true for your user in Supabase.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F1EA] text-[#1F1610] pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-light">Admin Product Management</h1>

        <section className="bg-white rounded-3xl border border-[#E4D4C1] p-6">
          <h2 className="text-2xl font-light mb-4">{formTitle}</h2>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="rounded-xl border px-4 py-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="rounded-xl border px-4 py-3" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            <input className="rounded-xl border px-4 py-3" placeholder="Purpose" value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} required />
            <input className="rounded-xl border px-4 py-3" placeholder="Size" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} required />
            <input className="rounded-xl border px-4 py-3" placeholder="Material" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} required />
            <input className="rounded-xl border px-4 py-3" placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} required />
            <input className="rounded-xl border px-4 py-3" placeholder="Price" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <input className="rounded-xl border px-4 py-3" placeholder="Stock Quantity" type="number" value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })} required />
            <textarea className="md:col-span-2 rounded-xl border px-4 py-3" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />

            <label className="flex items-center gap-2 md:col-span-2">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              />
              Active product
            </label>

            <div className="md:col-span-2 flex gap-3">
              <Button className="rounded-full bg-[#1A120C] hover:bg-[#2A1D14] text-white" type="submit">
                {form.id ? 'Update Product' : 'Create Product'}
              </Button>
              {form.id && (
                <Button type="button" onClick={resetForm} className="rounded-full bg-[#C8935A] hover:bg-[#A87844] text-[#0D0906]">
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
          {message && <p className="mt-4 text-sm text-[#6F5A45]">{message}</p>}
        </section>

        <section className="bg-white rounded-3xl border border-[#E4D4C1] p-6">
          <h2 className="text-2xl font-light mb-4">All Products</h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="border border-[#E4D4C1] rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-[#6F5A45]">{product.category} | {product.size} | Stock: {product.stock_quantity}</p>
                  <p className="text-sm text-[#6F5A45]">{product.is_active ? 'Active' : 'Inactive'}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => onEdit(product)} className="rounded-full bg-[#EFE4D7] hover:bg-[#E4D4C1] text-[#1F1610]">Edit</Button>
                  <Button onClick={() => void onDelete(product.id)} className="rounded-full bg-red-100 hover:bg-red-200 text-red-700">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
