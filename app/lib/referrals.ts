import { supabaseBrowser } from "./supabase-browser";

export async function applyReferral(code: string, userId: string) {
  const supabase = supabaseBrowser();

  const { data: referrer } = await supabase
    .from("referral_codes")
    .select("user_id")
    .eq("code", code)
    .single();

  if (!referrer) return false;

  await supabase.from("referrals").insert({
    referrer_id: referrer.user_id,
    referred_id: userId,
  });

  return true;
}
