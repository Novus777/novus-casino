"use client";

import React from "react";

export default function ProfilePage() {
  const user = {
    name: "7K_Panda",
    og: true,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=phi", // placeholder avatar
    level: 12,
    xp: 68,
    stats: {
      wagered: "$41,920",
      biggestWin: "$4,800",
      betsPlaced: "3,492",
    },
    balances: {
      phi: "2,480 PHI",
      sol: "4.2 SOL",
      bonus: "$120 Bonus Balance",
    },
  };

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 py-20 flex justify-center">
      <div className="max-w-5xl w-full relative">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 bg-purple-600/25 blur-[120px]" />

        {/* HEADER */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          
          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-300 rounded-full blur-xl opacity-50" />
              <img
                src={user.avatar}
                alt="avatar"
                className="relative h-24 w-24 rounded-full border-2 border-white/20 shadow-xl"
              />
            </div>

            {/* Name */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>

                {user.og && (
                  <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-purple-400 to-cyan-300 text-black shadow-lg">
                    OG SUPPORTER
                  </span>
                )}
              </div>

              <p className="text-white/60 text-sm mt-2">
                Early supporter • Verified player • Level {user.level}
              </p>
            </div>
          </div>

          {/* Level Progress */}
          <div className="w-full md:w-1/3">
            <p className="text-white/70 text-sm mb-1">
              Level {user.level} — {user.xp}%
            </p>
            <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-300"
                style={{ width: `${user.xp}%` }}
              />
            </div>
          </div>
        </div>

        {/* BALANCES */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { title: "PHI Balance", value: user.balances.phi, glow: "from-purple-400 to-fuchsia-300" },
            { title: "SOL Balance", value: user.balances.sol, glow: "from-cyan-300 to-emerald-300" },
            { title: "Bonus Balance", value: user.balances.bonus, glow: "from-yellow-300 to-orange-300" },
          ].map((b, i) => (
            <div
              key={i}
              className="relative p-6 rounded-3xl bg-black/50 border border-white/10 backdrop-blur-xl shadow-xl hover:scale-[1.03] transition"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${b.glow} opacity-20 rounded-3xl blur-[70px]`} />

              <div className="relative z-10">
                <p className="text-white/50 text-sm">{b.title}</p>
                <p className="text-2xl font-bold text-white mt-2">{b.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            { title: "Total Wagered", value: user.stats.wagered },
            { title: "Biggest Win", value: user.stats.biggestWin },
            { title: "Bets Placed", value: user.stats.betsPlaced },
          ].map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
            >
              <p className="text-white/50 text-sm">{s.title}</p>
              <p className="text-2xl font-bold text-cyan-300 mt-2">{s.value}</p>
            </div>
          ))}
        </div>

        {/* BADGES */}
        <div className="p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-xl">
          <h2 className="text-xl font-semibold text-white">Badges</h2>

          <div className="flex flex-wrap gap-4 mt-6">
            {/* OG Badge */}
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-400 to-cyan-300 text-black font-semibold shadow-lg">
              OG SUPPORTER
            </div>

            <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white/80">
              High Roller
            </div>

            <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white/80">
              Early Tester
            </div>

            <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white/80">
              Community Helper
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
