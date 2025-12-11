"use client";

import { createContext, useContext } from "react";

export const ProfileContext = createContext<any>(null);

export function ProfileProvider({ children, value }: { children: React.ReactNode, value: any }) {
  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
