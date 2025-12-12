import { supabaseServer } from "./supabase-server";

export async function addWalletBalance(
  userId: string,
  amount: number
) {
  const supabase = await supabaseServer();

  await supabase.rpc("increment_wallet", {
    x: amount,
    uid: userId,
  });

  return { success: true };
}

export async function withdrawWalletBalance(
  userId: string,
  amount: number
) {
  const supabase = await supabaseServer();

  await supabase.rpc("increment_wallet", {
    x: -amount,
    uid: userId,
  });

  return { success: true };
}
