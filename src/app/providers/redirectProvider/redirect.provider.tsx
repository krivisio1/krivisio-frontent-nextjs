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
  const { session, isLoading: isSupabaseLoading } = useSupabase();
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
    const isOrgInvitePage = pathParts[1]; // /invite/[org-name]

    // -------------------------------
    // 1️⃣ NOT LOGGED IN
    // -------------------------------
    if (!session) {
      if (isInvitePage && isOrgInvitePage) {
        localStorage.setItem("redirectAfterLogin", pathname);
        return router.replace("/auth/login");
      }
      return;
    }

    // -------------------------------
    // 2️⃣ AUTHENTICATED USER (role selection)
    // -------------------------------
    if (role === USER_ROLES.AUTHENTICATED)
      return router.replace("/auth/choose-role");

    // -------------------------------
    // 3️⃣ PROJECT MANAGER LOGIC
    // -------------------------------
    if (role === USER_ROLES.PROJECT_MANAGER) {
      if (!organization) return router.replace("/onboarding/new-org");

      if (isInvitePage && !isOrgInvitePage) {
        if (invitations.length === 0 && !isSkipped)
          return router.replace("/invite");
        return router.replace("/management/dashboard");
      }

      if (isOrgInvitePage) return router.replace("/management/dashboard");

      return router.replace("/management/dashboard");
    }

    // -------------------------------
    // 4️⃣ DEVELOPER LOGIC
    // -------------------------------
    if (role === USER_ROLES.DEVELOPER) {
      // 4a. Setup profile first
      //
      console.log("ajay 1");
      if (!dev_profile) return router.replace("/onboarding/setup-profile");

      console.log("ajay 2");
      // 4b. Check if we have a pending redirect after login
      const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");
      console.log("ajay 2.5", { redirectAfterLogin });
      if (redirectAfterLogin) {
        console.log("ajay 3 removed");
        localStorage.removeItem("redirectAfterLogin");
        console.log("ajay 3 redireting", { redirectAfterLogin });

        return router.replace(redirectAfterLogin);
        // throw new Error(redirectAfterLogin);
      }

      // 4c. Access controleveloper/dashboard
      if (isInvitePage && isOrgInvitePage) return; // allowed
      if (isInvitePage && !isOrgInvitePage)
        return router.replace("/developer/dashboard");

      // Default

      return router.replace("/developer/dashboard");
    }
  }, [isLoading, userData, pathname, isSkipped, invitations, router, session]);

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
