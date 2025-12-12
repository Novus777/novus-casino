import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export default async function DashboardPage() {
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, xp, vip_level")
    .eq("id", user.id)
    .single();

  const { data: wallet } = await supabase
    .from("wallets")
    .select("balance")
    .eq("user_id", user.id)
    .single();

  const { data: rewards } = await supabase
    .from("daily_rewards")
    .select("streak, amount, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 text-white space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {profile?.username ?? "Player"}
        </h1>
        <p className="text-white/60 mt-1">
          Your PHI Casino command center
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PHI BALANCE */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
          <p className="text-white/60 text-sm">PHI Balance</p>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {wallet?.balance?.toFixed(2) ?? "0.00"}
          </p>
          <Link
            href="/dashboard/wallet"
            className="inline-block mt-4 text-sm text-cyan-400 hover:underline"
          >
            View wallet →
          </Link>
        </div>

        {/* XP */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
          <p className="text-white/60 text-sm">Total XP</p>
          <p className="text-3xl font-bold mt-2">
            {profile?.xp?.toLocaleString() ?? 0}
          </p>
          <p className="text-white/50 text-sm mt-1">
            VIP Level: {profile?.vip_level ?? "Starter"}
          </p>
        </div>

        {/* DAILY REWARD */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
          <p className="text-white/60 text-sm">Daily Reward</p>

          {rewards ? (
            <>
              <p className="text-2xl font-bold mt-2">
                +{rewards.amount} PHI
              </p>
              <p className="text-white/50 text-sm">
                Streak: {rewards.streak} days
              </p>
            </>
          ) : (
            <p className="text-white/50 mt-2">
              Claim your first reward today
            </p>
          )}

          <Link
            href="/dashboard/rewards"
            className="inline-block mt-4 text-sm text-purple-400 hover:underline"
          >
            Go to rewards →
          </Link>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/profile"
            className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 hover:border-cyan-400 transition"
          >
            <p className="font-semibold">Profile</p>
            <p className="text-white/60 text-sm mt-1">
              View XP, VIP, progress
            </p>
          </Link>

          <Link
            href="/dashboard/wallet"
            className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 hover:border-green-400 transition"
          >
            <p className="font-semibold">Wallet</p>
            <p className="text-white/60 text-sm mt-1">
              PHI balance & history
            </p>
          </Link>

          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 opacity-60">
            <p className="font-semibold">Games</p>
            <p className="text-white/60 text-sm mt-1">
              Launching soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
