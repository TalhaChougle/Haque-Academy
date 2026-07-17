import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from './useInView';
import { useAdmin } from '../lib/AdminContext';
import {
  fetchAnnualEvents,
  addAnnualEvent,
  updateAnnualEvent,
  deleteAnnualEvent,
  onEventsChanged,
  type AnnualEvent
} from '../lib/dataStore';
import {
  BookOpen,
  Award,
  GraduationCap,
  Mic,
  FlaskConical,
  Flag,
  Calendar,
  Moon,
  Trophy,
  Music,
  Sparkles,
  Users,
  Pencil,
  Trash2,
  Plus,
  X
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  FlaskConical,
  Flag,
  Calendar,
  Moon,
  GraduationCap,
  Award,
  Trophy,
  Music,
  BookOpen,
  Sparkles,
  Users,
  Mic
};

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

const suggestIcon = (eventName: string): string => {
  const nameLower = eventName.toLowerCase();
  if (nameLower.includes('science') || nameLower.includes('exhibition') || nameLower.includes('lab') || nameLower.includes('fair') || nameLower.includes('project') || nameLower.includes('math') || nameLower.includes('tech') || nameLower.includes('physics') || nameLower.includes('chemistry') || nameLower.includes('biology')) return 'FlaskConical';
  if (nameLower.includes('independence') || nameLower.includes('republic') || nameLower.includes('flag') || nameLower.includes('aug') || nameLower.includes('jan') || nameLower.includes('national')) return 'Flag';
  if (nameLower.includes('ramazan') || nameLower.includes('iftaar') || nameLower.includes('eid') || nameLower.includes('islamic') || nameLower.includes('moon') || nameLower.includes('fasting') || nameLower.includes('prayer') || nameLower.includes('deen') || nameLower.includes('hajj')) return 'Moon';
  if (nameLower.includes('graduation') || nameLower.includes('convocation') || nameLower.includes('cap') || nameLower.includes('degree') || nameLower.includes('farewell')) return 'GraduationCap';
  if (nameLower.includes('award') || nameLower.includes('prize') || nameLower.includes('merit') || nameLower.includes('scholarship') || nameLower.includes('rank') || nameLower.includes('felicitation') || nameLower.includes('medal')) return 'Award';
  if (nameLower.includes('sports') || nameLower.includes('trophy') || nameLower.includes('winner') || nameLower.includes('champion') || nameLower.includes('tournament') || nameLower.includes('game') || nameLower.includes('run') || nameLower.includes('cricket') || nameLower.includes('football') || nameLower.includes('race') || nameLower.includes('athletics')) return 'Trophy';
  if (nameLower.includes('music') || nameLower.includes('song') || nameLower.includes('dance') || nameLower.includes('cultural') || nameLower.includes('singing') || nameLower.includes('performance') || nameLower.includes('art') || nameLower.includes('drama') || nameLower.includes('theatre') || nameLower.includes('play')) return 'Music';
  if (nameLower.includes('book') || nameLower.includes('library') || nameLower.includes('study') || nameLower.includes('reading') || nameLower.includes('syllabus') || nameLower.includes('education') || nameLower.includes('class') || nameLower.includes('exam') || nameLower.includes('test') || nameLower.includes('write')) return 'BookOpen';
  if (nameLower.includes('celebration') || nameLower.includes('sparkles') || nameLower.includes('festival') || nameLower.includes('annual') || nameLower.includes('party') || nameLower.includes('gathering') || nameLower.includes('carnival') || nameLower.includes('fest')) return 'Sparkles';
  if (nameLower.includes('parent') || nameLower.includes('meeting') || nameLower.includes('reunion') || nameLower.includes('community') || nameLower.includes('users') || nameLower.includes('staff') || nameLower.includes('teacher') || nameLower.includes('alumni') || nameLower.includes('kids') || nameLower.includes('children')) return 'Users';
  if (nameLower.includes('speech') || nameLower.includes('mic') || nameLower.includes('microphone') || nameLower.includes('debate') || nameLower.includes('talk') || nameLower.includes('anchoring') || nameLower.includes('elocution') || nameLower.includes('sing') || nameLower.includes('announcement')) return 'Mic';
  if (nameLower.includes('foundation') || nameLower.includes('day') || nameLower.includes('calendar') || nameLower.includes('birthday') || nameLower.includes('date') || nameLower.includes('history')) return 'Calendar';
  return 'Calendar'; // default fallback
};

