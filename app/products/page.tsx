'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/components/CartProvider'

const categories = ['All', 'Western', 'English', 'Jumping', 'Ranch', 'Endurance']

const products = [
  { id: 1, name: 'The Trail Master', category: 'Western', type: 'Western Trail', price: 'From $1,200', badge: 'Bestseller', desc: 'Built for long days on open trails. Deep seat, padded fenders, and a sturdy horn — your trusted companion for every mile.', tags: ['All-day comfort', 'Horn included', 'Padded fenders'], accent: 'bg-[#2A1D14]', image: 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1400&q=80', featured: true },
  { id: 2, name: 'The Dressage Elite', category: 'English', type: 'English / Dressage', price: 'From $1,800', badge: null, desc: 'Close contact design with supple leather for flawless arena performance. Balance and precision in every stride.', tags: ['Close contact', 'Arena tuned', 'Lightweight'], accent: 'bg-[#1A120C]', image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1400&q=80', featured: false },
  { id: 3, name: 'The Arena Pro', category: 'Jumping', type: 'Show Jumping', price: 'From $1,600', badge: 'New', desc: 'Forward-cut flaps and a secure seat designed for jumping confidence at every fence height.', tags: ['Forward cut', 'Secure seat', 'Competition ready'], accent: 'bg-[#2A1D14]', image: '/jumping-saddle.png', featured: false },
  { id: 4, name: 'The Ranch Hand', category: 'Ranch', type: 'Ranch / Working', price: 'From $950', badge: null, desc: 'Heavy-duty and built to work as hard as you do. From cattle work to long rides, this saddle never flinches.', tags: ['Heavy-duty', 'Work ready', 'Reinforced'], accent: 'bg-[#1A120C]', image: '/ranch-hand.jpg', featured: false },
  { id: 5, name: 'The Endurance Rider', category: 'Endurance', type: 'Endurance', price: 'From $1,400', badge: null, desc: 'Ultra-light construction and ergonomic design for competitive endurance riding over extreme distances.', tags: ['Lightweight', 'Ergonomic', 'Long-distance'], accent: 'bg-[#3A2A1D]', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1400&q=80', featured: false },
  { id: 6, name: 'The Western Pleasure', category: 'Western', type: 'Western Pleasure', price: 'From $1,100', badge: null, desc: 'Elegant lines and a plush seat for western pleasure classes and trail riding in equal measure.', tags: ['Show quality', 'Comfortable', 'Western'], accent: 'bg-[#3A2A1D]', image: '/saddle.jpg', featured: false },
]

export default function ProductsPage() {
  const [active, setActive] = useState('All')
  const { addToCart } = useCart()
  const [addedId, setAddedId] = useState<number | null>(null)

  const filtered = active === 'All' ? products : products.filter(p => p.category === active)

  const handleAddToCart = (product: any) => {
    addToCart(product)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[#F7F1EA] text-[#1F1610] pb-24">
      {/* PAGE HERO */}
      <section className="relative w-full pt-32 pb-20 px-6 lg:px-8 bg-[#0D0906] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#2A1D14] via-[#0D0906] to-[#0D0906]"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-[#C8935A] font-semibold tracking-widest uppercase text-xs sm:text-sm">Our Collection</span>
          <h1 className="text-4xl sm:text-6xl font-light text-white tracking-tight">
            Saddles for <span className="font-serif italic text-[#C8935A]">Every</span> Rider
          </h1>
          <p className="text-lg text-[#D7C6B2] font-light">From the open trail to the championship arena — handcrafted for where you ride.</p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-[#E4D4C1] py-4 mb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 overflow-x-auto">
          <div className="flex items-center gap-2 sm:gap-4 w-max mx-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
      </div>

      {/* PRODUCTS GRID */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <Card key={product.id} className={`group overflow-hidden border-[#E4D4C1] hover:border-[#C8935A]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-white flex flex-col ${product.featured ? 'md:col-span-2 lg:col-span-2 lg:flex-row' : ''}`}>
              
              <div className={`relative flex items-center justify-center p-8 transition-colors duration-500 ${product.accent} ${product.featured ? 'lg:w-1/2 min-h-75' : 'h-64'}`}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
                
                {product.badge && (
                  <Badge className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-md px-3 py-1">
                    {product.badge}
                  </Badge>
                )}
                
                {product.image ? (
                  <div className="absolute inset-0">
                    {product.image.startsWith('http') ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                ) : (
                  <svg viewBox="0 0 80 55" fill="none" className="w-32 h-32 text-white/50 group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl">
                    <path d="M10 42 Q22 15 38 18 Q54 21 68 36 L64 44 Q50 30 38 27 Q26 24 16 48Z" fill="currentColor" />
                  </svg>
                )}
                
                <span className="absolute bottom-4 left-4 text-white/80 font-medium tracking-wide text-sm">{product.type}</span>
              </div>
              
              <div className={`flex flex-col flex-1 p-6 sm:p-8 ${product.featured ? 'lg:w-1/2 justify-center' : ''}`}>
                <CardHeader className="p-0 mb-4 space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-2xl font-semibold text-[#1F1610] group-hover:text-[#8C6238] transition-colors leading-tight">
                      {product.name}
                    </CardTitle>
                    <span className="text-lg font-medium text-[#6F5A45] shrink-0">{product.price}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 flex-1 flex flex-col">
                  <p className="text-[#6F5A45] leading-relaxed mb-6 flex-1">
                    {product.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {product.tags.map(t => (
                      <span key={t} className="px-3 py-1 bg-[#EFE4D7] text-[#6F5A45] text-xs font-medium rounded-full border border-[#E4D4C1]">
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="p-0 flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className={`w-full sm:w-auto flex-1 rounded-full font-medium transition-all ${
                      addedId === product.id 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-[#C8935A] hover:bg-[#A87844] text-[#0D0906]'
                    }`}
                  >
                    {addedId === product.id ? 'Added to Cart ✓' : 'Add to Cart'}
                  </Button>
                  <Button variant="outline" asChild className="w-full sm:w-auto rounded-full border-[#D4C1AB] text-[#3A2A1D] hover:bg-[#F7F1EA]">
                    <Link href="/contact">Enquire</Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* CUSTOM CTA */}
      <section className="mt-32 max-w-5xl mx-auto px-6 lg:px-8">
        <div className="bg-[#1A120C] rounded-[2.5rem] p-10 sm:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--tw-gradient-stops))] from-[#A87844]/30 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 space-y-4 max-w-xl text-center md:text-left">
            <span className="text-[#C8935A] font-semibold tracking-widest uppercase text-sm">Don&apos;t See What You Need?</span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              Every Saddle Can Be <span className="font-serif italic text-[#C8935A]">Customised</span>
            </h2>
            <p className="text-[#D7C6B2] font-light leading-relaxed">
              Start a custom order and we&apos;ll build exactly what you envision — from tree width to tooling pattern.
            </p>
          </div>
          
          <Link href="/custom-order" className="relative z-10 shrink-0 px-8 py-4 rounded-full bg-[#C8935A] hover:bg-[#D9A56E] text-[#0D0906] font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,147,90,0.35)] hover:-translate-y-1 w-full md:w-auto text-center">
            Start Custom Order &rarr;
          </Link>
        </div>
      </section>
    </div>
  )
}
