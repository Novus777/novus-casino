import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const code = params.code;
  const url = new URL(request.url);

  const signupUrl = new URL("/auth/signup", url.origin);
  signupUrl.searchParams.set("ref", code);

  const res = NextResponse.redirect(signupUrl);
  res.cookies.set("referral_code", code, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return res;
}
