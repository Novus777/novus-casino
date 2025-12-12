import { supabaseServer } from "./supabase-server";

export async function getProfile(userId: string) {
  const supabase = await supabaseServer();

  return supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
}
