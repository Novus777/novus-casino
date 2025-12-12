import { NextResponse } from "next/server";
import { withdrawWalletBalance } from "@/app/lib/wallet";

export async function POST(req: Request) {
  const { userId, amount } = await req.json();
  await withdrawWalletBalance(userId, amount);
  return NextResponse.json({ success: true });
}
