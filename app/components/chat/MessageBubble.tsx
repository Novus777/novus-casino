"use client";

import React from "react";

interface BubbleProps {
  user: string;
  message: string;   // <-- FIXED: renamed to match your usage
  og?: boolean;
}

export default function MessageBubble({ user, message, og }: BubbleProps) {
  return (
    <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
      
      {/* Avatar Circle */}
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-300 flex items-center justify-center text-black font-bold shadow-md">
        {user.charAt(0).toUpperCase()}
      </div>

      {/* Message Content */}
      <div className="flex flex-col">
        <p className="flex items-center gap-2 text-white font-semibold">
          {user}
          {og && (
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-400 text-xs font-bold text-white">
              OG
            </span>
          )}
        </p>

        <p className="text-white/70">{message}</p>
      </div>

    </div>
  );
}
