import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Activities', href: '#activities' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Notices', href: '#notices' },
  { name: 'Results', href: '#results' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 safe-padding-top ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-emerald-900/5 border-b border-emerald-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 xs:h-16 sm:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 sm:gap-3 group shrink-0">
              <div className="relative">
                <img
                  src="/images/logo.png"
                  alt="Haque Academy Logo"
                  className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-emerald-500/30 group-hover:ring-emerald-500 transition-all"
                />
              </div>
              <div className="min-w-0">
                <h1 className={`text-sm xs:text-base sm:text-lg font-bold font-display transition-colors truncate ${
                  scrolled ? 'text-emerald-800' : 'text-emerald-300'
                }`}>
                  Haque Academy
                </h1>
                <p className={`text-[9px] xs:text-[10px] sm:text-xs tracking-wider transition-colors ${
                  scrolled ? 'text-emerald-600' : 'text-emerald-200'
                }`}>
                  Est. 1996
                </p>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-emerald-500/10 ${
                    scrolled ? 'text-gray-700 hover:text-emerald-700' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#donate"
                className="ml-2 xl:ml-3 px-4 xl:px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                Donate Now
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                scrolled ? 'text-emerald-700 hover:bg-emerald-50' : 'text-white hover:bg-white/10'
              }`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white backdrop-blur-xl lg:hidden overflow-y-auto"
            style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 0px)' }}
          >
            <div className="flex flex-col items-center gap-1.5 xs:gap-2 pt-16 xs:pt-20 pb-8 px-4 xs:px-6 min-h-full">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={closeMobile}
                  className="w-full text-center py-3 xs:py-3.5 text-base xs:text-lg font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 rounded-2xl transition-all min-h-[48px] flex items-center justify-center"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#donate"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                onClick={closeMobile}
                className="mt-3 w-full text-center py-3.5 xs:py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-base xs:text-lg font-semibold rounded-2xl min-h-[52px] flex items-center justify-center active:opacity-90"
              >
                Donate Now
              </motion.a>
              <motion.a
                href="tel:+919969412347"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 flex items-center gap-2 text-emerald-700 font-medium text-sm xs:text-base min-h-[44px]"
              >
                <Phone size={16} /> +91 9969412347
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
