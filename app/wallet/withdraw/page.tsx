import { redirect } from "next/navigation";
import { supabaseServer } from "@/app/lib/supabase-server";

export default async function WithdrawPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="max-w-xl mx-auto space-y-6 text-white">
      <h1 className="text-2xl font-bold">Withdraw PHI</h1>

      <div className="rounded-2xl border border-white/10 bg-[#07070c] p-6 text-white/50">
        Withdrawals coming soon.
      </div>
    </div>
  );
}
