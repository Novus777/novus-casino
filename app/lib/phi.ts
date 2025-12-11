// app/lib/phi.ts
import { supabaseServer } from "./supabase-server";

/**
 * Log a PHI transaction
 */
export async function logPhiTransaction(
  userId: string,
  amount: number,
  type: "add" | "spend",
  reason: string
) {
  const supabase = supabaseServer();

  await supabase.from("phi_transactions").insert({
    user_id: userId,
    amount,
    type,
    reason,
  });
}

/**
 * Add PHI to a user's balance
 */
export async function addPhi(
  userId: string,
  amount: number,
  reason = "reward"
) {
  const supabase = supabaseServer();

  // 1. Update balance
  await supabase.rpc("increment_phi", { x: amount, uid: userId });

  // 2. Log transaction
  await logPhiTransaction(userId, amount, "add", reason);

  return { success: true };
}

/**
 * Spend PHI from a user's balance
 */
export async function spendPhi(
  userId: string,
  amount: number,
  reason = "spend"
) {
  const supabase = supabaseServer();

  // Get current PHI
  const { data: profile } = await supabase
    .from("profiles")
    .select("phi")
    .eq("id", userId)
    .single();

  const current = profile?.phi ?? 0;
  if (current < amount) {
    return { success: false, error: "Not enough PHI" };
  }

  // 1. Deduct PHI
  await supabase.rpc("decrement_phi", { x: amount, uid: userId });

  // 2. Log transaction
  await logPhiTransaction(userId, amount, "spend", reason);

  return { success: true };
}
