// app/context/ProfileListener.tsx
"use client";

import { useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { useAuth } from "./AuthContext";

export default function ProfileListener() {
  const { user, refreshProfile } = useAuth();

  useEffect(() => {
    if (!user) return;

    const supabase = supabaseBrowser();

    const channel = supabase
      .channel("profile-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${user.id}`,
        },
        () => {
          void refreshProfile();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, refreshProfile]);

  return null;
}
