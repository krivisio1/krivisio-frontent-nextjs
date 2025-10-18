"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "@/services/supabase/supabase.hook";
import { UseUserContext } from "../userProvider/user.context";
import { useOrgHook } from "../orgProvider/org.hook";
import { USER_ROLES } from "@/app/constant";
import { ScreenLoader } from "@/components/loader";

interface RedirectContextType {
  isLoading: boolean;
}

const RedirectContext = createContext<RedirectContextType | null>(null);

export function RedirectProvider({ children }: { children: React.ReactNode }) {
  const { session, isLoading: isSupabaseLoading, logout } = useSupabase();
  const { userData, isUserDataloading } = UseUserContext();
  const { isInvitationfetching, isSkipped, invitations } = useOrgHook();
  const router = useRouter();
  const pathname = usePathname();

  const isLoading =
    isSupabaseLoading || isUserDataloading || isInvitationfetching;

  useEffect(() => {
    if (isLoading) return;

    const { role, dev_profile, organization } = userData || {};

    // --- AUTH CHECK ---

    if (!session) return;

    // --- ROLE-BASED REDIRECTS ---
    if (role === USER_ROLES.AUTHENTICATED) {
      router.replace("/auth/choose-role");
    } else if (role === USER_ROLES.DEVELOPER && !dev_profile) {
      router.replace("/onboarding/setup-profile");
    } else if (role === USER_ROLES.PROJECT_MANAGER && !organization) {
      router.replace("/onboarding/new-org");
    }

    // --- INVITE HANDLING (optional) ---
    const pathParts = pathname.split("/").filter(Boolean);
    const isInvitePage = pathParts[0] === "invite";
    if (isInvitePage && role === USER_ROLES.PROJECT_MANAGER) {
      console.log({ isSkipped, invitations });
      if (invitations.length === 0 && !isSkipped) {
        return router.replace("/invite");
      }
      router.replace("/management/dashboard");
    }
  }, [isLoading, userData, pathname, isSkipped, invitations]);

  if (isLoading) return <ScreenLoader />;

  return (
    <RedirectContext.Provider value={{ isLoading }}>
      {children}
    </RedirectContext.Provider>
  );
}

export function useRedirect() {
  const ctx = useContext(RedirectContext);
  if (!ctx) throw new Error("useRedirect must be used inside RedirectProvider");
  return ctx;
}
