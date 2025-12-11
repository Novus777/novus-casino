"use client";

import React, { useState } from "react";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");

  const handleWithdraw = () => {
    if (!amount || !address) {
      setStatus("Please enter a valid amount and wallet address.");
      return;
    }

    setStatus("Processing withdrawal…");

    setTimeout(() => {
      setStatus("Success! Your withdrawal request has been submitted.");
    }, 1500);
  };

  return (
    <div className="flex justify-center px-6 py-16">
      <div className="max-w-lg w-full space-y-8 bg-black/30 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(147,51,234,0.35)]">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Withdraw <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">PHI</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-white/60 text-sm leading-relaxed">
          Withdraw your PHI tokens or SOL directly to your connected wallet.
          All withdrawals are processed securely and verified on-chain.
        </p>

        {/* INPUT: AMOUNT */}
        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">Amount</label>
          <input
            type="number"
            placeholder="Enter amount…"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-[2px] focus:ring-purple-500"
          />
        </div>

        {/* INPUT: WALLET ADDRESS */}
        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">Wallet Address</label>
          <input
            type="text"
            placeholder="Enter your Solana wallet address…"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-[2px] focus:ring-cyan-400"
          />
        </div>

        {/* WITHDRAW BUTTON */}
        <button
          onClick={handleWithdraw}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-300 text-black font-semibold shadow-[0_0_25px_rgba(168,85,247,0.7)] hover:scale-[1.03] transition"
        >
          Withdraw
        </button>

        {/* STATUS MESSAGE */}
        {status && (
          <p className="text-center text-sm text-white/70 pt-2">{status}</p>
        )}

        {/* SAFETY NOTE */}
        <p className="text-xs text-white/40 pt-4 text-center">
          Withdrawals may require verification for security purposes.
        </p>
      </div>
    </div>
  );
}
