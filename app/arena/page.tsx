"use client";

import React from "react";

export default function ArenaPage() {
  const categories = [
    { name: "House Games", color: "from-purple-400 to-cyan-300" },
    { name: "PvP Battles", color: "from-fuchsia-400 to-purple-300" },
    { name: "Quick Games", color: "from-cyan-400 to-emerald-300" },
    { name: "High Roller", color: "from-yellow-300 to-orange-400" },
  ];

  const games = [
    {
      name: "Crash",
      desc: "Ride the multiplier — cash out before it explodes.",
      tag: "Fast Game",
      glow: "from-purple-400 to-fuchsia-300",
    },
    {
      name: "Blackjack",
      desc: "Beat the dealer on-chain with provably fair logic.",
      tag: "House Game",
      glow: "from-emerald-400 to-cyan-300",
    },
    {
      name: "Coinflip",
      desc: "Simple. Clean. 50/50. High stakes available.",
      tag: "PvP",
      glow: "from-yellow-400 to-amber-300",
    },
    {
      name: "Plinko",
      desc: "Drop the ball through neon gates to chase multipliers.",
      tag: "Fast Game",
      glow: "from-cyan-300 to-purple-300",
    },
    {
      name: "Roulette",
      desc: "Red, Black, or Green — on-chain European roulette.",
      tag: "Classic",
      glow: "from-red-400 to-purple-400",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] py-20 px-6 flex justify-center">
      <div className="max-w-6xl w-full relative">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 bg-purple-600/20 blur-[110px]" />

        {/* HEADER */}
        <div className="mb-12 space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            PHI <span className="bg-gradient-to-r from-purple-400 to-cyan-300 text-transparent bg-clip-text">Arena</span>
          </h1>
          <p className="text-white/60 max-w-xl">
            Choose from premium house games, PvP battles, community favorites,
            and high-roller neon classics.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_14px_#34d399]" />
            <p className="text-sm text-white/70">
              <span className="text-emerald-300 font-semibold">1,207</span> players online
            </p>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
          {categories.map((c, i) => (
            <div
              key={i}
              className="relative p-5 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl cursor-pointer transition hover:scale-[1.05] shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-20 blur-[60px] rounded-2xl`}
              />

              <p className="relative z-10 text-white font-semibold text-sm text-center">
                {c.name}
              </p>
            </div>
          ))}
        </div>

        {/* GAME CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((g, i) => (
            <div
              key={i}
              className="relative bg-black/50 rounded-2xl border border-white/10 p-5 backdrop-blur-xl hover:scale-[1.03] transition cursor-pointer shadow-xl"
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${g.glow} opacity-20 blur-[60px] rounded-2xl`}
              />

              {/* Content */}
              <div className="relative z-10 space-y-3">
                <p className="text-lg font-semibold text-white">{g.name}</p>
                <p className="text-sm text-white/60">{g.desc}</p>

                <div className="inline-flex items-center gap-2 text-xs text-white/70 bg-white/10 border border-white/10 px-3 py-1 rounded-full">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
                  {g.tag}
                </div>

                <button className="w-full mt-3 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-300 text-black font-semibold hover:scale-[1.03] transition">
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* COMING SOON */}
        <div className="mt-20 p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl">
          <p className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-300 bg-clip-text text-transparent">
            Coming Soon to PHI Arena
          </p>
          <p className="text-white/60 text-sm mt-3">
            • Case Battles (PvP)  
            • Crash 2.0 with Auto-cashout Logic  
            • Slot Creator Mode  
            • Player-to-player betting  
            • Daily Community Tournaments  
          </p>
        </div>
      </div>
    </div>
  );
}
