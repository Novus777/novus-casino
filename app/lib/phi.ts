import { supabaseServer } from "@/app/lib/supabase-server";

/**
 * Add PHI to a user's balance
 */
export async function addPhi(userId: string, amount: number) {
  const supabase = await supabaseServer();

  const { data: profile } = await supabase
    .from("profiles")
    .select("phi")
    .eq("id", userId)
    .single();

  const current = profile?.phi ?? 0;

  await supabase
    .from("profiles")
    .update({ phi: current + amount })
    .eq("id", userId);

  return { phi: current + amount };
}

/**
 * Spend (subtract) PHI from a user's balance
 */
export async function spendPhi(userId: string, amount: number) {
  const supabase = await supabaseServer();

  const { data: profile } = await supabase
    .from("profiles")
    .select("phi")
    .eq("id", userId)
    .single();

  const current = profile?.phi ?? 0;

  if (current < amount) {
    throw new Error("Insufficient PHI");
  }

  await supabase
    .from("profiles")
    .update({ phi: current - amount })
    .eq("id", userId);

  return { phi: current - amount };
}

/**
 * Utility formatter (safe to keep)
 */
export function formatPhi(value: number) {
  return value.toLocaleString();
}
