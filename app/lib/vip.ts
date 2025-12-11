import { supabaseServer } from "./supabase-server";

export async function updateVipLevel(userId: string) {
  const supabase = supabaseServer();

  // Fetch XP + current VIP
  const { data: profile } = await supabase
    .from("profiles")
    .select("xp, vip_level")
    .eq("id", userId)
    .single();

  const currentXP = profile?.xp ?? 0;
  const currentLevel = profile?.vip_level ?? 1;

  // XP thresholds
  const thresholds = [0, 100, 500, 1500, 3000, 6000, 10000];

  let newLevel = currentLevel;

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (currentXP >= thresholds[i]) {
      newLevel = i + 1;
      break;
    }
  }

  // Only update DB if level changed
  if (newLevel !== currentLevel) {
    await supabase
      .from("profiles")
      .update({ vip_level: newLevel })
      .eq("id", userId);
  }

  return newLevel;
}
