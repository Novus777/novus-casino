import { supabaseServer } from "./supabase-server";


export async function getProfile(userId: string) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) return null;

  return data;
}
