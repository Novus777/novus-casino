import { NextResponse } from "next/server";
import { updateVipLevel } from "@/app/lib/vip";

export async function POST(request: Request) {
  try {
    const { userId, xp } = await request.json();

    if (!userId || xp === undefined) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const vipLevel = await updateVipLevel(userId, xp);

    return NextResponse.json({ vipLevel });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
