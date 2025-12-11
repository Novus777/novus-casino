"use client";

import React, { useState } from "react";

export default function VSPage() {
  const [battles] = useState([
    {
      id: "B-1023",
      players: ["ShadowWolf", "LuckyByte"],
      wager: "25 PHI",
      status: "LIVE",
    },
    {
      id: "B-1024",
      players: ["CryptoKing", "NeonAce"],
      wager: "10 PHI",
      status: "Waiting",
    },
    {
      id: "B-1025",
      players: ["Omega", "—"],
      wager: "50 PHI",
      status: "Open",
    },
  ]);

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 py-20 flex justify-center">
      <div className="max-w-6xl w-full relative">

        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 -z-10 bg-fuchsia-400/20 blur-[130px]" />

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white">
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              VS Arena
            </span>
          </h1>
          <p className="text-white/60 mt-3 max-w-xl">
            Challenge players, create your own battles, or join live PvP games.
            Winner takes all.
          </p>
        </div>

        {/* CREATE BATTLE CARD */}
        <div className="p-8 rounded-3xl bg-black/50 border border-white/10 backdrop-blur-xl shadow-xl mb-20">
          <h2 className="text-2xl font-semibold text-white">Create Battle</h2>

          <div className="grid md:grid-cols-3 gap-6 mt-6">

            {/* WAGER */}
            <div>
              <label className="text-white/60 text-sm">Wager Amount</label>
              <input
                type="number"
                className="w-full px-4 py-3 mt-2 bg-white/10 border border-white/10 rounded-xl text-white focus:outline-none focus:ring focus:ring-purple-500/30"
                placeholder="Enter PHI"
              />
            </div>

            {/* GAME MODE */}
            <div>
              <label className="text-white/60 text-sm">Game Type</label>
              <select className="w-full px-4 py-3 mt-2 bg-white/10 border border-white/10 rounded-xl text-white focus:outline-none">
                <option>Blackjack Battle</option>
                <option>Case VS Mode</option>
                <option>High Card Duel</option>
              </select>
            </div>

            {/* CTA */}
            <div className="flex items-end">
              <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-300 text-black font-semibold hover:scale-[1.03] transition shadow-lg">
                Create Battle
              </button>
            </div>
          </div>
        </div>

        {/* LIVE BATTLES */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Live Battles</h2>

          {battles.map((battle, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-xl hover:scale-[1.01] transition cursor-pointer"
            >
              {/* ID + STATUS */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-white/40 text-sm">ID: {battle.id}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    battle.status === "LIVE"
                      ? "bg-red-400 text-black"
                      : battle.status === "Waiting"
                      ? "bg-yellow-300 text-black"
                      : "bg-cyan-300 text-black"
                  }`}
                >
                  {battle.status}
                </span>
              </div>

              {/* PLAYERS */}
              <div className="grid grid-cols-3 gap-4 items-center">

                {/* PLAYER 1 */}
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-400 shadow-lg mb-2" />
                  <p className="text-white font-semibold">{battle.players[0]}</p>
                </div>

                {/* VS */}
                <div className="text-center">
                  <p className="text-cyan-300 font-bold text-3xl">VS</p>
                  <p className="text-white/60 text-sm mt-1">{battle.wager}</p>
                </div>

                {/* PLAYER 2 */}
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-300 to-emerald-400 shadow-lg mb-2" />
                  <p className="text-white font-semibold">
                    {battle.players[1]}
                  </p>
                </div>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex justify-center gap-4 mt-8">
                {battle.status === "Open" && (
                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-300 to-purple-400 text-black font-bold hover:scale-[1.05] transition">
                    Join Battle
                  </button>
                )}

                <button className="px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-white/80 hover:bg-white/20 transition">
                  Spectate
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
