import { supabaseServer } from "@/lib/supabase-server";

export async function addPhi(userId: string, amount: number) {
  const supabase = await supabaseServer();

  const { error } = await supabase.rpc("add_phi", {
    user_id: userId,
    amount,
  });

  if (error) throw error;
}
