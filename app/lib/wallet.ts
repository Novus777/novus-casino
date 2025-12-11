"use server";

import { supabaseServer } from "./supabase-server";

export async function recordPhiTransaction(
  userId: string,
  amount: number,
  type: string
) {
  const supabase = supabaseServer();

  // 1. Insert transaction log
  const { error: insertError } = await supabase
    .from("phi_transactions")
    .insert({
      user_id: userId,
      amount,
      type,
    });

  if (insertError) {
    console.error("Transaction insert error:", insertError);
    throw new Error("Failed to log PHI transaction");
  }

  // 2. Update balance in profiles
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      phi: supabase.rpc("increment", { x: amount }),
    })
    .eq("id", userId);

  if (updateError) {
    console.error("PHI update error:", updateError);
    throw new Error("Failed to update PHI balance");
  }

  return { success: true };
}

export async function getPhiHistory(userId: string) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("phi_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch PHI history error:", error);
    return [];
  }

  return data;
}
