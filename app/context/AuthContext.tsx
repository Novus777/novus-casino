"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabaseBrowser } from "@/app/lib/supabase-browser";
import { getProfile } from "@/app/lib/profile";

type AuthContextValue = {
  user: any;
  profile: any;
  loading: boolean;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = supabaseBrowser();

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const { data } = await supabase.auth.getSession();
      const authedUser = data.session?.user ?? null;

      if (!mounted) return;

      setUser(authedUser);

      if (authedUser) {
        const userProfile = await getProfile(authedUser.id);
        if (!mounted) return;
        setProfile(userProfile);
      } else {
        setProfile(null);
      }

      setLoading(false);
    }

    load();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const authedUser = session?.user ?? null;
        setUser(authedUser);

        if (authedUser) {
          const userProfile = await getProfile(authedUser.id);
          setProfile(userProfile);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const refreshProfile = async () => {
    if (!user) return;
    const updated = await getProfile(user.id);
    setProfile(updated);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const useUser = () => useContext(AuthContext).user;
export const useProfile = () => useContext(AuthContext).profile;
export const useRefreshProfile = () => useContext(AuthContext).refreshProfile;
