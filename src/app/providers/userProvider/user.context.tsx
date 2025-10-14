"use client";

import { createContext, useContext, useEffect } from "react";
import { Propshook, UserContextType } from "./user.types";
import { usePathname, useRouter } from "next/navigation";
import { USER_ROLES } from "@/app/constant";

export const UserContext = createContext<UserContextType | null>(null);

export function UseUserContext(props?: Propshook) {
  const ctx = useContext(UserContext);
  const router = useRouter();

  const pathname = usePathname();
  if (!ctx)
    throw new Error("UseUserContext must be used within UserContext.Provider");

  useEffect(() => {
    if (ctx.isUserDataloading) return;

    const { role, dev_profile, organization } = ctx.userData || {};
    const pathParts = pathname.split("/");

    const isInvitePage = pathParts[1] === "invite" && pathParts.length === 3;
    const dynamicOrgName = isInvitePage ? pathParts[2] : null;

    if (role === USER_ROLES.AUTHENTICATED) {
      router.replace(props?.redirect ?? "/auth/choose-role");
    } else if (role === USER_ROLES.DEVELOPER) {
      if (!dev_profile)
        router.replace(props?.redirect ?? "/onboarding/setup-profile");
    } else if (role === USER_ROLES.PROJECT_MANAGER) {
      if (!organization)
        router.replace(props?.redirect ?? "/onboarding/new-org");
    }
  }, [ctx.userData, ctx.isUserDataloading]);

  return ctx;
}
