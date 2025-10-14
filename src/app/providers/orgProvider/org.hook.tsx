"use client";

import React, { useEffect } from "react";
import { OrgContext } from "./org.context";
import { UseUserContext } from "../userProvider/user.context";
import { usePathname, useRouter } from "next/navigation";
import { USER_ROLES } from "@/app/constant";

export function useOrgHook() {
  const ctx = React.useContext(OrgContext);
  const { userData, isUserDataloading } = UseUserContext();
  const router = useRouter();
  const pathname = usePathname();

  if (!ctx)
    throw new Error("useOrgHook must be used within OrgContext.Provider");

  useEffect(() => {
    // Wait for all data to load before running redirect logic
    if (isUserDataloading || ctx.isInvitationfetching || !userData) return;

    const { role, organization } = userData;
    const pathParts = pathname.split("/").filter(Boolean); // remove empty strings
    const isInvitePage = pathParts[0] === "invite" && pathParts.length === 2;
    const dynamicOrgName = isInvitePage ? pathParts[1] : null;

    // --- Role-specific redirection ---
    if (role === USER_ROLES.PROJECT_MANAGER) {
      // If PM has an organization
      if (organization) {
        if (isInvitePage && dynamicOrgName) {
          router.replace("/invite");
          return;
        }
        if (ctx.isSkipped) {
          router.replace("/management/dashboard");
        } else {
          router.replace("/invite");
        }
      }
    } else if (role === USER_ROLES.DEVELOPER) {
      // If developer has invitation link and on invite page
      if (isInvitePage && dynamicOrgName && ctx.devInvitation) {
        router.replace(`/invite/${dynamicOrgName}`);
      } else {
        console.log(ctx.isInvitationfetching);
        router.replace("/developer/dashboard");
      }
    }
  }, [
    userData?.id,
    userData?.role,
    userData?.organization,
    isUserDataloading,
    ctx.isInvitationfetching,
    ctx.isSkipped,
    ctx.devInvitation,
    pathname, // ensure redirect re-evaluates on route change
  ]);

  return ctx;
}
