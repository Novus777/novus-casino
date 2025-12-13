import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

export default async function DashboardPage() {
  const supabase = await supabaseServer(); // ✅ AWAIT

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("phi")
    .eq("id", user.id)
    .single();

  const balance = profile?.phi ?? 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      <div className="rounded-2xl border border-white/10 bg-[#07070c] p-6">
        <p className="text-white/50 text-sm">Available PHI</p>
        <p className="text-4xl font-bold text-emerald-400 mt-2">
          {balance.toLocaleString()} PHI
        </p>
      </div>
    </div>
  );
}
