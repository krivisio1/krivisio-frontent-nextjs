"use client";

import { createContext, useContext } from "react";
import { UserContextType } from "./user.types";

export const UserContext = createContext<UserContextType | null>(null);

export function UseUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("use the hook inside the provider");

  return ctx;
}
