import { redirect } from "next/navigation";
import { supabaseServer } from "@/app/lib/supabase-server";

export default async function WalletActivityPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-white">
      <h1 className="text-2xl font-bold">Wallet Activity</h1>

      <div className="rounded-2xl border border-white/10 bg-[#07070c] p-6 text-white/40">
        No transactions yet.
      </div>
    </div>
  );
}
