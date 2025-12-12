"use server";

import { supabaseServer } from "@/app/lib/supabase-server";
import { updateVipLevel } from "@/app/lib/vip";

export async function claimDailyReward(userId: string) {
  const supabase = await supabaseServer();

  const { data: user } = await supabase
    .from("users")
    .select("xp, vip_level")
    .eq("id", userId)
    .single();

  const newXp = (user?.xp || 0) + 10;
  const newVip = updateVipLevel(newXp, user?.vip_level || 0);

  await supabase
    .from("users")
    .update({ xp: newXp, vip_level: newVip })
    .eq("id", userId);

  return { xp: newXp, vip: newVip };
}
