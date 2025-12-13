"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function NavBar() {
  const pathname = usePathname();
  const { user, profile, loading } = useAuth();

  const isActive = (path: string) =>
    pathname === path
      ? "text-white"
      : "text-white/60 hover:text-white";

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-purple-400">Φ</span>
          <span className="text-lg font-semibold text-white">
            PHI Casino
          </span>
        </Link>

        {/* CENTER NAV */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/dashboard" className={isActive("/dashboard")}>
            Dashboard
          </Link>
          <Link href="/wallet" className={isActive("/wallet")}>
            Wallet
          </Link>
          <Link href="/leaderboard" className={isActive("/leaderboard")}>
            Leaderboard
          </Link>
          <Link href="/vip" className={isActive("/vip")}>
            VIP
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {!loading && !user && (
            <>
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-lg border border-white/15 text-sm text-white/70 hover:text-white hover:border-white/30 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-semibold transition"
              >
                Sign up
              </Link>
            </>
          )}

          {user && profile && (
            <>
              {/* VIP BADGE */}
              <div
                className="hidden sm:flex items-center px-3 py-1 rounded-lg text-xs font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.6)]"
                style={{
                  background:
                    profile.vip_level >= 4
                      ? "linear-gradient(135deg,#a855f7,#22d3ee)"
                      : "linear-gradient(135deg,#7c3aed,#4f46e5)",
                }}
              >
                VIP {profile.vip_level}
              </div>

              {/* BALANCE */}
              <div className="text-right text-sm">
                <div className="text-white/50 text-xs">PHI</div>
                <div className="text-emerald-400 font-semibold">
                  {profile.phi?.toLocaleString() ?? 0}
                </div>
              </div>

              {/* PROFILE */}
              <Link
                href="/profile"
                className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center font-bold text-sm shadow-[0_0_20px_rgba(124,58,237,0.6)]"
              >
                {profile.username?.[0]?.toUpperCase() ?? "U"}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
