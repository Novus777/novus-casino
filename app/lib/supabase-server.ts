import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function supabaseServer() {
  const cookieStore = await cookies(); // ✅ IMPORTANT (fixes line 13 error)

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value; // ✅ no TS error
        },
        // In Server Components, cookies are read-only, so these are safe no-ops
        set() {},
        remove() {},
      },
    }
  );
}
