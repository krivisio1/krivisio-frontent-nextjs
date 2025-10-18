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

    const pathParts = pathname.split("/").filter(Boolean);
    const isInvitePage = pathParts[0] === "invite";

    if (!session) {
      if (isInvitePage) {
        localStorage.setItem("redirectAfterLogin", pathname);
      }
      return;
    }

    if (role === USER_ROLES.DEVELOPER) {
      if (!dev_profile) {
        return router.replace("/onboarding/setup-profile");
      }

      const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");
      if (redirectAfterLogin) {
        localStorage.removeItem("redirectAfterLogin");
        return router.replace(redirectAfterLogin);
      }

      return router.replace("/developer/dashboard");
    }

    if (role === USER_ROLES.PROJECT_MANAGER) {
      if (!organization) {
        return router.replace("/onboarding/new-org");
      }

      if (isInvitePage) {
        if (invitations.length === 0 && !isSkipped) {
          return router.replace("/invite");
        }
        return router.replace("/management/dashboard");
      }

      return router.replace("/management/dashboard");
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
