import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { getVipName, getVipGradient } from "@/app/lib/vip";

export default async function ProfilePage() {
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
    .select("username, xp, vip_level, phi, created_at")
    .eq("id", user.id)
    .single();

  const xp = profile?.xp ?? 0;
  const vip = profile?.vip_level ?? 1;
  const phi = profile?.phi ?? 0;

  // XP thresholds (must match backend)
  const thresholds = [0, 100, 500, 1500, 3000, 6000, 10000];
  const currentThreshold = thresholds[vip - 1] ?? 0;
  const nextThreshold = thresholds[vip] ?? currentThreshold + 1000;

  const progress =
    ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 text-white space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-white/60 mt-1">
          Your account progress and status
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-[#0b0b0b] border border-[#1f1f1f] rounded-2xl p-8 grid md:grid-cols-2 gap-8">
        {/* LEFT */}
        <div>
          <p className="text-white/60 text-sm">Username</p>
          <p className="text-2xl font-bold">
            {profile?.username ?? "Anonymous"}
          </p>

          <p className="mt-4 text-white/60 text-sm">Member since</p>
          <p className="text-white">
            {new Date(profile.created_at).toLocaleDateString()}
          </p>

          <p className="mt-4 text-white/60 text-sm">PHI Balance</p>
          <p className="text-2xl font-bold">💎 {phi} PHI</p>
        </div>

        {/* RIGHT */}
        <div>
          <p className="text-white/60 text-sm">VIP Level</p>
          <div
            className={`inline-block mt-1 px-4 py-2 rounded-xl font-bold bg-gradient-to-r ${getVipGradient(
              vip
            )} text-black`}
          >
            {getVipName(vip)}
          </div>

          {/* XP BAR */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-white/60 mb-1">
              <span>XP Progress</span>
              <span>
                {xp} / {nextThreshold}
              </span>
            </div>

            <div className="h-3 w-full bg-[#111] rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <p className="text-white/50 text-sm mt-2">
              Earn XP by logging in daily and using the platform.
            </p>
          </div>
        </div>
      </div>

      {/* INFO */}
      <div className="bg-[#0b0b0b] border border-[#1f1f1f] rounded-xl p-6">
        <p className="text-white/70 text-sm">
          🚀 Higher VIP levels unlock better rewards, bonuses, and future
          casino perks.
        </p>
      </div>
    </div>
  );
}
