'use client'
import { useEffect } from 'react'

const values = [
  { icon: '✦', title: 'Integrity in Every Stitch', desc: 'We never cut corners — literally or figuratively. Every seam, every panel, every rivet is placed with intention and care.' },
  { icon: '◈', title: 'Mastery Over Time', desc: 'Our craftsmen spend years — often decades — honing their skills. This isn\'t a skill you rush. It\'s one you earn.' },
  { icon: '⬡', title: 'Respect for the Horse', desc: 'A well-fitted saddle transforms a horse\'s movement. We design for equine biomechanics first, aesthetics second.' },
  { icon: '◇', title: 'Partnership With Riders', desc: 'We listen. Every custom order begins with a conversation, because the best saddle is one that truly understands its rider.' },
]

const team = [
  { name: 'James Crestland', role: 'Master Saddler & Founder', years: '35 years' },
  { name: 'Elena Vasquez', role: 'Head of English Saddles', years: '18 years' },
  { name: 'Thomas Brennan', role: 'Western & Ranch Specialist', years: '22 years' },
  { name: 'Priya Nair', role: 'Custom Order Consultant', years: '11 years' },
]

const timeline = [
  { year: '1987', event: 'James Crestland opens a small workshop in Calgary with two tools and a dream.' },
  { year: '1995', event: 'First international export — 12 custom saddles shipped to the UK equestrian circuit.' },
  { year: '2003', event: 'Expanded to a full production workshop with a team of six dedicated craftsmen.' },
  { year: '2012', event: 'Launched custom online order consultations, reaching riders across North America.' },
  { year: '2019', event: 'Celebrated 500th handcrafted saddle with a collaboration at the Calgary Stampede.' },
  { year: '2024', event: 'Now serving riders in 12+ countries with a team of twelve master craftspeople.' },
]

