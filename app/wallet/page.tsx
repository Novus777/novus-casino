"use client";

import { useEffect, useState } from "react";

export default function WalletPage() {
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/wallet/get", {
        method: "POST",
        body: JSON.stringify({ userId: "CURRENT_USER_ID" }),
      });

      setWallet(await res.json());
    }

    load();
  }, []);

  if (!wallet) return <div>Loading...</div>;

  return (
    <div>
      <h1>Wallet</h1>
      <p>Balance: {wallet.balance}</p>
    </div>
  );
}
