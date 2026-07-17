import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from './useInView';
import { X, ZoomIn, Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { useAdmin } from '../lib/AdminContext';
import {
  fetchGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  uploadGalleryImage,
  type GalleryItem,
} from '../lib/dataStore';

const DEFAULT_CATEGORIES = ['Sports', 'Education', 'Events', 'Trips'];
const CATEGORIES_LOCAL_KEY = 'haque:gallery_categories';

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

function AddSectionForm({
  onDone,
}: {
  onDone: (newSection?: string) => void;
}) {
  const [name, setName] = useState('');
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
      onClick={() => onDone()}
    >
      <motion.form
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) {
            onDone(name.trim());
          }
        }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-5 xs:p-6 w-full max-w-sm shadow-2xl space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-gray-900">Add New Section</h3>
          <button type="button" onClick={() => onDone()} className="p-1.5 rounded-lg hover:bg-gray-100 min-w-[36px] min-h-[36px] flex items-center justify-center">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="space-y-1">
          <label className="block text-[10px] xs:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Section Name</label>
          <input
            type="text"
            required
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Science Fair"
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-semibold rounded-xl min-h-[44px]"
        >
          Create Section
        </button>
      </motion.form>
    </motion.div>
  );
}

function GalleryItemForm({
  editing,
  categories,
  onDone,
}: {
  editing: GalleryItem | null;
  categories: string[];
  onDone: (newCategoryRegistered?: string) => void;
}) {
  const [title, setTitle] = useState(editing?.title ?? '');
  const [category, setCategory] = useState(editing?.category ?? categories[0]);
  const [newCategory, setNewCategory] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const finalCategory = isCreatingNew ? newCategory.trim() : category;
    if (!finalCategory) {
      setSaving(false);
      setError('Please select or enter a category.');
      return;
    }

    let src = editing?.src;
    if (file) {
      const { url, error: uploadErr } = await uploadGalleryImage(file);
      if (uploadErr) {
        setSaving(false);
        setError(`Upload failed: ${uploadErr}`);
        return;
      }
      if (url) src = url;
    }
    if (!src) {
      setSaving(false);
      setError('Please choose a photo to upload.');
      return;
    }

    if (editing) {
      const ok = await updateGalleryItem(editing.id, { title, category: finalCategory, src });
      if (!ok) {
        setSaving(false);
        setError('Failed to update photo. Check the browser console for details.');
        return;
      }
    } else {
      const { error: insertErr } = await addGalleryItem({ title, category: finalCategory, src });
      if (insertErr) {
        setSaving(false);
        setError(`Save failed: ${insertErr}`);
        return;
      }
    }
    setSaving(false);
    onDone(isCreatingNew ? finalCategory : undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
      onClick={() => onDone()}
    >
      <motion.form
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl xs:rounded-3xl p-5 xs:p-6 w-full max-w-sm shadow-2xl space-y-3 xs:space-y-4"
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-lg font-bold text-gray-900">{editing ? 'Edit Photo' : 'Add Photo'}</h3>
          <button type="button" onClick={() => onDone()} className="p-1.5 rounded-lg hover:bg-gray-100 min-w-[36px] min-h-[36px] flex items-center justify-center">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
        />
        
        <div className="space-y-1">
          <label className="block text-[10px] xs:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Section (Category)</label>
          <select
            value={isCreatingNew ? "__new__" : category}
            onChange={(e) => {
              if (e.target.value === "__new__") {
                setIsCreatingNew(true);
              } else {
                setIsCreatingNew(false);
                setCategory(e.target.value);
              }
            }}
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option value="__new__">+ Create New Section...</option>
          </select>
        </div>

        {isCreatingNew && (
          <div className="space-y-1">
            <label className="block text-[10px] xs:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">New Section Name</label>
            <input
              type="text"
              required
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. Annual Sports"
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>
        )}

        <label className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 cursor-pointer hover:border-emerald-400 min-h-[44px]">
          <Upload className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{file ? file.name : editing ? 'Replace photo (optional)' : 'Upload photo'}</span>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            required={!editing}
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-semibold rounded-xl disabled:opacity-60 min-h-[44px]"
        >
          {saving ? 'Saving…' : editing ? 'Update Photo' : 'Add Photo'}
        </button>
      </motion.form>
    </motion.div>
  );
}


