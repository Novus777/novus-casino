import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const { userId, amount } = await req.json();
    const supabase = supabaseServer();

    if (!userId || !amount)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    // Insert PHI transaction
    await supabase.from("phi_transactions").insert({
      user_id: userId,
      amount,
      type: "add",
    });

    // Update wallet balance
    await supabase
      .from("profiles")
      .update({ phi: supabase.rpc("increment", { x: amount }) })
      .eq("id", userId);

    return NextResponse.json({ success: true, amount });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
