"use client";

import React, { useState } from "react";

export default function DepositPage() {
  const [currency, setCurrency] = useState<"SOL" | "USDC">("SOL");
  const [amount, setAmount] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);

  const quickAmounts = ["25", "50", "100", "250", "500"];

  const handleQuickAmount = (value: string) => {
    setAmount(value);
  };

  const handleDeposit = () => {
    if (!isConnected) return;
    if (!amount || Number(amount) <= 0) return;

    // Placeholder – real on-chain deposit logic will go here
    alert(
      `Deposit request submitted:\n${amount} ${currency} into your PHI wallet.`
    );
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-16">
      <div className="relative max-w-3xl w-full">
        {/* soft glow */}
        <div className="absolute -inset-32 bg-purple-500/20 blur-[120px] pointer-events-none" />

        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-black/70 via-slate-950/80 to-purple-950/60 p-8 md:p-10 shadow-[0_0_60px_rgba(0,0,0,0.7)]">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-white/40">
                Wallet
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold mt-1">
                Deposit into{" "}
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  PHI Balance
                </span>
              </h1>
              <p className="text-sm text-white/55 mt-2 max-w-xl">
                Fund your PHI Casino wallet in seconds. All deposits stay
                non-custodial and on-chain — you stay in control while PHI
                tracks your balance for games, rewards, and rakeback.
              </p>
            </div>

            <div className="flex flex-col items-end gap-1 text-right">
              <p className="text-xs text-emerald-400/90">
                0% deposit fee • instant credit
              </p>
              <p className="text-[11px] text-white/40 max-w-xs">
                During the pre-launch demo,{" "}
                <span className="text-emerald-300 font-medium">
                  1 PHI = 1 USD value
                </span>{" "}
                redeemable at launch.
              </p>
            </div>
          </div>

          {/* Currency toggle */}
          <div className="inline-flex rounded-full bg-white/5 border border-white/10 p-1 mb-6">
            {(["SOL", "USDC"] as const).map((c) => {
              const active = currency === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`px-4 py-1.5 text-xs md:text-sm rounded-full transition flex items-center gap-1 ${
                    active
                      ? "bg-gradient-to-r from-purple-500 to-fuchsia-400 text-white shadow-[0_0_18px_rgba(168,85,247,0.7)]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      active ? "bg-emerald-400" : "bg-white/30"
                    }`}
                  />
                  {c === "SOL" ? "Solana (SOL)" : "USDC on Solana"}
                </button>
              );
            })}
          </div>

          {/* Amount + quick buttons */}
          <div className="space-y-4 mb-8">
            <label className="flex justify-between items-end">
              <span className="text-sm text-white/80">Deposit amount</span>
              <span className="text-[11px] text-white/40">
                Min 10 {currency} • Max 10,000 {currency}
              </span>
            </label>

            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-2xl bg-black/60 border border-white/15 px-4 py-3 pr-28 text-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/60"
                placeholder={`Enter ${currency} amount`}
              />
              <div className="absolute inset-y-1 right-1 flex items-center">
                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 mr-1.5">
                  {currency}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuickAmount(val)}
                  className="px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition"
                >
                  {val} {currency}
                </button>
              ))}
            </div>
          </div>

          {/* Wallet + Deposit actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsConnected((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                  isConnected
                    ? "bg-emerald-500/20 border border-emerald-400/70 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.6)]"
                    : "bg-white/5 border border-white/15 text-white/80 hover:bg-white/10"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
                {isConnected ? "Wallet connected" : "Connect wallet"}
              </button>

              <button
                type="button"
                onClick={handleDeposit}
                disabled={!isConnected || !amount || Number(amount) <= 0}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-300 shadow-[0_0_32px_rgba(168,85,247,0.8)] disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] transition"
              >
                Confirm deposit
              </button>
            </div>

            <div className="text-[11px] text-white/40 max-w-xs">
              During the **demo month**, deposits simulate real value. At full
              launch, your PHI balance becomes redeemable 1:1 in USD value or
              can be used directly for games and tipping other players.
            </div>
          </div>

          {/* Safety + charity note */}
          <div className="mt-4 border-t border-white/10 pt-4 grid gap-3 md:grid-cols-2 text-[11px] text-white/45">
            <p>
              🔒 PHI never touches your private keys. Deposits are processed via
              on-chain smart contracts; you can verify every transaction
              yourself.
            </p>
            <p>
              💜 A portion of all net profit goes to{" "}
              <span className="text-emerald-300 font-medium">
                families facing eviction, rehab centers, gambling addiction
                support, and community-voted charities.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
