"use client";

import { useEffect, useState } from "react";
import { getWallet } from "../actions/wallet";

export default function WalletPage() {
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getWallet();
      setWallet(data);
    }
    load();
  }, []);

  return (
    <div className="max-w-xl mx-auto py-10 text-white space-y-6">
      <h1 className="text-3xl font-bold">Wallet</h1>

      <div className="bg-[#111] border border-[#1f1f1f] p-6 rounded-xl space-y-4">
        <p className="text-lg">Current Balance:</p>
        <p className="text-4xl font-bold text-green-400">
          {wallet?.balance?.toFixed(2) ?? "0.00"} PHI
        </p>
      </div>
    </div>
  );
}
