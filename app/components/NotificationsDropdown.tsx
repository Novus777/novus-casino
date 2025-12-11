"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function NotificationsDropdown() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-white/80 hover:text-white transition"
      >
        🔔
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-xl">
          <p className="text-white/70 text-sm">No notifications</p>
        </div>
      )}
    </div>
  );
}
