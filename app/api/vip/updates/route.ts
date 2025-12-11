import { NextResponse } from "next/server";
import { updateVipLevel } from "@/app/lib/vip";

export async function POST(req: Request) {
  try {
    const { userId, newLevel } = await req.json();

    if (!userId || !newLevel) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const result = await updateVipLevel(userId, newLevel);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /vip/updates:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
