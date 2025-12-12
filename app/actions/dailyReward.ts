"use server";

import { cookies } from "next/headers";
import { supabaseServer } from "@/app/lib/supabase-server";

export async function claimDailyReward() {
  // FIX: cookies() now MUST be awaited
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    return { error: "Not logged in" };
  }

  const supabase = supabaseServer();

  // Check last claim
  const { data: lastClaim, error: lastErr } = await supabase
    .from("daily_rewards")
    .select("created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (lastErr && lastErr.code !== "PGRST116") {
    return { error: lastErr.message };
  }

  const now = new Date();
  const lastDate = lastClaim ? new Date(lastClaim.created_at) : null;

  const diffHours = lastDate
    ? (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60)
    : 999;

  if (diffHours < 24) {
    return { error: "Already claimed", hoursRemaining: 24 - diffHours };
  }

  // Add reward
  const { data: reward, error: claimErr } = await supabase
    .from("daily_rewards")
    .insert({
      user_id: userId,
      amount: 100,
    })
    .select()
    .single();

  if (claimErr) return { error: claimErr.message };

  // Update PHI balance RPC or direct update
  await supabase.rpc("add_phi_balance", {
    user_id: userId,
    amount: 100,
  });

  return {
    success: true,
    amount: 100,
    time: reward.created_at,
  };
}
