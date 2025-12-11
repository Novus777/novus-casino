"use client";

import React, { createContext, useContext, useState } from "react";

type WalletContextType = {
  connected: boolean;
  address: string | null;
  connect: () => void;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connect = () => {
    // placeholder: replace with real wallet connect
    setConnected(true);
    setAddress("Φ-demo-wallet-1111");
  };

  const disconnect = () => {
    setConnected(false);
    setAddress(null);
  };

  return (
    <WalletContext.Provider value={{ connected, address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider");
  return ctx;
}
