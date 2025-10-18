import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, type Profile } from '@/lib/supabaseClient';

interface AuthContextType {
  user: Profile | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const loaded = await loadProfile(session.user.id);
          if (!loaded) {
            // Fallback to minimal session user so app can proceed
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata?.full_name || session.user.email || 'User',
              role: 'citizen',
              points: 0,
              department_id: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    init();

    // Safety: ensure loading never hangs more than 3s
    const safety = setTimeout(() => setIsLoading(false), 3000);

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        // Set minimal user immediately to unblock UI
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata?.full_name || session.user.email || 'User',
          role: 'citizen',
          points: 0,
          department_id: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        // Enrich in background
        loadProfile(session.user.id).catch(() => {});
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      clearTimeout(safety);
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loadProfile = async (userId: string) => {
    // Race the profile fetch with a short timeout to avoid UI hangs
    const profilePromise = supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    const timeout = new Promise<{ data: any; error: any }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: new Error('timeout') }), 2000)
    );

    const { data, error } = await Promise.race([profilePromise, timeout]);
    if (error) {
      return false;
    }
    if (data) {
      setUser(data as Profile);
      return true;
    }
    return false;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return false;
      }
      if (data.user) {
        // Immediately set minimal user and clear loading
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          full_name: data.user.user_metadata?.full_name || data.user.email || 'User',
          role: 'citizen',
          points: 0,
          department_id: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        setIsLoading(false);
        // Enrich in background
        loadProfile(data.user.id).catch(() => {});
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      // Ensure loading is not stuck in any case
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};