"use client";

export default function DailyRewardCard() {
  return (
    <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-6 space-y-3">
      <h3 className="text-lg font-semibold">Daily Reward</h3>

      <p className="text-sm text-gray-400">
        Claim your daily PHI reward once every 24 hours.
      </p>

      <button
        disabled
        className="w-full py-2 rounded-lg bg-purple-600 opacity-60 cursor-not-allowed"
      >
        Coming Soon
      </button>
    </div>
  );
}