function EventForm({
  editing,
  onDone,
}: {
  editing: AnnualEvent | null;
  onDone: () => void;
}) {
  const [name, setName] = useState(editing?.name ?? '');
  const [iconName, setIconName] = useState(editing?.icon_name ?? 'Calendar');
  const [isIconManuallySet, setIsIconManuallySet] = useState(!!editing);
  const [colorClass, setColorClass] = useState(editing?.color ?? 'bg-blue-50 text-blue-600');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (newName: string) => {
    setName(newName);
    if (!isIconManuallySet) {
      const suggested = suggestIcon(newName);
      setIconName(suggested);
    }
  };

  const colors = [
    { name: 'Blue', class: 'bg-blue-50 text-blue-600' },
    { name: 'Orange', class: 'bg-orange-50 text-orange-600' },
    { name: 'Green', class: 'bg-green-50 text-green-600' },
    { name: 'Purple', class: 'bg-purple-50 text-purple-600' },
    { name: 'Emerald', class: 'bg-emerald-50 text-emerald-600' },
    { name: 'Pink', class: 'bg-pink-50 text-pink-600' },
    { name: 'Amber', class: 'bg-amber-50 text-amber-600' },
    { name: 'Red', class: 'bg-red-50 text-red-600' },
    { name: 'Indigo', class: 'bg-indigo-50 text-indigo-600' },
  ];

  const icons = Object.keys(ICON_MAP);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    setError(null);

    const payload = {
      name: name.trim(),
      icon_name: iconName,
      color: colorClass,
    };

    if (editing) {
      const ok = await updateAnnualEvent(editing.id, payload);
      if (!ok) {
        setSaving(false);
        setError('Failed to update event.');
        return;
      }
    } else {
      const { error: err } = await addAnnualEvent(payload);
      if (err) {
        setSaving(false);
        setError(`Failed to add event: ${err}`);
        return;
      }
    }

    setSaving(false);
    onDone();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
      onClick={onDone}
    >
      <motion.form
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl xs:rounded-3xl p-5 xs:p-6 w-full max-w-sm shadow-2xl space-y-4"
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-lg font-bold text-gray-900">{editing ? 'Edit Event' : 'Add Event'}</h3>
          <button type="button" onClick={onDone} className="p-1.5 rounded-lg hover:bg-gray-100 min-w-[36px] min-h-[36px] flex items-center justify-center">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] xs:text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g. Sports Day"
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] xs:text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Icon</label>
            {!isIconManuallySet && name.trim() && (
              <span className="text-[9px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Suggested logo selected
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 border border-gray-200 rounded-xl">
            {icons.map((ico) => {
              const IconComponent = ICON_MAP[ico] || Calendar;
              const isSelected = iconName === ico;
              const suggested = suggestIcon(name);
              const isSuggested = name.trim() && suggested === ico;
              return (
                <button
                  key={ico}
                  type="button"
                  onClick={() => {
                    setIconName(ico);
                    setIsIconManuallySet(true);
                  }}
                  className={`relative p-2 rounded-lg flex flex-col items-center justify-center gap-1 border text-center transition-all cursor-pointer min-h-[56px] ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 text-emerald-700 font-semibold ring-2 ring-emerald-500/20 shadow-sm'
                      : 'border-gray-100 bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-[8px] truncate max-w-full leading-none mt-0.5">{ico}</span>
                  {isSuggested && (
                    <span className="absolute -top-1 -right-1 px-1 py-0.5 bg-amber-500 text-[7px] text-white font-bold rounded-full scale-75 origin-top-right">
                      Auto
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] xs:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Color Style</label>
          <div className="grid grid-cols-3 gap-2">
            {colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColorClass(c.class)}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition-all ${
                  colorClass === c.class
                    ? 'border-emerald-600 ring-2 ring-emerald-500/20 font-semibold'
                    : 'border-gray-200 hover:bg-gray-50'
                } ${c.class}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
        
        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-semibold rounded-xl disabled:opacity-60 min-h-[44px] cursor-pointer"
        >
          {saving ? 'Saving…' : editing ? 'Update Event' : 'Add Event'}
        </button>
      </motion.form>
    </motion.div>
  );
}

export default function ActivitiesSection() {
  const { loggedIn, editMode } = useAdmin();
  const { ref: titleRef, inView: titleInView } = useInView(0.2);

  const [events, setEvents] = useState<AnnualEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AnnualEvent | null>(null);

  const loadEvents = async () => {
    setLoadingEvents(true);
    setEvents(await fetchAnnualEvents());
    setLoadingEvents(false);
  };

  useEffect(() => {
    loadEvents();
    // Subscribe to changes
    const unsubscribe = onEventsChanged(() => {
      loadEvents();
    });
    return unsubscribe;
  }, []);

  const programs = [
    {
      icon: BookOpen,
      title: 'Affordable Education',
      desc: 'Providing quality education in rural area since 30 years. Pre-primary to secondary standard.',
      details: ['Up to 8th class: Semi-English, CBSE syllabus', '9th & 10th class: Bihar Board syllabus'],
      color: 'emerald',
    },
    {
      icon: Award,
      title: 'Scholarship Program',
      desc: 'Supporting 25 to 30% students their fees annually through Haque Foundation.',
      details: ['Full or half fee exemption', 'Most girl students benefited'],
      color: 'gold',
    },
    {
      icon: Mic,
      title: 'Motivational Programs',
      desc: 'Education and motivational programs for 9th and 10th class students.',
      details: ['Career guidance sessions', 'Personality development workshops'],
      color: 'emerald',
    },
  ];

  return (
    <section id="activities" className="bg-sage-50 relative overflow-hidden">
      {/* Decorative shapes — desktop only */}
      <div className="hidden sm:block absolute top-20 left-10 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-20 right-10 w-72 h-72 bg-gold-100/50 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 md:py-24 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-8 xs:mb-10 sm:mb-14 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 xs:px-4 py-1 xs:py-1.5 bg-emerald-100 text-emerald-700 text-[10px] xs:text-xs font-semibold tracking-widest uppercase rounded-full mb-3 xs:mb-4"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 xs:mb-4"
          >
            Activities & <span className="text-emerald-600">Programs</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={titleInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-emerald-500 to-gold-400 mx-auto rounded-full"
          />
        </div>

        {/* Programs Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8 mb-10 xs:mb-12 sm:mb-16 md:mb-20">
          {programs.map((program, i) => (
            <AnimatedCard key={i} delay={i * 0.12}>
              <div className="group h-full bg-white rounded-2xl xs:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 border border-gray-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 relative overflow-hidden">
                {/* Hover gradient — desktop only */}
                <div className={`hidden sm:block absolute inset-0 bg-gradient-to-br ${
                  program.color === 'gold' ? 'from-gold-50/0 to-gold-50/50' : 'from-emerald-50/0 to-emerald-50/50'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  <div className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-xl xs:rounded-2xl flex items-center justify-center mb-3 xs:mb-4 sm:mb-5 ${
                    program.color === 'gold' ? 'bg-gold-100 text-gold-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    <program.icon className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" />
                  </div>

                  <h3 className="font-display text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3">{program.title}</h3>
                  <p className="text-gray-600 text-xs xs:text-sm leading-relaxed mb-3 xs:mb-4">{program.desc}</p>

                  <div className="space-y-1.5 xs:space-y-2">
                    {program.details.map((detail, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1 xs:mt-1.5 shrink-0 ${
                          program.color === 'gold' ? 'bg-gold-500' : 'bg-emerald-500'
                        }`} />
                        <span className="text-gray-500 text-[11px] xs:text-xs sm:text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Events Grid */}
        <AnimatedCard>
          <div className="text-center mb-6 xs:mb-8 sm:mb-10">
            <h3 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 xs:mb-4">
              Annual <span className="text-emerald-600">Events</span>
            </h3>
            <p className="text-gray-500 text-xs xs:text-sm">Celebrations that shape our school culture</p>
          </div>
        </AnimatedCard>

        {loadingEvents ? (
          <p className="text-center text-gray-400 text-sm py-8">Loading events…</p>
        ) : (
          <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-6 gap-2.5 xs:gap-3 sm:gap-4">
            {events.map((event, i) => {
              const IconComponent = ICON_MAP[event.icon_name] || Calendar;
              return (
                <AnimatedCard key={event.id} delay={i * 0.06}>
                  <div className="group relative bg-white rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-5 text-center border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center min-h-[120px]">
                    <div className={`w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-lg xs:rounded-xl flex items-center justify-center mx-auto mb-2 xs:mb-3 ${event.color}`}>
                      <IconComponent className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5" />
                    </div>
                    <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-700 leading-tight">{event.name}</p>

                    {/* Edit-mode controls */}
                    {loggedIn && editMode && (
                      <div className="absolute top-1.5 right-1.5 flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingEvent(event);
                            setShowEventForm(true);
                          }}
                          className="w-6.5 h-6.5 rounded-full bg-white shadow border border-gray-100 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-700 hover:scale-105 active:scale-95 transition-transform"
                        >
                          <Pencil className="w-3 h-3 text-gray-600" />
                        </button>
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (confirm(`Delete the event "${event.name}"?`)) {
                              await deleteAnnualEvent(event.id);
                              loadEvents();
                            }
                          }}
                          className="w-6.5 h-6.5 rounded-full bg-white shadow border border-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-600 hover:scale-105 active:scale-95 transition-transform"
                        >
                          <Trash2 className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    )}
                  </div>
                </AnimatedCard>
              );
            })}

            {/* Add Event card */}
            {loggedIn && editMode && (
              <AnimatedCard delay={events.length * 0.06}>
                <button
                  onClick={() => {
                    setEditingEvent(null);
                    setShowEventForm(true);
                  }}
                  className="w-full h-full min-h-[120px] rounded-xl xs:rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 flex flex-col items-center justify-center gap-1.5 text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-6 h-6" />
                  <span className="text-xs font-semibold">Add Event</span>
                </button>
              </AnimatedCard>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showEventForm && (
          <EventForm
            editing={editingEvent}
            onDone={() => {
              setShowEventForm(false);
              setEditingEvent(null);
              loadEvents();
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
