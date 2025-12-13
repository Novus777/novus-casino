import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function WalletActivityPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data } = await supabase
    .from("wallet_transactions")
    .select("id, type, amount, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Wallet Activity</h1>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
        <table className="w-full text-white text-sm">
          <thead className="bg-white/5 text-white/60">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {!data?.length && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/40">
                  No activity yet
                </td>
              </tr>
            )}

            {data?.map((tx) => (
              <tr key={tx.id} className="border-t border-white/10">
                <td className="px-4 py-3 capitalize">{tx.type}</td>
                <td className="px-4 py-3">{tx.amount} PHI</td>
                <td
                  className={`px-4 py-3 ${
                    tx.status === "completed"
                      ? "text-green-400"
                      : tx.status === "pending"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {tx.status}
                </td>
                <td className="px-4 py-3 text-white/60">
                  {new Date(tx.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
