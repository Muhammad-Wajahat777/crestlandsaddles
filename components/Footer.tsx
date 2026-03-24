'use client'
import Link from 'next/link'

const navLinks = [
  { href: '/',             label: 'Home' },
  { href: '/about',        label: 'Our Craft' },
  { href: '/products',     label: 'Saddles' },
  { href: '/custom-order', label: 'Custom Order' },
  { href: '/contact',      label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0D0906] text-[#D7C6B2] pt-20 pb-8 border-t border-[#2A1D14]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="text-2xl font-light tracking-tight text-white mb-4 block">
              Crestland <span className="font-serif italic text-[#C8935A]">Saddlery</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 font-light max-w-sm">
              Handcrafted with passion.<br />Ridden with pride.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'Pinterest'].map(s => (
                <a key={s} href="#" className="text-[#A88E76] hover:text-[#C8935A] transition-colors text-sm font-medium">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-2">
            <p className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Navigate</p>
            <ul className="space-y-4">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#A88E76] hover:text-[#C8935A] transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <p className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Contact</p>
            <ul className="space-y-4 text-sm text-[#A88E76]">
              <li>
                <a href="mailto:hello@crestlandsaddlery.com" className="hover:text-[#C8935A] transition-colors">hello@crestlandsaddlery.com</a>
              </li>
              <li>
                <a href="tel:+18000000000" className="hover:text-[#C8935A] transition-colors">+1 (800) 000-0000</a>
              </li>
              <li>Calgary, AB, Canada</li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <p className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Newsletter</p>
            <p className="text-sm text-[#A88E76] mb-6 leading-relaxed">Stay updated on new saddles, craftsmanship stories, and exclusive offers.</p>
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-[#1A120C] border border-[#3A2A1D] rounded-full py-3 px-5 text-sm text-white focus:outline-none focus:border-[#C8935A] transition-colors placeholder:text-[#8A735C]"
                required
              />
              <button 
                type="submit" 
                className="absolute right-1 w-10 h-10 bg-[#C8935A] rounded-full flex items-center justify-center text-[#0D0906] hover:bg-[#D9A56E] transition-colors"
                aria-label="Subscribe"
              >
                &rarr;
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#2A1D14] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#8A735C]">
            © {new Date().getFullYear()} Crestland Saddlery. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[#8A735C]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
