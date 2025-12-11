"use client";

import React from "react";

export default function LeaderboardPage() {
  const leaderboard = [
    {
      rank: 1,
      name: "LuckyByte",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=byte",
      wagered: "$92,400",
      winnings: "$14,200",
      level: 27,
    },
    {
      rank: 2,
      name: "ShadowWolf",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=wolf",
      wagered: "$71,900",
      winnings: "$11,480",
      level: 24,
    },
    {
      rank: 3,
      name: "NeonAce",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=ace",
      wagered: "$64,200",
      winnings: "$9,720",
      level: 22,
    },
    {
      rank: 4,
      name: "Panda7K",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=panda",
      wagered: "$51,300",
      winnings: "$8,300",
      level: 19,
    },
    {
      rank: 5,
      name: "Omega",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=omega",
      wagered: "$44,700",
      winnings: "$6,880",
      level: 18,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 py-20 flex justify-center">
      <div className="max-w-5xl w-full relative">

        {/* Background Glow */}
        <div className="absolute -inset-20 bg-purple-500/30 blur-[140px] pointer-events-none" />

        {/* Header */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white">
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              Leaderboards
            </span>
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            Track the best players on PHI Casino. Rankings based on wagered
            volume, winnings, and account level.
          </p>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-4">
          {leaderboard.map((player, i) => (
            <div
              key={i}
              className="relative p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-xl hover:scale-[1.01] transition cursor-pointer"
            >
              {/* Glow */}
              {player.rank <= 3 && (
                <div
                  className={`absolute inset-0 rounded-3xl blur-[100px] opacity-25 ${
                    player.rank === 1
                      ? "bg-yellow-300"
                      : player.rank === 2
                      ? "bg-gray-300"
                      : "bg-orange-400"
                  }`}
                />
              )}

              <div className="relative flex items-center justify-between">

                {/* Left Side */}
                <div className="flex items-center gap-5">

                  {/* Rank */}
                  <div
                    className={`text-3xl font-black ${
                      player.rank === 1
                        ? "text-yellow-300"
                        : player.rank === 2
                        ? "text-gray-300"
                        : player.rank === 3
                        ? "text-orange-400"
                        : "text-white/40"
                    }`}
                  >
                    #{player.rank}
                  </div>

                  {/* Avatar */}
                  <img
                    src={player.avatar}
                    alt="avatar"
                    className="h-14 w-14 rounded-full border border-white/20 shadow-lg"
                  />

                  {/* Name + Stats */}
                  <div>
                    <p className="text-white font-semibold">{player.name}</p>
                    <p className="text-white/50 text-sm mt-1">
                      Level {player.level}
                    </p>
                  </div>
                </div>

                {/* Right Side Stats */}
                <div className="text-right">
                  <p className="text-white/50 text-xs">Wagered</p>
                  <p className="text-white font-semibold">{player.wagered}</p>

                  <p className="text-white/50 text-xs mt-3">Winnings</p>
                  <p className="text-cyan-300 font-semibold">
                    {player.winnings}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-center text-white/40 text-xs mt-12">
          Stats update every 5 minutes. Full on-chain bet explorer arriving soon.
        </p>
      </div>
    </div>
  );
}
