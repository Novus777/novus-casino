import { supabaseServer } from "@/lib/supabase-server";

export function getVipName(level: number) {
  if (level >= 100) return "Whale";
  if (level >= 50) return "Elite";
  if (level >= 10) return "Pro";
  return "Rookie";
}

export async function updateVipLevel(userId: string) {
  const supabase = await supabaseServer();

  const { error } = await supabase.rpc("update_vip_level", {
    user_id: userId,
  });

  if (error) throw error;
}