export default function GallerySection() {
  const { loggedIn, editMode } = useAdmin();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [customCategories, setCustomCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem(CATEGORIES_LOCAL_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });
  const { ref: titleRef, inView: titleInView } = useInView(0.2);

  const loadItems = async () => {
    setLoadingItems(true);
    setGalleryItems(await fetchGalleryItems());
    setLoadingItems(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Update categories dynamically based on fetched items
  useEffect(() => {
    if (galleryItems.length > 0) {
      const dbCategories = Array.from(new Set(galleryItems.map((item) => item.category)));
      setCustomCategories((prev) => {
        const merged = Array.from(new Set([...prev, ...dbCategories]));
        localStorage.setItem(CATEGORIES_LOCAL_KEY, JSON.stringify(merged));
        return merged;
      });
    }
  }, [galleryItems]);

  const registerCategory = (cat: string) => {
    const trimmed = cat.trim();
    if (!trimmed) return;
    setCustomCategories((prev) => {
      if (prev.includes(trimmed)) return prev;
      const next = [...prev, trimmed];
      localStorage.setItem(CATEGORIES_LOCAL_KEY, JSON.stringify(next));
      return next;
    });
  };

  const deleteCategory = (cat: string) => {
    const trimmed = cat.trim();
    if (!trimmed) return;
    setCustomCategories((prev) => {
      const next = prev.filter((c) => c !== trimmed);
      localStorage.setItem(CATEGORIES_LOCAL_KEY, JSON.stringify(next));
      return next;
    });
    if (filter === trimmed) {
      setFilter('All');
    }
  };

  const categories = ['All', ...customCategories];
  const filtered = filter === 'All' ? galleryItems : galleryItems.filter((item) => item.category === filter);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    await deleteGalleryItem(id);
    loadItems();
  };

  return (
    <section id="gallery" className="bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 md:py-24">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-8 xs:mb-10 sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 xs:px-4 py-1 xs:py-1.5 bg-emerald-50 text-emerald-700 text-[10px] xs:text-xs font-semibold tracking-widest uppercase rounded-full mb-3 xs:mb-4"
          >
            Our Moments
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 xs:mb-4"
          >
            Photo <span className="text-emerald-600">Gallery</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={titleInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-emerald-500 to-gold-400 mx-auto rounded-full mb-5 xs:mb-6 sm:mb-8"
          />

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-1.5 xs:gap-2"
          >
            {categories.map((cat) => {
              const isCustom = !DEFAULT_CATEGORIES.includes(cat) && cat !== 'All';
              const isEmpty = !galleryItems.some((item) => item.category === cat);
              return (
                <div key={cat} className="relative group/tab">
                  <button
                    onClick={() => setFilter(cat)}
                    className={`px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium transition-all duration-300 min-h-[36px] xs:min-h-[40px] flex items-center justify-center gap-1.5 ${
                      filter === cat
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
                    } ${loggedIn && editMode && isCustom ? 'pr-8' : ''}`}
                  >
                    {cat}
                  </button>
                  {loggedIn && editMode && isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isEmpty) {
                          if (confirm(`Delete the section "${cat}"?`)) {
                            deleteCategory(cat);
                          }
                        } else {
                          alert(`Cannot delete section "${cat}" because it contains photos. Please delete all photos in this section first.`);
                        }
                      }}
                      title={isEmpty ? "Delete Section" : "Cannot delete (contains photos)"}
                      className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        filter === cat
                          ? 'text-white/70 hover:text-white hover:bg-white/20'
                          : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              );
            })}
            {loggedIn && editMode && (
              <button
                onClick={() => setShowAddSectionModal(true)}
                className="px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-semibold border-2 border-dashed border-emerald-500 text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 transition-colors min-h-[36px] xs:min-h-[40px] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                New Section
              </button>
            )}
          </motion.div>
        </div>

        {/* Gallery Grid */}
        {loadingItems ? (
          <p className="text-center text-gray-400 text-sm py-10">Loading gallery…</p>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
            {filtered.length === 0 && (
              <div className="col-span-full py-12 text-center bg-gray-50/50 rounded-2xl border border-gray-100">
                <p className="text-gray-400 text-sm">No photos in this section yet.</p>
              </div>
            )}
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <AnimatedCard key={item.id} delay={i * 0.08}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="gallery-item group relative rounded-xl xs:rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] bg-gray-100"
                    onClick={() => !editMode && setSelectedImage(galleryItems.indexOf(item))}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Always-visible label on mobile, hover on desktop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:from-black/70 sm:via-black/20 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-3 xs:p-4 sm:p-5">
                      <div className="sm:transform sm:translate-y-4 sm:group-hover:translate-y-0 transition-transform duration-400">
                        <span className="text-emerald-300 text-[10px] xs:text-xs font-semibold tracking-wider uppercase">{item.category}</span>
                        <h4 className="text-white font-semibold text-sm xs:text-base sm:text-lg mt-0.5 xs:mt-1">{item.title}</h4>
                      </div>
                      {!editMode && (
                        <div className="hidden sm:flex absolute top-4 right-4 w-9 h-9 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Edit-mode controls */}
                    {loggedIn && editMode && (
                      <div className="absolute top-2 right-2 xs:top-3 xs:right-3 flex gap-1.5 xs:gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingItem(item);
                            setShowForm(true);
                          }}
                          className="w-8 h-8 xs:w-9 xs:h-9 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-700 hover:scale-105 active:scale-95 transition-transform"
                        >
                          <Pencil className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          className="w-8 h-8 xs:w-9 xs:h-9 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-50 hover:text-red-600 hover:scale-105 active:scale-95 transition-transform"
                        >
                          <Trash2 className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatedCard>
              ))}
            </AnimatePresence>

            {/* Add Photo tile */}
            {loggedIn && editMode && (
              <AnimatedCard>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowForm(true);
                  }}
                  className="w-full h-full min-h-[160px] aspect-[4/3] rounded-xl xs:rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 flex flex-col items-center justify-center gap-2 text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-7 h-7 xs:w-8 xs:h-8" />
                  <span className="text-xs xs:text-sm font-semibold">Add Photo</span>
                </button>
              </AnimatedCard>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <GalleryItemForm
            editing={editingItem}
            categories={customCategories}
            onDone={(newCategory) => {
              setShowForm(false);
              setEditingItem(null);
              if (newCategory) {
                registerCategory(newCategory);
                setFilter(newCategory);
              }
              loadItems();
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddSectionModal && (
          <AddSectionForm
            onDone={(newSection) => {
              setShowAddSectionModal(false);
              if (newSection) {
                registerCategory(newSection);
                setFilter(newSection);
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-3 xs:p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="relative w-full max-w-4xl"
              style={{ maxHeight: '85dvh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[selectedImage].src}
                alt={galleryItems[selectedImage].title}
                className="w-full h-auto max-h-[75dvh] object-contain rounded-xl xs:rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 xs:p-4 sm:p-5 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl xs:rounded-b-2xl">
                <span className="text-emerald-400 text-[10px] xs:text-xs font-semibold tracking-wider uppercase">{galleryItems[selectedImage].category}</span>
                <h3 className="text-white font-display text-base xs:text-lg sm:text-xl font-bold mt-0.5 xs:mt-1">{galleryItems[selectedImage].title}</h3>
              </div>
              {/* Close button — always safely inside viewport */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:-top-2 sm:-right-2 w-9 h-9 xs:w-10 xs:h-10 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px]"
                aria-label="Close lightbox"
              >
                <X className="w-4 h-4 xs:w-5 xs:h-5 text-gray-800" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}