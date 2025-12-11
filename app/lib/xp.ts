"use server";

import { supabaseServer } from "./supabase-server";
import { updateVipLevel } from "./vip";

export async function addXP(userId: string, amount: number) {
  const supabase = supabaseServer();

  // 1. Log XP transaction
  await supabase.from("xp_transactions").insert({
    user_id: userId,
    amount,
    type: "gain",
  });

  // 2. Increment XP
  await supabase
    .from("profiles")
    .update({
      xp: supabase.rpc("increment", { x: amount }),
    })
    .eq("id", userId);

  // 3. Fetch profile to calculate VIP
  const { data: profileRow } = await supabase
    .from("profiles")
    .select("xp, vip_level")
    .eq("id", userId)
    .single();

  const currentXP = profileRow?.xp ?? 0;
  const currentVIP = profileRow?.vip_level ?? 1;

  const vipThresholds = [0, 100, 500, 1500, 3000, 6000, 10000];

  let newLevel = currentVIP;

  for (let i = vipThresholds.length - 1; i >= 0; i--) {
    if (currentXP >= vipThresholds[i]) {
      newLevel = i + 1;
      break;
    }
  }

  let updatedLevel = currentVIP;

  if (newLevel !== currentVIP) {
    await updateVipLevel(userId, newLevel);
    updatedLevel = newLevel;
  }

  return {
    success: true,
    newVipLevel: updatedLevel,
  };
}
