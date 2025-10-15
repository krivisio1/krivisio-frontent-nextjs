"use client";

import { createContext, useContext, useEffect } from "react";
import { Propshook, UserContextType } from "./user.types";
import { usePathname, useRouter } from "next/navigation";
import { USER_ROLES } from "@/app/constant";

export const UserContext = createContext<UserContextType | null>(null);

export function UseUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("UserContext missing");
  return ctx;
}
