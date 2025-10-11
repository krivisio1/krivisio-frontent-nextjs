"use client";

import { createContext, useContext, useEffect } from "react";
import { Propshook, UserContextType } from "./user.types";
import { useRouter } from "next/navigation";
import { USER_ROLES } from "@/app/constant";

export const UserContext = createContext<UserContextType | null>(null);

export function UseUserContext(props?: Propshook) {
  const ctx = useContext(UserContext);
  const router = useRouter();

  if (!ctx) throw new Error("use the hook inside the provider");

  useEffect(() => {
    if (ctx.isUserDataloading) return;

    const role = ctx.userData?.role;
    const devProfile = ctx.userData?.dev_profile;
    const organization = ctx.userData?.organization;

    if (role == USER_ROLES.AUTHENTICATED) {
      router.replace(props?.redirect ?? "/auth/choose-role");
    } else if (role == USER_ROLES.DEVELOPER && !devProfile) {
      router.replace(props?.redirect ?? "/onboarding/setup-profile");
    } else if (role == USER_ROLES.DEVELOPER && devProfile) {
      router.replace(props?.redirect ?? "/developer/dashboard");
    } else if (role == USER_ROLES.PROJECT_MANAGER && !organization) {
      router.replace(props?.redirect ?? "/onboarding/new-org");
    } else if (role == USER_ROLES.PROJECT_MANAGER && organization) {
      router.replace(props?.redirect ?? "/management/dashboard");
    }
  }, [ctx.userData, ctx.isUserDataloading]);

  return ctx;
}
