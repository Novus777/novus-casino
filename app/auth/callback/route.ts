import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabase-server";

export async function GET(req: Request) {
  const supabase = await supabaseServer();
  return NextResponse.redirect(new URL("/", req.url));
}
