import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Trophy, TrendingUp, Star, Sparkles, Medal } from 'lucide-react';

function Counter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.3);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

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

export default function ResultsSection() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);

  return (
    <section id="results" className="relative bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0">
        <div className="hidden sm:block absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl" />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl" />
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 md:py-24 relative">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-8 xs:mb-10 sm:mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1 xs:py-1.5 bg-gold-500/20 text-gold-300 text-[10px] xs:text-xs font-semibold tracking-widest uppercase rounded-full mb-3 xs:mb-4 border border-gold-500/30"
          >
            <Sparkles className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
            Latest Results
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 xs:mb-4"
          >
            Matric Result <span className="text-gold-400">2026</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={titleInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-gold-400 to-emerald-400 mx-auto rounded-full"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6 mb-8 xs:mb-10 sm:mb-12">
          {[
            { icon: Trophy, value: 100, suffix: '%', label: 'Pass Result', color: 'from-gold-400 to-gold-500' },
            { icon: Star, value: 70, suffix: '%', label: '1st Class Students', color: 'from-emerald-400 to-emerald-500' },
            { icon: TrendingUp, value: 447, suffix: '/500', label: 'Maximum Marks', color: 'from-blue-400 to-blue-500' },
            { icon: Sparkles, value: 89, suffix: '.4%', label: 'Highest Percentage', color: 'from-purple-400 to-purple-500' },
          ].map((stat, i) => (
            <AnimatedCard key={i} delay={i * 0.1}>
              <div className="group relative bg-white/10 backdrop-blur-sm rounded-2xl xs:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 border border-white/10 hover:bg-white/15 transition-all duration-500 text-center overflow-hidden">
                <div className="relative">
                  <div className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 mx-auto rounded-xl xs:rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2.5 xs:mb-3 sm:mb-4`}>
                    <stat.icon className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0.5 xs:mb-1">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-emerald-200/70 text-[10px] xs:text-xs sm:text-sm">{stat.label}</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Announcement Banner */}
        <AnimatedCard delay={0.2}>
          <div className="relative bg-gradient-to-r from-gold-500 to-gold-400 rounded-2xl xs:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 text-center overflow-hidden">
            <div className="absolute inset-0 shimmer pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center justify-center mb-3 xs:mb-4">
                <span className="w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center shadow-lg">
                  <Medal className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 text-white" />
                </span>
              </div>
              <h3 className="font-display text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5 xs:mb-2">
                Congratulations to All Students!
              </h3>
              <p className="text-gold-900/80 text-xs xs:text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                We are proud to announce 100% result for the 2026 batch. 
                70% students passed with 1st class marks. The topper scored an incredible 447/500 (89.40%).
              </p>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
}
