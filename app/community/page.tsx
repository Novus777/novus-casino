"use client";

import { useEffect, useState } from "react";
import { useUser, useProfile } from "@/app/context/AuthContext";
import { getReferralStats, getReferralLink } from "@/app/lib/referral";

export default function ReferralCenter() {
  const user = useUser();
  const profile = useProfile();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      if (!user) return;
      const data = await getReferralStats(user.id);
      setStats(data);
      setLoading(false);
    }
    load();
  }, [user]);

  if (loading || !profile)
    return (
      <div className="flex justify-center items-center h-[60vh] text-white text-xl">
        Loading referral center...
      </div>
    );

  const referralLink = getReferralLink(profile.referral_code);

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="w-full flex flex-col items-center py-12 px-4">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,200,0.5)]">
        PHI Referral Center
      </h1>
      <p className="text-gray-300 mb-10 text-lg">
        Invite friends. Earn <span className="text-emerald-400 font-semibold">PHI</span> every time they play.
      </p>

      {/* Referral Code Card */}
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-emerald-400/20 shadow-[0_0_20px_rgba(0,255,200,0.15)] mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Your Referral Link</h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-gray-300 break-all">{referralLink}</div>

          <button
            onClick={copyLink}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-[0_0_20px_rgba(0,255,200,0.6)] transition shadow-inner"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">

        {/* Invited Users */}
        <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.15)]">
          <h3 className="text-xl text-white mb-2">Total Invited</h3>
          <p className="text-4xl font-bold text-cyan-300">{stats.totalInvited}</p>
        </div>

        {/* PHI Earned */}
        <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-emerald-400/20 shadow-[0_0_25px_rgba(0,255,200,0.15)]">
          <h3 className="text-xl text-white mb-2">PHI Earned</h3>
          <p className="text-4xl font-bold text-emerald-300">{stats.totalPhiEarned}</p>
        </div>

        {/* Active Referrals */}
        <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.15)]">
          <h3 className="text-xl text-white mb-2">Active Players</h3>
          <p className="text-4xl font-bold text-cyan-300">{stats.activePlayers}</p>
        </div>
      </div>

      {/* Invite CTA */}
      <div className="mt-14 w-full max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Earn PHI for Every Player You Bring</h2>
        <p className="text-gray-400 mb-6">
          Your referrals increase your PHI balance, XP level, and unlock future PHI Casino perks.
        </p>

        <button
          onClick={copyLink}
          className="px-10 py-4 rounded-2xl text-lg font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_20px_rgba(0,255,200,0.5)] hover:shadow-[0_0_35px_rgba(0,255,200,0.9)] transition-all"
        >
          Share Your Link
        </button>
      </div>
    </main>
  );
}
