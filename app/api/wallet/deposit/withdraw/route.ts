import { NextResponse } from "next/server";
import { withdrawWalletBalance } from "@/app/lib/wallet";

export async function POST(req: Request) {
  const { userId, amount } = await req.json();

  if (!userId || !amount) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const result = await withdrawWalletBalance(userId, amount);
  return NextResponse.json(result);
}
