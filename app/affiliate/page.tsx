"use client";

import React from "react";

export default function AffiliatePage() {
  const tiers = [
    {
      name: "Tier 1",
      percent: "25%",
      volume: "$0 – $5,000 referred",
      glow: "from-purple-400 to-cyan-300",
    },
    {
      name: "Tier 2",
      percent: "30%",
      volume: "$5,000 – $25,000 referred",
      glow: "from-fuchsia-400 to-purple-300",
    },
    {
      name: "Tier 3",
      percent: "35%",
      volume: "$25,000 – $100,000 referred",
      glow: "from-cyan-400 to-emerald-300",
    },
    {
      name: "Tier 4",
      percent: "40%",
      volume: "$100,000+ referred",
      glow: "from-emerald-300 to-cyan-300",
    },
    {
      name: "OG Diamond",
      percent: "50% Lifetime",
      volume: "Demo Supporters Only",
      glow: "from-yellow-400 to-emerald-300",
      special: true,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 py-20 flex justify-center">
      <div className="max-w-6xl w-full relative">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 bg-purple-600/20 blur-[120px]" />

        {/* Header */}
        <div className="mb-12 space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            PHI{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Affiliate Program
            </span>
          </h1>

          <p className="text-white/60 max-w-2xl">
            Earn lifetime revenue share from every player you bring to PHI.  
            Payments are instant, transparent, trackable on-chain, and designed 
            for long-term affiliate growth — not exploitation.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_14px_#34d399]" />
            <p className="text-sm text-white/70">
              Affiliate system live during demo month
            </p>
          </div>
        </div>

        {/* Banner */}
        <div className="mb-16 p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-xl">
          <p className="text-white text-lg font-semibold">
            OG Affiliate Bonus: 
            <span className="text-emerald-300 font-bold"> 50% Lifetime Rev Share</span>
          </p>
          <p className="text-white/60 text-sm mt-2 max-w-2xl">
            Supporters who join during the demo month receive permanent 50%
            revenue share + priority payouts + exclusive OG badge.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-white/50 text-sm">Total Affiliate Earnings</p>
            <p className="text-3xl font-bold text-emerald-300 mt-1">$12,942</p>
            <p className="text-xs text-white/40 mt-2">Updated live</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-white/50 text-sm">Active Referrals</p>
            <p className="text-3xl font-bold text-cyan-300 mt-1">482</p>
            <p className="text-xs text-white/40 mt-2">Signed up under your code</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-white/50 text-sm">Lifetime Volume</p>
            <p className="text-3xl font-bold text-fuchsia-300 mt-1">$311,040</p>
            <p className="text-xs text-white/40 mt-2">Across all referred players</p>
          </div>
        </div>

        {/* Tiers */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-white">Revenue Share Tiers</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((t, i) => (
              <div
                key={i}
                className="relative p-6 rounded-3xl bg-black/50 border border-white/10 backdrop-blur-xl shadow-xl hover:scale-[1.03] transition"
              >
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${t.glow} opacity-20 blur-[80px]`}
                />

                <div className="relative z-10">
                  <p className="text-xl font-bold text-white flex items-center gap-2">
                    {t.name}
                    {t.special && (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-400/20 border border-yellow-300/40 text-yellow-300">
                        OG
                      </span>
                    )}
                  </p>

                  <p className="text-fuchsia-300 font-semibold mt-1">{t.percent}</p>
                  <p className="text-white/60 text-sm mt-1">{t.volume}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 p-10 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-xl">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
            How PHI Affiliate Works
          </h2>

          <ul className="mt-6 text-white/60 text-sm space-y-3">
            <li>• You earn a % of the house edge from every player you refer</li>
            <li>• Players get bonuses for signing up with your code</li>
            <li>• Earnings are tracked in real time and paid instantly</li>
            <li>• All affiliate earnings are on-chain and transparent</li>
            <li>• OG affiliates receive permanent increased revenue share</li>
          </ul>

          <button className="mt-6 w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-300 text-black font-semibold hover:scale-[1.02] transition">
            Copy Invite Link
          </button>
        </div>
      </div>
    </div>
  );
}
