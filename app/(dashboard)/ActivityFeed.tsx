import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export default async function ActivityFeed() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: logs } = await supabase
    .from("activity_logs")
    .select("id, message, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-6 space-y-3">
      <h3 className="text-lg font-semibold">Recent Activity</h3>

      {!logs?.length && (
        <p className="text-sm text-gray-500">No activity yet</p>
      )}

      <ul className="space-y-2">
        {logs?.map((log) => (
          <li key={log.id} className="text-sm text-gray-300">
            {log.message}
            <span className="ml-2 text-xs text-gray-500">
              {new Date(log.created_at).toLocaleTimeString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
