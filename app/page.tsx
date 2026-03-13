import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0D0906] text-white selection:bg-[#C8935A] selection:text-black">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/saddle-bg.png"
          alt="Premium Horse Saddle"
          fill
          className="object-cover object-center opacity-60 md:opacity-50"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Dark gradient overlay — lighter on mobile to keep saddle prominent */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent md:from-black/80 md:via-black/50 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 md:from-black/70 md:via-transparent md:to-black/30" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-5 md:px-12 md:py-8">
        <div className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-bold tracking-[0.3em] uppercase text-white">
            Equine
          </span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide text-white/70">
          <a href="#" className="hover:text-[#C8935A] transition-colors duration-300">Craftsmanship</a>
          <a href="#" className="hover:text-[#C8935A] transition-colors duration-300">Collection</a>
          <a href="#" className="hover:text-[#C8935A] transition-colors duration-300">Reviews</a>
          <a href="#" className="hover:text-[#C8935A] transition-colors duration-300">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden md:inline-flex text-white/80 hover:text-white hover:bg-white/10 rounded-full px-5 transition-all duration-300">
            Sign In
          </Button>
          <Button className="bg-[#C8935A] hover:bg-[#A87844] text-black font-semibold rounded-full px-5 md:px-7 transition-all duration-300 shadow-lg shadow-[#C8935A]/20 hover:shadow-[#C8935A]/40">
            Shop Now
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col justify-center items-start min-h-[calc(100vh-88px)] md:px-12 lg:px-20 max-w-7xl mx-auto pb-20 pt-10 border-2 border-white">

        <Badge className="mb-5 md:mb-8 bg-white/10 text-[#C8935A] hover:bg-white/15 backdrop-blur-sm px-4 py-1.5 text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold border border-white/10 rounded-full">
          ✦ Handcrafted Excellence
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light tracking-tight mb-5 md:mb-8 leading-[1.05] max-w-4xl">
          The Art of
          <br />
          <span className="font-serif italic text-[#C8935A]">Equestrian</span>
          <br className="hidden sm:block" />
          {" "}Mastery.
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white/60 mb-8 md:mb-12 max-w-lg leading-relaxed">
          Each saddle is meticulously handcrafted from premium full-grain Italian leather — designed for perfect balance, superior grip, and an unparalleled bond between rider and horse.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <Button size="lg" className="bg-[#C8935A] hover:bg-[#A87844] text-black font-semibold h-12 md:h-14 px-8 md:px-10 text-sm md:text-base rounded-full shadow-xl shadow-[#C8935A]/25 transition-all duration-300 hover:shadow-[#C8935A]/40 active:scale-95">
            Explore Collection
          </Button>
          <Button size="lg" variant="ghost" className="h-12 md:h-14 px-8 md:px-10 text-sm md:text-base text-white/80 hover:text-white hover:bg-white/10 border border-white/15 rounded-full transition-all duration-300 active:scale-95 backdrop-blur-sm">
            ▶ Watch Our Story
          </Button>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-16 md:mt-24 flex items-center gap-8 md:gap-12 pt-8 border-t border-white/10 w-full max-w-xl">
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-white">50<span className="text-[#C8935A]">+</span></p>
            <p className="text-[10px] md:text-xs text-white/40 tracking-[0.2em] uppercase font-medium mt-1">Years of Craft</p>
          </div>
          <div className="w-px h-10 md:h-14 bg-white/10"></div>
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-white">1,200<span className="text-[#C8935A]">+</span></p>
            <p className="text-[10px] md:text-xs text-white/40 tracking-[0.2em] uppercase font-medium mt-1">Saddles Delivered</p>
          </div>
          <div className="w-px h-10 md:h-14 bg-white/10"></div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-2xl sm:text-3xl md:text-4xl font-light text-white">4.9</p>
              <svg className="w-4 h-4 md:w-5 md:h-5 text-[#C8935A] mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <p className="text-[10px] md:text-xs text-white/40 tracking-[0.2em] uppercase font-medium mt-1">Avg. Rating</p>
          </div>
        </div>
      </main>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</p>
        <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}
