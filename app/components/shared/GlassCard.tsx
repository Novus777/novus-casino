"use client";

import React from "react";

export default function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-5 bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl
      hover:bg-white/10 hover:border-white/20 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
