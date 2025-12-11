"use client";

import React, { useEffect, useState } from "react";
import GlassCard from "@/components/shared/GlassCard";
import OGBadge from "@/components/shared/OGBadge";

export default function ActivityFeed() {
  const [filter, setFilter] = useState("all");

  const [events, setEvents] = useState([
    {
      user: "7K Panda",
      game: "Crash",
      amount: "+$240",
      vip: "Gold",
      og: true,
      time: "10s ago",
    },
    {
      user: "SolSharp",
      game: "Plinko",
      amount: "-$25",
      vip: "Silver",
      og: false,
      time: "25s ago",
    },
    {
      user: "CryptoLion",
      game: "Coinflip",
      amount: "+$120",
      vip: "Diamond",
      og: true,
      time: "1m ago",
    },
    {
      user: "Phantom",
      game: "Limbo",
      amount: "+$42",
      vip: "Bronze",
      og: false,
      time: "2m ago",
    },
  ]);

  // AUTO ADD RANDOM EVENTS EVERY FEW SECONDS
  useEffect(() => {
    const interval = setInterval(() => {
      const users = ["SolKing", "Nebula", "Void", "Pluto", "Luna", "Whale", "Blade"];
      const games = ["Crash", "Limbo", "Plinko", "Coinflip", "Roulette"];
      const win = Math.random() > 0.4;

      const newEvent = {
        user: users[Math.floor(Math.random() * users.length)],
        game: games[Math.floor(Math.random() * games.length)],
        amount: win
          ? `+$${Math.floor(Math.random() * 300 + 20)}`
          : `-$${Math.floor(Math.random() * 50 + 5)}`,
        vip: ["Bronze", "Silver", "Gold", "Platinum"][Math.floor(Math.random() * 4)],
        og: Math.random() > 0.8,
        time: "just now",
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 25)]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const filteredEvents = events.filter((e) => {
    if (filter === "bigWins")
      return e.amount.startsWith("+$") && parseInt(e.amount.slice(2)) >= 150;

    if (filter === "highRollers")
      return ["Gold", "Platinum", "Diamond"].includes(e.vip);

    return true;
  });

  return (
    <div className="px-6 py-16 flex justify-center">
      <section className="max-w-5xl w-full space-y-16">
        {/* HEADER */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300 text-transparent bg-clip-text">
            Live Activity Feed
          </h1>
          <p className="text-white/60 text-sm max-w-xl">
            Track live bets, big wins, and high roller action across NOVUS Casino.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4">
          {[
            { id: "all", label: "All Activity" },
            { id: "bigWins", label: "Big Wins" },
            { id: "highRollers", label: "High Rollers" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-5 py-2 rounded-full text-sm transition ${
                filter === btn.id
                  ? "bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-300 text-black shadow-[0_0_18px_rgba(168,85,247,0.6)]"
                  : "bg-white/10 border border-white/10 text-white hover:bg-white/15"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* FEED */}
        <GlassCard className="p-6 rounded-3xl bg-white/5 border-white/10 space-y-4 max-h-[600px] overflow-y-auto">
          {filteredEvents.map((e, i) => (
            <GlassCard
              key={i}
              className="px-5 py-4 rounded-2xl bg-white/10 border-white/10 flex items-center justify-between hover:bg-white/15 transition"
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-300 flex items-center justify-center text-black font-bold shadow-[0_0_12px_rgba(168,85,247,0.8)]">
                  {e.user.charAt(0)}
                </div>

                <div>
                  <p className="flex items-center gap-2 text-white font-semibold">
                    {e.user}
                    {e.og && <OGBadge size="sm" />}
                  </p>
                  <p className="text-xs text-white/40">
                    Played {e.game} • {e.vip} VIP
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col items-end">
                <p
                  className={`text-lg font-bold ${
                    e.amount.startsWith("+") ? "text-emerald-300" : "text-fuchsia-300"
                  }`}
                >
                  {e.amount}
                </p>
                <p className="text-xs text-white/40">{e.time}</p>
              </div>
            </GlassCard>
          ))}
        </GlassCard>
      </section>
    </div>
  );
}
