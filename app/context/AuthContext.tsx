"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { getProfile } from "@/app/lib/profile";

const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load session + profile
  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getSession();
      const authedUser = data.session?.user ?? null;

      setUser(authedUser);

      if (authedUser) {
        const userProfile = await getProfile(authedUser.id);
        setProfile(userProfile);
      }

      setLoading(false);
    }

    load();

    // Listen for auth changes
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

    return () => listener.subscription.unsubscribe();
  }, []);

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
};

// 🔥 These hooks now return ONLY the value you want:

export const useUser = () => {
  return useContext(AuthContext).user;
};

export const useProfile = () => {
  return useContext(AuthContext).profile;
};

export const useRefreshProfile = () => {
  return useContext(AuthContext).refreshProfile;
};
