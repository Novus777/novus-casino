import { NextResponse } from "next/server";
import { spendPhi } from "@/app/lib/phi";

export async function POST(req: Request) {
  const { userId, amount } = await req.json();
  await spendPhi(userId, amount);
  return NextResponse.json({ success: true });
}

