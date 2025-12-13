"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
  { href: "/wallet", label: "Wallet" },
  { href: "/vip", label: "VIP" },
  { href: "/rewards", label: "Rewards" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/fairness", label: "Fairness" },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-cyan-400/15 blur-3xl" />
      </div>

      <div className="relative flex">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-[280px] md:flex-col md:fixed md:inset-y-0">
          <div className="h-full border-r border-white/10 bg-black/30 backdrop-blur-xl">
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 shadow-lg shadow-purple-500/20" />
                <div>
                  <div className="text-lg font-extrabold tracking-tight">PHI Casino</div>
                  <div className="text-xs text-white/50">Dashboard</div>
                </div>
              </div>
            </div>

            <nav className="px-3 pb-6">
              {nav.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "flex items-center justify-between rounded-xl px-4 py-3 text-sm transition",
                      active
                        ? "bg-white/10 border border-white/10"
                        : "hover:bg-white/5 text-white/80 hover:text-white",
                    ].join(" ")}
                  >
                    <span className="font-medium">{item.label}</span>
                    {active && (
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.65)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto p-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Status</div>
                <div className="mt-1 text-sm font-semibold">Early Access Live</div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[62%] bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
                </div>
                <div className="mt-2 text-xs text-white/50">Build: UI refresh</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 md:pl-[280px]">
          {/* Top bar */}
          <header className="sticky top-0 z-20 border-b border-white/10 bg-black/20 backdrop-blur-xl">
            <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="md:hidden h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400" />
                <div>
                  <div className="text-sm text-white/60">PHI</div>
                  <div className="text-base font-semibold">
                    {nav.find((n) => pathname === n.href || pathname.startsWith(n.href + "/"))?.label ?? "Dashboard"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition">
                  Notifications
                </button>
                <Link
                  href="/profile"
                  className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition"
                >
                  Account
                </Link>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
