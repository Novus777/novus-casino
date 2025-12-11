// app/components/NavBar.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getVipGradient, getVipName } from "@/lib/vip";

export default function NavBar() {
  const { user, profile, loading } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold tracking-tight text-purple-400">
          Φ
        </span>
        <span className="text-lg font-semibold text-white">PHI Casino</span>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {!loading && !user && (
          <div className="flex gap-3">
            <Link href="/auth/login" className="btn-outline">
              Login
            </Link>
            <Link href="/auth/signup" className="btn-primary">
              Sign up
            </Link>
          </div>
        )}

        {user && profile && (
          <>
            {/* VIP badge */}
            <div className="hidden sm:flex items-center rounded-lg px-3 py-1 text-xs font-semibold text-white shadow-md"
                 style={{
                   backgroundImage: getVipGradient(profile.vip_level),
                 }}>
              <span className="uppercase tracking-wide mr-1">
                VIP {profile.vip_level}
              </span>
              <span>· {getVipName(profile.vip_level)}</span>
            </div>

            {/* Wallet balance */}
            <div className="flex flex-col items-end text-right">
              <span className="text-xs text-white/60">Wallet</span>
              <span className="text-sm font-semibold text-emerald-300">
                {profile.balance.toFixed(2)} PHI
              </span>
            </div>

            {/* Dashboard link */}
            <Link href="/dashboard" className="btn-ghost text-sm">
              Profile
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
