import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabase-server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;

  const supabase = await supabaseServer();

  // Example: look up referral / redirect
  const { data } = await supabase
    .from("referrals")
    .select("user_id")
    .eq("code", code)
    .single();

  if (!data) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(
    new URL(`/Signup?ref=${code}`, request.url)
  );
}
