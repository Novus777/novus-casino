import { supabaseServer } from "@/lib/supabase-server";

export async function getDashboardData() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("phi, xp, vip_level")
    .eq("id", user.id)
    .single();

  return {
    user,
    profile: {
      phi: profile?.phi ?? 0,
      xp: profile?.xp ?? 0,
      vip: profile?.vip_level ?? 1,
    },
  };
}
