import { supabaseServer } from "@/lib/supabase-server";

/**
 * Updates VIP level based on XP
 */
export async function updateVipLevel(userId: string, xp: number) {
  let vipLevel = 1;

  if (xp >= 5000) vipLevel = 5;
  else if (xp >= 2500) vipLevel = 4;
  else if (xp >= 1000) vipLevel = 3;
  else if (xp >= 250) vipLevel = 2;

  const supabase = await supabaseServer();

  await supabase
    .from("profiles")
    .update({ vip_level: vipLevel })
    .eq("id", userId);

  return vipLevel;
}
