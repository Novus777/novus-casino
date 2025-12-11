import { supabaseServer } from "./supabase-server";

export async function updateVipLevel(userId: string, newLevel?: number) {
  const supabase = supabaseServer();

  // Fetch profile values
  const { data: profile } = await supabase
    .from("profiles")
    .select("xp, vip_level")
    .eq("id", userId)
    .single();

  const currentXP = profile?.xp ?? 0;
  const currentLevel = profile?.vip_level ?? 1;

  // If API manually passes a new level → use it
  if (typeof newLevel === "number") {
    await supabase.from("profiles").update({ vip_level: newLevel }).eq("id", userId);
    return newLevel;
  }

  // XP thresholds
  const thresholds = [0, 100, 500, 1500, 3000, 6000, 10000];

  let calculated = currentLevel;

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (currentXP >= thresholds[i]) {
      calculated = i + 1;
      break;
    }
  }

  if (calculated !== currentLevel) {
    await supabase
      .from("profiles")
      .update({ vip_level: calculated })
      .eq("id", userId);
  }

  return calculated;
}
