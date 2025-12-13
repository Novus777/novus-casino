import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

type ActivityItem = {
  id: string;
  type: string;
  amount: number | null;
  status: string | null;
  created_at: string;
};

export default async function ActivityPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: rows } = await supabase
    .from("wallet_transactions")
    .select("id, type, amount, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  const activity: ActivityItem[] = rows ?? [];

  return (
    <div className="p-8 text-white space-y-6">
      <h1 className="text-3xl font-bold">Activity</h1>
      <p className="text-sm text-zinc-400">
        Recent wallet activity
      </p>

      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        {activity.length === 0 && (
          <div className="p-6 text-zinc-500">
            No activity yet
          </div>
        )}

        {activity.map((item) => (
          <ActivityRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- ROW ---------------- */

function ActivityRow({ item }: { item: ActivityItem }) {
  const positive = item.type !== "withdraw";

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 hover:bg-zinc-900 transition">
      <div>
        <div className="capitalize font-medium">
          {item.type}
        </div>
        <div className="text-xs text-zinc-500">
          {new Date(item.created_at).toLocaleString()}
        </div>
      </div>

      <div className="text-right">
        {item.amount !== null && (
          <div
            className={`font-semibold ${
              positive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {positive ? "+" : "-"}
            {item.amount} PHI
          </div>
        )}
        {item.status && (
          <div className="text-xs text-zinc-500">
            {item.status}
          </div>
        )}
      </div>
    </div>
  );
}
