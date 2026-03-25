'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { verifySession } from '../actions'

export default function AddProductPage() {
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  const [form, setForm] = useState({
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
  })

  useEffect(() => {
    const checkAccess = async () => {
      const isAuth = await verifySession()
      setAllowed(isAuth)
      setLoading(false)
    }

    void checkAccess()
  }, [])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
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

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      setMessage({ type: 'error', text: result.error ?? 'Failed to create product.' })
      setSubmitting(false)
      return
    }

    setMessage({ type: 'success', text: 'Product created successfully!' })
    setSubmitting(false)
  }

  if (loading) {
    return <div className="min-h-screen bg-[#F7F1EA] pt-32 px-6 flex justify-center items-start"><p className="text-[#6F5A45] animate-pulse">Loading admin panel...</p></div>
  }

  if (!allowed) {
    return (
      <div className="min-h-screen bg-[#F7F1EA] pt-32 px-6 text-center text-[#1F1610]">
        <p className="mb-4 text-xl border border-red-200 bg-red-50 text-red-800 p-6 rounded-2xl max-w-lg mx-auto shadow-sm">
          You are not authenticated.
          <Link className="block underline text-[#8C6238] hover:text-[#2A1D14] transition-colors mt-4" href="/admin">Go to admin login</Link>
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F1EA] text-[#1F1610] pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 rounded-full hover:bg-[#E4D4C1] transition-colors text-[#6F5A45]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-4xl font-light">Add New Product</h1>
        </div>

        {message?.type === 'success' ? (
          <div className="bg-white rounded-3xl border border-green-200 p-12 text-center shadow-lg transform transition-all animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-light mb-4">Product Added Successfully!</h2>
            <p className="text-[#6F5A45] text-lg mb-8">The product has been saved to the database and is now live.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="rounded-full bg-[#1A120C] hover:bg-[#2A1D14] text-white px-8 py-6 text-lg h-auto">
                <Link href="/admin/products">View Products Page</Link>
              </Button>
              <Button variant="outline" onClick={() => {
                setMessage(null)
                setForm({
                  name: '', description: '', purpose: '', size: '', material: '', image_url: '', category: '', price: '', stock_quantity: '', is_active: true,
                })
              }} className="rounded-full border-[#D4C1AB] text-[#3A2A1D] hover:bg-[#EFE4D7] px-8 py-6 text-lg h-auto">
                Add Another Product
              </Button>
            </div>
          </div>
        ) : (
          <section className="bg-white rounded-3xl border border-[#E4D4C1] shadow-sm overflow-hidden">
            <div className="p-8 md:p-10">
              <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6F5A45]">Product Name</label>
                  <input className="w-full rounded-2xl border border-[#E4D4C1] hover:border-[#C8935A] focus:border-[#C8935A] focus:ring-1 focus:ring-[#C8935A] px-5 py-3.5 transition-all outline-none" placeholder="e.g. Classic Dressage Saddle" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6F5A45]">Category</label>
                  <input className="w-full rounded-2xl border border-[#E4D4C1] hover:border-[#C8935A] focus:border-[#C8935A] focus:ring-1 focus:ring-[#C8935A] px-5 py-3.5 transition-all outline-none" placeholder="e.g. Dressage" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6F5A45]">Purpose</label>
                  <input className="w-full rounded-2xl border border-[#E4D4C1] hover:border-[#C8935A] focus:border-[#C8935A] focus:ring-1 focus:ring-[#C8935A] px-5 py-3.5 transition-all outline-none" placeholder="e.g. Competition / Training" value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6F5A45]">Size</label>
                  <input className="w-full rounded-2xl border border-[#E4D4C1] hover:border-[#C8935A] focus:border-[#C8935A] focus:ring-1 focus:ring-[#C8935A] px-5 py-3.5 transition-all outline-none" placeholder="e.g. 17.5 inch" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6F5A45]">Material</label>
                  <input className="w-full rounded-2xl border border-[#E4D4C1] hover:border-[#C8935A] focus:border-[#C8935A] focus:ring-1 focus:ring-[#C8935A] px-5 py-3.5 transition-all outline-none" placeholder="e.g. Italian Leather" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6F5A45]">Image URL</label>
                  <input className="w-full rounded-2xl border border-[#E4D4C1] hover:border-[#C8935A] focus:border-[#C8935A] focus:ring-1 focus:ring-[#C8935A] px-5 py-3.5 transition-all outline-none" placeholder="https://..." value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6F5A45]">Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8A735C] font-medium">$</span>
                    <input className="w-full rounded-2xl border border-[#E4D4C1] hover:border-[#C8935A] focus:border-[#C8935A] focus:ring-1 focus:ring-[#C8935A] pl-10 pr-5 py-3.5 transition-all outline-none" placeholder="0.00" type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6F5A45]">Stock Quantity</label>
                  <input className="w-full rounded-2xl border border-[#E4D4C1] hover:border-[#C8935A] focus:border-[#C8935A] focus:ring-1 focus:ring-[#C8935A] px-5 py-3.5 transition-all outline-none" placeholder="e.g. 10" type="number" min="0" value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })} required />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-[#6F5A45]">Description</label>
                  <textarea className="w-full rounded-2xl border border-[#E4D4C1] hover:border-[#C8935A] focus:border-[#C8935A] focus:ring-1 focus:ring-[#C8935A] px-5 py-3.5 transition-all outline-none min-h-[120px] resize-y" placeholder="Summarize the key features and benefits." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                </div>

                <div className="md:col-span-2 py-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={form.is_active}
                        onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                      />
                      <div className="w-12 h-6 bg-[#E4D4C1] rounded-full peer-checked:bg-[#C8935A] transition-colors shadow-inner"></div>
                      <div className="absolute left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform shadow-sm"></div>
                    </div>
                    <span className="text-base text-[#3A2A1D] group-hover:text-[#1F1610] transition-colors font-medium">Publish immediately (Active)</span>
                  </label>
                </div>

                {message?.type === 'error' && (
                  <div className="md:col-span-2 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm">
                    {message.text}
                  </div>
                )}

                <div className="md:col-span-2 pt-4 border-t border-[#E4D4C1]/50 flex justify-end">
                  <Button 
                    disabled={submitting}
                    className="rounded-full bg-[#1A120C] hover:bg-[#2A1D14] text-white px-8 py-6 text-lg h-auto shadow-md hover:shadow-xl transition-all w-full md:w-auto" 
                    type="submit"
                  >
                    {submitting ? 'Adding Product...' : 'Add Product'}
                  </Button>
                </div>
              </form>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
