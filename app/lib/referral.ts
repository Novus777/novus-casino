import { supabase } from "./supabase";

export async function getReferralStats(userId: string) {
  const { data, error } = await supabase
    .from("referrals")
    .select("id, reward_given, referred_id")
    .eq("referrer_id", userId);

  if (error) {
    console.error("Referral stats error:", error);
    return { totalInvited: 0, totalPhiEarned: 0, activePlayers: 0 };
  }

  return {
    totalInvited: data.length,
    totalPhiEarned: data.reduce((sum, r) => sum + (r.reward_given || 0), 0),
    activePlayers: data.filter(r => r.referred_id !== null).length,
  };
}

export function getReferralLink(code: string) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/signup?ref=${code}`;
}
