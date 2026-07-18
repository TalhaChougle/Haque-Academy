import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Simple hardcoded admin login — no real auth provider involved.
// Change these before deploying if you want a different password.
const ADMIN_EMAIL = 'haqueacademy_admin';
const ADMIN_PASSWORD = 'haqueacademy@1996';
const SESSION_KEY = 'haque_admin_logged_in';

interface AdminContextValue {
  loggedIn: boolean;
  loading: boolean;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  login: (email: string, password: string) => Promise<string | null>; // returns error message or null
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem(SESSION_KEY) === 'true');
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, 'true');
      setLoggedIn(true);
      return null;
    }
    return 'Incorrect email or password.';
  };

  const logout = async () => {
    localStorage.removeItem(SESSION_KEY);
    setLoggedIn(false);
    setEditMode(false);
  };

  return (
    <AdminContext.Provider value={{ loggedIn, loading, editMode, setEditMode, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}