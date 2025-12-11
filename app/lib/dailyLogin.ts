// app/lib/dailyLogin.ts
"use server";

import { supabase } from "./supabase";

export type DailyRewardResult = {
  success: boolean;
  message: string;
};

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Give the user a daily login reward:
 * - +PHI coins
 * - +XP
 * - updates daily_streak and last_daily_login
 */
export async function claimDailyReward(
  userId: string
): Promise<DailyRewardResult> {
  if (!userId) {
    return { success: false, message: "User not found." };
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, phi_balance, xp, daily_streak, last_daily_login")
    .eq("id", userId)
    .maybeSingle();

  if (error || !profile) {
    console.error("claimDailyReward profile error", error);
    return { success: false, message: "Could not load your profile." };
  }

  const now = new Date();
  const lastLogin = profile.last_daily_login
    ? new Date(profile.last_daily_login)
    : null;

  // Already claimed today?
  if (lastLogin && isSameDay(lastLogin, now)) {
    return { success: false, message: "You already claimed today’s reward." };
  }

  // Streak logic
  let streak = profile.daily_streak ?? 0;
  if (lastLogin) {
    const diffDays = Math.floor(
      (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) streak += 1; // consecutive day
    else streak = 1; // reset streak
  } else {
    streak = 1; // first ever claim
  }

  // Reward amounts (tweak these however you want)
  const basePhi = 2; // 2 PHI per day
  const baseXp = 10;
  const phiGain = basePhi + Math.floor(streak / 7); // tiny bonus per 7-day streak
  const xpGain = baseXp + streak;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      daily_streak: streak,
      last_daily_login: now.toISOString(),
      phi_balance: (profile.phi_balance ?? 0) + phiGain,
      xp: (profile.xp ?? 0) + xpGain,
    })
    .eq("id", userId);

  if (updateError) {
    console.error("claimDailyReward update error", updateError);
    return { success: false, message: "Could not save your reward, try again." };
  }

  return {
    success: true,
    message: `Daily reward claimed: +${phiGain} PHI, +${xpGain} XP!`,
  };
}
