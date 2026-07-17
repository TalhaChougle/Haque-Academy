import { motion } from 'framer-motion';
import { GraduationCap, Users, Award } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative flex flex-col" style={{ minHeight: '100dvh' }}>
      {/* Background image — fixed on desktop, absolute on mobile */}
      <div className="hero-parallax">
        <div className="absolute inset-0">
          <img
            src="/images/school-building.jpg"
            alt="Haque Academy School Building"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-transparent" />
        </div>
      </div>

      {/* Hero Content — scrolls normally, does not stay pinned */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-3 xs:px-4 sm:px-6 text-center safe-padding-top pt-16 xs:pt-20 sm:pt-28 pb-12" style={{ minHeight: '100dvh' }}>
        {/* Logo badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="mb-3 xs:mb-4 sm:mb-6 mt-8 xs:mt-10 sm:mt-16 md:mt-20"
        >
          <div className="relative">
            <div className="absolute -inset-2 xs:-inset-3 bg-emerald-400/20 rounded-full blur-xl animate-pulse" />
            <img
              src="/images/logo.png"
              alt="Haque Academy"
              className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover ring-3 xs:ring-4 ring-white/30 relative"
            />
          </div>
        </motion.div>

        {/* Bismillah */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-arabic text-lg xs:text-xl sm:text-2xl md:text-3xl text-gold-300 mb-1 xs:mb-2"
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-[10px] xs:text-xs sm:text-sm md:text-base text-emerald-200 mb-4 xs:mb-5 sm:mb-6 tracking-widest uppercase max-w-xs xs:max-w-sm sm:max-w-none"
        >
          In the name of Allah, the Most Gracious, the Most Merciful
        </motion.p>

        {/* Main title — dark backdrop panel guarantees legibility regardless of what's in the photo behind it */}
        <div className="relative mb-2 xs:mb-3 sm:mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
          >
            <span className="text-emerald-400">HAQUE ACADEMY</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-2xl mb-2 xs:mb-3 sm:mb-4 leading-relaxed px-2"
        >
          Education is the movement from darkness to light.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-xs xs:text-sm sm:text-base text-emerald-300/80 mb-4 xs:mb-6 sm:mb-8"
        >
          Since 1996 • Khairi Banka, Bisfi, Madhubani, Bihar
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-5 xs:mb-6 sm:mb-8 md:mb-10"
        >
          {[
            { icon: GraduationCap, value: '30+', label: 'Years' },
            { icon: Users, value: '400+', label: 'Students' },
            { icon: Award, value: '100%', label: 'Result 2026' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 bg-white/10 backdrop-blur-sm px-2.5 xs:px-3 sm:px-4 md:px-5 py-2 xs:py-2.5 sm:py-3 rounded-xl xs:rounded-2xl border border-white/10"
            >
              <stat.icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-emerald-400 shrink-0" />
              <div className="text-left">
                <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">{stat.value}</p>
                <p className="text-[10px] xs:text-xs sm:text-sm text-white/60">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-col xs:flex-row gap-2.5 xs:gap-3 sm:gap-4 w-full xs:w-auto px-4 xs:px-0"
        >
          <a
            href="#about"
            className="px-5 xs:px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm sm:text-base font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/30 transition-all active:scale-95 text-center min-h-[44px] flex items-center justify-center"
          >
            Discover More
          </a>
          <a
            href="#donate"
            className="px-5 xs:px-6 sm:px-8 py-3 sm:py-3.5 bg-white/10 backdrop-blur-sm text-white text-sm sm:text-base font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all active:scale-95 text-center min-h-[44px] flex items-center justify-center"
          >
            Support Us
          </a>
        </motion.div>

      </div>

    </section>
  );
}
