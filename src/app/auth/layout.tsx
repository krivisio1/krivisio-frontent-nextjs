"use client";
import { useSupabase } from "@/services/supabase/supabase.hook";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { session, userData } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (!userData) return;
    console.log(userData);
    if (userData.role == "AUTHENTICATED")
      return router.push("/auth/choose-role");
    else if (userData.role == "PROJECT_MANAGER")
      return router.push("/management/dashboard");
    else if (userData.role == "DEVELOPER")
      return router.push("/developer/dashboard");
  }, [session, userData]);

  return <>{children}</>;
}
