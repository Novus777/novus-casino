"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabaseBrowser } from "@/app/lib/supabase-browser";

interface Profile {
  id: string;
  username: string | null;
  phi: number;
  xp: number;
  vip_level: number;
}

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  loading: true,
});

export function useProfile() {
  return useContext(ProfileContext);
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = supabaseBrowser();

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile(data);
      }

      setLoading(false);

      // SUBSCRIBE TO PROFILE UPDATES LIVE
      supabase
        .channel("profile-updates")
        .on(
          "postgres_changes",
          {
            schema: "public",
            table: "profiles",
            event: "*",
            filter: `id=eq.${user.id}`,
          },
          (payload) => {
            console.log("LIVE PROFILE UPDATE:", payload);
            if (payload.new) setProfile(payload.new as Profile);
          }
        )
        .subscribe();
    }

    load();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
}
