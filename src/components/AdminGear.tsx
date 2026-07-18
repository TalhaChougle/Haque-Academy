import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Settings, X, LogOut, Pencil, Trash2, Plus, Upload, FileText, Eye, EyeOff } from 'lucide-react';
import { useAdmin } from '../lib/AdminContext';
import {
  fetchNotices,
  addNotice,
  updateNotice,
  deleteNotice,
  uploadNoticeFile,
  notifyNoticesChanged,
  type Notice,
} from '../lib/dataStore';

function LoginModal({ onClose }: { onClose: () => void }) {
  const { login } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const err = await login(email, password);
    setSubmitting(false);
    if (err) {
      setError(err);
    } else {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl xs:rounded-3xl p-5 xs:p-6 sm:p-8 w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg xs:text-xl font-bold text-gray-900">Admin Login</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 min-w-[36px] min-h-[36px] flex items-center justify-center">
            <X className="w-4 h-4 xs:w-5 xs:h-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Username</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm min-h-[44px]"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm min-h-[44px]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none flex items-center justify-center min-w-[36px] min-h-[36px]"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 xs:w-5 xs:h-5 text-gray-500" />
                ) : (
                  <Eye className="w-4 h-4 xs:w-5 xs:h-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-semibold rounded-xl disabled:opacity-60 min-h-[44px]"
          >
            {submitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function NoticeForm({
  editing,
  onDone,
}: {
  editing: Notice | null;
  onDone: () => void;
}) {
  const [heading, setHeading] = useState(editing?.heading ?? '');
  const [date, setDate] = useState(editing?.date ?? new Date().toISOString().slice(0, 10));
  const [desc, setDesc] = useState(editing?.desc ?? '');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let fileUrl = editing?.fileUrl;
    let fileName = editing?.fileName;
    if (file) {
      const uploaded = await uploadNoticeFile(file);
      if (uploaded) {
        fileUrl = uploaded.url;
        fileName = uploaded.name;
      }
    }

    if (editing) {
      await updateNotice(editing.id, { heading, date, desc, fileUrl, fileName });
    } else {
      await addNotice({ heading, date, desc, fileUrl, fileName });
    }
    setSaving(false);
    notifyNoticesChanged();
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-gray-50 rounded-xl xs:rounded-2xl p-3 xs:p-4 border border-gray-200">
      <input
        type="text"
        required
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        placeholder="Notice heading"
        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <input
        type="date"
        required
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <textarea
        required
        rows={3}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
      />
      <label className="flex items-center gap-2 px-3 py-2 bg-white border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 cursor-pointer hover:border-emerald-400">
        <Upload className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">{file ? file.name : editing?.fileName || 'Upload PDF / JPG / PNG (optional)'}</span>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg disabled:opacity-60 min-h-[36px]"
        >
          {saving ? 'Saving…' : editing ? 'Update Notice' : 'Add Notice'}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg min-h-[36px]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function NoticesManager({ onClose }: { onClose: () => void }) {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Notice | null>(null);

  const load = async () => {
    setLoading(true);
    setNotices(await fetchNotices());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this notice?')) return;
    await deleteNotice(id);
    notifyNoticesChanged();
    load();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-3 xs:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl xs:rounded-3xl p-4 xs:p-6 w-full max-w-lg shadow-2xl max-h-[85dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 xs:mb-5">
          <h3 className="font-display text-lg xs:text-xl font-bold text-gray-900">Manage Notices</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 min-w-[36px] min-h-[36px] flex items-center justify-center">
            <X className="w-4 h-4 xs:w-5 xs:h-5 text-gray-500" />
          </button>
        </div>

        {!showForm && (
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 mb-4 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-xl border border-dashed border-emerald-300 hover:bg-emerald-100 min-h-[44px]"
          >
            <Plus className="w-4 h-4" /> Add Notice
          </button>
        )}

        {showForm && (
          <div className="mb-4">
            <NoticeForm
              editing={editing}
              onDone={() => {
                setShowForm(false);
                setEditing(null);
                load();
              }}
            />
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-400 text-center py-6">Loading…</p>
        ) : notices.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No notices yet.</p>
        ) : (
          <div className="space-y-2">
            {notices.map((n) => (
              <div key={n.id} className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">{n.heading}</p>
                  <p className="text-[11px] text-gray-400">{n.date}</p>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{n.desc}</p>
                  {n.fileName && (
                    <a
                      href={n.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] text-emerald-600 mt-1 hover:underline"
                    >
                      <FileText className="w-3 h-3" /> {n.fileName}
                    </a>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      setEditing(n);
                      setShowForm(true);
                    }}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 min-w-[32px] min-h-[32px] flex items-center justify-center"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-100 hover:text-red-600 min-w-[32px] min-h-[32px] flex items-center justify-center"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function AdminGear() {
  const { loggedIn, loading, editMode, setEditMode, logout } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showNotices, setShowNotices] = useState(false);

  if (loading) return null;

  const handleGearClick = () => {
    if (!loggedIn) {
      setShowLogin(true);
    } else {
      setMenuOpen((v) => !v);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 xs:bottom-6 xs:right-6 z-[150]">
        <AnimatePresence>
          {menuOpen && loggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-14 xs:bottom-16 right-0 bg-gray-900 rounded-xl xs:rounded-2xl shadow-2xl p-2 w-52 xs:w-56"
            >
              <button
                onClick={() => {
                  setEditMode(!editMode);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-xs xs:text-sm text-white hover:bg-white/10 min-h-[40px]"
              >
                <Pencil className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-amber-400" />
                Website Edit Mode: {editMode ? 'On' : 'Off'}
              </button>
              <button
                onClick={() => {
                  setShowNotices(true);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-xs xs:text-sm text-white hover:bg-white/10 min-h-[40px]"
              >
                <FileText className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-emerald-400" />
                Manage Notices
              </button>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-xs xs:text-sm text-white hover:bg-white/10 min-h-[40px]"
              >
                <LogOut className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-red-400" />
                Log Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleGearClick}
          className={`w-11 h-11 xs:w-12 xs:h-12 rounded-full bg-gray-900 shadow-xl flex items-center justify-center hover:bg-gray-800 transition-colors ${
            editMode ? 'ring-2 ring-amber-400' : ''
          }`}
          aria-label="Admin settings"
        >
          <Settings className={`w-5 h-5 xs:w-6 xs:h-6 text-amber-400 ${editMode ? 'animate-spin-slow' : ''}`} />
        </button>
      </div>

      <AnimatePresence>{showLogin && <LoginModal onClose={() => setShowLogin(false)} />}</AnimatePresence>
      <AnimatePresence>{showNotices && <NoticesManager onClose={() => setShowNotices(false)} />}</AnimatePresence>
    </>
  );
}