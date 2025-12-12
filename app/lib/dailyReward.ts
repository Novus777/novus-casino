import { supabaseServer } from "./supabase-server";
import { updateVipLevel } from "./vip";

export async function claimDailyReward(userId: string) {
  const supabase = supabaseServer();

  const { data: last } = await supabase
    .from("daily_rewards")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const now = new Date();
  const lastDate = last ? new Date(last.created_at) : null;

  let streak = last?.streak ?? 0;
  const oneDay = 24 * 60 * 60 * 1000;

  if (lastDate && now.getTime() - lastDate.getTime() < oneDay * 1.5) {
    streak++;
  } else {
    streak = 1;
  }

  const reward = 100 + streak * 10;

  await supabase.from("daily_rewards").insert({
    user_id: userId,
    streak,
    amount: reward,
  });

  await supabase
    .from("profiles")
    .update({
      phi: supabase.rpc("increment", { x: reward }),
      xp: supabase.rpc("increment", { x: 50 }),
    })
    .eq("id", userId);

  await updateVipLevel(userId);

  return { reward, streak };
}
