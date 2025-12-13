"use client";

import { supabaseBrowser } from "@/app/lib/supabase-browser";

export async function getProfile(userId: string) {
  const supabase = supabaseBrowser();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("getProfile error:", error);
    return null;
  }

  return data;
}
