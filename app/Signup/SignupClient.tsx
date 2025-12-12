"use client";

import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/app/lib/supabase-browser";
import { applyReferral } from "@/app/lib/referrals";
import { useEffect } from "react";

export default function SignupClient() {
  const params = useSearchParams();
  const ref = params.get("ref");
  const supabase = supabaseBrowser();

  useEffect(() => {
    if (!ref) return;

    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        applyReferral(data.user.id, ref);
      }
    });
  }, [ref]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="glass-card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      </div>
    </div>
  );
}
