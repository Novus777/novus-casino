import { NextResponse } from "next/server";
import { addWalletBalance } from "@/app/lib/wallet";

export async function POST(req: Request) {
  const { userId, amount } = await req.json();

  if (!userId || !amount) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const result = await addWalletBalance(userId, amount);
  return NextResponse.json(result);
}
