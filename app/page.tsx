import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createServerSupabase } from '@/lib/supabase/server'

const testimonials = [
  { quote: 'The most comfortable saddle I\'ve ridden in twenty years. The custom fit transformed my horse\'s movement completely.', name: 'Sarah Mitchell', title: 'Dressage Competitor', initial: 'S' },
  { quote: 'My custom western saddle arrived exactly as imagined — the hand tooling is nothing short of stunning artistry.', name: 'Rick Callahan', title: 'Ranch Owner', initial: 'R' },
  { quote: 'The team guided me through every detail. Communication was perfect and the result is a saddle I\'ll pass down to my children.', name: 'Laura Desjardins', title: 'Show Jumper', initial: 'L' },
]

export default async function HomePage() {
  const supabase = createServerSupabase()
  const { data: dbProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(3)

  const featuredProducts = dbProducts ?? []

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F1EA] text-[#1F1610] font-sans selection:bg-[#C8935A]/30">
      
      {/* ── HERO ── */}
      <section className="relative min-h-[88svh] md:min-h-[92svh] w-full overflow-hidden bg-[#0D0906] text-white selection:bg-[#C8935A] selection:text-black">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/saddle-bg.png"
            alt="Premium Horse Saddle"
            fill
            className="object-contain object-[right_bottom] md:object-center scale-[1.4] md:scale-90 translate-x-16 translate-y-20 md:translate-x-0 md:translate-y-0 opacity-70 md:opacity-85"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0906] via-[#0D0906]/80 to-transparent md:from-black/80 md:via-black/50 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0906] via-transparent to-[#0D0906]/50 md:from-black/70 md:via-transparent md:to-black/30" />
        </div>

        <main className="relative z-10 flex flex-col justify-center items-start min-h-[calc(88svh-80px)] md:min-h-[calc(92svh-88px)] px-6 md:px-12 lg:px-20 max-w-7xl mx-auto pb-12 md:pb-16 pt-36 md:pt-28">
          <Badge className="mb-4 md:mb-6 bg-white/10 text-[#C8935A] hover:bg-white/15 backdrop-blur-sm px-4 py-1.5 text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold border border-white/10 rounded-full">
            Handcrafted Excellence
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 md:mb-6 leading-[1.08] max-w-3xl">
            The Art of
            <br />
            <span className="font-serif italic text-[#C8935A]">Equestrian</span>
            <br className="hidden sm:block" />
            {' '}Mastery.
          </h1>

          <p className="text-sm md:text-base text-white/60 mb-6 md:mb-8 max-w-md leading-relaxed">
            Each saddle is meticulously handcrafted from premium full-grain Italian leather - designed for perfect balance, superior grip, and an unparalleled bond between rider and horse.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="bg-[#C8935A] hover:bg-[#A87844] text-black font-semibold h-11 md:h-12 px-7 md:px-9 text-sm md:text-base rounded-full shadow-xl shadow-[#C8935A]/25 transition-all duration-300 hover:shadow-[#C8935A]/40 active:scale-95">
              <Link href="/products">Explore Collection</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="h-11 md:h-12 px-7 md:px-9 text-sm md:text-base text-white/80 hover:text-white hover:bg-white/10 border border-white/15 rounded-full transition-all duration-300 active:scale-95 backdrop-blur-sm">
              <Link href="/about">Watch Our Story</Link>
            </Button>
          </div>

          <div className="hidden md:flex mt-10 lg:mt-12 items-center justify-between pt-6 border-t border-white/10 w-full">
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
              <div className="flex items-center gap-1.5 justify-end">
                <p className="text-2xl sm:text-3xl md:text-4xl font-light text-white">4.9</p>
                <svg className="w-4 h-4 md:w-5 md:h-5 text-[#C8935A] mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <p className="text-[10px] md:text-xs text-white/40 tracking-[0.2em] uppercase font-medium mt-1 text-right">Avg. Rating</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 animate-bounce">
            <p className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</p>
            <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </main>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="py-24 sm:py-32 bg-[#F7F1EA] relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-[#C8935A]/8 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <span className="text-[#A87844] font-semibold tracking-widest uppercase text-sm">Our Craft</span>
              <h2 className="text-4xl sm:text-5xl font-light text-[#1F1610] tracking-tight">
                More Than a Saddle —<br />
                It&apos;s a <span className="font-serif italic text-[#A87844]">Bond</span>
              </h2>
              <div className="w-16 h-1 bg-[#C8935A]"></div>
              <p className="text-lg text-[#6F5A45] leading-relaxed">
                At Crestland Saddlery, we believe every ride tells a story. For over three decades,
                our master craftsmen have shaped premium leather into saddles that don&apos;t just fit a
                horse — they become part of the rider&apos;s journey.
              </p>
              <Link href="/about" className="inline-block mt-4 text-[#1F1610] font-medium border-b-2 border-[#C8935A] pb-1 hover:text-[#A87844] transition-colors">
                Discover Our Story &rarr;
              </Link>
            </div>
            
            <div className="relative h-[500px] rounded-[2rem] overflow-hidden bg-[#E4D4C1] border border-[#D4C1AB] shadow-2xl group">
              <Image
                src="/craftman.png"
                alt="Craftsman at work"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A120C]/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-2xl font-serif italic mb-2">&quot;Built by hand. Ridden with pride.&quot;</p>
                <div className="w-12 h-0.5 bg-[#C8935A]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS TEASER ── */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <span className="text-[#A87844] font-semibold tracking-widest uppercase text-sm">Our Collection</span>
              <h2 className="text-4xl sm:text-5xl font-light text-[#1F1610] tracking-tight">
                Saddles for <span className="font-serif italic text-[#A87844]">Every</span> Rider
              </h2>
            </div>
            <Link href="/products" className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D4C1AB] hover:border-[#C8935A] hover:text-[#A87844] transition-colors font-medium">
              View All Saddles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((p, i) => (
              <Link href="/products" key={p.id} className="group flex flex-col rounded-3xl overflow-hidden border border-[#E4D4C1] bg-[#F7F1EA] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`relative h-64 w-full flex items-center justify-center ${i === 0 ? 'bg-[#2A1D14]/80' : i === 1 ? 'bg-[#3A2A1D]/80' : 'bg-[#1A120C]/80'}`}>
                  {i === 0 && (
                     <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 z-10">
                       New
                     </span>
                  )}
                  {p.image_url.startsWith('http') ? (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={p.image_url}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20"></div>
                  <span className="absolute bottom-4 left-4 text-white/80 font-medium tracking-wide z-10">{p.category}</span>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-semibold text-[#1F1610] mb-3 group-hover:text-[#8C6238] transition-colors line-clamp-1">{p.name}</h3>
                  <p className="text-[#6F5A45] leading-relaxed mb-6 flex-1 line-clamp-3">{p.description}</p>
                  <div className="inline-flex items-center text-[#A87844] font-medium group-hover:gap-2 transition-all">
                    View Details <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D4C1AB] font-medium">
              View All Saddles &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── CUSTOM CTA BANNER ── */}
      <section className="py-24 relative overflow-hidden bg-[#1A120C]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0906] to-[#1A120C]"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C8935A]/50 to-transparent"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <span className="text-[#C8935A] font-semibold tracking-widest uppercase text-sm">Made to Order</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
            Your Vision, <span className="font-serif italic text-[#C8935A]">Our Hands</span>
          </h2>
          <p className="text-lg text-[#D7C6B2] max-w-2xl mx-auto font-light leading-relaxed">
            Can&apos;t find what you need? Every detail — from tree width to tooling pattern —
            is crafted exactly as you envision it. Start your custom journey today.
          </p>
          <div className="pt-4">
            <Link href="/custom-order" className="inline-block px-8 py-4 rounded-full bg-[#C8935A] hover:bg-[#D9A56E] text-[#0D0906] font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,147,90,0.35)] hover:-translate-y-1">
              Start Your Custom Order
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 sm:py-32 bg-[#EFE4D7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#A87844] font-semibold tracking-widest uppercase text-sm">Testimonials</span>
            <h2 className="text-4xl sm:text-5xl font-light text-[#1F1610] tracking-tight">
              Riders Who <span className="font-serif italic text-[#A87844]">Trust</span> Us
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-[#EADCCB] relative">
                <div className="text-5xl text-[#DDB485] absolute top-6 right-8 font-serif">&quot;</div>
                <div className="flex gap-1 text-[#C8935A] mb-6">
                   {/* Five stars */}
                   {[...Array(5)].map((_, j) => (
                     <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                   ))}
                </div>
                <p className="text-[#3A2A1D] italic leading-relaxed mb-8 relative z-10">
                  {t.quote}
                </p>
                <div className="flex flex-col border-t border-[#EADCCB] pt-6">
                  <p className="font-semibold text-[#1F1610]">{t.name}</p>
                  <p className="text-sm text-[#8A735C]">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  )
}
