'use client'
import { useEffect, useState } from 'react'

const features = [
  { icon: '◈', label: 'Full leather grade & colour selection' },
  { icon: '◇', label: 'Custom tree width & seat sizing' },
  { icon: '✦', label: 'Hand tooling & decorative stitching patterns' },
  { icon: '⬡', label: 'Hardware in silver, brass, or bronze' },
  { icon: '◉', label: 'Billets, rigging, and fender customisation' },
  { icon: '●', label: 'Personalised initials or brand stamping' },
]

const steps = [
  { num: '01', title: 'Submit Your Request', desc: 'Fill in the form with your requirements and contact details.' },
  { num: '02', title: 'Consultation Call', desc: 'We\'ll reach out within 24 hours to discuss your vision in detail.' },
  { num: '03', title: 'Design Approval', desc: 'Receive a detailed spec sheet and approve before we begin.' },
  { num: '04', title: 'Handcrafted for You', desc: 'Our craftsmen build your saddle — typically 6 to 8 weeks.' },
  { num: '05', title: 'Delivered to Your Door', desc: 'Carefully packaged and shipped directly to you, anywhere in the world.' },
]

export default function CustomOrderPage() {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* PAGE HERO */}
      <section className="relative pt-40 pb-24 px-[6%] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_85%_40%,rgba(200,147,90,0.14)_0%,transparent_65%),linear-gradient(145deg,#1A120C_0%,#0D0906_100%)]"></div>
        <div className="relative z-10 animate-[fadeUp_0.8s_ease_0.1s_both]">
          <span className="text-[#C8935A] font-semibold tracking-widest uppercase text-sm">Made to Order</span>
          <h1 className="font-serif text-[clamp(2.8rem,5vw,5rem)] font-normal leading-[1.1] text-white mt-2 mb-5">
            Your Vision,<br /><em className="text-[#C8935A]">Our Hands</em>
          </h1>
          <p className="text-base text-white/55 leading-[1.8] max-w-[500px]">
            No two riders are alike — and no two saddles should be either.
            Tell us exactly what you need and we&apos;ll build it from scratch.
          </p>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section className="py-28 px-[6%] bg-[#0D0906]">
        <div className="text-center mb-14">
          <span className="text-[#C8935A] font-semibold tracking-widest uppercase text-sm reveal">How It Works</span>
          <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mt-4 reveal">
            The Custom Order <em className="font-serif italic text-[#C8935A]">Process</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0">
          {steps.map(({ num, title, desc }, i) => (
            <div key={num} className="text-center px-6 relative reveal">
              <div className="font-serif text-4xl font-normal text-[#C8935A] mb-4 opacity-80">{num}</div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 right-[-2rem] w-16 h-px bg-[#C8935A]/30"></div>
              )}
              <h3 className="font-serif text-base font-normal text-white mb-2">{title}</h3>
              <p className="text-[0.8rem] text-white/45 leading-[1.65]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + FEATURES */}
      <section className="py-28 px-[6%] bg-[#F7F1EA]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-24 items-start">
          {/* LEFT */}
          <div>
            <span className="text-[#A87844] font-semibold tracking-widest uppercase text-sm reveal">What You Can Customise</span>
            <h2 className="text-4xl sm:text-5xl font-light text-[#1F1610] tracking-tight mt-4 mb-4 reveal">
              Every <em className="font-serif italic text-[#A87844]">Detail</em> is Yours
            </h2>
            <div className="w-16 h-1 bg-[#C8935A] mb-6 reveal"></div>
            <p className="reveal text-[0.97rem] text-[#8A735C] leading-[1.85]">
              From the very first stitch to the final polish, every element of your custom
              saddle is chosen by you and crafted by our master saddlers.
            </p>
            <div className="mt-8 flex flex-col gap-3.5">
              {features.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3.5 text-[0.88rem] text-[#6F5A45] reveal">
                  <span className="text-[#C8935A] text-base shrink-0 w-5">{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 border border-[#E4D4C1] rounded overflow-hidden reveal">
              <div className="p-5 text-center border-b sm:border-b-0 sm:border-r border-[#E4D4C1]">
                <strong className="block font-serif text-xl font-normal text-[#2A1D14] mb-0.5">6–8 weeks</strong>
                <span className="text-[0.7rem] tracking-[0.08em] uppercase text-[#A88E76]">typical production time</span>
              </div>
              <div className="p-5 text-center border-b sm:border-b-0 sm:border-r border-[#E4D4C1]">
                <strong className="block font-serif text-xl font-normal text-[#2A1D14] mb-0.5">Free</strong>
                <span className="text-[0.7rem] tracking-[0.08em] uppercase text-[#A88E76]">consultation included</span>
              </div>
              <div className="p-5 text-center">
                <strong className="block font-serif text-xl font-normal text-[#2A1D14] mb-0.5">Worldwide</strong>
                <span className="text-[0.7rem] tracking-[0.08em] uppercase text-[#A88E76]">shipping available</span>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div>
            {submitted ? (
              <div className="bg-white p-16 rounded-md shadow-lg text-center">
                <div className="w-16 h-16 rounded-full bg-[#C8935A] text-[#2A1D14] text-2xl font-bold flex items-center justify-center mx-auto mb-6">✓</div>
                <h3 className="font-serif text-3xl font-normal text-[#2A1D14] mb-4">Request Received!</h3>
                <p className="text-sm text-[#8A735C] leading-[1.8] max-w-[320px] mx-auto">Thank you for your custom order request. Our team will be in touch within 24 hours to begin your consultation.</p>
              </div>
            ) : (
              <div className="bg-white p-10 rounded-md shadow-lg flex flex-col gap-4">
                <h3 className="font-serif text-2xl font-normal text-[#2A1D14]">Start Your Custom Order</h3>
                <p className="text-[0.82rem] text-[#A88E76] -mt-2">All fields help us understand your needs — fill in as much as you can.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">First Name *</label>
                    <input type="text" placeholder="John" className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors placeholder:text-[#A88E76]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">Last Name *</label>
                    <input type="text" placeholder="Doe" className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors placeholder:text-[#A88E76]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">Email Address *</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors placeholder:text-[#A88E76]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">Phone (optional)</label>
                    <input type="tel" placeholder="+1 (000) 000-0000" className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors placeholder:text-[#A88E76]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">Saddle Type *</label>
                    <select className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors bg-white">
                      <option value="">Select type...</option>
                      <option>Western / Trail</option>
                      <option>English / Dressage</option>
                      <option>Show Jumping</option>
                      <option>Ranch / Working</option>
                      <option>Endurance</option>
                      <option>Other / Not sure</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">Budget Range</label>
                    <select className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors bg-white">
                      <option value="">Select range...</option>
                      <option>Under $1,000</option>
                      <option>$1,000 – $2,000</option>
                      <option>$2,000 – $4,000</option>
                      <option>$4,000+</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">Seat Size</label>
                    <select className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors bg-white">
                      <option value="">Select size...</option>
                      <option>14&quot; (Children)</option>
                      <option>15&quot;</option>
                      <option>15.5&quot;</option>
                      <option>16&quot;</option>
                      <option>16.5&quot;</option>
                      <option>17&quot;</option>
                      <option>17.5&quot;</option>
                      <option>18&quot;+ (Custom)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">Leather Colour Preference</label>
                    <select className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors bg-white">
                      <option value="">Select colour...</option>
                      <option>Natural / Light tan</option>
                      <option>Medium brown</option>
                      <option>Dark chocolate</option>
                      <option>Black</option>
                      <option>Burgundy</option>
                      <option>Custom (describe below)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">Tell Us About Your Ideal Saddle *</label>
                  <textarea placeholder="Describe your riding style, your horse's build, any specific features you want, tooling patterns, hardware preference, or anything else that helps us understand your vision..." className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors min-h-[140px] resize-y placeholder:text-[#A88E76]" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">How Did You Hear About Us?</label>
                  <select className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors bg-white">
                    <option value="">Select...</option>
                    <option>Referral from friend / rider</option>
                    <option>Search engine</option>
                    <option>Social media</option>
                    <option>Horse show / event</option>
                    <option>Other</option>
                  </select>
                </div>

                <button
                  className="w-full py-4 rounded-full bg-[#C8935A] hover:bg-[#D9A56E] text-[#0D0906] text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] mt-1"
                  onClick={() => setSubmitted(true)}
                >
                  Submit Custom Order Request
                </button>
                <p className="text-xs text-[#A88E76] text-center leading-[1.5]">
                  We respond to every request within 24 hours. No commitment required at this stage.
                </p>
              </div>
            )}
          </div>
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
