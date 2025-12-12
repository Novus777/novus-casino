import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export default async function RewardsPage() {
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

  if (!user) {
    return (
      <div className="py-20 text-center text-white">
        <h1 className="text-2xl font-bold">Please log in</h1>
      </div>
    );
  }

  const { data: rewards } = await supabase
    .from("daily_rewards")
    .select("streak, amount, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const latest = rewards?.[0];

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 text-white space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Daily Rewards</h1>
        <p className="text-white/60 mt-1">
          Log in daily to earn PHI & XP
        </p>
      </div>

      {/* CURRENT STREAK */}
      <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-8">
        <p className="text-white/60 text-sm">Current streak</p>
        <p className="text-4xl font-bold mt-2">
          {latest?.streak ?? 0} 🔥
        </p>

        <p className="text-white/60 mt-2">
          Last reward:{" "}
          {latest
            ? `+${latest.amount} PHI`
            : "No rewards claimed yet"}
        </p>

        <div className="mt-6 p-4 rounded-xl bg-[#0b0b0b] border border-[#1f1f1f]">
          <p className="text-sm text-white/70">
            💡 Rewards increase the longer your streak continues.
          </p>
        </div>
      </div>

      {/* HISTORY */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Reward history</h2>

        <div className="space-y-3">
          {rewards && rewards.length > 0 ? (
            rewards.map((r, i) => (
              <div
                key={i}
                className="flex justify-between bg-[#111] border border-[#1f1f1f] rounded-xl p-4"
              >
                <div>
                  <p className="font-semibold">+{r.amount} PHI</p>
                  <p className="text-white/50 text-sm">
                    Streak: {r.streak}
                  </p>
                </div>

                <p className="text-white/50 text-sm">
                  {new Date(r.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-white/50">No rewards yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
