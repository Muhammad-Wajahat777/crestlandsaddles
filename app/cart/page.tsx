'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/CartProvider'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#F7F1EA] px-6 pt-24 text-center">
        <div className="w-24 h-24 bg-[#EFE4D7] rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-[#A88E76]" />
        </div>
        <h1 className="text-3xl font-light text-[#1F1610] mb-4 tracking-tight">Your Cart is <span className="font-serif italic text-[#A87844]">Empty</span></h1>
        <p className="text-[#8A735C] max-w-md mx-auto mb-8 leading-relaxed">
          Looks like you haven&apos;t added any saddles to your cart yet. Discover our premium handcrafted collection and find your perfect ride.
        </p>
        <Button asChild className="rounded-full px-8 py-6 text-base bg-[#C8935A] hover:bg-[#A87844] text-[#0D0906] font-medium">
          <Link href="/products">Explore Collection</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F1EA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-light text-[#1F1610] tracking-tight">
            Your <span className="font-serif italic text-[#A87844]">Cart</span>
          </h1>
          <p className="text-[#8A735C] mt-2">{cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {items.map((item) => {
              const numericStr = item.price.replace(/[^0-9.]/g, '')
              const price = parseFloat(numericStr) || 0
              
              return (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-3xl border border-[#E4D4C1] shadow-sm relative group transition-all duration-300 hover:shadow-md">
                  
                  {/* Item Image / Accent Box */}
                  <div className={`w-full sm:w-48 h-48 sm:h-auto rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0 ${item.accent || 'bg-[#2A1D14]'}`}>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
                    {item.image ? (
                      item.image.startsWith('http') ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 192px"
                        />
                      )
                    ) : (
                      <svg viewBox="0 0 80 55" fill="none" className="w-20 h-20 text-white/50 drop-shadow-lg">
                        <path d="M10 42 Q22 15 38 18 Q54 21 68 36 L64 44 Q50 30 38 27 Q26 24 16 48Z" fill="currentColor" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-xs font-semibold text-[#A87844] tracking-widest uppercase mb-1 block">{item.category || item.type}</span>
                        <h3 className="text-xl font-medium text-[#1F1610] mb-2">{item.name}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-semibold text-[#1F1610]">${price.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-6">
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#E4D4C1] rounded-full overflow-hidden bg-[#F7F1EA]">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center text-[#8A735C] hover:text-[#1F1610] hover:bg-[#E4D4C1] disabled:opacity-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium text-[#1F1610] text-sm">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-[#8A735C] hover:text-[#1F1610] hover:bg-[#E4D4C1] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#A88E76] hover:text-red-500 flex items-center gap-2 text-sm font-medium transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                      
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 sticky top-32">
            <div className="bg-[#0D0906] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-[#A87844]/30 via-transparent to-transparent opacity-50"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-light mb-6 border-b border-white/10 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-[#D7C6B2]">
                    <span>Subtotal</span>
                    <span className="text-white">${cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#D7C6B2]">
                    <span>Custom Fit &amp; Tuning</span>
                    <span className="text-white text-sm">Included</span>
                  </div>
                  <div className="flex justify-between items-center text-[#D7C6B2]">
                    <span>Shipping</span>
                    <span className="text-white text-sm">Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-6 mb-8 flex flex-col gap-1">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-light">Estimated Total</span>
                    <span className="text-3xl font-medium text-[#C8935A]">
                      ${cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-[#A88E76] text-right mt-1">Taxes pending</p>
                </div>
                
                <Button className="w-full bg-[#C8935A] hover:bg-[#D9A56E] text-[#0D0906] font-semibold py-6 rounded-full text-base transition-all group shadow-[0_0_20px_rgba(200,147,90,0.2)] hover:shadow-[0_0_30px_rgba(200,147,90,0.35)] hover:-translate-y-1">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-center text-xs text-[#8A735C] mt-6 flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 stroke-current stroke-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  Secure SSL Checkout
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/products" className="text-sm font-medium text-[#8A735C] hover:text-[#A87844] transition-colors inline-flex items-center gap-2">
                &larr; Continue Shopping
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
