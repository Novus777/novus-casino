import { NextResponse } from "next/server";
import { addXp } from "@/app/lib/xp";

export async function POST(req: Request) {
  try {
    const { userId, amount } = await req.json();

    if (!userId || typeof amount !== "number") {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    await addXp(userId, amount);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("XP API error:", err);
    return NextResponse.json(
      { error: "Failed to add XP" },
      { status: 500 }
    );
  }
}
