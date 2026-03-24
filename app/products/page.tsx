'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/components/CartProvider'
import { supabase } from '@/lib/supabase/client'
import type { Product } from '@/lib/types'

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export default function ProductsPage() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addedId, setAddedId] = useState<string | null>(null)

  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await supabase
        .from('products')
        .select('category')
        .eq('is_active', true)

      const unique = Array.from(new Set((data ?? []).map((row) => row.category)))
      setCategories(['All', ...unique])
    }

    void loadCategories()
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(100)

      if (active !== 'All') {
        query = query.eq('category', active)
      }

      const searchTerm = search.trim()
      if (searchTerm) {
        query = query.or(
          `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,purpose.ilike.%${searchTerm}%,material.ilike.%${searchTerm}%,size.ilike.%${searchTerm}%`
        )
      }

      const { data, error: queryError } = await query

      if (queryError) {
        setError(queryError.message)
        setLoading(false)
        return
      }

      setProducts((data ?? []) as Product[])
      setLoading(false)
    }

    void loadProducts()
  }, [active, search])

  const featuredProduct = useMemo(() => products.find((p) => p.stock_quantity > 0), [products])

  const handleAddToCart = async (product: Product) => {
    await addToCart(product)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1200)
  }

  return (
    <div className="min-h-screen bg-[#F7F1EA] text-[#1F1610] pb-24">
      <section className="relative w-full pt-32 pb-16 px-6 lg:px-8 bg-[#0D0906] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#2A1D14] via-[#0D0906] to-[#0D0906]"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-[#C8935A] font-semibold tracking-widest uppercase text-xs sm:text-sm">Live Catalog</span>
          <h1 className="text-4xl sm:text-6xl font-light text-white tracking-tight">
            Saddle Inventory
            <span className="font-serif italic text-[#C8935A]"> in Real Time</span>
          </h1>
          <p className="text-lg text-[#D7C6B2] font-light">
            Search by purpose, material, and size. Product data comes directly from Supabase.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A735C]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, purpose, material, size"
              className="w-full rounded-full border border-[#D4C1AB] bg-white py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#C8935A]/30"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm whitespace-nowrap font-medium transition-all ${
                  active === cat
                    ? 'bg-[#1A120C] text-white shadow-md'
                    : 'bg-[#EFE4D7] text-[#6F5A45] hover:bg-[#E4D4C1] hover:text-[#1F1610]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {featuredProduct && (
          <div className="mb-8 rounded-3xl border border-[#E4D4C1] bg-white overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="relative h-56 md:h-full md:col-span-2 bg-[#1A120C]">
                <img
                  src={featuredProduct.image_url}
                  alt={featuredProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 md:col-span-3">
                <Badge className="mb-4 bg-[#1A120C] text-white">Featured In Stock</Badge>
                <h2 className="text-3xl font-light mb-2">{featuredProduct.name}</h2>
                <p className="text-[#6F5A45] mb-4">{featuredProduct.description}</p>
                <p className="text-sm text-[#8A735C] mb-1"><span className="font-semibold text-[#1F1610]">Purpose:</span> {featuredProduct.purpose}</p>
                <p className="text-sm text-[#8A735C] mb-1"><span className="font-semibold text-[#1F1610]">Size:</span> {featuredProduct.size}</p>
                <p className="text-sm text-[#8A735C] mb-4"><span className="font-semibold text-[#1F1610]">Material:</span> {featuredProduct.material}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold">{money.format(featuredProduct.price)}</p>
                  <p className="text-sm text-[#6F5A45]">Stock: {featuredProduct.stock_quantity}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && <p className="text-[#6F5A45] py-6">Loading products...</p>}
        {error && <p className="text-red-600 py-6">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-[#E4D4C1] hover:border-[#C8935A]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-white flex flex-col">
                <div className="relative h-64 bg-[#2A1D14]">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <span className="absolute bottom-4 left-4 text-white/80 font-medium tracking-wide text-sm">{product.category}</span>
                </div>

                <div className="flex flex-col flex-1 p-6 sm:p-8">
                  <CardHeader className="p-0 mb-3 space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-2xl font-semibold text-[#1F1610] group-hover:text-[#8C6238] transition-colors leading-tight">
                        {product.name}
                      </CardTitle>
                      <span className="text-lg font-medium text-[#6F5A45] shrink-0">{money.format(product.price)}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 flex-1 flex flex-col">
                    <p className="text-[#6F5A45] leading-relaxed mb-4">{product.description}</p>
                    <div className="text-sm text-[#6F5A45] space-y-1 mb-6">
                      <p><span className="font-semibold text-[#1F1610]">Purpose:</span> {product.purpose}</p>
                      <p><span className="font-semibold text-[#1F1610]">Size:</span> {product.size}</p>
                      <p><span className="font-semibold text-[#1F1610]">Material:</span> {product.material}</p>
                      <p><span className="font-semibold text-[#1F1610]">Stock:</span> {product.stock_quantity}</p>
                    </div>
                  </CardContent>

                  <CardFooter className="p-0 flex flex-col sm:flex-row gap-3">
                    <Button
                      disabled={product.stock_quantity <= 0}
                      onClick={() => void handleAddToCart(product)}
                      className={`w-full sm:w-auto flex-1 rounded-full font-medium transition-all ${
                        product.stock_quantity <= 0
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : addedId === product.id
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-[#C8935A] hover:bg-[#A87844] text-[#0D0906]'
                      }`}
                    >
                      {product.stock_quantity <= 0 ? 'Out of Stock' : addedId === product.id ? 'Added ✓' : 'Add to Cart'}
                    </Button>
                    <Button variant="outline" asChild className="w-full sm:w-auto rounded-full border-[#D4C1AB] text-[#3A2A1D] hover:bg-[#F7F1EA]">
                      <Link href="/contact">Enquire</Link>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
