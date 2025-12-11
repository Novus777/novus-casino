import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: { Authorization: `Bearer ${code}` },
        },
      }
    );

    // Exchange code for session
    await supabase.auth.exchangeCodeForSession(code);

    // Set cookie from Supabase auth
    const cookieStore = cookies();
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      cookieStore.set("sb-access-token", data.session.access_token, {
        httpOnly: true,
        path: "/",
      });

      cookieStore.set("sb-refresh-token", data.session.refresh_token, {
        httpOnly: true,
        path: "/",
      });
    }
  }

  // Redirect to dashboard after login
  return Response.redirect(`${requestUrl.origin}/dashboard`);
}
