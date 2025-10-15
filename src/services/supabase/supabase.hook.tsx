"use client";
import React, { useEffect } from "react";
import { SupabaseContext } from "./supabase.context";
import { PropsHook } from "./supabase.types";
import { usePathname, useRouter } from "next/navigation";

export function useSupabase() {
  const context = React.useContext(SupabaseContext);
  if (!context) throw new Error("Supabase context missing");
  return context;
}
