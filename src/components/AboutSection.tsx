import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Heart, BookOpen, Eye, Star, Lightbulb, Target } from 'lucide-react';

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

export default function AboutSection() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);

  const features = [
    { icon: BookOpen, title: 'Quality Education', desc: 'Experienced teachers with CBSE & Bihar Board curriculum' },
    { icon: Heart, title: 'Moral Values', desc: 'Islamic values integration with character building' },
    { icon: Lightbulb, title: 'Smart Learning', desc: 'Interactive and student-centered teaching approach' },
    { icon: Target, title: 'Competitive Prep', desc: 'Preparing students for academic and competitive success' },
    { icon: Star, title: 'Scholarships', desc: '25 - 30% students receive full or half fee exemption annually' },
    { icon: Eye, title: 'Inclusive Vision', desc: 'Affordable education for every child, especially girls' },
  ];

  return (
    <section id="about" className="content-overlay">
      {/* Curved top to overlap hero */}
      <div className="relative">
        <div className="absolute -top-16 xs:-top-20 left-0 right-0 h-20 xs:h-24 bg-gradient-to-b from-transparent to-white" />
        <svg viewBox="0 0 1440 120" className="relative -top-px w-full text-white block" preserveAspectRatio="none" style={{ height: '40px' }}>
          <path fill="currentColor" d="M0,80 C360,120 1080,40 1440,80 L1440,120 L0,120 Z" />
        </svg>
      </div>

      <div className="bg-white relative overflow-hidden">
        {/* Decorative patterns — hidden on very small screens to save perf */}
        <div className="hidden sm:block absolute top-0 left-0 w-72 h-72 bg-emerald-50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="hidden sm:block absolute top-40 right-0 w-96 h-96 bg-gold-50 rounded-full translate-x-1/2 blur-3xl" />

        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 md:py-20 relative">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-8 xs:mb-10 sm:mb-14 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 xs:px-4 py-1 xs:py-1.5 bg-emerald-50 text-emerald-700 text-[10px] xs:text-xs font-semibold tracking-widest uppercase rounded-full mb-3 xs:mb-4">
                Our Story
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 xs:mb-4"
            >
              About <span className="text-emerald-600">Haque Academy</span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={titleInView ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-emerald-500 to-gold-400 mx-auto rounded-full"
            />
          </div>

          {/* Founder Story */}
          <AnimatedCard className="mb-8 xs:mb-10 sm:mb-14 md:mb-20">
            <div className="relative bg-gradient-to-br from-emerald-50 via-white to-gold-50 rounded-2xl xs:rounded-3xl p-4 xs:p-5 sm:p-8 md:p-10 border border-emerald-100 overflow-hidden">
              {/* Decorative corners — desktop only */}
              <div className="hidden sm:block absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-100 to-transparent rounded-bl-full" />
              <div className="hidden sm:block absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gold-100 to-transparent rounded-tr-full" />

              <div className="relative">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-xl overflow-hidden shrink-0 ring-2 ring-emerald-600">
                        <img src="/images/founder.jpg" alt="Hafiz Izharul Haque Ataur Rahaman" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">The Visionary Founder</h3>
                        <p className="text-base sm:text-xl font-medium text-emerald-600 leading-tight">Hafiz Izharul Haque Ataur Rahaman</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-xs xs:text-sm sm:text-base">
                      The <span className="text-emerald-700 font-semibold">Haque Academy</span> runs under the aegis of <strong className="text-emerald-700">Haque Foundation (registered organisation)</strong>,
                      founded by <strong className="text-emerald-700">Hafiz Izharul Haque Ataur Rahaman</strong>, who was blind, but he knew
                      the importance of education. With that vision in mind, he founded this school with the help of his son in his village on
                      <strong className="text-emerald-700"> 16th June, 1996</strong>.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-xs xs:text-sm sm:text-base">
                      He himself was blind, but he shared the <em className="text-gold-600 font-medium">light of knowledge</em> among people.
                      Over the past 30 years, and through their continuous hard work, and dedication the school has reached the great position it is today. Every child in their village has studied at their school and today they have become something or the other.
                    </p>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed text-xs xs:text-sm sm:text-base md:pt-14 lg:pt-16">
                      Especially <strong className="text-emerald-700">girls are most benefited</strong> from his school.
                      Those children whose parents never went to school, whose homes never saw a copy of a book,
                      some of the children of those homes studied because of Hafiz Izharul Haque, some studied further,
                      some became <strong>engineers</strong>, some became <strong>doctors</strong>, and some became <strong>CAs</strong>.
                    </p>
                    <div className="bg-white/80 rounded-xl xs:rounded-2xl p-3 xs:p-4 border border-emerald-100">
                      <p className="text-emerald-800 font-medium italic text-xs xs:text-sm sm:text-base leading-relaxed">
                        "He was blind, yet he illuminated the path of knowledge for thousands. Today, every person
                        in his village remembers his extraordinary contribution towards education."
                      </p>
                    </div>
                    <div className="bg-white/80 rounded-xl xs:rounded-2xl p-3 xs:p-4 border border-emerald-100">
                      <p className="text-emerald-800 font-medium italic text-xs xs:text-sm sm:text-base leading-relaxed">
                        "Hafiz Izharul Haque is no longer with us today. He passed away on September 20, 2024.
                        We pray to Allah to forgive him and grant him a high place in Paradise. May Allah accept
                        his efforts and endeavors, Aameen."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* School Director */}
          <AnimatedCard delay={0.05} className="mb-8 xs:mb-10 sm:mb-14 md:mb-20">
            <div className="relative bg-gradient-to-br from-emerald-50 via-white to-gold-50 rounded-2xl xs:rounded-3xl p-4 xs:p-5 sm:p-8 md:p-10 border border-emerald-100 overflow-hidden">
              <div className="hidden sm:block absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-100 to-transparent rounded-bl-full" />
              <div className="hidden sm:block absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gold-100 to-transparent rounded-tr-full" />
              <div className="relative">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-xl overflow-hidden shrink-0 ring-2 ring-emerald-600">
                        <img src="/images/director.jpg" alt="Ziyauddin Izharul Haque Shaikh" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">School Director</h3>
                        <p className="text-base sm:text-xl font-medium text-emerald-600 leading-tight">Ziyauddin Izharul Haque Shaikh</p>
                      </div>
                    </div>
                    <div className="bg-white/80 rounded-xl xs:rounded-2xl p-3 xs:p-4 border border-emerald-100">
                      <p className="text-emerald-800 font-medium italic text-xs xs:text-sm sm:text-base leading-relaxed">
                        "The elder son, <strong className="text-emerald-700">Ziyauddin Izharul Haque Shaikh</strong>, has now taken up the responsibility of his father to run the school, <strong className="text-emerald-700">Haque Academy</strong>."
                      </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-xs xs:text-sm sm:text-base">
                      <strong className="text-emerald-700">Message from Director:</strong><br />
                      <span className="font-arabic text-gold-600 text-lg sm:text-xl font-semibold">Assalamu Alaikum</span>, it is my privilege to extend my heartfelt
                      greetings to all of you. Education is a shared responsibility between the school, parents, and the community.
                      Together, we can help our children become knowledgeable, responsible, and compassionate individuals.
                    </p>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed text-xs xs:text-sm sm:text-base md:pt-14 lg:pt-16">
                      At <span className="text-emerald-700 font-semibold">Haque Academy</span>, we are committed to providing quality education in a safe, disciplined, and caring
                      environment. Our aim is not only to achieve academic excellence but also to nurture good character,
                      honesty, respect, and a lifelong love of learning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 mb-8 xs:mb-10 sm:mb-14 md:mb-20">
            <AnimatedCard delay={0.1}>
              <div className="group h-full bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl xs:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 xs:w-32 sm:w-40 h-28 xs:h-32 sm:h-40 bg-emerald-500/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="relative">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-white/15 backdrop-blur-sm rounded-xl xs:rounded-2xl flex items-center justify-center mb-3 xs:mb-4 sm:mb-5">
                    <Target className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-emerald-200" />
                  </div>
                  <h3 className="font-display text-lg xs:text-xl sm:text-2xl font-bold mb-3 xs:mb-4">Our Mission</h3>
                  <ul className="space-y-2.5 xs:space-y-3">
                    {[
                      'To provide inclusive and affordable education for every child.',
                      'To build good character with Islamic values integration.',
                      'Encourage creativity and prepare students to become responsible and successful citizens.',
                      'Our aim and target: 100% girl student free education.',
                    ].map((text, i) => (
                      <li key={i} className="flex items-start gap-2 xs:gap-3">
                        <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full mt-1.5 xs:mt-2 shrink-0" />
                        <span className="text-emerald-50 text-xs xs:text-sm sm:text-base leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <div className="group h-full bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl xs:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 xs:w-32 sm:w-40 h-28 xs:h-32 sm:h-40 bg-gold-400/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="relative">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-white/15 backdrop-blur-sm rounded-xl xs:rounded-2xl flex items-center justify-center mb-3 xs:mb-4 sm:mb-5">
                    <Eye className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-gold-200" />
                  </div>
                  <h3 className="font-display text-lg xs:text-xl sm:text-2xl font-bold mb-3 xs:mb-4">Our Vision</h3>
                  <p className="text-gold-50 text-xs xs:text-sm sm:text-base leading-relaxed">
                    To become a leading institution that nurtures knowledgeable, confident, and compassionate students
                    who contribute positively to society.
                  </p>
                  <div className="mt-4 xs:mt-5 sm:mt-6 pt-4 xs:pt-5 border-t border-white/20">
                    <p className="text-gold-100 text-[10px] xs:text-xs sm:text-sm italic leading-relaxed">
                      "Knowledge is the light that guides even in the darkest of times — inspired by our founder's vision."
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Key Features Grid */}
          <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
            <AnimatedCard>
              <h3 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 xs:mb-4">
                Key Feature of <span className="text-emerald-600">Haque Academy</span>
              </h3>
              <p className="text-gray-500 text-xs xs:text-sm sm:text-base">Building the foundation of a brighter future</p>
            </AnimatedCard>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
            {features.map((feature, i) => (
              <AnimatedCard key={i} delay={i * 0.08}>
                <div className="group bg-white rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 h-full">
                  <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-emerald-50 group-hover:bg-emerald-100 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center mb-2.5 xs:mb-3 sm:mb-4 transition-colors">
                    <feature.icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 xs:mb-1.5 sm:mb-2 text-xs xs:text-sm sm:text-base">{feature.title}</h4>
                  <p className="text-gray-500 text-[10px] xs:text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
