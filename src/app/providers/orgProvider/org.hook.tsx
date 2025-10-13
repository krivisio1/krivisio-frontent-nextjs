"use client";

import React, { useEffect } from "react";
import { OrgContext } from "./org.context";
import { UseUserContext } from "../userProvider/user.context";
import { useRouter } from "next/navigation";
import { USER_ROLES } from "@/app/constant";

export function useOrgHook() {
  const ctx = React.useContext(OrgContext);
  const { userData, isUserDataloading } = UseUserContext();
  const router = useRouter();

  if (!ctx)
    throw new Error("useOrgHook must be used within OrgContext.Provider");

  useEffect(() => {
    if (isUserDataloading || !userData) return;

    const { role, organization } = userData;

    if (role === USER_ROLES.PROJECT_MANAGER && organization) {
      if (ctx.invitations.length <= 0 && !ctx.isSkipped) {
        router.replace("/invite");
      } else {
        router.replace("/management/dashboard");
      }
    }
  }, [
    userData?.role,
    userData?.organization,
    isUserDataloading,
    ctx.invitations.length,
    ctx.isSkipped,
  ]);

  return ctx;
}
