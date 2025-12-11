"use client";

import { useState } from "react";
import { useProfile, useRefreshProfile } from "@/app/context/AuthContext";

export default function SpendPhiModal({ amount, reason, onClose }) {
  const profile = useProfile();
  const refresh = useRefreshProfile();

  const [status, setStatus] = useState("idle");

  async function handleSpend() {
    setStatus("loading");

    const res = await fetch("/api/phi/spend", {
      method: "POST",
      body: JSON.stringify({
        userId: profile.id,
        amount,
        reason,
      }),
    });

    const result = await res.json();

    if (!result.success) {
      setStatus("error");
      return;
    }

    // Refresh profile balance
    await refresh();

    setStatus("success");

    setTimeout(() => onClose(), 800);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-black/40 border border-emerald-400/30 p-8 rounded-2xl backdrop-blur-xl shadow-xl w-[90%] max-w-md text-center">

        <h2 className="text-2xl text-white font-bold mb-4">Spend {amount} Φ?</h2>
        <p className="text-gray-300 mb-6">You are about to buy: {reason}</p>

        {status === "error" && (
          <p className="text-red-400 mb-4">Not enough PHI!</p>
        )}

        {status === "success" && (
          <p className="text-emerald-400 mb-4">Purchase successful!</p>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSpend}
            disabled={status === "loading"}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold shadow-md hover:shadow-lg"
          >
            {status === "loading" ? "Processing..." : "Confirm"}
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
