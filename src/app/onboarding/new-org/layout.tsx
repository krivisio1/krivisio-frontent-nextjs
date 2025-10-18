"use client";
import { USER_ROLES } from "@/app/constant";
import { useOrgHook } from "@/app/providers/orgProvider/org.hook";
import { useRedirect } from "@/app/providers/redirectProvider/redirect.provider";
import { UseUserContext } from "@/app/providers/userProvider/user.context";
import { ScreenLoader } from "@/components/loader";
import { useSupabase } from "@/services/supabase/supabase.hook";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, authorised } = useRedirect({
    role: ["PROJECT_MANAGER"],
    redirectTo: "/unauthorized",
  });
  if (isLoading || !authorised) return <ScreenLoader />;
  return <>{children}</>;
}
