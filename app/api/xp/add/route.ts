import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabase-server";
import { updateVipLevel } from "@/app/lib/vip";

export async function POST(req: Request) {
  try {
    const { userId, amount } = await req.json();
    const supabase = supabaseServer();

    if (!userId || !amount)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    // Add XP transaction
    await supabase.from("xp_transactions").insert({
      user_id: userId,
      amount,
      type: "gain",
    });

    // Update XP in profile
    await supabase
      .from("profiles")
      .update({
        xp: supabase.rpc("increment", { x: amount }),
      })
      .eq("id", userId);

    // Recalculate VIP level
    const newVip = await updateVipLevel(userId);

    return NextResponse.json({
      success: true,
      newVipLevel: newVip,
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
