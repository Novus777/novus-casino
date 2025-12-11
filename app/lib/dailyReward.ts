import { supabaseServer } from "./supabase-server";

export async function claimDailyReward(userId: string) {
  const supabase = supabaseServer();

  // Load latest daily reward
  const { data: last, error: lastErr } = await supabase
    .from("daily_rewards")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastErr && lastErr.code !== "PGRST116") {
    return { error: lastErr };
  }

  const now = new Date();
  const lastDate = last ? new Date(last.created_at) : null;

  let streak = last?.streak ?? 0;

  // If yesterday → continue streak
  const oneDay = 24 * 60 * 60 * 1000;

  if (lastDate && now.getTime() - lastDate.getTime() <= oneDay * 1.5) {
    streak++;
  } else {
    streak = 1;
  }

  const rewardAmount = 100 + streak * 10;

  // Insert reward record
  await supabase.from("daily_rewards").insert({
    user_id: userId,
    streak,
    amount: rewardAmount
  });

  // Update profile: add PHI + XP
  await supabase
    .from("profiles")
    .update({
      phi: rewardAmount,
      xp: 50
    })
    .eq("id", userId);

  return { success: true, reward: rewardAmount, streak };
}
