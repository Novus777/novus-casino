import React, { useEffect, useState } from "react";
import GlassCard from "@/components/shared/GlassCard";
import OGBadge from "@/components/shared/OGBadge";


export default function FairnessPage() {
  return (
    <div className="px-6 py-16 flex justify-center">
      <section className="max-w-6xl w-full space-y-16">
        {/* HEADER */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-300 via-fuchsia-300 to-cyan-300 text-transparent bg-clip-text">
              Fairness & Transparency
            </h1>
            <OGBadge />
          </div>

          <p className="text-white/60 text-sm max-w-2xl">
            PHI Casino is being built as a{" "}
            <span className="text-cyan-300 font-semibold">
              transparent, on-chain, provably fair
            </span>{" "}
            crypto casino. Every result, every jackpot pool, every donation
            allocation will be verifiable on Solana.
          </p>

          <div className="flex flex-wrap gap-3 pt-2 text-[11px] text-white/60">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-[0.16em]">
              On-chain
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-[0.16em]">
              Provably Fair
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-[0.16em]">
              Open Math
            </span>
          </div>
        </div>

        {/* CORE PRINCIPLES */}
        <GlassCard className="p-8 rounded-3xl bg-white/5 border-white/10 space-y-6">
          <h2 className="text-xl font-semibold text-white">
            Our Fairness Principles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-white/70">
            <GlassCard className="p-4 rounded-2xl bg-white/10 border-white/10 space-y-2">
              <p className="font-semibold text-cyan-300">On-chain Proof</p>
              <p className="text-white/60">
                Game outcomes are committed to Solana so players can verify
                hashes, seeds, and payouts independently.
              </p>
            </GlassCard>

            <GlassCard className="p-4 rounded-2xl bg-white/10 border-white/10 space-y-2">
              <p className="font-semibold text-purple-300">Open Math</p>
              <p className="text-white/60">
                We publish the exact formulas, RTP, and edge for every game —
                no hidden odds, no silent changes.
              </p>
            </GlassCard>

            <GlassCard className="p-4 rounded-2xl bg-white/10 border-white/10 space-y-2">
              <p className="font-semibold text-emerald-300">Real Impact</p>
              <p className="text-white/60">
                Donation wallets and charity payouts are public, so the
                community can track every dollar we say we give.
              </p>
            </GlassCard>
          </div>
        </GlassCard>

        {/* HOW PROVABLY FAIR WILL WORK */}
        <GlassCard className="p-8 rounded-3xl bg-white/5 border-white/10 space-y-6">
          <h2 className="text-xl font-semibold text-white">
            How Provably Fair Will Work on PHI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-white/70">
            <div className="space-y-4">
              <p className="text-white/60">
                When the live crypto casino launches, each game round will be
                generated using a{" "}
                <span className="text-cyan-300 font-medium">
                  combination of server seed + client seed + nonce
                </span>
                .
              </p>

              <ul className="space-y-2 list-disc pl-5">
                <li>
                  PHI publishes a{" "}
                  <span className="text-purple-300 font-medium">
                    hashed server seed
                  </span>{" "}
                  before you play.
                </li>
                <li>
                  You can set your own{" "}
                  <span className="text-cyan-300 font-medium">
                    client seed
                  </span>{" "}
                  locally.
                </li>
                <li>
                  Every bet increments a{" "}
                  <span className="text-emerald-300 font-medium">nonce</span>.
                </li>
                <li>
                  After a seed cycle ends, the{" "}
                  <span className="text-fuchsia-300 font-medium">
                    raw server seed
                  </span>{" "}
                  is revealed so you can verify every round.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <GlassCard className="p-4 rounded-2xl bg-black/40 border-white/10 space-y-2">
                <p className="text-xs text-white/40 uppercase tracking-[0.18em]">
                  Example Flow (Crash / Limbo / Plinko)
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-white/70 text-sm">
                  <li>PHI publishes hash of server seed S.</li>
                  <li>You choose client seed C in your settings.</li>
                  <li>For round #n we compute H(S, C, n).</li>
                  <li>That hash is turned into a number → game result.</li>
                  <li>
                    After rotation, S is revealed so you can recalc every
                    outcome.
                  </li>
                </ol>
              </GlassCard>

              <p className="text-xs text-white/45">
                During the soft-launch demo (non-real money), results are still
                based on transparent, logged RNG so we can test and tune games
                with the community.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* ON-CHAIN & DONATIONS */}
        <GlassCard className="p-8 rounded-3xl bg-white/5 border-white/10 space-y-6">
          <h2 className="text-xl font-semibold text-white">
            On-chain Donations & Community Oversight
          </h2>

          <p className="text-white/60 text-sm max-w-3xl">
            Our promise: for every{" "}
            <span className="text-cyan-300 font-semibold">$1,000,000</span> PHI
            Casino earns,{" "}
            <span className="text-emerald-300 font-semibold">
              $500,000 goes back
            </span>{" "}
            into people and causes that actually need it — eviction help,
            recovery centers, gambling addiction support, and a community-voted
            charity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-white/70">
            <GlassCard className="p-4 rounded-2xl bg-white/10 border-white/10">
              <p className="text-white/50">Eviction relief</p>
              <p className="text-emerald-300 font-semibold">$100,000</p>
            </GlassCard>

            <GlassCard className="p-4 rounded-2xl bg-white/10 border-white/10">
              <p className="text-white/50">Random PHI players</p>
              <p className="text-cyan-300 font-semibold">$250–$400 gifts</p>
            </GlassCard>

            <GlassCard className="p-4 rounded-2xl bg-white/10 border-white/10">
              <p className="text-white/50">Recovery & rehab</p>
              <p className="text-purple-300 font-semibold">$100,000</p>
            </GlassCard>

            <GlassCard className="p-4 rounded-2xl bg-white/10 border-white/10">
              <p className="text-white/50">Community vote</p>
              <p className="text-fuchsia-300 font-semibold">$100,000</p>
            </GlassCard>
          </div>

          <p className="text-xs text-white/45">
            When we go live, donation wallets will be public and linked inside
            the app so anyone can track how much came in and where it went.
          </p>
        </GlassCard>

        {/* FAQ / DISCLAIMER */}
        <GlassCard className="p-8 rounded-3xl bg-white/5 border-white/10 space-y-5">
          <h2 className="text-xl font-semibold text-white">Status Today</h2>

          <p className="text-white/60 text-sm">
            Right now, PHI Casino is in{" "}
            <span className="text-cyan-300 font-semibold">
              UI + community-building phase
            </span>
            . The designs you’re using are for{" "}
            <span className="text-fuchsia-300 font-semibold">
              testing, feedback, and growth
            </span>{" "}
            — not real-money gambling yet.
          </p>

          <ul className="list-disc pl-5 text-xs text-white/50 space-y-1">
            <li>
              No real-money gambling is live during the demo period — it’s all
              for testing and design.
            </li>
            <li>
              The full provably fair engine and smart contracts will go live
              before any real wagers are accepted.
            </li>
            <li>
              We will share a public{" "}
              <span className="text-cyan-300">
                “Proof & Math” documentation page
              </span>{" "}
              with formulas, examples, and explorer links.
            </li>
          </ul>

          <p className="text-xs text-white/40 pt-1">
            If you ever feel something looks off, the PHI team wants to hear
            it. This casino is being built with the community — not behind
            closed doors.
          </p>
        </GlassCard>
      </section>
    </div>
  );
}
