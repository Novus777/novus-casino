export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

type Leader = {
  id: string;
  username: string | null;
  phi: number;
};

export default async function LeaderboardPage() {
  const supabase = supabaseServer(); // ✅ FIXED (no await)

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: leaders, error } = await supabase
    .from("profiles")
    .select("id, username, phi")
    .order("phi", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Leaderboard error:", error);
  }

  const list: Leader[] = leaders ?? [];

  return (
    <div className="space-y-8 max-w-5xl text-white">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#07070c] p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/25 via-cyan-600/10 to-transparent blur-2xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
          <p className="mt-2 text-white/50">
            Top PHI holders across PHI Casino.
          </p>
        </div>
      </div>

      {/* PODIUM */}
      {list.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Podium place="2nd" user={list[1]} glow="cyan" />
          <Podium place="1st" user={list[0]} glow="purple" crown />
          <Podium place="3rd" user={list[2]} glow="emerald" />
        </div>
      )}

      {/* LIST */}
      <div className="rounded-2xl border border-white/10 bg-[#07070c] overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 text-xs text-white/40 border-b border-white/10">
          <div className="col-span-2">Rank</div>
          <div className="col-span-6">User</div>
          <div className="col-span-4 text-right">PHI</div>
        </div>

        {list.length > 3 &&
          list.slice(3).map((u, index) => (
            <Row
              key={u.id}
              rank={index + 4}
              username={u.username}
              phi={u.phi}
            />
          ))}

        {list.length === 0 && (
          <div className="px-6 py-8 text-white/40 text-sm">
            No leaderboard data yet.
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Podium({
  place,
  user,
  glow,
  crown = false,
}: {
  place: string;
  user: Leader;
  glow: "purple" | "cyan" | "emerald";
  crown?: boolean;
}) {
  const glowMap: Record<string, string> = {
    purple: "shadow-[0_0_40px_rgba(124,58,237,0.55)]",
    cyan: "shadow-[0_0_40px_rgba(34,211,238,0.45)]",
    emerald: "shadow-[0_0_40px_rgba(52,211,153,0.45)]",
  };

  return (
    <div
      className={`relative rounded-3xl border border-white/10 bg-[#07070c] p-6 text-center ${glowMap[glow]}`}
    >
      {crown && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl">
          👑
        </div>
      )}
      <div className="text-sm text-white/40">{place}</div>
      <div className="mt-2 text-xl font-bold">
        {user.username ?? "Anonymous"}
      </div>
      <div className="mt-1 text-sm text-white/50">
        {user.phi.toLocaleString()} PHI
      </div>
    </div>
  );
}

function Row({
  rank,
  username,
  phi,
}: {
  rank: number;
  username: string | null;
  phi: number;
}) {
  return (
    <div className="grid grid-cols-12 px-6 py-4 items-center border-t border-white/5 hover:bg-white/5 transition">
      <div className="col-span-2 text-white/60">#{rank}</div>
      <div className="col-span-6 font-medium">
        {username ?? "Anonymous"}
      </div>
      <div className="col-span-4 text-right text-emerald-400 font-semibold">
        {phi.toLocaleString()} PHI
      </div>
    </div>
  );
}
