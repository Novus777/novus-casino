"use server";

import { supabaseServer } from "@/app/lib/supabase-server";

export async function getWallet(userId: string) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
}
