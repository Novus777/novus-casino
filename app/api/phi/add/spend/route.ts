import { NextResponse } from "next/server";
import { spendPhi } from "@/app/lib/phi";

export async function POST(req: Request) {
  try {
    const { userId, amount, reason } = await req.json();

    if (!userId || !amount) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const result = await spendPhi(userId, amount, reason || "spend");

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /phi/add/spend:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
