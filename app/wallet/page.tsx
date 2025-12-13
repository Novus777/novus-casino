import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

export default async function WalletPage() {
  const supabase = await supabaseServer(); // ✅ AWAIT

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data } = await supabase
    .from("profiles")
    .select("phi")
    .eq("id", user.id)
    .single();

  const balance = data?.phi ?? 0;

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-white">Wallet</h1>

      <div className="rounded-2xl border border-white/10 bg-[#07070c] p-6">
        <p className="text-white/50 text-sm">Balance</p>
        <p className="text-4xl font-bold text-emerald-400 mt-2">
          {balance.toLocaleString()} PHI
        </p>
      </div>
    </div>
  );
}
