"use client";

import { useState } from "react";

export default function DepositPage() {
  const walletAddress = "YOUR_SOLANA_ADDRESS"; // Replace when connecting Phantom
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-xl mx-auto py-10 text-white space-y-6">
      <h1 className="text-3xl font-bold">Deposit</h1>

      <div className="bg-[#111]/80 border border-[#1f1f1f] p-6 rounded-xl space-y-4">
        <p className="text-lg font-semibold">Deposit Address</p>

        <div
          onClick={copyAddress}
          className="p-3 bg-black/50 rounded-lg cursor-pointer border border-gray-700 hover:border-purple-500"
        >
          {walletAddress}
        </div>

        {copied && <p className="text-green-400 text-sm">Copied!</p>}

        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=wallet"
          alt="QR Code"
          className="mx-auto mt-4"
        />
      </div>
    </div>
  );
}
