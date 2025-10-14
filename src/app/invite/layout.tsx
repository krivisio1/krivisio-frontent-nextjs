"use client";
import { USER_ROLES } from "@/app/constant";
import { useOrgHook } from "@/app/providers/orgProvider/org.hook";
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
  const { userData, isUserDataloading } = UseUserContext({
    required: true,
  });
  // const router = useRouter();
  const { isInvitationfetching } = useOrgHook();

  if (isUserDataloading) return <ScreenLoader />;
  return <>{children}</>;
}
