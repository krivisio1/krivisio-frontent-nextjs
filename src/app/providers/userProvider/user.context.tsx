"use client";

import { createContext, useContext } from "react";

export const UserContext = createContext<any | null>(null);

export function UseUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("use the hook inside the provider");

  return ctx;
}
