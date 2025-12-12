"use client";

import { createContext, ReactNode } from "react";

export const ProfileContext = createContext<any>(null);

export default function ProfileListener({
  profile,
  children,
}: {
  profile: any;
  children: ReactNode;
}) {
  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
}
