import { getSupabaseServer } from "../server/supabase";

export async function addXp(userId: string, amount: number) {
  const supabase = await getSupabaseServer();

  const { error } = await supabase.rpc("add_xp", {
    user_id: userId,
    amount,
  });

  if (error) throw error;
}
