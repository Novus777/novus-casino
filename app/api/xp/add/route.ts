import { NextResponse } from "next/server";
import { addXP } from "@/app/lib/xp";  // <-- FIXED IMPORT

export async function POST(req: Request) {
  const { userId, amount } = await req.json();

  if (!userId || !amount) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const result = await addXP(userId, amount);   // <-- FIXED FUNCTION CALL
  return NextResponse.json(result);
}
