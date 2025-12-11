"use client";

import React from "react";

export default function VIPPage() {
  const tiers = [
    {
      name: "Bronze",
      percent: "5% monthly rakeback",
      volume: "$0 – $1,000",
      glow: "from-[#5f5f5f] to-[#8f8f8f]",
    },
    {
      name: "Silver",
      percent: "8% monthly rakeback",
      volume: "$1,000 – $10,000",
      glow: "from-[#7f7f7f] to-[#cfcfcf]",
    },
    {
      name: "Gold",
      percent: "12% monthly rakeback",
      volume: "$10,000 – $50,000",
      glow: "from-yellow-400 to-amber-300",
    },
    {
      name: "Platinum",
      percent: "20% monthly rakeback",
      volume: "$50,000 – $250,000",
      glow: "from-indigo-400 to-cyan-300",
    },
    {
      name: "Diamond",
      percent: "30% monthly rakeback",
      volume: "$250,000+",
      glow: "from-purple-400 to-fuchsia-300",
    },
    {
      name: "Diamond OG",
      percent: "40% lifetime rakeback + OG Badge",
      volume: "Demo Supporters Only",
      glow: "from-emerald-400 to-cyan-300",
      special: true,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] py-20 px-6 flex justify-center">
      <div className="max-w-6xl w-full relative">
        <div className="absolute -inset-40 bg-fuchsia-600/20 blur-[120px] pointer-events-none" />

        {/* HEADER */}
        <div className="relative mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            PHI <span className="bg-gradient-to-r from-purple-400 to-fuchsia-300 bg-clip-text text-transparent">VIP Program</span>
          </h1>
          <p className="text-white/60 mt-3 max-w-2xl">
            Earn <span className="text-fuchsia-300">real monthly rakeback</span>, unlock exclusive benefits,
            and climb the PHI ladder — designed for long-term players, not whales.
          </p>
          <p className="text-emerald-300 text-sm mt-2">
            OG Supporters (Demo Month Buyers) get permanent 40% rakeback + an exclusive badge.
          </p>
        </div>

        {/* TIERS GRID */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className="relative p-6 rounded-3xl border border-white/10 bg-black/60 shadow-xl overflow-hidden group hover:scale-[1.02] transition"
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 opacity-20 bg-gradient-to-br ${tier.glow} blur-[60px]`}
              />

              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-white">
                  {tier.name}
                  {tier.special && (
                    <span className="ml-2 text-xs px-2 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/50 text-emerald-300">
                      OG
                    </span>
                  )}
                </h2>

                <p className="text-fuchsia-300 font-medium mt-2 text-sm">
                  {tier.percent}
                </p>

                <p className="text-white/50 text-sm mt-1">{tier.volume}</p>

                {tier.special && (
                  <p className="text-emerald-300 text-xs mt-3">
                    Lifetime rewards • No expiration • Early supporter status
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* EXPLANATION BOX */}
        <div className="relative mt-16 p-8 rounded-3xl border border-white/10 bg-black/50">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-300 bg-clip-text text-transparent">
            How VIP Works
          </h3>
          <p className="text-white/60 mt-3 leading-relaxed">
            PHI rewards consistency, not just high rollers. Every bet contributes to your{" "}
            <span className="text-fuchsia-300">monthly volume</span>, which determines your tier and
            <span className="text-emerald-300"> monthly rakeback payout</span>.
          </p>

          <ul className="mt-4 space-y-2 text-white/50 text-sm">
            <li>• Monthly volume resets on the 1st of each month</li>
            <li>• Rakeback is credited instantly upon claim</li>
            <li>• OG supporters get a permament 40% rakeback even if they stop playing</li>
          </ul>

          {/* Demo month note */}
          <div className="mt-8 rounded-2xl p-5 bg-purple-950/40 border border-purple-400/20">
            <p className="text-sm text-purple-300 font-medium">
              🌟 PHI Demo Month Supporters
            </p>
            <p className="text-white/60 text-sm mt-1">
              Anyone who buys demo access during the first 30 days receives:
            </p>

            <ul className="mt-2 text-white/60 text-sm space-y-1">
              <li>• Permanent Diamond OG tier (40% rakeback)</li>
              <li>• Exclusive OG badge on profile</li>
              <li>• Priority voting power</li>
              <li>• Redeem PHI 1:1 for USD at launch</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
