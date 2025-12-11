"use server";

import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// GET AUTHED SUPABASE CLIENT
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

// 🟣 ADD XP
export async function addXP(amount: number) {
  const supabase = getSupabase();

  // get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not logged in" };

  // get current xp
  const { data: profile } = await supabase
    .from("profiles")
    .select("xp")
    .eq("id", user.id)
    .single();

  const newXP = (profile?.xp ?? 0) + amount;

  const { error } = await supabase
    .from("profiles")
    .update({ xp: newXP })
    .eq("id", user.id);

  if (error) return { error };

  return { success: true, xp: newXP };
}

// 🟢 ADD TO WALLET
export async function addWallet(amount: number) {
  const supabase = getSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not logged in" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("wallet")
    .eq("id", user.id)
    .single();

  const newBalance = (profile?.wallet ?? 0) + amount;

  const { error } = await supabase
    .from("profiles")
    .update({ wallet: newBalance })
    .eq("id", user.id);

  if (error) return { error };

  return { success: true, wallet: newBalance };
}

// 🔴 REMOVE FROM WALLET
export async function removeWallet(amount: number) {
  const supabase = getSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not logged in" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("wallet")
    .eq("id", user.id)
    .single();

  const current = profile?.wallet ?? 0;

  if (current < amount)
    return { error: "Not enough balance", wallet: current };

  const newBalance = current - amount;

  const { error } = await supabase
    .from("profiles")
    .update({ wallet: newBalance })
    .eq("id", user.id);

  if (error) return { error };

  return { success: true, wallet: newBalance };
}

// 🟡 SET WALLET DIRECTLY
export async function setWallet(newAmount: number) {
  const supabase = getSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not logged in" };

  const { error } = await supabase
    .from("profiles")
    .update({ wallet: newAmount })
    .eq("id", user.id);

  if (error) return { error };

  return { success: true, wallet: newAmount };
}
