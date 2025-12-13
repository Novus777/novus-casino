export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/app/lib/supabase-server";

export default async function ProfilePage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, phi, xp, vip_level")
    .eq("id", user.id)
    .single();

  const username = profile?.username ?? "Anonymous";
  const phi = profile?.phi ?? 0;
  const xp = profile?.xp ?? 0;
  const vip = profile?.vip_level ?? 1;

  const vipMaxXp = 1000;
  const vipProgress = Math.min((xp / vipMaxXp) * 100, 100);

  return (
    <div className="max-w-6xl mx-auto space-y-10 text-white">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#07070c] p-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 via-cyan-600/10 to-transparent blur-2xl" />
        <div className="relative flex items-center gap-6">
          {/* Avatar */}
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_40px_rgba(124,58,237,0.6)] flex items-center justify-center text-3xl font-bold">
            {username.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {username}
            </h1>
            <p className="text-white/50 mt-1">{user.email}</p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1 text-sm border border-white/10">
              VIP Level {vip}
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat title="PHI Balance" value={phi} color="purple" />
        <Stat title="XP Earned" value={xp} color="cyan" />
        <Stat title="VIP Level" value={vip} color="emerald" />
      </div>

      {/* VIP PROGRESS */}
      <div className="rounded-2xl border border-white/10 bg-[#07070c] p-6">
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-white/70">VIP Progress</span>
          <span className="text-white/40">
            {xp} / {vipMaxXp} XP
          </span>
        </div>

        <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 shadow-[0_0_24px_rgba(124,58,237,0.6)]"
            style={{ width: `${vipProgress}%` }}
          />
        </div>
      </div>

      {/* BADGES */}
      <div className="rounded-2xl border border-white/10 bg-[#07070c] p-6">
        <h3 className="text-lg font-semibold mb-4">Badges</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Badge label="Early Access" active />
          <Badge label="Daily Grinder" />
          <Badge label="VIP Member" active />
          <Badge label="Founder" />
        </div>

        <p className="mt-4 text-xs text-white/40">
          More badges unlock as PHI Casino evolves.
        </p>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Stat({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: "purple" | "cyan" | "emerald";
}) {
  const glow = {
    purple: "shadow-[0_0_30px_rgba(124,58,237,0.35)]",
    cyan: "shadow-[0_0_30px_rgba(34,211,238,0.35)]",
    emerald: "shadow-[0_0_30px_rgba(52,211,153,0.35)]",
  };

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-[#07070c] p-6 ${glow[color]}`}
    >
      <p className="text-white/50 text-sm">{title}</p>
      <p className="text-3xl font-bold mt-2">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function Badge({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-xl px-4 py-3 text-sm text-center border ${
        active
          ? "bg-emerald-500/20 border-emerald-400/40 shadow-[0_0_18px_rgba(52,211,153,0.4)]"
          : "bg-white/5 border-white/10 text-white/40"
      }`}
    >
      {label}
    </div>
  );
}
