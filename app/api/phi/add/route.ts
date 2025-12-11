import { NextResponse } from "next/server";
import { addPhi } from "@/app/lib/phi";

export async function POST(req: Request) {
  try {
    const { userId, amount, type } = await req.json();

    if (!userId || !amount) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const result = await addPhi(userId, amount, type || "manual");

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /phi/add:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
