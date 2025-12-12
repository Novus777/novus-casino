import { supabaseServer } from "./supabase-server";

export async function addDailyReward(userId: string) {
  const supabase = supabaseServer();

  // GET last reward
  const { data: last, error: lastErr } = await supabase
    .from("daily_rewards")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (lastErr && lastErr.code !== "PGRST116") {
    return { error: lastErr.message };
  }

  const now = new Date();
  const lastDate = last ? new Date(last.created_at) : null;

  // streak logic
  let streak = last?.streak ?? 0;
  const oneDay = 24 * 60 * 60 * 1000;

  if (lastDate && now.getTime() - lastDate.getTime() <= oneDay * 1.5) {
    streak++;
  } else {
    streak = 1;
  }

  const rewardAmount = 100 + streak * 10;

  // insert new reward row
  await supabase.from("daily_rewards").insert({
    user_id: userId,
    amount: rewardAmount,
    streak,
  });

  // update profile XP + PHI
  await supabase
    .from("profiles")
    .update({
      phi: (last?.phi ?? 0) + rewardAmount,
      xp: (last?.xp ?? 0) + 50,
    })
    .eq("id", userId);

  return {
    success: true,
    reward: rewardAmount,
    streak,
  };
}
