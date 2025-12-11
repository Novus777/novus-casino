import { supabaseServer } from "../lib/supabase-server";


export async function addPhi(userId: string, amount: number) {
  const supabase = supabaseServer();

  // Get current phi balance
  const { data: profile } = await supabase
    .from("profiles")
    .select("phi_balance")
    .eq("id", userId)
    .single();

  const newBalance = (profile?.phi_balance || 0) + amount;

  // Update balance
  await supabase
    .from("profiles")
    .update({ phi_balance: newBalance })
    .eq("id", userId);

  return newBalance;
}
