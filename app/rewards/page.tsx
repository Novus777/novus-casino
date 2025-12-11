"use client";

import React, { useState } from "react";
import GlassCard from "@/components/shared/GlassCard";
import OGBadge from "@/components/shared/OGBadge";


export default function RewardsPage() {
  const user = {
    isOG: true,
    streak: 4,
    phi: 320,
    xp: 180,
  };

  const [missions, setMissions] = useState([
    {
      id: 1,
      title: "Play 3 Games",
      description: "Complete 3 rounds across any game mode.",
      rewardXP: 30,
      rewardPHI: 10,
      progress: 2,
      goal: 3,
      claimed: false,
      type: "Daily",
    },
    {
      id: 2,
      title: "Win a PvP Arena Match",
      description: "Win 1 match inside the Arena.",
      rewardXP: 50,
      rewardPHI: 20,
      progress: 0,
      goal: 1,
      claimed: false,
      type: "Daily",
    },
    {
      id: 3,
      title: "Refer 1 New Player",
      description: "Invite a new player who signs up.",
      rewardXP: 100,
      rewardPHI: 30,
      progress: 0,
      goal: 1,
      claimed: false,
      type: "Weekly",
    },
    {
      id: 4,
      title: "Wager $200 Total",
      description: "Across any game type or PvP mode.",
      rewardXP: 200,
      rewardPHI: 60,
      progress: 120,
      goal: 200,
      claimed: false,
      type: "Weekly",
    },
    {
      id: 5,
      title: "7-Day Streak",
      description: "Log in every day for 7 days.",
      rewardXP: 300,
      rewardPHI: 100,
      progress: user.streak,
      goal: 7,
      claimed: false,
      type: "Monthly",
    },
  ]);

  const claimMission = (id: number) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, claimed: true } : m
      )
    );
  };

  return (
    <div className="px-6 py-16 flex justify-center">
      <section className="max-w-6xl w-full space-y-16">
        {/* HEADER */}
        <div className="space-y-2 flex items-center gap-3">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300 text-transparent bg-clip-text">
            Rewards & Missions
          </h1>
          {user.isOG && <OGBadge />}
        </div>

        <p className="text-white/60 max-w-2xl text-sm">
          Complete missions to earn XP, PHI tokens, and exclusive bonuses.
          OG Founders earn <span className="text-cyan-300 font-semibold">+20% extra rewards</span>.
        </p>

        {/* USER STATS */}
        <GlassCard className="p-8 rounded-3xl bg-white/5 border-white/10 flex items-center justify-between flex-wrap gap-6">
          {/* Streak */}
          <div className="space-y-1">
            <p className="text-white/40 text-xs">Login Streak</p>
            <p className="text-3xl font-semibold text-white">{user.streak} Days</p>
          </div>

          {/* XP */}
          <div className="space-y-1">
            <p className="text-white/40 text-xs">Total XP</p>
            <p className="text-3xl font-semibold text-cyan-300">{user.xp}</p>
          </div>

          {/* PHI */}
          <div className="space-y-1">
            <p className="text-white/40 text-xs">PHI Tokens</p>
            <p className="text-3xl font-semibold text-purple-300">{user.phi}</p>
          </div>
        </GlassCard>

        {/* MISSION SECTIONS */}
        {["Daily", "Weekly", "Monthly"].map((type) => (
          <div key={type} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">{type} Missions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {missions
                .filter((m) => m.type === type)
                .map((m) => {
                  const percent = Math.round((m.progress / m.goal) * 100);

                  return (
                    <GlassCard
                      key={m.id}
                      className="p-6 rounded-3xl bg-white/5 border-white/10 space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-white">{m.title}</h3>
                      <p className="text-white/50 text-sm">{m.description}</p>

                      {/* Progress bar */}
                      <div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-300 transition-all"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-white/40 mt-1">
                          {m.progress}/{m.goal}
                        </p>
                      </div>

                      {/* Rewards */}
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-cyan-300 font-semibold">
                          +{m.rewardXP} XP
                        </span>
                        <span className="text-purple-300 font-semibold">
                          +{m.rewardPHI} PHI
                        </span>

                        {user.isOG && (
                          <span className="text-emerald-300 text-xs">
                            +20% OG Boost
                          </span>
                        )}
                      </div>

                      {/* Claim button */}
                      <button
                        onClick={() => claimMission(m.id)}
                        disabled={percent < 100 || m.claimed}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                          m.claimed
                            ? "bg-white/10 text-white/30 border border-white/10 cursor-not-allowed"
                            : percent < 100
                            ? "bg-white/10 text-white/40 border border-white/10 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-300 text-black shadow-[0_0_18px_rgba(168,85,247,0.7)] hover:scale-105"
                        }`}
                      >
                        {m.claimed
                          ? "Claimed"
                          : percent < 100
                          ? "In Progress"
                          : "Claim Reward"}
                      </button>
                    </GlassCard>
                  );
                })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
