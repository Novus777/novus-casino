import { supabaseServer } from "@/app/lib/supabase-server";

export function getVipName(level: number) {
  if (level >= 100) return "Whale";
  if (level >= 50) return "Diamond";
  if (level >= 20) return "Gold";
  if (level >= 5) return "Silver";
  return "Starter";
}

export function getVipGradient(level: number) {
  if (level >= 100) return "from-purple-500 to-pink-500";
  if (level >= 50) return "from-blue-500 to-cyan-500";
  if (level >= 20) return "from-yellow-400 to-orange-500";
  if (level >= 5) return "from-gray-400 to-gray-600";
  return "from-zinc-700 to-zinc-900";
}

export async function updateVipLevel(userId: string, xp: number) {
  const supabase = await supabaseServer();

  const vipLevel =
    xp >= 100 ? 100 :
    xp >= 50 ? 50 :
    xp >= 20 ? 20 :
    xp >= 5 ? 5 : 0;

  await supabase
    .from("profiles")
    .update({ vip_level: vipLevel })
    .eq("id", userId);

  return vipLevel;
}
