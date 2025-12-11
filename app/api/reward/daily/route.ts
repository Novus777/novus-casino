import { NextResponse } from "next/server";
import { claimDailyReward } from "@/app/lib/dailyReward";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const result = await claimDailyReward(userId);
  return NextResponse.json(result);
}
