"use client";

import { useEffect, useState } from "react";
import { useProfile } from "@/app/context/AuthContext";
import { supabase } from "@/app/lib/supabase";

export default function WalletPage() {
  const profile = useProfile();

  const [phiTx, setPhiTx] = useState<any[]>([]);
  const [xpTx, setXpTx] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    async function load() {
      const { data: phi } = await supabase
        .from("phi_transactions")
        .select("*")
        .eq("user_id", profile.id)
        .order("created_at", { ascending: false });

      const { data: xp } = await supabase
        .from("xp_transactions")
        .select("*")
        .eq("user_id", profile.id)
        .order("created_at", { ascending: false });

      setPhiTx(phi || []);
      setXpTx(xp || []);
      setLoading(false);
    }

    load();
  }, [profile]);

  if (!profile)
    return (
      <div className="flex justify-center items-center h-[60vh] text-white text-xl">
        Loading wallet...
      </div>
    );

  return (
    <main className="w-full px-6 py-12 flex flex-col items-center">

      {/* Title */}
      <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,200,0.5)]">
        PHI Wallet
      </h1>

      {/* BALANCES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">

        {/* PHI BALANCE */}
        <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-emerald-400/20 shadow-[0_0_25px_rgba(0,255,200,0.2)]">
          <h2 className="text-xl text-white mb-2">PHI Balance</h2>
          <p className="text-5xl font-bold text-emerald-300">{profile.phi}</p>
          <p className="text-gray-400 text-sm mt-2">
            ≈ ${(profile.phi * 0.5).toFixed(2)} USD
          </p>
        </div>

        {/* XP BALANCE */}
        <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.2)]">
          <h2 className="text-xl text-white mb-2">XP</h2>
          <p className="text-5xl font-bold text-cyan-300">{profile.xp}</p>
          <p className="text-gray-400 text-sm mt-2">
            Earn XP by logging in, referring users, and playing (soon).
          </p>
        </div>

      </div>

      {/* TRANSACTION HISTORY */}
      <div className="w-full max-w-4xl mt-16">

        <h2 className="text-3xl text-white font-semibold mb-6">Transaction History</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* PHI Transactions */}
          <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-emerald-400/20 shadow-[0_0_20px_rgba(0,255,200,0.15)]">
            <h3 className="text-xl text-emerald-300 mb-4">PHI Transactions</h3>

            {phiTx.length === 0 && (
              <p className="text-gray-400">No PHI transactions yet.</p>
            )}

            {phiTx.map((tx) => (
              <div key={tx.id} className="flex justify-between py-2 border-b border-white/10">
                <span className="text-gray-300">{tx.amount > 0 ? "Earned" : "Spent"}</span>
                <span className="text-emerald-300 font-semibold">{tx.amount}</span>
              </div>
            ))}
          </div>

          {/* XP Transactions */}
          <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.15)]">
            <h3 className="text-xl text-cyan-300 mb-4">XP Transactions</h3>

            {xpTx.length === 0 && (
              <p className="text-gray-400">No XP transactions yet.</p>
            )}

            {xpTx.map((tx) => (
              <div key={tx.id} className="flex justify-between py-2 border-b border-white/10">
                <span className="text-gray-300">XP Earned</span>
                <span className="text-cyan-300 font-semibold">{tx.amount}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </main>
  );
}
