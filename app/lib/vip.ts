import { supabaseServer } from "./supabase-server";

export function getVipName(level: number) {
  const names = [
    "Starter",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Whale",
  ];
  return names[level - 1] ?? "Starter";
}

export function getVipGradient(level: number) {
  const gradients = [
    "from-gray-400 to-gray-600",
    "from-orange-400 to-orange-600",
    "from-slate-300 to-slate-500",
    "from-yellow-400 to-yellow-600",
    "from-purple-400 to-purple-600",
    "from-cyan-400 to-blue-500",
    "from-pink-500 to-red-600",
  ];
  return gradients[level - 1] ?? gradients[0];
}

export async function updateVipLevel(userId: string) {
  const supabase = supabaseServer();

  const { data: profile } = await supabase
    .from("profiles")
    .select("xp, vip_level")
    .eq("id", userId)
    .single();

  if (!profile) return;

  const thresholds = [0, 100, 500, 1500, 3000, 6000, 10000];
  let newLevel = profile.vip_level;

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (profile.xp >= thresholds[i]) {
      newLevel = i + 1;
      break;
    }
  }

  if (newLevel !== profile.vip_level) {
    await supabase
      .from("profiles")
      .update({ vip_level: newLevel })
      .eq("id", userId);
  }
}
