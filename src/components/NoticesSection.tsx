import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Pin, Calendar, FileText, Image as ImageIcon, Download, Megaphone } from 'lucide-react';
import { fetchNotices, onNoticesChanged, type Notice } from '../lib/dataStore';

function AnimatedCard({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.05);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Deterministic slight tilt per card index — gives the pinned-note feel
// without random values shifting on every re-render.
const TILTS = [-2.5, 1.5, -1, 2, -1.8, 1.2, -2, 1.8];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function isImageFile(name?: string) {
  if (!name) return false;
  return /\.(jpe?g|png|webp|gif)$/i.test(name);
}

export default function NoticesSection() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: titleRef, inView: titleInView } = useInView(0.2);

  useEffect(() => {
    const load = () => {
      fetchNotices().then((n) => {
        setNotices(n);
        setLoading(false);
      });
    };
    load();
    return onNoticesChanged(load);
  }, []);

  return (
    <section id="notices" className="relative bg-sage-50 overflow-hidden">
      {/* Decorative blobs — desktop only */}
      <div className="hidden sm:block absolute top-10 left-0 w-72 h-72 bg-emerald-100/50 rounded-full -translate-x-1/2 blur-3xl" />
      <div className="hidden sm:block absolute bottom-10 right-0 w-80 h-80 bg-gold-100/50 rounded-full translate-x-1/3 blur-3xl" />

      <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 md:py-24 relative">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-8 xs:mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1 xs:py-1.5 bg-emerald-100 text-emerald-700 text-[10px] xs:text-xs font-semibold tracking-widest uppercase rounded-full mb-3 xs:mb-4"
          >
            <Megaphone className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
            Stay Updated
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 xs:mb-4"
          >
            News<span className="text-emerald-600">/Notices</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={titleInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-emerald-500 to-gold-400 mx-auto rounded-full"
          />
        </div>

        {/* Board */}
        <div
          className="relative rounded-2xl xs:rounded-3xl p-4 xs:p-6 sm:p-8 md:p-10 border-[6px] xs:border-8 border-[#a5734a] shadow-2xl"
          style={{
            background:
              'repeating-linear-gradient(135deg, #c99a63, #c99a63 2px, #bd8f57 2px, #bd8f57 4px)',
          }}
        >
          {/* Inner shadow to sell the "board" depth */}
          <div className="absolute inset-0 rounded-xl xs:rounded-2xl shadow-[inset_0_2px_20px_rgba(0,0,0,0.35)] pointer-events-none" />

          {loading ? (
            <p className="text-center text-white/90 text-sm py-10 relative">Loading notices…</p>
          ) : notices.length === 0 ? (
            <div className="text-center py-10 xs:py-14 relative">
              <Pin className="w-8 h-8 xs:w-10 xs:h-10 text-white/70 mx-auto mb-3" />
              <p className="text-white/90 text-sm xs:text-base font-medium">No notices posted yet.</p>
              <p className="text-white/60 text-xs xs:text-sm mt-1">Check back soon for updates and announcements.</p>
            </div>
          ) : (
            <div className="relative grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-6 sm:gap-8 py-2">
              {notices.map((n, i) => (
                <AnimatedCard key={n.id} delay={i * 0.08} className="relative">
                  <div
                    className="relative bg-[#fffdf5] rounded-md p-4 xs:p-5 shadow-[0_8px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300"
                    style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}
                  >
                    {/* Pin */}
                    <div className="absolute -top-3 xs:-top-3.5 left-1/2 -translate-x-1/2 w-6 h-6 xs:w-7 xs:h-7 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-md flex items-center justify-center ring-2 ring-white/60">
                      <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-red-800/50" />
                    </div>

                    <div className="flex items-center gap-1.5 text-emerald-700 text-[10px] xs:text-xs font-semibold uppercase tracking-wider mb-2 mt-1">
                      <Calendar className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                      {formatDate(n.date)}
                    </div>

                    <h3 className="font-display text-base xs:text-lg font-bold text-gray-900 mb-1.5 leading-snug">
                      {n.heading}
                    </h3>

                    <p className="text-gray-600 text-xs xs:text-sm leading-relaxed mb-3 line-clamp-4">
                      {n.desc}
                    </p>

                    {n.fileUrl && (
                      <a
                        href={n.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={n.fileName}
                        className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] xs:text-xs font-semibold rounded-lg hover:bg-emerald-100 transition-colors"
                      >
                        {isImageFile(n.fileName) ? (
                          <ImageIcon className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                        ) : (
                          <FileText className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                        )}
                        <span className="truncate max-w-[120px] xs:max-w-[140px]">{n.fileName}</span>
                        <Download className="w-3 h-3 xs:w-3.5 xs:h-3.5 shrink-0" />
                      </a>
                    )}
                  </div>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}