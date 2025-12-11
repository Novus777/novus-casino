"use client";

import { useProfile } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import SpendPhiModal from "@/app/components/SpendPhiModal";
import { getVipName, getVipGradient } from "@/app/lib/vip";

export default function DashboardPage() {
  const profile = useProfile();
  const [transactions, setTransactions] = useState([]);
  const [showSpend, setShowSpend] = useState(false);

  // Fetch last PHI transactions
  useEffect(() => {
    async function load() {
      if (!profile?.id) return;

      const res = await fetch(`/api/phi/transactions?user=${profile.id}`);
      const json = await res.json();
      setTransactions(json.data || []);
    }

    load();
  }, [profile?.id]);

  if (!profile)
    return (
      <div className="text-white flex justify-center items-center h-[70vh]">
        Loading dashboard...
      </div>
    );

  return (
    <main className="w-full px-6 py-10 space-y-10">

      {/* Title */}
      <h1 className="text-4xl font-bold text-white">
        Welcome back, <span className="text-emerald-400">{profile.username}</span>
      </h1>

      {/* GRID: PHI, XP, VIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* PHI Wallet */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
          <h2 className="text-xl text-white/80 mb-1">PHI Balance</h2>
          <p className="text-4xl font-bold text-emerald-400">{profile.phi} Φ</p>
          <p className="text-gray-400 text-sm mt-1">
            ≈ ${(profile.phi * 0.5).toFixed(2)} USD
          </p>

          {/* Spend PHI Button */}
          <button
            onClick={() => setShowSpend(true)}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-black font-bold shadow-lg hover:shadow-xl transition"
          >
            Buy XP Boost – 25 Φ
          </button>
        </div>

        {/* XP */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
          <h2 className="text-xl text-white/80 mb-1">Your XP</h2>
          <p className="text-4xl font-bold text-cyan-400">{profile.xp}</p>

          <Link href="/dashboard/vip">
            <p className="text-cyan-400 text-sm underline mt-2 cursor-pointer">
              View VIP Progress →
            </p>
          </Link>
        </div>

        {/* VIP LEVEL */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-center">
          <p className="text-white/80 mb-2">VIP Status</p>

          <div
            className={`inline-block px-4 py-2 rounded-xl text-black text-lg font-bold bg-gradient-to-r ${getVipGradient(
              profile.vip_level
            )}`}
          >
            {getVipName(profile.vip_level)}
          </div>
        </div>
      </div>

      {/* RECENT PHI TRANSACTIONS */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
        <h2 className="text-2xl text-white font-semibold mb-4">
          Recent PHI Transactions
        </h2>

        {transactions.length === 0 ? (
          <p className="text-white/50">No transactions yet.</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between border-b border-white/10 pb-2"
              >
                <span className="text-white/80 capitalize">{tx.reason}</span>
                <span
                  className={`font-bold ${
                    tx.type === "add" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {tx.type === "add" ? "+" : "-"}
                  {tx.amount} Φ
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SPEND MODAL */}
      {showSpend && (
        <SpendPhiModal
          amount={25}
          reason="XP Boost"
          onClose={() => setShowSpend(false)}
        />
      )}

    </main>
  );
}
