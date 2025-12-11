"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/app/lib/supabase-browser";
import { applyReferral } from "@/app/lib/referrals";

export default function SignupPage() {
  const supabase = supabaseBrowser();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (formData: FormData) => {
    setLoading(true);
    setMessage(null);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    // Try to apply referral code from URL
    const ref = searchParams.get("ref");

    if (ref) {
      await applyReferral(ref);
      setMessage("Referral applied! Check your email to confirm your account.");
    } else {
      setMessage("Check your email to confirm your account.");
    }

    setLoading(false);
  };

  return (
    <form action={handleSignup} className="max-w-md mx-auto mt-20 space-y-4 text-white">
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full p-2 rounded bg-black/50 border border-white/20"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full p-2 rounded bg-black/50 border border-white/20"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Sign Up"}
      </button>

      {message && <p className="text-center text-sm text-cyan-300">{message}</p>}
    </form>
  );
}
