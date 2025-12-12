import { supabaseServer } from "./supabase-server";

export async function addPhi(
  userId: string,
  amount: number,
  reason = "add"
) {
  const supabase = await supabaseServer();

  await supabase.rpc("increment_phi", {
    x: amount,
    uid: userId,
  });

  await supabase.from("phi_transactions").insert({
    user_id: userId,
    amount,
    type: "add",
    reason,
  });

  return { success: true };
}

export async function spendPhi(
  userId: string,
  amount: number,
  reason = "spend"
) {
  const supabase = await supabaseServer();

  await supabase.rpc("increment_phi", {
    x: -amount,
    uid: userId,
  });

  await supabase.from("phi_transactions").insert({
    user_id: userId,
    amount,
    type: "spend",
    reason,
  });

  return { success: true };
}
