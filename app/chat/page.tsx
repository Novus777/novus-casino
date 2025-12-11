"use client";

import React, { useState } from "react";
import InputBar from "./InputBar";
import GlassCard from "@/components/shared/GlassCard";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = (msg: string) => {
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-6">
      <GlassCard className="p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 text-transparent bg-clip-text">
          Community Chat
        </h1>
      </GlassCard>

      <GlassCard className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <p key={idx} className="text-white/80 bg-white/5 p-3 rounded-xl">
            {msg}
          </p>
        ))}
      </GlassCard>

      <InputBar onSend={handleSend} />
    </div>
  );
}
