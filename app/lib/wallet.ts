import { supabaseServer } from "./supabase-server";

export async function addWalletBalance(userId: string, amount: number) {
  const supabase = supabaseServer();

  const { error } = await supabase
    .from("profiles")
    .update({
      wallet_balance: supabase.rpc("increment", { x: amount })
    })
    .eq("id", userId);

  if (error) return { error };
  return { success: true };
}

export async function withdrawWalletBalance(userId: string, amount: number) {
  const supabase = supabaseServer();

  // Check balance first
  const { data: profile } = await supabase
    .from("profiles")
    .select("wallet_balance")
    .eq("id", userId)
    .single();

  if (!profile || profile.wallet_balance < amount) {
    return { error: "Insufficient balance" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      wallet_balance: supabase.rpc("decrement", { x: amount })
    })
    .eq("id", userId);

  if (error) return { error };
  return { success: true };
}
