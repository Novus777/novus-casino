"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile, useUser, useRefreshProfile } from "@/app/context/AuthContext";

type ActionState = "idle" | "loading" | "success" | "error";

export default function DashboardPage() {
  const router = useRouter();
  const user = useUser() as any;
  const profile = (useProfile() || {}) as any;
  const refreshProfile = useRefreshProfile();

  const [dailyState, setDailyState] = useState<ActionState>("idle");
  const [xpState, setXpState] = useState<ActionState>("idle");
  const [phiState, setPhiState] = useState<ActionState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  // ---------- HELPERS ----------
  const phiBalance = Number(profile?.phi ?? 0);
  const xp = Number(profile?.xp ?? 0);
  const vipLevel = Number(profile?.vip_level ?? 1);
  const streak = Number(profile?.daily_streak ?? 0);

  const nextVipThresholds = [0, 100, 500, 1500, 3000, 6000, 10000];
  const currentThreshold = nextVipThresholds[Math.max(0, vipLevel - 1)] ?? 0;
  const nextThreshold =
    nextVipThresholds[Math.min(nextVipThresholds.length - 1, vipLevel)] ??
    currentThreshold;

  const xpProgress =
    nextThreshold === currentThreshold
      ? 1
      : Math.min(
          1,
          Math.max(0, (xp - currentThreshold) / (nextThreshold - currentThreshold))
        );

  // ---------- ACTION HANDLERS ----------
  async function handleDailyReward() {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    try {
      setDailyState("loading");
      setMessage(null);

      const res = await fetch("/api/reward/daily", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to claim daily reward");
      }

      setDailyState("success");
      setMessage(`Daily reward claimed: +${data.reward} PHI (streak ${data.streak})`);
      await refreshProfile();
    } catch (err: any) {
      console.error(err);
      setDailyState("error");
      setMessage(err.message || "Something went wrong claiming daily reward");
    } finally {
      setTimeout(() => setDailyState("idle"), 1500);
    }
  }

  async function handleTestXP() {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    try {
      setXpState("loading");
      setMessage(null);

      const res = await fetch("/api/xp/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, amount: 50 }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to add XP");
      }

      setXpState("success");
      setMessage(`+${50} XP added • VIP level is now ${data.newVipLevel}`);
      await refreshProfile();
    } catch (err: any) {
      console.error(err);
      setXpState("error");
      setMessage(err.message || "Something went wrong adding XP");
    } finally {
      setTimeout(() => setXpState("idle"), 1500);
    }
  }

  async function handleTestPhiDeposit() {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    try {
      setPhiState("loading");
      setMessage(null);

      const res = await fetch("/api/phi/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, amount: 100 }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to add PHI");
      }

      setPhiState("success");
      setMessage(`+100 PHI added to your wallet for testing`);
      await refreshProfile();
    } catch (err: any) {
      console.error(err);
      setPhiState("error");
      setMessage(err.message || "Something went wrong adding PHI");
    } finally {
      setTimeout(() => setPhiState("idle"), 1500);
    }
  }

  // ---------- RENDER ----------
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
        <div className="max-w-md w-full px-6 py-8 rounded-3xl bg-slate-900/80 border border-slate-700/60 shadow-[0_0_60px_rgba(56,189,248,0.25)]">
          <h1 className="text-3xl font-semibold mb-3 text-center">
            Welcome to <span className="text-cyan-400">PHI Casino</span>
          </h1>
          <p className="text-sm text-slate-300 mb-6 text-center">
            Log in or create an account to start earning PHI, XP, and climb the VIP ladder.
          </p>
          <button
            onClick={() => router.push("/auth")}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 text-slate-950 font-semibold tracking-wide hover:brightness-110 transition"
          >
            Sign in / Sign up
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* HEADER */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">
              GM,{" "}
              <span className="text-cyan-400">
                {profile?.username || user.email?.split("@")[0] || "Phi Player"}
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Track your <span className="text-cyan-300">PHI</span>,{" "}
              <span className="text-violet-300">XP</span>, and{" "}
              <span className="text-emerald-300">VIP progress</span> in one place.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/dashboard/wallet")}
              className="px-4 py-2 rounded-2xl border border-slate-700/80 bg-slate-900/70 text-sm font-medium hover:border-cyan-400/80 hover:text-cyan-200 transition"
            >
              Open Wallet
            </button>
          </div>
        </header>

        {/* MESSAGE TOAST */}
        {message && (
          <div className="rounded-2xl border border-cyan-500/60 bg-slate-900/80 px-4 py-3 text-sm text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.25)]">
            {message}
          </div>
        )}

        {/* GRID */}
        <section className="grid gap-6 md:grid-cols-3">
          {/* PHI CARD */}
          <div className="md:col-span-2 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 p-5 shadow-[0_0_60px_rgba(6,182,212,0.35)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-300/80">
                  PHI Wallet
                </p>
                <p className="mt-3 text-4xl font-semibold">
                  {phiBalance.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  <span className="text-lg text-cyan-300/80">PHI</span>
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Use this balance to play games, enter arenas, and tip other players (coming
                  soon).
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/60 px-3 py-1 text-[11px] font-medium text-cyan-200 border border-cyan-500/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  LIVE ONCHAIN
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <ActionButton
                label="Claim Daily PHI"
                description="+100 PHI + streak bonus"
                onClick={handleDailyReward}
                state={dailyState}
              />
              <ActionButton
                label="Test +50 XP"
                description="Debug: push XP to test VIP"
                onClick={handleTestXP}
                state={xpState}
              />
              <ActionButton
                label="Test +100 PHI"
                description="Debug: add PHI to wallet"
                onClick={handleTestPhiDeposit}
                state={phiState}
              />
            </div>
          </div>

          {/* VIP BADGE */}
          <div className="rounded-3xl border border-violet-500/40 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-slate-950/90 p-5 shadow-[0_0_60px_rgba(139,92,246,0.35)] flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300/80">
                VIP Tier
              </p>
              <p className="mt-3 text-3xl font-semibold text-violet-200">
                VIP {vipLevel}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Higher VIP tiers unlock fatter rakeback, boosted rewards and private tables.
              </p>
            </div>

            <div className="mt-5">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                <span>XP {xp.toLocaleString()}</span>
                <span>
                  Next:{" "}
                  {nextThreshold > currentThreshold
                    ? nextThreshold.toLocaleString()
                    : "MAX"}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400"
                  style={{ width: `${xpProgress * 100}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-slate-400">
                You are{" "}
                <span className="text-violet-200">
                  {Math.max(0, nextThreshold - xp).toLocaleString()}
                </span>{" "}
                XP away from <span className="text-violet-200">VIP {vipLevel + 1}</span>.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span>
                Daily streak:{" "}
                <span className="text-emerald-300 font-semibold">{streak} days</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/70 px-3 py-1 border border-violet-500/40 text-violet-100">
                Φ PREMIUM
              </span>
            </div>
          </div>
        </section>

        {/* FUTURE AREA FOR GAMES / FEED */}
        <section className="mt-2 rounded-3xl border border-slate-800/80 bg-slate-950/80 px-4 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-100">
                Games & Arenas (coming next)
              </p>
              <p className="text-xs text-slate-400 mt-1">
                This section will list live games, arenas, and community challenges once we
                plug in the actual casino engine.
              </p>
            </div>
            <div className="flex gap-2 text-[11px] text-slate-400">
              <span className="rounded-full border border-slate-700/80 px-3 py-1 bg-slate-900/70">
                • Crash
              </span>
              <span className="rounded-full border border-slate-700/80 px-3 py-1 bg-slate-900/70">
                • Slots
              </span>
              <span className="rounded-full border border-slate-700/80 px-3 py-1 bg-slate-900/70">
                • Blackjack
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// ---------- SMALL REUSABLE BUTTON COMPONENT ----------

interface ActionButtonProps {
  label: string;
  description: string;
  state: ActionState;
  onClick: () => void;
}

function ActionButton({ label, description, state, onClick }: ActionButtonProps) {
  const isLoading = state === "loading";
  const isSuccess = state === "success";
  const isError = state === "error";

  let glowClass = "from-cyan-500 to-sky-500 shadow-[0_0_30px_rgba(56,189,248,0.35)]";
  if (isSuccess) {
    glowClass = "from-emerald-500 to-lime-500 shadow-[0_0_30px_rgba(52,211,153,0.35)]";
  } else if (isError) {
    glowClass = "from-rose-500 to-orange-500 shadow-[0_0_30px_rgba(248,113,113,0.35)]";
  }

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`group relative flex-1 min-w-[180px] rounded-2xl border border-slate-700/70 bg-slate-950/70 px-4 py-3 text-left text-sm transition hover:border-cyan-400/70 hover:bg-slate-900/80 ${isLoading || isSuccess || isError ? "brightness-110" : ""}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition group-hover:opacity-100 ${isSuccess || isError ? "opacity-100" : ""} bg-gradient-to-r ${glowClass}`}
      />
      <div className="relative">
        <p className="font-semibold text-slate-50">{label}</p>
        <p className="mt-0.5 text-[11px] text-slate-400">{description}</p>
        {isLoading && (
          <p className="mt-1 text-[11px] text-cyan-300">Processing onchain…</p>
        )}
        {isSuccess && (
          <p className="mt-1 text-[11px] text-emerald-300">Done ✓</p>
        )}
        {isError && (
          <p className="mt-1 text-[11px] text-rose-300">Something went wrong</p>
        )}
      </div>
    </button>
  );
}
