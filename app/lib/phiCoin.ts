import { supabaseBrowser } from "./supabase-browser";

export async function addPhiCoins(userId: string, amount: number) {
  const supabase = supabaseBrowser;


  const { data: profile } = await supabase
    .from("profiles")
    .select("phi_coin")
    .eq("id", userId)
    .single();

  const newAmount = (profile?.phi_coin ?? 0) + amount;

  await supabase
    .from("profiles")
    .update({ phi_coin: newAmount })
    .eq("id", userId);

  return newAmount;
}

export async function subtractPhiCoins(userId: string, amount: number) {
  const supabase = supabaseBrowser;


  const { data: profile } = await supabase
    .from("profiles")
    .select("phi_coin")
    .eq("id", userId)
    .single();

  const current = profile?.phi_coin ?? 0;

  if (current < amount) {
    throw new Error("Not enough PHI coins");
  }

  await supabase
    .from("profiles")
    .update({ phi_coin: current - amount })
    .eq("id", userId);

  return current - amount;
}
