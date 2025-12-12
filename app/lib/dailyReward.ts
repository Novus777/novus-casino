import { supabaseServer } from "@/app/lib/supabase-server";
import { updateVipLevel } from "@/app/lib/vip";

export async function claimDailyReward(userId: string) {
  const supabase = await supabaseServer();

  // get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("xp")
    .eq("id", userId)
    .single();

  const newXp = (profile?.xp || 0) + 10;

  await supabase
    .from("profiles")
    .update({ xp: newXp })
    .eq("id", userId);

  await updateVipLevel(userId, newXp);

  return { xp: newXp };
}
