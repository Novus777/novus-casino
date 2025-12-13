"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Wallet", href: "/wallet" },
  { label: "Deposit", href: "/wallet/deposit" },
  { label: "Withdraw", href: "/wallet/withdraw" },
  { label: "VIP", href: "/vip" },
  { label: "Rewards", href: "/rewards" },
  { label: "Profile", href: "/profile" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col">
      {/* LOGO */}
      <div className="px-6 py-6 border-b border-zinc-800">
        <div className="text-2xl font-extrabold text-purple-400 tracking-tight">
          Φ PHI
        </div>
        <div className="text-xs text-zinc-500">
          Crypto Casino
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-2.5 text-sm transition-all
                ${
                  active
                    ? "bg-purple-600/20 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t border-zinc-800 text-xs text-zinc-500">
        PHI Casino © {new Date().getFullYear()}
      </div>
    </aside>
  );
}
