"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/app/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/auth/login");
      } else {
        setEmail(data.session.user.email ?? null);
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return <div className="text-white p-6">Loading session…</div>;
  }

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold">Dashboard Loaded ✅</h1>
      <p className="mt-2 text-white/70">Logged in as: {email}</p>
    </div>
  );
}
