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

    console.log("ajay 1");

    console.log({ userData });

    const { role, dev_profile, organization } = userData || {};
    const pathParts = pathname.split("/").filter(Boolean);
    const isInvitePage = pathParts[0] === "invite";
    const isOrgInvitePage = pathParts[1]; // /invite/[org-name]

    if (!session) {
      if (isInvitePage && isOrgInvitePage) {
        localStorage.setItem("redirectAfterLogin", pathname);
        return router.replace("/auth/login");
      }
      return;
    }

    if (role === USER_ROLES.AUTHENTICATED)
      return router.replace("/auth/choose-role");

    if (role === USER_ROLES.PROJECT_MANAGER) {
      if (!organization) return router.replace("/onboarding/new-org");

      if (isInvitePage && !isOrgInvitePage) {
        if (invitations.length === 0 && !isSkipped) {
          return router.replace("/invite");
        }

        return router.replace("/management/dashboard");
      }

      if (isInvitePage && isOrgInvitePage) {
        return router.replace("/management/dashboard");
      }

      return;
    }

    if (role === USER_ROLES.DEVELOPER) {
      if (!dev_profile) return router.replace("/onboarding/setup-profile");

      const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");

      if (redirectAfterLogin) {
        localStorage.removeItem("redirectAfterLogin");

        return router.replace(redirectAfterLogin);
      }

      if (isInvitePage && isOrgInvitePage) return;
      if (isInvitePage && !isOrgInvitePage)
        return router.replace("/developer/dashboard");

      return;
    }
  }, [isLoading, userData, pathname, isSkipped, invitations, router, session]);

  if (isLoading) return <ScreenLoader />;

  return (
    <RedirectContext.Provider value={{ isLoading }}>
      {children}
    </RedirectContext.Provider>
  );
}

export type UseRedirectType = {
  role?: string | string[];
  redirectTo?: string;
};
export function useRedirect(props: UseRedirectType) {
  const context = useContext(RedirectContext);
  if (!context)
    throw new Error("useRedirect must be used inside RedirectProvider");

  const pathname = usePathname();
  const router = useRouter();
  const { session } = useSupabase();
  const { userData, isUserDataloading } = UseUserContext();

  // if (isUserDataloading) return { ...context, authorised: false };

  console.log({ userData });
  const authorised = !!(props?.role && props.role.includes(userData?.role!));

  useEffect(() => {
    if (context.isLoading || isUserDataloading) return;

    console.log({ authorised, session }, "REDIRECT CHECK");
    if (!session || !authorised) {
      router.replace(props?.redirectTo ?? "/");
    }
    console.log("passed");
  }, [session, pathname, authorised, userData]);

  return { ...context, authorised };
}
