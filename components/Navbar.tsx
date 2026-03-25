'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCart } from './CartProvider'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/about',        label: 'Our Craft' },
  { href: '/products',     label: 'Saddles' },
  { href: '/custom-order', label: 'Custom Order' },
  { href: '/contact',      label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDarkBg = pathname === '/' && !scrolled;

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      scrolled ? "bg-white/80 backdrop-blur-md border-[#E4D4C1] shadow-sm" : 
      (pathname === '/' ? "bg-transparent border-transparent text-white" : "bg-white border-[#E4D4C1]")
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className={cn(
            "text-2xl font-light tracking-tight transition-colors",
            isDarkBg ? "text-white" : "text-[#1F1610]"
          )}>
            Crestland <span className="font-serif italic text-[#C8935A]">Saddlery</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-[#C8935A]",
                      pathname === href ? "text-[#C8935A]" : (isDarkBg ? "text-[#D7C6B2]" : "text-[#6F5A45]")
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-4 border-l border-[#D4C1AB] pl-8">
              <Link href="/cart" className="relative group">
                <ShoppingBag className={cn(
                  "w-5 h-5 transition-colors group-hover:text-[#C8935A]",
                  isDarkBg ? "text-white" : "text-[#1F1610]"
                )} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C8935A] text-[#0D0906] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/custom-order" className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                isDarkBg 
                  ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20"
                  : "bg-[#1A120C] text-white hover:bg-[#2A1D14]"
              )}>
                Order Custom
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <Link href="/cart" className="relative">
              <ShoppingBag className={cn("w-6 h-6", isDarkBg ? "text-white" : "text-[#1F1610]")} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C8935A] text-[#0D0906] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className={cn("p-2", isDarkBg ? "text-white" : "text-[#1F1610]")}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-[#E4D4C1] shadow-xl md:hidden flex flex-col px-6 py-4 gap-4">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={cn("text-lg font-medium", pathname === href ? "text-[#C8935A]" : "text-[#1F1610]")}>
              {label}
            </Link>
          ))}
          <Link href="/custom-order" onClick={() => setMenuOpen(false)} className="mt-4 text-center px-5 py-3 rounded-full bg-[#C8935A] text-[#0D0906] font-medium tracking-wide">
            Order Custom
          </Link>
        </div>
      )}
    </nav>
  )
}
