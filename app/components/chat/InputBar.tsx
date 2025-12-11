"use client";

import React, { useState } from "react";

interface InputBarProps {
  onSend: (msg: string) => void;
  className?: string;
  title?: string;
}

export default function InputBar({ onSend, className = "", title }: InputBarProps) {
  const [value, setValue] = useState("");

  const send = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className={`w-full p-3 border-t border-white/10 bg-black/40 backdrop-blur-lg ${className}`}>
      {title && <p className="text-white/40 text-xs mb-1">{title}</p>}

      <div className="flex items-center gap-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
          className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring focus:ring-purple-500/40"
        />

        <button
          onClick={send}
          className="px-4 py-2 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-400 hover:scale-105 transition text-white font-semibold shadow-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
