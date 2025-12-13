"use server";

import { supabaseServer } from "@/app/lib/supabase-server";

export async function dailyReward() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not logged in" };

  await supabase
    .from("profiles")
    .update({ phi: 100 })
    .eq("id", user.id);

  return { success: true };
}
