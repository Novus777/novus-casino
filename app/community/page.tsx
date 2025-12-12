"use client";

import { useEffect, useState } from "react";

export default function CommunityPage() {
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    async function load() {
      const link = await fetch("/api/referral")
        .then(res => res.text());

      setReferralLink(link);
    }

    load();
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralLink);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Community</h1>

      <button
        onClick={copyLink}
        className="mt-4 px-4 py-2 bg-purple-600 rounded"
      >
        Copy Referral Link
      </button>
    </div>
  );
}
