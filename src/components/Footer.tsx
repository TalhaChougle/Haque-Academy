import { Heart, ArrowUp, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Top wave */}
      <svg viewBox="0 0 1440 60" className="w-full text-sage-50 -mb-px block" preserveAspectRatio="none" style={{ height: '30px' }}>
        <path fill="currentColor" d="M0,40 C480,0 960,60 1440,20 L1440,0 L0,0 Z" />
      </svg>

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 xs:py-10 sm:py-12 md:py-16 safe-padding-bottom">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8 sm:gap-10 mb-8 xs:mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 xs:gap-3 mb-3 xs:mb-4">
              <img src="/images/logo.png" alt="Haque Academy" className="w-8 h-8 xs:w-10 xs:h-10 rounded-full object-cover shrink-0" />
              <div className="min-w-0">
                <h3 className="font-display text-base xs:text-lg font-bold text-emerald-400">Haque Academy</h3>
                <p className="text-[10px] xs:text-xs text-gray-400">Since 1996</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs xs:text-sm leading-relaxed mb-3 xs:mb-4">
              A modern educational institution dedicated to quality education and overall personality development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 xs:mb-4 text-xs xs:text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 xs:space-y-2.5">
              {['Home', 'About', 'Activities', 'Gallery', 'Notices', 'Results', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-emerald-400 active:text-emerald-300 text-xs xs:text-sm transition-colors inline-block py-0.5 min-h-[28px] flex items-center"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h4 className="font-semibold text-white mb-3 xs:mb-4 text-xs xs:text-sm uppercase tracking-wider">Academics</h4>
            <ul className="space-y-2 xs:space-y-2.5">
              {['Pre-Primary', 'Primary (1-5)', 'Middle (6-8)', 'CBSE Syllabus', 'Secondary (9-10)', 'Bihar Board'].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 text-xs xs:text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3 xs:mb-4 text-xs xs:text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-2.5 xs:space-y-3">
              <a href="tel:+919969412347" className="flex items-center gap-2.5 xs:gap-3 text-gray-400 hover:text-emerald-400 active:text-emerald-300 text-xs xs:text-sm transition-colors min-h-[32px]">
                <Phone className="w-3.5 h-3.5 xs:w-4 xs:h-4 shrink-0" />
                +91 9969412347
              </a>
              <div className="flex items-start gap-2.5 xs:gap-3 text-gray-400 text-xs xs:text-sm">
                <MapPin className="w-3.5 h-3.5 xs:w-4 xs:h-4 shrink-0 mt-0.5" />
                <span>Khairi Banka, Bisfi, Madhubani, Bihar</span>
              </div>
            </div>
            <div className="mt-4 xs:mt-5">
              <a
                href="#donate"
                className="inline-flex items-center gap-1.5 xs:gap-2 px-4 xs:px-5 py-2 xs:py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs xs:text-sm font-medium rounded-lg xs:rounded-xl transition-colors min-h-[40px]"
              >
                <Heart className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                Donate Now
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-5 xs:pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 xs:gap-4">
          <p className="text-gray-500 text-[10px] xs:text-xs sm:text-sm text-center sm:text-left leading-relaxed">
            © {new Date().getFullYear()} <span className="text-emerald-400">Haque Academy</span>. All rights reserved.<br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>Under Haque Foundation, Madhubani, Bihar.
          </p>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 xs:w-10 xs:h-10 bg-gray-800 hover:bg-emerald-600 active:bg-emerald-700 rounded-lg xs:rounded-xl flex items-center justify-center transition-colors group min-w-[40px] min-h-[40px]"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  );
}
