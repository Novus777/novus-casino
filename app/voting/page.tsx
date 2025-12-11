"use client";

import React, { useState } from "react";

export default function VotingCenterPage() {
  const [selected, setSelected] = useState("");

  const categories = [
    {
      id: "games",
      title: "What game should PHI add next?",
      color: "from-purple-400 to-fuchsia-300",
      options: [
        "Crash 2.0 (Auto & Smart Cashout)",
        "Roulette",
        "PvP Blackjack",
        "Case Battles",
        "Sportsbook",
      ],
    },
    {
      id: "vip",
      title: "Which VIP perk should we upgrade?",
      color: "from-cyan-400 to-purple-300",
      options: [
        "Daily Rakeback Boost",
        "Weekly Cashback Increase",
        "Monthly PHI Airdrops",
        "VIP Tournaments",
        "Reduced House Edge",
      ],
    },
    {
      id: "charity",
      title: "Where should the next $100k donation go?",
      color: "from-emerald-400 to-cyan-300",
      options: [
        "Families facing eviction",
        "Rehab centers",
        "Gambling addiction support",
        "Animal shelters",
        "Community-voted charity",
      ],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 py-20 flex justify-center">
      <div className="max-w-5xl w-full relative">
        <div className="absolute inset-0 -z-10 bg-fuchsia-600/20 blur-[120px]" />

        {/* HEADER */}
        <div className="mb-14 space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Community{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
              Voting Center
            </span>
          </h1>

          <p className="text-white/60 max-w-2xl">
            Help shape the future of PHI Casino — vote on games, VIP upgrades,
            donation categories, and platform decisions.  
            OG badges grant **2x voting power**.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_14px_#34d399]" />
            <p className="text-sm text-white/70">Voting is live now</p>
          </div>
        </div>

        {/* VOTING BOXES */}
        <div className="space-y-10">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="relative rounded-3xl p-8 border border-white/10 bg-black/60 backdrop-blur-xl shadow-xl"
            >
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${cat.color} opacity-20 blur-[80px]`}
              />

              <div className="relative z-10 space-y-6">
                {/* Title */}
                <p className="text-xl font-semibold text-white">{cat.title}</p>

                {/* Options */}
                <div className="space-y-3">
                  {cat.options.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => setSelected(opt)}
                      className={`p-4 rounded-xl transition border cursor-pointer ${
                        selected === opt
                          ? "bg-gradient-to-r from-purple-500/40 via-fuchsia-400/40 to-cyan-300/40 border-purple-300/40 shadow-lg"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <p className="text-sm text-white">{opt}</p>
                    </div>
                  ))}
                </div>

                {/* CAST VOTE */}
                <button
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-300 text-black font-semibold hover:scale-[1.02] transition"
                >
                  Cast Vote
                </button>

                <p className="text-xs text-white/40 text-center">
                  Votes are anonymous • OG votes count x2
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* LIVE RESULTS */}
        <div className="mt-20 p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl">
          <p className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
            Live Community Results
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6 text-sm">
            <div className="rounded-2xl p-5 bg-white/5 border border-white/10">
              <p className="text-white/50">Next Game</p>
              <p className="text-cyan-300 font-semibold mt-1">
                Crash 2.0 — 41%
              </p>
            </div>

            <div className="rounded-2xl p-5 bg-white/5 border border-white/10">
              <p className="text-white/50">VIP Upgrade</p>
              <p className="text-fuchsia-300 font-semibold mt-1">
                Daily Rakeback — 32%
              </p>
            </div>

            <div className="rounded-2xl p-5 bg-white/5 border border-white/10">
              <p className="text-white/50">Donation Category</p>
              <p className="text-purple-300 font-semibold mt-1">
                Community Vote — 37%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
