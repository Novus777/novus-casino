import { redirect } from "next/navigation";
import { supabaseServer } from "@/app/lib/supabase-server";

type VipTier = {
  level: number;
  name: string;
  minXp: number;
  perks: string[];
};

const VIP_TIERS: VipTier[] = [
  {
    level: 1,
    name: "Bronze",
    minXp: 0,
    perks: ["Base rewards", "Community access"],
  },
  {
    level: 2,
    name: "Silver",
    minXp: 250,
    perks: ["+5% rewards", "Daily bonuses"],
  },
  {
    level: 3,
    name: "Gold",
    minXp: 1000,
    perks: ["+10% rewards", "Priority drops"],
  },
  {
    level: 4,
    name: "Platinum",
    minXp: 2500,
    perks: ["+15% rewards", "Exclusive games"],
  },
  {
    level: 5,
    name: "Diamond",
    minXp: 5000,
    perks: ["+25% rewards", "Private events"],
  },
];

export default async function VipPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("xp, vip_level")
    .eq("id", user.id)
    .single();

  const xp = profile?.xp ?? 0;
  const vipLevel = profile?.vip_level ?? 1;

  return (
    <div className="max-w-6xl mx-auto space-y-10 text-white">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#07070c] p-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 via-cyan-600/10 to-transparent blur-2xl" />
        <div className="relative">
          <h1 className="text-4xl font-bold tracking-tight">
            VIP Program
          </h1>
          <p className="mt-3 text-white/60 max-w-xl">
            Earn XP, level up, unlock elite rewards across PHI Casino.
          </p>
        </div>
      </div>

      {/* CURRENT STATUS */}
      <div className="rounded-2xl border border-white/10 bg-[#07070c] p-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-white/50">Your VIP Level</p>
          <p className="text-2xl font-bold mt-1">
            VIP {vipLevel}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-white/50">Total XP</p>
          <p className="text-xl font-semibold text-emerald-400">
            {xp.toLocaleString()} XP
          </p>
        </div>
      </div>

      {/* TIERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VIP_TIERS.map((tier) => {
          const active = tier.level === vipLevel;
          const unlocked = xp >= tier.minXp;

          return (
            <div
              key={tier.level}
              className={`relative rounded-2xl border p-6 bg-[#07070c] transition ${
                active
                  ? "border-purple-500 shadow-[0_0_35px_rgba(124,58,237,0.6)]"
                  : "border-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  VIP {tier.level} · {tier.name}
                </h3>
                {active && <span className="text-sm text-purple-400">ACTIVE</span>}
              </div>

              <p className="mt-2 text-sm text-white/50">
                Unlocks at {tier.minXp.toLocaleString()} XP
              </p>

              <ul className="mt-4 space-y-2 text-sm">
                {tier.perks.map((perk) => (
                  <li
                    key={perk}
                    className={`${
                      unlocked ? "text-emerald-400" : "text-white/40"
                    }`}
                  >
                    • {perk}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
