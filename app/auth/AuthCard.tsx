"use client";

import { motion } from "framer-motion";
import React from "react";

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, children }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl text-white"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
      {children}
    </motion.div>
  );
}
