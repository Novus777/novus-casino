import { supabaseServer } from "./supabase-server";


export async function addReferral(userId: string, referredId: string) {
  const supabase = supabaseServer();

  const { error } = await supabase.from("referrals").insert({
    user_id: userId,
    referred_id: referredId,
  });

  return { success: !error };
}

export async function getReferralCount(userId: string) {
  const supabase = supabaseServer();

  const { count } = await supabase
    .from("referrals")
    .select("*", { count: "exact" })
    .eq("user_id", userId);

  return count || 0;
}
