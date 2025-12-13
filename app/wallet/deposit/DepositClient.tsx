"use client";

import { useState } from "react";

export default function DepositClient() {
  const [amount, setAmount] = useState("");

  return (
    <div className="relative rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.25)]">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/40 to-cyan-500/40 blur opacity-30" />

      <div className="relative space-y-4">
        <h2 className="text-lg font-semibold text-white">Deposit Funds</h2>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
        />

        <button
          className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 py-3 font-semibold text-white hover:opacity-90 transition"
        >
          Deposit
        </button>

        <p className="text-xs text-white/40 text-center">
          Deposits are credited instantly
        </p>
      </div>
    </div>
  );
}
