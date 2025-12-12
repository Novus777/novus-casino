"use client";

import { useState } from "react";

export default function WithdrawPage() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="max-w-xl mx-auto py-10 text-white space-y-6">
      <h1 className="text-3xl font-bold">Withdraw</h1>

      <div className="bg-[#111]/80 border border-[#1f1f1f] p-6 rounded-xl space-y-4">
        <div>
          <label className="font-semibold">Withdraw Address</label>
          <input
            className="w-full mt-2 p-3 bg-black/40 border border-gray-700 rounded-lg"
            placeholder="Enter address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Amount</label>
          <input
            className="w-full mt-2 p-3 bg-black/40 border border-gray-700 rounded-lg"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold mt-4">
          Submit Withdraw Request
        </button>
      </div>
    </div>
  );
}
