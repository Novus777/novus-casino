"use server";

import { supabaseServer } from "@/lib/supabase-server";

export async function notify(message: string) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from("notifications").insert({
    user_id: user.id,
    message,
    seen: false,
    type: "info",
  });
}
