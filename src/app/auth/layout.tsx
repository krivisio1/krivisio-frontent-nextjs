"use client";
import { useSupabase } from "@/services/supabase/supabase.hook";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { UseUserContext } from "../providers/userProvider/user.context";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { session } = useSupabase();
  const { userData } = UseUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!session) return;
    if (!userData) return;
    if (userData.role == "AUTHENTICATED")
      return router.push("/auth/choose-role");
    else if (userData.role == "PROJECT_MANAGER")
      return router.push("/management/dashboard");
    else if (userData.role == "DEVELOPER")
      return router.push("/developer/dashboard");
  }, [session, userData]);

  return <>{children}</>;
}
