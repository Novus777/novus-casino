"use client";

import { useAuth } from "@/context/AuthContext";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-white">Loading...</p>;
  if (!user) return null; // middleware handles redirect

  return <>{children}</>;
}