export default function AboutPage() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative pt-40 pb-28 px-[6%] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(200,147,90,0.12)_0%,transparent_65%),linear-gradient(160deg,#1A120C_0%,#0D0906_100%)]"></div>
        <div className="relative z-10 max-w-[700px] animate-[fadeUp_0.8s_ease_0.1s_both]">
          <span className="text-[#C8935A] font-semibold tracking-widest uppercase text-sm">Our Craft</span>
          <h1 className="font-serif text-[clamp(2.8rem,5vw,5rem)] font-normal leading-[1.1] text-white mt-2 mb-6">
            The Art of the<br /><em className="text-[#C8935A]">Saddler&apos;s Hand</em>
          </h1>
          <p className="text-base leading-[1.8] text-white/60 max-w-[500px]">
            Three decades of dedication, one unwavering philosophy —
            every saddle we make deserves to be extraordinary.
          </p>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-28 px-[6%] bg-[#F7F1EA]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[#A87844] font-semibold tracking-widest uppercase text-sm reveal">The Story</span>
            <h2 className="text-4xl sm:text-5xl font-light text-[#1F1610] tracking-tight mt-4 mb-4 reveal">
              Where It All <em className="font-serif italic text-[#A87844]">Began</em>
            </h2>
            <div className="w-16 h-1 bg-[#C8935A] mb-6 reveal"></div>
            <p className="text-[0.97rem] leading-[1.85] text-[#6F5A45] reveal">
              In 1987, James Crestland set up a small leather workshop in the back of a Calgary
              stable with little more than a skiving knife, a stitching awl, and an unshakeable
              belief that the world deserved better saddles.
            </p>
            <p className="text-[0.97rem] leading-[1.85] text-[#6F5A45] mt-4 reveal">
              He&apos;d spent years riding competitively and growing frustrated with saddles that
              compromised either comfort or performance. So he decided to make his own — and
              quickly discovered he wasn&apos;t the only one looking.
            </p>
            <p className="text-[0.97rem] leading-[1.85] text-[#6F5A45] mt-4 reveal">
              Today, Crestland Saddlery is home to twelve master craftspeople, serving riders
              across 12 countries. But the philosophy hasn&apos;t changed: every saddle is made by
              hand, for a specific rider, with no compromises.
            </p>
          </div>
          <div>
            <div className="h-[500px] bg-[#C8935A] rounded flex items-center justify-center text-[#2A1D14] font-serif italic text-center reveal">
              <div>
                <p>Workshop photo</p>
                <small className="block mt-1 text-xs opacity-60 font-sans not-italic">Place your image here</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-28 px-[6%] overflow-hidden bg-[#0D0906]">
        <div className="text-center mb-14">
          <span className="text-[#C8935A] font-semibold tracking-widest uppercase text-sm reveal">Our Journey</span>
          <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mt-4 reveal">
            Milestones That <em className="font-serif italic text-[#C8935A]">Shaped</em> Us
          </h2>
        </div>
        <div className="relative max-w-[900px] mx-auto">
          {/* Center line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-[#C8935A] to-transparent -translate-x-1/2 hidden md:block"></div>
          
          {timeline.map(({ year, event }, i) => (
            <div key={year} className={`flex gap-8 items-start mb-12 relative reveal ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} md:flex-row md:${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
              <div className={`font-serif text-xl font-normal text-[#C8935A] w-[calc(50%-2rem)] shrink-0 ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'} hidden md:block`}>
                {year}
              </div>
              {/* Dot */}
              <div className="w-3 h-3 rounded-full bg-[#C8935A] border-2 border-[#6A5140] outline-2 outline-[#C8935A] absolute left-1/2 top-1.5 -translate-x-1/2 shrink-0 hidden md:block"></div>
              <div className={`w-[calc(50%-2rem)] ${i % 2 === 0 ? 'pl-8' : 'pr-8 text-right'} hidden md:block`}>
                <p className="text-sm text-white/60 leading-[1.7]">{event}</p>
              </div>
              {/* Mobile layout */}
              <div className="md:hidden w-full pl-8">
                <div className="font-serif text-xl text-[#C8935A] mb-1">{year}</div>
                <p className="text-sm text-white/60 leading-[1.7]">{event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-28 px-[6%] bg-[#F7F1EA]">
        <div className="text-center mb-12">
          <span className="text-[#A87844] font-semibold tracking-widest uppercase text-sm reveal">What We Stand For</span>
          <h2 className="text-4xl sm:text-5xl font-light text-[#1F1610] tracking-tight mt-4 reveal">
            Our <em className="font-serif italic text-[#A87844]">Core</em> Values
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon, title, desc }) => (
            <div key={title} className="p-8 bg-white rounded border-t-[3px] border-t-[#C8935A] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg reveal">
              <div className="text-2xl text-[#C8935A] mb-4">{icon}</div>
              <h3 className="font-serif text-lg font-normal text-[#2A1D14] mb-2">{title}</h3>
              <p className="text-sm text-[#8A735C] leading-[1.7]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-28 px-[6%] bg-[#0D0906]">
        <div className="text-center mb-12">
          <span className="text-[#C8935A] font-semibold tracking-widest uppercase text-sm reveal">The Makers</span>
          <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mt-4 reveal">
            Meet the <em className="font-serif italic text-[#C8935A]">Craftspeople</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(({ name, role, years }) => (
            <div key={name} className="text-center p-8 bg-white/[0.04] border border-[#C8935A]/10 rounded transition-colors duration-300 hover:border-[#C8935A]/30 reveal">
              <div className="w-20 h-20 rounded-full bg-[#C8935A] mx-auto mb-5 flex items-center justify-center font-serif text-3xl text-[#2A1D14] font-medium">
                {name.charAt(0)}
              </div>
              <h3 className="font-serif text-lg font-normal text-white mb-1">{name}</h3>
              <p className="text-xs text-[#C8935A] tracking-wider mb-1">{role}</p>
              <p className="text-xs text-white/35">{years} of craft</p>
            </div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  )
}
