"use client";
import { useSupabase } from "@/services/supabase/supabase.hook";
import { useRouter } from "next/navigation";
import { ReactNode, Suspense, useEffect } from "react";
import { useRedirect } from "../providers/redirectProvider/redirect.provider";
import { ScreenLoader } from "@/components/loader";

export default function Layout({ children }: { children: ReactNode }) {
  const { isLoading, authorised } = useRedirect({
    role: ["DEVELOPER", "PROJECT_MANAGER"],
    redirectTo: "/unauthorized",
  });
  if (isLoading || !authorised) return <ScreenLoader />;
  return <Suspense>{children}</Suspense>;
}
