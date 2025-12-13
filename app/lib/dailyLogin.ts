import { supabaseServer } from "@/app/lib/supabase-server";

export async function claimDailyLogin(userId: string) {
  const supabase = await supabaseServer();

  // get current profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("phi, xp")
    .eq("id", userId)
    .single();

  const newPhi = (profile?.phi ?? 0) + 25;
  const newXp = (profile?.xp ?? 0) + 10;

  await supabase
    .from("profiles")
    .update({
      phi: newPhi,
      xp: newXp,
    })
    .eq("id", userId);

  return {
    phi: newPhi,
    xp: newXp,
  };
}
