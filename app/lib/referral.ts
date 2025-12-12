import { supabaseServer } from "./supabase-server";

export async function applyReferral(userId: string, code: string) {
  const supabase = supabaseServer();

  const { data: referrer } = await supabase
    .from("profiles")
    .select("id")
    .eq("referral_code", code)
    .single();

  if (!referrer) return;

  await supabase.from("referrals").insert({
    referrer_id: referrer.id,
    referred_id: userId,
  });

  await supabase
    .from("profiles")
    .update({
      phi: supabase.rpc("increment", { x: 50 }),
    })
    .eq("id", referrer.id);
}
