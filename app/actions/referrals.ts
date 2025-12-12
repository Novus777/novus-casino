"use server";

import { getSupabaseServer } from "../server/supabase";

export async function getReferralCount(userId: string) {
  const supabase = await getSupabaseServer();

  const { count } = await supabase
    .from("referrals")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  return count ?? 0;
}
