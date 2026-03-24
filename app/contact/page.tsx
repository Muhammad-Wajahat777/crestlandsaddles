'use client'
import { useEffect, useState } from 'react'

const contactDetails = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+1 (800) 000-0000',
    sub: 'Mon – Fri, 9am – 5pm MST'
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'hello@crestlandsaddlery.com',
    sub: 'We respond within 24 hours'
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Workshop',
    value: '123 Saddlery Lane, Calgary',
    sub: 'Alberta, Canada — T2P 1G6'
  },
]

const faqs = [
  { q: 'How long does a custom saddle take to make?', a: 'Custom saddles typically take 6 to 8 weeks from the time we finalise your spec sheet and approve the design. Rush orders may be available — contact us to discuss.' },
  { q: 'Do you ship internationally?', a: 'Yes. We ship to over 30 countries worldwide. Shipping costs and timelines vary by destination — we\'ll provide a full quote during your consultation.' },
  { q: 'Can I visit the workshop?', a: 'We welcome visits by appointment. Contact us to arrange a time and our team will show you the craft firsthand.' },
  { q: 'Do you offer saddle fitting services?', a: 'We offer remote fitting consultations via video call and can assess your horse\'s back measurements from photos and tracings you send us.' },
  { q: 'What warranty do your saddles carry?', a: 'All Crestland saddles come with a lifetime structural warranty against manufacturing defects, and a 2-year warranty on hardware and stitching.' },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_65%_at_80%_45%,rgba(200,147,90,0.14)_0%,transparent_65%),linear-gradient(150deg,#1A120C_0%,#0D0906_100%)]"></div>
        <div className="relative z-10 animate-[fadeUp_0.8s_ease_0.1s_both]">
          <span className="text-[#C8935A] font-semibold tracking-widest uppercase text-sm">Get in Touch</span>
          <h1 className="font-serif text-[clamp(2.8rem,5vw,5rem)] font-normal leading-[1.1] text-white mt-2 mb-5">
            Let&apos;s Talk <em className="text-[#C8935A]">Saddles</em>
          </h1>
          <p className="text-base text-white/55 leading-[1.8] max-w-[480px]">
            Whether you&apos;re ready to order, have a question, or just want to learn more —
            we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="py-28 px-[6%] bg-[#F7F1EA]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-24 items-start">
          {/* LEFT */}
          <div>
            <span className="text-[#A87844] font-semibold tracking-widest uppercase text-sm reveal">Contact Details</span>
            <h2 className="text-4xl sm:text-5xl font-light text-[#1F1610] tracking-tight mt-4 mb-4 reveal">
              We&apos;re <em className="font-serif italic text-[#A87844]">Here</em> for You
            </h2>
            <div className="w-16 h-1 bg-[#C8935A] mb-6 reveal"></div>
            <p className="reveal text-[0.95rem] text-[#8A735C] leading-[1.85]">
              Our team responds to every message personally. No bots, no canned replies —
              just real people who love horses and leather craft.
            </p>

            <div className="flex flex-col gap-5 mt-8">
              {contactDetails.map(({ icon, label, value, sub }) => (
                <div key={label} className="flex items-start gap-4 p-5 bg-white rounded border border-[#E4D4C1] transition-all duration-200 hover:border-[#C8935A] hover:shadow-md reveal">
                  <div className="w-[42px] h-[42px] rounded-full bg-[#C8935A]/10 text-[#C8935A] flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[0.68rem] tracking-[0.14em] uppercase text-[#A88E76] font-medium mb-0.5">{label}</p>
                    <p className="text-[0.92rem] text-[#2A1D14] font-medium mb-0.5">{value}</p>
                    <p className="text-[0.78rem] text-[#A88E76]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white rounded border border-[#E4D4C1] reveal">
              <p className="text-[0.7rem] tracking-[0.18em] uppercase text-[#A87844] font-medium mb-4">Workshop Hours</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                <span className="text-[0.83rem] text-[#8A735C]">Monday – Friday</span>
                <span className="text-[0.83rem] text-[#2A1D14] font-medium">9:00 AM – 5:00 PM MST</span>
                <span className="text-[0.83rem] text-[#8A735C]">Saturday</span>
                <span className="text-[0.83rem] text-[#2A1D14] font-medium">10:00 AM – 2:00 PM MST</span>
                <span className="text-[0.83rem] text-[#8A735C]">Sunday</span>
                <span className="text-[0.83rem] text-[#2A1D14] font-medium">Closed</span>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div>
            {submitted ? (
              <div className="bg-white p-16 rounded-md shadow-lg text-center">
                <div className="w-16 h-16 rounded-full bg-[#C8935A] text-[#2A1D14] text-2xl font-bold flex items-center justify-center mx-auto mb-6">✓</div>
                <h3 className="font-serif text-3xl font-normal text-[#2A1D14] mb-4">Message Sent!</h3>
                <p className="text-sm text-[#8A735C] leading-[1.8] max-w-[320px] mx-auto">Thank you for reaching out. We&apos;ll reply to your message within 24 hours.</p>
              </div>
            ) : (
              <div className="bg-white p-10 rounded-md shadow-lg flex flex-col gap-4">
                <h3 className="font-serif text-2xl font-normal text-[#2A1D14] mb-1">Send Us a Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">Your Name *</label>
                    <input type="text" placeholder="Full name" className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors placeholder:text-[#A88E76]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">Email Address *</label>
                    <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors placeholder:text-[#A88E76]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">Subject</label>
                  <select className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors bg-white">
                    <option value="">Select a topic...</option>
                    <option>Custom order enquiry</option>
                    <option>Product question</option>
                    <option>Saddle fitting</option>
                    <option>Shipping &amp; delivery</option>
                    <option>Warranty or repair</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] uppercase tracking-[0.12em] text-[#8A735C] font-medium">Message *</label>
                  <textarea placeholder="Tell us how we can help..." className="w-full px-4 py-3 border border-[#E4D4C1] rounded text-sm text-[#2A1D14] focus:outline-none focus:border-[#C8935A] transition-colors min-h-[150px] resize-y placeholder:text-[#A88E76]" />
                </div>
                <button
                  className="w-full py-4 rounded-full bg-[#C8935A] hover:bg-[#D9A56E] text-[#0D0906] text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] mt-1"
                  onClick={() => setSubmitted(true)}
                >
                  Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-[6%] bg-[#0D0906]">
        <div className="text-center mb-12">
          <span className="text-[#C8935A] font-semibold tracking-widest uppercase text-sm reveal">FAQ</span>
          <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mt-4 reveal">
            Common <em className="font-serif italic text-[#C8935A]">Questions</em>
          </h2>
        </div>
        <div className="max-w-[800px] mx-auto">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="border-b border-[#C8935A]/12 first:border-t first:border-t-[#C8935A]/12 reveal">
              <button
                className="flex justify-between items-center w-full py-5 text-left gap-6 font-serif text-lg font-normal text-white hover:text-[#C8935A] transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{q}</span>
                <span className={`text-xl text-[#C8935A] shrink-0 leading-none transition-transform duration-300 font-sans font-light ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="pb-5">
                  <p className="text-sm text-white/55 leading-[1.8]">{a}</p>
                </div>
              )}
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
