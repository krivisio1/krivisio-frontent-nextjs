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
    console.log(ctx.userData);
    if (!props?.required || ctx.isUserDataloading) return;

    if (ctx.userData?.role == USER_ROLES.AUTHENTICATED) {
      router.replace(props?.redirect ?? "/auth/choose-role");
    } else if (
      ctx.userData?.role == USER_ROLES.DEVELOPER &&
      !ctx.userData?.dev_profile
    ) {
      router.replace(props?.redirect ?? "/onboarding/setup-profile");
    } else if (
      ctx.userData?.role == USER_ROLES.PROJECT_MANAGER &&
      !ctx.userData?.organization
    ) {
      router.replace(props?.redirect ?? "/onboarding/new-org");
    }
  }, [ctx]);
  return ctx;
}
