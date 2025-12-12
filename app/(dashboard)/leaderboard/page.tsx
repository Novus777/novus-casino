import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export default async function LeaderboardPage() {
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

  const { data: users } = await supabase
    .from("profiles")
    .select("username, xp, vip_level")
    .order("xp", { ascending: false })
    .limit(25);

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 text-white">
      <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
      <p className="text-white/60 mb-8">
        Top players ranked by XP
      </p>

      <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#0b0b0b] border-b border-[#1f1f1f]">
            <tr className="text-white/60 text-sm">
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">VIP</th>
              <th className="px-6 py-4 text-right">XP</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user, i) => (
              <tr
                key={i}
                className="border-b border-[#1f1f1f] hover:bg-white/5 transition"
              >
                <td className="px-6 py-4 font-semibold">
                  #{i + 1}
                </td>

                <td className="px-6 py-4">
                  {user.username ?? "Anonymous"}
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-purple-600/20 text-purple-400 border border-purple-500/30">
                    {user.vip_level ?? "Starter"}
                  </span>
                </td>

                <td className="px-6 py-4 text-right font-mono text-green-400">
                  {user.xp?.toLocaleString() ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!users?.length && (
          <div className="p-10 text-center text-white/60">
            No leaderboard data yet.
          </div>
        )}
      </div>
    </div>
  );
}
