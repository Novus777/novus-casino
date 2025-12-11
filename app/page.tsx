"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const goToPlay = () => router.push("/crash");  // Change route anytime
  const goToDemoBuy = () => router.push("/buy-demo");

  return (
    <div className="min-h-screen px-6 py-20 flex justify-center">
      <div className="max-w-7xl w-full relative">

        {/* BACKGROUND GLOW */}
        <div className="absolute -inset-40 bg-purple-500/20 blur-[130px] pointer-events-none" />

        {/* HERO SECTION */}
        <section className="relative mb-24 grid md:grid-cols-2 gap-14 md:gap-24">

          {/* LEFT SIDE */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-black leading-tight text-white">
              The First{" "}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Community-Built
              </span>{" "}
              Crypto Casino.
            </h1>

            <p className="text-white/70 text-lg max-w-xl">
              PHI Casino is a transparent on-chain gaming platform built with
              the community — not against it. Every demo player becomes a
              founder-level OG supporter and helps shape the final casino
              launching next month.
            </p>

            <div className="space-y-4 text-white/65 text-sm">
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
                Fully on-chain • Solana powered • Transparent odds
              </p>
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7]" />
                Demo Month = 1:1 PHI → USD Redemption
              </p>
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_#34d399]" />
                50%+ of net profits go to real people & charities
              </p>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={goToPlay}
                className="px-10 py-3 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-300 text-black text-lg font-bold shadow-[0_0_25px_rgba(168,85,247,0.7)] hover:scale-[1.05] transition"
              >
                Start Playing
              </button>

              <button
                onClick={goToDemoBuy}
                className="px-10 py-3 rounded-full bg-white/10 border border-white/15 text-white/70 hover:bg-white/20 transition"
              >
                Buy Demo Access
              </button>
            </div>

            {/* CHARITY MESSAGE */}
            <div className="mt-6 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-xl space-y-2">
              <p className="text-white font-semibold">
                🌍 Changing Lives With Every Bet
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                For every $1,000,000 PHI Casino earns, we donate{" "}
                <span className="text-emerald-300 font-bold">$500,000</span>:
              </p>
              <ul className="text-white/50 text-sm space-y-1">
                <li>• $100k to families facing eviction</li>
                <li>• $100k to rehab & addiction programs</li>
                <li>• $100k to gambling addiction support</li>
                <li>• $100k to animal or community charities</li>
                <li>• $100k voted by PHI members</li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE — METRICS CARD */}
          <div className="relative">
            <div className="absolute -inset-20 bg-fuchsia-400/20 blur-[130px]" />

            <div className="relative p-8 rounded-[2.3rem] bg-black/50 border border-white/10 backdrop-blur-xl shadow-xl space-y-10">
              
              {/* Metrics */}
              <div className="space-y-4">
                <p className="text-white/50 text-xs tracking-widest uppercase">
                  Live Metrics
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/50">Players Online</p>
                    <p className="text-3xl font-bold text-white">1,207</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-300 to-purple-400 flex items-center justify-center text-black font-bold text-xl shadow-xl">
                    Φ
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-xs text-white/50">Total Wagered</p>
                    <p className="text-lg font-semibold text-white">$8.7M</p>
                  </div>

                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-xs text-white/50">Jackpot Pool</p>
                    <p className="text-lg font-semibold text-fuchsia-300">$312k</p>
                  </div>

                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-xs text-white/50">VIP Boost</p>
                    <p className="text-lg font-semibold text-cyan-300">x3</p>
                  </div>
                </div>
              </div>

              {/* Game Previews */}
              <div className="space-y-3">
                <p className="text-white/60 text-sm">Trending Games</p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Crash", color: "from-purple-400 to-fuchsia-300" },
                    { name: "Blackjack", color: "from-emerald-400 to-cyan-300" },
                  ].map((g, i) => (
                    <div
                      key={i}
                      className="relative p-4 rounded-xl bg-white/10 border border-white/10 hover:scale-[1.03] transition cursor-pointer"
                    >
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${g.color} opacity-20 blur-[60px]`}
                      />
                      <p className="relative z-10 text-white font-semibold">
                        {g.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-white/40 text-center pt-2">
                PHI Casino is in pre-launch demo mode. All UI is live, games
                activate at launch.
              </p>
            </div>
          </div>
        </section>

        {/* COMING SOON */}
        <section className="mt-32 p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
            Coming Soon to PHI
          </h2>

          <ul className="text-white/60 text-sm mt-4 space-y-2">
            <li>• Crash 2.0 with Auto-Cashout</li>
            <li>• PvP Blackjack and Case Battles</li>
            <li>• Player-to-player betting</li>
            <li>• Missions & Daily Rewards</li>
            <li>• Full On-Chain Bet Explorer</li>
            <li>• PHI Token Launch + Airdrops</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
