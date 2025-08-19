"use client";
import { useSupabase } from "@/services/supabase/supabase.hook";
import { useRouter } from "next/navigation";
import { ReactNode, Suspense, useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
