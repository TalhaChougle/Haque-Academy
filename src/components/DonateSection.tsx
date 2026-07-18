import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from './useInView';
import { Heart, Building2, Copy, CheckCheck, Shield, HandHeart } from 'lucide-react';

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

function CopyableField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg xs:rounded-xl px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-100 gap-2">
      <div className="min-w-0 flex-1">
        <p className="text-[10px] xs:text-xs text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-xs xs:text-sm sm:text-base font-mono font-medium text-gray-800 truncate">{value}</p>
      </div>
      <button
        onClick={handleCopy}
        className={`p-2 rounded-lg transition-all shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center ${
          copied ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 active:bg-emerald-100'
        }`}
        aria-label={`Copy ${label}`}
      >
        {copied ? <CheckCheck className="w-3.5 h-3.5 xs:w-4 xs:h-4" /> : <Copy className="w-3.5 h-3.5 xs:w-4 xs:h-4" />}
      </button>
    </div>
  );
}

export default function DonateSection() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      id="donate"
      ref={containerRef}
      className="relative overflow-hidden bg-white"
    >
      {/* Hardware-accelerated Parallax Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          style={{ y }}
          className="absolute -inset-y-[15%] inset-x-0 w-full h-[130%] opacity-45"
        >
          <img
            src="/images/school-building.png"
            alt=""
            className="w-full h-full object-cover object-[center_28%]"
          />
        </motion.div>
        {/* Overlay to blend image and ensure legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/20 to-white" />
      </div>

      {/* Decorative hearts — desktop only for performance */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-emerald-100"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Heart className="w-6 h-6 fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 md:py-24 relative">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-8 xs:mb-10 sm:mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1 xs:py-1.5 bg-rose-50 text-rose-600 text-[10px] xs:text-xs font-semibold tracking-widest uppercase rounded-full mb-3 xs:mb-4 border border-rose-100"
          >
            <HandHeart className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
            Make a Difference
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 xs:mb-4"
          >
            Support <span className="text-emerald-600">Education</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-500 max-w-xl mx-auto text-xs xs:text-sm sm:text-base px-2"
          >
            Your generous donation helps provide quality education to underprivileged children. 
            Every contribution makes a difference in a child's future.
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={titleInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-emerald-500 to-gold-400 mx-auto rounded-full mt-4 xs:mt-5 sm:mt-6"
          />
        </div>

        {/* Donation Options */}
        <div className="max-w-4xl mx-auto">
          {/* Impact stats */}
          <AnimatedCard>
            <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-5 md:gap-6 mb-6 xs:mb-8 sm:mb-10 md:mb-12">
              {[
                { emoji: '📚', value: '75+', label: 'Students on Scholarship' },
                { emoji: '👧', value: '60%', label: 'Girl Students Supported' },
                { emoji: '💡', value: '30+', label: 'Years of Impact' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl xs:rounded-2xl p-2.5 xs:p-3 sm:p-4 md:p-5 text-center border border-gray-100 shadow-sm">
                  <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl mb-1 xs:mb-2 block">{stat.emoji}</span>
                  <p className="text-sm xs:text-base sm:text-lg md:text-2xl font-bold text-emerald-700">{stat.value}</p>
                  <p className="text-[8px] xs:text-[10px] sm:text-xs text-gray-500 mt-0.5 xs:mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Content */}
          <AnimatedCard delay={0.15}>
            <div className="grid md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
              {/* Left: Bank Details Card */}
              <div className="donation-card">
                <div className="bg-white rounded-2xl xs:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 border border-gray-100 shadow-xl shadow-emerald-500/5">
                  <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 bg-blue-50 text-blue-600 text-[10px] xs:text-xs font-semibold rounded-full mb-3 xs:mb-4 sm:mb-5">
                    <Building2 className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                    Bank Details
                  </div>
                  <div className="space-y-2 xs:space-y-2.5 sm:space-y-3">
                    <CopyableField label="Account Name" value="Haque Foundation" />
                    <CopyableField label="Account Number" value="1282000100127181" />
                    <CopyableField label="IFSC Code" value="PUNB0128200" />
                    <CopyableField label="Bank Name" value="Punjab National Bank" />
                  </div>
                </div>

                <div className="bg-white rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-5 border border-gray-100 flex items-center gap-3 xs:gap-4 mt-4 xs:mt-5 sm:mt-6">
                  <div className="w-9 h-9 xs:w-10 xs:h-10 bg-emerald-50 rounded-lg xs:rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 xs:w-5 xs:h-5 text-emerald-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 text-xs xs:text-sm">100% Secure & Transparent</p>
                    <p className="text-gray-500 text-[10px] xs:text-xs">All donations are managed by Haque Foundation Trust</p>
                  </div>
                </div>
              </div>

              {/* Right: Info Card */}
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl xs:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 text-white relative overflow-hidden">
                  <div className="hidden sm:block absolute top-0 right-0 w-32 h-32 bg-emerald-500/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <div className="relative">
                    <Heart className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-emerald-200 mb-3 xs:mb-4" />
                    <h3 className="font-display text-lg xs:text-xl sm:text-2xl font-bold mb-2 xs:mb-3">Your Impact</h3>
                    <p className="text-emerald-100 text-xs xs:text-sm leading-relaxed mb-3 xs:mb-4 sm:mb-5">
                      Every donation directly supports a child's education. From school fees to books and uniforms, 
                      your contribution makes quality education accessible.
                    </p>
                    <div className="space-y-2 xs:space-y-2.5 sm:space-y-3">
                      {[
                        { amount: '₹1,500', impact: 'One student admission fee' },
                        { amount: '₹3,500', impact: 'Books and uniforms' },
                        { amount: '₹1,600', impact: 'Semester examination fee' },
                        { amount: '₹4,500', impact: 'Half year fee scholarship' },
                        { amount: '₹9,000', impact: 'Full year scholarship' },
                      ].map((tier, i) => (
                        <div key={i} className="flex items-center gap-2 xs:gap-3 bg-white/10 rounded-lg xs:rounded-xl px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3">
                          <span className="text-gold-300 font-bold text-xs xs:text-sm whitespace-nowrap">{tier.amount}</span>
                          <span className="text-emerald-100 text-[11px] xs:text-xs sm:text-sm">{tier.impact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}