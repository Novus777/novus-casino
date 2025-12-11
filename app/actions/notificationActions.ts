"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

function getSupabase() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

// Add new notification for current user
export async function addNotification(message: string) {
  const supabase = getSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not logged in" };

  const { error } = await supabase.from("notifications").insert({
    user_id: user.id,
    message,
    type: "info",
    seen: false,
  });

  if (error) return { error };

  return { success: true };
}
