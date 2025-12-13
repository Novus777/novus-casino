import { supabaseServer } from "@/lib/supabase-server";

/**
 * Add PHI to wallet
 */
export async function addWalletBalance(
  userId: string,
  amount: number
): Promise<{ success: boolean }> {
  const supabase = await supabaseServer();

  const { error } = await supabase.rpc("increment_wallet", {
    uid: userId,
    x: amount,
  });

  if (error) {
    console.error("addWalletBalance error:", error);
    throw new Error("Failed to add wallet balance");
  }

  return { success: true };
}

/**
 * Withdraw PHI from wallet
 */
export async function withdrawWalletBalance(
  userId: string,
  amount: number
): Promise<{ success: boolean }> {
  const supabase = await supabaseServer();

  const { error } = await supabase.rpc("increment_wallet", {
    uid: userId,
    x: -amount,
  });

  if (error) {
    console.error("withdrawWalletBalance error:", error);
    throw new Error("Failed to withdraw wallet balance");
  }

  return { success: true };
}
