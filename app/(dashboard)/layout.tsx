"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading dashboard…
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      {/* sidebar later */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
