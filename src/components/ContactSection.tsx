import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { MapPin, Phone, User, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';

function AnimatedCard({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ContactSection() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setSending(true);
    setSendError(null);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: (() => {
          const fd = new FormData();
          fd.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY as string);
          fd.append('subject', `Haque Academy Inquiry: ${data.get('subject')}`);
          fd.append('from_name', 'Haque Academy Website');
          fd.append('name', data.get('name') as string);
          fd.append('phone', (data.get('phone') as string) || '-');
          fd.append('email', (data.get('email') as string) || '-');
          fd.append('message', data.get('message') as string);
          return fd;
        })(),
      });
      const result = await res.json();
      if (result.success) {
        form.reset();
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 3000);
      } else {
        setSendError(result.message || 'Failed to send. Please try again.');
      }
    } catch {
      setSendError('Network error — please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="bg-sage-50 relative overflow-hidden">
      <div className="hidden sm:block absolute top-0 left-0 w-80 h-80 bg-emerald-50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-96 h-96 bg-gold-50 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 md:py-24 relative">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-8 xs:mb-10 sm:mb-14 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 xs:px-4 py-1 xs:py-1.5 bg-emerald-100 text-emerald-700 text-[10px] xs:text-xs font-semibold tracking-widest uppercase rounded-full mb-3 xs:mb-4"
          >
            Get in Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 xs:mb-4"
          >
            Contact <span className="text-emerald-600">Us</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={titleInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-emerald-500 to-gold-400 mx-auto rounded-full"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-5 xs:gap-6 sm:gap-8 md:gap-12">
          {/* Contact Info */}
          <AnimatedCard>
            <div className="space-y-4 xs:space-y-5 sm:space-y-6">
              <div className="bg-white rounded-2xl xs:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 xs:gap-4 mb-4 xs:mb-5 sm:mb-6">
                  <div className="w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-emerald-100 rounded-xl xs:rounded-2xl flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-emerald-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base xs:text-lg sm:text-xl font-bold text-gray-900">Director</h3>
                    <p className="text-emerald-600 font-medium text-xs xs:text-sm sm:text-base truncate">Ziyauddin Izharul Haque Shaikh</p>
                  </div>
                </div>

                <div className="space-y-3 xs:space-y-4">
                  <a href="tel:+919969412347" className="flex items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-emerald-50 rounded-xl xs:rounded-2xl hover:bg-emerald-100 active:bg-emerald-200 transition-colors group min-h-[52px]">
                    <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 bg-emerald-600 rounded-lg xs:rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] xs:text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                      <p className="text-gray-800 font-semibold text-sm xs:text-base">+91 9969412347</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/919969412347?text=Hii%2C%20I%20would%20like%20to%20inquire%20about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-green-50 rounded-xl xs:rounded-2xl hover:bg-green-100 active:bg-green-200 transition-colors group min-h-[52px]"
                  >
                    <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 bg-[#25D366] rounded-lg xs:rounded-xl flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] xs:text-xs text-gray-400 uppercase tracking-wider">WhatsApp</p>
                      <p className="text-gray-800 font-semibold text-sm xs:text-base">+91 9969412347</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 xs:gap-4 p-3 xs:p-4 bg-gold-50 rounded-xl xs:rounded-2xl">
                    <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 bg-gold-500 rounded-lg xs:rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] xs:text-xs text-gray-400 uppercase tracking-wider">Address</p>
                      <p className="text-gray-800 font-medium text-xs xs:text-sm">
                        Haque Foundation<br />
                        C/O <span className="text-emerald-700 font-semibold">Haque Academy</span><br />
                        Khairi Banka, Bisfi,<br />
                        Madhubani, Bihar
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Haque+Academy+8W9V%2BC8G+Banka+Bihar+847121"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-2xl xs:rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-40 xs:h-44 sm:h-52 md:h-56 relative"
              >
                <iframe
                  src="https://www.google.com/maps?q=Haque+Academy,+8W9V%2BC8G,+Banka,+Bihar+847121&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: 'none' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Haque Academy Location"
                  className="grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-2 xs:bottom-3 left-2 xs:left-3 bg-white/90 backdrop-blur-sm px-2 xs:px-3 py-1 xs:py-1.5 rounded-md xs:rounded-lg shadow-sm">
                  <p className="text-[10px] xs:text-xs font-medium text-gray-700">📍 Khairi Banka, Bisfi, Madhubani, Bihar</p>
                </div>
              </a>
            </div>
          </AnimatedCard>

          {/* Contact Form */}
          <AnimatedCard delay={0.15}>
            <div className="bg-white rounded-2xl xs:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 border border-gray-100 shadow-sm h-full">
              <h3 className="font-display text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-1 xs:mb-2">Send a Message</h3>
              <p className="text-gray-500 text-xs xs:text-sm mb-4 xs:mb-5 sm:mb-6">We'd love to hear from you. Fill out the form below.</p>

              {formSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 xs:py-12 sm:py-16"
                >
                  <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-3 xs:mb-4">
                    <Send className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-emerald-600" />
                  </div>
                  <h4 className="text-lg xs:text-xl font-bold text-gray-900 mb-1 xs:mb-2">Message Sent!</h4>
                  <p className="text-gray-500 text-xs xs:text-sm text-center">We'll get back to you soon. JazakAllah Khair!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4">
                  <div className="grid xs:grid-cols-2 gap-3 xs:gap-4">
                    <div>
                      <label className="block text-[10px] xs:text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 xs:mb-1.5">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all min-h-[44px]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] xs:text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 xs:mb-1.5">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all min-h-[44px]"
                        placeholder="Your phone"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 xs:mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all min-h-[44px]"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 xs:mb-1.5">Subject</label>
                    <select
                      name="subject"
                      className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all text-gray-600 min-h-[44px] appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M3.5 4.5L6 7l2.5-2.5'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                    >
                      <option>General Inquiry</option>
                      <option>Admission</option>
                      <option>Donation</option>
                      <option>Scholarship</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] xs:text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 xs:mb-1.5">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg xs:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>
                  {sendError && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{sendError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3 xs:py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm xs:text-base font-semibold rounded-lg xs:rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    {sending ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}