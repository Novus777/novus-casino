"use client";

import React, { useState } from "react";
import GlassCard from "@/components/shared/GlassCard";
import OGBadge from "@/components/shared/OGBadge";

export default function BonusPage() {
  const user = {
    isOG: true,
    vipLevel: 3,
  };

  const [deposit, setDeposit] = useState(100);

  const calculateBonus = () => {
    let base = deposit * 0.30; // 30% base bonus
    let vipBoost = user.vipLevel * 0.02 * deposit; // +2% per VIP level
    let ogBoost = user.isOG ? deposit * 0.10 : 0; // +10% for OG
    return Math.round(base + vipBoost + ogBoost);
  };

  const totalBonus = calculateBonus();

  return (
    <div className="px-6 py-16 flex justify-center">
      <section className="max-w-6xl w-full space-y-16">
        {/* HEADER */}
        <div className="space-y-2 flex items-center gap-3">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300 text-transparent bg-clip-text">
            Deposit Bonuses
          </h1>
          {user.isOG && <OGBadge />}
        </div>

        <p className="text-white/60 text-sm max-w-2xl">
          Earn boosted bonuses when depositing into PHI Casino. OG Founders and VIP
          players unlock higher multipliers and special bonus tiers.
        </p>

        {/* BONUS SLIDER */}
        <GlassCard className="p-8 rounded-3xl bg-white/5 border-white/10 space-y-6">
          <h2 className="text-xl font-semibold text-white">
            Bonus Calculator
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-white/60">Deposit Amount</p>
              <p className="text-white font-semibold text-lg">${deposit}</p>
            </div>

            <input
              type="range"
              min={10}
              max={1000}
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          <div className="flex justify-between items-center pt-3">
            <p className="text-white/60 text-sm">Your Bonus</p>
            <p className="text-3xl font-semibold text-cyan-300">
              +${totalBonus}
            </p>
          </div>

          {/* OG BOOST NOTICE */}
          {user.isOG && (
            <p className="text-emerald-300 text-sm mt-2">
              OG Boost Active: +10% Bonus
            </p>
          )}

          <button className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-300 text-black font-semibold hover:scale-105 transition shadow-[0_0_22px_rgba(168,85,247,0.7)]">
            Deposit Now
          </button>
        </GlassCard>

        {/* BONUS TIERS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Bonus Tiers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <GlassCard className="p-6 rounded-2xl bg-white/5 border-white/10 space-y-2">
              <h3 className="text-lg font-semibold text-white">Standard Bonus</h3>
              <p className="text-white/50 text-sm">30% instant bonus</p>
              <p className="text-cyan-300 font-semibold">• No wager needed*</p>
            </GlassCard>

            {/* Tier 2 */}
            <GlassCard className="p-6 rounded-2xl bg-white/5 border-white/10 space-y-2">
              <h3 className="text-lg font-semibold text-white">VIP Bonus</h3>
              <p className="text-white/50 text-sm">+2% per VIP level</p>
              <p className="text-purple-300 font-semibold">• Scales as you level</p>
            </GlassCard>

            {/* Tier 3 */}
            <GlassCard className="p-6 rounded-2xl bg-white/5 border-white/10 space-y-2">
              <h3 className="text-lg font-semibold text-white">OG Founder Boost</h3>
              <p className="text-white/50 text-sm">Extra 10% bonus</p>
              <p className="text-emerald-300 font-semibold">
                • Permanent for OG members
              </p>
            </GlassCard>
          </div>
        </div>

        {/* BONUS RULES */}
        <GlassCard className="p-8 rounded-3xl bg-white/5 border-white/10 space-y-4">
          <h2 className="text-xl font-semibold text-white">Bonus Information</h2>

          <p className="text-white/60 text-sm leading-relaxed">
            PHI Casino offers fair and transparent bonuses. For the first
            30-day soft launch, all bonuses are{" "}
            <span className="text-cyan-300 font-semibold">wager-free</span>.
            After launch, bonuses may include light wagering to prevent
            abuse and protect the community pool.
          </p>

          <ul className="list-disc pl-6 text-white/50 text-sm space-y-1">
            <li>Wager-free bonuses active during soft launch</li>
            <li>VIP bonus increases as you level</li>
            <li>OG Boost applies permanently</li>
            <li>Bonuses may change after launch</li>
            <li>PHI tokens can be redeemed 1:1 for USD after launch</li>
          </ul>

          <p className="text-white/40 text-xs pt-3">
            *Wager-free bonuses are for the soft launch test period only.
            After launch, wagering requirements may apply.
          </p>
        </GlassCard>
      </section>
    </div>
  );
}
