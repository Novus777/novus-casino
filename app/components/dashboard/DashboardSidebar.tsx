"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/wallet", label: "Wallet" },
    { href: "/vip", label: "VIP" },
    { href: "/rewards", label: "Rewards" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/fairness", label: "Fairness" },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">
      <h1 className="text-xl font-bold mb-6">PHI Casino</h1>

      <nav className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 rounded-lg ${
              pathname === link.href
                ? "bg-emerald-600 text-black"
                : "text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
