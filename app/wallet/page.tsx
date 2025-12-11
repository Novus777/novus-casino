"use client";

import { useUser, useProfile } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import { getPhiHistory } from "@/app/lib/wallet";

function formatDate(date: string) {
  return new Date(date).toLocaleString();
}

export default function WalletPage() {
  const user = useUser();
  const profile = useProfile();

  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    async function load() {
      const data = await getPhiHistory(user.id);
      setHistory(data);
      setLoading(false);
    }
    load();
  }, [user]);

  if (!user || !profile)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading Wallet...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-6">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
        Wallet
      </h1>

      {/* PHI Balance */}
      <div className="rounded-2xl border border-cyan-500/40 bg-slate-900/50 backdrop-blur-lg p-6 mb-8 shadow-[0_0_40px_rgba(34,211,238,0.25)]">
        <p className="text-sm text-cyan-300/70 uppercase tracking-wide">PHI Balance</p>
        <p className="text-4xl font-extrabold mt-2">
          {profile.phi}{" "}
          <span className="text-cyan-300 text-sm font-medium">PHI</span>
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Earned from rewards, streaks, and future games.
        </p>
      </div>

      {/* Transactions */}
      <h2 className="text-xl font-semibold mb-3">Transaction History</h2>

      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : history.length === 0 ? (
        <p className="text-slate-500">No PHI transactions yet.</p>
      ) : (
        <div className="space-y-3">
          {history.map((tx) => (
            <div
              key={tx.id}
              className="rounded-xl p-4 bg-slate-900/60 border border-slate-800 shadow-md flex items-center justify-between"
            >
              <div>
                <p className="font-medium">
                  {tx.type.replace("_", " ").toUpperCase()}
                </p>
                <p className="text-xs text-slate-400">{formatDate(tx.created_at)}</p>
              </div>

              <p
                className={`text-lg font-bold ${
                  tx.amount > 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {tx.amount > 0 ? "+" : ""}
                {tx.amount} PHI
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
