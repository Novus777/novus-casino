import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-white/50">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-purple-500 via-fuchsia-400 to-cyan-300 flex items-center justify-center">
            <span className="text-xs font-bold text-black">Φ</span>
          </div>
          <span>PHI © 2025 Hybrid Betting Experience</span>
        </div>
        <div className="flex gap-4 flex-wrap">
          <span>Non-custodial • Solana powered</span>
          <span>Responsible gaming 18+</span>
        </div>
      </div>
    </footer>
  );
}
