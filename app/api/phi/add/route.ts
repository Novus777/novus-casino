import { NextResponse } from "next/server";
import { addPhi } from "@/app/lib/phi";

export async function POST(req: Request) {
  const { userId, amount } = await req.json();
  await addPhi(userId, amount);
  return NextResponse.json({ success: true });
}
