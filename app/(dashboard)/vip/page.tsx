import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { getVipName } from "@/app/lib/vip";

export default async function VipPage() {
  const cookieStore = await cookies(); // ✅ FIX HERE

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
    return <div className="p-10 text-white">Not authenticated</div>;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("vip_level, xp")
    .eq("id", user.id)
    .single();

  const vipLevel = profile?.vip_level ?? 0;
  const vipName = getVipName(vipLevel);
  const xp = profile?.xp ?? 0;
  const nextXp = (vipLevel + 1) * 1000;
  const progress = Math.min((xp / nextXp) * 100, 100);

  return (
    <div className="max-w-5xl mx-auto py-10 text-white space-y-8">
      <h1 className="text-3xl font-bold">VIP Status</h1>

      <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-6 space-y-4">
        <p className="text-lg">Current Tier</p>
        <p className="text-4xl font-bold text-purple-400">{vipName}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm opacity-80">
            <span>XP: {xp}</span>
            <span>Next Tier: {nextXp} XP</span>
          </div>

          <div className="w-full h-3 bg-black rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VipPerk title="Daily Rewards Boost" value={`+${vipLevel * 5}%`} />
        <VipPerk
          title="Exclusive Games"
          value={vipLevel >= 2 ? "Unlocked" : "Locked"}
        />
        <VipPerk
          title="Withdraw Priority"
          value={vipLevel >= 3 ? "High" : "Standard"}
        />
        <VipPerk
          title="VIP Support"
          value={vipLevel >= 4 ? "24/7" : "Limited"}
        />
      </div>
    </div>
  );
}

function VipPerk({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-5">
      <p className="text-sm opacity-70">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}
