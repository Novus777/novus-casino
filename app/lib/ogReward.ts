import { supabaseBrowser } from "./supabase-browser";
import { addPhiCoins } from "./phiCoin";

export async function checkOgWeeklyReward(userId: string) {
  const supabase = supabaseBrowser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("og_package, og_next_reward")
    .eq("id", userId)
    .single();

  if (!profile?.og_package) return;

  const now = new Date();
  const nextReward = profile.og_next_reward
    ? new Date(profile.og_next_reward)
    : null;

  if (!nextReward || now >= nextReward) {
    await addPhiCoins(userId, 100);

    const next = new Date();
    next.setDate(next.getDate() + 7); // 7 days later

    await supabase
      .from("profiles")
      .update({ og_next_reward: next.toISOString() })
      .eq("id", userId);

    return {
      rewarded: true,
      message: "You earned your weekly OG reward: +100 PHI coins!"
    };
  }

  return { rewarded: false };
}
