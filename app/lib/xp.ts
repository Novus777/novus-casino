import { supabaseServer } from "./supabase-server";

export async function addXP(userId: string, amount: number) {
  const supabase = supabaseServer();

  const { error } = await supabase
    .from("profiles")
    .update({
      xp: supabase.rpc("increment", { x: amount })
    })
    .eq("id", userId);

  if (error) return { error };
  return { success: true };
}
